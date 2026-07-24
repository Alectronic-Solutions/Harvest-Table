'use client';

// One job: crossfade endlessly between 3 background video clips,
// falling back to a static poster when video can't play or motion is reduced.

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { asset } from '@/lib/basePath';

const CLIPS = [
  { src: '/videos/hero-1.mp4' },
  { src: '/videos/hero-2.mp4' },
  { src: '/videos/hero-3.mp4' },
];

const FADE_MS = 1500;
const PREROLL_MS = 250;
const FALLBACK_HOLD_MS = 6000;

export default function HeroVideoBackground() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [canPlay, setCanPlay] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const durationsRef = useRef<(number | null)[]>(CLIPS.map(() => null));
  const prerollTimerRef = useRef<ReturnType<typeof setTimeout>>();
  const advanceTimerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mql.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    videoRefs.current[activeIndex]?.play().catch(() => {});
  }, [activeIndex]);

  useEffect(() => {
    if (reducedMotion) return;

    const nextIndex = (activeIndex + 1) % CLIPS.length;
    const durationMs = durationsRef.current[activeIndex];
    const holdMs = durationMs
      ? Math.max(durationMs * 1000 - FADE_MS, 1000)
      : FALLBACK_HOLD_MS;
    const prerollDelay = Math.max(holdMs - PREROLL_MS, 0);

    prerollTimerRef.current = setTimeout(() => {
      const nextVideo = videoRefs.current[nextIndex];
      if (nextVideo) {
        nextVideo.currentTime = 0;
        nextVideo.play().catch(() => {});
      }
    }, prerollDelay);

    advanceTimerRef.current = setTimeout(() => {
      const prevIndex = activeIndex;
      setActiveIndex(nextIndex);
      // Pause the outgoing clip once its fade-out has finished so it stops
      // consuming CPU/GPU and can't drift while hidden.
      setTimeout(() => {
        videoRefs.current[prevIndex]?.pause();
      }, FADE_MS);
    }, holdMs);

    return () => {
      clearTimeout(prerollTimerRef.current);
      clearTimeout(advanceTimerRef.current);
    };
  }, [activeIndex, reducedMotion]);

  return (
    <div className="absolute inset-0">
      {/* Poster shown until the first clip is ready, and permanently if reduced motion is on */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-700"
        style={{
          backgroundImage: `url(${asset('/images/hero-poster.webp')})`,
          opacity: canPlay && !reducedMotion ? 0 : 1,
        }}
      />

      {!reducedMotion &&
        CLIPS.map((clip, i) => {
          // Only mount the clip that's currently visible plus the one queued to
          // play next. The clip after that stays out of the DOM (and off the
          // network) until it becomes "next", so the browser never downloads
          // all three videos up front.
          const nextIndex = (activeIndex + 1) % CLIPS.length;
          if (i !== activeIndex && i !== nextIndex) return null;

          return (
            <motion.video
              key={clip.src}
              ref={(el) => {
                videoRefs.current[i] = el;
              }}
              src={asset(clip.src)}
              muted
              playsInline
              autoPlay={i === 0}
              preload={i === activeIndex ? 'auto' : 'metadata'}
              onLoadedMetadata={(e) => {
                durationsRef.current[i] = e.currentTarget.duration;
              }}
              onCanPlay={() => i === 0 && setCanPlay(true)}
              className="absolute inset-0 h-full w-full object-cover"
              animate={{ opacity: i === activeIndex ? 1 : 0 }}
              transition={{ duration: FADE_MS / 1000, ease: 'easeInOut' }}
              style={{
                willChange: 'opacity',
                backfaceVisibility: 'hidden',
                transform: 'translateZ(0)',
              }}
            />
          );
        })}
    </div>
  );
}

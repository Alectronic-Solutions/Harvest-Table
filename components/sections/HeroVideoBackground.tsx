'use client';

// One job: crossfade endlessly between 3 background video clips on desktop,
// over a priority-loaded poster image that is the page's LCP element. Phones,
// data-saver connections, and reduced-motion visitors only ever get the
// poster, so they never download the video files. A pause button stops the
// motion on request (WCAG 2.2.2).

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { m } from 'framer-motion';
import { asset } from '@/lib/basePath';

const CLIPS = [
  { src: '/videos/hero-1.mp4' },
  { src: '/videos/hero-2.mp4' },
  { src: '/videos/hero-3.mp4' },
];

const FADE_MS = 1500;
const PREROLL_MS = 250;
const FALLBACK_HOLD_MS = 6000;

type NetworkInformation = { saveData?: boolean };

export default function HeroVideoBackground() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [canPlay, setCanPlay] = useState(false);
  const [allowVideo, setAllowVideo] = useState(false);
  const [paused, setPaused] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const durationsRef = useRef<(number | null)[]>(CLIPS.map(() => null));
  const prerollTimerRef = useRef<ReturnType<typeof setTimeout>>();
  const advanceTimerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const desktop = window.matchMedia('(min-width: 768px)');
    const saveData = (navigator as Navigator & { connection?: NetworkInformation }).connection?.saveData;
    const evaluate = () => setAllowVideo(desktop.matches && !reduced.matches && !saveData);
    evaluate();
    reduced.addEventListener('change', evaluate);
    desktop.addEventListener('change', evaluate);
    return () => {
      reduced.removeEventListener('change', evaluate);
      desktop.removeEventListener('change', evaluate);
    };
  }, []);

  useEffect(() => {
    if (!allowVideo) return;
    const video = videoRefs.current[activeIndex];
    if (paused) video?.pause();
    else video?.play().catch(() => {});
  }, [activeIndex, allowVideo, paused]);

  useEffect(() => {
    if (!allowVideo || paused) return;

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
  }, [activeIndex, allowVideo, paused]);

  return (
    <div className="absolute inset-0">
      {/* Poster: always rendered first so it can be the LCP image, then fades
          out once the first clip is ready (desktop only). */}
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{ opacity: canPlay && allowVideo ? 0 : 1 }}
      >
        <Image
          src={asset('/images/hero-poster.webp')}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {allowVideo &&
        CLIPS.map((clip, i) => {
          // Only mount the clip that's currently visible plus the one queued to
          // play next. The clip after that stays out of the DOM (and off the
          // network) until it becomes "next", so the browser never downloads
          // all three videos up front.
          const nextIndex = (activeIndex + 1) % CLIPS.length;
          if (i !== activeIndex && i !== nextIndex) return null;

          return (
            <m.video
              key={clip.src}
              ref={(el) => {
                videoRefs.current[i] = el;
              }}
              src={asset(clip.src)}
              muted
              playsInline
              autoPlay={i === 0 && !paused}
              preload={i === activeIndex ? 'auto' : 'metadata'}
              aria-hidden
              onLoadedMetadata={(e) => {
                durationsRef.current[i] = e.currentTarget.duration;
              }}
              onCanPlay={() => i === 0 && setCanPlay(true)}
              className="absolute inset-0 h-full w-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: i === activeIndex && canPlay ? 1 : 0 }}
              transition={{ duration: FADE_MS / 1000, ease: 'easeInOut' }}
              style={{
                willChange: 'opacity',
                backfaceVisibility: 'hidden',
                transform: 'translateZ(0)',
              }}
            />
          );
        })}

      {allowVideo && (
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-label={paused ? 'Play background video' : 'Pause background video'}
          className="absolute bottom-6 right-6 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-linen/40 bg-forest/40 text-linen backdrop-blur-sm transition-colors hover:border-gold hover:text-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-forest"
        >
          {paused ? (
            <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M8 5.5v13l11-6.5z" />
            </svg>
          ) : (
            <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <rect x="6" y="5" width="4" height="14" rx="1" />
              <rect x="14" y="5" width="4" height="14" rx="1" />
            </svg>
          )}
        </button>
      )}
    </div>
  );
}

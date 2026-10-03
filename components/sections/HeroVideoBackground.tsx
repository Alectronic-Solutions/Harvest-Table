'use client';

// One job: crossfade endlessly between 3 background video clips, over a
// priority-loaded poster image that is the page's LCP element. Phones get
// lighter portrait encodes (about 100-485 KB each, no audio). Data-saver
// connections and reduced-motion visitors only ever get the poster, so they
// never download the video files. Playback halts while the hero is offscreen,
// and a pause button stops the motion on request (WCAG 2.2.2).

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { m } from 'framer-motion';
import { asset } from '@/lib/basePath';

const CLIPS = [
  { desktop: '/videos/hero-1.mp4', mobile: '/videos/hero-1-mobile.mp4' },
  { desktop: '/videos/hero-2.mp4', mobile: '/videos/hero-2-mobile.mp4' },
  { desktop: '/videos/hero-3.mp4', mobile: '/videos/hero-3-mobile.mp4' },
];

const FADE_MS = 1500;
const PREROLL_MS = 250;
const FALLBACK_HOLD_MS = 6000;

type NetworkInformation = { saveData?: boolean };

export default function HeroVideoBackground() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [canPlay, setCanPlay] = useState(false);
  const [allowVideo, setAllowVideo] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const durationsRef = useRef<(number | null)[]>(CLIPS.map(() => null));
  const halted = paused || !inView;
  const prerollTimerRef = useRef<ReturnType<typeof setTimeout>>();
  const advanceTimerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const desktop = window.matchMedia('(min-width: 768px)');
    const saveData = (navigator as Navigator & { connection?: NetworkInformation }).connection?.saveData;
    const evaluate = () => {
      setMobile(!desktop.matches);
      setAllowVideo(!reduced.matches && !saveData);
    };
    evaluate();
    reduced.addEventListener('change', evaluate);
    desktop.addEventListener('change', evaluate);
    return () => {
      reduced.removeEventListener('change', evaluate);
      desktop.removeEventListener('change', evaluate);
    };
  }, []);

  // Stop decoding while the hero is scrolled out of view (battery on phones).
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!allowVideo) return;
    const video = videoRefs.current[activeIndex];
    if (halted) video?.pause();
    else video?.play().catch(() => {});
  }, [activeIndex, allowVideo, halted]);

  useEffect(() => {
    if (!allowVideo || halted) return;

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
  }, [activeIndex, allowVideo, halted]);

  return (
    <div ref={rootRef} className="absolute inset-0">
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
              key={`${mobile ? 'm' : 'd'}-${clip.desktop}`}
              ref={(el) => {
                videoRefs.current[i] = el;
                // React doesn't reflect the muted prop to the DOM attribute,
                // and iOS Safari refuses to autoplay without it.
                if (el) el.muted = true;
              }}
              src={asset(mobile ? clip.mobile : clip.desktop)}
              muted
              playsInline
              disablePictureInPicture
              disableRemotePlayback
              autoPlay={i === 0 && !halted}
              preload={i === activeIndex ? 'auto' : 'metadata'}
              aria-hidden
              onLoadedMetadata={(e) => {
                durationsRef.current[i] = e.currentTarget.duration;
              }}
              onPlaying={() => i === 0 && setCanPlay(true)}
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
          className="absolute right-4 top-4 z-20 flex h-12 w-12 md:bottom-6 md:right-6 md:top-auto items-center justify-center rounded-full border border-linen/40 bg-forest/40 text-linen backdrop-blur-sm transition-colors hover:border-gold hover:text-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-forest"
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

'use client';

// Top scroll-progress bar + premium custom scrollbar injector.
import { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop || document.body.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? scrolled / total : 0);
    };

    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, []);

  const pct = `${(progress * 100).toFixed(2)}%`;

  return (
    <>
      {/* Top progress bar */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
          height: '2px',
          background: 'transparent',
          pointerEvents: 'none',
        }}
      >
        {/* Track glow behind the fill */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(212,168,67,0.08)',
          }}
        />
        {/* Fill */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: pct,
            background: 'linear-gradient(90deg, var(--color-ember) 0%, var(--color-gold) 55%, var(--color-gold-light) 100%)',
            boxShadow: '0 0 8px 1px rgba(212,168,67,0.55), 0 0 2px rgba(212,168,67,0.9)',
            transition: 'width 0.08s linear',
            borderRadius: '0 1px 1px 0',
          }}
        />
        {/* Leading glint dot */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: pct,
            transform: 'translate(-50%, -50%)',
            width: '5px',
            height: '5px',
            borderRadius: '50%',
            background: 'var(--color-gold-glint)',
            boxShadow: '0 0 6px 2px rgba(212,168,67,0.9), 0 0 14px 4px rgba(212,168,67,0.4)',
            opacity: progress > 0.005 && progress < 0.998 ? 1 : 0,
            transition: 'opacity 0.2s',
          }}
        />
      </div>

      {/* Custom scrollbar styles injected once */}
      <style>{`
        /* Firefox */
        html {
          scrollbar-width: thin;
          scrollbar-color: var(--color-gold) var(--scrollbar-track);
        }

        /* WebKit / Blink (Chrome, Safari, Edge) */
        ::-webkit-scrollbar {
          width: 7px;
        }
        ::-webkit-scrollbar-track {
          background: var(--scrollbar-track);
          border-left: 1px solid rgba(212,168,67,0.08);
        }
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, var(--color-ember) 0%, var(--color-gold) 45%, var(--scrollbar-thumb-end) 100%);
          border-radius: 999px;
          border: 1.5px solid var(--scrollbar-track);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.18),
                      inset 0 -1px 0 rgba(0,0,0,0.35);
          transition: background 0.25s ease;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, var(--scrollbar-thumb-hover-start) 0%, var(--scrollbar-thumb-hover-mid) 45%, var(--scrollbar-thumb-hover-end) 100%);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.25),
                      inset 0 -1px 0 rgba(0,0,0,0.4),
                      0 0 6px rgba(212,168,67,0.35);
        }
        ::-webkit-scrollbar-thumb:active {
          background: linear-gradient(180deg, var(--scrollbar-thumb-active-start) 0%, var(--scrollbar-thumb-active-mid) 45%, var(--scrollbar-thumb-active-end) 100%);
        }
        ::-webkit-scrollbar-corner {
          background: var(--scrollbar-track);
        }

        /* Horizontal scrollbars (carousels, code blocks, etc.) */
        ::-webkit-scrollbar:horizontal {
          height: 5px;
        }
      `}</style>
    </>
  );
}

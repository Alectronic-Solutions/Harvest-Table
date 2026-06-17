'use client';

// One job: replace the OS cursor with a small gold dot that tracks the pointer.
// A larger ring trails behind with a spring delay — standard luxury-site treatment.
// Hides on touch devices. Expands on interactive elements.
// Also manages cursor visibility state for CSS styling.

import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);

  // Raw mouse position for the dot (instant).
  const mouse = useRef({ x: -100, y: -100 });
  // Smoothed position for the ring (lerped).
  const ring  = useRef({ x: -100, y: -100 });
  const rafId = useRef<number>(0);

  useEffect(() => {
    // Skip on touch-primary devices.
    if (window.matchMedia('(hover: none)').matches) return;

    // Add class to body for CSS cursor hiding
    document.body.classList.add('custom-cursor-active');

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    // Detect interactive elements for the expanded state.
    const onOver = (e: MouseEvent) => {
      const el = e.target as Element;
      setHovering(
        el.closest('a, button, [role="button"], input, select, textarea, label') !== null
      );
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    // Animation loop: lerp the ring toward the dot position.
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const animate = () => {
      ring.current.x = lerp(ring.current.x, mouse.current.x, 0.12);
      ring.current.y = lerp(ring.current.y, mouse.current.y, 0.12);

      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate(${mouse.current.x}px, ${mouse.current.y}px) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate(${ring.current.x}px, ${ring.current.y}px) translate(-50%, -50%)`;
      }
      rafId.current = requestAnimationFrame(animate);
    };
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      cancelAnimationFrame(rafId.current);
      document.body.classList.remove('custom-cursor-active');
    };
  }, [visible]);

  return (
    <>
      {/* Inner dot — snaps instantly */}
      <div
        ref={dotRef}
        aria-hidden
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 99999,
          width: hovering ? '10px' : '6px',
          height: hovering ? '10px' : '6px',
          borderRadius: '50%',
          background: '#D4A843',
          pointerEvents: 'none',
          opacity: visible ? 1 : 0,
          transition: 'width 0.2s ease, height 0.2s ease, opacity 0.3s ease',
          willChange: 'transform',
          boxShadow: '0 0 6px rgba(212,168,67,0.7)',
        }}
      />

      {/* Outer ring — lerps behind */}
      <div
        ref={ringRef}
        aria-hidden
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 99998,
          width: hovering ? '40px' : '28px',
          height: hovering ? '40px' : '28px',
          borderRadius: '50%',
          border: `1px solid rgba(212,168,67,${hovering ? '0.6' : '0.35'})`,
          pointerEvents: 'none',
          opacity: visible ? 1 : 0,
          transition: 'width 0.25s ease, height 0.25s ease, opacity 0.3s ease, border-color 0.25s ease',
          willChange: 'transform',
        }}
      />
    </>
  );
}
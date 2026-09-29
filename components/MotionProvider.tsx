'use client';

// One job: site-wide Framer Motion setup. LazyMotion + domAnimation loads
// only the animation features the site uses (components use the slim `m.*`
// elements, never `motion.*`), and MotionConfig makes every animation respect
// the visitor's OS-level "reduce motion" setting.

import { LazyMotion, MotionConfig, domAnimation } from 'framer-motion';

export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}

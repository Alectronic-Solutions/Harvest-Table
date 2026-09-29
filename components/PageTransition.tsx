'use client';

// One job: wrap every page in a fast fade-in so route changes feel intentional
// rather than abrupt. 220ms is short enough to not feel sluggish. The first
// page load is NOT animated (initial={false}): starting the server-rendered
// page at opacity 0 would hide it until JavaScript loads and delay LCP.
import { m, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <m.div
        key={pathname}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
        transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
      >
        {children}
      </m.div>
    </AnimatePresence>
  );
}

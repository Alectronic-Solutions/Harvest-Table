'use client';

// One job: show a thank-you modal for demo form submissions.
// Intercepts the native form submit, prevents the POST, shows the modal.
// Exported as both a wrapper component and a standalone hook.

import { useState, useCallback, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function ThankYouModal({ onClose }: { onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center bg-forest/80 px-5 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          key="card"
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.97 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="relative max-w-sm w-full bg-linen p-10 text-center"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Gold accent line */}
          <div className="mx-auto mb-6 h-0.5 w-12 bg-gold" />

          <p className="font-mono text-xs uppercase tracking-widest text-fog">
            Message received
          </p>
          <h2 className="mt-3 font-display text-4xl font-semibold text-forest">
            Thank you.
          </h2>
          <p className="mx-auto mt-4 max-w-xs font-sans text-sm leading-relaxed text-fog">
            We will be in touch within 2 hours during business hours. We look
            forward to having you at the table.
          </p>

          <button
            onClick={onClose}
            className="mt-8 inline-flex min-h-[48px] items-center bg-gold px-8 py-3 font-sans text-sm font-medium text-forest transition-opacity hover:opacity-90"
          >
            Close
          </button>

          <p className="mt-4 font-sans text-xs italic text-fog/50">
            This is a demo site. No data was sent.
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// Hook: returns { showModal, handleSubmit, modal }
// Usage:
//   const { handleSubmit, modal } = useDemoForm();
//   <form onSubmit={handleSubmit}> ... </form>
//   {modal}
export function useDemoForm() {
  const [open, setOpen] = useState(false);

  const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setOpen(true);
    // Reset the form so it is clean if the modal is dismissed and re-used.
    (e.target as HTMLFormElement).reset();
  }, []);

  const modal = open ? <ThankYouModal onClose={() => setOpen(false)} /> : null;

  return { handleSubmit, modal };
}

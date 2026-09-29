'use client';

// One job: show a thank-you modal for demo form submissions.
// Intercepts the native form submit, prevents the POST, shows the modal.
// Exported as both a wrapper component and a standalone hook.

import { useState, useCallback, useEffect, useRef, type FormEvent } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { useFocusTrap } from '@/lib/useFocusTrap';

function ThankYouModal({ onClose }: { onClose: () => void }) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  useFocusTrap([cardRef], true);

  // Return focus to whatever opened the modal (the submit button) on close.
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    return () => opener?.focus?.();
  }, []);

  useEffect(() => {
    closeButtonRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  return (
    <AnimatePresence>
      <m.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center bg-forest/80 px-5 backdrop-blur-sm"
        onClick={onClose}
      >
        <m.div
          key="card"
          ref={cardRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="thank-you-modal-title"
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.97 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="relative max-w-sm w-full bg-linen p-10 text-center"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Gold accent line */}
          <div className="mx-auto mb-6 h-0.5 w-12 bg-gold" />

          <h2 id="thank-you-modal-title" className="font-display text-4xl font-semibold text-forest">
            Thank you.
          </h2>
          <p className="mx-auto mt-4 max-w-xs font-sans text-sm leading-relaxed text-fog-dark">
            We will be in touch within 2 hours during business hours. We look
            forward to having you at the table.
          </p>

          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="mt-8 inline-flex min-h-[48px] items-center rounded-full bg-gold px-8 py-3 font-sans text-sm font-medium text-forest transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2 focus-visible:ring-offset-linen"
          >
            Close
          </button>

          <p className="mt-4 font-sans text-xs italic text-fog-dark">
            This is a demo site. No data was sent.
          </p>
        </m.div>
      </m.div>
    </AnimatePresence>
  );
}

// Hook: returns { showModal, handleSubmit, modal }
// Usage:
//   const { handleSubmit, modal } = useDemoForm();
//   <form onSubmit={handleSubmit}> ... </form>
//   {modal}
// Pass `onReset` to clear any React state that mirrors form fields (e.g. a
// controlled date input), since form.reset() only clears the DOM.
export function useDemoForm({ onReset }: { onReset?: () => void } = {}) {
  const [open, setOpen] = useState(false);

  const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setOpen(true);
    // Reset the form so it is clean if the modal is dismissed and re-used.
    (e.target as HTMLFormElement).reset();
    onReset?.();
  }, [onReset]);

  const modal = open ? <ThankYouModal onClose={() => setOpen(false)} /> : null;

  return { handleSubmit, modal };
}

import { useEffect, type RefObject } from 'react';

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Keeps Tab / Shift+Tab cycling inside the given containers while `active`,
 * as required for `aria-modal` dialogs (WCAG 2.4.3). Several containers are
 * allowed so a dialog can include a toggle button that lives outside it
 * (e.g. the navbar hamburger that closes the mobile menu).
 */
export function useFocusTrap(containers: RefObject<HTMLElement>[], active: boolean) {
  useEffect(() => {
    if (!active) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const nodes = containers
        .flatMap((ref) => (ref.current ? Array.from(ref.current.querySelectorAll<HTMLElement>(FOCUSABLE)) : []))
        .concat(containers.map((ref) => ref.current).filter((el): el is HTMLElement => !!el && el.matches(FOCUSABLE)))
        .filter((el) => el.offsetParent !== null || el === document.activeElement);
      if (!nodes.length) return;

      // Order by position in the document so Tab follows visual order. The
      // containers may not be adjacent in the DOM (the menu is portaled to
      // <body>), so move focus ourselves on every Tab instead of only at the
      // ends, or the browser would step into the page between them.
      nodes.sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));
      const index = nodes.indexOf(document.activeElement as HTMLElement);
      const step = e.shiftKey ? -1 : 1;
      const next =
        index === -1
          ? e.shiftKey ? nodes[nodes.length - 1] : nodes[0]
          : nodes[(index + step + nodes.length) % nodes.length];
      e.preventDefault();
      next.focus();
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
    // Refs are stable; re-run only when the trap toggles.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);
}

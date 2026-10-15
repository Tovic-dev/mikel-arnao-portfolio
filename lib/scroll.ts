import type Lenis from "lenis";

// Shared handle to the Lenis instance (set by SmoothScroll), so other components
// can jump the page without fighting the smooth-scroll loop.
let current: Lenis | null = null;

export function setLenis(instance: Lenis | null) {
  current = instance;
}

/** Instant scroll to an element, bypassing smoothing and scroll animations. */
export function jumpTo(target: HTMLElement) {
  if (current) {
    current.scrollTo(target, { immediate: true, force: true });
  } else {
    const top = target.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top, behavior: "instant" });
  }
}

// Review switches for the approval build (07 §9, D-33). Stored for the browser
// session only, set from the URL (?motion=on|off, ?scroll=lenis|native,
// ?review=on|off) or the review panel. Never on by default.
//
// Remove the panel and the Lenis option once D-33 is decided (14 §3).

export type ReviewPrefs = {
  motion: "system" | "on";
  scroll: "native" | "lenis";
  panel: boolean;
};

const KEYS = { motion: "motion", scroll: "scroll", panel: "review" } as const;

function read(key: string): string | null {
  try {
    return sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function write(key: string, value: string | null) {
  try {
    if (value === null) sessionStorage.removeItem(key);
    else sessionStorage.setItem(key, value);
  } catch {
    // Storage blocked: the switch simply doesn't persist.
  }
}

/** Reads URL parameters into session storage, then returns the current prefs. */
export function getReviewPrefs(): ReviewPrefs {
  if (typeof window === "undefined") {
    return { motion: "system", scroll: "native", panel: false };
  }
  const params = new URLSearchParams(window.location.search);
  const motion = params.get("motion");
  if (motion === "on") write(KEYS.motion, "on");
  if (motion === "off") write(KEYS.motion, null);
  const scroll = params.get("scroll");
  if (scroll === "lenis") write(KEYS.scroll, "lenis");
  if (scroll === "native") write(KEYS.scroll, null);
  const review = params.get("review");
  if (review === "on") write(KEYS.panel, "on");
  if (review === "off") write(KEYS.panel, null);
  // Using any switch from the URL also shows the panel.
  if (motion || scroll) write(KEYS.panel, "on");

  return {
    motion: read(KEYS.motion) === "on" ? "on" : "system",
    scroll: read(KEYS.scroll) === "lenis" ? "lenis" : "native",
    panel: read(KEYS.panel) === "on",
  };
}

export function setReviewPref<K extends keyof ReviewPrefs>(
  key: K,
  value: ReviewPrefs[K],
) {
  if (key === "motion") write(KEYS.motion, value === "on" ? "on" : null);
  if (key === "scroll") write(KEYS.scroll, value === "lenis" ? "lenis" : null);
  if (key === "panel") write(KEYS.panel, value ? "on" : null);
}

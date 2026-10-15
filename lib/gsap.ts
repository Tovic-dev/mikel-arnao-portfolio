"use client";

// Single place where GSAP plugins are registered (07 §4, 08 §5).
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { motionForced } from "./review";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

// Motion tokens (07 §2) mirrored as GSAP eases.
export const EASE_OUT = "expo.out"; // ≈ cubic-bezier(0.16, 1, 0.3, 1)
export const EASE_STANDARD = "power2.inOut";

export const MOTION_FORCED = motionForced();

export const MOTION_OK = MOTION_FORCED
  ? "all"
  : "(prefers-reduced-motion: no-preference)";

/** Lenis runs with a mouse or trackpad when motion is allowed (D-33: Lenis chosen). */
export function smoothScrollActive(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    window.matchMedia(MOTION_OK).matches
  );
}

/** Scroll-linked timelines: Lenis already smooths the scroll, so scrub 1:1;
 *  with native touch scrolling, smooth the animation itself instead. */
export function scrubAmount(): true | number {
  return smoothScrollActive() ? true : 0.6;
}

gsap.defaults({ ease: EASE_OUT, duration: 0.7 });

export { gsap, ScrollTrigger, SplitText, useGSAP };

"use client";

// Single place where GSAP plugins are registered (07 §4, 08 §5).
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { getReviewPrefs } from "./review";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

// Motion tokens (07 §2) mirrored as GSAP eases.
export const EASE_OUT = "expo.out"; // ≈ cubic-bezier(0.16, 1, 0.3, 1)
export const EASE_STANDARD = "power2.inOut";

// Review switch (lib/review.ts): `?motion=on` plays the motion even when the OS
// asks for reduced motion (e.g. Windows "Animation effects" off). Session only.
export const MOTION_FORCED = getReviewPrefs().motion === "on";

export const MOTION_OK = MOTION_FORCED
  ? "all"
  : "(prefers-reduced-motion: no-preference)";

gsap.defaults({ ease: EASE_OUT, duration: 0.7 });

export { gsap, ScrollTrigger, SplitText, useGSAP };

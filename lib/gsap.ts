"use client";

// Single place where GSAP plugins are registered (07 §4, 08 §5).
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

// Motion tokens (07 §2) mirrored as GSAP eases.
export const EASE_OUT = "expo.out"; // ≈ cubic-bezier(0.16, 1, 0.3, 1)
export const EASE_STANDARD = "power2.inOut";

// Review switch: `?motion=on` plays the motion even when the OS asks for reduced
// motion (e.g. Windows "Animation effects" off); `?motion=off` clears it. Kept for
// the session only, never on by default.
function motionForced(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const param = new URLSearchParams(window.location.search).get("motion");
    if (param === "on") sessionStorage.setItem("motion", "on");
    if (param === "off") sessionStorage.removeItem("motion");
    return sessionStorage.getItem("motion") === "on";
  } catch {
    return false;
  }
}

export const MOTION_OK = motionForced()
  ? "all"
  : "(prefers-reduced-motion: no-preference)";

gsap.defaults({ ease: EASE_OUT, duration: 0.7 });

export { gsap, ScrollTrigger, SplitText, useGSAP };

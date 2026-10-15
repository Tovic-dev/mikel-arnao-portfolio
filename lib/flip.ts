"use client";

// GSAP Flip, loaded only where it's used (the Work page), so the homepage
// bundle is unchanged (05 Part D7).
import { gsap } from "./gsap";

type FlipPlugin = typeof import("gsap/Flip").Flip;
let cached: Promise<FlipPlugin> | null = null;

export function loadFlip(): Promise<FlipPlugin> {
  cached ??= import("gsap/Flip").then(({ Flip }) => {
    gsap.registerPlugin(Flip);
    return Flip;
  });
  return cached;
}

"use client";

import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { gsap, MOTION_FORCED, MOTION_OK, ScrollTrigger } from "@/lib/gsap";
import { getReviewPrefs } from "@/lib/review";

// Lenis smooth scroll for the D-33 comparison (07 §4). Off unless chosen with
// ?scroll=lenis or the review panel. Desktop pointers only (touch keeps native
// momentum), and off when motion is reduced unless motion is forced for review.
// Driven from the GSAP ticker so there is one animation loop.
export function SmoothScroll() {
  const lenis = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (getReviewPrefs().scroll !== "lenis") return;
    const desktop = window.matchMedia("(hover: hover) and (pointer: fine)");
    const motion = window.matchMedia(
      MOTION_OK === "all" ? "all" : "(prefers-reduced-motion: no-preference)",
    );
    if (!desktop.matches || !motion.matches) return;

    const instance = new Lenis({
      autoRaf: false,
      lerp: 0.08,
      anchors: true,
      stopInertiaOnNavigate: true,
      respectReducedMotion: !MOTION_FORCED,
    });
    lenis.current = instance;
    instance.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    document.documentElement.dataset.scroll = "lenis";

    return () => {
      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33);
      instance.destroy();
      lenis.current = null;
      delete document.documentElement.dataset.scroll;
    };
  }, []);

  // New page: start at the top without a smoothed scroll.
  useEffect(() => {
    lenis.current?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return null;
}

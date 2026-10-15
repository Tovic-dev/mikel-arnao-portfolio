"use client";

import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { markAppReady } from "@/lib/navigation";
import {
  gsap,
  MOTION_FORCED,
  ScrollTrigger,
  smoothScrollActive,
} from "@/lib/gsap";

// Lenis smooth scroll (D-33: chosen by Mikel at Checkpoint A). Mouse and trackpad
// only (touch keeps native momentum); off with reduced motion unless motion is
// forced for review. Driven from the GSAP ticker so there is one animation loop.
export function SmoothScroll() {
  const lenis = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // From now on, page changes are in-site navigation (CaseStudyEntrance).
    markAppReady();
    if (!smoothScrollActive()) return;

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

    return () => {
      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33);
      instance.destroy();
      lenis.current = null;
    };
  }, []);

  // New page: start at the top without a smoothed scroll.
  useEffect(() => {
    lenis.current?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return null;
}

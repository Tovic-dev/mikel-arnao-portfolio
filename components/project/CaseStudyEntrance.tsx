"use client";

import { useRef, useState } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";
import { isInSiteNavigation } from "@/lib/navigation";

// Case-study entrance (Checkpoint A): an ink curtain covers the screen as the page
// arrives, then lifts away while the intro rises and the hero render opens.
// Same language as the homepage curtains. Plays only on in-site navigation (not on
// a first visit) and never with reduced motion. Total ≈ 1.1 s.
export function CaseStudyEntrance({ label }: { label: string }) {
  const curtain = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useGSAP(() => {
    const el = curtain.current;
    if (!el) return;
    const play = isInSiteNavigation() && window.matchMedia(MOTION_OK).matches;
    if (!play) {
      setDone(true);
      return;
    }

    const page = el.parentElement;
    const intro = page?.querySelectorAll("[data-enter=intro]") ?? [];
    const hero = page?.querySelector("[data-enter=hero]");

    gsap.set(el, { display: "flex", yPercent: 0 });
    // Failsafe: the curtain must never stay over the page (e.g. if frames stall).
    const failsafe = window.setTimeout(() => {
      tl.progress(1);
      setDone(true);
    }, 2000);
    const tl = gsap.timeline({
      onComplete: () => {
        window.clearTimeout(failsafe);
        setDone(true);
      },
    });
    tl.fromTo(
      el.querySelector("[data-enter=label]"),
      { autoAlpha: 0, y: 12 },
      { autoAlpha: 1, y: 0, duration: 0.35, ease: "power2.out" },
      0,
    )
      .to(el, { yPercent: -100, duration: 0.75, ease: "power3.inOut" }, 0.3)
      .from(
        intro,
        {
          autoAlpha: 0,
          y: 24,
          duration: 0.6,
          stagger: 0.06,
          ease: "expo.out",
          clearProps: "transform,opacity,visibility",
        },
        0.5,
      )
      .fromTo(
        hero ?? [],
        { clipPath: "inset(100% 0% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 0.9,
          ease: "power3.inOut",
          clearProps: "clipPath",
        },
        0.45,
      );
  });

  if (done) return null;

  return (
    <div
      ref={curtain}
      aria-hidden="true"
      className="fixed inset-0 z-(--z-skip) hidden items-end bg-ink p-(--page-margin) text-paper"
    >
      <p data-enter="label" className="label text-paper/70">
        {label}
      </p>
    </div>
  );
}

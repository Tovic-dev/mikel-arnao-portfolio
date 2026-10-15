"use client";

import { useRef, type ElementType } from "react";
import { gsap, MOTION_OK, ScrollTrigger, SplitText, useGSAP } from "@/lib/gsap";

interface RevealHeadingProps {
  as?: ElementType;
  children: string;
  className?: string;
  id?: string;
  /**
   * "lines": line masks on scroll (07 T1).
   * "chars": character masks on load, hero H1 only (07 §3H).
   */
  mode?: "lines" | "chars";
  delay?: number;
}

// Split-text heading reveal. SplitText's default aria handling keeps the full
// sentence as the accessible name (aria-label) and hides the split pieces.
export function RevealHeading({
  as: Tag = "h2",
  children,
  className,
  id,
  mode = "lines",
  delay = 0,
}: RevealHeadingProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        SplitText.create(el, {
          type: mode === "chars" ? "lines,chars" : "lines",
          mask: "lines",
          autoSplit: true,
          onSplit(self) {
            const targets = mode === "chars" ? self.chars : self.lines;
            return gsap.from(targets, {
              yPercent: 115,
              duration: mode === "chars" ? 1 : 0.7,
              ease: mode === "chars" ? "power4.out" : "expo.out",
              stagger: mode === "chars" ? 0.015 : 0.07,
              delay,
              scrollTrigger:
                mode === "lines"
                  ? { trigger: el, start: "top 85%", once: true }
                  : undefined,
            });
          },
        });
        return () => ScrollTrigger.refresh();
      });
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} id={id} className={className}>
      {children}
    </Tag>
  );
}

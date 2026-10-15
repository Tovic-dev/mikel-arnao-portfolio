"use client";

import { useRef } from "react";
import { gsap, MOTION_OK, SplitText, useGSAP } from "@/lib/gsap";

// Case-study entrance (Checkpoint A, replaces the ink curtain). Uses the same
// "appear" language as the rest of the site:
// - project label: fade + 16 px (as hero meta lines)
// - title: line masks (as section headings, RevealHeading)
// - summary and the role block: fade + 16 px, staggered
// - hero render: clip opens bottom→top (as Reveal "clip")
// The body sections keep their own scroll reveals. Off with reduced motion;
// hidden start states are applied by JS, so the page is complete without it.
export function CaseStudyEntrance() {
  const marker = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const page = marker.current?.parentElement;
    if (!page) return;
    const q = gsap.utils.selector(page);
    gsap.matchMedia().add(MOTION_OK, () => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.from(
        q("[data-enter=label]"),
        { autoAlpha: 0, y: 16, duration: 0.5 },
        0,
      );

      const title = q("[data-enter=title]")[0];
      if (title) {
        SplitText.create(title, {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit(self) {
            return gsap.from(self.lines, {
              yPercent: 115,
              duration: 0.8,
              stagger: 0.07,
              ease: "expo.out",
              delay: 0.06,
            });
          },
        });
      }

      tl.from(
        q("[data-enter=intro]"),
        { autoAlpha: 0, y: 16, duration: 0.6, stagger: 0.07 },
        0.2,
      );
      // The hero render's clip reveal is CSS (.load-clip): it starts at first
      // paint, so it doesn't delay LCP.
    });
  });

  return <span ref={marker} hidden />;
}

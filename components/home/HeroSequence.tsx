"use client";

import { useRef, type ReactNode } from "react";
import {
  gsap,
  MOTION_OK,
  ScrollTrigger,
  scrubAmount,
  SplitText,
  useGSAP,
} from "@/lib/gsap";

// Owns the hero load timeline (07 §3B, ≤ 1.4 s) and the curtain scroll-out (07 §3H).
// Adapted from "Sticky Grid Scroll" by Theo Plawinski (Codrops), MIT licence.
export function HeroSequence({ children }: { children: ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(scope);
      const root = q('[data-hero="root"]')[0] as HTMLElement | undefined;
      const wrapper = scope.current;
      if (!root || !wrapper) return;

      // A sticky element taller than the screen would hide its lower part under
      // the curtain. Stick by the bottom edge instead, so all of it scrolls past.
      const setStickyTop = () => {
        wrapper.style.top = `${Math.min(0, window.innerHeight - wrapper.offsetHeight)}px`;
      };
      setStickyTop();
      const resize = new ResizeObserver(setStickyTop);
      resize.observe(wrapper);
      window.addEventListener("resize", setStickyTop);

      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        // Load sequence
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.fromTo(
          q('[data-hero="image"]'),
          { clipPath: "inset(100% 0% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 0.9,
            ease: "power3.inOut",
          },
          0.05,
        );

        const title = q('[data-hero="title"]')[0];
        if (title) {
          SplitText.create(title, {
            type: "lines,chars",
            mask: "lines",
            autoSplit: true,
            onSplit(self) {
              return gsap.from(self.chars, {
                yPercent: 115,
                duration: 1,
                ease: "power4.out",
                stagger: 0.015,
                delay: 0.08,
              });
            },
          });
        }

        tl.from(
          q('[data-hero="meta"], [data-hero="lead"]'),
          { autoAlpha: 0, y: 16, duration: 0.5, stagger: 0.06 },
          0,
        )
          .fromTo(
            q('[data-hero="leader"]'),
            { strokeDasharray: 1, strokeDashoffset: 1 },
            {
              strokeDashoffset: 0,
              duration: 0.5,
              stagger: 0.09,
              ease: "power2.out",
            },
            0.9,
          )
          .from(q('[data-hero="dot"]'), { autoAlpha: 0, duration: 0.25 }, 0.9)
          .from(
            q('[data-hero="label"]'),
            { autoAlpha: 0, duration: 0.25, stagger: 0.06 },
            1.1,
          );
      });

      // Curtain: the next section covers the hero (layout stays sticky for everyone;
      // only the scale/shade is motion).
      mm.add(
        {
          motion: MOTION_OK,
          small: "(max-width: 39.99rem)",
        },
        (ctx) => {
          const { motion, small } = ctx.conditions as {
            motion: boolean;
            small: boolean;
          };
          const next = scope.current?.nextElementSibling as HTMLElement | null;
          if (!next) return;
          const inner = q('[data-hero="inner"]');
          const shade = q('[data-hero="shade"]');
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: next,
              start: "top bottom",
              end: "top top",
              scrub: scrubAmount(),
              onLeave: () => gsap.set(root, { visibility: "hidden" }),
              onEnterBack: () => gsap.set(root, { visibility: "visible" }),
            },
          });
          if (motion) {
            tl.to(
              inner,
              { scale: small ? 0.96 : 0.94, yPercent: -8, ease: "none" },
              0,
            ).to(shade, { opacity: small ? 0.35 : 0.5, ease: "none" }, 0);
          } else {
            tl.to({}, { duration: 1 });
          }
          return () => ScrollTrigger.refresh();
        },
      );

      return () => {
        resize.disconnect();
        window.removeEventListener("resize", setStickyTop);
      };
    },
    { scope },
  );

  // The wrapper is the sticky element: it sticks for the whole of <main>.
  return (
    <div ref={scope} className="sticky top-0 z-0">
      {children}
    </div>
  );
}

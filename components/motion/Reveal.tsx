"use client";

import { useRef, type ReactNode } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

interface RevealProps {
  children: ReactNode;
  /** "clip" opens images bottom→top; "fade" lifts text 16 px. */
  variant?: "clip" | "fade";
  delay?: number;
  className?: string;
}

// Once-only scroll reveal (07 W1/W2, C2, C6). The hidden start state is applied
// by JS, so the content is fully visible without JavaScript or with reduced motion.
export function Reveal({
  children,
  variant = "fade",
  delay = 0,
  className,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const from =
          variant === "clip"
            ? { clipPath: "inset(100% 0% 0% 0%)" }
            : { autoAlpha: 0, y: 16 };
        const to =
          variant === "clip"
            ? { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9 }
            : { autoAlpha: 1, y: 0, duration: 0.5 };
        gsap.fromTo(el, from, {
          ...to,
          delay,
          clearProps: "clipPath,transform,opacity,visibility",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

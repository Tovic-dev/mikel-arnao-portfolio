"use client";

import type { MouseEvent, ReactNode } from "react";
import { gsap, MOTION_OK, ScrollTrigger } from "@/lib/gsap";
import { jumpTo } from "@/lib/scroll";

// In-page link that skips the scroll animations in between (Checkpoint A): the
// page fades to paper, jumps instantly to the target, then fades back in. Used by
// the hero CTA so the sticky process grid isn't played on the way to the projects.
export function JumpLink({
  targetId,
  className,
  children,
}: {
  targetId: string;
  className?: string;
  children: ReactNode;
}) {
  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    const target = document.getElementById(targetId);
    if (!target || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) {
      return;
    }
    // Handle it here, not in Lenis's anchor handling (which would scroll through).
    e.preventDefault();
    e.stopPropagation();

    let landed = false;
    const land = () => {
      if (landed) return;
      landed = true;
      jumpTo(target);
      ScrollTrigger.update();
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    };

    if (!window.matchMedia(MOTION_OK).matches) {
      land();
      return;
    }

    const veil = document.createElement("div");
    veil.setAttribute("aria-hidden", "true");
    veil.style.cssText =
      "position:fixed;inset:0;z-index:100;background:var(--color-paper);opacity:0;pointer-events:none";
    document.body.appendChild(veil);

    // Failsafe: always land and clear the veil, even if animation frames stall.
    const failsafe = window.setTimeout(() => {
      land();
      veil.remove();
    }, 1500);

    gsap
      .timeline({
        onComplete: () => {
          window.clearTimeout(failsafe);
          veil.remove();
        },
      })
      .to(veil, { opacity: 1, duration: 0.25, ease: "power2.in" })
      .add(land)
      // Let scrubbed timelines settle at their end state while the page is hidden.
      .to(veil, { opacity: 0, duration: 0.45, ease: "power2.out" }, "+=0.25");
  };

  return (
    <a href={`#${targetId}`} onClick={onClick} className={className}>
      {children}
    </a>
  );
}

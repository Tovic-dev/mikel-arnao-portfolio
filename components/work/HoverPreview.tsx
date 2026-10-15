"use client";

import Image from "next/image";
import { useEffect, useRef, type RefObject } from "react";
import type { ImageAsset } from "@/content/types";
import { gsap, MOTION_OK } from "@/lib/gsap";

// Floating 3:2 preview that follows the pointer over the index (05 Part D5).
// Desktop pointers with motion allowed only; decorative (aria-hidden).
export function HoverPreview({
  listRef,
  images,
}: {
  listRef: RefObject<HTMLElement | null>;
  images: { slug: string; image: ImageAsset }[];
}) {
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const list = listRef.current;
    const el = box.current;
    if (!list || !el) return;
    const ok =
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      window.matchMedia(MOTION_OK).matches;
    if (!ok) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3.out" });
    let current: string | null = null;

    // Last known pointer position (viewport coordinates).
    let px = -1;
    let py = -1;

    const place = () => {
      const w = el.offsetWidth;
      const h = el.offsetHeight;
      const x = Math.min(px + 24, window.innerWidth - w - 16);
      const y = Math.min(Math.max(py - h / 2, 16), window.innerHeight - h - 16);
      xTo(x);
      yTo(y);
    };

    const show = (slug: string) => {
      if (slug === current) return;
      const imgs = el.querySelectorAll<HTMLElement>("[data-preview]");
      imgs.forEach((img) =>
        gsap.to(img, {
          autoAlpha: img.dataset.preview === slug ? 1 : 0,
          duration: 0.2,
          overwrite: "auto",
        }),
      );
      if (current === null) {
        gsap.fromTo(
          el,
          { clipPath: "inset(100% 0% 0% 0%)", autoAlpha: 1 },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 0.35,
            ease: "power3.out",
            overwrite: "auto",
          },
        );
      }
      current = slug;
    };

    const hide = () => {
      if (current === null) return;
      current = null;
      gsap.to(el, { autoAlpha: 0, duration: 0.2, overwrite: "auto" });
    };

    // Decide from what is under the pointer right now, so the preview stays in
    // sync when rows move under a still cursor (wheel / Lenis scrolling), not
    // only on pointer events (which the browser doesn't send while scrolling).
    const update = () => {
      if (px < 0) return;
      const hit = document.elementFromPoint(px, py);
      const row = hit?.closest<HTMLElement>("[data-row]");
      if (!row || row.hidden || !list.contains(row)) return hide();
      place();
      show(row.dataset.row ?? "");
    };

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    const onMove = (e: PointerEvent) => {
      px = e.clientX;
      py = e.clientY;
      update();
    };
    const onLeaveWindow = () => {
      px = -1;
      hide();
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeaveWindow);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener(
        "pointerleave",
        onLeaveWindow,
      );
      window.removeEventListener("scroll", onScroll);
    };
  }, [listRef]);

  return (
    <div
      ref={box}
      data-hover-preview
      aria-hidden="true"
      className="pointer-events-none invisible fixed top-0 left-0 z-(--z-raised) aspect-3/2 w-[min(22vw,23.75rem)] overflow-hidden bg-raised opacity-0"
    >
      {images.map(({ slug, image }) => (
        <Image
          key={slug}
          data-preview={slug}
          src={image.src}
          alt=""
          sizes="380px"
          className="invisible absolute inset-0 size-full object-cover opacity-0"
        />
      ))}
    </div>
  );
}

"use client";

import Image from "next/image";
import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import type { ImageAsset } from "@/content/types";
import { PlaceholderTag } from "@/components/ui/PlaceholderTag";

type Side = ImageAsset & { label: string };

// CAD → render comparison (07 C4). Drag the divider, use arrow keys on it, or the
// toggle buttons (touch). Direct manipulation, so it works with reduced motion too.
export function CompareSlider({
  before,
  after,
  sizes,
}: {
  before: Side;
  after: Side;
  sizes: string;
}) {
  const box = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);

  const fromPointer = (e: PointerEvent) => {
    const rect = box.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = ((e.clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, pct)));
  };

  const onKey = (e: KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 5;
    const next =
      e.key === "ArrowLeft" || e.key === "ArrowDown"
        ? pos - step
        : e.key === "ArrowRight" || e.key === "ArrowUp"
          ? pos + step
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? 100
              : null;
    if (next === null) return;
    e.preventDefault();
    setPos(Math.min(100, Math.max(0, next)));
  };

  return (
    <div>
      <div
        ref={box}
        className="relative touch-pan-y overflow-hidden bg-raised select-none"
        onPointerDown={(e) => {
          dragging.current = true;
          e.currentTarget.setPointerCapture(e.pointerId);
          fromPointer(e);
        }}
        onPointerMove={(e) => dragging.current && fromPointer(e)}
        onPointerUp={() => (dragging.current = false)}
        onPointerCancel={() => (dragging.current = false)}
      >
        <Image
          src={before.src}
          alt={before.alt}
          placeholder="blur"
          sizes={sizes}
          className="block h-auto w-full"
          draggable={false}
        />
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
        >
          <Image
            src={after.src}
            alt={after.alt}
            sizes={sizes}
            className="size-full object-cover"
            draggable={false}
          />
        </div>
        <span className="absolute top-2 left-2 bg-raised px-2 py-1 label text-ink">
          {before.label}
        </span>
        <span className="absolute right-2 bottom-2 bg-raised px-2 py-1 label text-ink">
          {after.label}
        </span>
        {(before.placeholder || after.placeholder) && <PlaceholderTag />}

        <div
          role="slider"
          tabIndex={0}
          aria-label={`Compare ${before.label} and ${after.label}`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          aria-valuetext={`${Math.round(100 - pos)}% ${after.label}`}
          onKeyDown={onKey}
          className="absolute inset-y-0 z-(--z-raised) w-11 -translate-x-1/2 cursor-ew-resize focus-visible:outline-offset-0"
          style={{ left: `${pos}%` }}
        >
          <span className="absolute inset-y-0 left-1/2 w-px bg-accent" />
          <span className="absolute top-1/2 left-1/2 grid size-8 -translate-1/2 place-items-center border border-accent bg-paper font-mono text-mono-body text-ink">
            ⇔
          </span>
        </div>
      </div>

      <div className="mt-3 flex gap-2 sm:hidden">
        <button
          type="button"
          onClick={() => setPos(100)}
          aria-pressed={pos === 100}
          className="min-h-11 flex-1 border border-ink px-3 label aria-pressed:bg-ink aria-pressed:text-paper"
        >
          {before.label}
        </button>
        <button
          type="button"
          onClick={() => setPos(0)}
          aria-pressed={pos === 0}
          className="min-h-11 flex-1 border border-ink px-3 label aria-pressed:bg-ink aria-pressed:text-paper"
        >
          {after.label}
        </button>
      </div>
    </div>
  );
}

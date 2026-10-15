"use client";

import { useEffect, useState } from "react";
import { getReviewPrefs, setReviewPref, type ReviewPrefs } from "@/lib/review";

// Small review toolbar for Checkpoint A (D-33): compare native scroll with Lenis,
// and force motion on machines with reduced motion. Hidden unless opened with
// ?review=on (or any review URL switch). Remove before launch (14 §3).
export function ReviewPanel() {
  const [prefs, setPrefs] = useState<ReviewPrefs | null>(null);

  useEffect(() => {
    // Read after mount so server and client HTML match.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPrefs(getReviewPrefs());
  }, []);

  if (!prefs?.panel) return null;

  const apply = <K extends keyof ReviewPrefs>(
    key: K,
    value: ReviewPrefs[K],
  ) => {
    setReviewPref(key, value);
    // Reload without the query string so URL switches don't override the choice.
    window.location.replace(window.location.pathname + window.location.hash);
  };

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <aside
      aria-label="Review settings"
      className="fixed bottom-3 left-3 z-(--z-skip) flex flex-col gap-2 border border-paper/20 bg-ink p-3 text-paper print:hidden"
    >
      <div className="flex items-center justify-between gap-6">
        <p className="label text-paper/60">Review</p>
        <button
          type="button"
          onClick={() => apply("panel", false)}
          className="label text-paper/60 hover:text-paper"
          aria-label="Hide review settings"
        >
          Hide
        </button>
      </div>
      <Toggle
        label="Scroll"
        options={[
          ["native", "Native"],
          ["lenis", "Lenis"],
        ]}
        value={prefs.scroll}
        onChange={(v) => apply("scroll", v as ReviewPrefs["scroll"])}
      />
      <Toggle
        label="Motion"
        options={[
          ["system", reduced ? "System (off)" : "System"],
          ["on", "Force on"],
        ]}
        value={prefs.motion}
        onChange={(v) => apply("motion", v as ReviewPrefs["motion"])}
      />
      {prefs.scroll === "lenis" && (
        <p className="max-w-[26ch] font-mono text-label leading-snug text-paper/60">
          Lenis runs with a mouse or trackpad only; touch keeps native
          scrolling.
        </p>
      )}
    </aside>
  );
}

function Toggle({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: [string, string][];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <fieldset className="flex items-center gap-3">
      <legend className="sr-only">{label}</legend>
      <span aria-hidden="true" className="w-12 label text-paper/60">
        {label}
      </span>
      <div className="flex">
        {options.map(([v, text]) => (
          <button
            key={v}
            type="button"
            aria-pressed={value === v}
            onClick={() => value !== v && onChange(v)}
            className="min-h-9 border border-paper/30 px-3 label text-paper/70 not-first:-ml-px hover:text-paper aria-pressed:border-paper aria-pressed:bg-paper aria-pressed:text-ink"
          >
            {text}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

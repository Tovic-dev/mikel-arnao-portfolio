import type { Credit } from "@/content/types";

function creditLabel(credit?: Credit): string | undefined {
  if (!credit) return undefined;
  if (credit === "mikel") return "Mikel";
  if (credit === "team") return "Team";
  return credit;
}

// FIG 05.2 — Circuit redesign · Mikel (10 §5)
export function Caption({
  figure,
  text,
  credit,
}: {
  figure: string;
  text?: string;
  credit?: Credit;
}) {
  const who = creditLabel(credit);
  return (
    <figcaption className="mt-3 label text-ink-3">
      <span className="text-ink">FIG {figure}</span>
      {text && <> — {text}</>}
      {who && <> · {who}</>}
    </figcaption>
  );
}

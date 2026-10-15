// Visible marker on stand-in images outside production (09 §6).
// VERCEL_ENV is "preview" on preview deployments; locally it's undefined.
const show = process.env.VERCEL_ENV !== "production";

export function PlaceholderTag() {
  if (!show) return null;
  return (
    <span
      aria-hidden="true"
      className="absolute top-2 right-2 z-(--z-raised) bg-ink px-2 py-1 label text-paper"
    >
      Placeholder
    </span>
  );
}

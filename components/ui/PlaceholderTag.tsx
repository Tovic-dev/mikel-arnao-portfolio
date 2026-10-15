// Visible marker on stand-in images (09 §6). Shown everywhere: launch requires
// zero placeholders (14 §1), so it can never reach a finished site.
export function PlaceholderTag() {
  return (
    <span
      aria-hidden="true"
      className="absolute top-2 right-2 z-(--z-raised) bg-ink px-2 py-1 label text-paper"
    >
      Placeholder
    </span>
  );
}

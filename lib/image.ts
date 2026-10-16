import type { StaticImageData } from "next/image";

/** Blurred placeholder when the upload has one (made on upload), else none. */
export const blur = (src: StaticImageData): "blur" | "empty" =>
  src.blurDataURL ? "blur" : "empty";

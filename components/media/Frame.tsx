import Image from "next/image";
import type { ImageAsset } from "@/content/types";
import { PlaceholderTag } from "@/components/ui/PlaceholderTag";

// Image on the raised surface at its own aspect ratio (10 §5 media frame).
export function Frame({
  image,
  sizes,
  className,
}: {
  image: ImageAsset;
  sizes: string;
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden bg-raised ${className ?? ""}`}>
      <Image
        src={image.src}
        alt={image.alt}
        placeholder="blur"
        sizes={sizes}
        className="block h-auto w-full"
      />
      {image.placeholder && <PlaceholderTag />}
    </div>
  );
}

import type { Media } from "@/content/types";
import { Reveal } from "@/components/motion/Reveal";
import { AnnotatedImage } from "./AnnotatedImage";
import { BarChart } from "./BarChart";
import { Caption } from "./Caption";
import { CompareSlider } from "./CompareSlider";
import { Frame } from "./Frame";
import { SpecTable } from "./SpecTable";

const SIZES = {
  text: "(min-width: 64rem) 50vw, 100vw",
  wide: "(min-width: 64rem) 72vw, 100vw",
  "full-bleed": "100vw",
} as const;

// One place that maps a media `type` to its module (06 §4).
export function MediaBlock({
  media,
  figure,
}: {
  media: Media;
  figure: string;
}) {
  const width = media.width ?? "wide";
  const sizes = SIZES[width];

  const body = (() => {
    switch (media.type) {
      case "image":
        return (
          <Reveal variant="clip">
            <Frame image={media} sizes={sizes} />
          </Reveal>
        );
      case "grid":
        return (
          <div
            className={`grid gap-(--grid-gutter) ${media.images.length >= 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}
          >
            {media.images.map((img, i) => (
              <Reveal key={i} variant="clip" delay={i * 0.09}>
                <Frame image={img} sizes="(min-width: 40rem) 36vw, 100vw" />
              </Reveal>
            ))}
          </div>
        );
      case "compare":
        return (
          <CompareSlider
            before={media.before}
            after={media.after}
            sizes={sizes}
          />
        );
      case "annotated":
        return (
          <AnnotatedImage
            image={media}
            annotations={media.annotations}
            sizes={sizes}
          />
        );
      case "table":
        return (
          <SpecTable table={media} label={media.caption ?? `Table ${figure}`} />
        );
      case "chart":
        return <BarChart chart={media} />;
      case "sequence":
        return (
          <ol className="grid gap-(--grid-gutter) sm:grid-cols-3">
            {media.steps.map((step, i) => (
              <li key={step.title}>
                <Reveal variant="clip" delay={i * 0.09}>
                  <Frame image={step} sizes="(min-width: 40rem) 24vw, 100vw" />
                </Reveal>
                <p className="mt-3 label text-ink">
                  <span className="text-accent-text">
                    {String(i + 1).padStart(2, "0")}
                  </span>{" "}
                  {step.title}
                </p>
              </li>
            ))}
          </ol>
        );
    }
  })();

  return (
    <figure
      className={
        width === "full-bleed"
          ? "relative z-(--z-raised) w-full"
          : width === "text"
            ? "lg:max-w-[min(100%,48rem)]"
            : ""
      }
    >
      {body}
      <div className={width === "full-bleed" ? "container-page" : ""}>
        <Caption figure={figure} text={media.caption} credit={media.credit} />
      </div>
    </figure>
  );
}

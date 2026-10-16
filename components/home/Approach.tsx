import type { Route } from "next";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { RevealHeading } from "@/components/motion/RevealHeading";

// Approach (05 A4): each step points to the case-study section that proves it.
interface ApproachProps {
  title: string;
  steps: { title: string; text: string; proof: string; href: string }[];
}

export function Approach({ title, steps }: ApproachProps) {
  return (
    <section aria-labelledby="approach-title" className="relative z-1 bg-paper">
      <div className="container-page border-t border-rule py-(--section-space)">
        <p className="label text-ink-3">Approach</p>
        <RevealHeading
          id="approach-title"
          className="mt-6 max-w-[22ch] text-h2"
        >
          {title}
        </RevealHeading>
        <ol className="mt-16 grid gap-10 sm:grid-cols-2 sm:gap-x-(--grid-gutter) lg:grid-cols-4">
          {steps.map((step, i) => (
            <li key={step.title}>
              <Reveal
                delay={i * 0.09}
                className="flex h-full flex-col border-t border-ink pt-4"
              >
                <span className="label text-ink-3">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-6 text-h3">{step.title}</h3>
                <p className="mt-3 text-small text-ink-2">{step.text}</p>
                <Link
                  href={step.href as Route}
                  className="mt-6 font-mono text-mono-body text-ink underline decoration-rule-strong underline-offset-4 transition-colors duration-(--dur-base) ease-standard hover:decoration-accent"
                >
                  {step.proof}
                </Link>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

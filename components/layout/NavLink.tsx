"use client";

import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

interface NavLinkProps {
  href: Route | `#${string}`;
  /** Path prefix that marks this link as the current page. */
  match?: string;
  children: ReactNode;
}

// Marks the current section with the accent colour and aria-current (07 G2).
export function NavLink({ href, match, children }: NavLinkProps) {
  const pathname = usePathname();
  const isCurrent = match !== undefined && pathname.startsWith(match);

  return (
    <Link
      href={href as Route}
      aria-current={isCurrent ? "page" : undefined}
      className="inline-flex min-h-11 items-center label text-ink-2 transition-colors duration-(--dur-fast) ease-standard hover:text-ink aria-[current=page]:text-accent-text aria-[current=page]:underline aria-[current=page]:decoration-accent aria-[current=page]:underline-offset-4 sm:font-sans sm:text-small sm:tracking-normal sm:normal-case"
    >
      {children}
    </Link>
  );
}

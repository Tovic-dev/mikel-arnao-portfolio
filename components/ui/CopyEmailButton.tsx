"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";

type Status = "idle" | "copied" | "failed";

// Copy-to-clipboard with an aria-live status (07 G4).
export function CopyEmailButton({ email }: { email: string }) {
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    if (status === "idle") return;
    const id = window.setTimeout(() => setStatus("idle"), 2000);
    return () => window.clearTimeout(id);
  }, [status]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
  }

  const Icon = status === "copied" ? Check : Copy;

  return (
    <>
      <button
        type="button"
        onClick={copy}
        className="inline-flex min-h-12 cursor-pointer items-center gap-2 border border-ink px-5 label transition-colors duration-(--dur-base) ease-standard hover:border-accent-text hover:text-accent-text"
      >
        <Icon aria-hidden="true" className="size-4" strokeWidth={1.5} />
        {status === "copied" ? "Copied" : "Copy email"}
      </button>
      <span role="status" aria-live="polite" className="sr-only">
        {status === "copied" && "Email address copied to clipboard"}
        {status === "failed" &&
          "Couldn't copy. The email address is shown above."}
      </span>
    </>
  );
}

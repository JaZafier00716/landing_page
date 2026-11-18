"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";

type Labels = { done: string; failed: string };

/**
 * Icon-only copy button; a grid item of the contact row. The live region announces the result
 * (screen-reader only on success, visible text on failure so it is not color-only) and clears after 2 s.
 */
export default function CopyButton({ value, label, labels }: { value: string; label: string; labels: Labels }) {
  const [status, setStatus] = useState<"idle" | "done" | "failed">("idle");
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  const finish = (s: "done" | "failed") => {
    setStatus(s);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus("idle"), 2000);
  };
  return (
    <>
      <button
        type="button"
        className="icon-btn swap"
        aria-label={label}
        onClick={() => navigator.clipboard.writeText(value).then(() => finish("done"), () => finish("failed"))}
      >
        <Copy aria-hidden className="size-[1.125em]" strokeWidth={1.5} {...(status === "done" ? { "data-off": "" } : {})} />
        <Check aria-hidden className="size-[1.125em] text-accent" strokeWidth={2} {...(status === "done" ? {} : { "data-off": "" })} />
      </button>
      <span aria-live="polite" className={status === "failed" ? "mono-meta col-span-2 col-start-2 pb-2 text-muted" : "sr-only"}>
        {status === "done" ? labels.done : status === "failed" ? labels.failed : ""}
      </span>
    </>
  );
}

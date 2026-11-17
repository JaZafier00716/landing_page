"use client";

import { useState } from "react";
import { Copy } from "lucide-react";

type Labels = { label: string; done: string; failed: string };

export default function CopyButton({ value, labels }: { value: string; labels: Labels }) {
  const [status, setStatus] = useState("");
  return (
    <span className="inline-flex items-center gap-2">
      <button
        type="button"
        className="btn btn-secondary min-h-11 px-3 py-1 text-sm"
        onClick={() =>
          navigator.clipboard.writeText(value).then(
            () => setStatus(labels.done),
            () => setStatus(labels.failed),
          )
        }
      >
        <Copy aria-hidden />
        {labels.label}
      </button>
      <span aria-live="polite" className="mono-meta text-muted">
        {status}
      </span>
    </span>
  );
}

"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

const media = "(prefers-color-scheme: dark)";
const isDark = () =>
  document.documentElement.dataset.theme
    ? document.documentElement.dataset.theme === "dark"
    : matchMedia(media).matches;

function subscribe(cb: () => void) {
  const mq = matchMedia(media);
  mq.addEventListener("change", cb);
  window.addEventListener("themechange", cb);
  return () => {
    mq.removeEventListener("change", cb);
    window.removeEventListener("themechange", cb);
  };
}

export default function ThemeToggle({ label }: { label: string }) {
  const dark = useSyncExternalStore(subscribe, isDark, () => null);
  return (
    <button
      type="button"
      aria-pressed={dark ?? undefined}
      className="flex size-11 shrink-0 items-center justify-center hover:text-accent"
      onClick={() => {
        const next = isDark() ? "light" : "dark";
        document.documentElement.dataset.theme = next;
        try {
          localStorage.setItem("theme", next);
        } catch {}
        window.dispatchEvent(new Event("themechange"));
      }}
    >
      {dark ? <Sun aria-hidden className="size-5" /> : <Moon aria-hidden className="size-5" />}
      <span className="sr-only">{label}</span>
    </button>
  );
}

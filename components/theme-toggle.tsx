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

type Labels = { toDark: string; toLight: string; toggle: string };

// The label names the action and changes with the state, so there is no aria-pressed.
export default function ThemeToggle({ labels }: { labels: Labels }) {
  const dark = useSyncExternalStore(subscribe, isDark, () => null);
  return (
    <button
      type="button"
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
      <span className="sr-only">{dark === null ? labels.toggle : dark ? labels.toLight : labels.toDark}</span>
    </button>
  );
}

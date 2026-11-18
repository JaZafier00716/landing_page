"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { themeColors } from "@/app/theme";

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
// The icon swap is pure CSS (--is-dark), so it needs no state and cannot mismatch on hydration.
export default function ThemeToggle({ labels }: { labels: Labels }) {
  const dark = useSyncExternalStore(subscribe, isDark, () => null);
  return (
    <button
      type="button"
      className="icon-btn swap"
      aria-label={dark === null ? labels.toggle : dark ? labels.toLight : labels.toDark}
      onClick={() => {
        const next = isDark() ? "light" : "dark";
        document.documentElement.dataset.theme = next;
        document.querySelectorAll<HTMLMetaElement>("meta[name=theme-color]").forEach((m) => (m.content = themeColors[next]));
        try {
          localStorage.setItem("theme", next);
        } catch {}
        window.dispatchEvent(new Event("themechange"));
      }}
    >
      <Sun aria-hidden className="theme-sun size-5" />
      <Moon aria-hidden className="theme-moon size-5" />
    </button>
  );
}

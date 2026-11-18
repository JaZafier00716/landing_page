import { ViewTransition } from "react";

// A template remounts on every navigation, so the default crossfade fires (layouts persist and would not).
export default function Template({ children }: { children: React.ReactNode }) {
  return <ViewTransition>{children}</ViewTransition>;
}

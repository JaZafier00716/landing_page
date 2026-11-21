import type { CSSProperties } from "react";

/**
 * Short muted stubs that leave a content panel's outer edge into the gutter and end in a via (DESIGN.md §5.5, "Traces"),
 * spread along the panel's height. Static, aria-hidden, absolutely positioned (no reflow), xl+ only (CSS). The parent must be
 * `.stub-host` (position: relative, not clipped).
 *
 * Exact dot alignment: a panel's y on the page depends on content flow, which CSS cannot know, so the panel carries its own
 * dot layer in its gutter (`.edge-stubs::before`, origin = the panel's top edge, x phase = the page backdrop's) that covers the
 * backdrop dots there. Via rows are `round(p, 24px) + 12px` from the panel top and via columns are snapped like the hero's, so every
 * via sits on a dot of that local layer. See globals.css. Where the page backdrop is visible next to a panel, its y phase can differ
 * from the local layer's by up to one cell at the panel's top and bottom edges.
 */
type Stub = { p: string; len: number; dy: -24 | 0 | 24 };

// p = nominal via row as a share of the panel height (snapped down to a row), len = nominal edge-to-via distance in px, dy = the 45 degree jog.
export const cardStubs: Stub[] = [
  { p: "9%", len: 64, dy: 24 },
  { p: "33%", len: 52, dy: 0 },
  { p: "58%", len: 56, dy: -24 },
  { p: "84%", len: 60, dy: 24 },
];
export const nodeStubs: Stub[] = [
  { p: "28%", len: 60, dy: 24 },
  { p: "74%", len: 52, dy: 0 },
];
export const entryStubs: Stub[] = [{ p: "36px", len: 60, dy: 24 }];

export default function EdgeStubs({ stubs = cardStubs }: { stubs?: Stub[] }) {
  return (
    <span className="edge-stubs" aria-hidden>
      {stubs.map((s) => (
        <span key={s.p} className="tr tr-s" style={{ "--p": s.p, "--len": `${s.len}px`, "--dy": `${s.dy}px` } as CSSProperties}>
          <span className="tr-in">
            <span className="tr-run" />
            <svg className="tr-tail" width="24" height="1" viewBox="0 0 24 1" fill="none" strokeWidth="1.25" strokeLinejoin="round" focusable="false">
              <path d={`M0 0L24 ${s.dy}`} />
              <circle cx="24" cy={s.dy} r="3.5" />
            </svg>
          </span>
        </span>
      ))}
    </span>
  );
}

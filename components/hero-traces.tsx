/**
 * Decorative PCB-style traces for the home hero (DESIGN.md §5.5). Static, server-rendered, aria-hidden, no JS.
 *
 * Every trace is anchored to the readout panel (rendered inside the panel wrapper, overflowing outward) and starts at a
 * square pad drawn on the panel's border; the other end is an open ring (via) on a dot of the page backdrop.
 * Pieces: [pad] -> optional head (fixed shape) -> run (variable length, so the via can snap) -> tail (fixed shape) -> via.
 * The variable part is computed in CSS (`--vx`, see globals.css): the via is snapped to the 24 px dot pitch from the
 * panel's known grid position. Y is fixed: the panel top is 65 px below the grid origin from lg, so pad rows are
 * hand-picked in dot rows (12 + 24n). Coordinates below are px in the trace's own frame (x outward, y down).
 */
import type { CSSProperties } from "react";

type Side = "r" | "tl" | "tr";
type Trace = { side: Side; at: number; dy?: number; accent?: boolean };

// r: pad on the panel's right edge, `at` = px from the panel top (65 + at = dot row). tl/tr: pad on the top edge, `at` = px from the panel's left/right edge.
const traces: Trace[] = [
  { side: "r", at: 43, dy: -24 }, // dot row 108 -> via on row 84
  { side: "r", at: 115, dy: 24 }, // row 180 -> row 204
  { side: "r", at: 187, dy: -24, accent: true }, // row 252 -> row 228
  { side: "tl", at: 40 }, // up and left, along dot row 36 (above all content)
  { side: "tr", at: 56 }, // up and right, along dot row 36
];

const HEAD = "M0 0V-17L12-29"; // pad on the top edge, up 17, 45 degrees up to the run's row
const RUN_Y = -29; // panel top is 65 px below the grid origin (64 + the header's 1 px hairline), so -29 lands on dot row 36

const style = (t: Trace): CSSProperties => {
  if (t.side === "r") return { top: t.at, "--h": "0px", "--t": "24px", "--ry": "0px" } as CSSProperties;
  const edge = t.side === "tl" ? { top: 0, left: t.at } : { top: 0, right: t.at };
  return { ...edge, "--ax": `${t.at}px`, "--h": "12px", "--t": "0px", "--ry": `${RUN_Y}px` } as unknown as CSSProperties;
};

export default function HeroTraces() {
  return (
    <div aria-hidden>
      {traces.map((t, i) => {
        const dy = t.dy ?? 0;
        const top = t.side !== "r";
        return (
          <span key={i} className={`tr tr-${t.side}${t.accent ? " tr-accent" : ""}`} style={style(t)}>
            <span className="tr-in">
              {top && (
                <svg className="tr-head" width="12" height="1" viewBox="0 0 12 1" fill="none" strokeWidth="1.25" strokeLinejoin="round" focusable="false">
                  <path d={HEAD} />
                </svg>
              )}
              <span className="tr-run" />
              <svg className="tr-tail" width="24" height="1" viewBox="0 0 24 1" fill="none" strokeWidth="1.25" strokeLinejoin="round" focusable="false">
                {!top && <path d={`M0 0L24 ${dy}`} />}
                <circle cx={top ? 0 : 24} cy={top ? 0 : dy} r="3.5" />
              </svg>
              <span className="tr-pad" />
            </span>
          </span>
        );
      })}
    </div>
  );
}

/** One accent trace to the primary CTA: pad on the button's left edge, a run into the left gutter, a via on a dot column. */
export function CvTrace() {
  return (
    <span className="tr tr-cv tr-accent" aria-hidden style={{ left: 0, top: 22, "--h": "0px", "--t": "0px", "--ry": "0px" } as CSSProperties}>
      <span className="tr-in">
        <span className="tr-run" />
        <svg className="tr-tail" width="1" height="1" viewBox="0 0 1 1" fill="none" strokeWidth="1.25" focusable="false">
          <circle cx="0" cy="0" r="3.5" />
        </svg>
        <span className="tr-pad" />
      </span>
    </span>
  );
}

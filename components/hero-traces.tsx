/**
 * Decorative PCB-style traces for the home hero (DESIGN.md §5.5). Static, server-rendered, aria-hidden, no JS.
 *
 * Every trace is anchored to a hero element (the readout panel or the Download CV button, rendered inside its wrapper and
 * overflowing outward) and starts at a square pad on that element's border; the other end is an open ring (via).
 * Pieces: [pad] -> optional head (fixed shape) -> run (variable length, so the via can snap) -> tail (fixed shape) -> via.
 * The variable length is computed in CSS (`--vx`, see globals.css): the via is snapped to the 24 px dot pitch from the
 * element's known grid position. Panel traces are also snapped in y (the panel top is 65 px below the grid origin from lg,
 * so pad rows are hand-picked in dot rows 12 + 24n); the CV traces are snapped in x only (the button's y depends on content).
 * Coordinates are px in each trace's own frame (x outward from the pad, y down). `len` is the nominal pad-to-via distance.
 */
import type { CSSProperties } from "react";

// r/l: pad on the panel's right/left edge, `at` = px from the panel top (65 + at = dot row).
// tl/tm/tr: pad on the top edge, `at` = px from the panel's left (tl, tm) or right (tr) edge; `ry` = row of the run (px above the top edge).
type Side = "r" | "l" | "tl" | "tm" | "tr";
type Trace = { side: Side; at: number; len: number; dy?: number; ry?: number; accent?: boolean };

// The text column ends 200 px left of the panel, so left vias (len <= 132) keep >= 60 px clear of the name and meta line.
// No bottom traces: only 32 px separate the panel from the marquee chips.
const traces: Trace[] = [
  { side: "r", at: 43, len: 120, dy: -24 }, // dot row 108 -> via on row 84
  { side: "r", at: 115, len: 96, dy: 24 }, // 180 -> 204
  { side: "r", at: 187, len: 120, dy: -24, accent: true }, // 252 -> 228
  { side: "l", at: 67, len: 96, dy: 24 }, // 132 -> 156
  { side: "l", at: 163, len: 132, dy: -24 }, // 228 -> 204
  { side: "l", at: 259, len: 84, dy: 24 }, // 324 -> 348
  { side: "tl", at: 40, len: 150, ry: 29 }, // up and left along dot row 36 (above all content)
  { side: "tm", at: 190, len: 130, ry: 53 }, // up and right along dot row 12
  { side: "tr", at: 56, len: 120, ry: 29 }, // up and right along dot row 36
];

const px = (n: number) => `${n}px`;

function Pieces({ head, via, dy = 0 }: { head?: string; via: "tail" | "point"; dy?: number }) {
  const svg = { fill: "none", strokeWidth: 1.25, strokeLinejoin: "round", focusable: false } as const;
  return (
    <>
      {head && (
        <svg className="tr-head" width="12" height="1" viewBox="0 0 12 1" {...svg}>
          <path d={head} />
        </svg>
      )}
      <span className="tr-run" />
      {via === "tail" ? (
        <svg className="tr-tail" width="24" height="1" viewBox="0 0 24 1" {...svg}>
          <path d={`M0 0L24 ${dy}`} />
          <circle cx="24" cy={dy} r="3.5" />
        </svg>
      ) : (
        <svg className="tr-tail" width="1" height="1" viewBox="0 0 1 1" {...svg}>
          <circle cx="0" cy="0" r="3.5" />
        </svg>
      )}
      <span className="tr-pad" />
    </>
  );
}

export default function HeroTraces() {
  return (
    <div aria-hidden>
      {traces.map((t, i) => {
        const side = t.side === "r" || t.side === "l";
        const ry = side ? 0 : -(t.ry ?? 29);
        const vars = { "--len": px(t.len), "--h": side ? "0px" : "12px", "--t": side ? "24px" : "0px", "--ry": px(ry) };
        const pos: CSSProperties = side
          ? { top: t.at }
          : t.side === "tr"
            ? { top: 0, right: t.at }
            : { top: 0, left: t.at };
        return (
          <span key={i} className={`tr tr-${t.side}${t.accent ? " tr-accent" : ""}`} style={{ ...pos, ...vars, "--ax": px(t.at) } as unknown as CSSProperties}>
            <span className="tr-in">
              <Pieces head={side ? undefined : `M0 0V${ry + 12}L12 ${ry}`} via={side ? "tail" : "point"} dy={t.dy} />
            </span>
          </span>
        );
      })}
    </div>
  );
}

// Pins on the Download CV button: one accent trace to the left (into the gutter, short so it stays well inside the window at 1280)
// and three muted pins from the bottom edge: down, a 45 degree turn, then sideways to a via. Pins to the right are deepest on the
// left, so no run crosses another pin's vertical; none passes the "PDF, n KB" text (they start below the button) or reaches the marquee.
const pins = [
  { at: 24, len: 200, ry: 74 },
  { at: 72, len: 150, ry: 50 },
  { at: 120, len: 100, ry: 26 },
];

export function CvTrace() {
  const left = { "--h": "0px", "--t": "0px", "--ry": "0px" } as unknown as CSSProperties;
  return (
    <>
      <span className="tr tr-cv tr-accent" aria-hidden style={{ left: 0, top: 22, ...left }}>
        <span className="tr-in">
          <Pieces via="point" />
        </span>
      </span>
      {pins.map((p) => (
        <span
          key={p.at}
          className="tr tr-cb"
          aria-hidden
          style={{ left: p.at, top: "100%", "--ax": px(p.at), "--len": px(p.len), "--h": "12px", "--t": "0px", "--ry": px(p.ry) } as unknown as CSSProperties}
        >
          <span className="tr-in">
            <Pieces head={`M0 0V${p.ry - 12}L12 ${p.ry}`} via="point" />
          </span>
        </span>
      ))}
    </>
  );
}

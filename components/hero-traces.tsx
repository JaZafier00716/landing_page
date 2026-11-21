/**
 * Decorative PCB-style traces behind the home hero (DESIGN.md §5.5). Static, server-rendered inline SVG,
 * aria-hidden, drawn on the page backdrop's 24 px pitch so every via sits on a dot (the dots are the centres of
 * 24 px cells, hence the +12 offset; `.hero-traces` snaps its left edge to a multiple of 24 px).
 * Geometry is hand-authored in cell units: no randomness, no runtime work. Colours are tokens (see globals.css).
 */
const CELL = 24;
type Pt = readonly [number, number];
type Trace = { accent?: boolean; pts: readonly Pt[] };

// x: 0 = left edge of the SVG, the readout panel spans cells ~18-36. y: 0 = top of the hero.
const traces: Trace[] = [
  // left of the readout, in the empty area below the name: a short bus of two muted traces and one accent trace
  { pts: [[18, 9], [15, 9], [13, 11], [10, 11]] },
  { pts: [[18, 10], [14, 10], [12, 12], [10, 12]] },
  { pts: [[18, 6], [16, 6], [14, 4], [12, 4]] },
  { accent: true, pts: [[18, 15], [14, 15], [12, 17], [8, 17]] },
  // above and right of the readout
  { pts: [[19, 1], [30, 1]] },
  { pts: [[36, 5], [39, 5], [41, 7], [44, 7]] },
  { pts: [[36, 11], [40, 11], [42, 13], [44, 13]] },
  { accent: true, pts: [[36, 15], [38, 15], [40, 17], [40, 18]] },
];

const xy = ([x, y]: Pt) => `${x * CELL + CELL / 2} ${y * CELL + CELL / 2}`;
const line = (t: Trace) => "M" + t.pts.map(xy).join("L");
// vias sit at the free end only: the other end disappears behind the readout panel
const viaAt = (t: Trace) => t.pts[t.pts.length - 1];

export default function HeroTraces() {
  const via = (t: Trace, i: number) => {
    const [x, y] = viaAt(t).map((v) => v * CELL + CELL / 2);
    return <circle key={i} cx={x} cy={y} r="3.5" />;
  };
  const muted = traces.filter((t) => !t.accent);
  const accent = traces.filter((t) => t.accent);
  return (
    <div className="hero-traces" aria-hidden>
      <svg width="1104" height="480" viewBox="0 0 1104 480" fill="none" strokeWidth="1.25" strokeLinejoin="round" focusable="false">
        <g className="trace-muted">
          {muted.map((t, i) => <path key={i} d={line(t)} />)}
          {muted.map(via)}
        </g>
        <g className="trace-accent">
          {accent.map((t, i) => <path key={i} d={line(t)} />)}
          {accent.map(via)}
        </g>
      </svg>
    </div>
  );
}

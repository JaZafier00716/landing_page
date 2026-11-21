/**
 * Short muted stubs that leave a content panel's outer edge into the gutter and end in a via (DESIGN.md §5.5, "Traces"),
 * spread along the panel's height. Static, aria-hidden, absolutely positioned (no reflow), xl+ only (CSS). The parent must be
 * `.stub-host` (position: relative, not clipped). Drawn outward from the panel edge; CSS mirrors them for the left side.
 * Vias are not snapped to the backdrop dots: panel edges are not on the 24 px grid, and the grid ends 40rem down.
 */
const shapes = [
  { d: "M-1 0H22L38 16", via: [38, 16] }, // jog down
  { d: "M-1 0H30", via: [30, 0] }, // straight, short
  { d: "M-1 0H18L34-16", via: [34, -16] }, // jog up
  { d: "M-1 0H40L52 12", via: [52, 12] }, // long, jog down
] as const;

type Stub = { y: string; shape: 0 | 1 | 2 | 3 };

export const cardStubs: Stub[] = [
  { y: "9%", shape: 3 },
  { y: "33%", shape: 1 },
  { y: "58%", shape: 0 },
  { y: "84%", shape: 2 },
];
export const nodeStubs: Stub[] = [
  { y: "28%", shape: 0 },
  { y: "74%", shape: 1 },
];
export const entryStubs: Stub[] = [{ y: "2.25rem", shape: 0 }];

export default function EdgeStubs({ stubs = cardStubs }: { stubs?: Stub[] }) {
  return (
    <span className="edge-stubs" aria-hidden>
      {stubs.map((s) => {
        const sh = shapes[s.shape];
        return (
          <svg key={s.y} style={{ top: s.y }} width="1" height="1" viewBox="0 0 1 1" fill="none" strokeWidth="1.25" strokeLinejoin="round" focusable="false">
            <path d={sh.d} />
            <circle cx={sh.via[0]} cy={sh.via[1]} r="3.5" />
          </svg>
        );
      })}
    </span>
  );
}

/**
 * Short muted stubs that leave a content panel's edge into the gutter and end in a via (DESIGN.md §5.5, "Traces").
 * Static, aria-hidden, absolutely positioned (no reflow), xl+ only (CSS). The parent must be `.stub-host`
 * (position: relative, not clipped). Drawn outward from the panel edge; CSS mirrors them for the left side.
 * Vias are not snapped to the backdrop dots: panel edges are not on the 24 px grid, and the grid ends 40rem down.
 */
export default function EdgeStubs({ count = 2 }: { count?: 1 | 2 }) {
  return (
    <span className="edge-stubs" aria-hidden>
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" strokeWidth="1.25" strokeLinejoin="round" focusable="false">
        <path d="M-1 0H22L38 16" />
        <circle cx="38" cy="16" r="3.5" />
        {count === 2 && (
          <>
            <path d="M-1 40H32" />
            <circle cx="32" cy="40" r="3.5" />
          </>
        )}
      </svg>
    </span>
  );
}

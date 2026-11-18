import TechIcon, { techNames } from "./tech-icon";

/** Stack marquee: the list is duplicated once (the copy is aria-hidden); static wrapped row under reduced motion. */
export default function TechMarquee({ variant }: { variant: "a" | "b" }) {
  const chips = variant === "b";
  const items = (
    <>
      {techNames.map((n) => (
        <li key={n} translate="no" className={`mono-meta flex items-center gap-2 ${chips ? "chip" : ""}`}>
          <TechIcon name={n} />
          {n}
        </li>
      ))}
    </>
  );
  return (
    <div className="marquee" role="region" aria-label="Stack">
      <div className={`marquee-track ambient ${chips ? "chips" : ""}`}>
        <ul>{items}</ul>
        <ul aria-hidden>{items}</ul>
      </div>
    </div>
  );
}

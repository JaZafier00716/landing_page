import { Fragment } from "react";
import { AppWindow, ArrowLeftRight, Binary, Box, Cable, Cpu, Database, FileText, Gamepad2, Hammer, Image, Languages, Monitor, Replace, ScanEye, Sigma, Tags, Terminal, Type, Workflow, type LucideIcon } from "lucide-react";
import { marks } from "./tech-icons-data";

// One inline-SVG icon per technology. Sources and licences: ICONS.md at the repo root.
// Brand marks: Simple Icons paths (tech-icons-data.ts). Concepts without a brand mark: lucide.
const lucide: Record<string, LucideIcon> = {
  database: Database, cpu: Cpu, binary: Binary, gamepad: Gamepad2, hammer: Hammer, image: Image, type: Type, window: AppWindow, monitor: Monitor,
  cable: Cable, sigma: Sigma, replace: Replace, socket: ArrowLeftRight, box: Box, tags: Tags, vision: ScanEye, terminal: Terminal,
  workflow: Workflow, file: FileText, languages: Languages,
};

/** Lower-case display names (as they appear in the seed, EN and CS) -> icon id (a key of `marks` or `lucide`). */
const ids: Record<string, string> = {
  "c": "c", "c++": "cplusplus", "java": "java", "typescript": "typescript", "python": "python", "haskell": "haskell",
  "opengl": "opengl", "glsl": "opengl", "opengl, glsl": "opengl", "next.js": "nextdotjs", "react": "react", "tailwind css": "tailwindcss",
  "storybook": "storybook", "sanity": "sanity", "sanity cms": "sanity", "prisma": "prisma", "postgresql": "postgresql", "php": "php",
  "mysql": "database", "vite": "vite", "express": "express", "vercel": "vercel", "hibernate": "hibernate", "h2": "h2database",
  "cmake": "cmake", "maven": "apachemaven", "pytest": "pytest", "docker": "docker", "linux": "linux", "make": "hammer", "gnu make": "hammer",
  "junit": "junit5", "fastapi": "fastapi", "sqlalchemy": "sqlalchemy", "redis": "redis", "numpy": "numpy", "jdk httpserver": "openjdk",
  "radix ui": "radixui", "css modules": "cssmodules", "git": "git", "npm workspaces": "npm",
  "sql": "database", "pl/sql": "database", "sql, pl/sql": "database", "oracle": "database", "oracle sql": "database", "oracle database": "database",
  "jdbc": "database", "alembic": "database", "vhdl": "cpu", "x86 assembly (nasm)": "binary", "assembler x86 (nasm)": "binary",
  "sdl2": "gamepad", "sdl2_image": "image", "stb_image": "image", "sdl2_ttf": "type", "javafx": "window", "glfw": "monitor", "glad": "cable",
  "glm": "sigma", "msw": "replace", "websocket": "socket", "ogl": "box", "cvat": "tags", "dataset annotation in cvat": "tags",
  "anotace datových sad v cvat": "tags", "computer vision": "vision", "počítačové vidění": "vision", "termios": "terminal",
  "ansi escape sequences": "terminal", "ansi escape sekvence": "terminal", "cli": "terminal", "command line": "terminal",
  "příkazová řádka": "terminal", "posix": "workflow", "apache pdfbox": "file",
  "czech, native": "languages", "čeština, rodilý mluvčí": "languages", "english, cambridge c2 advanced (cae)": "languages",
  "angličtina, cambridge c2 advanced (cae)": "languages",
};

/** Marquee list (home): the languages and tools the readout names, plus the everyday stack. */
export const techNames = ["C", "C++", "OpenGL", "Java", "Python", "Pytest", "Next.js", "TypeScript", "Tailwind CSS", "React", "PostgreSQL", "Docker", "Git", "CMake", "Linux"];

/** Name -> icon id, or null. Tries the exact name, then without a trailing version ("Java 21", "C++23", "Oracle 19c"). */
export const techKey = (n: string) => {
  const k = n.replace(/\u00a0/g, " ").trim().toLowerCase(); // the content layer sets typographic non-breaking spaces
  return ids[k] ?? ids[k.replace(/\s*\d[\w.]*$/, "")] ?? null;
};

/** Inline mark, sized in em, decorative: the name is always printed next to it. */
export default function TechIcon({ name, className = "size-[1.1em] flex-none" }: { name: string; className?: string }) {
  const key = techKey(name);
  if (!key) return null;
  const L = lucide[key];
  if (L) return <L aria-hidden strokeWidth={1.5} className={className} />;
  const m = marks[key];
  return (
    <svg aria-hidden viewBox={`0 0 ${m.vb} ${m.vb}`} fill="currentColor" className={className}>
      <path d={m.d} />
    </svg>
  );
}

/** Text with a mark per technology: "Next.js, React" gets two. Unknown parts stay plain text, so any value can be passed. */
export function TechLabel({ name }: { name: string }) {
  const parts = techKey(name) ? [name] : name.split(", ");
  return parts.map((p, i) => {
    const icon = <TechIcon name={p.split(":")[0]} />;
    return (
      <Fragment key={i}>
        {i > 0 && " "}
        <span className="inline-flex items-center gap-[0.4em]">
          {icon}
          {p}
          {i < parts.length - 1 && ","}
        </span>
      </Fragment>
    );
  });
}

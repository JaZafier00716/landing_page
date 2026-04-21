"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import ProjectStackIcons from "./project-stack-icons";

type ProjectStackItem = {
  name: string;
  iconClass: string;
};

export type ProjectCardData = {
  id: number;
  name: string;
  description: string;
  thumbnail: string;
  href: string;
  previewMode: "image" | "website";
  stack: ProjectStackItem[];
};

type ProjectCardProps = {
  project: ProjectCardData;
  delay: number;
};

export default function ProjectCard({ project, delay }: Readonly<ProjectCardProps>) {
  const isExternal = /^https?:\/\//.test(project.href);
  const desktopViewportWidth = 1600;
  const desktopViewportHeight = 900;
  const previewContainerRef = useRef<HTMLDivElement>(null);
  const [previewScale, setPreviewScale] = useState(1);

  useEffect(() => {
    if (project.previewMode !== "website") return;

    const element = previewContainerRef.current;
    if (!element) return;

    const observer = new ResizeObserver(([entry]) => {
      const width = entry.contentRect.width;
      if (width > 0) {
        setPreviewScale(width / desktopViewportWidth);
      }
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, [project.previewMode]);

  return (
    <Link
      href={project.href}
      className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      aria-label={`Open ${project.name} project link`}
    >
      <motion.article
        initial={{ opacity: 0, translateY: "-40%" }}
        animate={{
          opacity: 1,
          translateY: 0,
          transition: { delay, duration: 0.35, ease: "easeOut" },
        }}
        whileHover={{ translateY: -6 }}
        className="flex h-full flex-col overflow-hidden rounded-2xl border-2 border-emerald-600 bg-gray-900 p-6 transition-shadow duration-300 hover:shadow-[0_0_24px_rgba(16,185,129,0.25)]"
      >
        <div className="-mx-6 -mt-6 mb-4 overflow-hidden rounded-t-2xl">
          {project.previewMode === "website" ? (
            <div
              ref={previewContainerRef}
              className="relative aspect-[16/9] w-full overflow-hidden rounded-t-2xl bg-black [clip-path:inset(0_round_1rem_1rem_0_0)]"
            >
              <iframe
                src={project.href}
                title={`${project.name} website preview`}
                loading="lazy"
                className="pointer-events-none absolute left-0 top-0 border-0"
                style={{
                  width: `${desktopViewportWidth}px`,
                  height: `${desktopViewportHeight}px`,
                  transform: `scale(${previewScale})`,
                  transformOrigin: "top left",
                }}
                sandbox="allow-same-origin allow-scripts"
              />
              <span className="absolute bottom-2 right-2 rounded-md bg-black/70 px-2 py-1 text-xs text-emerald-300">
                Live preview
              </span>
            </div>
          ) : (
            <img
              src={project.thumbnail}
              alt={`${project.name} thumbnail`}
              className="aspect-[16/9] w-full object-cover"
              loading="lazy"
            />
          )}
        </div>

        <h2 className="text-2xl leading-tight text-emerald-400">{project.name}</h2>
        <p className="mt-2 text-sm leading-relaxed text-white">{project.description}</p>
        <div className="mt-auto">
          <ProjectStackIcons projectId={project.id} stack={project.stack} />
        </div>
      </motion.article>
    </Link>
  );
}


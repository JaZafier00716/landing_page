"use client";

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
        className="h-full rounded-2xl border-2 border-emerald-600 bg-gray-900 p-6 transition-shadow duration-300 hover:shadow-[0_0_24px_rgba(16,185,129,0.25)]"
      >
        <div className="-mx-6 -mt-6 mb-4 overflow-hidden rounded-t-2xl">
          {project.previewMode === "website" ? (
            <div className="relative aspect-[16/9] w-full bg-black">
              <iframe
                src={project.href}
                title={`${project.name} website preview`}
                loading="lazy"
                className="pointer-events-none h-full w-full border-0"
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
        <ProjectStackIcons projectId={project.id} stack={project.stack} />
      </motion.article>
    </Link>
  );
}


"use client";

import { motion } from "framer-motion";
import { ProjectItem } from "./projects";

export default function ProjectsClient({ data }: Readonly<{ data: ProjectItem[] }>) {
  return (
    <div className="w-full box-border px-10 py-8 lg:px-16 lg:py-16 xl:py-32">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
        {data.map((project, idx) => (
          <motion.article
            key={project.id}
            initial={{ opacity: 0, translateY: "-40%" }}
            animate={{
              opacity: 1,
              translateY: 0,
              transition: { delay: 0.2 + idx * 0.2, duration: 0.35, ease: "easeOut" },
            }}
            className="h-full rounded-2xl border-2 border-emerald-600 bg-gray-900 p-6"
          >
            <div className="-mx-6 -mt-6 mb-4 overflow-hidden rounded-t-2xl">
              <img
                src={project.thumbnail}
                alt={`${project.name} thumbnail`}
                className="aspect-[16/9] w-full object-cover"
                loading="lazy"
              />
            </div>

            <h2 className="text-2xl text-emerald-400 leading-tight">{project.name}</h2>
            <p className="mt-2 text-sm text-white leading-relaxed">{project.description}</p>

            <div className="mt-5 flex flex-wrap items-center justify-start gap-3 text-2xl text-emerald-400">
              {project.stack.map((item) => (
                <span
                  key={`${project.id}-${item.name}`}
                  title={item.name}
                  aria-label={item.name}
                  className="inline-flex"
                >
                  <i className={item.iconClass} />
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}

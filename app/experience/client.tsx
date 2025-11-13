"use client";

import Job from "@/components/ui/job";
import { motion } from "framer-motion";

type ExperienceSkill = { id: number; title: string };
type ExperienceItem = { company: string; time: string; position: string; skills: ExperienceSkill[] };

export default function ExperienceClient({ data }: Readonly<{ data: ExperienceItem[] }>) {
  return (
    <div className="flex flex-col box-border gap-8 py-8 px-10 lg:py-16 xl:py-32 lg:px-16 w-full justify-evenly">
      {data.map((exp, idx) => (
        <motion.div
          key={`${exp.company}-${idx}`}
          initial={{ opacity: 0, translateY: "-100%" }}
          animate={{
            opacity: 1,
            translateY: 0,
            transition: { delay: 0.2 + idx * 0.3, duration: 0.3, ease: "easeOut" },
          }}
          className="w-full"
        >
          <Job
            delay={0.2 + idx * 0.3}
            time={exp.time}
            company={exp.company}
            position={exp.position}
            skills={exp.skills}
          />
        </motion.div>
      ))}
    </div>
  );
}

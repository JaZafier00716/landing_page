"use client";
import Job from "@/components/ui/job";
import { motion } from "framer-motion";


const page = () => {
  return (
    <div className="flex flex-row flex-wrap box-border xs:gap-8 xs:py-8 px-10 lg:py-16 xl:py-32 lg:px-16 w-full justify-evenly">
      <motion.div
        initial={{
          opacity: 0,
          translateY: "-100%",
        }}
        animate={{
          opacity: 1,
          translateY: 0,
          transition: {
            delay: 0.2,
            duration: 0.3,
            ease: "easeOut",
          },
        }}
      >
        <Job
          delay={0.2}
          time="2023 (7 měsíců)"
          company="Blackfish.co"
          position="Vývojář webových stránek"
          skills={[
            { id: 0, title: "Front-end" },
            { id: 1, title: "NextJS" },
            { id: 2, title: "ReactJS" },
            { id: 3, title: "TypeScript" },
          ]}
        />
      </motion.div>
      <motion.div
        initial={{
          opacity: 0,
          translateY: "-100%",
        }}
        animate={{
          opacity: 1,
          translateY: 0,
          transition: {
            delay: 0.5,
            duration: 0.3,
            ease: "easeOut",
          },
        }}
      >
        <Job
          delay={0.5}
          time="2023 (2 týdny)"
          company="NAM System a.s."
          position="Praxe"
          skills={[
            { id: 0, title: "Oprava počítačů" },
            { id: 1, title: "Čištění počítačů" },
            { id: 2, title: "Práce se síťovými prvky" },
            { id: 3, title: "Web Development" },
          ]}
        />
      </motion.div>
      <motion.div
        initial={{
          opacity: 0,
          translateY: "-100%",
        }}
        animate={{
          opacity: 1,
          translateY: 0,
          transition: {
            delay: 0.8,
            duration: 0.3,
            ease: "easeOut",
          },
        }}
      >
        <Job
          delay={0.8}
          time="2019 - 2023"
          company="Placatý kámen"
          position="Instruktor"
          skills={[
            { id: 0, title: "Příprava her" },
            { id: 1, title: "Práce s dětmi" },
            { id: 2, title: "Skupinová práce" },
          ]}
        />
      </motion.div>
    </div>
  );
};

export default page;

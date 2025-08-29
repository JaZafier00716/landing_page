"use client";
import Job from "@/components/ui/job";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/ui/LanguageProvider";


const Page = () => {
  const { lang, toggleLang } = useLanguage();

  return (
    <div className="flex flex-col box-border gap-8 py-8 px-10 lg:py-16 xl:py-32 lg:px-16 w-full justify-evenly">
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
        className="w-full"
      >
        {lang === "cs" ? (
          <Job
            delay={0.2}
            time="červen 2024 - říjen 2024"
            company="SHOWMORE s.r.o."
            position="Vývojář webových stránek"
            skills={[
              { id: 0, title: "Vývoj webových aplikací pomocí NextJS, TypeScriptu a Tailwind CSS." },
              { id: 1, title: "Významný přínos k projektům pro SolidSun a Sype.to, vylepšení user experience a výkonu." },
              { id: 3, title: "Efektivní spolupráce v týmu, řešení složitých problémů prostřednictvím výzkumu a analýzy." },
            ]}
          />
        ) : (
          <Job
            delay={0.2}
            time="june 2024 - october 2024"
            company="SHOWMORE s.r.o."
            position="Frontend Web Apps Developer"
            skills={[
              { id: 0, title: "Developed web applications using NextJS, TypeScript, and Tailwindcss, collaborating with tools like Git, Storybook, Vercel, Sanity, and Figma to enhance user experience and streamline development processes." },
              { id: 1, title: "Contributed significantly to projects for SolidSun and Sype.to, improving user experience and performance." },
              { id: 3, title: "Collaborated effectively with the team, solving complex problems through research and analysis to achieve project goals." },
            ]}
          />
        )}
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
            delay: 0.2,
            duration: 0.3,
            ease: "easeOut",
          },
        }}
        className="w-full"
      >
        {lang === "cs" ? (
          <Job
            delay={0.2}
            time="2023 - 2024"
            company="Blackfish.co"
            position="Vývojář webových stránek"
            skills={[
              { id: 0, title: "Vývoj webových aplikací pomocí Next.js, TypeScriptu a Tailwind CSS." },
              { id: 1, title: "Vývoj hlavních komponent pro Czechoslovak Group a Skladon." },
              { id: 2, title: "Týmová spolupráce, uplatňování schopnosti řešení problémů a provádění výzkumu ke zlepšení výsledků projektů a efektivity." },
            ]}
          />
        ) : (
          <Job
            delay={0.2}
            time="2023 - 2024"
            company="Blackfish.co"
            position="Frontend Web Apps Developer"
            skills={[
              { id: 0, title: "Built web applications using Next.js, TypeScript, and Tailwind CSS, leveraging Git, Storybook, Vercel, Sanity, and Figma for efficient development workflows." },
              { id: 1, title: "Developed major components of web applications for Czechoslovak Group and Skladon, delivering robust, scalable solutions tailored to client needs." },
              { id: 2, title: "Fostered team collaboration, applied problem-solving skills, and conducted research to improve project outcomes and efficiency." },
            ]}
          />
        )}
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
        className="w-full"
      >
        {lang === "cs" ? (
          <Job
            delay={0.5}
            time="duben 2023 - květen 2023"
            company="NAM System a.s."
            position="Praxe"
            skills={[
              { id: 0, title: "Diagnóza a následná oprava počítačů a testování jejich stability" },
              { id: 1, title: "Testování a troubleshooting pro ověření funkčnosti elektroniky." },
            ]}
          />
        ) : (
          <Job
            delay={0.5}
            time="duben 2023 - květen 2023"
            company="NAM System a.s."
            position="Internship"
            skills={[
              { id: 0, title: "Diagnosed and repaired computer hardware for stable performance." },
              { id: 1, title: "Conducted hardware testing and troubleshooting to verify the functionality of electronic components." },
            ]}
          />
        )}
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
            delay: 0.2,
            duration: 0.3,
            ease: "easeOut",
          },
        }}
        className="w-full"
      >
        {lang === "cs" ? (
          <Job
            delay={0.2}
            time="70 hodin - 2023"
            company="Web development Udemy kurz"
            position="React - The Complete Guide 2024 (incl. Next.js, Redux)"
            skills={[
              { id: 0, title: "Front-end" },
              { id: 1, title: "NextJS" },
              { id: 2, title: "ReactJS" },
              { id: 3, title: "TypeScript" },
            ]}
            className="text-wrap"
          />
        ) : (
          <Job
            delay={0.2}
            time="70 hours - 2023"
            company="Web development Udemy course"
            position="React - The Complete Guide 2024 (incl. Next.js, Redux)"
            skills={[
              { id: 0, title: "Front-end" },
              { id: 1, title: "NextJS" },
              { id: 2, title: "ReactJS" },
              { id: 3, title: "TypeScript" },
            ]}
            className="text-wrap"
          />
        )}
      </motion.div>
      {/* <motion.div
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
        className="xs:w-auto xs:max-w-[20rem] sm:w-2/3 lg:w-auto lg:min-w-[20rem]"
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
      </motion.div> */}
    </div>
  );
};

export default Page;

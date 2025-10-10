"use client"
import { FlagIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Lang } from "@/app/types";

const lang = ({lang} : {lang: Lang}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 xs:w-full lg:w-auto">
      <motion.div
        initial={{
          opacity: 0,
          translateY: "-100%",
        }}
        animate={{
          opacity: 1,
          translateY: 0,
          transition: {
            delay: 2,
            duration: 0.3,
            ease: "easeOut",
          },
        }}
      >
      <h2 className="xs:text-3xl sm:text-4xl text-white">{ lang === "cs" ? "Jazyky" : "Languages"}</h2>
      </motion.div>
      <div className="grid place-items-center xs:grid-cols-1 sm:grid-cols-2 gap-4 w-fit xs:text-3xl sm:text-4xl text-white">
        <motion.div
          initial={{
            opacity: 0,
            translateX: "-100%",
          }}
          animate={{
            opacity: 1,
            translateX: 0,
            transition: {
              delay: 2,
              duration: 0.3,
              ease: "easeOut",
            },
          }}
          className="h-full"
        >
          <h3 className="h-full bg-gray-900 rounded-2xl border-2 border-emerald-600 text-center w-full cursor-pointer box-border px-2 py-8 flex justify-center items-center relative group transition-all duration-500 hover:text-emerald-400">
            {lang === "cs" ? "Čeština" : "Czech"}
          </h3>
        </motion.div>
        <motion.div
          initial={{
            opacity: 0,
            translateX: "-100%",
          }}
          animate={{
            opacity: 1,
            translateX: 0,
            transition: {
              delay: 2.2,
              duration: 0.3,
              ease: "easeOut",
            },
          }}
        >
          <h3 className="h-full bg-gray-900 rounded-2xl border-2 border-emerald-600 text-center w-full cursor-pointer box-border px-2 py-4 flex justify-center items-center flex-col relative group transition-all duration-500 hover:text-emerald-400">
            <span>{lang === "cs" ? "Angličtina" : "English"}</span>
            <span>(C2)</span>
          </h3>
        </motion.div>
      </div>
    </div>
  );
};

export default lang;

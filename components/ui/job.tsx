"use client"
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";


type Job = {
  time: string;
  company: string;
  position: string;
  skills?: {id:number, title: string}[];
  delay: number;
  className?:string;
};

const job = ({ time, company, position, skills, delay, className}: Job) => {
  return (
    <div className={twMerge("border-emerald-600 border-2 bg-gray-900 flex flex-col justify-center items-start box-border p-6 rounded-2xl", className)}>
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
          transition: {
            delay: delay + 0.8,
            duration: 0.3,
            ease: "easeOut",
          },
        }}
      >
        <p className="text-sm text-white">{time}</p>
      </motion.div>
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
          transition: {
            delay: delay+1,
            duration: 0.3,
            ease: "easeOut",
          },
        }}
      >
        <h2 className="text-3xl text-emerald-400 mt-2">{company}</h2>
      </motion.div>
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
          transition: {
            delay: delay+1.2,
            duration: 0.3,
            ease: "easeOut",
          },
        }}
      >
        <h3 className="text-lg text-white mt-2">{position}</h3>
      </motion.div>
      {skills && (
        <ol className=" text-white flex justify-start items-start w-full flex-col mt-4 gap-4">
          {skills?.map((skill) => (
            <motion.div
              key={skill.id}
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
                transition: {
                  delay: delay +1.2 + skill.id/4,
                  duration: 0.3,
                  ease: "easeOut",
                },
              }}
            >
              <li className="flex justify-start gap-4 items-center leading-relaxed">
                <div className="w-[6px] h-[6px] min-w-[6px] min-h-[6px] flex-shrink-0 rounded-full bg-emerald-600" />
                {skill.title}
              </li>
            </motion.div>
          ))}
        </ol>
      )}
    </div>
  );
};

export default job;

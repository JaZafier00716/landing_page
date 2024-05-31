"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import picture_quality from "@/public/images/picture_no_bg_edited.png";

const picture = () => {
  return (
    <div className="w-[300px] h-[300px] md:w-[362px] md:h-[362px] xl:w-[506px] xl:h-[506px] relative">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { delay: 1, duration: 0.5, ease: "easeIn" },
        }}
        className="rounded-full"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { delay: 1.4, duration: 0.5, ease: "easeInOut" },
          }}
          className="w-[298px] h-[298px] md:w-[358px] md:h-[358px] xl:w-[498px] xl:h-[498px] mix-blend-lighten absolute"
        >
          <Image
            src={picture_quality}
            alt="My Picture"
            className="object-contain rounded-full"
            priority
            quality={100}
            fill
          />
        </motion.div>
        <motion.svg
          className="w-[300px] h-[300px] md:w-[362px] md:h-[362px] xl:w-[506px] xl:h-[506px]"
          fill="transparent"
          viewBox="0 0 506 506"
          xmlns="https://www.w3.org/2000/svg"
        >
          <motion.circle
            cx="253"
            cy="253"
            r="250"
            stroke="#059669"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ strokeDasharray: "24 10 0 0" }}
            animate={{
              strokeDasharray: ["15 120 25", "16 25 92 72", "4 250 22 22"],
              rotate: [120, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        </motion.svg>
      </motion.div>
    </div>
  );
};

export default picture;

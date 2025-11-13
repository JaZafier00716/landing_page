"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { SkillItem } from "@/app/skills/skills";
import { Button } from "./button";



type SkillsProps = {
  items: SkillItem[];
  colAmount: number;
  title: string;
};

const SkillsGrid = ({ items, colAmount, title }: SkillsProps) => {
  const [activeIds, setActiveIds] = useState<number[]>([]);

  const toggleActive = (id: number) => {
    setActiveIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // Helper function
  const getGridColsClass = (colAmount: number) => {
    const mapping: Record<number, string> = {
      1: "sm:grid-cols-1",
      2: "sm:grid-cols-2",
      3: "sm:grid-cols-3",
      4: "sm:grid-cols-4",
      5: "sm:grid-cols-5",
      6: "sm:grid-cols-6",
    };
    return mapping[colAmount] || "sm:grid-cols-2";
  };


  const parent =
    "cursor-pointer box-border xs:p-2 lg:p-4 xxl:p-6 relative group transition-all duration-500 hover:text-emerald-400 bg-gray-900 rounded-2xl border-2 border-emerald-600 flex items-center justify-center text-center";

  const child =
    "absolute text-base font-bold text-white -top-1/3 left-1/2 -translate-x-1/2 bg-gray-800 bg-opacity-90 p-2 rounded-full transition-all duration-300";

  // uniform square size
  const squareSize =
    "w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] lg:w-[140px] lg:h-[140px] xxl:w-[160px] xxl:h-[160px]";

  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full lg:w-auto">
      <motion.div
        initial={{ opacity: 0, translateY: "-100%" }}
        animate={{
          opacity: 1,
          translateY: 0,
          transition: { delay: 0.2, duration: 0.3, ease: "easeOut" },
        }}
      >
        <h2 className="text-2xl sm:text-3xl xxl:text-4xl text-white">{title}</h2>
      </motion.div>

      <div
        className={`grid grid-flow-row place-items-center gap-4 text-white grid-cols-2 ${getGridColsClass(colAmount)}`}
      >
        {items.map((item) => {
          const isActive = activeIds.includes(item.id);

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, translateX: "-100%" }}
              animate={{
                opacity: 1,
                translateX: 0,
                transition: { delay: 0.2 + item.id / 4, duration: 0.3, ease: "easeOut" },
              }}
              className="flex items-center justify-center"
            >
              <Button
                className={`${parent} ${squareSize} ${isActive ? "text-emerald-600" : "text-white"} flex flex-col items-center justify-center text-center`}
                onClick={() => toggleActive(item.id)}
              >
                {(() => {
                  if (item.iconClass) {
                    return (
                      <i className={`${item.iconClass} text-[3rem] sm:text-[4rem] lg:text-[5rem] xxl:text-[6rem]`}></i>
                    );
                  } else if (item.Flag) {
                    return (
                      <item.Flag className="w-8 h-8 sm:w-12 sm:h-16 lg:w-16 lg:h-16 xxl:w-20 xxl:h-20" />
                    );
                  } else {
                    return (
                      <div className="flex flex-col items-center justify-center h-full w-full px-2 text-center">
                        <span className="font-extrabold text-xl sm:text-2xl lg:text-3xl xxl:text-4xl">
                          {item.title}
                        </span>
                        {item.subTitle && (
                          <span className="text-base sm:text-lg">{item.subTitle}</span>
                        )}
                      </div>
                    );
                  }
                })()}
                <span className={`${isActive ? "opacity-100" : "opacity-0"} ${child}`}>
                  {item.title}
                </span>
              </Button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default SkillsGrid;

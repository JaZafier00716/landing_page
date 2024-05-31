"use client";
import { useState } from "react";
import { motion } from "framer-motion";

const programming = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [icons, setIcons] = useState([
    {
      id: 0,
      title: "C",
      class: "devicon-c-plain",
      active: false,
    },
    {
      id: 1,
      title: "C++",
      class: "devicon-cplusplus-plain",
      active: false,
    },
    {
      id: 2,
      title: "VHDL",
      class:
        "text-5xl text-extrabold xs:col-span-2 sm:col-span-1 h-full flex justify-center items-center",
      active: false,
    },
  ]);

  const setActiveHandler = (id: number) => {
    setIcons(
      icons.map((icon) =>
        icon.id === id ? { ...icon, active: !icon.active } : { ...icon }
      )
    );
  };

  const parent =
    "cursor-pointer box-border xs:p-4 lg:p-6 relative group transition-all duration-500 hover:text-emerald-400 bg-gray-900 rounded-2xl border-2 border-emerald-600";
  const child =
    "absolute text-base font-bold text-white -top-1/3 left-1/2 -translate-x-1/2 bg-gray-800 bg-opacity-90 p-2 rounded-full transition-all duration-300";

  return (
    <div className="flex flex-col items-center justify-center gap-4 xs:w-full lg:w-auto">
      <h2 className="xs:text-3xl sm:text-4xl text-white">Programování</h2>
      <div className="grid grid-flow-row xs:grid-cols-2 sm:grid-cols-3 place-items-center gap-4 w-fit text-[96px] text-white">
        {icons.map((item) => (
          <motion.div
            key={item.id}
            initial={{
              opacity: 0,
              translateX: "-100%",
            }}
            animate={{
              opacity: 1,
              translateX: 0,
              transition: {
                delay: 1+item.id / 4,
                duration: 0.3,
                ease: "easeOut",
              },
            }}
          >
            <i
              className={`${item.class} ${parent} not-italic ${
                item.active ? "text-emerald-600 " : "text-white"
              }`}
              onClick={() => setActiveHandler(item.id)}
            >
              {item.title === "VHDL" && item.title}
              <span
                className={`${
                  item.active ? "opacity-100" : "opacity-0"
                } ${child}`}
              >
                {item.title}
              </span>
            </i>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default programming;

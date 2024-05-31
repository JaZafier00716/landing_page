"use client";
import { useState } from "react";
import { motion } from "framer-motion";

const web = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [icons, setIcons] = useState([
    {
      id: 0,
      title: "NextJS",
      class: "devicon-nextjs-plain",
      active: false,
    },
    {
      id: 1,
      title: "ReactJS",
      class: "devicon-react-original",
      active: false,
    },
    {
      id: 2,
      title: "Tailwindcss",
      class: "devicon-tailwindcss-original",
      active: false,
    },
    {
      id: 3,
      title: "TypeScript",
      class: "devicon-typescript-plain",
      active: false,
    },
    {
      id: 4,
      title: "CSS3",
      class: "devicon-css3-plain",
      active: false,
    },
    {
      id: 5,
      title: "HTML5",
      class: "devicon-html5-plain",
      active: false,
    },
    {
      id: 6,
      title: "JavaScript",
      class: "devicon-javascript-plain",
      active: false,
    },
    {
      id: 7,
      title: "PHP",
      class: "devicon-php-plain",
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
        <h2 className="xs:text-3xl sm:text-4xl text-white">Web Development</h2>
      </motion.div>
      <div className="grid grid-flow-row xs:grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 place-items-center gap-4 w-fit text-[96px] text-white">
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
                delay: item.id / 4,
                duration: 0.3,
                ease: "easeOut",
              },
            }}
          >
            <i
              className={`${item.class} ${parent} ${
                item.active ? "text-emerald-600 " : "text-white"
              }`}
              onClick={() => setActiveHandler(item.id)}
            >
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

export default web;

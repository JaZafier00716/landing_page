"use client";
import { Download } from "lucide-react";
import { motion } from "framer-motion";
import Picture from "@/components/ui/picture";
import Link from "next/link";
import { Phone, Mail, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Clipboard from "@/components/ui/clipboard";
import { useState } from "react";

const Page = () => {
  const [showClipboard, setShowClipboard] = useState(false);

  const PhoneClickHandler = () => {
    setShowClipboard(true);
    navigator.clipboard.writeText("+420603762712");
  };
  const MailClickHandler = () => {
    setShowClipboard(true);
    navigator.clipboard.writeText("jan.zamostny04@gmail.com")
  };

  return (
    <>
      <div className="box-border flex xl:px-24 xxl:px-52 xs:px-8 xs:flex-col lg:flex-row">
        {showClipboard && <Clipboard setClipboard={setShowClipboard} />}
        <main className="z-20 flex flex-col justify-center xs:items-center lg:items-start h-full lg:py-32 text-white xs:text-center lg:text-start lg:w-1/2 xs:order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, translateX: "-100%" }}
            animate={{
              opacity: 1,
              translateX: 0,
              transition: {
                delay: 0.2,
                duration: 0.5,
                ease: "easeOut",
              },
            }}
          >
            <h1 className="xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-wrap">
              Vítejte na mé osobní stránce
            </h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, translateX: "-100%" }}
            animate={{
              opacity: 1,
              translateX: 0,
              transition: {
                delay: 0.8,
                duration: 0.5,
                ease: "easeOut",
              },
            }}
          >
            <h3 className="xs:text-xl sm:text-2xl md:text-3xl xl:text-4xl mt-4">
              Jmenuji se <span className="text-emerald-400">Jan Zámostný</span>
            </h3>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, translateX: "-100%" }}
            animate={{
              opacity: 1,
              translateX: 0,
              transition: {
                delay: 1.4,
                duration: 0.5,
                ease: "easeOut",
              },
            }}
          >
            <p className="xs:text-md sm:text-lg md:text-xl lg:text-2xl mt-8">
              Jsem nadšený vývojář webových stránek a programátor v různých
              jazycích.
            </p>
          </motion.div>
          <div className="flex xs:flex-col sm:flex-row xs:justify-center lg:justify-start xs:gap-8 xl:gap-16 items-center w-full mt-8">
            <div className="flex xs:gap-8 lg:gap-4 xl:gap-8 h-full items-center justify-start">
              <motion.div
                initial={{ opacity: 0, rotateZ: 360 }}
                animate={{
                  opacity: 1,
                  rotateZ: 0,
                  transition: {
                    delay: 1.4,
                    duration: 0.5,
                    ease: "easeOut",
                  },
                }}
              >
                <Button
                  className="w-min h-full aspect-square border-2 border-emerald-600 hover:border-emerald-400 rounded-full p-4 bg-gray-900 text-emerald-600 hover:text-emerald-400 transition-colors duration-300"
                  onClick={() => PhoneClickHandler()}
                >
                  <Phone />
                </Button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, rotateZ: 360 }}
                animate={{
                  opacity: 1,
                  rotateZ: 0,
                  transition: {
                    delay: 1.7,
                    duration: 0.5,
                    ease: "easeOut",
                  },
                }}
              >
                <Button
                  className="w-min h-full aspect-square border-2 border-emerald-600 hover:border-emerald-400 rounded-full p-4 bg-gray-900 text-emerald-600 hover:text-emerald-400 transition-colors duration-300"
                  onClick={() => MailClickHandler()}
                >
                  <Mail />
                </Button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, rotateZ: 360 }}
                animate={{
                  opacity: 1,
                  rotateZ: 0,
                  transition: {
                    delay: 2,
                    duration: 0.5,
                    ease: "easeOut",
                  },
                }}
                className="w-min h-full aspect-square border-2 border-emerald-600 hover:border-emerald-400 rounded-full p-4 bg-gray-900 text-emerald-600 hover:text-emerald-400 transition-colors duration-300"
              >
                <Link href="https://www.linkedin.com/in/zamostny-jan" target="_blank" passHref rel="noopener noreferrer">
                  <Linkedin />
                </Link>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, translateY: "200%" }}
              animate={{
                opacity: 1,
                translateY: 0,
                transition: {
                  delay: 2.3,
                  duration: 0.5,
                  ease: "easeOut",
                },
              }}
            >
              <Link
                target="_blank"
                href="/cv.pdf"
                rel="noopener noreferrer"
                download
                className="xs:mb-24 sm:mb-0 bg-gray-900 border-emerald-600 hover:border-emerald-400 border-2 border-dashed flex py-5 px-4 text-lg gap-4 rounded-xl text-emerald-600 hover:text-emerald-400 transition-colors duration-300"
              >
                <span className="text-white">Stáhnout CV</span>
                <Download className="animate-bounce duration-[3000ms]" />
              </Link>
            </motion.div>
          </div>
        </main>
        <aside className="z-20 lg:w-1/2 flex lg:justify-end xs:items-center xs:justify-center xs:order-1 lg:order-2 xs:py-8 lg:py-0">
          <Picture />
        </aside>
      </div>
    </>
  );
};

export default Page;

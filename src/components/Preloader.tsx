"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const words = ["DATA", "LOGIC", "ARCHITECTURE", "RIGOR", "PYTHON"];

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [index, setIndex] = useState(0);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    // Word flashing interval
    const wordInterval = setInterval(() => {
      setIndex((prev) => (prev < words.length - 1 ? prev + 1 : prev));
    }, 200);

    // Number counter interval (0 to 100)
    const countInterval = setInterval(() => {
      setCounter((prev) => {
        if (prev >= 100) {
          clearInterval(countInterval);
          return 100;
        }
        return prev + 2; // Speed up counting
      });
    }, 20);

    // End preloader
    const timer = setTimeout(() => {
      onComplete();
    }, 2000);

    return () => {
      clearInterval(wordInterval);
      clearInterval(countInterval);
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-foreground text-background"
      initial={{ y: 0 }}
      exit={{
        y: "-100vh",
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <span className="text-[15rem] md:text-[30rem] font-serif font-bold tracking-tighter mix-blend-overlay">
          {counter}
        </span>
      </div>

      <div className="z-10 flex flex-col items-center gap-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.1 }}
            className="text-4xl md:text-6xl font-mono uppercase tracking-widest"
          >
            {words[index]}
          </motion.div>
        </AnimatePresence>
        
        <div className="h-px w-24 bg-background/30 overflow-hidden relative">
          <motion.div
            className="absolute top-0 left-0 h-full bg-background"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
}

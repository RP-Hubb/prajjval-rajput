"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const words = ["DATA", "LOGIC", "ARCHITECTURE", "RIGOR", "PYTHON"];

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const container = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [currentWord, setCurrentWord] = useState(words[0]);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        onComplete: () => {
          // Allow a brief pause before sliding out
          setTimeout(() => onComplete(), 800);
        },
      });

      // 1. Initial fade in of the big number
      tl.fromTo(
        numberRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 0.1, scale: 1, duration: 2.5, ease: "power2.out" }
      );

      // 2. Progress bar animation
      tl.fromTo(
        progressRef.current,
        { width: "0%" },
        { width: "100%", duration: 4.5, ease: "power2.inOut" },
        "<" // Start at the same time as the number
      );

      // 3. Word flashing sequence (manual intervals via GSAP call)
      const timePerWord = 4.5 / words.length; // Spread words over 4.5 seconds
      
      words.forEach((word, i) => {
        tl.call(() => {
          setCurrentWord(word);
          // Small text pop effect
          gsap.fromTo(
            textRef.current,
            { y: 15, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }
          );
        }, [], i * timePerWord);
      });

      // 4. Final fade out of the inner content before the exit animation
      tl.to(
        [textRef.current, numberRef.current, progressRef.current],
        { opacity: 0, y: -20, duration: 0.8, ease: "power2.in", stagger: 0.15 },
        "+=0.4"
      );
    },
    { scope: container }
  );

  return (
    <motion.div
      ref={container}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white"
      initial={{ y: 0 }}
      exit={{
        y: "-100vh",
        transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] },
      }}
    >
      {/* Huge Background Number */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
        <span
          ref={numberRef}
          className="text-[15rem] md:text-[30rem] font-bold uppercase tracking-tighter text-outline opacity-0"
        >
          00
        </span>
      </div>

      <div className="z-10 flex flex-col items-center gap-6">
        {/* Flashing Words */}
        <div 
          ref={textRef} 
          className="text-4xl md:text-7xl font-bold uppercase tracking-tighter"
        >
          {currentWord}
        </div>
        
        {/* Brutalist Progress Bar */}
        <div className="h-4 w-48 border-2 border-white/20 overflow-hidden relative">
          <div
            ref={progressRef}
            className="absolute top-0 left-0 h-full bg-[#ccff00]"
            style={{ width: "0%" }}
          />
        </div>
      </div>
    </motion.div>
  );
}

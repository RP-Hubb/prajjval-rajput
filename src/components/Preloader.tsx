"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const container = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        onComplete: () => {
          onComplete(); // Fire exit transition
        },
      });

      // 1. Percentage counter (0 to 100) taking exactly 2.4 seconds
      const counter = { val: 0 };
      tl.to(
        counter,
        {
          val: 100,
          duration: 2.4,
          ease: "power3.inOut",
          onUpdate: () => {
            if (numberRef.current) {
              const val = Math.round(counter.val);
              // Pad with zeros for that technical look
              numberRef.current.innerHTML = val < 10 ? `00${val}` : val < 100 ? `0${val}` : `${val}`;
            }
          },
        },
        0
      );

      // 2. Progress bar syncing with the counter
      tl.to(
        progressRef.current,
        { width: "100%", duration: 2.4, ease: "power3.inOut" },
        0
      );

      // 3. Rajpu Prajjval name reveal with a slick blur & scale effect
      tl.fromTo(
        textRef.current,
        { y: 50, opacity: 0, scale: 0.8, filter: "blur(10px)" },
        { y: 0, opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.5, ease: "expo.out" },
        0.5 // Start slightly after counter begins
      );

      // 4. Fade everything out fast right before 3 seconds
      tl.to(
        wrapperRef.current,
        { opacity: 0, y: -40, duration: 0.5, ease: "power2.in" },
        2.5 // Ends right at 3.0 seconds
      );
    },
    { scope: container }
  );

  return (
    <motion.div
      ref={container}
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-black text-white"
      initial={{ y: 0 }}
      exit={{
        y: "-100vh",
        transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] },
      }}
    >
      <div ref={wrapperRef} className="z-10 flex flex-col items-center gap-6 w-full px-8 relative">
        {/* Technical Progress Bar at the top */}
        <div className="h-[2px] w-full max-w-sm bg-white/10 relative overflow-hidden mb-8">
          <div
            ref={progressRef}
            className="absolute top-0 left-0 h-full bg-[#ccff00]"
            style={{ width: "0%" }}
          />
        </div>

        {/* Large Name */}
        <div 
          ref={textRef} 
          className="text-4xl sm:text-5xl md:text-7xl font-bold uppercase tracking-widest text-center"
        >
          RAJPUT PRAJJVAL
        </div>

        {/* Massive Percentage Counter */}
        <div 
          ref={numberRef}
          className="text-[6rem] md:text-[10rem] font-bold uppercase tracking-tighter text-outline opacity-30 leading-none absolute top-1/2 -translate-y-1/2 -z-10"
        >
          000
        </div>
      </div>
    </motion.div>
  );
}

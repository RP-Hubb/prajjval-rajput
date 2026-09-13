"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

gsap.registerPlugin(useGSAP);

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";

function ScrambleText({ text, duration }: { text: string; duration: number }) {
  const [displayText, setDisplayText] = useState(text);
  const prefersReducedMotion = usePrefersReducedMotion();
  
  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayText(text);
      return;
    }

    let frame = 0;
    const totalFrames = (duration / 1000) * 60; // Assuming 60fps
    let animationFrame: number;

    const animate = () => {
      frame++;
      const progress = frame / totalFrames;
      
      let newText = "";
      for (let i = 0; i < text.length; i++) {
        const lockInPoint = (i / text.length) * 0.8;
        
        if (text[i] === " ") {
          newText += " ";
        } else if (progress > lockInPoint) {
          newText += text[i];
        } else {
          newText += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }
      
      setDisplayText(newText);

      if (frame < totalFrames) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setDisplayText(text);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    
    return () => cancelAnimationFrame(animationFrame);
  }, [text, duration, prefersReducedMotion]);

  return (
    <span className="font-mono tracking-widest break-all">
      {displayText.split("").map((char, i) => {
        const isLocked = char === text[i];
        const isSpace = char === " ";
        return (
          <span 
            key={i} 
            className={isLocked ? "text-foreground" : "text-accent opacity-70"}
            style={{ width: isSpace ? '0.5em' : 'auto', display: 'inline-block' }}
          >
            {char}
          </span>
        );
      })}
    </span>
  );
}

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const container = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const scanlineRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      onComplete();
    }
  }, [prefersReducedMotion, onComplete]);

  useGSAP(
    () => {
      if (prefersReducedMotion) return;

      const tl = gsap.timeline({
        onComplete: () => {
          onComplete(); 
        },
      });

      // 1. Progress bar syncing with the decryption time (2.4s)
      tl.to(
        progressRef.current,
        { width: "100%", duration: 2.4, ease: "power2.inOut" },
        0
      );
      
      // 2. Scanline effect
      tl.to(
        scanlineRef.current,
        { y: "100vh", duration: 2.4, ease: "none", repeat: 0 },
        0
      );

      // 3. Brutalist exit slice (slice up extremely fast)
      tl.to(
        wrapperRef.current,
        { opacity: 0, scale: 0.95, duration: 0.2 },
        2.5 
      );
      
    },
    { scope: container, dependencies: [prefersReducedMotion] }
  );

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <motion.div
      ref={container}
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-black overflow-hidden"
      exit={{
        y: "-100vh",
        transition: { duration: 0.5, ease: [0.85, 0, 0.15, 1] }, // sharp brutalist exit
      }}
    >
      {/* Technical Grid Background */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
      
      {/* Scanline */}
      <div 
        ref={scanlineRef}
        className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-transparent via-accent/10 to-transparent -translate-y-full blur-sm"
      />

      <div ref={wrapperRef} className="z-10 flex flex-col gap-12 w-full max-w-4xl px-8 relative">
        
        {/* Decode Container */}
        <div className="flex flex-col gap-4">
          <div className="text-xs font-mono text-muted uppercase tracking-widest mb-2 flex items-center gap-2">
            <span className="w-2 h-2 bg-accent animate-pulse" />
            Decrypting Identity...
          </div>
          
          <div className="text-4xl sm:text-6xl md:text-8xl font-bold uppercase leading-none flex flex-col">
            <ScrambleText text="RAJPUT" duration={2400} />
            <ScrambleText text="PRAJJVAL" duration={2400} />
          </div>
          
          <div className="text-lg sm:text-2xl font-mono mt-4 text-muted border-l-4 border-accent pl-4">
            <ScrambleText text="PYTHON DEVELOPER // DATA PIPELINES" duration={2400} />
          </div>
        </div>

        {/* Technical Progress Bar */}
        <div className="h-[2px] w-full bg-white/10 relative overflow-hidden mt-8">
          <div
            ref={progressRef}
            className="absolute top-0 left-0 h-full bg-accent"
            style={{ width: "0%" }}
          />
        </div>
      </div>
    </motion.div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useCursor } from "@/context/CursorContext";

export function CustomCursor() {
  const { cursorType, cursorText } = useCursor();
  const [isVisible, setIsVisible] = useState(false);

  // Use MotionValues to avoid React re-renders on mousemove
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth springs for cursor movement
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", updateMousePosition);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isVisible, cursorX, cursorY]);

  // Don't render cursor on mobile/touch devices
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  // Define variants for different cursor states
  const variants = {
    default: {
      width: 16,
      height: 16,
      x: "-50%",
      y: "-50%",
      backgroundColor: "#ffffff", // Pure white for high contrast
      mixBlendMode: "difference" as const,
      opacity: isVisible ? 1 : 0,
    },
    hover: {
      width: 64,
      height: 64,
      x: "-50%",
      y: "-50%",
      backgroundColor: "#ffffff",
      mixBlendMode: "difference" as const,
      opacity: isVisible ? 1 : 0,
    },
    view: {
      width: 80,
      height: 80,
      x: "-50%",
      y: "-50%",
      backgroundColor: "var(--color-accent)", // Pop of color
      mixBlendMode: "normal" as const,
      opacity: isVisible ? 1 : 0,
    },
    hidden: {
      opacity: 0,
    }
  };

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full flex items-center justify-center text-white font-mono text-xs font-bold shadow-[0_0_20px_rgba(255,255,255,0.3)]"
      style={{
        x: smoothX,
        y: smoothY,
      }}
      variants={variants}
      animate={cursorType}
      initial="hidden"
      transition={{ type: "tween", ease: "backOut", duration: 0.3 }}
    >
      {cursorType === "view" && (
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className="uppercase tracking-widest text-[10px]"
        >
          {cursorText || "View"}
        </motion.span>
      )}
    </motion.div>
  );
}

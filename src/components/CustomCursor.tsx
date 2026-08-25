"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

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
    
    // Click effects
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", updateMousePosition);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isVisible, cursorX, cursorY]);

  // Don't render cursor on mobile/touch devices
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  // Define variants for different cursor states, integrating click logic
  const variants = {
    default: {
      width: isClicking ? 8 : 16,
      height: isClicking ? 8 : 16,
      backgroundColor: "var(--color-accent)",
      mixBlendMode: "normal" as const,
      opacity: isVisible ? 1 : 0,
    }
  };

  return (
    <motion.div
      className="fixed top-0 left-0 z-[99999] pointer-events-none"
      style={{
        x: smoothX,
        y: smoothY,
      }}
    >
      <motion.div
        className="relative -left-1/2 -top-1/2 rounded-full flex items-center justify-center text-white font-mono text-xs font-bold shadow-[0_0_20px_rgba(255,255,255,0.3)]"
        variants={variants}
        animate="default"
        initial="hidden"
        transition={{ type: "tween", ease: "backOut", duration: 0.3 }}
      />
    </motion.div>
  );
}

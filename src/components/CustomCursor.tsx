"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, AnimatePresence } from "framer-motion";
import { useCursor } from "@/context/CursorContext";

export function CustomCursor() {
  const { cursorType, cursorText } = useCursor();
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const [hasFinePointer, setHasFinePointer] = useState(false);

  // Direct MotionValues for 1:1 hardware synchronization (zero lag with OS cursor)
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth spring physics for size, hover expansion, and label entrance
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };

  // Detect and track fine pointer capability via media query listener
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;

    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    
    const updatePointerStatus = () => {
      const isFine = mediaQuery.matches;
      setHasFinePointer(isFine);
      if (isFine) {
        document.documentElement.classList.add("has-custom-cursor");
      } else {
        document.documentElement.classList.remove("has-custom-cursor");
      }
    };

    updatePointerStatus();

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", updatePointerStatus);
    } else {
      mediaQuery.addListener(updatePointerStatus);
    }

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", updatePointerStatus);
      } else {
        mediaQuery.removeListener(updatePointerStatus);
      }
    };
  }, []);

  useEffect(() => {
    if (!hasFinePointer) return;

    const updateMousePosition = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);
    
    // Click effects
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", updateMousePosition, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isVisible, cursorX, cursorY, hasFinePointer]);

  // Don't render cursor unless fine pointer capability is confirmed on the client
  if (!hasFinePointer) {
    return null;
  }

  const hasText = Boolean(cursorText && cursorText.trim().length > 0);

  // GPU-only transform variants using scale (base 64px) for 60fps/120fps compositor animations
  const variants = {
    default: {
      scale: isClicking ? 0.125 : 0.25, // 8px : 16px
      backgroundColor: "var(--color-accent)",
      mixBlendMode: "normal" as const,
      opacity: isVisible && cursorType !== "hidden" ? 1 : 0,
    },
    hover: {
      scale: isClicking ? 0.35 : 0.44, // ~22px : ~28px
      backgroundColor: "var(--color-accent)",
      mixBlendMode: "normal" as const,
      opacity: isVisible && cursorType !== "hidden" ? 1 : 0,
    },
    text: {
      scale: isClicking ? 0.88 : 1, // ~56px : 64px
      backgroundColor: "var(--color-accent)",
      mixBlendMode: "normal" as const,
      opacity: isVisible && cursorType !== "hidden" ? 1 : 0,
    },
  };

  const currentVariant = hasText ? "text" : cursorType === "hover" ? "hover" : "default";

  return (
    <motion.div
      className="fixed top-0 left-0 z-[99999] pointer-events-none select-none w-0 h-0"
      style={{
        x: cursorX,
        y: cursorY,
      }}
    >
      <motion.div
        data-cursor-dot="true"
        className="custom-cursor-dot w-16 h-16 !rounded-full flex items-center justify-center text-black font-mono shadow-[0_0_20px_rgba(0,0,0,0.25)] overflow-hidden"
        style={{
          borderRadius: "9999px",
          marginLeft: "-32px",
          marginTop: "-32px",
          transformOrigin: "center center",
        }}
        variants={variants}
        animate={currentVariant}
        initial="default"
        transition={{ type: "spring", ...springConfig }}
      >
        <AnimatePresence mode="wait">
          {hasText && (
            <motion.span
              key={cursorText}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ type: "spring", ...springConfig }}
              className="font-mono text-[10px] font-bold tracking-widest uppercase text-black select-none pointer-events-none text-center leading-none"
            >
              {cursorText}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

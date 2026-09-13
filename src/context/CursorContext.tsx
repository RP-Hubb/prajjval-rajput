"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { usePathname } from "next/navigation";

type CursorState = "default" | "hover" | "view" | "hidden";

interface CursorContextType {
  cursorType: CursorState;
  setCursorType: (type: CursorState) => void;
  cursorText: string;
  setCursorText: (text: string) => void;
}

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export function CursorProvider({ children }: { children: ReactNode }) {
  const [cursorType, setCursorType] = useState<CursorState>("default");
  const [cursorText, setCursorText] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    // Reset cursor when route changes
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCursorType("default");
    setCursorText("");
  }, [pathname]);

  return (
    <CursorContext.Provider value={{ cursorType, setCursorType, cursorText, setCursorText }}>
      {children}
    </CursorContext.Provider>
  );
}

export function useCursor() {
  const context = useContext(CursorContext);
  if (context === undefined) {
    throw new Error("useCursor must be used within a CursorProvider");
  }
  return context;
}

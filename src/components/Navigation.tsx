"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Magnetic } from "./Magnetic";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Work", path: "/work" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

import { ThemeToggle } from "./ThemeToggle";

export function Navigation() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b-4 border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-0 sm:h-16 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
        <div className="flex w-full sm:w-auto items-center justify-between">
          <Link 
            href="/" 
            className="font-bold text-xl sm:text-2xl uppercase tracking-tighter text-foreground hover:text-accent transition-colors truncate"
          >
            PRAJJVAL RAJPUT
          </Link>
          <div className="sm:hidden flex items-center">
            <ThemeToggle />
          </div>
        </div>
        
        <div className="flex w-full sm:w-auto items-center justify-between sm:justify-end gap-2 sm:gap-6 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
          <nav className="flex gap-2 sm:gap-4 shrink-0">
            {navItems.map((item) => {
              const isActive = pathname === item.path || (item.path !== "/" && pathname.startsWith(item.path));
              return (
                <Magnetic key={item.path} strength={10}>
                  <Link
                    href={item.path}
                    className={cn(
                      "relative px-2 sm:px-3 py-1.5 font-mono text-xs sm:text-sm font-bold uppercase tracking-widest transition-colors hover:text-accent",
                      isActive ? "text-accent" : "text-muted"
                    )}
                  >
                    {item.name}
                    {isActive && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute bottom-0 left-0 right-0 h-1 bg-accent"
                        initial={false}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </Link>
                </Magnetic>
              );
            })}
          </nav>
          <div className="hidden sm:block h-8 w-[2px] bg-border mx-2" />
          <div className="hidden sm:block shrink-0">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}

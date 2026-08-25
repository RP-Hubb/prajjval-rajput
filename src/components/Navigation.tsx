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

export function Navigation() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b-4 border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link 
          href="/" 
          className="font-bold text-2xl uppercase tracking-tighter text-foreground hover:text-accent transition-colors"
        >
          PRAJJVAL RAJPUT
        </Link>
        <nav className="flex gap-4">
          {navItems.map((item) => {
            const isActive = pathname === item.path || (item.path !== "/" && pathname.startsWith(item.path));
            return (
              <Magnetic key={item.path} strength={10}>
                <Link
                  href={item.path}
                  className={cn(
                    "relative px-3 py-1.5 font-mono text-sm font-bold uppercase tracking-widest transition-colors hover:text-accent",
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
      </div>
    </header>
  );
}

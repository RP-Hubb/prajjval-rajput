"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUp, Mail, Code2 } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Magnetic } from "./Magnetic";
import { useCursor } from "@/context/CursorContext";

const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/RP-Hubb",
    icon: FaGithub,
    handle: "@RP-Hubb",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/prajjval-rajput-b31b3a372/",
    icon: FaLinkedin,
    handle: "Prajjval Rajput",
  },
  {
    name: "LeetCode",
    url: "https://leetcode.com/u/rajput_prajjval/",
    icon: Code2,
    handle: "rajput_prajjval",
  },
  {
    name: "Email",
    url: "mailto:rraj21054@gmail.com",
    icon: Mail,
    handle: "rraj21054@gmail.com",
  },
];

export function Footer() {
  const { setCursorType } = useCursor();

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      const globalWindow = window as unknown as {
        lenis?: { scrollTo: (target: number, opts?: { duration?: number }) => void };
      };
      if (globalWindow.lenis && typeof globalWindow.lenis.scrollTo === "function") {
        globalWindow.lenis.scrollTo(0, { duration: 1.2 });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  return (
    <footer className="w-full bg-background border-t-4 border-border mt-auto z-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14 flex flex-col gap-8">
        {/* Top Tier: Asymmetric Identity & Actions */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          {/* Identity & Technical Status */}
          <div className="flex flex-col gap-3">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent font-bold">
              <span className="inline-block w-2 h-2 bg-accent animate-pulse" />
              STATUS: OPEN FOR NEW OPPORTUNITIES
            </div>
            <Link
              href="/"
              className="font-sans font-bold text-2xl sm:text-3xl uppercase tracking-tighter text-foreground hover:text-accent transition-colors inline-block"
            >
              PRAJJVAL RAJPUT
            </Link>
            <p className="font-mono text-xs sm:text-sm text-muted max-w-lg leading-relaxed">
              Python Developer specializing in data architecture, rigorous backend engineering, and interactive web interfaces.
            </p>
          </div>

          {/* Magnetic Back to Top Control */}
          <div className="flex items-center gap-3 shrink-0">
            <Magnetic strength={15}>
              <button
                type="button"
                onClick={scrollToTop}
                onMouseEnter={() => setCursorType("hover")}
                onMouseLeave={() => setCursorType("default")}
                aria-label="Back to top of page"
                className="group flex items-center gap-2.5 px-5 py-3 border-2 border-border bg-card text-foreground hover:border-accent hover:text-accent hover:shadow-[4px_4px_0px_0px_var(--color-accent)] active:translate-x-0.5 active:translate-y-0.5 transition-all font-mono text-xs uppercase tracking-widest font-bold select-none"
              >
                <span>TOP</span>
                <ArrowUp
                  size={14}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:text-accent"
                />
              </button>
            </Magnetic>
          </div>
        </div>

        {/* Middle Tier: Social Link Pills Grid */}
        <div className="pt-6 border-t-2 border-border flex flex-wrap items-center gap-2 sm:gap-3">
          <span className="font-mono text-xs text-muted uppercase tracking-wider mr-2 hidden sm:inline">
            CONNECT //
          </span>
          {socialLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Magnetic key={link.name} strength={8}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setCursorType("hover")}
                  onMouseLeave={() => setCursorType("default")}
                  className="group inline-flex items-center gap-2 px-3.5 py-2 border-2 border-border bg-card text-foreground hover:border-accent hover:text-accent hover:shadow-[2px_2px_0px_0px_var(--color-accent)] active:translate-x-0.5 active:translate-y-0.5 transition-all font-mono text-xs uppercase tracking-wider font-bold"
                >
                  <Icon size={14} className="text-foreground group-hover:text-accent transition-colors" />
                  <span>{link.name}</span>
                </a>
              </Magnetic>
            );
          })}
        </div>

        {/* Bottom Tier: Technical Meta & Copyright */}
        <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono text-muted">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-foreground">BUILT WITH:</span>
            <span>NEXT.JS 16 · TAILWIND CSS · FRAMER MOTION · LENIS</span>
          </div>
          <div className="shrink-0">
            <span>© {new Date().getFullYear()} PRAJJVAL RAJPUT. ALL RIGHTS RESERVED.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

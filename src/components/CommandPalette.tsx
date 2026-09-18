"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { useTransitionRouter } from "next-view-transitions";
import { flushSync } from "react-dom";
import { Command } from "cmdk";
import { useTheme } from "next-themes";
import { 
  Search, 
  Home, 
  Briefcase, 
  User, 
  Mail, 
  Sun, 
  Moon, 
  ExternalLink, 
  CornerDownLeft,
  X
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function CommandPalette() {
  const [isOpen, setIsOpen] = React.useState(false);
  const router = useTransitionRouter();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const prefersReducedMotion = usePrefersReducedMotion();

  const previousFocusRef = React.useRef<HTMLElement | null>(null);
  const overlayRef = React.useRef<HTMLDivElement>(null);

  const isDark = theme === "dark" || (theme === "system" && typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  const openPalette = React.useCallback(() => {
    previousFocusRef.current = document.activeElement as HTMLElement | null;
    setIsOpen(true);
  }, []);

  const closePalette = React.useCallback(() => {
    setIsOpen(false);
    requestAnimationFrame(() => {
      previousFocusRef.current?.focus();
    });
  }, []);

  // Keyboard shortcut listener (Cmd+K / Ctrl+K and custom event)
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) {
          closePalette();
        } else {
          openPalette();
        }
      } else if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        closePalette();
      }
    };

    const handleCustomOpen = () => openPalette();

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-command-palette", handleCustomOpen);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-command-palette", handleCustomOpen);
    };
  }, [isOpen, openPalette, closePalette]);

  // Close on route change
  React.useEffect(() => {
    if (isOpen) {
      closePalette();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const navigateTo = (path: string) => {
    router.push(path);
    closePalette();
  };

  const toggleTheme = (e?: React.MouseEvent | KeyboardEvent) => {
    const nextTheme = isDark ? "light" : "dark";

    if (document.startViewTransition) {
      document.documentElement.style.setProperty("--theme-x", `${window.innerWidth / 2}px`);
      document.documentElement.style.setProperty("--theme-y", `${window.innerHeight / 2}px`);
      document.documentElement.style.setProperty(
        "--theme-radius",
        `${Math.hypot(window.innerWidth, window.innerHeight)}px`
      );

      document.documentElement.classList.add("theme-transitioning");

      const transition = document.startViewTransition(() => {
        flushSync(() => {
          setTheme(nextTheme);
        });
      });

      transition.finished.finally(() => {
        document.documentElement.classList.remove("theme-transitioning");
      });
    } else {
      setTheme(nextTheme);
    }
    closePalette();
  };

  const openExternal = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
    closePalette();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          ref={overlayRef}
          role="dialog"
          aria-modal="true"
          aria-label="Command Palette"
          data-lenis-prevent="true"
          onClick={(e) => {
            if (e.target === overlayRef.current) {
              closePalette();
            }
          }}
          className="fixed inset-0 z-[9999] flex items-start justify-center pt-16 sm:pt-28 px-4 bg-black/70 backdrop-blur-sm"
        >
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-xl bg-card border-2 sm:border-4 border-border shadow-[8px_8px_0px_0px_var(--color-accent)] overflow-hidden font-mono"
            onClick={(e) => e.stopPropagation()}
          >
            <Command
              label="Command Menu"
              className="flex flex-col w-full text-foreground"
            >
              {/* Top Search Bar */}
              <div className="flex items-center px-4 py-3 border-b-2 border-border gap-3 bg-background">
                <Search size={18} aria-hidden="true" className="text-muted shrink-0" />
                <Command.Input
                  autoFocus
                  placeholder="Type a command or search…"
                  className="w-full bg-transparent border-none outline-none font-mono text-sm sm:text-base text-foreground placeholder:text-muted"
                />
                <button
                  type="button"
                  onClick={closePalette}
                  aria-label="Close command palette"
                  className="p-1 border border-border bg-card text-muted hover:text-foreground hover:border-accent transition-colors shrink-0"
                >
                  <X size={14} aria-hidden="true" />
                </button>
              </div>

              {/* Items List */}
              <Command.List
                data-lenis-prevent="true"
                className="max-h-[340px] overflow-y-auto overscroll-contain p-2 space-y-1 terminal-scrollbar"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "var(--color-border) transparent",
                }}
              >
                <Command.Empty className="py-8 text-center text-sm text-muted">
                  No matching commands found.
                </Command.Empty>

                {/* Navigation Group */}
                <Command.Group heading="Navigation" className="text-muted">
                  <Command.Item
                    value="Home Page /"
                    onSelect={() => navigateTo("/")}
                    className="group flex items-center justify-between px-3 py-2.5 text-xs sm:text-sm font-bold text-foreground cursor-pointer transition-colors data-[selected=true]:bg-accent data-[selected=true]:text-black"
                  >
                    <div className="flex items-center gap-3">
                      <Home size={16} aria-hidden="true" className="shrink-0" />
                      <span>Home</span>
                    </div>
                    <span className="text-[10px] font-mono text-muted group-data-[selected=true]:text-black uppercase">
                      Route //
                    </span>
                  </Command.Item>

                  <Command.Item
                    value="Work Projects Portfolio /work"
                    onSelect={() => navigateTo("/work")}
                    className="group flex items-center justify-between px-3 py-2.5 text-xs sm:text-sm font-bold text-foreground cursor-pointer transition-colors data-[selected=true]:bg-accent data-[selected=true]:text-black"
                  >
                    <div className="flex items-center gap-3">
                      <Briefcase size={16} aria-hidden="true" className="shrink-0" />
                      <span>Work</span>
                    </div>
                    <span className="text-[10px] font-mono text-muted group-data-[selected=true]:text-black uppercase">
                      Route //
                    </span>
                  </Command.Item>

                  <Command.Item
                    value="About Biography Experience /about"
                    onSelect={() => navigateTo("/about")}
                    className="group flex items-center justify-between px-3 py-2.5 text-xs sm:text-sm font-bold text-foreground cursor-pointer transition-colors data-[selected=true]:bg-accent data-[selected=true]:text-black"
                  >
                    <div className="flex items-center gap-3">
                      <User size={16} aria-hidden="true" className="shrink-0" />
                      <span>About</span>
                    </div>
                    <span className="text-[10px] font-mono text-muted group-data-[selected=true]:text-black uppercase">
                      Route //
                    </span>
                  </Command.Item>

                  <Command.Item
                    value="Contact Email Message /contact"
                    onSelect={() => navigateTo("/contact")}
                    className="group flex items-center justify-between px-3 py-2.5 text-xs sm:text-sm font-bold text-foreground cursor-pointer transition-colors data-[selected=true]:bg-accent data-[selected=true]:text-black"
                  >
                    <div className="flex items-center gap-3">
                      <Mail size={16} aria-hidden="true" className="shrink-0" />
                      <span>Contact</span>
                    </div>
                    <span className="text-[10px] font-mono text-muted group-data-[selected=true]:text-black uppercase">
                      Route //
                    </span>
                  </Command.Item>
                </Command.Group>

                {/* Preferences Group */}
                <Command.Group heading="Preferences" className="text-muted mt-2">
                  <Command.Item
                    value="Toggle Theme Dark Light Mode"
                    onSelect={() => toggleTheme()}
                    className="group flex items-center justify-between px-3 py-2.5 text-xs sm:text-sm font-bold text-foreground cursor-pointer transition-colors data-[selected=true]:bg-accent data-[selected=true]:text-black"
                  >
                    <div className="flex items-center gap-3">
                      {isDark ? (
                        <Sun size={16} aria-hidden="true" className="shrink-0" />
                      ) : (
                        <Moon size={16} aria-hidden="true" className="shrink-0" />
                      )}
                      <span>Switch to {isDark ? "Light" : "Dark"} Mode</span>
                    </div>
                    <span className="text-[10px] font-mono text-muted group-data-[selected=true]:text-black uppercase">
                      Action //
                    </span>
                  </Command.Item>
                </Command.Group>

                {/* External Links Group */}
                <Command.Group heading="External Links" className="text-muted mt-2">
                  <Command.Item
                    value="GitHub RP-Hubb Source Code"
                    onSelect={() => openExternal("https://github.com/RP-Hubb")}
                    className="group flex items-center justify-between px-3 py-2.5 text-xs sm:text-sm font-bold text-foreground cursor-pointer transition-colors data-[selected=true]:bg-accent data-[selected=true]:text-black"
                  >
                    <div className="flex items-center gap-3">
                      <FaGithub size={16} aria-hidden="true" className="shrink-0" />
                      <span>GitHub (@RP-Hubb)</span>
                    </div>
                    <ExternalLink size={12} aria-hidden="true" className="text-muted group-data-[selected=true]:text-black shrink-0" />
                  </Command.Item>

                  <Command.Item
                    value="LinkedIn Prajjval Rajput Profile"
                    onSelect={() => openExternal("https://www.linkedin.com/in/prajjval-rajput-b31b3a372/")}
                    className="group flex items-center justify-between px-3 py-2.5 text-xs sm:text-sm font-bold text-foreground cursor-pointer transition-colors data-[selected=true]:bg-accent data-[selected=true]:text-black"
                  >
                    <div className="flex items-center gap-3">
                      <FaLinkedin size={16} aria-hidden="true" className="shrink-0" />
                      <span>LinkedIn (Prajjval Rajput)</span>
                    </div>
                    <ExternalLink size={12} aria-hidden="true" className="text-muted group-data-[selected=true]:text-black shrink-0" />
                  </Command.Item>
                </Command.Group>
              </Command.List>

              {/* Bottom Footer Shortcuts */}
              <div className="flex items-center justify-between px-4 py-2 border-t-2 border-border bg-background text-[11px] text-muted">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-card border border-border text-foreground font-bold text-[10px]">↑↓</kbd>
                    <span>navigate</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-card border border-border text-foreground font-bold text-[10px]">
                      <CornerDownLeft size={10} aria-hidden="true" className="inline" />
                    </kbd>
                    <span>select</span>
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-card border border-border text-foreground font-bold text-[10px]">ESC</kbd>
                  <span>close</span>
                </div>
              </div>
            </Command>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

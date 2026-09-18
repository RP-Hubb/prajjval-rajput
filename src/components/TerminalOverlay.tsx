"use client";

import * as React from "react";
import { useTransitionRouter } from "next-view-transitions";
import { Terminal, X, CornerDownLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Magnetic } from "./Magnetic";
import { useCursor } from "@/context/CursorContext";

interface HistoryEntry {
  command: string;
  output: React.ReactNode;
}

const INITIAL_GREETING: HistoryEntry = {
  command: "system.init",
  output: (
    <div className="text-muted leading-relaxed">
      <div>terminal session active [guest@prajjval-portfolio]</div>
      <div>type <span className="text-accent font-bold">&apos;help&apos;</span> to inspect available commands or <span className="text-accent font-bold">&apos;open work&apos;</span> to navigate.</div>
    </div>
  ),
};

export function TerminalOverlay() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [inputVal, setInputVal] = React.useState("");
  const [history, setHistory] = React.useState<HistoryEntry[]>([INITIAL_GREETING]);
  const [commandHistory, setCommandHistory] = React.useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = React.useState<number>(-1);

  const router = useTransitionRouter();
  const { setCursorType, setCursorText } = useCursor();

  const inputRef = React.useRef<HTMLInputElement>(null);
  const terminalEndRef = React.useRef<HTMLDivElement>(null);
  const terminalBodyRef = React.useRef<HTMLDivElement>(null);

  // Auto-scroll when output updates
  React.useEffect(() => {
    if (isOpen && terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history, isOpen]);

  // Focus input on open
  React.useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Handle Escape key to close without trapping focus
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Isolate scroll inside terminal from Lenis / window scroll
  React.useEffect(() => {
    const el = terminalBodyRef.current;
    if (!el || !isOpen) return;

    const stopPropagation = (e: Event) => {
      e.stopPropagation();
    };

    el.addEventListener("wheel", stopPropagation, { passive: true });
    el.addEventListener("touchmove", stopPropagation, { passive: true });

    return () => {
      el.removeEventListener("wheel", stopPropagation);
      el.removeEventListener("touchmove", stopPropagation);
    };
  }, [isOpen]);

  const executeCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) {
      setHistory((prev) => [
        ...prev,
        { command: "", output: null },
      ]);
      return;
    }

    // Add to command history for arrow-up / arrow-down navigation
    setCommandHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const parts = trimmed.split(" ").filter(Boolean);
    const mainCommand = parts[0].toLowerCase();
    const arg = parts.slice(1).join(" ").toLowerCase();

    let outputNode: React.ReactNode = null;

    switch (mainCommand) {
      case "help":
        outputNode = (
          <div className="flex flex-col gap-1 text-muted">
            <div className="text-foreground font-bold mb-1">AVAILABLE COMMANDS:</div>
            <div className="grid grid-cols-[140px_1fr] gap-x-2">
              <span className="text-accent font-bold">help</span>
              <span>list available commands</span>
              <span className="text-accent font-bold">whoami</span>
              <span>display operator identity</span>
              <span className="text-accent font-bold">skills</span>
              <span>core stack and domain breakdown</span>
              <span className="text-accent font-bold">projects</span>
              <span>list indexed engineering projects</span>
              <span className="text-accent font-bold">open &lt;route&gt;</span>
              <span>navigate to work | about | contact | home</span>
              <span className="text-accent font-bold">sudo hire-me</span>
              <span>request authorization handshake</span>
              <span className="text-accent font-bold">clear</span>
              <span>clear terminal buffer</span>
            </div>
          </div>
        );
        break;

      case "whoami":
        outputNode = (
          <div className="flex flex-col gap-1 text-muted">
            <div className="text-foreground font-bold">prajjval rajput</div>
            <div>role: python developer</div>
            <div>base: ahmedabad, gujarat, india</div>
            <div>focus: machine learning explainability, fastapi services, quantitative tools</div>
          </div>
        );
        break;

      case "skills":
        outputNode = (
          <div className="flex flex-col gap-1.5 text-muted">
            <div className="grid grid-cols-[110px_1fr] gap-x-2">
              <span className="text-foreground font-bold">LANGUAGES:</span>
              <span>Python, TypeScript, SQL, HTML/CSS</span>
              <span className="text-foreground font-bold">FRAMEWORKS:</span>
              <span>FastAPI, React, Next.js, Vite</span>
              <span className="text-foreground font-bold">DATA &amp; ML:</span>
              <span>XGBoost, SHAP, Pandas, NumPy, Scikit-Learn</span>
              <span className="text-foreground font-bold">TOOLING:</span>
              <span>Git, Tailwind CSS, Docker, Linux, Postman</span>
            </div>
          </div>
        );
        break;

      case "projects":
        outputNode = (
          <div className="flex flex-col gap-1.5 text-muted">
            <div className="flex flex-col gap-1">
              <div><span className="text-accent font-bold">[01] asthma-v2</span>: clinical risk screening tool (FastAPI / XGBoost / SHAP)</div>
              <div><span className="text-accent font-bold">[02] dsa-visualizer</span>: real-time algorithm runner (React 19 / Tailwind / Motion)</div>
              <div><span className="text-accent font-bold">[03] quant-lab</span>: monte carlo &amp; volatility experiments (Python / Pandas)</div>
              <div><span className="text-accent font-bold">[04] sudoku-solver</span>: backtracking solver with test coverage (Python)</div>
            </div>
            <div className="text-xs text-muted/80 mt-1">
              hint: run <span className="text-foreground">&apos;open work&apos;</span> to inspect full writeups.
            </div>
          </div>
        );
        break;

      case "open":
        if (!arg) {
          outputNode = (
            <div className="text-muted">
              usage: <span className="text-foreground">open &lt;work | about | contact | home&gt;</span>
            </div>
          );
        } else if (arg === "work" || arg === "/work") {
          outputNode = <div className="text-accent">navigating to /work...</div>;
          router.push("/work");
        } else if (arg === "about" || arg === "/about") {
          outputNode = <div className="text-accent">navigating to /about...</div>;
          router.push("/about");
        } else if (arg === "contact" || arg === "/contact") {
          outputNode = <div className="text-accent">navigating to /contact...</div>;
          router.push("/contact");
        } else if (arg === "home" || arg === "/" || arg === "index") {
          outputNode = <div className="text-accent">navigating to /...</div>;
          router.push("/");
        } else {
          outputNode = (
            <div className="text-muted">
              destination &apos;{arg}&apos; not found. valid targets: work, about, contact, home.
            </div>
          );
        }
        break;

      case "sudo":
        if (arg === "hire-me" || arg === "hire") {
          outputNode = (
            <div className="flex flex-col gap-1 text-muted">
              <div>[sudo] password for guest: **********</div>
              <div className="text-foreground">verifying credentials... access granted.</div>
              <div className="mt-1 text-accent font-bold">handshake initialized:</div>
              <div>status: open for backend, data engineering, and ml systems roles.</div>
              <div>contact: run <span className="text-foreground font-bold">&apos;open contact&apos;</span> or email direct to <span className="text-accent font-bold">rraj21054@gmail.com</span></div>
            </div>
          );
        } else {
          outputNode = (
            <div className="text-muted">
              sudo: {arg ? `'${arg}' is not an authorized script.` : "missing argument."} try &apos;sudo hire-me&apos;.
            </div>
          );
        }
        break;

      case "clear":
        setHistory([]);
        return;

      default:
        outputNode = (
          <div className="text-muted">
            command not found: <span className="text-foreground">&apos;{trimmed}&apos;</span>. type <span className="text-accent font-bold">&apos;help&apos;</span> for available commands.
          </div>
        );
        break;
    }

    setHistory((prev) => [
      ...prev,
      { command: trimmed, output: outputNode },
    ]);
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(inputVal);
    setInputVal("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInputVal(commandHistory[nextIndex] || "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (commandHistory.length === 0 || historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= commandHistory.length) {
        setHistoryIndex(-1);
        setInputVal("");
      } else {
        setHistoryIndex(nextIndex);
        setInputVal(commandHistory[nextIndex] || "");
      }
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <Magnetic strength={10}>
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            onMouseEnter={() => {
              setCursorType("hover");
              setCursorText("CLI");
            }}
            onMouseLeave={() => {
              setCursorType("default");
              setCursorText("");
            }}
            aria-label={isOpen ? "Close terminal shell" : "Open terminal shell"}
            aria-expanded={isOpen}
            className={`relative flex items-center justify-center w-12 h-12 border-2 bg-card text-foreground transition-all select-none ${
              isOpen
                ? "border-accent text-accent shadow-[3px_3px_0px_0px_var(--color-accent)]"
                : "border-border hover:border-accent hover:text-accent hover:shadow-[4px_4px_0px_0px_var(--color-accent)]"
            } active:translate-x-0.5 active:translate-y-0.5`}
          >
            {isOpen ? <X size={20} aria-hidden="true" /> : <Terminal size={20} aria-hidden="true" />}
            {!isOpen && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-accent border-2 border-background animate-pulse" />
            )}
          </button>
        </Magnetic>
      </div>

      {/* Terminal Shell Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            role="region"
            aria-label="Interactive terminal shell"
            data-lenis-prevent="true"
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            className="fixed bottom-20 right-4 sm:right-6 z-40 w-[calc(100vw-2rem)] sm:w-[500px] md:w-[560px] h-[380px] sm:h-[420px] max-h-[75vh] flex flex-col bg-background/95 border-2 border-border shadow-[6px_6px_0px_0px_var(--color-accent)] backdrop-blur-md font-mono text-xs sm:text-sm text-foreground overflow-hidden overscroll-contain"
          >
            {/* Terminal Window Bar */}
            <div className="flex items-center justify-between px-3 py-2 border-b-2 border-border bg-card select-none">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-accent animate-pulse" />
                <span className="font-bold tracking-wider text-xs uppercase text-foreground">
                  terminal // guest@prajjval
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-muted uppercase tracking-widest hidden sm:inline">
                  ESC to close
                </span>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  onMouseEnter={() => setCursorType("hover")}
                  onMouseLeave={() => setCursorType("default")}
                  aria-label="Close terminal shell"
                  className="p-1 border border-border bg-background hover:border-accent hover:text-accent transition-colors"
                >
                  <X size={14} aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Terminal Body / Output History */}
            <div
              ref={terminalBodyRef}
              data-lenis-prevent="true"
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
              onClick={() => inputRef.current?.focus()}
              className="flex-1 p-3 sm:p-4 overflow-y-auto overscroll-contain space-y-3 cursor-text terminal-scrollbar touch-pan-y"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "var(--color-border) transparent",
              }}
            >
              {history.map((entry, idx) => (
                <div key={idx} className="flex flex-col gap-1">
                  {entry.command && (
                    <div className="flex items-center gap-2 text-foreground font-bold">
                      <span className="text-accent">guest@prajjval:~$</span>
                      <span>{entry.command}</span>
                    </div>
                  )}
                  {entry.output && <div className="pl-4">{entry.output}</div>}
                </div>
              ))}
              <div ref={terminalEndRef} />
            </div>

            {/* Input Line */}
            <form
              onSubmit={handleInputSubmit}
              className="flex items-center gap-2 p-2.5 sm:p-3 border-t-2 border-border bg-card"
            >
              <label htmlFor="terminal-input" className="sr-only">
                Terminal command input
              </label>
              <span className="text-accent font-bold select-none shrink-0" aria-hidden="true">
                guest@prajjval:~$
              </span>
              <input
                id="terminal-input"
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                autoComplete="off"
                spellCheck={false}
                placeholder="type 'help' for commands..."
                className="flex-1 bg-transparent border-none outline-none font-mono text-xs sm:text-sm text-foreground placeholder:text-muted/60"
              />
              <button
                type="submit"
                aria-label="Execute command"
                className="text-muted hover:text-accent p-1 transition-colors shrink-0"
              >
                <CornerDownLeft size={14} aria-hidden="true" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

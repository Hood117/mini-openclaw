"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const STEPS = [
  "[1/3] Understanding request…",
  "[2/3] Processing data…",
  "[3/3] Generating output…",
];

type ThinkingTerminalProps = {
  className?: string;
  title?: string;
  lineIntervalMs?: number;
  /**
   * When provided, the terminal becomes state-driven:
   * - active=false: idle, no looping
   * - active=true: reveals lines until complete, then stays "thinking" until inactive
   */
  active?: boolean;
};

export function ThinkingTerminal({
  className,
  title = "Thinking…",
  lineIntervalMs = 700,
  active,
}: ThinkingTerminalProps) {
  const [lineCount, setLineCount] = useState(0);

  useEffect(() => {
    if (active === false) {
      setLineCount(0);
      return;
    }
    const id = setInterval(() => {
      setLineCount((n) => {
        if (n >= STEPS.length) {
          // If state-driven and active, hold on final line.
          if (active === true) return STEPS.length;
          // Otherwise loop for demo/landing use.
          return 0;
        }
        return n + 1;
      });
    }, lineIntervalMs);
    return () => clearInterval(id);
  }, [lineIntervalMs, active]);

  const visible = STEPS.slice(0, lineCount);

  return (
    <div
      className={cn(
        "rounded-lg border border-emerald-500/20 bg-slate-950/90 font-mono text-[11px] leading-relaxed text-emerald-400/95 shadow-inner dark:bg-black/60",
        className
      )}
    >
      <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2 text-[10px] uppercase tracking-wider text-muted-foreground">
        <span className="size-2 rounded-full bg-red-500/80" />
        <span className="size-2 rounded-full bg-amber-500/80" />
        <span className="size-2 rounded-full bg-emerald-500/80" />
        <span className="ml-2 text-emerald-400/80">{title}</span>
      </div>
      <div className="min-h-[88px] space-y-1.5 px-3 py-3 text-emerald-300/90">
        <AnimatePresence mode="popLayout">
          {visible.map((line, i) => (
            <motion.div
              key={`${line}-${i}`}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="flex gap-2"
            >
              <span className="select-none text-emerald-600/70">▸</span>
              <span>{line}</span>
            </motion.div>
          ))}
        </AnimatePresence>
        {visible.length === 0 && (
          <motion.span
            animate={{ opacity: [0.35, 1, 0.35] }}
            transition={{ duration: 1.2, repeat: Infinity }}
            className="text-emerald-500/60"
          >
            Awaiting task…
          </motion.span>
        )}
        {active === true && visible.length === STEPS.length && (
          <motion.div
            className="mt-2 flex items-center gap-2 text-emerald-500/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.span
              className="inline-block size-2 rounded-full bg-emerald-500/70"
              animate={{ opacity: [0.25, 1, 0.25] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <span>Working…</span>
          </motion.div>
        )}
      </div>
    </div>
  );
}

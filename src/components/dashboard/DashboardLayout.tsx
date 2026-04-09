"use client";

import { ReactNode, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Brain, LogIn, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Theme = "light" | "dark";

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
}

type DashboardLayoutProps = {
  children: ReactNode;
};

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("mini_openclaw_theme");
    const resolved: Theme =
      stored === "dark" || stored === "light" ? stored : "dark";
    setTheme(resolved);
    applyTheme(resolved);
  }, []);

  const toggleLabel = useMemo(() => {
    if (!theme) return "Theme";
    return theme === "dark" ? "Light mode" : "Dark mode";
  }, [theme]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-white">
      {/* Premium glow background (match landing hero) */}
      <div
        className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(124,58,237,0.22),transparent)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(139,92,246,0.28),transparent)]"
        aria-hidden
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed -left-24 top-24 -z-10 size-72 rounded-full bg-violet-500/20 blur-3xl dark:bg-violet-600/25"
        animate={{ y: [0, -12, 0], opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed -right-16 top-40 -z-10 size-64 rounded-full bg-cyan-500/15 blur-3xl dark:bg-cyan-400/20"
        animate={{ y: [0, 14, 0], opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed bottom-10 left-1/3 -z-10 size-48 rounded-full bg-fuchsia-500/15 blur-2xl"
        animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.08, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Glassmorphic navbar (match landing) */}
      <motion.header
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "sticky top-0 z-50 border-b border-slate-200/80 bg-white/75 backdrop-blur-xl",
          "dark:border-white/10 dark:bg-slate-950/80",
        )}
      >
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link
            href="/"
            className="flex items-center gap-2 font-semibold tracking-tight text-slate-900 dark:text-white"
          >
            <span className="flex size-8 items-center justify-center rounded-lg bg-violet-600/15 text-violet-600 dark:bg-violet-500/20 dark:text-violet-300">
              <Brain className="size-4" aria-hidden />
            </span>
            <span>BrainHub</span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            <Link
              href="/"
              className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            >
              Home
            </Link>
            <a
              href="#top"
              className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            >
              Dashboard
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="hidden sm:inline-flex">
              <LogIn className="mr-2 size-4" aria-hidden />
              Login
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon-sm"
              aria-label={toggleLabel}
              disabled={!theme}
              onClick={() => {
                if (!theme) return;
                const next: Theme = theme === "dark" ? "light" : "dark";
                localStorage.setItem("mini_openclaw_theme", next);
                setTheme(next);
                applyTheme(next);
              }}
              className="border-slate-200 dark:border-white/15"
            >
              {theme === "dark" ? (
                <Sun className="size-4" />
              ) : (
                <Moon className="size-4" />
              )}
            </Button>
          </div>
        </div>
      </motion.header>

      <main id="top">{children}</main>
    </div>
  );
}


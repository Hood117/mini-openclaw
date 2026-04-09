"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Brain, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Theme = "light" | "dark";

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
}

const navLinkClass =
  "text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white";

export function LandingNavbar() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("mini_openclaw_theme");
    const resolved: Theme =
      stored === "dark" || stored === "light"
        ? stored
        : "dark";
    setTheme(resolved);
    applyTheme(resolved);
  }, []);

  const toggleLabel = useMemo(() => {
    if (!theme) return "Theme";
    return theme === "dark" ? "Light mode" : "Dark mode";
  }, [theme]);

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "sticky top-0 z-50 border-b border-slate-200/80 bg-white/75 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/80"
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
          <a href="#features" className={navLinkClass}>
            Features
          </a>
          <a href="#how-it-works" className={navLinkClass}>
            How It Works
          </a>
          <a href="#demo" className={navLinkClass}>
            Demo
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="hidden sm:inline-flex"
            asChild
          >
            <a href="#">Login</a>
          </Button>
          <Button size="sm" className="hidden sm:inline-flex" asChild>
            <a href="/app">Get Started</a>
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
  );
}

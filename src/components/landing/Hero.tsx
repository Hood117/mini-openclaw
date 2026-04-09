"use client";

import { motion } from "framer-motion";
import { Sparkles, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ThinkingTerminal } from "@/components/landing/ThinkingTerminal";
import { cn } from "@/lib/utils";

const float = {
  animate: {
    y: [0, -12, 0],
    opacity: [0.35, 0.55, 0.35],
  },
  transition: {
    duration: 8,
    repeat: Infinity,
    ease: "easeInOut" as const,
  },
};

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-slate-200/80 dark:border-white/10">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(124,58,237,0.22),transparent)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(139,92,246,0.28),transparent)]"
        aria-hidden
      />
      <motion.div
        className="pointer-events-none absolute -left-24 top-24 size-72 rounded-full bg-violet-500/20 blur-3xl dark:bg-violet-600/25"
        {...float}
      />
      <motion.div
        className="pointer-events-none absolute -right-16 top-40 size-64 rounded-full bg-cyan-500/15 blur-3xl dark:bg-cyan-400/20"
        animate={{ ...float.animate, y: [0, 14, 0] }}
        transition={{ ...float.transition, duration: 9 }}
      />
      <motion.div
        className="pointer-events-none absolute bottom-10 left-1/3 size-48 rounded-full bg-fuchsia-500/15 blur-2xl"
        animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.08, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-16 lg:py-28">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-violet-500/25 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-700 dark:border-violet-400/30 dark:bg-violet-500/15 dark:text-violet-200"
          >
            <Sparkles className="size-3.5" aria-hidden />
            BrainHub — Personal AI Task Manager
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="mt-6 text-4xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-[3.25rem] lg:leading-[1.08]"
          >
            Your Personal AI Task Assistant
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="mt-5 max-w-xl text-lg text-slate-600 dark:text-slate-400"
          >
            Summarize, plan, and create content with an intelligent AI agent.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Button size="lg" className="shadow-lg shadow-violet-500/25" asChild>
                <a href="/app">Get Started</a>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Button size="lg" variant="outline" asChild>
                <a href="#demo" className="gap-2">
                  <Play className="size-4" aria-hidden />
                  View Demo
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative"
        >
          <div
            className={cn(
              "absolute -inset-1 rounded-2xl bg-gradient-to-br from-violet-500/30 via-fuchsia-500/20 to-cyan-500/25 opacity-70 blur-xl dark:from-violet-500/40 dark:via-fuchsia-500/25 dark:to-cyan-500/30"
            )}
            aria-hidden
          />
          <Card className="relative border-slate-200/90 bg-white/90 shadow-2xl backdrop-blur dark:border-white/10 dark:bg-slate-900/90">
            <CardHeader className="pb-2">
              <CardTitle className="text-base dark:text-white">Quick task</CardTitle>
              <CardDescription className="text-slate-600 dark:text-gray-300">
                Describe what you need — BrainHub handles the rest.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                readOnly
                placeholder="e.g. Summarize my notes and plan tomorrow…"
                className="h-10 bg-slate-50 dark:bg-slate-950/50"
              />
              <ThinkingTerminal lineIntervalMs={650} />
              <Card className="border-violet-500/20 bg-gradient-to-br from-violet-500/10 to-transparent dark:from-violet-500/15">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-violet-900 dark:text-violet-100">
                    AI output
                  </CardTitle>
                  <CardDescription className="text-xs text-slate-600 dark:text-slate-400">
                    Structured summary + next steps
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                  <p>
                    • Key themes extracted from your notes.
                    <br />• Suggested 3-block schedule for tomorrow morning.
                    <br />• Draft social post ready to edit.
                  </p>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

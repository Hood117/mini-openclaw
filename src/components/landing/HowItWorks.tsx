"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Terminal } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const steps = [
  {
    n: "01",
    title: "Enter your task",
    body: "Describe what you want in plain language — notes, planning, or content.",
  },
  {
    n: "02",
    title: "AI processes with thinking steps",
    body: "Transparent, terminal-style steps show how your request is handled.",
    terminal: true,
  },
  {
    n: "03",
    title: "Get structured results",
    body: "Receive summaries, plans, and drafts in a clean output card.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-24 border-b border-slate-200/80 py-20 dark:border-white/10"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            How it works
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400">
            Three steps from idea to output — no busywork.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3 lg:gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className="relative"
            >
              {i < steps.length - 1 && (
                <div
                  className="absolute left-full top-12 z-0 hidden w-full max-w-[calc(100%-1rem)] lg:block"
                  aria-hidden
                >
                  <div className="flex items-center justify-center pr-6">
                    <ArrowRight className="size-5 text-violet-500/50 dark:text-violet-300/50" />
                  </div>
                </div>
              )}
              <Card
                className={cn(
                  "relative h-full border-slate-200/90 bg-white/90 dark:border-white/10 dark:bg-slate-900/80",
                  step.terminal && "ring-1 ring-violet-500/20 dark:ring-violet-400/20"
                )}
              >
                <CardHeader>
                  <span className="text-xs font-mono font-medium text-violet-600 dark:text-violet-400">
                    {step.n}
                  </span>
                  <CardTitle className="flex items-center gap-2 text-lg dark:text-white">
                    {step.title}
                    {step.terminal && (
                      <Terminal
                        className="size-4 text-emerald-500/90 dark:text-emerald-400/90"
                        aria-hidden
                      />
                    )}
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed text-slate-600 dark:text-gray-300">
                    {step.body}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {step.terminal && (
                    <div className="rounded-lg border border-emerald-500/25 bg-slate-950 p-3 font-mono text-[11px] leading-relaxed text-emerald-400/95 dark:bg-black/70">
                      <div className="mb-2 text-[10px] uppercase tracking-wider text-emerald-600/80">
                        Thinking stream
                      </div>
                      <ul className="space-y-1.5">
                        <li className="flex gap-2">
                          <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-emerald-500/80 dark:text-emerald-400/80" />
                          <span>[1/3] Understanding request…</span>
                        </li>
                        <li className="flex gap-2">
                          <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-emerald-500/80 dark:text-emerald-400/80" />
                          <span>[2/3] Processing data…</span>
                        </li>
                        <li className="flex gap-2">
                          <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-emerald-500/80 dark:text-emerald-400/80" />
                          <span>[3/3] Generating output…</span>
                        </li>
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

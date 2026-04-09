"use client";

import { motion } from "framer-motion";
import { Calendar, CheckCircle2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ThinkingTerminal } from "@/components/landing/ThinkingTerminal";

export function Preview() {
  return (
    <section
      id="demo"
      className="scroll-mt-24 border-b border-slate-200/80 bg-slate-50/80 py-20 dark:border-white/10 dark:bg-slate-950/50"
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
            See the demo
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400">
            Watch the thinking panel and planner-style output side by side.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-8 lg:grid-cols-2 lg:gap-10">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <ThinkingTerminal title="Thinking…" lineIntervalMs={600} />
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-4 text-sm text-slate-600 dark:text-slate-400"
            >
              Lines appear one after another — mirroring how BrainHub reasons
              through your task.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-slate-200/90 bg-white/95 shadow-xl dark:border-white/10 dark:bg-slate-900/90">
              <CardHeader>
                <div className="flex items-center gap-2 text-violet-600 dark:text-violet-400">
                  <Calendar className="size-4" aria-hidden />
                  <span className="text-xs font-medium uppercase tracking-wide">
                    Daily planner preview
                  </span>
                </div>
                <CardTitle className="text-lg">Today — focused blocks</CardTitle>
                <CardDescription>
                  AI-structured schedule you can tweak in seconds.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { t: "08:00 — Deep work: project brief", done: true },
                  { t: "10:30 — Team sync (25m)", done: true },
                  { t: "12:00 — Lunch & recharge", done: false },
                  { t: "13:30 — Draft social + review", done: false },
                ].map((row, idx) => (
                  <motion.div
                    key={row.t}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.08 * idx }}
                    className="flex items-start gap-3 rounded-lg border border-slate-200/80 bg-slate-50/80 px-3 py-2.5 text-sm dark:border-white/10 dark:bg-slate-950/50"
                  >
                    <CheckCircle2
                      className={
                        row.done
                          ? "mt-0.5 size-4 shrink-0 text-emerald-500"
                          : "mt-0.5 size-4 shrink-0 text-slate-300 dark:text-slate-600"
                      }
                    />
                    <span
                      className={
                        row.done
                          ? "text-slate-700 line-through decoration-slate-400 dark:text-slate-300"
                          : "text-slate-800 dark:text-slate-200"
                      }
                    >
                      {row.t}
                    </span>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

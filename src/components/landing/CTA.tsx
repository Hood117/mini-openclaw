"use client";

import { motion } from "framer-motion";
import { Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section
      id="cta"
      className="scroll-mt-24 py-24"
    >
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl border border-violet-500/25 bg-gradient-to-br from-violet-600/20 via-slate-900/40 to-cyan-500/15 px-8 py-16 dark:from-violet-600/25 dark:via-slate-950/60 dark:to-cyan-500/20"
        >
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(167,139,250,0.35),transparent_55%)]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(34,211,238,0.2),transparent_50%)]"
            aria-hidden
          />

          <h2 className="relative text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Start using BrainHub today
          </h2>
          <p className="relative mx-auto mt-4 max-w-lg text-slate-600 dark:text-slate-400">
            Your calm, intelligent layer for tasks — summarize, plan, and create
            without switching tools.
          </p>
          <motion.div
            className="relative mt-8 flex justify-center"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <Button
              size="lg"
              className="h-11 gap-2 px-8 text-base shadow-xl shadow-violet-500/30"
              asChild
            >
              <a href="#demo">
                <Rocket className="size-4" aria-hidden />
                Launch App
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

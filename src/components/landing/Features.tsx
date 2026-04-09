"use client";

import { motion } from "framer-motion";
import {
  BookOpen,
  CalendarClock,
  FileUp,
  ListTree,
  Share2,
  Sparkles,
} from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const items = [
  {
    icon: Sparkles,
    title: "AI Summarization",
    description:
      "Turn long docs and threads into crisp takeaways you can act on.",
  },
  {
    icon: Share2,
    title: "Social Content Generator",
    description:
      "Draft posts and captions in your voice — ready to polish and publish.",
  },
  {
    icon: CalendarClock,
    title: "Daily Planner Timeline",
    description:
      "Auto-build a realistic day plan from goals, meetings, and energy.",
  },
  {
    icon: ListTree,
    title: "Thinking Execution Log",
    description:
      "Watch step-by-step reasoning so you always know how outputs were built.",
  },
  {
    icon: BookOpen,
    title: "Long-Term Memory",
    description:
      "BrainHub recalls context across sessions for consistent, personal help.",
  },
  {
    icon: FileUp,
    title: "File Upload (PDF/Image)",
    description:
      "Drop files in — extract insights, tables, and tasks without manual prep.",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemMotion = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

export function Features() {
  return (
    <section
      id="features"
      className="scroll-mt-24 border-b border-slate-200/80 bg-slate-50/80 py-20 dark:border-white/10 dark:bg-slate-950/50"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Everything you need to stay ahead
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400">
            Six powerful capabilities — one calm, focused workspace.
          </p>
        </motion.div>

        <motion.ul
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {items.map(({ icon: Icon, title, description }) => (
            <motion.li key={title} variants={itemMotion}>
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 24 }}
                className="h-full"
              >
                <Card
                  className={cn(
                    "h-full border-slate-200/90 bg-white/90 transition-shadow duration-300",
                    "hover:border-violet-500/35 hover:shadow-[0_0_0_1px_rgba(139,92,246,0.2),0_20px_50px_-20px_rgba(139,92,246,0.35)]",
                    "dark:border-white/10 dark:bg-slate-900/80 dark:hover:border-violet-400/30 dark:hover:shadow-[0_0_0_1px_rgba(167,139,250,0.15),0_24px_60px_-24px_rgba(139,92,246,0.45)]"
                  )}
                >
                  <CardHeader>
                    <div className="mb-1 flex size-10 items-center justify-center rounded-lg bg-violet-500/12 text-violet-600 dark:bg-violet-500/20 dark:text-violet-300">
                      <Icon className="size-5 text-violet-600 dark:text-violet-200" aria-hidden />
                    </div>
                    <CardTitle className="text-base dark:text-white">{title}</CardTitle>
                    <CardDescription className="text-sm leading-relaxed text-slate-600 dark:text-gray-300">
                      {description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

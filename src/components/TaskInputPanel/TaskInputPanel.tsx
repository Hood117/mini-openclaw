"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Copy, Sparkles } from "lucide-react";
import type { TaskType } from "@/types/task";
import { TASK_TYPES } from "@/lib/taskTypes";
import { Spinner } from "@/components/ui/Spinner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ThinkingTerminal } from "@/components/landing/ThinkingTerminal";
import { cn } from "@/lib/utils";

type Props = {
  taskType: TaskType;
  inputText: string;
  setTaskType: (taskType: TaskType) => void;
  setInputText: (value: string) => void;
  loading: boolean;
  error: string | null;
  output: string;
  onGenerate: (taskType: TaskType, inputText: string) => Promise<void>;
};

function getTaskMeta(taskType: TaskType) {
  return TASK_TYPES.find((t) => t.id === taskType) ?? TASK_TYPES[0];
}

export function TaskInputPanel({
  taskType,
  inputText,
  setTaskType,
  setInputText,
  loading,
  error,
  output,
  onGenerate,
}: Props) {
  const meta = useMemo(() => getTaskMeta(taskType), [taskType]);

  const canSubmit = !loading && inputText.trim().length > 0;

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45 }}
    >
      <motion.div
        whileHover={{ scale: 1.01, y: -2 }}
        transition={{ type: "spring", stiffness: 400, damping: 26 }}
      >
        <Card className="border-slate-200/90 bg-white/90 shadow-xl backdrop-blur dark:border-white/10 dark:bg-slate-900/80">
          <CardHeader>
            <div className="mb-1 inline-flex items-center gap-2 rounded-full border border-violet-500/25 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-700 dark:border-violet-400/30 dark:bg-violet-500/15 dark:text-violet-200">
              <Sparkles className="size-3.5" aria-hidden />
              BrainHub Task Runner
            </div>
            <CardTitle className="text-lg dark:text-white">Task Input</CardTitle>
            <CardDescription className="text-slate-600 dark:text-gray-300">
              Choose a mode, paste your text, and let the agent handle the rest.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <label className="grid gap-2">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
                  Task type
                </span>
              </div>
              <Select
                value={taskType}
                onValueChange={(v) => setTaskType(v as TaskType)}
              >
                <SelectTrigger aria-label="Select task type">
                  <SelectValue placeholder="Select a task type" />
                </SelectTrigger>
                <SelectContent>
                  {TASK_TYPES.map((t) => (
                    <SelectItem key={t.id} value={t.id}>
                      {t.icon} {t.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </label>

            <label className="grid gap-2">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
                  Your instructions
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {inputText.trim().length ? `${inputText.trim().length} chars` : " "}
                </span>
              </div>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                rows={6}
                placeholder={meta.placeholder}
                className={cn(
                  "w-full resize-none rounded-2xl border border-slate-200/80 bg-slate-50/70 p-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-500",
                  "focus:ring-2 focus:ring-violet-500/45 dark:border-white/10 dark:bg-slate-950/40 dark:text-white dark:placeholder:text-slate-500",
                )}
              />
            </label>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <motion.div whileHover={{ scale: canSubmit ? 1.02 : 1 }} whileTap={{ scale: canSubmit ? 0.98 : 1 }}>
                <Button
                  type="button"
                  size="lg"
                  disabled={!canSubmit}
                  onClick={() => onGenerate(taskType, inputText)}
                  className={cn(
                    "h-11 rounded-2xl px-6 shadow-lg shadow-violet-500/25",
                    !canSubmit && "opacity-60",
                  )}
                >
                  {loading ? <Spinner label="Generating…" /> : <span>Generate</span>}
                </Button>
              </motion.div>

              <div className="text-xs text-slate-500 dark:text-slate-400">
                Uses OpenRouter API. Your key stays on the server.
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Output + real loading-driven thinking */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.45, delay: 0.05 }}
        className="mt-5"
      >
        <motion.div
          whileHover={{ scale: 1.01, y: -2 }}
          transition={{ type: "spring", stiffness: 400, damping: 26 }}
        >
          <Card className="border-slate-200/90 bg-white/90 shadow-xl backdrop-blur dark:border-white/10 dark:bg-slate-900/80">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <CardTitle className="text-lg dark:text-white">Results</CardTitle>
                  <CardDescription className="text-slate-600 dark:text-gray-300">
                    {loading
                      ? "AI is processing your request…"
                      : output.trim().length
                        ? "Here’s what the agent produced."
                        : "Submit a task to see results."}
                  </CardDescription>
                </div>

                {output.trim().length > 0 && !loading ? (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(output);
                      } catch {
                        // ignore
                      }
                    }}
                    className="gap-2"
                  >
                    <Copy className="size-4" aria-hidden />
                    Copy
                  </Button>
                ) : null}
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <ThinkingTerminal active={loading} title="Thinking…" lineIntervalMs={550} />

              {error ? (
                <p className="text-sm font-medium text-rose-600 dark:text-rose-300">
                  {error}
                </p>
              ) : output.trim().length ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="whitespace-pre-wrap break-words rounded-2xl border border-violet-500/15 bg-gradient-to-br from-violet-500/10 to-transparent p-4 text-sm leading-relaxed text-slate-800 dark:text-slate-200 dark:from-violet-500/12"
                >
                  {output}
                </motion.div>
              ) : (
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  Paste your task above and hit <span className="font-semibold">Generate</span>.
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}


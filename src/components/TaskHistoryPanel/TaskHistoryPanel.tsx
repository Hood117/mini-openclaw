"use client";

import { motion } from "framer-motion";
import { Copy, Trash2 } from "lucide-react";
import type { TaskHistoryItem, TaskType } from "@/types/task";
import { getTaskTypeMeta } from "@/lib/taskTypes";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Props = {
  history: TaskHistoryItem[];
  onClear: () => void;
};

function formatTime(ts: number) {
  try {
    return new Date(ts).toLocaleString();
  } catch {
    return "";
  }
}

export function TaskHistoryPanel({ history, onClear }: Props) {
  return (
    <motion.aside
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: 0.05 }}
    >
      <motion.div
        whileHover={{ scale: 1.01, y: -2 }}
        transition={{ type: "spring", stiffness: 400, damping: 26 }}
      >
        <Card className="border-slate-200/90 bg-white/90 shadow-xl backdrop-blur dark:border-white/10 dark:bg-slate-900/80">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <CardTitle className="text-lg dark:text-white">Task History</CardTitle>
                <CardDescription className="text-slate-600 dark:text-gray-300">
                  Last {Math.min(history.length, 10)} tasks stored locally on this device.
                </CardDescription>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={onClear}
                disabled={history.length === 0}
                className="gap-2"
              >
                <Trash2 className="size-4" aria-hidden />
                Clear
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-3">
            {history.length === 0 ? (
              <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-4 text-sm text-slate-600 dark:border-white/10 dark:bg-slate-950/40 dark:text-slate-300">
                No history yet. Generate your first task and it will appear here.
              </div>
            ) : (
              history
                .slice()
                .reverse()
                .map((item, idx) => {
                  const meta = getTaskTypeMeta(item.taskType as TaskType);
                  return (
                    <motion.details
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.25, delay: 0.04 * idx }}
                      className={cn(
                        "group rounded-2xl border border-slate-200/80 bg-slate-50/60 p-3",
                        "dark:border-white/10 dark:bg-slate-950/35",
                      )}
                    >
                      <summary className="cursor-pointer list-none">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <span className="text-xl" aria-hidden>
                              {meta.icon}
                            </span>
                            <div>
                              <div className="text-sm font-semibold text-slate-900 dark:text-white">
                                {meta.label}
                              </div>
                              <div className="text-xs text-slate-500 dark:text-slate-400">
                                {formatTime(item.createdAt)}
                              </div>
                            </div>
                          </div>
                          <div
                            className="text-xs font-semibold text-slate-500 transition group-open:rotate-45"
                            aria-hidden
                          >
                            +
                          </div>
                        </div>
                      </summary>

                      <div className="mt-3 space-y-3">
                        <div>
                          <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                            Input
                          </div>
                          <pre className="mt-1 max-h-28 overflow-auto whitespace-pre-wrap break-words rounded-xl border border-slate-200/80 bg-white/70 p-3 text-[12px] leading-relaxed text-slate-800 dark:border-white/10 dark:bg-slate-950/40 dark:text-slate-200">
                            {item.input}
                          </pre>
                        </div>

                        <div>
                          <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                            AI Output
                          </div>
                          <pre className="mt-1 max-h-44 overflow-auto whitespace-pre-wrap break-words rounded-xl border border-violet-500/15 bg-gradient-to-br from-violet-500/10 to-transparent p-3 text-[12px] leading-relaxed text-slate-800 dark:border-violet-400/20 dark:text-slate-200 dark:from-violet-500/12">
                            {item.output}
                          </pre>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={async () => {
                              try {
                                await navigator.clipboard.writeText(item.output);
                              } catch {
                                // ignore
                              }
                            }}
                            className="gap-2"
                          >
                            <Copy className="size-4" aria-hidden />
                            Copy output
                          </Button>
                        </div>
                      </div>
                    </motion.details>
                  );
                })
            )}
          </CardContent>
        </Card>
      </motion.div>
    </motion.aside>
  );
}


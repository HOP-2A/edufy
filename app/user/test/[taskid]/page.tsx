"use client";

import { useEffect, useState, useMemo } from "react";
import { useParams } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Sidebar from "@/app/_components/SideBar";
import {
  Check,
  Trophy,
  AlertCircle,
  ChevronRight,
  Info,
  X,
} from "lucide-react"; // Added Trophy
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import clsx from "clsx";

interface Resource {
  id: string;
  type: string;
  title: string;
  url: string | null;
}

interface TaskQuestion {
  id: string;
  text: string;
  answer: string;
  userAnswer: string | null;
  isCorrect: boolean | null;
}

interface Task {
  id: string;
  title: string;
  content: string;
  completed: boolean;
  order: number;
  resources: Resource[];
  taskQuestions: TaskQuestion[];
}

type Option = {
  label: string;
  value: string;
};

export default function RoadmapPage() {
  const params = useParams<{ taskid: string }>();
  const taskid = params.taskid;

  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (submitted && task && !task.completed) {
      setTask((prev) => (prev ? { ...prev, completed: true } : null));
    }
  }, [submitted, task]);

  useEffect(() => {
    if (!taskid) return;

    const fetchTask = async () => {
      try {
        const res = await fetch(`/api/get-task/${taskid}`);
        if (!res.ok) throw new Error("Failed to fetch task");

        const data = await res.json();

        setTask({
          ...data,
          resources: data.resources,
          taskQuestions: data.taskQuestions,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [taskid]);

  const stats = useMemo(() => {
    if (!task) {
      return { total: 0, correct: 0, percent: 0 };
    }

    const total = task.taskQuestions.length;
    let correct = 0;

    for (let i = 0; i < task.taskQuestions.length; i++) {
      if (task.taskQuestions[i].isCorrect === true) {
        correct++;
      }
    }

    let percent = 0;
    if (total > 0) {
      percent = Math.round((correct / total) * 100);
    }

    return { total, correct, percent };
  }, [task]);

  const normalize = (text: string) => {
    return text.trim().toLowerCase().replace(/\s+/g, " ");
  };

  const handleAnswerSelect = (questionId: string, value: string) => {
    if (!task) return;
    if (submitted) return;

    const updatedQuestions = task.taskQuestions.map((q) => {
      if (q.id === questionId) {
        const correct = normalize(value) === normalize(q.answer);

        return {
          ...q,
          userAnswer: value,
          isCorrect: correct,
        };
      }

      return q;
    });

    setTask({
      ...task,
      taskQuestions: updatedQuestions,
    });
  };

  const splitQuestion = (text: string) => {
    const index = text.indexOf("(");

    if (index === -1) {
      return {
        mainText: text,
        choicesText: "",
      };
    }

    return {
      mainText: text.substring(0, index).trim(),
      choicesText: text.substring(index).trim(),
    };
  };

  const getTrueFalseOptions = (text: string) => {
    const lower = text.toLowerCase();

    if (lower.includes("true") && lower.includes("false")) {
      return [
        { label: "True", value: "true" },
        { label: "False", value: "false" },
      ];
    }

    return null;
  };

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center font-medium text-slate-500">
        Loading…
      </div>
    );
  if (error)
    return (
      <div className="flex h-screen items-center justify-center text-red-500 font-medium">
        {error}
      </div>
    );
  if (!task)
    return (
      <div className="flex h-screen items-center justify-center font-medium">
        Task not found
      </div>
    );

  return (
    <div className="flex min-h-screen bg-white text-slate-900 font-sans antialiased">
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-12 py-16">
          {/* HEADER - Sharper lines, minimal blue accent */}
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-1.5 h-8 bg-blue-500 rounded-full" />
              <h1 className="text-4xl font-bold tracking-tight text-slate-900">
                {task.title}
              </h1>
            </div>
            <div className="flex items-center gap-4 pl-4">
              {task.completed && (
                <span className="bg-blue-50 text-blue-700 text-[11px] font-bold px-2.5 py-0.5 rounded border border-blue-100 uppercase tracking-wider">
                  Status: Completed
                </span>
              )}
              <p className="text-slate-500 font-medium">{task.content}</p>
            </div>
          </header>

          {/* SCORE DISPLAY - Grid-style layout, less rounded */}
          {submitted && (
            <div className="mb-12 p-8 bg-white border border-slate-200 rounded-2xl flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-8">
                <div className="space-y-1">
                  <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                    Overall Accuracy
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold text-blue-600">
                      {stats.percent}%
                    </span>
                    <span className="text-slate-300 font-semibold uppercase text-xs">
                      Final Grade
                    </span>
                  </div>
                </div>
                <div className="h-12 w-px bg-slate-100" />
                <div className="space-y-1">
                  <p className="text-slate-500 text-sm font-medium">
                    Correct Responses:{" "}
                    <span className="text-slate-900 font-bold">
                      {stats.correct}/{stats.total}
                    </span>
                  </p>
                  <p className="text-slate-400 text-xs">
                    Validated by System Protocol
                  </p>
                </div>
              </div>

              <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center border border-blue-100">
                {stats.percent >= 70 ? (
                  <Trophy className="w-7 h-7 text-blue-600" />
                ) : (
                  <AlertCircle className="w-7 h-7 text-blue-400" />
                )}
              </div>
            </div>
          )}

          <div className="space-y-6">
            {task.taskQuestions.map((q: TaskQuestion, index: number) => {
              const { mainText } = splitQuestion(q.text);
              const tfOptions = getTrueFalseOptions(q.text);

              // Original Regex Parsing Logic
              const getLetterOptions = (text: string) => {
                const matches = text.match(/\([a-zA-Z]\)[^()]+/g);
                if (!matches) return null;
                return matches.map((item) => {
                  const letterMatch = item.match(/\(([a-zA-Z])\)/);
                  const value = item.trim();
                  return {
                    label: letterMatch ? letterMatch[1] : "",
                    value: value,
                  };
                });
              };

              const options = tfOptions ?? getLetterOptions(q.text);

              return (
                <div key={q.id} className="flex gap-6">
                  {/* Numbering - Square with slight rounding */}
                  <div className="pt-2">
                    <div
                      className={clsx(
                        "w-9 h-9 flex items-center justify-center rounded-lg border font-bold text-sm transition-colors",
                        submitted && q.isCorrect
                          ? "bg-blue-600 border-blue-600 text-white"
                          : "bg-slate-50 border-slate-200 text-slate-400",
                      )}
                    >
                      {index + 1}
                    </div>
                  </div>

                  <div
                    className={clsx(
                      "flex-1 border rounded-2xl bg-white transition-all overflow-hidden",
                      submitted
                        ? q.isCorrect
                          ? "border-blue-100 shadow-sm"
                          : "border-slate-100 opacity-80"
                        : "border-slate-200 hover:border-blue-200",
                    )}
                  >
                    <Accordion
                      type="single"
                      collapsible
                      defaultValue={!submitted ? q.id : undefined}
                    >
                      <AccordionItem value={q.id} className="border-none">
                        <AccordionTrigger className="px-6 py-5 hover:no-underline">
                          <span className="text-sm font-bold text-slate-700">
                            Question Details
                          </span>
                        </AccordionTrigger>

                        <AccordionContent className="px-6 pb-6 space-y-6">
                          <div className="text-base text-slate-700 leading-relaxed font-medium">
                            {mainText}
                          </div>

                          {options ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {options.map((opt) => {
                                const selected = q.userAnswer === opt.value;
                                return (
                                  <button
                                    key={opt.label}
                                    disabled={submitted}
                                    onClick={() =>
                                      handleAnswerSelect(q.id, opt.value)
                                    }
                                    className={clsx(
                                      "border-2 rounded-xl px-5 py-3.5 text-sm text-left transition-all font-semibold",
                                      selected
                                        ? "border-blue-600 bg-blue-50 text-blue-700"
                                        : "border-slate-100 bg-white text-slate-600 hover:border-slate-300",
                                      submitted && "cursor-not-allowed",
                                    )}
                                  >
                                    <span className="opacity-50 mr-2">
                                      {opt.label}.
                                    </span>
                                    {opt.value}
                                  </button>
                                );
                              })}
                            </div>
                          ) : (
                            <Input
                              disabled={submitted}
                              value={q.userAnswer ?? ""}
                              placeholder="Enter your response..."
                              className="h-12 rounded-xl border-slate-200 focus:border-blue-500 focus:ring-0"
                              onChange={(e) =>
                                handleAnswerSelect(q.id, e.target.value)
                              }
                            />
                          )}

                          {submitted && (
                            <div
                              className={clsx(
                                "p-4 rounded-xl border flex items-center justify-between",
                                q.isCorrect
                                  ? "bg-blue-50/50 border-blue-100"
                                  : "bg-slate-50 border-slate-200",
                              )}
                            >
                              <div className="flex items-center gap-3">
                                <Info className="w-4 h-4 text-blue-500" />
                                <div>
                                  <p className="text-[10px] font-bold text-slate-400 uppercase">
                                    Correct Answer
                                  </p>
                                  <p className="text-sm font-bold text-slate-900">
                                    {q.answer}
                                  </p>
                                </div>
                              </div>
                              {q.isCorrect ? (
                                <Check className="w-5 h-5 text-blue-600" />
                              ) : (
                                <span className="text-slate-400 text-[10px] font-bold">
                                  <X />
                                </span>
                              )}
                            </div>
                          )}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </div>
              );
            })}

            {!submitted && (
              <div className="pt-8 pl-14">
                <Button
                  className="w-full py-7 text-lg font-bold rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-all flex items-center justify-center gap-2"
                  onClick={() => setSubmitted(true)}
                >
                  Submit Final Answers
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

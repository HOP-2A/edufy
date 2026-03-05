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
import Footer from "@/app/_components/Footer";
import {
  Check,
  Trophy,
  AlertCircle,
  ChevronRight,
  Info,
  X,
  Zap,
  Target,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import clsx from "clsx";

type Resource = {
  id: string;
  type: string;
  title: string;
  url: string | null;
};

type TaskQuestion = {
  id: string;
  text: string;
  answer: string;
  userAnswer: string | null;
  isCorrect: boolean | null;
};

type Task = {
  id: string;
  title: string;
  content: string;
  completed: boolean;
  order: number;
  resources: Resource[];
  taskQuestions: TaskQuestion[];
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
        setTask(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchTask();
  }, [taskid]);

  const stats = useMemo(() => {
    if (!task) return { total: 0, correct: 0, percent: 0 };
    const total = task.taskQuestions.length;
    let correct = 0;
    task.taskQuestions.forEach((q) => {
      if (q.isCorrect === true) correct++;
    });
    const percent = total > 0 ? Math.round((correct / total) * 100) : 0;
    return { total, correct, percent };
  }, [task]);

  const normalize = (text: string) =>
    text.trim().toLowerCase().replace(/\s+/g, " ");

  const handleAnswerSelect = (questionId: string, value: string) => {
    if (!task || submitted) return;
    const updatedQuestions = task.taskQuestions.map((q) => {
      if (q.id === questionId) {
        const correctAnswer = q.answer.replace(/^[a-zA-Z]\)\s*/, "");
        const correct = normalize(value) === normalize(correctAnswer);
        return { ...q, userAnswer: value, isCorrect: correct };
      }
      return q;
    });
    setTask({ ...task, taskQuestions: updatedQuestions });
  };

  const splitQuestion = (text: string) => {
    const optionStart = text.search(/([a-zA-Z])\)|\([a-zA-Z]\)/);
    if (optionStart === -1) return { mainText: text.trim(), choicesText: "" };
    return {
      mainText: text.substring(0, optionStart).trim(),
      choicesText: text.substring(optionStart).trim(),
    };
  };

  const getTrueFalseOptions = (text: string) => {
    const lower = text.toLowerCase();
    if (lower.includes("true") && lower.includes("false")) {
      return [
        { label: "T", value: "true" },
        { label: "F", value: "false" },
      ];
    }
    return null;
  };

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center ">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-[1.5px] border-[rgba(0,255,200,0.1)] border-t-[rgba(0,255,200,0.8)] rounded-full animate-spin" />
          <span className="mono text-[9px] font-bold tracking-[0.3em] uppercase text-[rgba(0,255,200,0.3)]">
            Initializing Core
          </span>
        </div>
      </div>
    );

  return (
    <div
      className="flex min-h-screen text-white antialiased "
      style={{ fontFamily: "'Space Mono', monospace" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@400;700;900&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');
        .unb { font-family: 'Unbounded', sans-serif; }
        .mono { font-family: 'Space Mono', monospace; }

        .header-glow {
          border-bottom: 1px solid rgba(0,255,200,0.06);
          background: linear-gradient(to bottom, rgba(0,255,200,0.02), transparent);
        }

        .stat-card {
          background: rgba(0,255,200,0.03);
          border: 1px solid rgba(0,255,200,0.15);
          border-radius: 24px;
        }

        .question-container {
          background: rgba(0,255,200,0.01);
          border: 1px solid rgba(0,255,200,0.06);
          border-radius: 20px;
          transition: all 0.3s ease;
        }
        .question-container:hover { border-color: rgba(0,255,200,0.15); }

        .answer-opt {
          border: 1px solid rgba(255,255,255,0.05);
          background: rgba(255,255,255,0.02);
          border-radius: 12px;
          padding: 14px 20px;
          font-size: 11px;
          text-align: left;
          transition: all 0.2s;
        }
        .answer-opt:hover:not(:disabled) {
          border-color: rgba(0,255,200,0.2);
          background: rgba(0,255,200,0.04);
        }
        .answer-opt.selected {
          border-color: rgba(0,255,200,0.5);
          background: rgba(0,255,200,0.1);
          color: rgba(0,255,200,1);
        }

        .submit-btn {
          background: rgba(0,255,200,0.08);
          border: 1px solid rgba(0,255,200,0.2);
          color: rgba(0,255,200,0.9);
          font-family: 'Unbounded', sans-serif;
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          padding: 20px; border-radius: 16px;
          width: 100%; transition: all 0.2s;
        }
        .submit-btn:hover {
          background: rgba(0,255,200,0.15);
          border-color: rgba(0,255,200,0.4);
          box-shadow: 0 0 30px rgba(0,255,200,0.1);
          transform: translateY(-2px);
        }
      `}</style>

      <aside style={{ width: 210 }}>
        <Sidebar />
      </aside>

      <main className="flex-1 flex flex-col" style={{ marginLeft: 210 }}>
        <div className="max-w-4xl mx-auto w-full px-10 py-16">
          <header className="header-glow mb-12 pb-10">
            <div className="flex items-center gap-3 mb-6">
              <div
                style={{
                  width: 24,
                  height: 1,
                  background: "rgba(0,255,200,0.4)",
                }}
              />
              <span className="mono text-[9px] font-bold tracking-[0.4em] uppercase text-[rgba(0,255,200,0.5)]">
                Assessment Module
              </span>
            </div>
            <h1 className="unb text-4xl font-black tracking-tighter mb-4">
              {task.title}
            </h1>
            <p className="mono text-xs text-white/30 leading-relaxed max-w-2xl">
              {task.content}
            </p>
          </header>

          {submitted && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="stat-card p-8 mb-16 flex items-center justify-between"
            >
              <div className="flex items-center gap-10">
                <div className="space-y-2">
                  <p className="mono text-[8px] font-black uppercase tracking-widest text-white/20">
                    Accuracy Score
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="unb text-5xl font-black text-[rgba(0,255,200,1)]">
                      {stats.percent}%
                    </span>
                  </div>
                </div>
                <div className="h-12 w-px bg-white/5" />
                <div className="space-y-1">
                  <p className="mono text-[10px] text-white/40">
                    Verified Results:{" "}
                    <span className="text-white font-bold">
                      {stats.correct}/{stats.total}
                    </span>
                  </p>
                  <p className="mono text-[8px] text-white/10 uppercase tracking-tighter">
                    Evaluation Protocol Complete
                  </p>
                </div>
              </div>
              <div className="w-16 h-16 rounded-2xl bg-[rgba(0,255,200,0.05)] border border-[rgba(0,255,200,0.1)] flex items-center justify-center">
                {stats.percent >= 70 ? (
                  <Trophy className="text-[rgba(0,255,200,0.8)]" size={28} />
                ) : (
                  <Target className="text-white/20" size={28} />
                )}
              </div>
            </motion.div>
          )}

          <div className="space-y-8">
            {task.taskQuestions.map((q, index) => {
              const { mainText, choicesText } = splitQuestion(q.text);
              const tfOptions = getTrueFalseOptions(q.text);

              const getLetterOptions = (text: string) => {
                const regex =
                  /(?:\(?([a-zA-Z])\)?\))\s*([^a-zA-Z()]+.*?)(?=\s*[a-zA-Z]\)|\s*\([a-zA-Z]\)|$)/g;
                const options: { label: string; value: string }[] = [];
                let match;
                while ((match = regex.exec(text)) !== null) {
                  options.push({
                    label: match[1].toUpperCase(),
                    value: match[2].trim(),
                  });
                }
                return options.length > 0 ? options : null;
              };

              const options = tfOptions ?? getLetterOptions(choicesText);

              return (
                <div key={q.id} className="flex gap-8 group">
                  <div className="unb text-[rgba(0,255,200,0.2)] text-2xl font-black pt-2 group-hover:text-[rgba(0,255,200,0.5)] transition-colors">
                    {(index + 1).toString().padStart(2, "0")}
                  </div>

                  <div
                    className={clsx(
                      "flex-1 question-container p-8 space-y-8",
                      submitted &&
                        (q.isCorrect
                          ? "border-[rgba(0,255,200,0.3)] bg-[rgba(0,255,200,0.02)]"
                          : "opacity-50 border-red-900/20"),
                    )}
                  >
                    <div className="mono text-[13px] leading-relaxed text-white/80">
                      {mainText}
                    </div>

                    {options ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {options.map((opt) => (
                          <button
                            key={opt.label}
                            disabled={submitted}
                            onClick={() => handleAnswerSelect(q.id, opt.value)}
                            className={clsx(
                              "answer-opt unb",
                              q.userAnswer === opt.value && "selected",
                            )}
                          >
                            <span className="opacity-30 mr-2 text-[8px]">
                              {opt.label} //
                            </span>{" "}
                            {opt.value}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <Input
                        disabled={submitted}
                        value={q.userAnswer ?? ""}
                        placeholder="Type response..."
                        className="bg-white/2 border-white/5 h-12 rounded-xl mono text-xs focus:border-[rgba(0,255,200,0.3)] focus:ring-0"
                        onChange={(e) =>
                          handleAnswerSelect(q.id, e.target.value)
                        }
                      />
                    )}

                    {submitted && (
                      <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Info
                            size={12}
                            className="text-[rgba(0,255,200,0.5)]"
                          />
                          <span className="mono text-[9px] uppercase tracking-widest text-white/20">
                            Correct:
                          </span>
                          <span className="mono text-[10px] font-bold text-[rgba(0,255,200,0.8)]">
                            {q.answer}
                          </span>
                        </div>
                        {q.isCorrect ? (
                          <Check
                            size={16}
                            className="text-[rgba(0,255,200,1)]"
                          />
                        ) : (
                          <X size={16} className="text-red-500/50" />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {!submitted && (
              <div className="pt-12 pl-16">
                <button
                  className="submit-btn"
                  onClick={() => setSubmitted(true)}
                >
                  <div className="flex items-center justify-center gap-3">
                    Submit Final Assessment <ChevronRight size={16} />
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>

        <footer className="mt-auto px-10 py-10 border-t border-white/[0.03] opacity-20 hover:opacity-100 transition-opacity">
          <Footer />
        </footer>
      </main>
    </div>
  );
}

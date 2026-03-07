"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Sidebar from "../../_components/SideBar";
import {
  BookOpen,
  Check,
  LinkIcon,
  Sparkles,
  Zap,
  ChevronRight,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useProvider } from "../../../providers/AuthProviders";

type Resource = { id: string; type: string; title: string; url: string | null };
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
type LearningSection = {
  id: string;
  title: string;
  level: string;
  content: string;
  resources: Resource[];
  tasks: Task[];
};
export type Roadmap = {
  id: string;
  userId: string;
  title: string;
  description: string;
  levelFrom: string;
  levelTo: string;
  purpose: string;
  isPublished: boolean;
  learningSections: LearningSection[];
};

const getLevelNumber = (level: string) => Number(level.match(/\d+/)?.[0] ?? 0);

export default function RoadmapPage() {
  const { user } = useProvider();
  const router = useRouter();
  const [id, setId] = useState<string | null>(null);
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [creatingSectionId, setCreatingSectionId] = useState<string | null>(
    null,
  );
  const [isPublishing, setIsPublishing] = useState(false);
  const [isPublished, setIsPublished] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const sp = new URLSearchParams(window.location.search);
    setId(sp.get("id"));
  }, []);

  useEffect(() => {
    if (!id) return;
    const fetchRoadmap = async () => {
      try {
        const res = await fetch(`/api/getroadmapinfo/${id}`);
        if (!res.ok) throw new Error("Failed to fetch roadmap");
        const data = await res.json();
        const sortedData = {
          ...data,
          learningSections: [...data.learningSections].sort(
            (a: LearningSection, b: LearningSection) =>
              getLevelNumber(a.level) - getLevelNumber(b.level),
          ),
        };
        setRoadmap(sortedData);
        setIsPublished(data.isPublished ?? false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchRoadmap();
  }, [id]);

  const toggleTaskCompletion = async (taskId: string) => {
    if (!roadmap) return;
    setRoadmap((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        learningSections: prev.learningSections.map((section) => ({
          ...section,
          tasks: section.tasks.map((task) =>
            task.id === taskId ? { ...task, completed: !task.completed } : task,
          ),
        })),
      };
    });
    await fetch("/api/toggle-task", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ taskId }),
    });
  };

  const handlePublish = async () => {
    if (!roadmap?.id || isPublishing) return;
    setIsPublishing(true);
    try {
      const res = await fetch(`/api/publish-roadmap/${roadmap.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPublished: !isPublished }),
      });
      const data = await res.json();
      setIsPublished(data.isPublished);
    } catch (err) {
      console.error(err);
    } finally {
      setIsPublishing(false);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen ">
        <div className="w-10 h-10 border-2 border-teal-500/20 border-t-teal-500 rounded-full animate-spin" />
      </div>
    );

  if (error || !roadmap)
    return (
      <div className="flex items-center justify-center min-h-screen text-white mono uppercase text-[10px] tracking-widest">
        {error || "Roadmap not found"}
      </div>
    );

  return (
    <div className="flex min-h-screen  text-white antialiased">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Unbounded:wght@400;700;900&display=swap');
        .mono { font-family: 'Space Mono', monospace; }
        .unb { font-family: 'Unbounded', sans-serif; }
        .grain-bg {
          position: fixed; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
          pointer-events: none; z-index: 0;
        }
        .section-card {
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid rgba(255, 255, 255, 0.04);
          backdrop-filter: blur(12px);
          transition: all 0.4s ease;
        }
        .section-card[data-state='open'] {
          background: rgba(0, 255, 200, 0.02);
          border-color: rgba(0, 255, 200, 0.1);
        }
        .accent-stroke { -webkit-text-stroke: 1px rgba(0, 255, 200, 0.1); color: transparent; }
      `}</style>

      <div className="grain-bg" />
      <aside className="fixed inset-y-0 z-50 w-[210px]">
        <Sidebar />
      </aside>

      <main className="flex-1 ml-[210px] p-10 relative z-10 flex flex-col items-center overflow-y-auto">
        <div className="w-full max-w-4xl">
          <header className="mb-20 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <div className="w-2 h-2 rounded-full bg-teal-400 shadow-[0_0_10px_#2dd4bf]" />
              <span className="mono text-[10px] font-bold tracking-[0.4em] uppercase text-teal-400/60">
                Lvl {roadmap.levelFrom} → {roadmap.levelTo}
              </span>
            </motion.div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
              <div className="space-y-4">
                <h1 className="unb text-5xl md:text-6xl font-black tracking-tighter uppercase italic leading-[0.95]">
                  {roadmap.title}
                  <span className="accent-stroke">.</span>
                </h1>
                <p className="mono text-white/30 text-xs max-w-xl leading-relaxed uppercase tracking-wider">
                  {roadmap.description}
                </p>
              </div>

              {roadmap?.userId === user?.id && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handlePublish}
                  disabled={isPublishing}
                  className="unb text-[10px] font-bold px-8 py-4 bg-teal-500 text-black rounded-2xl hover:bg-teal-400 transition-all uppercase tracking-widest"
                >
                  {isPublishing
                    ? "Syncing..."
                    : isPublished
                      ? "Unpublish Path"
                      : "Publish to Feed"}
                </motion.button>
              )}
            </div>
            <div className="h-px w-full bg-gradient-to-r from-teal-500/20 via-white/5 to-transparent mt-12" />
          </header>

          <Accordion type="single" collapsible className="space-y-4 mb-20">
            {roadmap.learningSections.map((section, index) => (
              <AccordionItem
                key={section.id}
                value={section.id}
                className="section-card border-none rounded-[2rem] px-8 overflow-hidden"
              >
                <AccordionTrigger className="py-8 hover:no-underline group">
                  <div className="flex gap-8 items-center text-left">
                    <span className="unb text-4xl font-black text-white/5 group-hover:text-teal-400/20 transition-colors">
                      {(index + 1).toString().padStart(2, "0")}
                    </span>
                    <div>
                      <div className="mono text-[9px] text-teal-400/50 font-bold uppercase tracking-[0.2em] mb-1">
                        {section.level || "Module"}
                      </div>
                      <div className="unb text-lg font-bold group-hover:text-teal-400 transition-colors">
                        {section.title}
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="pb-10 pt-2 border-t border-white/5">
                  <div className="grid md:grid-cols-2 gap-12 mt-8">
                    <div className="space-y-8">
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 mono text-[10px] text-white/20 uppercase tracking-widest">
                          <Globe size={14} className="text-teal-500/50" />
                          <span>Overview</span>
                        </div>
                        <p className="mono text-[11px] text-white/50 leading-relaxed uppercase">
                          {section.content}
                        </p>
                      </div>

                      {section.resources.length > 0 && (
                        <div className="space-y-4">
                          <h4 className="mono text-[10px] text-teal-400/60 font-bold uppercase tracking-widest flex items-center gap-2">
                            <BookOpen size={14} /> Documentation
                          </h4>
                          <div className="grid gap-2">
                            {section.resources.map((res) => (
                              <a
                                key={res.id}
                                href={res.url || "#"}
                                target="_blank"
                                className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-teal-500/30 transition-all group/link"
                              >
                                <LinkIcon
                                  size={12}
                                  className="text-white/20 group-hover/link:text-teal-400"
                                />
                                <span className="mono text-[10px] text-white/40 group-hover/link:text-white uppercase tracking-wider truncate">
                                  {res.title}
                                </span>
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="space-y-6">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="mono text-[10px] text-teal-400/60 font-bold uppercase tracking-widest flex items-center gap-2">
                          <Zap size={14} /> Action Items
                        </h4>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          disabled={creatingSectionId === section.id}
                          onClick={() => {
                            router.push(
                              `/create-test?title=${section.title}&id=${section.id}`,
                            );
                          }}
                        >
                          Generate AI Test
                        </motion.button>
                      </div>

                      <div className="space-y-3">
                        {section.tasks.length === 0 ? (
                          <div className="p-8 rounded-[1.5rem] border border-dashed border-white/5 bg-white/[0.01] text-center">
                            <p className="mono text-[9px] text-white/10 uppercase tracking-[0.2em]">
                              No milestones yet
                            </p>
                          </div>
                        ) : (
                          section.tasks.map((task) => (
                            <div
                              key={task.id}
                              className="flex gap-4 items-center p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all group/task"
                            >
                              <button
                                onClick={() => toggleTaskCompletion(task.id)}
                                className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all ${
                                  task.completed
                                    ? "bg-teal-500 border-teal-500 shadow-[0_0_10px_#2dd4bf]"
                                    : "border-white/10 hover:border-teal-500/50"
                                }`}
                              >
                                {task.completed && (
                                  <Check className="w-3 h-3 text-black stroke-[4px]" />
                                )}
                              </button>

                              <p
                                onClick={() =>
                                  router.push(`/user/test/${task.id}`)
                                }
                                className={`flex-1 mono text-[10px] uppercase tracking-wider cursor-pointer transition-all ${
                                  task.completed
                                    ? "text-white/20 line-through"
                                    : "text-white/60 group-hover/task:text-white"
                                }`}
                              >
                                {task.title}
                              </p>
                              <ChevronRight
                                size={14}
                                className="text-white/10 group-hover/task:text-teal-400 group-hover/task:translate-x-1 transition-all"
                              />
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </main>
    </div>
  );
}

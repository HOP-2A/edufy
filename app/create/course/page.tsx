"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Sidebar from "../../_components/SideBar";
import Footer from "@/app/_components/Footer";
import { BookOpen, Check, LinkIcon, Zap, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

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

const getLevelNumber = (level: string) => {
  return Number(level.match(/\d+/)?.[0] ?? 0);
};

export default function RoadmapPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [creatingSectionId, setCreatingSectionId] = useState<string | null>(
    null,
  );

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
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmap();
  }, [id]);

  const MakeActionItem = async (section: LearningSection) => {
    try {
      setCreatingSectionId(section.id);
      const res = await fetch("/api/create-task-course", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: section.title,
          content: section.title,
          learningSectionId: section.id,
        }),
      });

      if (!res.ok) throw new Error("Failed to create task");
      const newTask = await res.json();
      router.push(`/user/test/${newTask?.[0]?.id}`);
    } catch (err) {
      console.error(err);
      alert("Failed to create task, try again");
    } finally {
      setCreatingSectionId(null);
    }
  };

  if (loading) {
    return (
      <div
        className="flex min-h-screen text-white antialiased "
        style={{ fontFamily: "'Space Mono', monospace" }}
      >
        <main className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-[1.5px] border-[rgba(0,255,200,0.1)] border-t-[rgba(0,255,200,0.8)] rounded-full animate-spin" />
            <span className="mono text-[9px] font-bold tracking-[0.3em] uppercase text-[rgba(0,255,200,0.3)]">
              Analyzing Path
            </span>
          </div>
        </main>
      </div>
    );
  }

  if (error || !roadmap) {
    return (
      <div className="flex items-center justify-center h-screen text-[rgba(0,255,200,0.5)] mono text-xs">
        {error || "Roadmap not found"}
      </div>
    );
  }

  return (
    <div
      className="flex min-h-screen text-white antialiased "
      style={{ fontFamily: "'Space Mono', monospace" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@400;700;900&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');
        .unb { font-family: 'Unbounded', sans-serif; }
        .mono { font-family: 'Space Mono', monospace; }

        .roadmap-header {
          border-bottom: 1px solid rgba(0,255,200,0.06);
          background: linear-gradient(to bottom, rgba(0,255,200,0.02), transparent);
        }

        .section-item {
          background: rgba(0,255,200,0.02);
          border: 1px solid rgba(0,255,200,0.08) !important;
          border-radius: 20px !important;
          transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
          margin-bottom: 16px;
          overflow: hidden;
        }
        .section-item:hover {
          border-color: rgba(0,255,200,0.2) !important;
          background: rgba(0,255,200,0.04);
        }

        .action-btn {
          background: rgba(0,255,200,0.08);
          border: 1px solid rgba(0,255,200,0.2);
          color: rgba(0,255,200,0.9);
          font-family: 'Unbounded', sans-serif;
          font-size: 9px; font-weight: 700;
          letter-spacing: 0.05em; text-transform: uppercase;
          padding: 10px 20px; border-radius: 10px;
          cursor: pointer; transition: all 0.2s;
        }
        .action-btn:hover:not(:disabled) {
          background: rgba(0,255,200,0.15);
          border-color: rgba(0,255,200,0.4);
          box-shadow: 0 0 20px rgba(0,255,200,0.1);
        }

        .resource-link {
          display: flex; align-items: center; gap: 8px;
          padding: 10px 14px; border-radius: 10px;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.05);
          font-size: 11px; color: rgba(255,255,255,0.4);
          transition: all 0.2s;
        }
        .resource-link:hover {
          background: rgba(0,255,200,0.05);
          color: rgba(0,255,200,0.8);
          border-color: rgba(0,255,200,0.2);
        }
      `}</style>

      <aside style={{ width: 210 }}>
        <Sidebar />
      </aside>

      <main className="flex-1 flex flex-col" style={{ marginLeft: 210 }}>
        <div className="max-w-4xl mx-auto w-full px-10 py-16">
          <header className="roadmap-header mb-16 pb-12">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div
                  style={{
                    width: 24,
                    height: 1,
                    background: "rgba(0,255,200,0.4)",
                  }}
                />
                <span className="mono text-[10px] font-bold uppercase tracking-[0.4em] text-[rgba(0,255,200,0.5)]">
                  Route: {roadmap.levelFrom} — {roadmap.levelTo}
                </span>
              </div>
              <h1 className="unb text-5xl lg:text-6xl font-black tracking-tighter leading-tight">
                {roadmap.title}
                <span className="text-[rgba(0,255,200,0.4)]">.</span>
              </h1>
              <p className="mono text-sm leading-relaxed text-white/30 max-w-2xl">
                {roadmap.description}
              </p>
            </div>
          </header>

          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-8 opacity-40">
              <Sparkles size={14} className="text-[rgba(0,255,200,1)]" />
              <span className="mono text-[9px] uppercase font-bold tracking-[0.2em]">
                Learning Path Structure
              </span>
            </div>

            <Accordion
              type="single"
              collapsible
              className="space-y-4 border-none"
            >
              {roadmap.learningSections.map((section, index) => (
                <AccordionItem
                  key={section.id}
                  value={section.id}
                  className="section-item"
                >
                  <div className="flex items-center justify-between w-full px-6 py-2">
                    <AccordionTrigger className="hover:no-underline py-6">
                      <div className="flex gap-6 items-center text-left">
                        <span className="unb text-2xl font-black text-white/5 group-hover:text-[rgba(0,255,200,0.2)] transition-colors">
                          {(index + 1).toString().padStart(2, "0")}
                        </span>
                        <div>
                          <div className="mono text-[8px] font-black uppercase text-[rgba(0,255,200,0.5)] mb-1">
                            Phase {section.level}
                          </div>
                          <div className="unb text-sm font-bold tracking-tight">
                            {section.title}
                          </div>
                        </div>
                      </div>
                    </AccordionTrigger>

                    <button
                      className="action-btn relative z-10"
                      disabled={creatingSectionId === section.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        MakeActionItem(section);
                      }}
                    >
                      {creatingSectionId === section.id ? (
                        <span className="flex items-center gap-2">
                          <div className="w-2 h-2 border border-white/20 border-t-white rounded-full animate-spin" />
                          Syncing...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Zap size={10} fill="currentColor" /> Initialize Task
                        </span>
                      )}
                    </button>
                  </div>

                  <AccordionContent className="px-6 pb-8 border-t border-white/[0.03] pt-6 bg-black/20">
                    <div className="max-w-2xl space-y-8">
                      <div className="space-y-3">
                        <span className="mono text-[8px] uppercase font-black text-white/20 tracking-widest">
                          Objective
                        </span>
                        <p className="mono text-[11px] leading-relaxed text-white/40">
                          {section.content}
                        </p>
                      </div>

                      {section.resources.length > 0 && (
                        <div className="space-y-4">
                          <h4 className="mono text-[8px] uppercase font-black text-white/20 tracking-widest flex items-center gap-2">
                            <BookOpen className="w-3 h-3 text-[rgba(0,255,200,0.5)]" />
                            Knowledge Base
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {section.resources.map((res) => (
                              <a
                                key={res.id}
                                href={res.url || "#"}
                                target="_blank"
                                className="resource-link"
                              >
                                <LinkIcon className="w-3 h-3" />
                                <span className="truncate">{res.title}</span>
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>

        <footer className="mt-auto px-10 py-10 border-t border-white/[0.03]">
          <div className="opacity-20 hover:opacity-100 transition-opacity">
            <Footer />
          </div>
        </footer>
      </main>
    </div>
  );
}

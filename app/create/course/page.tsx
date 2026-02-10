"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Sidebar from "../../_components/SideBar";
import {
  ArrowRight,
  Badge,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronRight,
  Circle,
  ExternalLink,
  FileText,
  HelpCircle,
  Layers,
  LinkIcon,
  Trophy,
} from "lucide-react";

// Type definitions
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

interface LearningSection {
  id: string;
  title: string;
  level: string;
  content: string;
  resources: Resource[];
  tasks: Task[];
}

interface Roadmap {
  id: string;
  title: string;
  description: string;
  levelFrom: string;
  levelTo: string;
  purpose: string;
  learningSections: LearningSection[];
}

const getLevelNumber = (level: string) => {
  return Number(level.match(/\d+/)?.[0] ?? 0);
};

export default function RoadmapPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    // Fetch function
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
        console.error("Error:", err);
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmap();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-2xl text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (!roadmap) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-2xl">Roadmap not found</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-white text-slate-900 font-sans antialiased">
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-8 py-24">
          {/* Header */}
          <header className="mb-20 pl-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[1px] bg-slate-200" />
              <span className="font-mono text-[10px] tracking-[0.3em] text-slate-400 uppercase">
                {roadmap?.levelFrom} — {roadmap?.levelTo}
              </span>
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-black mb-6">
              {roadmap?.title}
            </h1>

            <p className="text-lg text-slate-500 leading-relaxed max-w-xl font-light">
              {roadmap?.description}
            </p>
          </header>

          {/* SINGLE ACCORDION CONTROLLER */}
          <Accordion type="single" collapsible className="space-y-6">
            {roadmap?.learningSections.map((section, index) => {
              const hasTasks = section.tasks && section.tasks.length > 0;

              return (
                <div key={section.id} className="relative group">
                  {/* Vertical timeline line */}
                  {index !== roadmap.learningSections.length - 1 && (
                    <div className="absolute left-[23px] top-[48px] bottom-[-50px] w-[1px] bg-slate-200 z-0" />
                  )}

                  <div className="flex gap-8 relative z-10">
                    {/* Square node */}
                    <div className="pt-6">
                      <div className="w-[48px] h-[48px] border border-slate-300 bg-white flex items-center justify-center transition-all data-[state=open]:border-slate-900">
                        <span className="font-mono text-xs text-slate-400 data-[state=open]:text-slate-900">
                          {(index + 1).toString().padStart(2, "0")}
                        </span>
                      </div>
                    </div>

                    {/* Section container */}
                    <div className="flex-1 border border-slate-400 bg-white p-1 rounded-2xl transition-all data-[state=open]:border-slate-300">
                      <AccordionItem value={section.id} className="border-none">
                        <AccordionTrigger className="hover:no-underline p-6 group/trigger">
                          <div className="flex flex-col items-start text-left">
                            <span className="font-mono text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                              Section {index + 1}
                            </span>
                            <span className="text-xl font-semibold text-slate-900 group-hover/trigger:text-blue-600 transition-colors">
                              {section.title}
                            </span>
                          </div>
                        </AccordionTrigger>

                        <AccordionContent className="px-6 pb-12 pt-2 border-t border-slate-50">
                          <div className="space-y-12">
                            <p className="text-base text-slate-600 leading-relaxed max-w-2xl font-light">
                              {section.content}
                            </p>

                            <div className="h-[2px] w-124 -mt-1 bg-slate-200" />

                            <div
                              className={`grid grid-cols-1 ${
                                hasTasks ? "lg:grid-cols-2" : ""
                              } gap-12`}
                            >
                              {/* Resources */}
                              <div className="space-y-6">
                                <h4 className="font-mono text-[10px] uppercase tracking-widest text-slate-400">
                                  Resources
                                </h4>

                                <div className="space-y-2">
                                  {section.resources.map((res) => (
                                    <a
                                      key={res.id}
                                      href={res.url || "#"}
                                      className="flex items-center gap-3 py-1 text-sm text-slate-500 hover:text-blue-600 transition-colors group/link"
                                    >
                                      <LinkIcon className="w-3 h-3 opacity-30 group-hover/link:opacity-100" />
                                      <span className="border-b border-transparent group-hover/link:border-blue-100">
                                        {res.title}
                                      </span>
                                    </a>
                                  ))}
                                </div>
                              </div>

                              {/* Objectives */}
                              {hasTasks && (
                                <div className="space-y-6">
                                  <h4 className="font-mono text-[10px] uppercase tracking-widest text-slate-400">
                                    Objectives
                                  </h4>

                                  <div className="space-y-4">
                                    {section.tasks.map((task) => (
                                      <div
                                        key={task.id}
                                        className="flex gap-4 items-start"
                                      >
                                        <div
                                          className={`mt-1 w-4 h-4 border flex-shrink-0 flex items-center justify-center transition-all ${
                                            task.completed
                                              ? "bg-slate-900 border-slate-900"
                                              : "border-slate-200"
                                          }`}
                                        >
                                          {task.completed && (
                                            <Check className="w-3 h-3 text-white stroke-[3px]" />
                                          )}
                                        </div>

                                        <p
                                          className={`text-xs font-bold leading-tight ${
                                            task.completed
                                              ? "text-slate-400 line-through"
                                              : "text-slate-800"
                                          }`}
                                        >
                                          {task.title}
                                        </p>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </div>
                  </div>
                </div>
              );
            })}
          </Accordion>
        </div>
      </main>
    </div>
  );
}

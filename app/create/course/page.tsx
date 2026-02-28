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
  BookOpen,
  Check,
  ChevronRight,
  LinkIcon,
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
    <div className="flex min-h-screen bg-[#F8FAFC] text-slate-900 font-sans">
      <Sidebar />

      <main className="flex-1 overflow-y-auto bg-white">
        <div className="max-w-4xl mx-auto px-8 py-20">
          {/* Header Section */}
          <header className="mb-16 pb-12 border-b-2 border-slate-100">
            <div className="flex items-center gap-3 text-blue-600 font-bold text-xs uppercase tracking-widest mb-6">
              <span className="bg-blue-50 px-3 py-1 rounded-full">
                Roadmap Path
              </span>
              <ArrowRight className="w-3 h-3" />
              <span className="text-slate-500">
                Level {roadmap?.levelFrom} — {roadmap?.levelTo}
              </span>
            </div>
            <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 mb-6">
              {roadmap?.title}
            </h1>
            <p className="text-xl text-slate-500 leading-relaxed max-w-2xl">
              {roadmap?.description}
            </p>
          </header>

          {/* Curriculum List */}
          <div className="space-y-6">
            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-slate-400 mb-10">
              Learning Modules
            </h2>

            <Accordion type="single" collapsible className="space-y-6">
              {roadmap?.learningSections.map((section, index) => (
                <AccordionItem
                  key={section.id}
                  value={section.id}
                  className="border-2 border-slate-200 rounded-2xl overflow-hidden px-2 transition-all data-[state=open]:border-blue-600 data-[state=open]:shadow-xl data-[state=open]:shadow-blue-500/10"
                >
                  <AccordionTrigger className="hover:no-underline py-8 px-6 group">
                    <div className="flex items-center gap-8 text-left">
                      <span className="text-4xl font-black text-slate-100 group-data-[state=open]:text-blue-100 transition-colors">
                        {(index + 1).toString().padStart(2, "0")}
                      </span>
                      <div>
                        <span className="block text-xs font-bold text-blue-600 uppercase mb-1">
                          {section.level}
                        </span>
                        <span className="text-2xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                          {section.title}
                        </span>
                      </div>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent className="pb-10 pt-2 px-6 border-t-2 border-slate-50">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                      {/* Left Side: Content & Resources */}
                      <div className="lg:col-span-7 space-y-8">
                        <p className="text-lg text-slate-600 leading-relaxed">
                          {section.content}
                        </p>

                        {section.resources.length > 0 && (
                          <div className="bg-slate-50 p-6 rounded-xl border-2 border-slate-100">
                            <h4 className="text-sm font-bold uppercase tracking-widest text-slate-900 mb-4 flex items-center gap-2">
                              <BookOpen className="w-4 h-4 text-blue-600" />{" "}
                              Essential Resources
                            </h4>
                            <div className="grid gap-3">
                              {section.resources.map((res) => (
                                <a
                                  key={res.id}
                                  href={res.url || "#"}
                                  className="flex items-center justify-between p-3 bg-white rounded-lg border-2 border-slate-200 hover:border-blue-400 hover:shadow-sm transition-all group/res"
                                >
                                  <div className="flex items-center gap-3">
                                    <LinkIcon className="w-4 h-4 text-slate-400 group-hover/res:text-blue-600" />
                                    <span className="font-semibold text-slate-700">
                                      {res.title}
                                    </span>
                                  </div>
                                  <ChevronRight className="w-4 h-4 text-slate-300" />
                                </a>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Right Side: Tasks */}
                      <div className="lg:col-span-5">
                        <h4 className="text-sm font-bold uppercase tracking-widest text-slate-900 mb-4 flex items-center gap-2">
                          <Check className="w-4 h-4 text-blue-600" /> Action
                          Items
                        </h4>
                        <div className="space-y-3">
                          {section.tasks.map((task) => (
                            <div
                              key={task.id}
                              className={`p-4 rounded-xl border-2 transition-all ${
                                task.completed
                                  ? "bg-blue-50 border-blue-100 shadow-inner"
                                  : "bg-white border-slate-200"
                              }`}
                            >
                              <div className="flex items-start gap-3">
                                <div
                                  className={`mt-0.5 p-1 rounded-md ${task.completed ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-400"}`}
                                >
                                  <Check className="w-3 h-3" />
                                </div>
                                <div>
                                  <p
                                    className={`font-bold text-sm ${task.completed ? "text-blue-900 line-through opacity-60" : "text-slate-800"}`}
                                  >
                                    {task.title}
                                  </p>
                                  {!task.completed && (
                                    <p className="text-xs text-slate-500 mt-1">
                                      {task.content}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </main>
    </div>
  );
}

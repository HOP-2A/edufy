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
import {
  ArrowRight,
  BookOpen,
  Check,
  ChevronRight,
  LinkIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

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

type Roadmap = {
  id: string;
  title: string;
  description: string;
  levelFrom: string;
  levelTo: string;
  purpose: string;
  learningSections: LearningSection[];
};

const getLevelNumber = (level: string) => {
  return Number(level.match(/\d+/)?.[0] ?? 0);
};

export default function RoadmapPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [creatingSectionId, setCreatingSectionId] = useState<string | null>(
    null,
  );

  const [temp, setTemp] = useState<string | null>(null);

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
      setTemp(newTask);

      console.log("TEMP:", temp);
      router.push(`/user/test/${newTask?.[0]?.id}`);
    } catch (err) {
      console.error(err);
      alert("Failed to create task, try again");
    } finally {
      setCreatingSectionId(null);
    }
  };

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
      body: JSON.stringify({ taskId }),
    });
  };

  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

      <main className="flex-1 overflow-y-auto bg-white">
        <div className="max-w-4xl mx-auto px-8 py-20">
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

            <h1 className="text-4xl font-bold tracking-tight text-black mb-6">
              {roadmap?.title}
            </h1>

            <p className="text-lg text-slate-500 leading-relaxed max-w-xl font-light">
              {roadmap?.description}
            </p>
          </header>

          <div className="space-y-6">
            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-slate-400 mb-10">
              Learning Modules
            </h2>

            <Accordion type="single" collapsible className="space-y-6">
              {roadmap.learningSections.map((section, index) => {
                return (
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

                    <AccordionContent className="pb-10 pt-6 px-6 border-t-2 border-slate-50">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* LEFT SIDE */}
                        <div className="space-y-8">
                          <p className="text-lg text-slate-600 leading-relaxed">
                            {section.content}
                          </p>

                          {section.resources.length > 0 && (
                            <div className="space-y-3">
                              <h4 className="text-sm font-bold uppercase tracking-widest text-slate-900 flex items-center gap-2">
                                <BookOpen className="w-4 h-4 text-blue-600" />
                                Resources
                              </h4>

                              {section.resources.map((res) => (
                                <a
                                  key={res.id}
                                  href={res.url || "#"}
                                  target="_blank"
                                  className="flex items-center gap-3 text-sm text-slate-600 hover:text-blue-600 transition-colors"
                                >
                                  <LinkIcon className="w-4 h-4" />
                                  {res.title}
                                </a>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="space-y-6">
                          <h4 className="text-sm font-bold uppercase tracking-widest text-slate-900 flex items-center gap-2">
                            <Check className="w-4 h-4 text-blue-600" />
                            Action Items
                            <Button
                              size="sm"
                              disabled={creatingSectionId === section.id}
                              onClick={() => MakeActionItem(section)}
                            >
                              {creatingSectionId === section.id ? (
                                <span className="animate-pulse">
                                  Creating...
                                </span>
                              ) : (
                                "Create"
                              )}
                            </Button>
                          </h4>

                          {section.tasks.length === 0 ? (
                            <p className="text-sm text-slate-400 italic">
                              No action items yet…
                            </p>
                          ) : (
                            section.tasks.map((task) => (
                              <div
                                key={task.id}
                                className="flex gap-4 items-start"
                              >
                                <div
                                  onClick={() => toggleTaskCompletion(task.id)}
                                  className={`mt-1 w-4 h-4 border flex items-center justify-center cursor-pointer transition-all ${
                                    task.completed
                                      ? "bg-slate-900 border-slate-900"
                                      : "border-slate-300 hover:border-slate-500"
                                  }`}
                                >
                                  {task.completed && (
                                    <Check className="w-3 h-3 text-white stroke-[3px]" />
                                  )}
                                </div>

                                <p
                                  className={`text-sm cursor-pointer transition-colors duration-150 ${
                                    task.completed
                                      ? "text-slate-400 line-through hover:text-slate-500"
                                      : "text-slate-800 hover:text-blue-600 hover:underline"
                                  }`}
                                  onClick={() =>
                                    router.push(`/user/test/${task.id}`)
                                  }
                                >
                                  {task.title}
                                </p>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
        </div>
      </main>
    </div>
  );
}

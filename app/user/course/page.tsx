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
import { BookOpen, Check, LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useProvider } from "../../../providers/AuthProviders";

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
  const { user } = useProvider();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [creatingSectionId, setCreatingSectionId] = useState<string | null>(
    null,
  );
  const [isPublishing, setIsPublishing] = useState(false);
  const [isPublished, setIsPublished] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchRoadmap = async () => {
      try {
        const res = await fetch(`/api/getroadmapinfo/${id}`);
        if (!res.ok) throw new Error("Failed to fetch roadmap");

        const data = await res.json();
        console.log(data);
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
      console.log(res, "asdaasd");
      if (!res.ok) throw new Error("Failed to update publish status");

      const data = await res.json();
      setIsPublished(data.isPublished);
    } catch (err) {
      console.error(err);
    } finally {
      setIsPublishing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  if (error || !roadmap) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        {error || "Roadmap not found"}
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-white text-slate-900 font-sans">
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-8 py-20">
          <header className="mb-16 pb-12 border-b border-slate-200">
            <div className="flex justify-between items-center mb-6">
              <div>
                <span className="text-sm uppercase tracking-widest text-blue-600 font-bold">
                  Level {roadmap.levelFrom} — {roadmap.levelTo}
                </span>

                <h1 className="text-5xl font-black mt-4">{roadmap.title}</h1>

                <p className="text-lg text-slate-500 mt-4 max-w-2xl">
                  {roadmap.description}
                </p>
              </div>

              {roadmap?.userId === user?.id && (
                <Button
                  onClick={handlePublish}
                  disabled={isPublishing}
                  className="px-6 py-3 font-bold"
                >
                  {isPublishing
                    ? "Updating..."
                    : isPublished
                      ? "Unpublish"
                      : "Publish"}
                </Button>
              )}
            </div>
          </header>

          <Accordion type="single" collapsible className="space-y-6">
            {roadmap.learningSections.map((section, index) => (
              <AccordionItem
                key={section.id}
                value={section.id}
                className="border rounded-2xl px-4"
              >
                <AccordionTrigger className="py-6">
                  <div className="flex gap-6 items-center text-left">
                    <span className="text-3xl font-black text-slate-300">
                      {(index + 1).toString().padStart(2, "0")}
                    </span>
                    <div>
                      <div className="text-xs text-blue-600 font-bold uppercase">
                        {section.level}
                      </div>
                      <div className="text-xl font-bold">{section.title}</div>
                    </div>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="pb-8 pt-4">
                  <div className="grid md:grid-cols-2 gap-10">
                    <div className="space-y-6">
                      <p className="text-slate-600 leading-relaxed">
                        {section.content}
                      </p>

                      {section.resources.length > 0 && (
                        <div>
                          <h4 className="text-sm font-bold mb-3 flex items-center gap-2">
                            <BookOpen className="w-4 h-4 text-blue-600" />
                            Resources
                          </h4>

                          {section.resources.map((res) => (
                            <a
                              key={res.id}
                              href={res.url || "#"}
                              target="_blank"
                              className="flex items-center gap-2 text-sm text-slate-600 hover:text-blue-600"
                            >
                              <LinkIcon className="w-4 h-4" />
                              {res.title}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="text-sm font-bold flex items-center gap-2">
                          <Check className="w-4 h-4 text-blue-600" />
                          Action Items
                        </h4>

                        <Button
                          size="sm"
                          disabled={creatingSectionId === section.id}
                          onClick={() => MakeActionItem(section)}
                        >
                          {creatingSectionId === section.id
                            ? "Creating..."
                            : "Create"}
                        </Button>
                      </div>

                      {section.tasks.length === 0 ? (
                        <p className="text-sm text-slate-400 italic">
                          No action items yet…
                        </p>
                      ) : (
                        section.tasks.map((task) => (
                          <div key={task.id} className="flex gap-3 items-start">
                            <div
                              onClick={() => toggleTaskCompletion(task.id)}
                              className={`mt-1 w-4 h-4 border flex items-center justify-center cursor-pointer ${
                                task.completed
                                  ? "bg-black border-black"
                                  : "border-slate-300"
                              }`}
                            >
                              {task.completed && (
                                <Check className="w-3 h-3 text-white" />
                              )}
                            </div>

                            <p
                              onClick={() =>
                                router.push(`/user/test/${task.id}`)
                              }
                              className={`text-sm cursor-pointer ${
                                task.completed
                                  ? "line-through text-slate-400"
                                  : "hover:text-blue-600"
                              }`}
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
            ))}
          </Accordion>
        </div>
      </main>
    </div>
  );
}

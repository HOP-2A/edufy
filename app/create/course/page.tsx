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
        setRoadmap(data);
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
    <div className="relative h-screen">
      <Sidebar />
      <div className="absolute inset-0 flex justify-center items-start pointer-events-none overflow-auto">
        <div className="w-full max-w-7xl mx-auto pointer-events-auto px-8 py-16">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold mb-4">{roadmap.title}</h1>
            <p className="text-xl text-gray-400 mb-2">{roadmap.description}</p>
            <p className="text-lg">
              Level: {roadmap.levelFrom} → {roadmap.levelTo}
            </p>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-center">
            Here&lsquo;s what you will learn
          </h2>

          <Accordion type="single" collapsible className="space-y-4">
            {roadmap.learningSections.map((section) => (
              <AccordionItem
                key={section.id}
                value={section.id}
                className="border-2 rounded-lg px-6 bg-gray-900/50"
              >
                <AccordionTrigger className="text-2xl font-bold hover:no-underline">
                  <div className="flex items-center gap-4">
                    <span>{section.title}</span>
                    <span className="text-sm px-3 py-1 bg-blue-600 rounded-full">
                      {section.level}
                    </span>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="pt-4 space-y-4">
                  <div className="text-lg mb-6 p-4 bg-gray-800/30 rounded">
                    {section.content}
                  </div>

                  {section.resources.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-xl font-semibold mb-3">
                        📚 Resources
                      </h4>
                      <ul className="space-y-2">
                        {section.resources.map((resource) => (
                          <li
                            key={resource.id}
                            className="flex items-center gap-2"
                          >
                            <span className="text-sm px-2 py-1 bg-purple-600/30 rounded">
                              {resource.type}
                            </span>
                            {resource.url ? (
                              <a
                                href={resource.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline text-blue-400"
                              >
                                {resource.title}
                              </a>
                            ) : (
                              <span>{resource.title}</span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {section.tasks.length > 0 && (
                    <div>
                      <h4 className="text-xl font-semibold mb-3">✓ Tasks</h4>
                      <Accordion
                        type="single"
                        collapsible
                        className="space-y-2"
                      >
                        {section.tasks.map((task) => (
                          <AccordionItem
                            key={task.id}
                            value={task.id}
                            className="border rounded px-4 bg-gray-800/20"
                          >
                            <AccordionTrigger className="text-lg hover:no-underline">
                              <div className="flex items-center gap-3">
                                <span
                                  className={
                                    task.completed
                                      ? "line-through text-gray-500"
                                      : ""
                                  }
                                >
                                  {task.title}
                                </span>
                                {task.completed && (
                                  <span className="text-green-500">✓</span>
                                )}
                              </div>
                            </AccordionTrigger>

                            <AccordionContent className="pt-3 space-y-3">
                              <p className="text-gray-300">{task.content}</p>

                              {task.resources.length > 0 && (
                                <div>
                                  <h5 className="font-semibold mb-2">
                                    Resources:
                                  </h5>
                                  <ul className="space-y-1 ml-4">
                                    {task.resources.map((resource) => (
                                      <li key={resource.id}>
                                        {resource.url ? (
                                          <a
                                            href={resource.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:underline text-blue-400"
                                          >
                                            {resource.title}
                                          </a>
                                        ) : (
                                          <span>{resource.title}</span>
                                        )}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {task.taskQuestions.length > 0 && (
                                <div>
                                  <h5 className="font-semibold mb-2">
                                    Questions:
                                  </h5>
                                  <ul className="space-y-2 ml-4">
                                    {task.taskQuestions.map((question, idx) => (
                                      <li key={question.id} className="text-sm">
                                        <span className="font-medium">
                                          {idx + 1}. {question.text}
                                        </span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}

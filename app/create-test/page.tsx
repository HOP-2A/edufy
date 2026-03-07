"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Sidebar from "../_components/SideBar";
import Footer from "@/app/_components/Footer";
import { BookOpen, Check, LinkIcon, Zap, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
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

export default function RoadmapPage() {
  const router = useRouter();
  const params = useSearchParams();

  const title = params.get("title");
  const id = params.get("id");

  const [input, setInput] = useState("");

  const MakeActionItem = async () => {
    try {
      const res = await fetch("/api/create-task-course", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          content: title,
          learningSectionId: id,
          input,
        }),
      });

      if (!res.ok) throw new Error("Failed to create task");
      const newTask = await res.json();
      router.push(`/user/test/${newTask?.[0]?.id}`);
    } catch (err) {
      console.error(err);
      alert("Failed to create task, try again");
    }
  };

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
            <div className="flex items-center gap-3">
              <div
                style={{
                  width: 24,
                  height: 1,
                  background: "rgba(0,255,200,0.4)",
                }}
              />
            </div>
          </header>

          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-8 opacity-40">
              <Sparkles size={14} className="text-[rgba(0,255,200,1)]" />
              <span className="mono text-[9px] uppercase font-bold tracking-[0.2em]">
                Learning Path Structure
              </span>
            </div>

            <div className="max-w-2xl space-y-8">
              <div className="space-y-3">
                <span className="mono text-[8px] uppercase font-black text-white/20 tracking-widest">
                  Objective
                </span>
                <Input onChange={(e) => setInput(e.target.value)} />
                <Button onClick={() => MakeActionItem()}>create</Button>
              </div>
            </div>
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

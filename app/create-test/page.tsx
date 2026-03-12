"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Sidebar from "../_components/SideBar";
import Footer from "@/app/_components/Footer";
import { Sparkles, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function RoadmapPage() {
  const router = useRouter();
  const params = useSearchParams();

  const title = params.get("title");
  const id = params.get("id");

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const MakeActionItem = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/create-task-course", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content: title,
          learningSectionId: id,
          input: input.trim(),
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to create task");
      }

      const newTask = await res.json();

      const taskId = newTask?.[0]?.id;

      if (!taskId) {
        throw new Error("Task creation failed");
      }

      router.push(`/user/test/${taskId}`);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex min-h-screen text-white antialiased selection:bg-[rgba(0,255,200,0.3)]"
      style={{ fontFamily: "'Space Mono', monospace" }}
    >
      <aside style={{ width: 210 }}>
        <Sidebar />
      </aside>

      <main className="flex-1 flex flex-col" style={{ marginLeft: 210 }}>
        <div className="max-w-4xl mx-auto w-full px-10 py-24">
          <div className="flex items-center gap-3 mb-12">
            <div className="p-2 rounded-full bg-[rgba(0,255,200,0.1)] border border-[rgba(0,255,200,0.2)]">
              <Sparkles size={16} className="text-[rgba(0,255,200,1)]" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-[rgba(0,255,200,1)]">
                System Interface
              </span>
              <span className="text-[12px] opacity-40 uppercase tracking-widest">
                Learning Path Structure
              </span>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[rgba(0,255,200,0.2)] to-transparent rounded-lg blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>

            <div className="relative bg-white/[0.02] border border-white/[0.08] rounded-lg p-8 space-y-8 backdrop-blur-sm">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="mono text-[10px] uppercase font-black text-white/40 tracking-widest">
                    Define what you want for your test
                  </span>
                </div>

                <div className="relative">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="e.g. Master Advanced Quantum Computing..."
                    disabled={loading}
                    className="bg-black/40 border-white/10 focus:border-[rgba(0,255,200,0.5)] focus:ring-1 focus:ring-[rgba(0,255,200,0.5)] h-14 px-5 text-sm transition-all duration-300 placeholder:text-white/10"
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <Button
                    onClick={MakeActionItem}
                    disabled={loading || !input}
                    className={`
                  relative h-11 px-8 overflow-hidden transition-all duration-300
                  ${
                    loading
                      ? "bg-white/5 text-white/20"
                      : "bg-white text-black hover:bg-[rgba(0,255,200,1)] hover:scale-[1.02] active:scale-[0.98]"
                  }
                `}
                  >
                    <div className="flex items-center gap-3 font-bold uppercase tracking-tighter text-[11px]">
                      {loading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        "Initialize Sequence"
                      )}
                    </div>
                  </Button>
                </div>
              </div>
            </div>

            {/* Decorative corner accents */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20 rounded-tl"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20 rounded-br"></div>
          </div>
        </div>

        <footer className="mt-auto px-10 py-10 border-t border-white/[0.03]">
          <div className="opacity-20 hover:opacity-100 transition-opacity duration-500">
            <Footer />
          </div>
        </footer>
      </main>
    </div>
  );
}

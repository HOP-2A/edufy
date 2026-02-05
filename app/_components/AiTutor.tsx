"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SendHorizontal, UserCircle, Sparkles } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function AiTutor() {
  const [message, setMessage] = useState("");

  const suggestions = [
    "What roadmap should I pick?",
    "What are the best jobs for me?",
    "Give me a really difficult challenge",
    "Recommend me a topic I can learn in an hour",
  ];

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-6 bg-[#fafafa]">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] bg-black/[0.02] rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-2xl flex flex-col items-center space-y-12">
        <div className="space-y-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-black/[0.06] text-[10px] font-black uppercase tracking-[0.2em] text-black/40 shadow-sm">
            <Sparkles size={11} /> Intelligent Tutor
          </div>
          <h1 className="text-5xl md:text-6xl font-[1000] text-black tracking-[-0.05em]">
            How can I help?
          </h1>
        </div>

        <div className="w-full space-y-2.5">
          {suggestions.map((text) => (
            <button
              key={text}
              className="w-full text-left px-6 py-4.5 bg-white border border-black/[0.05] rounded-[1.25rem] text-[13px] font-bold text-black/50 hover:text-black hover:border-black/10 hover:shadow-sm transition-all duration-300 group flex justify-between items-center"
              onClick={() => setMessage(text)}
            >
              <span className="tracking-tight">{text}</span>
              <SendHorizontal className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-black/20" />
            </button>
          ))}
        </div>

        <div className="w-full space-y-5 pt-4">
          <div className="flex justify-start px-1">
            <Button
              variant="ghost"
              className="h-8 rounded-full text-[10px] font-black uppercase tracking-widest text-black/60 hover:text-black hover:bg-transparent p-0"
            >
              <UserCircle className="mr-2 h-4 w-4" /> Personalize AI Experience
            </Button>
          </div>

          <div className="relative bg-white border border-black/[0.08] rounded-[2rem] p-3.5 shadow-[0_15px_40px_rgba(0,0,0,0.03)] focus-within:shadow-[0_20px_50px_rgba(0,0,0,0.06)] transition-all duration-500">
            <Textarea
              placeholder="Ask me anything..."
              className="border-none focus-visible:ring-0 min-h-[120px] text-[1.15rem] font-bold tracking-tight resize-none p-4 placeholder:text-black/40 text-black leading-snug"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <div className="flex justify-end p-2">
              <Button
                className={cn(
                  "rounded-full w-12 h-12 p-0 shadow-xl transition-all duration-500 active:scale-95",
                  message
                    ? "bg-black text-white shadow-black/10"
                    : "bg-black/5 text-black/10 shadow-none",
                )}
                disabled={!message}
              >
                <SendHorizontal className="h-5 w-5 stroke-[2.5px]" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

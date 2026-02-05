"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, ArrowRight, Clipboard } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export default function CreateTest() {
  const [topic, setTopic] = useState("");

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-6 bg-[#fafafa]">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[10%] left-[10%] w-96 h-96 bg-black/[0.01] rounded-full blur-[100px]" />
      </div>

      <div className="w-full max-w-xl flex flex-col items-center space-y-12">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-black/[0.06] text-[10px] font-black uppercase tracking-[0.2em] text-black/40 shadow-sm">
            <Sparkles size={11} /> AI Engine
          </div>
          <h1 className="text-5xl md:text-6xl font-[1000] text-black tracking-[-0.05em]">
            New Assessment
          </h1>
          <p className="text-lg font-bold text-black/30 tracking-tight">
            What do you want to test today?
          </p>
        </div>

        <div className="w-full space-y-6">
          <div className="relative group">
            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-black/50 group-focus-within:text-black transition-colors">
              <Clipboard size={20} />
            </div>
            <Input
              placeholder="Enter a topic or subject..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="h-20 rounded-[2rem] border-black/[0.08] bg-white pl-16 pr-8 text-xl font-bold tracking-tight shadow-[0_15px_40px_rgba(0,0,0,0.03)] focus-within:shadow-[0_20px_50px_rgba(0,0,0,0.06)] transition-all duration-500 focus-visible:ring-0 placeholder:text-black/50"
            />
          </div>

          <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
            <Button
              disabled={!topic}
              className="group w-full h-18 rounded-[2rem] bg-black text-white transition-all duration-500 hover:bg-black/80 hover:shadow-[0_30px_60px_rgba(0,0,0,0.12)] disabled:opacity-20"
            >
              <div className="flex items-center justify-center gap-4">
                <span className="text-[11px] font-black uppercase tracking-[0.25em]">
                  Build Assessment
                </span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Button>
          </motion.div>
        </div>

        <div className="flex flex-wrap justify-center gap-2 pt-4">
          {["React Hooks", "World War II", "Macroeconomics"].map((item) => (
            <button
              key={item}
              onClick={() => setTopic(item)}
              className="px-4 py-2 bg-white border border-black/[0.05] rounded-full text-[11px] font-bold text-black/40 hover:text-black hover:border-black/10 transition-all"
            >
              + {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

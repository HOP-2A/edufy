"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Plus,
  Search,
  BookOpen,
  ArrowUpRight,
  Layers,
  Sparkles,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Community() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const courses = Array(9).fill({
    title: "Advanced Neural Architectures",
    modules: 7,
    lessons: 42,
    author: "AI Engine",
  });

  return (
    <div className="flex-1 bg-[#fafafa] min-h-screen p-6 md:p-12">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-black/80 text-[10px] font-[1000] uppercase tracking-[0.2em] border border-black/[0.08] shadow-sm"
            >
              <TrendingUp className="w-3 h-3" /> Community Hub
            </motion.div>
            <h1 className="text-5xl md:text-6xl font-black text-black tracking-[-0.05em] leading-[1.1]">
              Explore{" "}
              <span className="text-black/10 tracking-tighter italic">
                Courses
              </span>
            </h1>
            <p className="text-black/40 text-lg font-bold max-w-xl leading-relaxed tracking-tight">
              Master any skill with community-driven, AI-architected knowledge
              paths.
            </p>
          </div>

          <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={() => router.push("create/roadmap")}
              className="
      group relative h-16 px-10 
      bg-black text-white 
      rounded-[2rem] border border-black/5
      transition-all duration-500 ease-out
      hover:bg-black/80 hover:shadow-[0_30px_60px_rgba(0,0,0,0.12)]
      active:shadow-[0_10px_20px_rgba(0,0,0,0.1)]
    "
            >
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                  <Plus className="w-5 h-5 stroke-[2.5px]" />
                </div>

                <span className="text-[11px] font-black uppercase tracking-[0.2em]">
                  Create Roadmap
                </span>
              </div>
            </Button>
          </motion.div>
        </div>

        <div className="relative group max-w-2xl">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-black/20 group-focus-within:text-black transition-colors" />
          <Input
            placeholder="Search knowledge..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-16 h-16 bg-white border-black/[0.05] rounded-[2rem] shadow-sm text-lg focus-visible:ring-black/5 transition-all placeholder:text-black/10 font-bold tracking-tight"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ y: -5 }}
              className="group relative bg-white border border-black/[0.03] p-8 rounded-[2.5rem] hover:shadow-[0_40px_80px_rgba(0,0,0,0.04)] transition-all duration-500 flex flex-col justify-between min-h-[320px] cursor-pointer"
            >
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div className="w-14 h-14 bg-black/[0.02] rounded-2xl flex items-center justify-center text-black group-hover:bg-black group-hover:text-white transition-all duration-500 shadow-inner">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div className="p-2 rounded-full bg-black/[0.02] opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <ArrowUpRight className="w-5 h-5 text-black" />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[10px] font-black text-black/20 uppercase tracking-[0.2em]">
                    <Sparkles className="w-3 h-3 text-black/10" />{" "}
                    {course.author}
                  </div>
                  <h3 className="text-2xl font-[1000] text-black leading-[1.2] tracking-tight transition-none">
                    {course.title}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-8 pt-8 border-t border-black/[0.02]">
                <div className="flex items-center gap-2.5 text-[10px] font-black text-black/30 uppercase tracking-widest">
                  <Layers className="w-4 h-4 opacity-20" />
                  {course.modules} Modules
                </div>
                <div className="flex items-center gap-2.5 text-[10px] font-black text-black/30 uppercase tracking-widest">
                  <BookOpen className="w-4 h-4 opacity-20" />
                  {course.lessons} Lessons
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

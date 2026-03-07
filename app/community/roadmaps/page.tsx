"use client";

import Sidebar from "@/app/_components/SideBar";
import { useEffect, useState } from "react";
import { BookOpen, Trophy, Clock, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export interface Roadmap {
  id: string;
  userId: string;
  title: string;
  description: string;
  levelFrom?: string | null;
  levelTo?: string | null;
  purpose: string;
  createdAt: string | Date;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

import { Variants } from "framer-motion";

const cardVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] },
  },
};

export default function Home() {
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const find = async () => {
      try {
        const res = await fetch(`/api/get-published-rm`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data: Roadmap[] = await res.json();
        setRoadmaps(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    find();
  }, []);

  return (
    <div className="flex min-h-screen  text-white antialiased">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Unbounded:wght@400;700;900&display=swap');
        .main-root { font-family: 'Space Mono', monospace; }
        .unb { font-family: 'Unbounded', sans-serif; }
        
     

        .roadmap-card {
          background: rgba(255,255,255,0.015);
          border: 1px solid rgba(255,255,255,0.04);
          backdrop-filter: blur(12px);
          transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .roadmap-card:hover {
          background: rgba(0, 255, 200, 0.03);
          border-color: rgba(0, 255, 200, 0.2);
          transform: translateY(-5px);
        }

        .accent-stroke {
          -webkit-text-stroke: 1px rgba(0, 255, 200, 0.1);
          color: transparent;
        }

        .teal-glow {
          box-shadow: 0 0 20px rgba(0, 255, 200, 0.05);
        }
      `}</style>

      <div />
      <aside className="w-[210px]">
        <Sidebar />
      </aside>

      <main className="main-root flex-1 ml-[210px] p-10 relative z-10 overflow-y-auto">
        <header className="mb-20 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-2 h-2 rounded-full bg-teal-400 shadow-[0_0_10px_#2dd4bf]" />
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-teal-400/60">
              Global Explore / Community Paths
            </span>
          </motion.div>

          <h1 className="unb text-5xl md:text-6xl font-black tracking-tighter uppercase italic leading-[0.95]">
            Explore <br />
            <span className="accent-stroke">Roadmaps.</span>
          </h1>

          <div className="h-0.5 w-24 bg-gradient-to-r from-teal-500 to-transparent mt-10 mb-6" />

          <p className="text-white/30 text-xs max-w-md leading-relaxed mono uppercase tracking-wider">
            Choose your learning path, master new skills, and build your digital
            future today.
          </p>
        </header>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="h-72 bg-white/5 animate-pulse rounded-[2.5rem] border border-white/5"
              />
            ))}
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {roadmaps.map((item, index) => (
              <motion.div
                key={item.id}
                variants={cardVariants}
                className="roadmap-card group relative flex flex-col p-8 rounded-[2.5rem] overflow-hidden"
              >
                <span className="unb absolute -right-4 -top-6 text-[110px] font-black text-white/[0.02] pointer-events-none group-hover:text-teal-400/[0.04] transition-colors">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="relative z-10 flex justify-between items-start mb-10">
                  <div className="p-3.5 bg-teal-500/10 border border-teal-500/20 text-teal-400 rounded-2xl group-hover:bg-teal-400 group-hover:text-black transition-all duration-500 teal-glow">
                    <BookOpen size={18} />
                  </div>
                  <span className="mono text-[8px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 bg-white/5 text-white/40 border border-white/10 rounded-full">
                    {item.levelFrom || "Beginner"}
                  </span>
                </div>

                <div className="relative z-10 flex-1">
                  <h3 className="unb text-[16px] font-bold text-white mb-4 line-clamp-1 group-hover:text-teal-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="mono text-white/30 text-[11px] leading-relaxed line-clamp-2 mb-8 min-h-[40px]">
                    {item.description ||
                      "No description provided for this roadmap yet."}
                  </p>

                  <div className="space-y-3 mb-10">
                    <div className="flex items-center text-[9px] font-bold uppercase tracking-widest text-white/20 group-hover:text-white/40 transition-colors">
                      <Trophy size={12} className="mr-3 text-teal-500/50" />
                      <span className="truncate">Goal: {item.purpose}</span>
                    </div>
                    <div className="flex items-center text-[9px] font-bold uppercase tracking-widest text-white/20 group-hover:text-white/40 transition-colors">
                      <Clock size={12} className="mr-3 text-teal-500/50" />
                      <span>
                        {new Date(item.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                <Link
                  href={`/user/course?id=${item.id}`}
                  className="relative z-10 mt-auto"
                >
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 px-6 bg-white text-black rounded-2xl font-bold text-[10px] unb uppercase tracking-widest flex items-center justify-center gap-3 group-hover:bg-teal-400 transition-all"
                  >
                    Start Journey
                    <ArrowRight
                      size={14}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </motion.button>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}

        {!loading && roadmaps.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-32 border border-dashed border-white/10 rounded-[3rem] bg-white/[0.01]"
          >
            <div className="mb-6 flex justify-center">
              <Sparkles size={30} className="text-white/10" />
            </div>
            <p className="mono text-[10px] text-white/20 uppercase tracking-[0.4em]">
              No published roadmaps available.
            </p>
          </motion.div>
        )}
      </main>
    </div>
  );
}

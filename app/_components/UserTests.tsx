"use client";

import Footer from "@/app/_components/Footer";
import Sidebar from "@/app/_components/SideBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, ArrowRight, Zap, GraduationCap } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";

type Actionitem = {
  id: string;
  title: string;
  description: string;
};

type User = {
  id: string;
  username: string;
  email: string;
  clerkId: string;
};

interface LearningSection {
  id: string;
  title: string;
  tasks: any[];
}
interface Roadmap {
  id: string;
  learningSections: LearningSection[];
}

export default function Main() {
  const router = useRouter();
  const { userId, isLoaded } = useAuth();

  const [searchQuery, setSearchQuery] = useState("");
  const [actionItem, setActionItem] = useState<Actionitem[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [roadmap, setRoadmap] = useState<Roadmap[]>([]);
  const [roadmapId, setRoadmapId] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoaded || !userId) return;
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/find-user/${userId}`);
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, [isLoaded, userId]);

  useEffect(() => {
    if (!user?.id) return;
    const fetchRoadmapIds = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/getroadmapbyuserId/${user.id}`);
        const data = await res.json();
        setRoadmapId(data ?? []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRoadmapIds();
  }, [user?.id]);

  useEffect(() => {
    if (!roadmapId.length) {
      setRoadmap([]);
      return;
    }
    const fetchAllRoadmaps = async () => {
      try {
        setLoading(true);
        const results = await Promise.all(
          roadmapId.map(async (r) => {
            const res = await fetch(`/api/getroadmapinfo/${r.id}`);
            return res.json();
          }),
        );
        setRoadmap(results);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAllRoadmaps();
  }, [roadmapId]);

  useEffect(() => {
    if (!roadmap.length) {
      setActionItem([]);
      return;
    }
    const fetchTasks = async () => {
      try {
        const allSections = roadmap.flatMap((r) => r.learningSections ?? []);
        if (!allSections.length) {
          setActionItem([]);
          return;
        }
        const responses = await Promise.all(
          allSections.map((section) => fetch(`/api/get-tasks/${section.id}`)),
        );
        const taskArrays = await Promise.all(
          responses.map(async (r) => (r.ok ? r.json() : [])),
        );
        setActionItem(taskArrays.flat());
      } catch (err) {
        console.error(err);
      }
    };
    fetchTasks();
  }, [roadmap]);

  const filteredactionItems = actionItem.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (!isLoaded || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#08090a]">
        <div className="flex flex-col items-center gap-6">
          <div className="w-10 h-10 border-2 border-teal-500/20 border-t-teal-500 rounded-full animate-spin" />
          <p className="mono text-[10px] font-bold uppercase tracking-[0.4em] text-teal-400/40">
            Initializing Tests
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#08090a] text-white antialiased">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Unbounded:wght@400;700;900&display=swap');
        .mono { font-family: 'Space Mono', monospace; }
        .unb { font-family: 'Unbounded', sans-serif; }
        .grain-bg {
          position: fixed; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
          pointer-events: none; z-index: 0;
        }
        .test-card {
          background: rgba(255, 255, 255, 0.015);
          border: 1px solid rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(12px);
          transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .test-card:hover {
          background: rgba(0, 255, 200, 0.03);
          border-color: rgba(0, 255, 200, 0.2);
          transform: translateY(-8px);
        }
        .accent-stroke { -webkit-text-stroke: 1px rgba(0, 255, 200, 0.1); color: transparent; }
      `}</style>

      <div className="grain-bg" />

      <aside className="fixed inset-y-0 z-50 w-[210px]">
        <Sidebar />
      </aside>

      <main className="flex-1 ml-[210px] p-10 relative z-10 flex flex-col min-h-screen">
        <div className="flex-grow max-w-7xl mx-auto w-full">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3"
              >
                <div className="w-2 h-2 bg-teal-500 rounded-full shadow-[0_0_10px_rgba(0,255,200,0.5)]" />
                <span className="mono text-[10px] font-bold uppercase tracking-[0.4em] text-teal-400/60">
                  Assessment Library
                </span>
              </motion.div>
              <h1 className="unb text-5xl md:text-6xl font-black tracking-tighter uppercase italic leading-none">
                Tests<span className="accent-stroke">.</span>
              </h1>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/create/test")}
              className="unb h-16 px-10 rounded-[2rem] bg-white text-black font-bold text-[11px] uppercase tracking-widest hover:bg-teal-400 transition-all shadow-[0_20px_40px_rgba(0,0,0,0.3)] flex items-center gap-3"
            >
              <Plus size={18} strokeWidth={3} /> New Assessment
            </motion.button>
          </header>

          <div className="relative group max-w-2xl mb-16">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-teal-400/20 group-focus-within:text-teal-400 transition-colors" />
            <Input
              className="h-18 rounded-[2rem] border-white/5 bg-white/[0.02] pl-16 mono text-xs uppercase tracking-widest placeholder:text-white/10 focus-visible:ring-1 focus-visible:ring-teal-500/30 focus-visible:border-teal-500/30 transition-all outline-none"
              placeholder="Search evaluations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <AnimatePresence mode="wait">
            {actionItem.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex min-h-[40vh] flex-col items-center justify-center rounded-[3rem] border border-dashed border-white/10 bg-white/[0.01] p-20 text-center"
              >
                <div className="w-20 h-20 bg-teal-500/10 rounded-[2rem] border border-teal-500/20 flex items-center justify-center text-teal-400 mb-8 rotate-3">
                  <GraduationCap size={32} />
                </div>
                <h2 className="unb text-2xl font-bold uppercase tracking-tighter italic mb-4">
                  No tests found
                </h2>
                <p className="mono text-[10px] text-white/30 uppercase tracking-widest max-w-xs leading-relaxed mb-10">
                  Таны AI-аар үүсгэсэн шалгалтууд энд харагдах болно.
                </p>
                <Button
                  onClick={() => router.push("/create/test")}
                  className="h-14 px-10 rounded-2xl bg-white/5 border border-white/10 text-white mono text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all"
                >
                  Generate First Test
                </Button>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                {filteredactionItems.map((test, idx) => (
                  <motion.div
                    key={test.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => router.push(`/user/test/${test.id}`)}
                    className="test-card group relative p-10 rounded-[2.5rem] flex flex-col justify-between min-h-[300px] cursor-pointer"
                  >
                    <div className="space-y-6 relative z-10">
                      <div className="flex justify-between items-start">
                        <div className="p-4 bg-teal-500/10 text-teal-400 rounded-2xl group-hover:bg-teal-400 group-hover:text-black transition-all duration-500">
                          <Zap
                            className="-rotate-45 group-hover:rotate-0 transition-transform duration-500"
                            size={18}
                          />
                        </div>
                        <span className="mono text-[8px] font-bold text-white/20 uppercase tracking-[0.3em]">
                          Evaluation
                        </span>
                      </div>
                      <h3 className="unb text-xl font-bold tracking-tight leading-tight uppercase italic group-hover:text-teal-400 transition-colors">
                        {test.title}
                      </h3>
                    </div>

                    <p className="mono text-[11px] text-white/30 leading-relaxed line-clamp-3 mt-6 relative z-10">
                      {test.description ||
                        "Бэлтгэл тест - Мэдлэгээ баталгаажуулж, оноогоо ахиулаарай."}
                    </p>

                    <div className="absolute bottom-0 right-0 p-8 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity">
                      <ArrowRight size={80} className="-rotate-45" />
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>

        <footer className="mt-auto pt-20 pb-10 border-t border-white/5">
          <div className="max-w-7xl mx-auto opacity-30 hover:opacity-100 transition-opacity">
            <Footer />
          </div>
        </footer>
      </main>
    </div>
  );
}

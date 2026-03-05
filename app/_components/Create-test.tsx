"use client";

import Footer from "@/app/_components/Footer";
import Sidebar from "@/app/_components/SideBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Sparkles, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";

interface Roadmap {
  id: string;
  title: string;
  description: string;
}

interface User {
  id: string;
  username: string;
  email: string;
  clerkId: string;
}

export default function Main() {
  const router = useRouter();
  const { userId, isLoaded } = useAuth();

  const [searchQuery, setSearchQuery] = useState("");
  const [roadmap, setRoadmap] = useState<Roadmap[]>([]);
  const [roadmapId, setRoadmapId] = useState<any[]>([]);
  const [user, setUser] = useState<User | null>(null);
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
        setRoadmapId(await res.json());
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRoadmapIds();
  }, [user?.id]);

  useEffect(() => {
    if (roadmapId.length === 0) {
      setRoadmap([]);
      return;
    }
    const fetchAllRoadmaps = async () => {
      try {
        setLoading(true);
        const results = await Promise.all(
          roadmapId.map((r) =>
            fetch(`/api/getroadmapinfo/${r.id}`).then((res) => res.json()),
          ),
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

  const filteredRoadmaps = roadmap.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (!isLoaded || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-6">
          <div className="w-8 h-8 border-[3px] border-white/10 border-t-white rounded-full animate-spin" />
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/20">
            Decrypting Library
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex text-white/90 selection:bg-white selection:text-black">
      <main className="flex-1 ml-72 flex flex-col min-h-screen relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/[0.02] blur-[120px] rounded-full -z-10" />

        <div className="flex-grow p-12 lg:p-20 relative z-10">
          <div className="max-w-6xl mx-auto space-y-16">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/30">
                    Collection
                  </span>
                </div>
                <h1 className="text-6xl lg:text-7xl font-black tracking-tighter uppercase italic leading-none">
                  Library<span className="text-white/10">.</span>
                </h1>
              </div>

              <Button
                className="h-14 px-10 rounded-2xl bg-white text-black font-black uppercase tracking-widest hover:bg-white/90 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-2xl shadow-white/5"
                onClick={() => router.push("/create/roadmap")}
              >
                <Plus className="mr-2 h-4 w-4 stroke-[4px]" />
                New Path
              </Button>
            </header>

            <div className="relative group max-w-xl">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20 group-focus-within:text-white transition-colors" />
              <Input
                className="h-16 rounded-2xl border-white/[0.08] bg-white/[0.03] backdrop-blur-md pl-14 text-lg font-medium placeholder:text-white/10 focus-visible:ring-1 focus-visible:ring-white/20 focus-visible:border-white/20 transition-all outline-none"
                placeholder="Find a course..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="relative">
              <AnimatePresence mode="wait">
                {roadmap.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex min-h-[45vh] flex-col items-center justify-center rounded-[48px] border border-white/[0.05] bg-white/[0.01] backdrop-blur-sm p-20 text-center"
                  >
                    <div className="w-20 h-20 bg-white/[0.03] border border-white/[0.1] rounded-[30px] flex items-center justify-center text-white/20 mb-8 rotate-6 shadow-inner">
                      <Sparkles size={32} />
                    </div>
                    <h2 className="text-3xl font-black uppercase tracking-tighter italic mb-4">
                      Empty Archive
                    </h2>
                    <p className="text-white/30 font-medium mb-10 max-w-xs uppercase text-[10px] tracking-[0.2em] leading-relaxed">
                      Таны суралцах замнал энд харагдах болно. Одоогоор мэдээлэл
                      алга.
                    </p>
                    <Button
                      variant="outline"
                      className="h-12 px-10 rounded-xl border-white/10 text-white/60 font-bold uppercase text-[10px] tracking-widest hover:bg-white hover:text-black transition-all"
                      onClick={() => router.push("/create/roadmap")}
                    >
                      Initialize Roadmap
                    </Button>
                  </motion.div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredRoadmaps.map((course, idx) => (
                      <motion.div
                        key={course.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05, ease: "easeOut" }}
                        whileHover={{
                          y: -8,
                          backgroundColor: "rgba(255,255,255,0.04)",
                        }}
                        onClick={() =>
                          router.push(`/create/course?id=${course.id}`)
                        }
                        className="group relative bg-white/[0.02] border border-white/[0.06] p-10 rounded-[40px] transition-all duration-500 hover:border-white/20 hover:shadow-[0_40px_80px_rgba(0,0,0,0.5)] flex flex-col justify-between min-h-[300px] cursor-pointer overflow-hidden"
                      >
                        <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/[0.02] blur-3xl rounded-full group-hover:bg-white/[0.05] transition-colors" />

                        <div className="space-y-6 relative z-10">
                          <div className="flex justify-between items-start">
                            <div className="w-12 h-12 bg-white/5 border border-white/10 group-hover:bg-white group-hover:text-black transition-all duration-500 rounded-2xl flex items-center justify-center">
                              <ArrowRight
                                className="-rotate-45 group-hover:rotate-0 transition-transform duration-500"
                                size={20}
                              />
                            </div>
                            <span className="text-[10px] font-bold text-white/10 uppercase tracking-[0.3em]">
                              {String(idx + 1).padStart(2, "0")}
                            </span>
                          </div>
                          <h3 className="text-2xl font-black tracking-tighter leading-tight uppercase italic group-hover:tracking-normal transition-all duration-500 text-white">
                            {course.title}
                          </h3>
                        </div>

                        <div className="space-y-6 relative z-10">
                          <p className="text-white/30 text-[12px] font-medium line-clamp-2 leading-relaxed uppercase tracking-wider">
                            {course.description ||
                              "Access your personalized learning path and resource library."}
                          </p>
                          <div className="h-[1px] w-full bg-white/5 group-hover:bg-white/20 transition-all duration-500" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto opacity-20 hover:opacity-100 transition-opacity">
          <Footer />
        </div>
      </main>
    </div>
  );
}

"use client";

import Footer from "@/app/_components/Footer";
import Sidebar from "@/app/_components/SideBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Sparkles, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { Action } from "@radix-ui/react-alert-dialog";

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

export default function Main() {
  const router = useRouter();
  const { userId, isLoaded } = useAuth();

  const [searchQuery, setSearchQuery] = useState("");
  const [actionItem, setActionItem] = useState<Actionitem[]>([]);

  const [user, setUser] = useState<User | null>(null);
  const [roadmap, setRoadmap] = useState<Roadmap[]>([]);
  const [roadmapId, setRoadmapId] = useState<Roadmap[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoaded || !userId) return;

    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/find-user/${userId}`);
        if (!res.ok) throw new Error("Failed to fetch user");

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
        if (!res.ok) throw new Error("Failed to fetch roadmap IDs");

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
            if (!res.ok) throw new Error("Failed to fetch roadmap");
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

        if (responses.some((r) => !r.ok)) {
          throw new Error("Failed to fetch some tasks");
        }

        const taskArrays = await Promise.all(
          responses.map(async (r) => {
            if (!r.ok) {
              console.warn("One task fetch failed");
              return [];
            }
            return r.json();
          }),
        );

        const allTasks = taskArrays.flat();
        setActionItem(allTasks);
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
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" />
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-black/20">
            Loading Library
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-white text-black selection:bg-black selection:text-white">
      <div className="flex min-h-screen w-full">
        <main className="flex-1 flex flex-col">
          <div className="flex-1 w-full px-12 lg:px-20 py-20">
            <div className="w-full max-w-7xl mx-auto space-y-20">
              <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-black rounded-full" />
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-black/20">
                      Collection
                    </span>
                  </div>
                  <h1 className="text-6xl font-black tracking-tighter uppercase italic leading-none">
                    Library<span className="text-black/10">.</span>
                  </h1>
                </div>

                <Button
                  className="h-16 px-10 rounded-full bg-black text-white font-black uppercase tracking-widest hover:scale-105 transition-all shadow-2xl shadow-black/10"
                  onClick={() => router.push("/create/test")}
                >
                  <Plus className="mr-2 h-5 w-5 stroke-[3px]" />
                  Create New
                </Button>
              </header>

              <div className="relative group max-w-2xl">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-black/20 group-focus-within:text-black transition-colors" />
                <Input
                  className="h-20 rounded-[30px] border-black/[0.05] bg-black/[0.02] pl-16 text-xl font-bold placeholder:text-black/10 focus-visible:ring-0 focus-visible:border-black/10 transition-all outline-none"
                  placeholder="Search for a course..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="relative">
                {actionItem.length === 0 ? (
                  <div className="flex min-h-[50vh] flex-col items-center justify-center rounded-[50px] border border-black/[0.05] bg-black/[0.01] p-20 text-center">
                    <div className="w-20 h-20 bg-black rounded-[30px] flex items-center justify-center text-white mb-8 rotate-3">
                      <Sparkles className="h-10 w-10" />
                    </div>
                    <h2 className="text-3xl font-black uppercase tracking-tighter italic mb-4">
                      No tests found
                    </h2>
                    <p className="text-black/40 font-medium mb-10 max-w-xs uppercase text-[10px] tracking-widest">
                      Таны суралцах замнал энд харагдах болно.
                    </p>
                    <Button
                      className="h-16 px-12 rounded-full bg-black text-white font-black uppercase tracking-widest"
                      onClick={() => router.push("/create/test")}
                    >
                      Create your first course
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredactionItems.map((course) => (
                      <motion.div
                        key={course.id}
                        whileHover={{ y: -8 }}
                        onClick={() => router.push(`/user/test/${course.id}`)}
                        className="group relative bg-white border border-black/[0.06] p-10 rounded-[40px] transition-all duration-500 hover:border-black hover:shadow-[0_30px_60px_rgba(0,0,0,0.05)] flex flex-col justify-between min-h-[280px] cursor-pointer"
                      >
                        <div className="space-y-4">
                          <div className="flex justify-between items-start">
                            <div className="w-10 h-10 bg-black/[0.03] group-hover:bg-black group-hover:text-white transition-all rounded-2xl flex items-center justify-center">
                              <ArrowRight
                                className="-rotate-45 group-hover:rotate-0 transition-transform duration-500"
                                size={20}
                              />
                            </div>
                            <span className="text-[10px] font-black text-black/10 uppercase tracking-widest">
                              Course
                            </span>
                          </div>
                          <h3 className="text-2xl font-black tracking-tighter leading-tight uppercase italic group-hover:tracking-normal transition-all duration-500">
                            {course.title}
                          </h3>
                        </div>

                        <p className="text-black/40 text-sm font-medium line-clamp-2 mt-4">
                          {course.description}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <footer className="px-12 py-10 border-t border-black/[0.03]">
            <div className="max-w-6xl mx-auto opacity-20 hover:opacity-100 transition-opacity">
              <Footer />
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}

"use client";

import Footer from "@/app/_components/Footer";
import Sidebar from "@/app/_components/SideBar";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import CreateRoadmap from "@/app/_components/CreateRoadmap";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [roadmaps, setRoadmaps] = useState([]);
  useEffect(() => {
    const getMaps = async () => {
      const res = await fetch("/api/roadmap/IQbAHAzBQwRim2o2L0tyH");
      const maps = await res.json();
      setRoadmaps(maps);
    };
    getMaps();
  }, []);
  console.log(roadmaps, "asdfasfd");
  return (
    <div className="flex min-h-screen bg-[#F8FAFC] ">
      <Sidebar />

      <main className="flex-1 flex flex-col justify-around">
        <div className="mt-40 ">
          {roadmaps.length === 0 ? (
            <div className="min-h-screen bg-[#fafafa]">
              <div className="relative flex flex-1 flex-col p-6 md:p-12 overflow-hidden">
                <div className="absolute top-0 right-0 -z-10 h-125 w-125 rounded-full bg-black/[0.01] blur-[120px]" />
                <div className="absolute bottom-0 left-0 -z-10 h-100 w-100 rounded-full bg-black/[0.01] blur-[100px]" />

                <div className="mx-auto w-full max-w-6xl space-y-12">
                  <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                    <div className="space-y-4">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-black/[0.06] text-[10px] font-black uppercase tracking-[0.2em] text-black/40 shadow-sm">
                        <Sparkles size={11} /> Personal Space
                      </div>
                      <h1 className="text-5xl md:text-6xl font-[1000] tracking-[-0.05em] text-black leading-tight">
                        Library
                      </h1>
                      <p className="text-lg font-bold text-black/30 tracking-tight">
                        Explore and manage your roadmaps.
                      </p>
                    </div>

                    <motion.div
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        onClick={() => router.push("create/roadmap")}
                        className="group relative h-16 px-10 bg-black text-white rounded-[2rem] border border-black/5 transition-all duration-500 ease-out hover:bg-black/80 hover:shadow-[0_30px_60px_rgba(0,0,0,0.12)]"
                      >
                        <div className="flex items-center gap-4">
                          <div className="transition-transform duration-500 group-hover:scale-110">
                            <Plus className="w-5 h-5 stroke-[2.5px]" />
                          </div>
                          <span className="text-[11px] font-black uppercase tracking-[0.2em]">
                            Create New
                          </span>
                        </div>
                      </Button>
                    </motion.div>
                  </div>

                  <div className="group relative w-full max-w-2xl">
                    <Search className="absolute left-6 top-1/2 h-5 w-5 -translate-y-1/2 text-black/20 transition-colors group-focus-within:text-black" />
                    <Input
                      className="h-16 rounded-[2rem] border-black/[0.08] bg-white pl-16 text-lg font-bold shadow-[0_15px_40px_rgba(0,0,0,0.03)] focus-within:shadow-[0_20px_50px_rgba(0,0,0,0.06)] transition-all duration-500 focus-visible:ring-0 placeholder:text-black/10 tracking-tight"
                      placeholder="search a roadmap"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-1 flex-col px-6 pb-12">
                <div className="mx-auto w-full max-w-6xl">
                  <div className="flex min-h-[55vh] w-full flex-col items-center justify-center rounded-[3rem] border border-black/[0.04] bg-white p-20 text-center shadow-[0_40px_80px_rgba(0,0,0,0.02)]">
                    <div className="relative mb-8">
                      <div className="relative flex h-28 w-28 items-center justify-center rounded-[2.5rem] bg-black/[0.02] border border-black/[0.05] text-black/15">
                        <Sparkles className="h-12 w-12" />
                      </div>
                    </div>

                    <h2 className="mb-4 text-4xl font-[1000] text-black tracking-[-0.04em]">
                      No roadmaps found
                    </h2>
                    <p className="mb-10 text-black/30 font-bold max-w-xs mx-auto text-lg leading-tight">
                      Your library is quiet. Start building your first knowledge
                      path.
                    </p>

                    <Button
                      className="h-16 rounded-full bg-black/[0.05] hover:bg-black hover:text-white px-12 text-[11px] font-black uppercase tracking-[0.2em] text-black transition-all duration-500"
                      onClick={() => router.push("create/roadmap")}
                    >
                      Create your first roadmap
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="min-h-screen bg-[#fafafa]">
              <div className="relative flex flex-1 flex-col p-6 md:p-12 overflow-hidden">
                <div className="absolute top-0 right-0 -z-10 h-125 w-125 rounded-full bg-black/[0.01] blur-[120px]" />
                <div className="absolute bottom-0 left-0 -z-10 h-100 w-100 rounded-full bg-black/[0.01] blur-[100px]" />

                <div className="mx-auto w-full max-w-6xl space-y-12">
                  <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                    <div className="space-y-4">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-black/[0.06] text-[10px] font-black uppercase tracking-[0.2em] text-black/40 shadow-sm">
                        <Sparkles size={11} /> Personal Space
                      </div>
                      <h1 className="text-5xl md:text-6xl font-[1000] tracking-[-0.05em] text-black leading-tight">
                        Library
                      </h1>
                      <p className="text-lg font-bold text-black/30 tracking-tight">
                        Explore and manage your roadmaps.
                      </p>
                    </div>

                    <motion.div
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        onClick={() => router.push("create/roadmap")}
                        className="group relative h-16 px-10 bg-black text-white rounded-[2rem] border border-black/5 transition-all duration-500 ease-out hover:bg-black/80 hover:shadow-[0_30px_60px_rgba(0,0,0,0.12)]"
                      >
                        <div className="flex items-center gap-4">
                          <div className="transition-transform duration-500 group-hover:scale-110">
                            <Plus className="w-5 h-5 stroke-[2.5px]" />
                          </div>
                          <span className="text-[11px] font-black uppercase tracking-[0.2em]">
                            Create New
                          </span>
                        </div>
                      </Button>
                    </motion.div>
                  </div>

                  <div className="group relative w-full max-w-2xl">
                    <Search className="absolute left-6 top-1/2 h-5 w-5 -translate-y-1/2 text-black/20 transition-colors group-focus-within:text-black" />
                    <Input
                      className="h-16 rounded-[2rem] border-black/[0.08] bg-white pl-16 text-lg font-bold shadow-[0_15px_40px_rgba(0,0,0,0.03)] focus-within:shadow-[0_20px_50px_rgba(0,0,0,0.06)] transition-all duration-500 focus-visible:ring-0 placeholder:text-black/10 tracking-tight"
                      placeholder="search a roadmap"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-1 flex-col px-6 pb-12">
                <div className="mx-auto w-full max-w-6xl">
                  <div className="flex min-h-[55vh] w-full flex-col items-center justify-center rounded-[3rem] border border-black/[0.04] bg-white p-20 text-center shadow-[0_40px_80px_rgba(0,0,0,0.02)]">
                    <div className="relative mb-8">
                      <div className="h-full w-full flex flex-col items-center py-16 px-4 bg-white overflow-scroll">
                        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
                          {roadmaps.map((map, index) => (
                            <div
                              key={index}
                              className="group relative overflow-hidden rounded-3xl border-2 border-black bg-white p-12 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl "
                            >
                              {/* Accent line */}

                              {/* Header */}
                              <div className="flex items-start justify-between gap-6 mb-8">
                                <h2 className="text-3xl font-bold leading-tight group-hover:underline underline-offset-4">
                                  {map.title}
                                </h2>

                                <span className="shrink-0 rounded-full text-sm font-mono px-4 py-1.5 border border-black/20 bg-black/5">
                                  {map.levelFrom} → {map.levelTo}
                                </span>
                              </div>

                              {/* Description */}
                              <p className="text-lg text-black/70 leading-relaxed mb-10">
                                {map.description}
                              </p>

                              {/* Footer */}
                              <div className="flex items-center justify-between">
                                <p className="text-sm font-semibold uppercase tracking-widest text-black/50">
                                  {map.purpose}
                                </p>

                                <span className="text-sm font-medium opacity-0 translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                                  View roadmap →
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="h-[5vh]">
          <Footer />
        </div>
      </main>
    </div>
  );
}

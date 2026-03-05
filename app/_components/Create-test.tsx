// "use client";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Sparkles, ArrowRight, Clipboard } from "lucide-react";
// import { useState } from "react";
// import { motion } from "framer-motion";

// export default function CreateTest() {
//   const [topic, setTopic] = useState("");

//   return (
//     <div className="relative min-h-screen flex flex-col items-center justify-center px-6 bg-[#fafafa]">
//       <div className="absolute inset-0 -z-10">
//         <div className="absolute top-[10%] left-[10%] w-96 h-96 bg-black/[0.01] rounded-full blur-[100px]" />
//       </div>

//       <div className="w-full max-w-xl flex flex-col items-center space-y-12">
//         <div className="text-center space-y-4">
//           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-black/[0.06] text-[10px] font-black uppercase tracking-[0.2em] text-black/40 shadow-sm">
//             <Sparkles size={11} /> AI Engine
//           </div>
//           <h1 className="text-5xl md:text-6xl font-[1000] text-black tracking-[-0.05em]">
//             New Assessment
//           </h1>
//           <p className="text-lg font-bold text-black/30 tracking-tight">
//             What do you want to test today?
//           </p>
//         </div>

//         <div className="w-full space-y-6">
//           <div className="relative group">
//             <div className="absolute left-6 top-1/2 -translate-y-1/2 text-black/50 group-focus-within:text-black transition-colors">
//               <Clipboard size={20} />
//             </div>
//             <Input
//               placeholder="Enter a topic or subject..."
//               value={topic}
//               onChange={(e) => setTopic(e.target.value)}
//               className="h-20 rounded-[2rem] border-black/[0.08] bg-white pl-16 pr-8 text-xl font-bold tracking-tight shadow-[0_15px_40px_rgba(0,0,0,0.03)] focus-within:shadow-[0_20px_50px_rgba(0,0,0,0.06)] transition-all duration-500 focus-visible:ring-0 placeholder:text-black/50"
//             />
//           </div>

//           <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
//             <Button
//               disabled={!topic}
//               className="group w-full h-18 rounded-[2rem] bg-black text-white transition-all duration-500 hover:bg-black/80 hover:shadow-[0_30px_60px_rgba(0,0,0,0.12)] disabled:opacity-20"
//             >
//               <div className="flex items-center justify-center gap-4">
//                 <span className="text-[11px] font-black uppercase tracking-[0.25em]">
//                   Build Assessment
//                 </span>
//                 <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
//               </div>
//             </Button>
//           </motion.div>
//         </div>

//         <div className="flex flex-wrap justify-center gap-2 pt-4">
//           {["React Hooks", "World War II", "Macroeconomics"].map((item) => (
//             <button
//               key={item}
//               onClick={() => setTopic(item)}
//               className="px-4 py-2 bg-white border border-black/[0.05] rounded-full text-[11px] font-bold text-black/40 hover:text-black hover:border-black/10 transition-all"
//             >
//               + {item}
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
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
  const [roadmapId, setRoadmapId] = useState<Roadmap[]>([]);
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
    <div className="min-h-screen flex flex-col bg-white text-black selection:bg-black selection:text-white">
      <div className="flex flex-1">
        <main className="flex-1 ml-72 flex flex-col min-h-screen">
          <div className="flex-grow p-12 lg:p-20">
            <div className="max-w-6xl mx-auto space-y-20">
              <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-black rounded-full" />
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-black/20">
                      choose a course
                    </span>
                  </div>
                  <h1 className="text-6xl font-black tracking-tighter uppercase italic leading-none">
                    Library<span className="text-black/10">.</span>
                  </h1>
                </div>

                <Button
                  className="h-16 px-10 rounded-full bg-black text-white font-black uppercase tracking-widest hover:scale-105 transition-all shadow-2xl shadow-black/10"
                  onClick={() => router.push("/create/roadmap")}
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
                {roadmap.length === 0 ? (
                  <div className="flex min-h-[50vh] flex-col items-center justify-center rounded-[50px] border border-black/[0.05] bg-black/[0.01] p-20 text-center">
                    <div className="w-20 h-20 bg-black rounded-[30px] flex items-center justify-center text-white mb-8 rotate-3">
                      <Sparkles className="h-10 w-10" />
                    </div>
                    <h2 className="text-3xl font-black uppercase tracking-tighter italic mb-4">
                      No roadmaps found
                    </h2>
                    <p className="text-black/40 font-medium mb-10 max-w-xs uppercase text-[10px] tracking-widest">
                      Таны суралцах замнал энд харагдах болно.
                    </p>
                    <Button
                      className="h-16 px-12 rounded-full bg-black text-white font-black uppercase tracking-widest"
                      onClick={() => router.push("/create/roadmap")}
                    >
                      Create a roadmap to get started
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredRoadmaps.map((course) => (
                      <motion.div
                        key={course.id}
                        whileHover={{ y: -8 }}
                        onClick={() =>
                          router.push(`/create/course?id=${course.id}`)
                        }
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
                          {course.description ||
                            "Энэхүү курст тавтай морил. Сургалтын төлөвлөгөөгөө эндээс харна уу."}
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

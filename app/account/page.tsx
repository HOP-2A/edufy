"use client";
import { useProvider, User } from "@/providers/AuthProviders";
import Sidebar from "../_components/SideBar";
import {
  Mail,
  MapPin,
  Phone,
  Sparkles,
  Bookmark,
  Map,
  LayoutGrid,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Roadmap } from "../user/course/page";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type post = {
  id: string;
  images: string[];
  caption: string;
  category: string;
  user: User;
};

export default function Profile() {
  const { user } = useProvider();
  const [posts, setPosts] = useState<post[]>([]);
  const [maps, setMaps] = useState<Roadmap[]>([]);

  useEffect(() => {
    if (!user?.id) return;

    const getSavedItems = async () => {
      try {
        const res = await fetch(`/api/saved/${user.id}`);
        const data = await res.json();
        setPosts(data.savedPosts || []);
        setMaps(data.savedMaps || []);
      } catch (err) {
        console.error("Error fetching saved items:", err);
      }
    };

    getSavedItems();
  }, [user]);

  return (
    <div className="flex min-h-screen  text-white antialiased overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Unbounded:wght@400;700;900&display=swap');
        .mono { font-family: 'Space Mono', monospace; }
        .unb { font-family: 'Unbounded', sans-serif; }
        
  

        .profile-card {
          background: rgba(255, 255, 255, 0.015);
          border: 1px solid rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
        }

        .teal-glow-border {
          border: 1px solid rgba(0, 255, 200, 0.1);
          box-shadow: 0 0 30px rgba(0, 255, 200, 0.03);
        }

        .carousel-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          transition: all 0.3s ease;
        }
        .carousel-card:hover {
          border-color: rgba(0, 255, 200, 0.2);
          background: rgba(0, 255, 200, 0.02);
        }
      `}</style>

      <div />

      <aside className="fixed inset-y-0 z-50 w-[210px]">
        <Sidebar />
      </aside>

      <main className="flex-1 ml-[210px] p-10 relative z-10 flex items-center justify-center">
        <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-10 items-center lg:items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full lg:w-[40%] profile-card rounded-[3rem] p-10 flex flex-col teal-glow-border"
          >
            <div className="flex flex-col items-center text-center mb-10">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-teal-400 blur-2xl opacity-20" />
                <div className="relative mb-6">
                  <div className="w-32 h-32 rounded-2xl border border-white/10 bg-white/[0.03] flex items-center justify-center overflow-hidden">
                    {user?.profilePic ? (
                      <img
                        src={user.profilePic}
                        alt={user?.username || "profile"}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="unb text-3xl font-light text-white/40 tracking-tighter">
                        {user?.username?.charAt(0).toUpperCase() || "U"}
                      </span>
                    )}
                  </div>

                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-teal-500 rounded-full border-2 border-[#050505]" />
                </div>
              </div>
              <h1 className="unb text-2xl font-black italic uppercase tracking-tighter mb-2">
                {user?.username || "Learner"}
              </h1>
              <p className="mono text-xs text-white/30 max-w-xs leading-relaxed uppercase tracking-widest">
                {user?.bio || "No bio provided yet."}
              </p>
            </div>

            <div className="space-y-8 mt-4 flex-1">
              <div className="space-y-4">
                <span className="mono text-[10px] font-bold text-teal-400/50 uppercase tracking-[0.3em]">
                  Credentials
                </span>
                <div className="space-y-3">
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                    <Mail size={16} className="text-teal-400/40" />
                    <span className="mono text-[11px] text-white/60 truncate">
                      {user?.email || "N/A"}
                    </span>
                  </div>
                  {user?.location && (
                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                      <MapPin size={16} className="text-teal-400/40" />
                      <span className="mono text-[11px] text-white/60">
                        Location Set
                      </span>
                    </div>
                  )}
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                    <Phone size={16} className="text-teal-400/40" />
                    <span className="mono text-[11px] text-white/60">
                      {user?.phoneNum || "Hidden"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-white/5 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Sparkles size={14} className="text-teal-400" />
                <span className="unb text-[9px] font-bold uppercase tracking-widest">
                  PRO STATUS
                </span>
              </div>
              <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse shadow-[0_0_10px_rgba(0,255,200,0.5)]" />
            </div>
          </motion.div>

          <div className="w-full lg:w-[60%] flex flex-col gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3 px-2">
                <LayoutGrid size={18} className="text-teal-400" />
                <h3 className="unb text-sm font-bold uppercase tracking-widest italic">
                  Saved Stories
                </h3>
              </div>

              <Carousel className="w-full">
                <CarouselContent className="-ml-4">
                  {posts.length > 0 ? (
                    posts.map((post) => (
                      <CarouselItem
                        key={post.id}
                        className="pl-4 basis-full md:basis-1/2"
                      >
                        <div className="carousel-card rounded-[2rem] overflow-hidden flex flex-col h-full p-4">
                          <img
                            src={post.images[0]}
                            alt="Post"
                            className="w-full h-40 object-cover rounded-2xl mb-4"
                          />
                          <div className="flex items-center gap-3 mb-3">
                            <img
                              src={post.user?.profilePic}
                              className="w-6 h-6 rounded-full border border-teal-500/30"
                            />
                            <span className="unb text-[10px] font-bold uppercase text-white/50">
                              {post.user.username}
                            </span>
                          </div>
                          <p className="mono text-[10px] text-white/30 line-clamp-2 uppercase leading-relaxed">
                            {post.caption}
                          </p>
                        </div>
                      </CarouselItem>
                    ))
                  ) : (
                    <div className="w-full p-10 text-center mono text-[10px] text-white/10 uppercase tracking-widest">
                      No saved stories
                    </div>
                  )}
                </CarouselContent>
                <div className="flex gap-2 mt-4 justify-end">
                  <CarouselPrevious className="static translate-y-0 bg-white/5 border-white/10 text-white hover:bg-teal-500 hover:text-black transition-all" />
                  <CarouselNext className="static translate-y-0 bg-white/5 border-white/10 text-white hover:bg-teal-500 hover:text-black transition-all" />
                </div>
              </Carousel>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3 px-2">
                <Map size={18} className="text-teal-400" />
                <h3 className="unb text-sm font-bold uppercase tracking-widest italic">
                  Saved Roadmaps
                </h3>
              </div>

              <Carousel className="w-full">
                <CarouselContent className="-ml-4">
                  {maps.length > 0 ? (
                    maps.map((map) => (
                      <CarouselItem
                        key={map.id}
                        className="pl-4 basis-full md:basis-1/2"
                      >
                        <div className="carousel-card rounded-[2rem] p-6 h-full flex flex-col">
                          <div className="flex justify-between items-start mb-4">
                            <h4 className="unb text-xs font-bold leading-tight line-clamp-2 group-hover:text-teal-400 transition-colors">
                              {map.title}
                            </h4>
                            <span className="mono text-[8px] bg-teal-500/10 text-teal-400 px-2 py-1 rounded-full uppercase">
                              {map.levelFrom}
                            </span>
                          </div>
                          <p className="mono text-[10px] text-white/30 line-clamp-3 mb-6 flex-1">
                            {map.description}
                          </p>
                          <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                            <span className="mono text-[8px] text-white/20 uppercase tracking-widest">
                              {map.learningSections?.length || 0} Sections
                            </span>
                            <Bookmark size={14} className="text-teal-400/50" />
                          </div>
                        </div>
                      </CarouselItem>
                    ))
                  ) : (
                    <div className="w-full p-10 text-center mono text-[10px] text-white/10 uppercase tracking-widest">
                      No saved roadmaps
                    </div>
                  )}
                </CarouselContent>
                <div className="flex gap-2 mt-4 justify-end">
                  <CarouselPrevious className="static translate-y-0 bg-white/5 border-white/10 text-white hover:bg-teal-500 hover:text-black transition-all" />
                  <CarouselNext className="static translate-y-0 bg-white/5 border-white/10 text-white hover:bg-teal-500 hover:text-black transition-all" />
                </div>
              </Carousel>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}

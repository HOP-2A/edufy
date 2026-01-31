"use client";

import Footer from "@/app/_components/Footer";
import Sidebar from "@/app/_components/SideBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TrendingUp, Plus, Search, BookOpen, ArrowUpRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";

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
  const [searchQuery, setSearchQuery] = useState("");
  const { userId, isLoaded } = useAuth();
  const router = useRouter();

  const [roadmap, setRoadmap] = useState<Roadmap[]>([]); // ✅ default to []
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch user
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
        setError(err instanceof Error ? err.message : "An error occurred");
      }
    };

    fetchUser();
  }, [isLoaded, userId]);

  // Fetch roadmap after user is loaded
  useEffect(() => {
    if (!user?.id) return;

    const fetchRoadmap = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/getroadmapinfo/${user.id}`);
        if (!res.ok) throw new Error("Failed to fetch roadmap");
        const data = await res.json();
        setRoadmap(data ?? []); // ✅ default to empty array
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmap();
  }, [user?.id]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <div className="flex flex-1">
        <Sidebar />

        <div className="flex-1 flex flex-col min-h-screen p-6 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 -z-10 w-full h-full">
            <div className="absolute top-[-10%] right-[-5%] w-150 h-150 bg-blue-100/30 rounded-full blur-[120px]" />
            <div className="absolute bottom-[20%] left-[-5%] w-100 h-100 bg-indigo-100/20 rounded-full blur-[100px]" />
          </div>

          <div className="max-w-6xl mx-auto w-full space-y-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-black uppercase tracking-widest border border-blue-100">
                  <TrendingUp className="w-3 h-3" /> Community Hub
                </div>
                <h1 className="text-4xl font-black text-slate-900 tracking-tight">
                  Explore Courses
                </h1>
                <p className="text-slate-500 text-lg">
                  Discover AI-generated curricula created by the community.
                </p>
              </div>
              <Button
                className="h-14 px-8 bg-slate-900 hover:bg-blue-600 text-white font-bold rounded-2xl transition-all shadow-xl hover:shadow-blue-200 active:scale-95"
                onClick={() => router.push("create/roadmap")}
              >
                <Plus className="mr-2 h-5 w-5 stroke-[3px]" />
                Create
              </Button>
            </div>

            <div className="flex flex-col lg:flex-row gap-4 items-center">
              <div className="relative w-full group">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                <Input
                  placeholder="Search through courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-14 h-16 bg-white border-slate-200 rounded-2xl shadow-sm text-lg focus-visible:ring-blue-500 transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {roadmap.length === 0 && !loading && (
                <p className="text-slate-500 col-span-full text-center">
                  No courses available.
                </p>
              )}
              {roadmap.map((course) => (
                <div
                  key={course.id} // ✅ use stable ID
                  className="group relative bg-white border border-slate-200 p-8 rounded-[2rem] shadow-sm hover:shadow-xl hover:shadow-blue-900/5 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between min-h-55"
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                        <BookOpen className="w-6 h-6" />
                      </div>
                      <ArrowUpRight className="w-5 h-5 text-slate-300 group-hover:text-blue-600 transition-colors" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors">
                      {course.title}
                    </h3>
                  </div>

                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-linear-to-r from-blue-500 to-indigo-500 rounded-full group-hover:w-1/2 transition-all duration-500" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

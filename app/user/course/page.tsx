"use client";

import Footer from "@/app/_components/Footer";
import Sidebar from "@/app/_components/SideBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  TrendingUp,
  Plus,
  Search,
  BookOpen,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
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
  const [roadmapId, setRoadmapId] = useState<Roadmap[]>(); // ✅ default to []
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    if (!user?.id) return;

    const fetchRoadmap = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/getroadmapbyuserId/${user.id}`);
        if (!res.ok) throw new Error("Failed to fetch roadmap");
        const data = await res.json();

        setRoadmapId(data);
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmap();
  }, [user?.id]);

  useEffect(() => {
    if (!roadmapId) return;

    const fetchRoadmap = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/getroadmapinfo/${roadmapId?.[0]?.id}`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();

        setRoadmap(data ? [data] : []);
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmap();
  }, [roadmapId]);
  if (!isLoaded || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-slate-500 text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <div className="flex flex-1">
        <Sidebar />

        <div className="flex-1 flex flex-col min-h-screen p-6 md:p-12 relative overflow-hidden">
          {/* Background blur elements */}
          <div className="absolute top-0 right-0 -z-10 w-full h-full">
            <div className="absolute top-[-10%] right-[-5%] w-150 h-150 bg-blue-100/30 rounded-full blur-[120px]" />
            <div className="absolute bottom-[20%] left-[-5%] w-100 h-100 bg-indigo-100/20 rounded-full blur-[100px]" />
          </div>

          {/* Header */}
          <div className="max-w-6xl mx-auto w-full space-y-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div className="space-y-2">
                <h1 className="text-4xl font-black tracking-tight text-slate-900">
                  Library
                </h1>
                <p className="text-lg text-slate-500">Explore your roadmaps.</p>
              </div>

              <Button
                className="h-14 px-8 rounded-2xl bg-slate-900 text-white font-bold shadow-xl transition-all hover:bg-blue-600 active:scale-95"
                onClick={() => router.push("create/roadmap")}
              >
                <Plus className="mr-2 h-5 w-5 stroke-[3px]" />
                Create New
              </Button>
            </div>

            {/* Search */}
            <div className="group relative w-full">
              <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-blue-500" />
              <Input
                className="h-16 rounded-2xl border-slate-200 bg-white pl-14 text-lg shadow-sm transition-all focus-visible:ring-blue-500"
                placeholder="search a roadmap"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 mt-8 max-w-6xl mx-auto w-full">
            {loading ? (
              <p className="text-center text-slate-500 mt-20">
                Loading roadmaps...
              </p>
            ) : roadmap.length === 0 ? (
              <div className="flex min-h-[70vh] w-full flex-col items-center justify-center rounded-[3rem] border-2 border-dashed border-slate-200 bg-white/60 p-20 text-center backdrop-blur-sm">
                <div className="relative mb-10">
                  <div className="absolute inset-0 bg-blue-400 opacity-20 blur-3xl" />
                  <div className="relative flex h-32 w-32 rotate-3 items-center justify-center rounded-[2.5rem] border border-blue-100 bg-blue-50 text-blue-500">
                    <Sparkles className="h-14 w-14" />
                  </div>
                </div>

                <h2 className="mb-6 text-4xl font-extrabold text-slate-900">
                  No roadmaps found
                </h2>

                <Button
                  className="h-18 rounded-2xl bg-slate-900 px-14 text-xl font-bold text-white shadow-xl transition-all hover:bg-blue-600 active:scale-95"
                  onClick={() => router.push("create/roadmap")}
                >
                  Create your first roadmap
                </Button>
              </div>
            ) : (
              // Roadmaps grid
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {roadmap.map((course) => (
                  <div
                    key={course.id}
                    className="group relative bg-white border border-slate-200 p-8 rounded-[2rem] shadow-sm hover:shadow-xl hover:shadow-blue-900/5 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between min-h-55 cursor-pointer"
                    onClick={() => router.push(`create/course?id=${course.id}`)}
                  >
                    <h3 className="text-xl font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-slate-500 mt-2">{course.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

"use client";

import Sidebar from "@/app/_components/SideBar";
import { useEffect, useState } from "react";
import { BookOpen, Trophy, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

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
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <main className="flex-1 p-8">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-slate-800">
            Нээлттэй Roadmap-ууд
          </h1>
          <p className="text-slate-500 mt-2">
            Өөрийн сонирхсон чиглэлээр суралцах замаа сонгоорой.
          </p>
        </header>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="h-64 bg-slate-200 animate-pulse rounded-2xl"
              ></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roadmaps.map((item) => (
              <div
                key={item.id}
                className="group bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <BookOpen size={24} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-slate-100 text-slate-600 rounded-md">
                    {item.levelFrom || "Beginner"}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-800 mb-2 line-clamp-1">
                  {item.title}
                </h3>

                <p className="text-slate-600 text-sm line-clamp-2 mb-6 min-h-[40px]">
                  {item.description ||
                    "Энэхүү roadmap-ийн тайлбар одоогоор байхгүй байна."}
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm text-slate-500">
                    <Trophy size={16} className="mr-2 text-yellow-500" />
                    <span>Зорилго: {item.purpose}</span>
                  </div>
                  <div className="flex items-center text-sm text-slate-500">
                    <Clock size={16} className="mr-2 text-blue-500" />
                    <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <Link href={`/user/course?id=${item.id}`}>
                  <button className="w-full py-3 px-4 bg-slate-900 text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors">
                    Үзэж эхлэх
                    <ArrowRight size={18} />
                  </button>
                </Link>
              </div>
            ))}
          </div>
        )}

        {!loading && roadmaps.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
            <p className="text-slate-400 text-lg">
              Одоогоор нийтлэгдсэн roadmap алга.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

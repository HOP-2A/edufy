"use client";
import { Button } from "@/components/ui/button";
import Footer from "../_components/Footer";
import Sidebar from "../_components/SideBar";
<<<<<<< HEAD
import Questions from "../_components/mainPageQuestions";
import CallYourRM from "../_components/CallYourRM";
=======
import { useProvider } from "../providers/AuthProviders";
<<<<<<< HEAD
import { useRouter } from "next/navigation";

>>>>>>> f6ceae3 (P)
=======
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { LearningSection } from "@prisma/client";
interface Roadmap {
  id: string;
  title: string;
  description: string;
  levelFrom: string;
  levelTo: string;
  purpose: string;
  learningSections: LearningSection[];
}
const getLevelNumber = (level: string) => {
  return Number(level.match(/\d+/)?.[0] ?? 0);
};
>>>>>>> 88b84d9 (P)
export default function Home() {
  const { user } = useProvider();
  const router = useRouter();
  const [data, setData] = useState();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchRoadmap = async () => {
      try {
        const res = await fetch(`/api/getroadmapinfo/${id}`);
        if (!res.ok) throw new Error("Failed to fetch roadmap");
        const idk = await res.json();

        const sortedData = {
          ...idk,
          learningSections: [...idk.learningSections].sort(
            (a: LearningSection, b: LearningSection) =>
              getLevelNumber(a.level) - getLevelNumber(b.level),
          ),
        };

        setData(sortedData);
      } catch (err) {
        console.error("Error:", err);
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmap();
  }, [id]);
  console.log(data);
  return (
    <div className="flex min-h-screen bg-[#fafafa] text-[#1a1a1a] selection:bg-black selection:text-white">
      <aside className="w-64 fixed inset-y-0 z-50 border-r border-gray-200 bg-white">
        <Sidebar />
      </aside>

      <main className="flex-1 ml-64 flex flex-col">
        <div className="p-12 lg:p-16 grow">
          <div className="max-w-4xl mx-auto">
            <header className="mb-16 space-y-2">
              <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400">
                <span className="w-8 h-px bg-gray-300"></span>
                Dashboard
              </div>
              <h1 className="text-5xl font-light tracking-tight text-black">
                Сайн байна уу, {user?.username}{" "}
                <span className="font-medium"></span>
              </h1>
              <p className="text-gray-500 text-lg font-light tracking-wide">
                Өнөөдрийн хичээл болон асуултууддаа төвлөрөх цаг.
              </p>
            </header>
            <div className="relative overflow-hidden rounded-2xl bg-linear-to-r from-slate-900 via-slate-800 to-slate-900 p-6 lg:p-8">
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <h1 className="text-2xl lg:text-3xl font-semibold text-white mb-2 text-balance">
                    Өөрийн карьерийн замыг төлөвлө
                  </h1>
                  <p className="text-slate-300 text-base max-w-lg mb-4">
                    AI-тай хамтран хувийн roadmap үүсгэж, зорилгодоо хүрэх
                    алхмуудыг тодорхойл.
                  </p>
                  <Button
                    className="bg-white text-slate-900 hover:bg-slate-100"
                    onClick={() => router.push("/create/roadmap")}
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                    Шинэ Roadmap үүсгэх
                  </Button>
                </div>
              </div>
            </div>

<<<<<<< HEAD
=======
            <div>
              {" "}
              <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-bl from-white/5 to-transparent rounded-full blur-2xl" />
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-linear-to-tl from-blue-500/20 to-transparent rounded-full blur-xl" />
              <svg
                className="absolute right-8 top-1/2 -translate-y-1/2 w-32 h-32 text-white/5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={0.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                />
              </svg>
            </div>

            <section className="relative">
              <div className="text-5xl">
                <div>Төлөвлөгөний ахиц </div>
              </div>
<<<<<<< HEAD
              <div className="rounded-xl border outline">hello</div>
>>>>>>> f6ceae3 (P)
=======
              <div className="rounded-xl border outline h-[30vh] "></div>
>>>>>>> 88b84d9 (P)
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-size-[16px_16px] -z-10 opacity-50"></div>
            </section>
          </div>
        </div>
<<<<<<< HEAD
        <div className="flex justify-center mb-30">
          <CallYourRM />
        </div>
=======
>>>>>>> f6ceae3 (P)
        <footer className="px-12 py-8 border-t border-gray-100 bg-white/50">
          <Footer />
        </footer>
      </main>
      <style>
        <div className="rounded-xl border outline border-indigo-500 bg-indigo-500"></div>
      </style>
    </div>
  );
}

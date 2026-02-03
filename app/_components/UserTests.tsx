"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Plus, Search, Sparkles } from "lucide-react";

export default function UserTests() {
  const router = useRouter();

  return (
    <div>
      <div className="relative flex flex-1 flex-col p-6 md:p-12 overflow-hidden">
        <div className="absolute top-0 right-0 -z-10 h-125 w-125 rounded-full bg-blue-100/50 blur-[120px]" />
        <div className="absolute bottom-0 left-0 -z-10 h-100 w-100 rounded-full bg-indigo-50/50 blur-[100px]" />

        <div className="mx-auto w-full max-w-6xl space-y-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-2">
              <h1 className="text-4xl font-black tracking-tight text-slate-900">
                Library
              </h1>
              <p className="text-lg text-slate-500">Explore your tests.</p>
            </div>

            <Button className="h-14 px-8 rounded-2xl bg-slate-900 text-white font-bold shadow-xl transition-all hover:bg-blue-600 active:scale-95">
              <Plus className="mr-2 h-5 w-5 stroke-[3px]" />
              Create New
            </Button>
          </div>

          <div className="group relative w-full">
            <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-blue-500" />
            <Input
              className="h-16 rounded-2xl border-slate-200 bg-white pl-14 text-lg shadow-sm transition-all focus-visible:ring-blue-500"
              placeholder="search for a test"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col px-6 pb-12">
        <div className="mx-auto w-full max-w-6xl flex-1">
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
              onClick={() => router.push("/create/test")}
            >
              Create your first test
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

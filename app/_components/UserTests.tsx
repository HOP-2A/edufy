"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function UserTests() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <div className="relative flex flex-col p-6 md:p-12 overflow-hidden">
        <div className="absolute top-0 right-0 -z-10 h-125 w-125 rounded-full bg-black/[0.01] blur-[120px]" />
        <div className="absolute bottom-0 left-0 -z-10 h-100 w-100 rounded-full bg-black/[0.01] blur-[100px]" />

        <div className="mx-auto w-full max-w-6xl space-y-12">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-black/[0.06] text-[10px] font-black uppercase tracking-[0.2em] text-black/40 shadow-sm">
                <Sparkles size={11} /> Personal Library
              </div>
              <h1 className="text-5xl md:text-6xl font-[1000] tracking-[-0.05em] text-black">
                Library
              </h1>
              <p className="text-lg font-bold text-black/40 tracking-tight">
                Explore and manage your learning paths.
              </p>
            </div>

            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={() => router.push("create/test")}
                className="
      group relative h-16 px-10 
      bg-black text-white 
      rounded-[2rem] border border-black/5
      transition-all duration-500 ease-out
      hover:bg-black/80 hover:shadow-[0_30px_60px_rgba(0,0,0,0.12)]
      active:shadow-[0_10px_20px_rgba(0,0,0,0.1)]
    "
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
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
              className="h-16 rounded-[2rem] border-black/[0.08] bg-white pl-16 text-lg font-bold shadow-sm transition-all focus-visible:ring-black/5 placeholder:text-black/10"
              placeholder="Search for a test..."
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col px-6 pb-12">
        <div className="mx-auto w-full max-w-6xl">
          <div className="flex min-h-[50vh] w-full flex-col items-center justify-center rounded-[3rem] border border-black/[0.04] bg-white p-20 text-center shadow-[0_40px_80px_rgba(0,0,0,0.02)]">
            <div className="relative mb-8">
              <div className="relative flex h-24 w-24 items-center justify-center rounded-[2rem] bg-black/[0.02] border border-black/[0.05] text-black/20">
                <Sparkles className="h-10 w-10" />
              </div>
            </div>

            <h2 className="mb-4 text-3xl font-[1000] text-black tracking-tighter">
              No tests found
            </h2>
            <p className="mb-8 text-black/40 font-bold max-w-xs mx-auto">
              Your library is currently empty. Start by creating your first
              knowledge test.
            </p>

            <Button
              className="h-14 rounded-full bg-black/[0.05] hover:bg-black hover:text-white px-10 text-xs font-black uppercase tracking-widest text-black transition-all duration-500"
              onClick={() => router.push("create/test")}
            >
              Create your first test
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

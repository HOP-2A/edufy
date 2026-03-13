"use client";

import {
  SignedIn,
  SignedOut,
  UserButton,
  RedirectToSignUp,
} from "@clerk/nextjs";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  return (
    <div className="min-h-screen  flex flex-col items-center justify-center p-6 selection:bg-black selection:text-white">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[10%] left-[10%] w-[40%] h-[40%] bg-black/[0.01] rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[10%] w-[30%] h-[30%] bg-black/[0.02] rounded-full blur-[100px]" />
      </div>

      <SignedOut>
        <RedirectToSignUp />
      </SignedOut>

      <SignedIn>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-md w-full text-center space-y-12"
        >
          <div className="space-y-4 flex flex-col items-center">
            <div className="w-20 h-20 bg-black rounded-[30px] flex items-center justify-center text-white shadow-2xl rotate-3 mb-6">
              <Sparkles size={32} />
            </div>
            <h1 className="text-5xl font-black tracking-tighter uppercase italic leading-none">
              Edufy<span className="text-black/10">.</span>
            </h1>
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-black/20">
              Personal Learning AI
            </p>
          </div>

          <div className="p-10 rounded-[40px] border border-black/[0.05] bg-black/[0.01] space-y-8">
            <div className="flex flex-col items-center gap-4">
              <div className="p-1 rounded-full border-2 border-black/5">
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "h-16 w-16",
                    },
                  }}
                />
              </div>
              <div className="space-y-1">
                <h2 className="text-xl font-black uppercase tracking-tight italic">
                  Та нэвтэрсэн байна
                </h2>
                <p className="text-xs font-bold text-black/30 uppercase tracking-widest">
                  Систем таныг чиглүүлж байна...
                </p>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push("/mainMenu")}
              className="w-full h-16 bg-black text-white rounded-full font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-3 shadow-xl"
            >
              Үргэлжлүүлэх <ArrowRight size={16} />
            </motion.button>
          </div>

          <div className="text-[9px] font-black uppercase tracking-[0.4em] text-black/10">
            Securely Managed by Clerk
          </div>
        </motion.div>
      </SignedIn>
    </div>
  );
};

export default Page;

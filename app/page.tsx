"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen text-white font-sans flex flex-col selection:bg-[#0c463f] selection:text-[#4fffb0]">
      <header className="fixed top-0 w-full z-50 p-6 backdrop-blur-sm bg-black/5">
        <div className="max-w-7xl mx-auto flex justify-between items-end">
          <div className="text-4xl font-black tracking-tighter italic cursor-pointer hover:text-emerald-400 transition-colors">
            EDUFY<span className="text-emerald-500">.</span>
          </div>

          <nav className="flex gap-12 items-center">
            <div className="hidden md:flex gap-8 text-[11px] font-bold uppercase tracking-[0.4em] text-emerald-100/40">
              {["Courses", "Resources", "Community"].map((item) => (
                <Link
                  key={item}
                  href={"/signIn"}
                  className="hover:text-white transition-all hover:tracking-[0.5em]"
                >
                  {item}
                </Link>
              ))}
            </div>

            <button
              onClick={() => router.push("/signIn")}
              className="w-12 h-12 bg-white rounded-full flex items-center justify-center group transition-all hover:scale-110 hover:bg-emerald-400 active:scale-90 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
            >
              <svg
                className="w-5 h-5 text-black group-hover:rotate-12 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </button>
          </nav>
        </div>
      </header>

      <main className="flex-grow flex flex-col">
        {/* Hero Section */}
        <section className="h-screen flex flex-col justify-center px-8 relative overflow-hidden">
          <div className="max-w-7xl mx-auto w-full relative">
            <div className="absolute -top-40 -right-20 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[12vw] md:text-[10vw] font-black leading-[0.85] tracking-[-0.05em] uppercase"
            >
              Master <br />
              <span className="text-transparent stroke-text leading-none opacity-80">
                The Craft.
              </span>
            </motion.h1>

            <div className="mt-12 flex flex-col md:flex-row justify-between items-end gap-8">
              <p className="max-w-md text-emerald-100/50 text-2xl font-light leading-relaxed">
                The platform revolutionizing the modern education system. <br />
                <span className="text-white font-medium italic decoration-emerald-500/50 underline underline-offset-8">
                  — Architect your own future.
                </span>
              </p>

              <div className="flex flex-col items-end group">
                <span className="text-[11px] font-mono text-emerald-500/40 mb-2 tracking-[0.3em] uppercase group-hover:text-emerald-400 transition-colors">
                  Scroll to explore
                </span>
                <div className="w-px h-12 bg-gradient-to-b from-emerald-500/50 to-transparent" />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-6 py-32 bg-white/5 backdrop-blur-md rounded-t-[60px] border-t border-white/10 shadow-[0_-20px_50px_rgba(0,0,0,0.3)]">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Journey Card */}
              <div
                onClick={() => router.push("/signIn")}
                className="md:col-span-8 group relative h-[550px] bg-[#08332e]/40 border border-white/5 rounded-[40px] overflow-hidden p-12 flex flex-col justify-between transition-all duration-700 hover:border-emerald-500/30 cursor-pointer"
              >
                <div className="text-emerald-500/20 font-mono text-xl">/01</div>
                <h2 className="text-8xl font-black text-white leading-none tracking-tighter group-hover:text-emerald-50">
                  START <br />
                  JOURNEY
                </h2>
                <div className="flex justify-between items-end relative z-10">
                  <p className="text-emerald-100/40 max-w-xs text-lg">
                    Access elite content and begin your personal growth
                    evolution today.
                  </p>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="text-black bg-emerald-400 px-10 py-5 rounded-full font-bold shadow-[0_10px_30px_rgba(52,211,153,0.3)]"
                  >
                    EXPLORE NOW
                  </motion.div>
                </div>

                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none" />
              </div>

              {/* Share Knowledge Card */}
              <div className="md:col-span-4 group h-[550px] bg-white/5 border border-white/10 rounded-[40px] p-10 flex flex-col justify-between hover:bg-white/10 transition-all cursor-pointer">
                <div className="relative">
                  <motion.div
                    className="w-24 h-24 bg-emerald-500 rounded-3xl flex items-center justify-center text-black shadow-2xl shadow-emerald-500/20"
                    whileHover={{
                      rotate: 180,
                      scale: 1.1,
                      borderRadius: "50px",
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    <svg
                      className="w-12 h-12"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </motion.div>
                </div>
                <div>
                  <h3 className="text-4xl font-black mb-4 tracking-tighter uppercase leading-[0.9] text-emerald-50">
                    Share Your <br /> Knowledge
                  </h3>
                  <div className="flex items-center gap-3">
                    <p className="text-emerald-100/30 font-medium">
                      Become a certified instructor.
                    </p>
                    <div className="h-[1px] flex-grow bg-white/10 group-hover:bg-emerald-500/50 transition-all" />
                  </div>
                </div>
              </div>

              {/* Workflow Card */}
              <div className="md:col-span-12 group h-[400px] bg-[#08332e]/30 border border-white/10 rounded-[50px] p-16 flex flex-col md:flex-row items-center justify-between overflow-hidden relative transition-all duration-500 hover:border-emerald-500/40 cursor-pointer shadow-2xl">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />

                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="mono text-[10px] text-emerald-500 tracking-[0.4em] uppercase">
                      Efficiency
                    </span>
                    <div className="h-px w-8 bg-emerald-500/30" />
                  </div>
                  <h3 className="text-7xl font-black text-white tracking-tighter uppercase italic leading-none group-hover:text-emerald-50 transition-colors">
                    Workflow
                  </h3>
                  <p className="text-emerald-100/40 mt-6 text-xl font-light">
                    Everything centralized,{" "}
                    <span className="text-emerald-500/60 italic font-medium">
                      perfectly organized.
                    </span>
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 relative z-10 mt-12 md:mt-0 justify-center">
                  {["TASKS", "GRAPHS", "GOALS"].map((label) => (
                    <motion.div
                      key={label}
                      whileHover={{
                        y: -5,
                        backgroundColor: "rgba(16, 185, 129, 0.1)",
                      }}
                      className="px-10 py-4 border border-white/5 bg-white/5 backdrop-blur-md rounded-2xl text-[11px] font-bold tracking-[0.3em] text-emerald-100/60 hover:text-emerald-400 hover:border-emerald-500/30 transition-all duration-300"
                    >
                      {label}
                    </motion.div>
                  ))}
                </div>

                <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-emerald-500/[0.03] blur-[100px] rounded-full group-hover:bg-emerald-500/[0.07] transition-all duration-1000" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <style jsx>{`
        .stroke-text {
          -webkit-text-stroke: 1px rgba(167, 243, 208, 0.3);
        }
      `}</style>
    </div>
  );
}

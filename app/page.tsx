"use client";

import Link from "next/link";
import Footer from "./_components/Footer";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans flex flex-col selection:bg-white selection:text-black">
      <header className="fixed top-0 w-full z-50 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-end">
          <div className="text-4xl font-black tracking-tighter italic mix-blend-difference cursor-pointer">
            EDUFY.
          </div>

          <nav className="flex gap-12 items-center">
            <div className="hidden md:flex gap-8 text-[11px] font-bold uppercase tracking-[0.4em] text-gray-500">
              {["Course", "Resources", "Community"].map((item) => (
                <Link
                  key={item}
                  href={"/signIn"}
                  className="hover:text-white transition-colors"
                >
                  {item}
                </Link>
              ))}
            </div>

            <button
              onClick={() => router.push("/signIn")}
              className="w-12 h-12 bg-white rounded-full flex items-center justify-center group transition-transform hover:scale-110 active:scale-90 shadow-2xl"
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
        <section className="h-screen flex flex-col justify-center px-8 relative overflow-hidden">
          <div className="max-w-7xl mx-auto w-full relative">
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/5 rounded-full blur-[100px]" />
            <h1 className="text-[12vw] md:text-[10vw] font-black leading-[0.85] tracking-[-0.05em] uppercase">
              Master <br />
              <span className="text-transparent stroke-text leading-none">
                The Craft.
              </span>
            </h1>

            <div className="mt-12 flex flex-col md:flex-row justify-between items-end gap-8">
              <p className="max-w-md text-gray-400 text-2xl font-light leading-relaxed">
                Боловсролын системд хувьсгал хийж буй платформ. <br />
                <span className="text-white font-medium italic">
                  — Ирээдүйгээ өөрөө бүтээ.
                </span>
              </p>

              <div className="flex flex-col items-end group cursor-none">
                <span className="text-[14px] font-mono text-gray-600 mb-2 group-hover:text-white transition-colors">
                  SCROLL TO EXPLORE
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-32 bg-white text-black rounded-t-[60px] shadow-[0_-50px_100px_rgba(0,0,0,0.5)]">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div
                onClick={() => router.push("/signIn")}
                className="md:col-span-8 group relative h-[550px] bg-black rounded-[40px] overflow-hidden p-12 flex flex-col justify-between transition-all duration-700 hover:rounded-[100px] cursor-pointer"
              >
                <div className="text-white/20 font-mono text-xl">/01</div>
                <h2 className="text-8xl font-black text-white leading-none tracking-tighter">
                  START <br />
                  JOURNEY
                </h2>
                <div className="flex justify-between items-end relative z-10">
                  <p className="text-gray-500 max-w-xs text-lg">
                    Хамгийн шилдэг контентуудыг үзэж, өөрийгөө хөгжүүлж эхэл.
                  </p>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="text-black bg-white px-10 py-5 rounded-full font-bold shadow-xl"
                  >
                    EXPLORE NOW
                  </motion.div>
                </div>

                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-white/[0.05] to-transparent pointer-events-none" />
              </div>

              <div className="md:col-span-4 group h-[550px] bg-[#f2f2f2] rounded-[40px] p-10 flex flex-col justify-between border border-transparent hover:border-black transition-all cursor-pointer overflow-hidden">
                <div className="relative">
                  <motion.div
                    className="w-24 h-24 bg-black rounded-3xl flex items-center justify-center text-white shadow-2xl"
                    whileHover={{
                      rotate: 360,
                      scale: 1.1,
                      borderRadius: "48px",
                    }}
                    transition={{ duration: 0.8, ease: "backInOut" }}
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
                  <h3 className="text-4xl font-black mb-4 tracking-tighter uppercase leading-[0.9]">
                    Share Your <br />
                    Knowledge
                  </h3>
                  <div className="flex items-center gap-3">
                    <p className="text-gray-500 font-medium">
                      Багш болох эхний алхам.
                    </p>
                    <div className="h-[1px] flex-grow bg-black/10 group-hover:bg-black transition-all" />
                  </div>
                </div>
              </div>

              <div className="md:col-span-12 group h-[400px] bg-[#0a0a0a] rounded-[50px] p-16 flex flex-col md:flex-row items-center justify-between overflow-hidden relative border border-white/5 hover:border-white/20 transition-all cursor-pointer shadow-2xl">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />

                <div className="relative z-10">
                  <h3 className="text-7xl font-black text-white tracking-tighter uppercase italic leading-none">
                    Workflow
                  </h3>
                  <p className="text-gray-400 mt-4 text-xl">
                    Бүх зүйл нэг дор, эмх цэгцтэй.
                  </p>
                </div>

                <div className="flex gap-6 relative z-10 mt-12 md:mt-0">
                  {["TASKS", "GRAPHS", "GOALS"].map((label, idx) => (
                    <motion.div
                      key={label}
                      animate={{ y: [0, -20, 0] }}
                      transition={{
                        repeat: Infinity,
                        duration: 3,
                        delay: idx * 0.5,
                      }}
                      className="px-10 py-4 border border-white/10 rounded-[30px] text-sm font-bold tracking-widest text-white hover:bg-white hover:text-black transition-all shadow-[0_0_20px_rgba(255,255,255,0.05)]"
                    >
                      {label}
                    </motion.div>
                  ))}
                </div>

                <div className="absolute -right-20 -bottom-20 w-80 h-80 border border-white/[0.03] rounded-full group-hover:scale-150 transition-transform duration-1000" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <style jsx>{`
        .stroke-text {
          -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
}

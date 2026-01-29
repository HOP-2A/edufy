import Link from "next/link";
import Footer from "./_components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden text-[#213448]">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute w-[700px] h-[700px] bg-[#87C4FF] rounded-full blur-[150px] opacity-30 -top-40 -left-20 animate-pulse"></div>
          <div
            className="absolute w-[600px] h-[600px] bg-[#547792] rounded-full blur-[130px] opacity-20 -bottom-20 -right-20 animate-pulse"
            style={{ animationDelay: "4s" }}
          ></div>

          <div className="absolute top-[10%] left-[5%] w-20 h-20 border-4 border-[#87C4FF]/30 rounded-2xl rotate-45 animate-[spin_10s_linear_infinite] blur-[1px]"></div>

          <div
            className="absolute top-[15%] right-[10%] w-32 h-32 bg-gradient-to-br from-[#87C4FF]/20 to-transparent rounded-full animate-bounce blur-sm"
            style={{ animationDuration: "7s" }}
          ></div>

          <div className="absolute top-1/2 left-[8%] w-4 h-4 bg-[#87C4FF]/50 rounded-full animate-ping"></div>

          <div className="absolute top-[40%] left-[45%] w-64 h-64 bg-[#87C4FF]/10 rounded-full blur-3xl animate-pulse"></div>

          <div className="absolute top-[50%] right-[12%] w-40 h-[2px] bg-gradient-to-r from-transparent via-[#87C4FF]/40 to-transparent rotate-[30deg]"></div>

          <div
            className="absolute bottom-[15%] left-[12%] w-24 h-24 border border-[#87C4FF]/40 rounded-full flex items-center justify-center animate-bounce"
            style={{ animationDuration: "9s" }}
          >
            <div className="w-16 h-16 border border-[#87C4FF]/20 rounded-full"></div>
          </div>

          <div className="absolute bottom-[20%] right-[5%] w-16 h-16 bg-[#87C4FF]/40 rounded-lg -rotate-12 animate-pulse blur-[1px]"></div>

          <div className="absolute top-[5%] left-1/2 w-1.5 h-1.5 bg-[#87C4FF] rounded-full shadow-[0_0_10px_#87C4FF]"></div>
          <div className="absolute top-[80%] left-[40%] w-2 h-2 bg-[#87C4FF]/60 rounded-full shadow-[0_0_8px_#87C4FF]"></div>
        </div>
      </div>

      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/90 border-b border-[#87C4FF]/30 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 h-24 flex justify-between items-center">
          <div className="text-5xl font-black bg-gradient-to-r from-[#213448] to-[#87C4FF] bg-clip-text text-transparent">
            Edufy
          </div>
          <nav className="hidden md:flex gap-8 items-center">
            <Link href="/Courses">
              <div className="text-[#213448] font-semibold hover:text-[#87C4FF] transition-all relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-[#87C4FF] hover:after:w-full after:transition-all after:duration-300 pointer-events-auto">
                Courses
              </div>
            </Link>
            <Link href="/Resources">
              <div className="text-[#213448] font-semibold hover:text-[#87C4FF] transition-all relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-[#87C4FF] hover:after:w-full after:transition-all after:duration-300 pointer-events-auto">
                Resources
              </div>
            </Link>
            <Link href="/Community">
              <div className="text-[#213448] font-semibold hover:text-[#87C4FF] transition-all relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-[#87C4FF] hover:after:w-full after:transition-all after:duration-300 pointer-events-auto">
                Community
              </div>
            </Link>
            <Link href="/signIn">
              <button className="px-6 py-2.5 bg-[#87C4FF] rounded-full text-white font-bold shadow-md hover:shadow-[#87C4FF]/40 hover:-translate-y-1 transition-all duration-300 pointer-events-auto">
                Get Started
              </button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="relative z-10">
        <section className="px-6 py-20 md:py-32 text-center">
          <h1 className="text-6xl md:text-8xl font-black mb-8 bg-gradient-to-r from-[#213448] via-[#547792] to-[#87C4FF] bg-clip-text text-transparent leading-tight drop-shadow-sm">
            Learn Anything
            <br />
            <span className="text-[#87C4FF]">Master Everything</span>
          </h1>
          <p className="text-xl md:text-2xl text-[#547792]/80 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
            From science to arts, business to languages - unlock your potential
            with expert-led courses and interactive learning experiences.
          </p>

          <section className="relative px-6 py-20">
            <div className="max-w-5xl mx-auto bg-white/40 backdrop-blur-2xl md:p-20 p-10 rounded-[3rem] border-2 border-[#87C4FF]/40 shadow-xl text-center relative overflow-hidden group hover:border-[#87C4FF] transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-[#87C4FF]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#87C4FF]/20 rounded-full blur-3xl group-hover:bg-[#87C4FF]/40 transition-all duration-700"></div>

              <div className="relative z-10">
                <h2 className="text-4xl md:text-6xl font-black text-[#213448] mb-6 leading-tight">
                  Ready to Start Your Journey?
                </h2>
                <p className="text-xl md:text-2xl text-[#547792] mb-4 font-medium">
                  Join thousands of learners mastering new skills every day
                </p>

                <button className="px-14 py-5 bg-[#87C4FF] rounded-full text-white font-bold text-xl shadow-[0_10px_25px_rgba(135,196,255,0.5)] hover:shadow-[0_20px_50px_rgba(135,196,255,0.8)] hover:-translate-y-2 hover:scale-[1.05] transition-all duration-500 relative overflow-hidden group/btn flex items-center justify-center gap-3 mx-auto mt-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 ease-in-out"></div>
                  <span>
                    <Link href="/signIn">
                      <span className="relative z-10 tracking-tight">
                        Start Learning Today
                      </span>
                    </Link>
                  </span>

                  <div className="relative z-10 group-hover/btn:translate-x-2 transition-transform duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          </section>
        </section>
      </main>

      <Footer />
    </div>
  );
}

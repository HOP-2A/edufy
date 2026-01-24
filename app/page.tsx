import React from "react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#EAE0CF] relative overflow-hidden">
      <div className="fixed inset-0 z-0">
        <div className="absolute w-[500px] h-[500px] bg-[#547792] rounded-full blur-[100px] opacity-30 -top-20 right-10 animate-pulse"></div>
        <div
          className="absolute w-[400px] h-[400px] bg-[#94B4C1] rounded-full blur-[100px] opacity-30 bottom-10 left-5 animate-pulse"
          style={{ animationDelay: "3s" }}
        ></div>
        <div
          className="absolute w-[350px] h-[350px] bg-[#213448] rounded-full blur-[100px] opacity-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse"
          style={{ animationDelay: "6s" }}
        ></div>
      </div>

      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-[#213448]/10 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-black bg-gradient-to-r from-[#213448] to-[#547792] bg-clip-text text-transparent">
            Edufy
          </div>
          <nav className="hidden md:flex gap-8 items-center">
            <a
              href="#courses"
              className="text-[#213448] font-semibold hover:text-[#547792] transition-all relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-[#94B4C1] hover:after:w-full after:transition-all after:duration-300"
            >
              Courses
            </a>
            <a
              href="#resources"
              className="text-[#213448] font-semibold hover:text-[#547792] transition-all relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-[#94B4C1] hover:after:w-full after:transition-all after:duration-300"
            >
              Resources
            </a>
            <a
              href="#community"
              className="text-[#213448] font-semibold hover:text-[#547792] transition-all relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-[#94B4C1] hover:after:w-full after:transition-all after:duration-300"
            >
              Community
            </a>
            <button className="px-6 py-2.5 bg-gradient-to-r from-[#547792] to-[#94B4C1] rounded-full text-[#213448] font-bold shadow-lg hover:shadow-2xl hover:-translate-y-1 hover:scale-105 transition-all duration-300 relative overflow-hidden group">
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#94B4C1] to-[#547792] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </nav>
        </div>
      </header>

      <section className="relative z-10 px-6 py-20 md:py-32 text-center">
        <h1 className="text-6xl md:text-8xl font-black mb-8 bg-gradient-to-r from-[#213448] via-[#547792] to-[#94B4C1] bg-clip-text text-transparent leading-tight animate-fade-in drop-shadow-sm">
          Learn Anything
          <br />
          <span className="bg-gradient-to-r from-[#94B4C1] to-[#547792] bg-clip-text">
            Master Everything
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-[#547792]/90 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
          From science to arts, business to languages - unlock your potential
          with expert-led courses and interactive learning experiences.
        </p>

        <section className="relative z-10 px-6 py-20">
          <div className="max-w-5xl mx-auto bg-gradient-to-br from-white/70 via-[#94B4C1]/20 to-white/70 backdrop-blur-2xl p-12 md:p-20 rounded-[3rem] border-2 border-[#94B4C1]/50 shadow-2xl text-center relative overflow-hidden group hover:border-[#547792] hover:shadow-[#547792]/20 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-[#94B4C1]/20 via-transparent to-[#547792]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#94B4C1]/30 rounded-full blur-3xl group-hover:bg-[#547792]/30 transition-colors duration-500"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#547792]/30 rounded-full blur-3xl group-hover:bg-[#94B4C1]/30 transition-colors duration-500"></div>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-black text-[#213448] mb-6 leading-tight">
                Ready to Start Your Journey?
              </h2>
              <p className="text-xl md:text-2xl text-[#547792] mb-4 font-medium">
                Join thousands of learners mastering new skills every day
              </p>

              <button className="px-14 py-5 bg-gradient-to-r from-[#547792] to-[#94B4C1] rounded-full text-white font-bold text-xl shadow-2xl hover:shadow-[#547792]/50 hover:-translate-y-2 hover:scale-105 transition-all duration-300 relative overflow-hidden group/btn">
                <span className="relative z-10">Start Learning Today →</span>
              </button>
              <div className="mt-8 flex items-center justify-center gap-8 text-sm text-[#547792]"></div>
            </div>
          </div>
        </section>
      </section>

      <footer className="relative z-10 px-6 py-12 bg-gradient-to-r from-white/90 via-[#94B4C1]/10 to-white/90 backdrop-blur-xl border-t-2 border-[#94B4C1]/40 text-center">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-left">
            <div>
              <h3 className="text-2xl font-black bg-gradient-to-r from-[#213448] to-[#547792] bg-clip-text text-transparent mb-4">
                Edufy
              </h3>
              <p className="text-[#547792] text-sm">
                Empowering learners worldwide to achieve their dreams.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-[#213448] mb-3">Explore</h4>
              <ul className="space-y-2 text-sm text-[#547792]">
                <li className="hover:text-[#213448] cursor-pointer transition-colors">
                  All Courses
                </li>
                <li className="hover:text-[#213448] cursor-pointer transition-colors">
                  Categories
                </li>
                <li className="hover:text-[#213448] cursor-pointer transition-colors">
                  Live Classes
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-[#213448] mb-3">Community</h4>
              <ul className="space-y-2 text-sm text-[#547792]">
                <li className="hover:text-[#213448] cursor-pointer transition-colors">
                  Discord
                </li>
                <li className="hover:text-[#213448] cursor-pointer transition-colors">
                  Instagram
                </li>
                <li className="hover:text-[#213448] cursor-pointer transition-colors">
                  Facebook
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[#94B4C1]/30 pt-6">
            <p className="text-[#547792] hover:text-[#213448] transition-colors duration-300">
              © 2026 Edufy. Empowering learners worldwide.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

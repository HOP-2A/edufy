import Link from "next/link";
import Footer from "./_components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#fafafa] text-black font-sans selection:bg-black selection:text-white overflow-x-hidden flex flex-col">
      <header className="sticky top-0 z-50 bg-[#fafafa]/80 backdrop-blur-xl border-b border-black/[0.04] shrink-0">
        <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">
          <div className="text-2xl font-black tracking-tighter uppercase italic hover:opacity-70 transition-opacity cursor-pointer">
            Edufy.
          </div>
          <nav className="hidden md:flex gap-12 items-center text-sm font-medium tracking-tight">
            {["Courses", "Resources", "Community"].map((item) => (
              <Link
                key={item}
                href={`/${item}`}
                className="text-black/40 hover:text-black transition-all duration-500"
              >
                {item}
              </Link>
            ))}
            <Link href="/signIn">
              <button className="bg-black text-white px-7 py-2.5 rounded-full text-sm font-bold hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] hover:-translate-y-0.5 transition-all duration-500 active:scale-95">
                Get Started
              </button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-grow flex flex-col justify-center items-center max-w-7xl mx-auto px-8 py-20 min-h-[90vh]">
        <div className="text-center mb-24 md:mb-32">
          <h1 className="text-7xl md:text-[130px] font-black tracking-[-0.06em] leading-[0.85] mb-8">
            LEARN
            <span className="text-black/5 block md:inline transition-colors duration-1000">
              ANYTHING
            </span>
          </h1>
          <p className="text-lg md:text-2xl font-medium text-black/30 max-w-2xl mx-auto leading-relaxed tracking-tight">
            A minimalist approach to high-level education. Master any skill with
            structured paths and a focused environment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mb-12">
          <Link href="/create-course" className="group">
            <div className="h-[460px] bg-white border border-black/[0.05] p-12 flex flex-col justify-between rounded-[3rem] transition-all duration-[0.8s] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:shadow-[0_40px_80px_rgba(0,0,0,0.04)] group-hover:-translate-y-3 group-hover:border-black/10">
              <div className="h-14 w-14 bg-black rounded-2xl flex items-center justify-center transition-transform duration-700 group-hover:rotate-90">
                <div className="w-6 h-[2px] bg-white rotate-90 absolute rounded-full" />
                <div className="w-6 h-[2px] bg-white absolute rounded-full" />
              </div>
              <div>
                <h3 className="text-3xl font-bold mb-3 tracking-tight">
                  Create Course
                </h3>
                <p className="text-black/40 font-medium leading-snug">
                  Architect your own knowledge ecosystem and share it.
                </p>
              </div>
            </div>
          </Link>

          <Link href="/tasks" className="group">
            <div className="h-[460px] bg-white border border-black/[0.05] p-12 flex flex-col justify-between rounded-[3rem] transition-all duration-[0.8s] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:shadow-[0_40px_80px_rgba(0,0,0,0.04)] group-hover:-translate-y-3 group-hover:border-black/10 shadow-sm">
              <div className="h-14 w-14 border-2 border-black rounded-2xl flex items-center justify-center">
                <div className="w-7 h-1.5 bg-black/10 rounded-full group-hover:bg-black transition-colors duration-500" />
              </div>
              <div>
                <h3 className="text-3xl font-bold mb-3 tracking-tight">
                  Workflow
                </h3>
                <p className="text-black/40 font-medium leading-snug">
                  The interface for your daily cognitive progress.
                </p>
              </div>
            </div>
          </Link>

          <Link href="/start-learning" className="group">
            <div className="h-[460px] bg-black p-12 flex flex-col justify-between rounded-[3rem] transition-all duration-[0.8s] ease-[cubic-bezier(0.23,1,0.32,1)] shadow-[0_30px_60px_rgba(0,0,0,0.15)] group-hover:shadow-[0_50px_100px_rgba(0,0,0,0.3)] group-hover:-translate-y-3 group-hover:bg-[#111]">
              <div className="text-white/10 text-8xl font-black tracking-tighter">
                01
              </div>
              <div>
                <h3 className="text-3xl font-bold text-white mb-3 italic tracking-tight">
                  Start Learning
                </h3>
                <p className="text-white/50 font-medium leading-snug">
                  Enter the zone of deep focus and mastery.
                </p>
              </div>
            </div>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}

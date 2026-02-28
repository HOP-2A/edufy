import Footer from "../_components/Footer";
import Sidebar from "../_components/SideBar";
import Questions from "../_components/mainPageQuestions";
import CallYourRM from "../_components/CallYourRM";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-[#fafafa] text-[#1a1a1a] selection:bg-black selection:text-white font-sans antialiased">
      {/* Sidebar */}
      <aside className="w-64 fixed inset-y-0 z-50 border-r border-gray-100 bg-white">
        <Sidebar />
      </aside>

      <main className="flex-1 ml-64 flex flex-col relative">
        {/* TOP COMMAND BAR */}
        <nav className="sticky top-0 z-40 bg-white/70 backdrop-blur-md border-b border-gray-100 px-12 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3 bg-gray-100/50 px-4 py-1.5 rounded-full border border-gray-200/50">
            <span className="text-gray-400 text-xs">⌘</span>
            <input
              type="text"
              placeholder="Хайх..."
              className="bg-transparent text-xs outline-none w-48 placeholder:text-gray-400 font-light"
            />
          </div>
          <div className="flex items-center gap-6">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-6 h-6 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-[8px] font-bold"
                >
                  A
                </div>
              ))}
              <div className="pl-4 text-[10px] font-bold text-gray-400 self-center">
                +12 Оюутан онлайн
              </div>
            </div>
          </div>
        </nav>

        <div className="p-12 lg:p-16 flex-grow">
          <div className="max-w-5xl mx-auto">
            <header className="mb-12 space-y-4">
              <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-indigo-500">
                <span className="w-8 h-[1px] bg-indigo-200"></span>
                Хянах самбар
              </div>
              <div className="flex justify-between items-end">
                <h1 className="text-6xl font-extralight tracking-tight text-black leading-tight">
                  Сайн уу, <span className="font-semibold italic">Оюутан</span>.
                </h1>
                {/* Achievement Badge - Minimalist version */}
                <div className="flex gap-2">
                  <div className="bg-gray-900 text-white px-4 py-2 rounded-2xl flex items-center gap-2">
                    <span className="text-sm">🔥</span>
                    <span className="text-xs font-bold">12 Streak</span>
                  </div>
                </div>
              </div>
            </header>

            {/* Main Question Bank - Single Column for Focus */}
            <div className="space-y-10">
              <div className="bg-white border border-gray-100 shadow-[0_40px_80px_rgba(0,0,0,0.03)] rounded-3xl p-10">
                <div className="flex items-center justify-between mb-10">
                  <div>
                    <h2 className="text-sm font-bold tracking-widest uppercase text-black">
                      Асуултын сан
                    </h2>
                    <div className="h-0.5 w-6 bg-indigo-500 mt-1"></div>
                  </div>
                  <button className="text-[10px] font-bold underline underline-offset-4 hover:text-indigo-600 transition-colors">
                    БҮГДИЙГ ҮЗЭХ
                  </button>
                </div>

                <div className="prose prose-slate max-w-none">
                  <Questions />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CallYourRM - Яг доод хэсгийн голд */}
        <div className="py-16 flex justify-center border-t border-gray-50 bg-gray-50/30">
          <CallYourRM />
        </div>

        <footer className="px-12 py-10 border-t border-gray-100 bg-white">
          <Footer />
        </footer>
      </main>
    </div>
  );
}

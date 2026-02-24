import Footer from "../_components/Footer";
import Sidebar from "../_components/SideBar";
import Questions from "../_components/mainPageQuestions";
import CallYourRM from "../_components/CallYourRM";
export default function Home() {
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
                Сайн байна уу, <span className="font-medium"></span>
              </h1>
              <p className="text-gray-500 text-lg font-light tracking-wide">
                Өнөөдрийн хичээл болон асуултууддаа төвлөрөх цаг.
              </p>
            </header>

            <section className="relative">
              <div className="group transition-all duration-500">
                <div className="bg-white border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.02),0_20px_40px_rgba(0,0,0,0.02)] rounded-2xl p-10 hover:shadow-[0_1px_3px_rgba(0,0,0,0.02),0_30px_60px_rgba(0,0,0,0.04)] transition-shadow duration-700">
                  <div className="flex items-center justify-between mb-10">
                    <div>
                      <h2 className="text-sm font-bold tracking-widest uppercase text-black">
                        Асуултын сан
                      </h2>
                      <div className="h-0.5 w-6 bg-black mt-1"></div>
                    </div>
                    <span className="text-xs font-medium text-gray-400 border border-gray-200 px-3 py-1 rounded-full">
                      Module 01
                    </span>
                  </div>

                  <div className="prose prose-slate max-w-none">
                    <Questions />
                  </div>
                </div>
              </div>

              <div className="absolute -top-6 -right-6 w-24 h-24 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-size-[16px_16px] -z-10 opacity-50"></div>
            </section>
          </div>
        </div>
        <div className="flex justify-center mb-30">
          <CallYourRM />
        </div>
        <footer className="px-12 py-8 border-t border-gray-100 bg-white/50">
          <Footer />
        </footer>
      </main>
    </div>
  );
}

"use client";

import Link from "next/link";
import Footer from "./_components/Footer";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-white text-black font-sans flex flex-col">
      <header className="border-b border-black/5">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href={"mainMenu"}>
            <div className="text-xl font-bold tracking-tight">Edufy</div>
          </Link>
          <nav className="hidden md:flex gap-8 items-center text-sm">
            {["/user/course", "Resources", "Community"].map((item) => (
              <Link
                key={item}
                href={`/${item}`}
                className="text-black/50 hover:text-black transition-colors"
              >
                {item}
              </Link>
            ))}

            <button
              className="bg-black text-white px-5 py-2 rounded-full text-sm hover:bg-black/90 transition-all"
              onClick={() => router.push("/signIn")}
            >
              Get Started
            </button>
          </nav>
        </div>
      </header>

      <main className="flex-grow flex flex-col justify-center max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-[100px] font-bold tracking-tight mb-4">
            Learn Anything
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl mx-auto">
          <Link href="/create-course" className="group">
            <div className="bg-white border border-black/10 p-8 rounded-2xl hover:border-black/20 hover:shadow-sm transition-all">
              <div className="w-10 h-10 bg-black rounded-lg mb-6 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
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
              </div>
              <h3 className="text-lg font-semibold mb-2">Create Course</h3>
              <p className="text-sm text-black/50">
                Build and share your knowledge
              </p>
            </div>
          </Link>

          <Link href="/tasks" className="group">
            <div className="bg-white border border-black/10 p-8 rounded-2xl hover:border-black/20 hover:shadow-sm transition-all">
              <div className="w-10 h-10 border-2 border-black/20 rounded-lg mb-6 flex items-center justify-center">
                <div className="w-4 h-1 bg-black/20 rounded-full" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Workflow</h3>
              <p className="text-sm text-black/50">Track your daily progress</p>
            </div>
          </Link>

          <Link href="/start-learning" className="group">
            <div className="bg-black p-8 rounded-2xl hover:bg-black/90 transition-all">
              <div className="text-white/20 text-4xl font-bold mb-6">01</div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Start Learning
              </h3>
              <p className="text-sm text-white/60">
                Begin your learning journey
              </p>
            </div>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}

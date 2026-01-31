import Link from "next/link";
import Footer from "./_components/Footer";

export default function Home() {
  return (
    <div className=" flex flex-col gap-[40px] bg-white">
      {/* Header */}
      <div className="sticky top-0 z-50 backdrop-blur-md bg-white/90 border-b border-black/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          <div className="text-4xl font-black text-black tracking-tight">
            Edufy
          </div>
          <nav className="hidden md:flex gap-10 items-center">
            <Link
              href="/Courses"
              className="text-black/70 font-semibold hover:text-black transition-colors"
            >
              Courses
            </Link>
            <Link
              href="/Resources"
              className="text-black/70 font-semibold hover:text-black transition-colors"
            >
              Resources
            </Link>
            <Link
              href="/Community"
              className="text-black/70 font-semibold hover:text-black transition-colors"
            >
              Community
            </Link>
            <Link href="/signIn">
              <button className="px-8 py-3 bg-black text-white font-bold rounded-full hover:bg-black/90 transition-all hover:shadow-lg">
                Get Started
              </button>
            </Link>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center gap-20 px-6">
        {/* Hero Text */}
        <div className="text-center">
          <div className="text-7xl md:text-8xl font-black text-black leading-[1.1] mb-2">
            Learn Anything
          </div>
          <div className="text-7xl md:text-8xl font-black text-black/60 leading-[1.1]">
            Master Everything
          </div>
        </div>

        {/* Feature Cards */}
        <div className="flex gap-8 flex-wrap justify-center max-w-6xl">
          <Link href="/create-course">
            <div className="group h-[300px] w-[380px] border-2 border-black/20 hover:border-black transition-all rounded-2xl p-8 flex flex-col justify-between cursor-pointer hover:shadow-xl">
              <div className="text-4xl font-bold text-black/90">
                Create Course
              </div>
              <div className="text-black/50 text-lg font-medium">
                Build and share your knowledge with others →
              </div>
            </div>
          </Link>

          <Link href="/tasks">
            <div className="group h-[300px] w-[380px] border-2 border-black/20 hover:border-black transition-all rounded-2xl p-8 flex flex-col justify-between cursor-pointer hover:shadow-xl">
              <div className="text-4xl font-bold text-black/90">Tasks</div>
              <div className="text-black/50 text-lg font-medium">
                Track your progress and stay organized →
              </div>
            </div>
          </Link>

          <Link href="/start-learning">
            <div className="group h-[300px] w-[380px] border-2 border-black/20 hover:border-black transition-all rounded-2xl p-8 flex flex-col justify-between cursor-pointer hover:shadow-xl bg-black text-white hover:bg-black/90">
              <div className="text-4xl font-bold">Start Learning</div>
              <div className="text-white/70 text-lg font-medium">
                Begin your journey to mastery today →
              </div>
            </div>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

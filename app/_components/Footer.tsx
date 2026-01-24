import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative z-10 px-6 py-16 bg-gradient-to-r from-white/90 via-[#94B4C1]/10 to-white/90 backdrop-blur-xl border-t-2 border-[#94B4C1]/40">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 items-start pb-12">
          <div className="space-y-4">
            <h3 className="text-4xl font-black bg-gradient-to-r from-[#213448] to-[#547792] bg-clip-text text-transparent tracking-tight">
              Edufy
            </h3>
            <p className="text-[#547792] text-sm leading-relaxed max-w-[280px]">
              Empowering learners worldwide with industry-leading courses and a
              supportive community.
            </p>
          </div>

          <div className="md:flex md:flex-col md:items-center">
            <div className="text-left md:text-center">
              <h4 className="font-bold text-[#213448] mb-5 uppercase text-xs tracking-[0.2em] hover:text-[#213448] cursor-pointer transition-all duration-300">
                Explore
              </h4>

              <ul className="space-y-3 text-sm text-[#547792]">
                <div>All Courses</div>
                <div>Categories</div>
                <div>Live Classes</div>
              </ul>
            </div>
          </div>

          <div className="md:flex md:flex-col md:items-end">
            <div className="text-left md:text-right">
              <h4 className="font-bold text-[#213448] mb-5 uppercase text-xs tracking-[0.2em]">
                Community
              </h4>
              <ul className=" space-y-3 text-sm text-[#547792] hover:text-[#213448] cursor-pointer transition-all duration-300">
                <div>
                  <Link
                    href="https://www.facebook.com/pinecone.academy.mongolia"
                    target="_blank"
                  >
                    Facebook
                  </Link>
                </div>
                <div>
                  <Link
                    href="https://www.instagram.com/pineconemongolia/"
                    target="_blank"
                  >
                    Instagram
                  </Link>
                </div>
                <div>
                  <Link
                    href="https://www.youtube.com/@PineconeAcademy/videos"
                    target="_blank"
                  >
                    Youtube
                  </Link>
                </div>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-[#94B4C1]/30 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[#547792] text-xs font-medium opacity-80 uppercase tracking-widest">
              © 2026 Edufy. Empowering learners worldwide.
            </p>
            <p className="text-[#547792] text-xs italic">
              Built for the future of education.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

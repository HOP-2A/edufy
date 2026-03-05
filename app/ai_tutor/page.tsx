"use client";

import Footer from "@/app/_components/Footer";
import AiTutor from "../_components/AiTutor";

export default function Home() {
  return (
    <div className="flex min-h-screen ">
      <main className="flex-1 flex flex-col">
        <AiTutor />

        <Footer />
      </main>
    </div>
  );
}

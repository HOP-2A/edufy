"use client";

import Footer from "@/app/_components/Footer";
import Sidebar from "@/app/_components/SideBar";

import AiTutor from "../_components/AiTutor";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar />

      <main className="flex-1 flex flex-col">
        <AiTutor />

        <Footer />
      </main>
    </div>
  );
}

"use client";

import Sidebar from "@/app/_components/SideBar";
import Footer from "@/app/_components/Footer";
import Community from "@/app/_components/Community";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Community />
        <Footer />
      </div>
    </div>
  );
}

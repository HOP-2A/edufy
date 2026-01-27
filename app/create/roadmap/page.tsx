"use client";

import Footer from "@/app/_components/Footer";
import Sidebar from "@/app/_components/SideBar";

import CreateRoadmap from "@/app/_components/CreateRoadmap";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar />

      <main className="flex-1 flex flex-col">
        <div className="mt-40">
          <CreateRoadmap />
        </div>

        <Footer />
      </main>
    </div>
  );
}

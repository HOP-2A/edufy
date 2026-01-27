"use client";

import Sidebar from "@/app/_components/SideBar";
import Footer from "@/app/_components/Footer";

import UserRoadmaps from "@/app/_components/UserRoadmaps";

export default function Library() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <div className="flex flex-1">
        <Sidebar />

        <div className="flex flex-1 justify-center">
          <div className="w-full max-w-6xl">
            <UserRoadmaps />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

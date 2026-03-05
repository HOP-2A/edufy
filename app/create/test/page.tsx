"use client";

import Footer from "@/app/_components/Footer";
import Sidebar from "@/app/_components/SideBar";

import CreateTest from "@/app/_components/Create-test";

export default function Home() {
  return (
    <div className="flex min-h-screen ">
      <Sidebar />

      <main className="flex-1 flex flex-col">
        <CreateTest />

        <Footer />
      </main>
    </div>
  );
}

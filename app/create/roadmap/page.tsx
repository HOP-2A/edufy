"use client";

import Footer from "@/app/_components/Footer";

import CreateRoadmap from "@/app/_components/CreateRoadmap";

export default function Home() {
  return (
    <div className="flex min-h-screen  ">
      <main className="flex-1 flex flex-col justify-around">
        <CreateRoadmap />

        <Footer />
      </main>
    </div>
  );
}

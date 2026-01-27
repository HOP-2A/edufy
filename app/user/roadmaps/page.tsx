"use client";

import { useRouter } from "next/navigation";

import Sidebar from "@/app/_components/SideBar";
import Footer from "@/app/_components/Footer";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Plus, Search } from "lucide-react";
import UserRoadmaps from "@/app/_components/UserRoadmaps";

export default function Library() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <div className="flex flex-1">
        <Sidebar />

        <UserRoadmaps />
      </div>

      <Footer />
    </div>
  );
}

"use client";

import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  Sparkles,
  BookOpen,
  MessageSquare,
  Map,
  Users,
  Clipboard,
  ChevronDown,
  School,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { SignedIn, UserButton } from "@clerk/nextjs";

const navItems = [
  { label: "Ask AI Tutor", icon: MessageSquare, url: "/ai_tutor" },
  { label: "Community", icon: Users, url: "/community" },
];

const dropdownCreateAiItems = [
  { label: "Roadmap", icon: Map, url: "/create/roadmap" },
  { label: "Test", icon: Clipboard, url: "/create/test" },
  { label: "Course", icon: School, url: "/create/course" },
];

const dropdownMyLearningItems = [
  { label: "Roadmap", icon: Map, url: "/user/roadmaps" },
  { label: "Test", icon: Clipboard, url: "/user/tests" },
  { label: "Course", icon: School, url: "/user/course" },
];

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <aside className="relative flex min-h-screen w-72 flex-col bg-white border-r border-black/[0.03] shadow-[4px_0_24px_rgba(0,0,0,0.01)]">
      <div className="px-8 pt-12 pb-10">
        <Link href="/mainMenu">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="text-3xl font-black tracking-[-0.08em] uppercase italic flex items-center gap-1.5"
          >
            EDUFY.
            <span className="w-2.5 h-2.5 bg-black rounded-full shadow-[0_0_15px_rgba(0,0,0,0.2)] animate-pulse" />
          </motion.div>
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-6">
        <p className="px-5 text-[10px] font-black uppercase tracking-[0.25em] text-black/20">
          Workspace
        </p>

        <div className="space-y-3 px-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="relative w-full overflow-hidden flex items-center gap-4 px-5 py-4 rounded-2xl bg-black text-white shadow-[0_20px_40px_rgba(0,0,0,0.12)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.2)] transition-all duration-500 group">
                <div className="relative z-10 p-2 bg-white/10 rounded-xl group-hover:rotate-12 transition-transform duration-500">
                  <Sparkles size={18} />
                </div>
                <span className="relative z-10 text-sm font-bold tracking-tight">
                  Create With AI
                </span>
                <ChevronDown
                  size={14}
                  className="relative z-10 ml-auto opacity-40 group-hover:opacity-100 transition-all"
                />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="w-64 rounded-[2.5rem] border-none shadow-[0_40px_80px_rgba(0,0,0,0.15)] bg-white/95 backdrop-blur-3xl p-2.5"
            >
              {dropdownCreateAiItems.map((item) => (
                <DropdownMenuItem
                  key={item.label}
                  onClick={() => router.push(item.url)}
                  className="flex items-center gap-4 p-4 rounded-2xl cursor-pointer hover:bg-black hover:text-white transition-all duration-300 font-bold text-xs uppercase"
                >
                  <item.icon size={18} /> {item.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex w-full items-center gap-4 px-5 py-4 rounded-2xl bg-[#fafafa] border border-black/[0.03] text-black/60 hover:text-black hover:bg-white hover:shadow-[0_15px_30px_rgba(0,0,0,0.03)] transition-all duration-500 group">
                <div className="p-2 bg-black/5 rounded-xl group-hover:bg-black group-hover:text-white transition-all duration-500">
                  <BookOpen size={18} />
                </div>
                <span className="text-sm font-bold tracking-tight">
                  My Learning
                </span>
                <ChevronDown
                  size={14}
                  className="ml-auto opacity-20 group-hover:opacity-100 transition-all"
                />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="w-64 rounded-[2.5rem] border-none shadow-[0_40px_80px_rgba(0,0,0,0.15)] bg-white/95 backdrop-blur-3xl p-2.5"
            >
              {dropdownMyLearningItems.map((item) => (
                <DropdownMenuItem
                  key={item.label}
                  onClick={() => router.push(item.url)}
                  className="flex items-center gap-4 p-4 rounded-2xl cursor-pointer hover:bg-black hover:text-white transition-all duration-300 font-bold text-xs uppercase"
                >
                  <item.icon size={18} /> {item.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="pt-4">
          <p className="px-5 text-[10px] font-black uppercase tracking-[0.25em] text-black/20 mb-4">
            Connect
          </p>
          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.url;
              return (
                <motion.button
                  key={item.label}
                  onClick={() => router.push(item.url)}
                  whileHover={{ x: 4 }}
                  className={cn(
                    "relative flex w-full items-center gap-4 px-5 py-3.5 rounded-2xl text-sm font-bold transition-all duration-500",
                    isActive
                      ? "bg-black/[0.03] text-black"
                      : "text-black/40 hover:text-black hover:bg-black/[0.01]",
                  )}
                >
                  <Icon size={18} />
                  <span className="tracking-tight">{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="startupIndicator"
                      className="absolute left-0 w-1.5 h-6 bg-black rounded-r-full"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </nav>

      <div className="p-4 mt-auto">
        <SignedIn>
          <div className="group relative overflow-hidden flex items-center gap-3.5 p-3.5 rounded-[2rem] bg-[#fafafa] border border-black/[0.03] hover:border-black/[0.08] hover:bg-white hover:shadow-[0_20px_40px_rgba(0,0,0,0.03)] transition-all duration-700 cursor-pointer">
            <div className="shrink-0 relative z-10 border-2 border-white rounded-full shadow-md transition-transform group-hover:scale-105">
              <UserButton
                afterSignOutUrl="/"
                appearance={{ elements: { avatarBox: "h-10 w-10" } }}
              />
            </div>
            <div className="flex flex-col relative z-10">
              <span className="text-xs font-black tracking-tight flex items-center gap-1">
                Account
              </span>
              <span className="text-[10px] font-bold text-black/20 uppercase tracking-widest leading-none">
                Settings
              </span>
            </div>
          </div>
        </SignedIn>
      </div>
    </aside>
  );
}

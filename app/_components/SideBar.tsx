"use client";

import { useRouter, usePathname } from "next/navigation";
import {
  Sparkles,
  BookOpen,
  MessageSquare,
  Map,
  Users,
  Clipboard,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type NavItem = {
  label: string;
  icon: React.ElementType;
  url: string;
};

const navItems: NavItem[] = [
  { label: "Ask AI Tutor", icon: MessageSquare, url: "/ai_tutor" },
  { label: "Community", icon: Users, url: "/community" },
];

const dropdownCreateAiItems: NavItem[] = [
  { label: "Roadmap", icon: Map, url: "/create/roadmap" },
  { label: "Test", icon: Clipboard, url: "/create/test" },
];

const dropdownMyLearningItems: NavItem[] = [
  { label: "Roadmap", icon: Map, url: "/user/roadmap" },
  { label: "Test", icon: Clipboard, url: "/user/test" },
];

function NavButton({
  item,
  onClick,
  isActive,
}: {
  item: NavItem;
  onClick: () => void;
  isActive: boolean;
}) {
  const Icon = item.icon;
  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative flex w-full items-center gap-3 rounded-full px-6 py-2.5 text-sm font-bold transition-all duration-300",
        isActive
          ? "bg-[#87C4FF] text-white shadow-md hover:shadow-[#87C4FF]/40 hover:-translate-y-1"
          : "text-[#213448] hover:text-[#87C4FF] transition-all relative after:absolute after:bottom-0 after:left-6 after:h-0.5 after:w-0 after:bg-[#87C4FF] hover:after:w-[calc(100%-3rem)] after:transition-all after:duration-300",
      )}
    >
      <Icon
        className={cn(
          "h-5 w-5 transition-all duration-300",
          isActive && "drop-shadow-sm",
        )}
      />
      <span>{item.label}</span>
    </button>
  );
}

function DropdownButton({
  icon: Icon,
  label,
  children,
  accentColor,
}: {
  icon: React.ElementType;
  label: string;
  children: React.ReactNode;
  accentColor: string;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="group flex w-full items-center gap-3 rounded-full px-6 py-2.5 text-sm font-semibold text-[#213448] transition-all duration-300 hover:text-[#87C4FF]">
          <div
            className={cn(
              "flex h-6 w-6 items-center justify-center rounded-full transition-all duration-300",
              accentColor,
            )}
          >
            <Icon className="h-3.5 w-3.5" />
          </div>
          <span>{label}</span>
          <ChevronDown className="ml-auto h-4 w-4 opacity-50 transition-all duration-300 group-hover:opacity-100" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="w-64 rounded-[2rem] border-2 border-[#87C4FF]/40 bg-white/40 backdrop-blur-2xl p-2 shadow-xl"
      >
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <aside className="relative flex h-screen w-72 flex-col overflow-hidden border-r border-[#87C4FF]/30 bg-white">
      <div className="sticky top-0 z-50 backdrop-blur-xl bg-white/90 border-b border-[#87C4FF]/30 shadow-sm">
        <div className="flex items-center gap-3 px-6 py-4 h-24">
          <div className="text-4xl font-black bg-gradient-to-r from-[#213448] to-[#87C4FF] bg-clip-text text-transparent">
            Edufy
          </div>
        </div>
      </div>

      <nav className="relative z-10 flex-1 space-y-1.5 overflow-y-auto px-4 py-6">
        <p className="px-6 py-2 text-[12px] font-bold uppercase tracking-widest text-[#547792]/60">
          Main Menu
        </p>

        <DropdownButton
          icon={Sparkles}
          label="Create with AI"
          accentColor="bg-[#87C4FF] text-white"
        >
          {dropdownCreateAiItems.map((item) => (
            <DropdownMenuItem
              key={item.label}
              onClick={() => router.push(item.url)}
              className="group flex cursor-pointer items-center gap-3 rounded-2xl px-4 py-2.5 font-semibold text-[#213448] transition-all duration-200 hover:bg-[#87C4FF]/20 focus:bg-[#87C4FF]/20"
            >
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
            </DropdownMenuItem>
          ))}
        </DropdownButton>

        <DropdownButton
          icon={BookOpen}
          label="My Learning"
          accentColor="bg-[#547792] text-white"
        >
          {dropdownMyLearningItems.map((item) => (
            <DropdownMenuItem
              key={item.label}
              onClick={() => router.push(item.url)}
              className="group flex cursor-pointer items-center gap-3 rounded-2xl px-4 py-2.5 font-semibold text-[#213448] transition-all duration-200 hover:bg-[#87C4FF]/20 focus:bg-[#87C4FF]/20"
            >
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
            </DropdownMenuItem>
          ))}
        </DropdownButton>

        <div className="relative mx-2 my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#87C4FF]/30" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-2 text-xs text-[#87C4FF]/60">•</span>
          </div>
        </div>

        {navItems.map((item) => (
          <NavButton
            key={item.label}
            item={item}
            isActive={pathname === item.url}
            onClick={() => router.push(item.url)}
          />
        ))}
      </nav>
    </aside>
  );
}

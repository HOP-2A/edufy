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
        "group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm transition-all duration-200",
        isActive
          ? "bg-blue-600/10 text-blue-600 shadow-sm"
          : "text-muted-foreground hover:bg-secondary hover:text-foreground",
      )}
    >
      <Icon
        className={cn(
          "h-5 w-5 transition-transform duration-200 group-hover:scale-110",
          isActive && "text-blue-600",
        )}
      />
      <span className="font-medium">{item.label}</span>
    </button>
  );
}

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-72 flex-col border-r bg-slate-50/50 backdrop-blur-xl dark:bg-zinc-950/50">
      <div className="flex items-center gap-3 px-6 py-8">
        <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/20">
          <Sparkles className="h-5 w-5" />
          <div className="absolute -inset-1 rounded-xl bg-blue-500/20 blur-sm -z-10" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold tracking-tight text-foreground uppercase italic">
            Edufy AI
          </span>
          <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest">
            Premium Learning
          </span>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1.5">
        <p className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
          Main Menu
        </p>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-muted-foreground hover:bg-secondary transition-all">
              <div className="flex h-5 w-5 items-center justify-center rounded bg-amber-100 text-amber-600 dark:bg-amber-900/30">
                <Sparkles className="h-3.5 w-3.5" />
              </div>
              <span className="font-medium">Create with AI</span>
              <ChevronDown className="ml-auto h-4 w-4 opacity-50 group-hover:opacity-100 transition-opacity" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="w-56 rounded-xl p-2 shadow-xl"
          >
            {dropdownCreateAiItems.map((item) => (
              <DropdownMenuItem
                key={item.label}
                onClick={() => router.push(item.url)}
                className="flex items-center gap-3 rounded-lg py-2.5 focus:bg-blue-50 focus:text-blue-600 cursor-pointer"
              >
                <item.icon className="h-4 w-4" />
                <span className="font-medium">{item.label}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-muted-foreground hover:bg-secondary transition-all">
              <div className="flex h-5 w-5 items-center justify-center rounded bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30">
                <BookOpen className="h-3.5 w-3.5" />
              </div>
              <span className="font-medium">My Learning</span>
              <ChevronDown className="ml-auto h-4 w-4 opacity-50 group-hover:opacity-100 transition-opacity" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="w-56 rounded-xl p-2 shadow-xl"
          >
            {dropdownMyLearningItems.map((item) => (
              <DropdownMenuItem
                key={item.label}
                onClick={() => router.push(item.url)}
                className="flex items-center gap-3 rounded-lg py-2.5 focus:bg-blue-50 focus:text-blue-600 cursor-pointer"
              >
                <item.icon className="h-4 w-4" />
                <span className="font-medium">{item.label}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="my-4 border-t border-border/50 mx-2" />

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

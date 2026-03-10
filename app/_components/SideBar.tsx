"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  Sparkles,
  BookOpen,
  MessageSquare,
  Map,
  Clipboard,
  ChevronDown,
  ArrowUpRight,
  PackageOpen,
  Route,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { SignedIn, useClerk } from "@clerk/nextjs";
import { useProvider } from "@/providers/AuthProviders";

const navItems = [
  { label: "Ask AI Tutor", icon: MessageSquare, url: "/ai_tutor", tag: "AI" },
];

const community = [
  { label: "Posts", icon: PackageOpen, url: "/community/posts" },
  { label: "Roadmaps", icon: Route, url: "/community/roadmaps" },
];

const createItems = [
  { label: "Generate with AI", icon: Map, url: "/create/roadmap" },
  { label: "Custom Roadmap", icon: Map, url: "/create/croadmap" },
];

const myLearningItems = [
  { label: "Roadmap", icon: Map, url: "/user/roadmaps" },
  { label: "Test", icon: Clipboard, url: "/user/test" },
];

const allPages = [
  { label: "Ask AI Tutor", url: "/ai_tutor" },
  { label: "Posts", url: "/community/posts" },
  { label: "Roadmaps", url: "/community/roadmaps" },
  { label: "Create Roadmap", url: "/create/roadmap" },
  { label: "My Roadmaps", url: "/user/roadmaps" },
  { label: "My Tests", url: "/user/test" },
  { label: "Main Menu", url: "/mainMenu" },
];

function getCurrentPageLabel(pathname: string) {
  const match = allPages.find((p) => p.url === pathname);
  if (match) return match.label;
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return "Home";
  return segments[segments.length - 1]
    .replace(/-|_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const { openUserProfile } = useClerk();
  const [createOpen, setCreateOpen] = useState(true);
  const [learningOpen, setLearningOpen] = useState(true);

  const { user } = useProvider();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&family=Unbounded:wght@400;700;900&display=swap');

        .sidebar-root { font-family: 'Space Mono', monospace; }
        .sidebar-logo { font-family: 'Unbounded', sans-serif; }
   
        .section-label {
          font-family: 'Space Mono', monospace;
          letter-spacing: 0.3em; font-size: 9px;
          color: rgba(255,255,255,0.15); text-transform: uppercase;
        }
        .bottom-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .bottom-card:hover {
          background: rgba(255,255,255,0.06);
          border-color: rgba(255,255,255,0.12);
        }
        .stroke-number {
          -webkit-text-stroke: 1px rgba(255,255,255,0.12);
          color: transparent; font-family: 'Unbounded', sans-serif;
          font-size: 80px; font-weight: 900; line-height: 1;
          position: absolute; right: -12px; top: -20px;
          pointer-events: none; user-select: none;
        }
        .collapsible-item {
          transition: background 0.2s;
        }
        .collapsible-item:hover {
          background: rgba(255,255,255,0.04);
        }
      `}</style>

      <aside
        className="sidebar-root h-screen w-72 flex-shrink-0 flex flex-col"
        style={{
          borderRight: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div />

        <div className="relative z-10 px-8 pt-10 pb-0">
          <Link href="/mainMenu">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="sidebar-logo flex items-center gap-2"
              style={{
                fontSize: "22px",
                fontWeight: 900,
                letterSpacing: "-0.06em",
                color: "white",
                textTransform: "uppercase",
                fontStyle: "italic",
              }}
            >
              EDUFY.
              <motion.span
                animate={{ opacity: [1, 0.2, 1] }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut",
                }}
                style={{
                  width: 7,
                  height: 7,
                  background: "white",
                  borderRadius: "50%",
                  display: "inline-block",
                  boxShadow: "0 0 12px rgba(255,255,255,0.6)",
                }}
              />
            </motion.div>
          </Link>

          <div style={{ marginTop: 16 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "5px 12px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "10px",
              }}
            >
              <motion.span
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ repeat: Infinity, duration: 2.5 }}
                style={{
                  width: 5,
                  height: 5,
                  background: "#4fffb0",
                  borderRadius: "50%",
                  display: "inline-block",
                  boxShadow: "0 0 8px #4fffb0",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontSize: "9px",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.35)",
                }}
              >
                {getCurrentPageLabel(pathname)}
              </span>
            </div>
          </div>

          <div
            style={{
              marginTop: 16,
              height: 1,
              background:
                "linear-gradient(to right, rgba(255,255,255,0.08), transparent)",
            }}
          />
        </div>

        <nav className="relative z-10 flex-1 px-4 pt-6 overflow-y-auto space-y-6">
          <div>
            <p className="section-label px-3 mb-4">Workspace</p>

            <div className="space-y-2 px-2">
              <div
                style={{
                  borderRadius: 16,
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <button
                  onClick={() => setCreateOpen((v) => !v)}
                  className="relative w-full flex items-center gap-4 px-5 py-4 group"
                  style={{
                    transition: "background 0.3s",
                  }}
                >
                  <div
                    style={{
                      padding: "7px",
                      background: "rgba(255,255,255,0.08)",
                      borderRadius: "10px",
                      transition: "all 0.3s",
                    }}
                    className="group-hover:bg-white/15"
                  >
                    <Sparkles size={15} color="white" />
                  </div>
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "white",
                    }}
                  >
                    Create Roadmap
                  </span>
                  <motion.div
                    animate={{ rotate: createOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ marginLeft: "auto" }}
                  >
                    <ChevronDown size={13} color="rgba(255,255,255,0.35)" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {createOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      style={{
                        overflow: "hidden",
                        borderTop: "1px solid rgba(255,255,255,0.05)",
                      }}
                    >
                      {createItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.url;
                        return (
                          <motion.button
                            key={item.label}
                            onClick={() => router.push(item.url)}
                            whileHover={{ x: 3 }}
                            className="collapsible-item relative flex w-full items-center gap-4 py-3 rounded-none"
                            style={{
                              paddingLeft: 52,
                              paddingRight: 20,
                              background: isActive
                                ? "rgba(255,255,255,0.05)"
                                : "transparent",
                            }}
                          >
                            {isActive && (
                              <div
                                style={{
                                  position: "absolute",
                                  left: 0,
                                  top: "50%",
                                  transform: "translateY(-50%)",
                                  width: 2,
                                  height: 16,
                                  background: "white",
                                  borderRadius: "0 2px 2px 0",
                                  boxShadow: "0 0 8px rgba(255,255,255,0.5)",
                                }}
                              />
                            )}
                            <div
                              style={{
                                width: 5,
                                height: 5,
                                borderRadius: "50%",
                                background: isActive
                                  ? "white"
                                  : "rgba(255,255,255,0.2)",
                                flexShrink: 0,
                              }}
                            />
                            <span
                              style={{
                                fontSize: "11px",
                                fontWeight: 600,
                                letterSpacing: "0.08em",
                                textTransform: "uppercase",
                                color: isActive
                                  ? "white"
                                  : "rgba(255,255,255,0.4)",
                              }}
                            >
                              {item.label}
                            </span>
                          </motion.button>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div
                style={{
                  borderRadius: 16,
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.05)",
                  background: "transparent",
                }}
              >
                <button
                  onClick={() => setLearningOpen((v) => !v)}
                  className="flex w-full items-center gap-4 px-5 py-4 group"
                  style={{ transition: "background 0.3s" }}
                >
                  <div
                    style={{
                      padding: "7px",
                      background: "rgba(255,255,255,0.04)",
                      borderRadius: "10px",
                      transition: "all 0.3s",
                    }}
                    className="group-hover:bg-white/10"
                  >
                    <BookOpen size={15} color="rgba(255,255,255,0.5)" />
                  </div>
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.4)",
                      transition: "color 0.3s",
                    }}
                    className="group-hover:!text-white/80"
                  >
                    My Learning
                  </span>
                  <motion.div
                    animate={{ rotate: learningOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ marginLeft: "auto" }}
                  >
                    <ChevronDown size={13} color="rgba(255,255,255,0.2)" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {learningOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      style={{
                        overflow: "hidden",
                        borderTop: "1px solid rgba(255,255,255,0.05)",
                      }}
                    >
                      {myLearningItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.url;
                        return (
                          <motion.button
                            key={item.label}
                            onClick={() => router.push(item.url)}
                            whileHover={{ x: 3 }}
                            className="collapsible-item relative flex w-full items-center gap-4 py-3"
                            style={{
                              paddingLeft: 52,
                              paddingRight: 20,
                              background: isActive
                                ? "rgba(255,255,255,0.05)"
                                : "transparent",
                            }}
                          >
                            {isActive && (
                              <div
                                style={{
                                  position: "absolute",
                                  left: 0,
                                  top: "50%",
                                  transform: "translateY(-50%)",
                                  width: 2,
                                  height: 16,
                                  background: "white",
                                  borderRadius: "0 2px 2px 0",
                                  boxShadow: "0 0 8px rgba(255,255,255,0.5)",
                                }}
                              />
                            )}
                            <div
                              style={{
                                width: 5,
                                height: 5,
                                borderRadius: "50%",
                                background: isActive
                                  ? "white"
                                  : "rgba(255,255,255,0.2)",
                                flexShrink: 0,
                              }}
                            />
                            <span
                              style={{
                                fontSize: "11px",
                                fontWeight: 600,
                                letterSpacing: "0.08em",
                                textTransform: "uppercase",
                                color: isActive
                                  ? "white"
                                  : "rgba(255,255,255,0.4)",
                              }}
                            >
                              {item.label}
                            </span>
                          </motion.button>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <p className="section-label px-3 mb-4">Connect</p>
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
                    <Icon
                      size={18}
                      color={isActive ? "white" : "rgba(255,255,255,0.3)"}
                    />
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: 700,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: isActive ? "white" : "rgba(255,255,255,0.35)",
                      }}
                    >
                      {item.label}
                    </span>
                    {item.tag && (
                      <span
                        style={{
                          marginLeft: "auto",
                          fontSize: "8px",
                          fontWeight: 700,
                          letterSpacing: "0.15em",
                          padding: "2px 7px",
                          borderRadius: "20px",
                          background: "rgba(255,255,255,0.08)",
                          color: "rgba(255,255,255,0.4)",
                          border: "1px solid rgba(255,255,255,0.06)",
                        }}
                      >
                        {item.tag}
                      </span>
                    )}
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        style={{
                          position: "absolute",
                          left: 0,
                          width: 2,
                          height: 20,
                          background: "white",
                          borderRadius: "0 2px 2px 0",
                          boxShadow: "0 0 10px rgba(255,255,255,0.5)",
                        }}
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

          <div>
            <p className="section-label px-3 mb-4">Community</p>
            <div className="space-y-1">
              {community.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.url;
                const isSubItem = !item.icon;
                return (
                  <motion.button
                    key={item.label}
                    onClick={() => router.push(item.url)}
                    whileHover={{ x: 4 }}
                    className="relative flex w-full items-center gap-4 py-3 rounded-2xl group"
                    style={{
                      background: isActive
                        ? "rgba(255,255,255,0.04)"
                        : "transparent",
                      transition: "all 0.3s",
                      paddingLeft: isSubItem ? 40 : 20,
                      paddingRight: 20,
                    }}
                  >
                    {isSubItem ? (
                      <div
                        style={{
                          width: 5,
                          height: 5,
                          borderRadius: "50%",
                          background: isActive
                            ? "white"
                            : "rgba(255,255,255,0.2)",
                          flexShrink: 0,
                        }}
                      />
                    ) : (
                      <Icon
                        size={15}
                        color={isActive ? "white" : "rgba(255,255,255,0.3)"}
                        style={{ transition: "color 0.3s" }}
                      />
                    )}
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: 700,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: isActive ? "white" : "rgba(255,255,255,0.3)",
                        transition: "color 0.3s",
                      }}
                      className="group-hover:!text-white/80"
                    >
                      {item.label}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="communityIndicator"
                        style={{
                          position: "absolute",
                          left: 0,
                          width: 2,
                          height: 18,
                          background: "white",
                          borderRadius: "0 2px 2px 0",
                          boxShadow: "0 0 10px rgba(255,255,255,0.5)",
                        }}
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

        <div
          className="relative z-10 p-4 mt-auto"
          onClick={() => router.push("/account")}
        >
          <div
            style={{
              height: 1,
              marginBottom: 14,
              background:
                "linear-gradient(to right, rgba(255,255,255,0.06), transparent)",
            }}
          />
          <SignedIn>
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="bottom-card group flex items-center gap-3 p-3.5 rounded-2xl cursor-pointer overflow-hidden relative"
            >
              <span className="stroke-number">U</span>
              <div
                style={{
                  width: 36,
                  height: 36,
                  background: "rgba(255,255,255,0.08)",
                  borderRadius: "12px",
                  border: "1px solid rgba(255,255,255,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  position: "relative",
                  zIndex: 1,
                }}
              >
                <div className="shrink-0 relative z-10 border-2 border-white rounded-full shadow-md transition-transform group-hover:scale-105 w-7.5 h-7.5 flex items-center justify-center overflow-hidden bg-gray-200">
                  {user?.profilePic ? (
                    <img
                      src={user.profilePic}
                      width={30}
                      height={30}
                      className="w-full h-full object-cover"
                      alt={user?.username}
                    />
                  ) : (
                    <span className="text-xs font-medium text-gray-600 uppercase">
                      {user?.username?.charAt(0) ||
                        user?.username?.charAt(0) ||
                        "?"}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-col relative z-10">
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    color: "rgba(255,255,255,0.8)",
                    textTransform: "uppercase",
                  }}
                >
                  Account
                </span>
                <span
                  style={{
                    fontSize: "9px",
                    fontWeight: 700,
                    letterSpacing: "0.2em",
                    color: "rgba(255,255,255,0.2)",
                    textTransform: "uppercase",
                    marginTop: 1,
                  }}
                >
                  Settings
                </span>
              </div>
              <ArrowUpRight
                size={13}
                color="rgba(255,255,255,0.15)"
                className="ml-auto relative z-10 group-hover:text-white/50 transition-all"
              />
            </motion.div>
          </SignedIn>
        </div>
      </aside>
    </>
  );
}

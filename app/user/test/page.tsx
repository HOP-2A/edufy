"use client";

import Footer from "@/app/_components/Footer";
import Sidebar from "@/app/_components/SideBar";
import { Plus, Search, Sparkles, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { motion } from "framer-motion";

type Actionitem = {
  id: string;
  title: string;
  description: string;
};

type User = {
  id: string;
  username: string;
  email: string;
  clerkId: string;
};

export default function Main() {
  const router = useRouter();
  const { userId, isLoaded } = useAuth();

  const [searchQuery, setSearchQuery] = useState("");
  const [actionItem, setActionItem] = useState<Actionitem[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [roadmap, setRoadmap] = useState<any[]>([]);
  const [roadmapId, setRoadmapId] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoaded || !userId) return;
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/find-user/${userId}`);
        setUser(await res.json());
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, [isLoaded, userId]);

  useEffect(() => {
    if (!user?.id) return;
    const fetchRoadmapIds = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/getroadmapbyuserId/${user.id}`);
        setRoadmapId(await res.json());
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRoadmapIds();
  }, [user?.id]);

  useEffect(() => {
    if (!roadmapId.length) {
      setRoadmap([]);
      return;
    }
    const fetchAllRoadmaps = async () => {
      try {
        setLoading(true);
        const results = await Promise.all(
          roadmapId.map((r) =>
            fetch(`/api/getroadmapinfo/${r.id}`).then((res) => res.json()),
          ),
        );
        setRoadmap(results);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAllRoadmaps();
  }, [roadmapId]);

  useEffect(() => {
    if (!roadmap.length) {
      setActionItem([]);
      return;
    }
    const fetchTasks = async () => {
      try {
        const allSections = roadmap.flatMap((r) => r.learningSections ?? []);
        if (!allSections.length) {
          setActionItem([]);
          return;
        }
        const responses = await Promise.all(
          allSections.map((section) => fetch(`/api/get-tasks/${section.id}`)),
        );
        const taskArrays = await Promise.all(
          responses.map(async (r) => (r.ok ? r.json() : [])),
        );
        setActionItem(taskArrays.flat());
      } catch (err) {
        console.error(err);
      }
    };
    fetchTasks();
  }, [roadmap]);

  const filteredactionItems = actionItem.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (!isLoaded || loading) {
    return (
      <div className="flex min-h-screen text-white antialiased">
        <aside style={{ width: 210 }}>
          <Sidebar />
        </aside>
        <main
          className="flex-1 flex items-center justify-center"
          style={{ marginLeft: 210 }}
        >
          <div className="flex flex-col items-center gap-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              style={{
                width: 24,
                height: 24,
                border: "1.5px solid rgba(0,255,200,0.15)",
                borderTop: "1.5px solid rgba(0,255,200,0.7)",
                borderRadius: "50%",
              }}
            />
            <span
              className="mono"
              style={{
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: "0.3em",
                color: "rgba(0,255,200,0.3)",
              }}
            >
              LOADING EVALUATIONS
            </span>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div
      className="flex min-h-screen text-white antialiased "
      style={{ fontFamily: "'Space Mono', monospace" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@400;700;900&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');
        .unb { font-family: 'Unbounded', sans-serif; }
        .mono { font-family: 'Space Mono', monospace; }

        .nav-bar {
          background: rgba(8,9,10,0.8);
          backdrop-filter: blur(24px);
          border-bottom: 1px solid rgba(0,255,200,0.06);
        }

        .search-wrap { position: relative; max-width: 520px; }
        .search-wrap input {
          width: 100%; background: rgba(0,255,200,0.03); border: 1px solid rgba(0,255,200,0.08);
          border-radius: 14px; padding: 14px 18px 14px 46px; font-family: 'Space Mono', monospace;
          font-size: 12px; color: white; outline: none; transition: all 0.2s;
        }
        .search-wrap input:focus { border-color: rgba(0,255,200,0.2); box-shadow: 0 0 20px rgba(0,255,200,0.04); }
        .search-icon { position: absolute; left: 16px; top: 50%; transform: translateY(-50%); color: rgba(0,255,200,0.3); }

        .create-btn {
          display: inline-flex; align-items: center; gap: 8px; padding: 12px 24px; border-radius: 12px;
          background: rgba(0,255,200,0.08); border: 1px solid rgba(0,255,200,0.2); color: rgba(0,255,200,0.9);
          font-family: 'Unbounded', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
          cursor: pointer; transition: all 0.2s;
        }
        .create-btn:hover { background: rgba(0,255,200,0.14); border-color: rgba(0,255,200,0.4); transform: translateY(-1px); }

        .test-card {
          background: rgba(0,255,200,0.02); border: 1px solid rgba(0,255,200,0.07); border-radius: 20px;
          padding: 28px; cursor: pointer; transition: all 0.3s cubic-bezier(0.23,1,0.32,1);
          display: flex; flex-direction: column; justify-content: space-between; min-height: 200px;
          position: relative; overflow: hidden;
        }
        .test-card:hover { border-color: rgba(0,255,200,0.2); box-shadow: 0 0 50px rgba(0,255,200,0.05); transform: translateY(-4px); }

        .zap-box {
          width: 34px; height: 34px; border-radius: 10px; background: rgba(0,255,200,0.05);
          border: 1px solid rgba(0,255,200,0.1); display: flex; align-items: center; justify-content: center;
        }
        .test-card:hover .zap-box { background: rgba(0,255,200,0.12); border-color: rgba(0,255,200,0.3); }

        .teal-divider { height: 1px; background: linear-gradient(to right, rgba(0,255,200,0.2), transparent); }

        .empty-card {
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          min-height: 50vh; border-radius: 24px; border: 1px dashed rgba(0,255,200,0.1);
          background: rgba(0,255,200,0.01); text-align: center; padding: 60px; gap: 20px;
        }
      `}</style>

      <aside style={{ width: 210 }}>
        <Sidebar />
      </aside>

      <main className="flex-1 flex flex-col" style={{ marginLeft: 210 }}>
        <nav className="nav-bar sticky top-0 z-40 flex justify-between items-center px-10 py-3">
          <div className="flex items-center gap-3">
            <div
              style={{
                width: 20,
                height: 1,
                background: "rgba(0,255,200,0.4)",
              }}
            />
            <span
              className="mono"
              style={{
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "rgba(0,255,200,0.4)",
              }}
            >
              Assessments
            </span>
          </div>
          <button
            className="create-btn"
            onClick={() => router.push("/create/test")}
          >
            <Plus size={13} strokeWidth={2.5} /> Create Test
          </button>
        </nav>

        <div className="flex-grow px-10 lg:px-12 py-10">
          <div
            style={{
              maxWidth: 960,
              margin: "0 auto",
              display: "flex",
              flexDirection: "column",
              gap: 28,
            }}
          >
            <header style={{ paddingBottom: 24 }}>
              <div
                className="flex items-center gap-3"
                style={{ marginBottom: 16 }}
              >
                <div
                  style={{
                    width: 24,
                    height: 1,
                    background: "rgba(0,255,200,0.4)",
                  }}
                />
                <span
                  className="mono"
                  style={{
                    fontSize: 9,
                    fontWeight: 700,
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    color: "rgba(0,255,200,0.4)",
                  }}
                >
                  Intelligence
                </span>
              </div>
              <h1
                className="unb"
                style={{
                  fontSize: "clamp(36px,5vw,58px)",
                  fontWeight: 900,
                  letterSpacing: "-0.04em",
                  lineHeight: 1.05,
                  color: "white",
                }}
              >
                My
                <span
                  style={{
                    WebkitTextStroke: "1.5px rgba(0,255,200,0.5)",
                    color: "transparent",
                    fontStyle: "italic",
                  }}
                >
                  Tests.
                </span>
              </h1>
              <div className="teal-divider" style={{ marginTop: 24 }} />
            </header>

            <div className="search-wrap">
              <Search size={15} className="search-icon" />
              <input
                placeholder="Search assessments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {actionItem.length === 0 ? (
              <div className="empty-card">
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 16,
                    background: "rgba(0,255,200,0.06)",
                    border: "1px solid rgba(0,255,200,0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Sparkles size={22} color="rgba(0,255,200,0.5)" />
                </div>
                <div>
                  <h2
                    className="unb"
                    style={{
                      fontSize: 22,
                      fontWeight: 900,
                      letterSpacing: "-0.03em",
                      color: "white",
                      marginBottom: 8,
                    }}
                  >
                    No tests found.
                  </h2>
                  <p
                    className="mono"
                    style={{
                      fontSize: 10,
                      color: "rgba(255,255,255,0.2)",
                      letterSpacing: "0.08em",
                    }}
                  >
                    Generated AI assessments will appear here.
                  </p>
                </div>
                <button
                  className="create-btn"
                  onClick={() => router.push("/create/test")}
                  style={{ marginTop: 8 }}
                >
                  <Plus size={13} strokeWidth={2.5} /> Generate First Test
                </button>
              </div>
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: 14,
                }}
              >
                {filteredactionItems.map((test, idx) => (
                  <motion.div
                    key={test.id}
                    className="test-card"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05, duration: 0.3 }}
                    onClick={() => router.push(`/user/test/${test.id}`)}
                  >
                    <div className="flex justify-between items-start mb-5">
                      <div className="zap-box">
                        <Zap size={14} color="rgba(0,255,200,0.5)" />
                      </div>
                      <span
                        className="mono"
                        style={{
                          fontSize: 8,
                          fontWeight: 700,
                          letterSpacing: "0.2em",
                          textTransform: "uppercase",
                          color: "rgba(0,255,200,0.2)",
                        }}
                      >
                        ID-{String(idx + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <div style={{ flex: 1 }}>
                      <h3
                        className="unb"
                        style={{
                          fontSize: 14,
                          fontWeight: 700,
                          letterSpacing: "-0.02em",
                          lineHeight: 1.4,
                          color: "white",
                          marginBottom: 8,
                        }}
                      >
                        {test.title}
                      </h3>
                      <p
                        className="mono"
                        style={{
                          fontSize: 10,
                          color: "rgba(255,255,255,0.25)",
                          lineHeight: 1.6,
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {test.description || "Мэдлэгээ баталгаажуулах AI тест."}
                      </p>
                    </div>

                    <div
                      style={{
                        marginTop: 20,
                        height: 1,
                        background:
                          "linear-gradient(to right, rgba(0,255,200,0.2), transparent)",
                      }}
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>

        <footer
          className="px-10 py-8"
          style={{ borderTop: "1px solid rgba(0,255,200,0.05)" }}
        >
          <Footer />
        </footer>
      </main>
    </div>
  );
}

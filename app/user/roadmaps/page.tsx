"use client";

import Footer from "@/app/_components/Footer";
import Sidebar from "@/app/_components/SideBar";
import { Plus, Search, Sparkles, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { motion } from "framer-motion";

interface Roadmap {
  id: string;
  title: string;
  description: string;
}

interface User {
  id: string;
  username: string;
  email: string;
  clerkId: string;
}

export default function Main() {
  const router = useRouter();
  const { userId, isLoaded } = useAuth();

  const [searchQuery, setSearchQuery] = useState("");
  const [roadmap, setRoadmap] = useState<Roadmap[]>([]);
  const [roadmapId, setRoadmapId] = useState<Roadmap[]>([]);
  const [user, setUser] = useState<User | null>(null);
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
    if (roadmapId.length === 0) {
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

  const filteredRoadmaps = roadmap.filter((c) =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (!isLoaded || loading) {
    return (
      <div
        className="flex min-h-screen text-white antialiased"
        style={{ fontFamily: "'Space Mono', monospace" }}
      >
        <aside
          className="
"
          style={{ width: 210 }}
        >
          <Sidebar />
        </aside>
        <main
          className="flex-1 flex items-center justify-center"
          style={{ marginLeft: 210 }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
            }}
          >
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
              style={{
                fontFamily: "Space Mono,monospace",
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "rgba(0,255,200,0.3)",
              }}
            >
              Loading Library
            </span>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div
      className="flex min-h-screen text-white antialiased"
      style={{ fontFamily: "'Space Mono', monospace" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@400;700;900&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');
        .unb { font-family: 'Unbounded', sans-serif; }
        .mono { font-family: 'Space Mono', monospace; }

        .nav-bar {
          background: rgba(0,8,7,0.8);
          backdrop-filter: blur(24px);
          border-bottom: 1px solid rgba(0,255,200,0.06);
        }

        .search-wrap {
          position: relative;
          max-width: 520px;
        }
        .search-wrap input {
          width: 100%;
          background: rgba(0,255,200,0.03);
          border: 1px solid rgba(0,255,200,0.08);
          border-radius: 14px;
          padding: 14px 18px 14px 46px;
          font-family: 'Space Mono', monospace;
          font-size: 12px;
          color: rgba(255,255,255,0.6);
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .search-wrap input::placeholder { color: rgba(255,255,255,0.15); }
        .search-wrap input:focus {
          border-color: rgba(0,255,200,0.2);
          box-shadow: 0 0 20px rgba(0,255,200,0.04);
        }
        .search-icon {
          position: absolute;
          left: 16px; top: 50%;
          transform: translateY(-50%);
          color: rgba(0,255,200,0.3);
          pointer-events: none;
        }

        .create-btn {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 12px 24px; border-radius: 12px;
          background: rgba(0,255,200,0.08);
          border: 1px solid rgba(0,255,200,0.2);
          color: rgba(0,255,200,0.9);
          font-family: 'Unbounded', sans-serif;
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.08em; text-transform: uppercase;
          cursor: pointer; transition: all 0.2s;
        }
        .create-btn:hover {
          background: rgba(0,255,200,0.14);
          border-color: rgba(0,255,200,0.4);
          box-shadow: 0 0 24px rgba(0,255,200,0.1);
          transform: translateY(-1px);
        }

        .roadmap-card {
          background: rgba(0,255,200,0.02);
          border: 1px solid rgba(0,255,200,0.07);
          border-radius: 20px;
          padding: 28px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.23,1,0.32,1);
          display: flex; flex-direction: column;
          justify-content: space-between;
          min-height: 200px;
          position: relative;
          overflow: hidden;
        }
        .roadmap-card::before {
          content: '';
          position: absolute; top: 0; right: 0;
          width: 80px; height: 80px;
          background: radial-gradient(circle at top right, rgba(0,255,200,0.06), transparent);
          pointer-events: none;
          transition: opacity 0.3s;
        }
        .roadmap-card:hover {
          border-color: rgba(0,255,200,0.2);
          box-shadow: 0 0 50px rgba(0,255,200,0.05), 0 24px 48px rgba(0,0,0,0.3);
          transform: translateY(-4px);
        }
        .roadmap-card:hover::before { opacity: 2; }

        .arrow-box {
          width: 34px; height: 34px; border-radius: 10px;
          background: rgba(0,255,200,0.05);
          border: 1px solid rgba(0,255,200,0.1);
          display: flex; align-items: center; justify-content: center;
          transition: all 0.25s;
        }
        .roadmap-card:hover .arrow-box {
          background: rgba(0,255,200,0.12);
          border-color: rgba(0,255,200,0.3);
        }

        .teal-divider { height: 1px; background: linear-gradient(to right, rgba(0,255,200,0.2), transparent); }

        .empty-card {
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          min-height: 50vh; border-radius: 24px;
          border: 1px dashed rgba(0,255,200,0.1);
          background: rgba(0,255,200,0.01);
          text-align: center; padding: 60px;
          gap: 20px;
        }
      `}</style>

      <aside
        className="
"
        style={{ width: 210 }}
      >
        <Sidebar />
      </aside>

      <main className="flex-1 flex flex-col" style={{ marginLeft: 210 }}>
        <nav className="nav-bar sticky top-0 z-40 flex justify-between items-center px-10 py-3">
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
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
              Library
            </span>
          </div>
          <button
            className="create-btn"
            onClick={() => router.push("/create/roadmap")}
          >
            <Plus size={13} strokeWidth={2.5} />
            Create New
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
                  Collection
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
                My{" "}
                <span
                  style={{
                    WebkitTextStroke: "1.5px rgba(0,255,200,0.5)",
                    color: "transparent",
                    fontStyle: "italic",
                  }}
                >
                  Roadmaps.
                </span>
              </h1>
              <div className="teal-divider" style={{ marginTop: 24 }} />
            </header>

            <div className="search-wrap">
              <Search size={15} className="search-icon" />
              <input
                placeholder="Search roadmaps..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {roadmap.length === 0 ? (
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
                    No roadmaps yet.
                  </h2>
                  <p
                    className="mono"
                    style={{
                      fontSize: 10,
                      color: "rgba(255,255,255,0.2)",
                      letterSpacing: "0.08em",
                    }}
                  >
                    Your learning paths will appear here.
                  </p>
                </div>
                <button
                  className="create-btn"
                  onClick={() => router.push("/create/roadmap")}
                  style={{ marginTop: 8 }}
                >
                  <Plus size={13} strokeWidth={2.5} />
                  Create your first roadmap
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
                {filteredRoadmaps.map((course, idx) => (
                  <motion.div
                    key={course.id}
                    className="roadmap-card"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05, duration: 0.3 }}
                    onClick={() => router.push(`/user/course?id=${course.id}`)}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        marginBottom: 20,
                      }}
                    >
                      <div className="arrow-box">
                        <ArrowRight
                          size={15}
                          color="rgba(0,255,200,0.5)"
                          style={{ transform: "rotate(-45deg)" }}
                        />
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
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <div style={{ flex: 1 }}>
                      <h3
                        className="unb"
                        style={{
                          fontSize: 15,
                          fontWeight: 700,
                          letterSpacing: "-0.02em",
                          lineHeight: 1.35,
                          color: "white",
                          marginBottom: 10,
                        }}
                      >
                        {course.title}
                      </h3>
                      {course.description && (
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
                          {course.description}
                        </p>
                      )}
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

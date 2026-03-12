"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Sidebar from "@/app/_components/SideBar";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Calendar,
  User,
  ArrowUpRight,
  BookOpen,
  ImageIcon,
  Tag,
  Globe,
  Lock,
  Bookmark,
  Mail,
  Phone,
  Layers,
  BarChart2,
} from "lucide-react";

type Roadmap = {
  id: string;
  title: string;
  description: string;
  purpose: string;
  levelFrom?: string;
  levelTo?: string;
  isPublished: boolean;
  createdAt: Date;
};

type Post = {
  id: string;
  images: string[];
  caption: string;
  category: string;
  createdAt: Date;
  saves: string[];
};

type UserInfo = {
  id: string;
  username: string;
  email: string;
  clerkId: string;
  createdAt: Date;
  profilePic: string;
  bio: string;
  location: string;
  phoneNum: string;
  type: string;
  roadmaps: Roadmap[];
  posts: Post[];
};

export default function PublicProfilePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const userId = searchParams.get("id");

  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"roadmaps" | "posts">("roadmaps");

  useEffect(() => {
    if (!userId) return;
    const load = async () => {
      try {
        const res = await fetch(`/api/users/${userId}`);
        setUserInfo(await res.json());
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [userId]);

  const publishedRoadmaps =
    userInfo?.roadmaps.filter((r) => r.isPublished) ?? [];
  const allRoadmaps = userInfo?.roadmaps ?? [];

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
          background: rgba(0,8,7,0.85);
          backdrop-filter: blur(24px);
          border-bottom: 1px solid rgba(0,255,200,0.06);
        }

        /* ── PROFILE BANNER ── */
        .profile-banner {
          position: relative;
          background: rgba(0,255,200,0.02);
          border: 1px solid rgba(0,255,200,0.08);
          border-radius: 24px;
          overflow: hidden;
          padding: 40px 36px 32px;
        }
        .banner-noise {
          position: absolute; inset: 0; pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          background-size: 180px;
          opacity: 0.4;
        }
        .banner-gradient {
          position: absolute; top: 0; right: 0;
          width: 340px; height: 340px;
          background: radial-gradient(circle at top right, rgba(0,255,200,0.07), transparent 70%);
          pointer-events: none;
        }
        .banner-lines {
          position: absolute; bottom: 0; left: 0; right: 0; height: 60px;
          background: repeating-linear-gradient(90deg, rgba(0,255,200,0.03) 0px, rgba(0,255,200,0.03) 1px, transparent 1px, transparent 40px);
          pointer-events: none;
        }

        /* ── AVATAR ── */
        .avatar-ring {
          position: relative; flex-shrink: 0;
          width: 100px; height: 100px;
        }
        .avatar-ring::before {
          content: '';
          position: absolute; inset: -3px;
          border-radius: 26px;
          background: linear-gradient(135deg, rgba(0,255,200,0.4), rgba(0,255,200,0.05));
          z-index: 0;
        }
        .avatar-img {
          position: relative; z-index: 1;
          width: 100%; height: 100%;
          border-radius: 24px;
          object-fit: cover;
        }
        .avatar-placeholder {
          position: relative; z-index: 1;
          width: 100%; height: 100%;
          border-radius: 24px;
          background: rgba(0,255,200,0.05);
          display: flex; align-items: center; justify-content: center;
        }
        .online-dot {
          position: absolute; bottom: 2px; right: 2px; z-index: 2;
          width: 13px; height: 13px; border-radius: 50%;
          background: #4fffb0;
          box-shadow: 0 0 0 3px rgba(0,8,7,1), 0 0 12px #4fffb0;
          animation: pulse-dot 2s ease-in-out infinite;
        }
        @keyframes pulse-dot {
          0%, 100% { box-shadow: 0 0 0 3px rgba(0,8,7,1), 0 0 12px #4fffb0; }
          50% { box-shadow: 0 0 0 3px rgba(0,8,7,1), 0 0 20px #4fffb0; }
        }

        /* ── TYPE BADGE ── */
        .type-badge {
          display: inline-flex; align-items: center; gap: 5px;
          padding: 4px 12px; border-radius: 20px;
          background: rgba(0,255,200,0.08);
          border: 1px solid rgba(0,255,200,0.2);
          font-size: 9px; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: rgba(0,255,200,0.8);
          font-family: 'Space Mono', monospace;
        }

        /* ── STAT CARDS ── */
        .stat-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
          margin-top: 32px;
        }
        .stat-card {
          background: rgba(0,0,0,0.25);
          border: 1px solid rgba(0,255,200,0.08);
          border-radius: 16px;
          padding: 18px 16px;
          display: flex; flex-direction: column;
          align-items: center; gap: 6px;
          position: relative; overflow: hidden;
          transition: border-color 0.2s;
        }
        .stat-card::before {
          content: '';
          position: absolute; bottom: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(to right, transparent, rgba(0,255,200,0.3), transparent);
          opacity: 0; transition: opacity 0.2s;
        }
        .stat-card:hover { border-color: rgba(0,255,200,0.15); }
        .stat-card:hover::before { opacity: 1; }
        .stat-num {
          font-family: 'Unbounded', sans-serif;
          font-size: 26px; font-weight: 900;
          color: white; letter-spacing: -0.05em;
          line-height: 1;
        }
        .stat-label {
          font-family: 'Space Mono', monospace;
          font-size: 8px; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: rgba(0,255,200,0.35);
        }

        /* ── INFO CHIPS ── */
        .info-chips {
          display: flex; flex-wrap: wrap; gap: 8px;
          margin-top: 14px;
        }
        .info-chip {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 5px 12px; border-radius: 10px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          font-family: 'Space Mono', monospace;
          font-size: 10px; color: rgba(255,255,255,0.35);
          transition: all 0.2s;
        }

        /* ── DETAILS CARD ── */
        .details-card {
          background: rgba(0,255,200,0.015);
          border: 1px solid rgba(0,255,200,0.07);
          border-radius: 20px;
          padding: 28px;
        }
        .detail-row {
          display: flex; align-items: flex-start; gap: 14px;
          padding: 12px 0;
          border-bottom: 1px solid rgba(255,255,255,0.04);
        }
        .detail-row:last-child { border-bottom: none; }
        .detail-icon {
          width: 32px; height: 32px; border-radius: 9px; flex-shrink: 0;
          background: rgba(0,255,200,0.05);
          border: 1px solid rgba(0,255,200,0.1);
          display: flex; align-items: center; justify-content: center;
        }
        .detail-key {
          font-family: 'Space Mono', monospace;
          font-size: 8px; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: rgba(0,255,200,0.35);
          margin-bottom: 3px;
        }
        .detail-val {
          font-family: 'Space Mono', monospace;
          font-size: 12px; color: rgba(255,255,255,0.6);
          line-height: 1.55;
        }

        /* ── TABS ── */
        .tab-bar {
          display: flex; gap: 6px;
          background: rgba(0,0,0,0.2);
          border: 1px solid rgba(0,255,200,0.07);
          border-radius: 14px;
          padding: 5px;
          width: fit-content;
        }
        .tab-btn {
          display: inline-flex; align-items: center; gap: 7px;
          padding: 8px 18px; border-radius: 10px;
          font-family: 'Space Mono', monospace;
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.12em; text-transform: uppercase;
          cursor: pointer; transition: all 0.2s; border: none;
        }
        .tab-btn.active {
          background: rgba(0,255,200,0.1);
          color: rgba(0,255,200,0.9);
          box-shadow: inset 0 0 0 1px rgba(0,255,200,0.2);
        }
        .tab-btn.inactive { background: transparent; color: rgba(255,255,255,0.2); }
        .tab-btn.inactive:hover { color: rgba(255,255,255,0.5); }
        .tab-count {
          padding: 1px 7px; border-radius: 20px; font-size: 9px;
        }

        /* ── ROADMAP CARD ── */
        .rm-card {
          background: rgba(0,255,200,0.015);
          border: 1px solid rgba(0,255,200,0.07);
          border-radius: 18px; padding: 24px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.23,1,0.32,1);
          display: flex; flex-direction: column; gap: 14px;
          position: relative; overflow: hidden;
        }
        .rm-card::after {
          content: '';
          position: absolute; top: 0; right: 0;
          width: 80px; height: 80px;
          background: radial-gradient(circle at top right, rgba(0,255,200,0.06), transparent);
          pointer-events: none;
        }
        .rm-card:hover {
          border-color: rgba(0,255,200,0.22);
          transform: translateY(-4px);
          box-shadow: 0 24px 48px rgba(0,0,0,0.3), 0 0 0 1px rgba(0,255,200,0.1);
        }
        .rm-arrow {
          width: 32px; height: 32px; border-radius: 10px;
          background: rgba(0,255,200,0.05);
          border: 1px solid rgba(0,255,200,0.1);
          display: flex; align-items: center; justify-content: center;
          transition: all 0.2s;
        }
        .rm-card:hover .rm-arrow {
          background: rgba(0,255,200,0.12);
          border-color: rgba(0,255,200,0.3);
        }
        .level-pill {
          display: inline-flex; align-items: center; gap: 4px;
          padding: 3px 10px; border-radius: 20px;
          background: rgba(0,255,200,0.05);
          border: 1px solid rgba(0,255,200,0.12);
          font-size: 8px; font-weight: 700;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: rgba(0,255,200,0.5);
          font-family: 'Space Mono', monospace;
        }
        .pub-badge {
          display: inline-flex; align-items: center; gap: 4px;
          padding: 3px 9px; border-radius: 20px;
          font-size: 8px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
          font-family: 'Space Mono', monospace;
        }
        .pub-badge.published {
          background: rgba(0,255,200,0.06);
          border: 1px solid rgba(0,255,200,0.15);
          color: rgba(0,255,200,0.55);
        }
        .pub-badge.draft {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          color: rgba(255,255,255,0.2);
        }
        .purpose-text {
          font-family: 'Space Mono', monospace;
          font-size: 10px; color: rgba(0,255,200,0.3);
          font-style: italic; line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 1; -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* ── POST CARD ── */
        .post-card {
          background: rgba(0,255,200,0.015);
          border: 1px solid rgba(0,255,200,0.07);
          border-radius: 18px; overflow: hidden;
          transition: all 0.3s cubic-bezier(0.23,1,0.32,1);
          cursor: pointer;
        }
        .post-card:hover {
          border-color: rgba(0,255,200,0.2);
          transform: translateY(-4px);
          box-shadow: 0 24px 48px rgba(0,0,0,0.3);
        }
        .post-img-wrap {
          position: relative; width: 100%; padding-top: 56%; overflow: hidden;
          background: rgba(0,255,200,0.02);
        }
        .post-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
        .post-card:hover .post-img { transform: scale(1.05); }
        .post-more {
          position: absolute; top: 10px; right: 10px;
          padding: 3px 9px; border-radius: 8px;
          background: rgba(0,0,0,0.6); backdrop-filter: blur(8px);
          font-family: 'Space Mono', monospace;
          font-size: 8px; color: rgba(255,255,255,0.7);
        }
        .cat-pill {
          display: inline-flex; align-items: center; gap: 5px;
          padding: 3px 10px; border-radius: 20px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          font-family: 'Space Mono', monospace;
          font-size: 8px; font-weight: 700;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: rgba(255,255,255,0.3);
        }

        /* ── MISC ── */
        .teal-divider { height: 1px; background: linear-gradient(to right, rgba(0,255,200,0.18), transparent); }
        .section-head { display: flex; align-items: center; gap: 10px; }
        .section-bar { width: 3px; height: 16px; border-radius: 2px; background: rgba(0,255,200,0.5); box-shadow: 0 0 8px rgba(0,255,200,0.3); }
        .empty-state { padding: 60px 0; text-align: center; }
      `}</style>

      <aside style={{ width: 210 }}>
        <Sidebar />
      </aside>

      <main className="flex-1 flex flex-col" style={{ marginLeft: 210 }}>
        <nav className="nav-bar sticky top-0 z-40 flex items-center px-10 py-3">
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
              Profile
            </span>
          </div>
        </nav>

        <div className="flex-grow px-10 lg:px-12 py-10">
          <div
            style={{
              maxWidth: 900,
              margin: "0 auto",
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >
            {loading && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "80px 0",
                }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  style={{
                    width: 22,
                    height: 22,
                    border: "1.5px solid rgba(0,255,200,0.15)",
                    borderTop: "1.5px solid rgba(0,255,200,0.8)",
                    borderRadius: "50%",
                  }}
                />
                <span
                  className="mono"
                  style={{
                    fontSize: 10,
                    color: "rgba(0,255,200,0.3)",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                  }}
                >
                  Loading profile...
                </span>
              </div>
            )}

            {!loading && !userInfo && (
              <div style={{ padding: "80px 0", textAlign: "center" }}>
                <h2
                  className="unb"
                  style={{ fontSize: 22, color: "white", marginBottom: 10 }}
                >
                  User not found.
                </h2>
                <p
                  className="mono"
                  style={{ fontSize: 10, color: "rgba(255,255,255,0.2)" }}
                >
                  This profile does not exist.
                </p>
              </div>
            )}

            {!loading && userInfo && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                style={{ display: "flex", flexDirection: "column", gap: 16 }}
              >
                <div className="profile-banner">
                  <div className="banner-noise" />
                  <div className="banner-gradient" />
                  <div className="banner-lines" />

                  <div
                    className="unb"
                    style={{
                      position: "absolute",
                      top: -40,
                      right: -10,
                      fontSize: 220,
                      fontWeight: 900,
                      lineHeight: 1,
                      WebkitTextStroke: "1px rgba(0,255,200,0.05)",
                      color: "transparent",
                      pointerEvents: "none",
                      userSelect: "none",
                      letterSpacing: "-0.05em",
                    }}
                  >
                    {userInfo.username?.[0]?.toUpperCase()}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 28,
                      position: "relative",
                    }}
                  >
                    <div className="avatar-ring">
                      {userInfo.profilePic ? (
                        <img
                          src={userInfo.profilePic}
                          alt={userInfo.username}
                          className="avatar-img"
                        />
                      ) : (
                        <div className="avatar-placeholder">
                          <User size={36} color="rgba(0,255,200,0.3)" />
                        </div>
                      )}
                      <div className="online-dot" />
                    </div>

                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          marginBottom: 10,
                          flexWrap: "wrap",
                        }}
                      >
                        <h1
                          className="unb"
                          style={{
                            fontSize: "clamp(24px,3.5vw,38px)",
                            fontWeight: 900,
                            letterSpacing: "-0.04em",
                            color: "white",
                            lineHeight: 1.05,
                          }}
                        >
                          {userInfo.username}
                        </h1>
                        {userInfo.type && (
                          <span className="type-badge">{userInfo.type}</span>
                        )}
                      </div>

                      {userInfo.bio && (
                        <p
                          className="mono"
                          style={{
                            fontSize: 12,
                            color: "rgba(255,255,255,0.4)",
                            lineHeight: 1.75,
                            maxWidth: 500,
                            marginBottom: 12,
                          }}
                        >
                          {userInfo.bio}
                        </p>
                      )}

                      <div className="info-chips">
                        {userInfo.location && (
                          <span className="info-chip">
                            <MapPin size={10} color="rgba(0,255,200,0.4)" />
                            {userInfo.location}
                          </span>
                        )}
                        {userInfo.createdAt && (
                          <span className="info-chip">
                            <Calendar size={10} color="rgba(0,255,200,0.4)" />
                            Joined{" "}
                            {new Date(userInfo.createdAt).toLocaleDateString(
                              "en-US",
                              { month: "long", year: "numeric" },
                            )}
                          </span>
                        )}
                        {userInfo.email && (
                          <span className="info-chip">
                            <Mail size={10} color="rgba(0,255,200,0.4)" />
                            {userInfo.email}
                          </span>
                        )}
                        {userInfo.phoneNum && (
                          <span className="info-chip">
                            <Phone size={10} color="rgba(0,255,200,0.4)" />
                            {userInfo.phoneNum}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="stat-grid">
                    {[
                      {
                        icon: <Layers size={14} color="rgba(0,255,200,0.5)" />,
                        label: "Roadmaps",
                        value: allRoadmaps.length,
                      },
                      {
                        icon: <Globe size={14} color="rgba(0,255,200,0.5)" />,
                        label: "Published",
                        value: publishedRoadmaps.length,
                      },
                      {
                        icon: (
                          <ImageIcon size={14} color="rgba(0,255,200,0.5)" />
                        ),
                        label: "Posts",
                        value: userInfo.posts.length,
                      },
                    ].map((s, i) => (
                      <motion.div
                        key={s.label}
                        className="stat-card"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + i * 0.06 }}
                      >
                        <div style={{ marginBottom: 4 }}>{s.icon}</div>
                        <span className="stat-num">{s.value}</span>
                        <span className="stat-label">{s.label}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div className="tab-bar">
                    <button
                      className={`tab-btn ${activeTab === "roadmaps" ? "active" : "inactive"}`}
                      onClick={() => setActiveTab("roadmaps")}
                    >
                      <BookOpen size={12} /> Roadmaps
                      <span
                        className="tab-count"
                        style={{
                          background:
                            activeTab === "roadmaps"
                              ? "rgba(0,255,200,0.12)"
                              : "rgba(255,255,255,0.05)",
                          color:
                            activeTab === "roadmaps"
                              ? "rgba(0,255,200,0.7)"
                              : "rgba(255,255,255,0.2)",
                        }}
                      >
                        {allRoadmaps.length}
                      </span>
                    </button>
                    <button
                      className={`tab-btn ${activeTab === "posts" ? "active" : "inactive"}`}
                      onClick={() => setActiveTab("posts")}
                    >
                      <ImageIcon size={12} /> Posts
                      <span
                        className="tab-count"
                        style={{
                          background:
                            activeTab === "posts"
                              ? "rgba(0,255,200,0.12)"
                              : "rgba(255,255,255,0.05)",
                          color:
                            activeTab === "posts"
                              ? "rgba(0,255,200,0.7)"
                              : "rgba(255,255,255,0.2)",
                        }}
                      >
                        {userInfo.posts.length}
                      </span>
                    </button>
                  </div>
                  <span
                    className="mono"
                    style={{
                      fontSize: 9,
                      color: "rgba(255,255,255,0.15)",
                      letterSpacing: "0.15em",
                    }}
                  ></span>
                </div>

                <div className="teal-divider" />

                <AnimatePresence mode="wait">
                  {activeTab === "roadmaps" && (
                    <motion.div
                      key="roadmaps"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {allRoadmaps.length === 0 ? (
                        <div className="empty-state">
                          <p
                            className="mono"
                            style={{
                              fontSize: 10,
                              color: "rgba(255,255,255,0.15)",
                              letterSpacing: "0.15em",
                            }}
                          >
                            No roadmaps yet.
                          </p>
                        </div>
                      ) : (
                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(2, 1fr)",
                            gap: 14,
                          }}
                        >
                          {allRoadmaps.map((r, idx) => (
                            <motion.div
                              key={r.id}
                              className="rm-card"
                              initial={{ opacity: 0, y: 14 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: idx * 0.05 }}
                              onClick={() =>
                                r.isPublished &&
                                router.push(`/user/course?id=${r.id}`)
                              }
                            >
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "flex-start",
                                }}
                              >
                                <div className="rm-arrow">
                                  <ArrowUpRight
                                    size={14}
                                    color="rgba(0,255,200,0.5)"
                                  />
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    gap: 6,
                                    alignItems: "center",
                                  }}
                                >
                                  <span
                                    className={`pub-badge ${r.isPublished ? "published" : "draft"}`}
                                  >
                                    {r.isPublished ? (
                                      <>
                                        <Globe size={8} /> Published
                                      </>
                                    ) : (
                                      <>
                                        <Lock size={8} /> Draft
                                      </>
                                    )}
                                  </span>
                                </div>
                              </div>

                              <div>
                                <h3
                                  className="unb"
                                  style={{
                                    fontSize: 14,
                                    fontWeight: 700,
                                    letterSpacing: "-0.02em",
                                    lineHeight: 1.35,
                                    color: "white",
                                    marginBottom: 6,
                                  }}
                                >
                                  {r.title}
                                </h3>
                                {r.description && (
                                  <p
                                    className="mono"
                                    style={{
                                      fontSize: 10,
                                      color: "rgba(255,255,255,0.25)",
                                      lineHeight: 1.65,
                                      display: "-webkit-box",
                                      WebkitLineClamp: 2,
                                      WebkitBoxOrient: "vertical",
                                      overflow: "hidden",
                                    }}
                                  >
                                    {r.description}
                                  </p>
                                )}
                              </div>

                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                  flexWrap: "wrap",
                                  gap: 6,
                                }}
                              >
                                {r.levelFrom && r.levelTo && (
                                  <span className="level-pill">
                                    <BarChart2 size={8} /> {r.levelFrom} →{" "}
                                    {r.levelTo}
                                  </span>
                                )}
                                <span
                                  className="mono"
                                  style={{
                                    fontSize: 8,
                                    color: "rgba(255,255,255,0.15)",
                                    marginLeft: "auto",
                                  }}
                                >
                                  {new Date(r.createdAt).toLocaleDateString(
                                    "en-US",
                                    {
                                      month: "short",
                                      day: "numeric",
                                      year: "numeric",
                                    },
                                  )}
                                </span>
                              </div>

                              <div
                                style={{
                                  height: 1,
                                  background:
                                    "linear-gradient(to right, rgba(0,255,200,0.12), transparent)",
                                }}
                              />
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  )}

                  {activeTab === "posts" && (
                    <motion.div
                      key="posts"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {userInfo.posts.length === 0 ? (
                        <div className="empty-state">
                          <p
                            className="mono"
                            style={{
                              fontSize: 10,
                              color: "rgba(255,255,255,0.15)",
                              letterSpacing: "0.15em",
                            }}
                          >
                            No posts yet.
                          </p>
                        </div>
                      ) : (
                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(2, 1fr)",
                            gap: 14,
                          }}
                        >
                          {userInfo.posts.map((post, idx) => (
                            <motion.div
                              key={post.id}
                              className="post-card"
                              initial={{ opacity: 0, y: 14 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: idx * 0.05 }}
                            >
                              <div className="post-img-wrap">
                                {post.images?.[0] ? (
                                  <img
                                    src={post.images[0]}
                                    alt="post"
                                    className="post-img"
                                  />
                                ) : (
                                  <div
                                    style={{
                                      position: "absolute",
                                      inset: 0,
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <ImageIcon
                                      size={28}
                                      color="rgba(0,255,200,0.1)"
                                    />
                                  </div>
                                )}
                                {post.images?.length > 1 && (
                                  <div className="post-more">
                                    +{post.images.length - 1}
                                  </div>
                                )}
                              </div>

                              <div
                                style={{
                                  padding: "16px 18px 18px",
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: 10,
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  {post.category && (
                                    <span className="cat-pill">
                                      <Tag size={8} />
                                      {post.category}
                                    </span>
                                  )}
                                  <span
                                    className="mono"
                                    style={{
                                      fontSize: 8,
                                      color: "rgba(255,255,255,0.15)",
                                      marginLeft: "auto",
                                    }}
                                  >
                                    {new Date(
                                      post.createdAt,
                                    ).toLocaleDateString("en-US", {
                                      month: "short",
                                      day: "numeric",
                                      year: "numeric",
                                    })}
                                  </span>
                                </div>

                                <p
                                  className="mono"
                                  style={{
                                    fontSize: 11,
                                    color: "rgba(255,255,255,0.45)",
                                    lineHeight: 1.7,
                                    display: "-webkit-box",
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: "vertical",
                                    overflow: "hidden",
                                  }}
                                >
                                  {post.caption}
                                </p>

                                {post.saves?.length > 0 && (
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 6,
                                      paddingTop: 4,
                                      borderTop:
                                        "1px solid rgba(255,255,255,0.04)",
                                    }}
                                  >
                                    <Bookmark
                                      size={10}
                                      color="rgba(0,255,200,0.4)"
                                    />
                                    <span
                                      className="mono"
                                      style={{
                                        fontSize: 9,
                                        color: "rgba(0,255,200,0.3)",
                                      }}
                                    >
                                      {post.saves.length} save
                                      {post.saves.length !== 1 ? "s" : ""}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

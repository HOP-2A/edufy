"use client";
import { useProvider } from "@/providers/AuthProviders";
import Sidebar from "../_components/SideBar";
import {
  MapPin,
  Phone,
  User,
  Check,
  X,
  Pencil,
  Camera,
  AtSign,
  BookOpen,
  ImageIcon,
  Tag,
  Globe,
  Lock,
  Bookmark,
  Layers,
  BarChart2,
  ArrowUpRight,
  Calendar,
  Mail,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

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

export default function Profile() {
  const { user } = useProvider();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<"roadmaps" | "posts">("roadmaps");

  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [saveError, setSaveError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fullUser, setFullUser] = useState<
    (typeof user & { roadmaps: Roadmap[]; posts: Post[] }) | null
  >(null);
  const [dataLoading, setDataLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setUsername(user.username || "");
      setBio(user.bio || "");
      setLocation(user.location || "");
      setPhoneNum(user.phoneNum || "");
      setProfilePic(user.profilePic || "");
      setImagePreview("");
      setImageFile(null);
    }
  }, [user]);

  useEffect(() => {
    if (!user?.id) return;
    const fetchData = async () => {
      setDataLoading(true);
      try {
        const res = await fetch(`/api/users/${user.id}`);
        const data = await res.json();
        setFullUser(data);
      } catch (err) {
        console.error("Failed to fetch user data:", err);
      } finally {
        setDataLoading(false);
      }
    };
    fetchData();
  }, [user?.id]);

  const saveProfile = async () => {
    setSaving(true);
    setSaveError("");
    try {
      let res: Response;

      if (imageFile) {
        setUploading(true);
        const fd = new FormData();
        fd.append("username", username);
        fd.append("bio", bio);
        fd.append("location", location);
        fd.append("phoneNum", phoneNum);
        fd.append("image", imageFile);
        res = await fetch("/api/editprofile", { method: "PUT", body: fd });
        setUploading(false);
      } else {
        res = await fetch("/api/editprofile", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username,
            bio,
            location,
            phoneNum,
            profilePic,
          }),
        });
      }

      const ct = res.headers.get("content-type");
      if (!ct || !ct.includes("application/json")) {
        const text = await res.text();
        console.error("Non-JSON response:", text);
        throw new Error("Invalid server response");
      }
      const data = await res.json();
      if (!res.ok)
        throw new Error(data.detail || data.error || "Update failed");
      if (data.profilePic) setProfilePic(data.profilePic);
      setImageFile(null);
      setImagePreview("");
      setIsEditing(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);

      if (user?.id) {
        const r = await fetch(`/api/users/${user.id}`);
        setFullUser(await r.json());
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error("saveProfile error:", msg);
      setSaveError(msg);
    } finally {
      setSaving(false);
      setUploading(false);
      window.location.reload();
    }
  };

  const cancelEdit = () => {
    if (user) {
      setUsername(user.username || "");
      setBio(user.bio || "");
      setLocation(user.location || "");
      setPhoneNum(user.phoneNum || "");
      setProfilePic(user.profilePic || "");
      setImagePreview("");
      setImageFile(null);
    }
    setIsEditing(false);
    setSaveError("");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const roadmaps: Roadmap[] = fullUser?.roadmaps ?? [];
  const posts: Post[] = fullUser?.posts ?? [];
  const publishedRoadmaps = roadmaps.filter((r) => r.isPublished);

  if (!user)
    return (
      <div
        className="flex min-h-screen text-white"
        style={{ fontFamily: "'Space Mono', monospace" }}
      >
        <aside className="fixed inset-y-0 z-50" style={{ width: 210 }}>
          <Sidebar />
        </aside>
        <main
          className="flex-1 flex items-center justify-center"
          style={{ marginLeft: 210 }}
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
        </main>
      </div>
    );

  return (
    <div
      className="flex min-h-screen text-white antialiased"
      style={{ fontFamily: "'Space Mono', monospace" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@400;700;900&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');
        .unb { font-family: 'Unbounded', sans-serif; }
        .mono { font-family: 'Space Mono', monospace; }
        .nav-bar { background: rgba(0,8,7,0.85); backdrop-filter: blur(24px); border-bottom: 1px solid rgba(0,255,200,0.06); }

        .profile-banner { position: relative; background: rgba(0,255,200,0.02); border: 1px solid rgba(0,255,200,0.08); border-radius: 24px; overflow: hidden; padding: 40px 36px 32px; transition: border-color 0.3s; }
        .profile-banner.editing { border-color: rgba(0,255,200,0.18); }
        .banner-noise { position: absolute; inset: 0; pointer-events: none; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E"); background-size: 180px; opacity: 0.4; }
        .banner-gradient { position: absolute; top: 0; right: 0; width: 340px; height: 340px; background: radial-gradient(circle at top right, rgba(0,255,200,0.07), transparent 70%); pointer-events: none; }
        .banner-lines { position: absolute; bottom: 0; left: 0; right: 0; height: 60px; background: repeating-linear-gradient(90deg, rgba(0,255,200,0.03) 0px, rgba(0,255,200,0.03) 1px, transparent 1px, transparent 40px); pointer-events: none; }

        .avatar-ring { position: relative; flex-shrink: 0; width: 100px; height: 100px; }
        .avatar-ring::before { content: ''; position: absolute; inset: -3px; border-radius: 26px; background: linear-gradient(135deg, rgba(0,255,200,0.4), rgba(0,255,200,0.05)); z-index: 0; }
        .avatar-img { position: relative; z-index: 1; width: 100%; height: 100%; border-radius: 24px; object-fit: cover; }
        .avatar-placeholder { position: relative; z-index: 1; width: 100%; height: 100%; border-radius: 24px; background: rgba(0,255,200,0.05); display: flex; align-items: center; justify-content: center; }
        .online-dot { position: absolute; bottom: 2px; right: 2px; z-index: 2; width: 13px; height: 13px; border-radius: 50%; background: #4fffb0; box-shadow: 0 0 0 3px rgba(0,8,7,1), 0 0 12px #4fffb0; animation: pulse-dot 2s ease-in-out infinite; }
        @keyframes pulse-dot { 0%, 100% { box-shadow: 0 0 0 3px rgba(0,8,7,1), 0 0 12px #4fffb0; } 50% { box-shadow: 0 0 0 3px rgba(0,8,7,1), 0 0 20px #4fffb0; } }

        .type-badge { display: inline-flex; align-items: center; gap: 5px; padding: 4px 12px; border-radius: 20px; background: rgba(0,255,200,0.08); border: 1px solid rgba(0,255,200,0.2); font-size: 9px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(0,255,200,0.8); font-family: 'Space Mono', monospace; }
        .info-chips { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 14px; }
        .info-chip { display: inline-flex; align-items: center; gap: 6px; padding: 5px 12px; border-radius: 10px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); font-family: 'Space Mono', monospace; font-size: 10px; color: rgba(255,255,255,0.35); }

        .stat-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-top: 32px; }
        .stat-card { background: rgba(0,0,0,0.25); border: 1px solid rgba(0,255,200,0.08); border-radius: 16px; padding: 18px 16px; display: flex; flex-direction: column; align-items: center; gap: 6px; position: relative; overflow: hidden; transition: border-color 0.2s; }
        .stat-card::before { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 2px; background: linear-gradient(to right, transparent, rgba(0,255,200,0.3), transparent); opacity: 0; transition: opacity 0.2s; }
        .stat-card:hover { border-color: rgba(0,255,200,0.15); }
        .stat-card:hover::before { opacity: 1; }
        .stat-num { font-family: 'Unbounded', sans-serif; font-size: 26px; font-weight: 900; color: white; letter-spacing: -0.05em; line-height: 1; }
        .stat-label { font-family: 'Space Mono', monospace; font-size: 8px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(0,255,200,0.35); }

        .edit-fields-card { background: rgba(0,255,200,0.02); border: 1px solid rgba(0,255,200,0.1); border-radius: 20px; overflow: hidden; position: relative; }
        .field-row { display: flex; align-items: flex-start; gap: 14px; padding: 18px 28px; border-bottom: 1px solid rgba(255,255,255,0.04); }
        .field-row:last-child { border-bottom: none; }
        .field-icon { width: 34px; height: 34px; border-radius: 10px; flex-shrink: 0; background: rgba(0,255,200,0.05); border: 1px solid rgba(0,255,200,0.1); display: flex; align-items: center; justify-content: center; margin-top: 2px; }
        .field-label { font-size: 8px; font-weight: 700; letter-spacing: 0.25em; text-transform: uppercase; color: rgba(0,255,200,0.35); margin-bottom: 6px; display: block; }

        .teal-input { width: 100%; padding: 12px 16px; background: rgba(0,255,200,0.03); border: 1px solid rgba(0,255,200,0.1); border-radius: 11px; font-family: 'Space Mono', monospace; font-size: 12px; color: white; outline: none; transition: all 0.2s; resize: none; }
        .teal-input::placeholder { color: rgba(255,255,255,0.15); }
        .teal-input:focus { border-color: rgba(0,255,200,0.32); background: rgba(0,255,200,0.05); box-shadow: 0 0 0 3px rgba(0,255,200,0.05); }

        .tab-bar { display: flex; gap: 6px; background: rgba(0,0,0,0.2); border: 1px solid rgba(0,255,200,0.07); border-radius: 14px; padding: 5px; width: fit-content; }
        .tab-btn { display: inline-flex; align-items: center; gap: 7px; padding: 8px 18px; border-radius: 10px; font-family: 'Space Mono', monospace; font-size: 10px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; cursor: pointer; transition: all 0.2s; border: none; }
        .tab-btn.active { background: rgba(0,255,200,0.1); color: rgba(0,255,200,0.9); box-shadow: inset 0 0 0 1px rgba(0,255,200,0.2); }
        .tab-btn.inactive { background: transparent; color: rgba(255,255,255,0.2); }
        .tab-btn.inactive:hover { color: rgba(255,255,255,0.5); }
        .tab-count { padding: 1px 7px; border-radius: 20px; font-size: 9px; }

        .rm-card { background: rgba(0,255,200,0.015); border: 1px solid rgba(0,255,200,0.07); border-radius: 18px; padding: 24px; cursor: pointer; transition: all 0.3s cubic-bezier(0.23,1,0.32,1); display: flex; flex-direction: column; gap: 14px; position: relative; overflow: hidden; }
        .rm-card::after { content: ''; position: absolute; top: 0; right: 0; width: 80px; height: 80px; background: radial-gradient(circle at top right, rgba(0,255,200,0.06), transparent); pointer-events: none; }
        .rm-card:hover { border-color: rgba(0,255,200,0.22); transform: translateY(-4px); box-shadow: 0 24px 48px rgba(0,0,0,0.3), 0 0 0 1px rgba(0,255,200,0.1); }
        .rm-arrow { width: 32px; height: 32px; border-radius: 10px; background: rgba(0,255,200,0.05); border: 1px solid rgba(0,255,200,0.1); display: flex; align-items: center; justify-content: center; transition: all 0.2s; }
        .rm-card:hover .rm-arrow { background: rgba(0,255,200,0.12); border-color: rgba(0,255,200,0.3); }
        .level-pill { display: inline-flex; align-items: center; gap: 4px; padding: 3px 10px; border-radius: 20px; background: rgba(0,255,200,0.05); border: 1px solid rgba(0,255,200,0.12); font-size: 8px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(0,255,200,0.5); font-family: 'Space Mono', monospace; }
        .pub-badge { display: inline-flex; align-items: center; gap: 4px; padding: 3px 9px; border-radius: 20px; font-size: 8px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; font-family: 'Space Mono', monospace; }
        .pub-badge.published { background: rgba(0,255,200,0.06); border: 1px solid rgba(0,255,200,0.15); color: rgba(0,255,200,0.55); }
        .pub-badge.draft { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); color: rgba(255,255,255,0.2); }
        .purpose-text { font-family: 'Space Mono', monospace; font-size: 10px; color: rgba(0,255,200,0.3); font-style: italic; line-height: 1.5; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; }

        .post-card { background: rgba(0,255,200,0.015); border: 1px solid rgba(0,255,200,0.07); border-radius: 18px; overflow: hidden; transition: all 0.3s cubic-bezier(0.23,1,0.32,1); }
        .post-card:hover { border-color: rgba(0,255,200,0.2); transform: translateY(-4px); box-shadow: 0 24px 48px rgba(0,0,0,0.3); }
        .post-img-wrap { position: relative; width: 100%; padding-top: 56%; overflow: hidden; background: rgba(0,255,200,0.02); }
        .post-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
        .post-card:hover .post-img { transform: scale(1.05); }
        .post-more { position: absolute; top: 10px; right: 10px; padding: 3px 9px; border-radius: 8px; background: rgba(0,0,0,0.6); backdrop-filter: blur(8px); font-family: 'Space Mono', monospace; font-size: 8px; color: rgba(255,255,255,0.7); }
        .cat-pill { display: inline-flex; align-items: center; gap: 5px; padding: 3px 10px; border-radius: 20px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); font-family: 'Space Mono', monospace; font-size: 8px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(255,255,255,0.3); }

        .btn-save { display: inline-flex; align-items: center; gap: 7px; padding: 12px 24px; border-radius: 12px; background: rgba(0,255,200,0.1); border: 1px solid rgba(0,255,200,0.25); color: rgba(0,255,200,0.95); font-family: 'Unbounded', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; cursor: pointer; transition: all 0.2s; }
        .btn-save:hover:not(:disabled) { background: rgba(0,255,200,0.16); border-color: rgba(0,255,200,0.4); transform: translateY(-1px); }
        .btn-save:disabled { opacity: 0.45; cursor: not-allowed; }
        .btn-cancel { display: inline-flex; align-items: center; gap: 7px; padding: 12px 20px; border-radius: 12px; background: transparent; border: 1px solid rgba(255,255,255,0.07); color: rgba(255,255,255,0.3); font-family: 'Space Mono', monospace; font-size: 10px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; cursor: pointer; transition: all 0.2s; }
        .btn-cancel:hover { border-color: rgba(255,255,255,0.15); color: rgba(255,255,255,0.6); }
        .btn-edit { display: inline-flex; align-items: center; gap: 7px; padding: 10px 20px; border-radius: 11px; background: rgba(0,255,200,0.05); border: 1px solid rgba(0,255,200,0.12); color: rgba(0,255,200,0.6); font-family: 'Space Mono', monospace; font-size: 9px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; cursor: pointer; transition: all 0.2s; }
        .btn-edit:hover { background: rgba(0,255,200,0.1); border-color: rgba(0,255,200,0.22); color: rgba(0,255,200,0.9); }

        .teal-divider { height: 1px; background: linear-gradient(to right, rgba(0,255,200,0.18), transparent); }
        .empty-state { padding: 60px 0; text-align: center; }
        .saved-toast { position: fixed; bottom: 32px; right: 32px; z-index: 200; display: flex; align-items: center; gap: 10px; padding: 12px 20px; border-radius: 14px; background: rgba(0,20,16,0.95); border: 1px solid rgba(0,255,200,0.2); backdrop-filter: blur(16px); box-shadow: 0 16px 40px rgba(0,0,0,0.4); }
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              style={{ display: "flex", flexDirection: "column", gap: 16 }}
            >
              <div className={`profile-banner ${isEditing ? "editing" : ""}`}>
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
                  {user.username?.[0]?.toUpperCase()}
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 28,
                    position: "relative",
                  }}
                >
                  <div
                    className="avatar-ring"
                    style={{ cursor: isEditing ? "pointer" : "default" }}
                    onClick={() => isEditing && fileInputRef.current?.click()}
                  >
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="preview"
                        className="avatar-img"
                      />
                    ) : profilePic ? (
                      <img
                        src={profilePic}
                        alt={user.username}
                        className="avatar-img"
                      />
                    ) : (
                      <div className="avatar-placeholder">
                        <User size={36} color="rgba(0,255,200,0.3)" />
                      </div>
                    )}
                    {!isEditing && <div className="online-dot" />}
                    {isEditing && (
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          zIndex: 2,
                          borderRadius: 24,
                          background: "rgba(0,0,0,0.5)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backdropFilter: "blur(2px)",
                        }}
                      >
                        <Camera size={22} color="rgba(0,255,200,0.8)" />
                      </div>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleImageChange}
                    />
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
                        {user.username}
                      </h1>
                    </div>
                    {user.bio && !isEditing && (
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
                        {user.bio}
                      </p>
                    )}
                    <div className="info-chips">
                      {user.location && (
                        <span className="info-chip">
                          <MapPin size={10} color="rgba(0,255,200,0.4)" />
                          {user.location}
                        </span>
                      )}
                      {user.createdAt && (
                        <span className="info-chip">
                          <Calendar size={10} color="rgba(0,255,200,0.4)" />
                          Joined{" "}
                          {new Date(user.createdAt).toLocaleDateString(
                            "en-US",
                            { month: "long", year: "numeric" },
                          )}
                        </span>
                      )}
                      {user.email && (
                        <span className="info-chip">
                          <Mail size={10} color="rgba(0,255,200,0.4)" />
                          {user.email}
                        </span>
                      )}
                      {user.phoneNum && !isEditing && (
                        <span className="info-chip">
                          <Phone size={10} color="rgba(0,255,200,0.4)" />
                          {user.phoneNum}
                        </span>
                      )}
                    </div>
                  </div>

                  {!isEditing && (
                    <button
                      className="btn-edit"
                      onClick={() => setIsEditing(true)}
                    >
                      <Pencil size={10} /> Edit
                    </button>
                  )}
                </div>

                <div className="stat-grid">
                  {[
                    {
                      icon: <Layers size={14} color="rgba(0,255,200,0.5)" />,
                      label: "Roadmaps",
                      value: roadmaps.length,
                    },
                    {
                      icon: <Globe size={14} color="rgba(0,255,200,0.5)" />,
                      label: "Published",
                      value: publishedRoadmaps.length,
                    },
                    {
                      icon: <ImageIcon size={14} color="rgba(0,255,200,0.5)" />,
                      label: "Posts",
                      value: posts.length,
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

              <AnimatePresence>
                {isEditing && (
                  <motion.div
                    key="edit-fields"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.22 }}
                    className="edit-fields-card"
                  >
                    <div className="field-row" style={{ paddingTop: 20 }}>
                      <div className="field-icon">
                        <AtSign size={14} color="rgba(0,255,200,0.5)" />
                      </div>
                      <div style={{ flex: 1 }}>
                        <label className="field-label">Username</label>
                        <input
                          className="teal-input"
                          type="text"
                          placeholder="your_username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="field-row">
                      <div className="field-icon">
                        <User size={14} color="rgba(0,255,200,0.5)" />
                      </div>
                      <div style={{ flex: 1 }}>
                        <label className="field-label">Bio</label>
                        <textarea
                          className="teal-input"
                          rows={3}
                          placeholder="Tell others about yourself..."
                          value={bio}
                          onChange={(e) => setBio(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="field-row">
                      <div className="field-icon">
                        <MapPin size={14} color="rgba(0,255,200,0.5)" />
                      </div>
                      <div style={{ flex: 1 }}>
                        <label className="field-label">Location</label>
                        <input
                          className="teal-input"
                          type="text"
                          placeholder="City, Country"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="field-row">
                      <div className="field-icon">
                        <Phone size={14} color="rgba(0,255,200,0.5)" />
                      </div>
                      <div style={{ flex: 1 }}>
                        <label className="field-label">Phone</label>
                        <input
                          className="teal-input"
                          type="text"
                          placeholder="+1 234 567 8900"
                          value={phoneNum}
                          onChange={(e) => setPhoneNum(e.target.value)}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {saveError && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    style={{
                      padding: "12px 18px",
                      borderRadius: 12,
                      background: "rgba(255,60,60,0.06)",
                      border: "1px solid rgba(255,60,60,0.2)",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 10,
                    }}
                  >
                    <div
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: "rgba(255,80,80,0.8)",
                        flexShrink: 0,
                        marginTop: 4,
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "'Space Mono', monospace",
                        fontSize: 10,
                        color: "rgba(255,120,120,0.9)",
                        lineHeight: 1.6,
                      }}
                    >
                      {saveError}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {isEditing && (
                  <motion.div
                    key="actions"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    style={{
                      display: "flex",
                      gap: 10,
                      justifyContent: "flex-end",
                    }}
                  >
                    <button className="btn-cancel" onClick={cancelEdit}>
                      <X size={11} /> Cancel
                    </button>
                    <button
                      className="btn-save"
                      disabled={saving}
                      onClick={saveProfile}
                    >
                      {saving ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              repeat: Infinity,
                              duration: 0.8,
                              ease: "linear",
                            }}
                            style={{
                              width: 11,
                              height: 11,
                              border: "1.5px solid rgba(0,255,200,0.3)",
                              borderTop: "1.5px solid rgba(0,255,200,0.9)",
                              borderRadius: "50%",
                            }}
                          />
                          {uploading ? "Uploading..." : "Saving..."}
                        </>
                      ) : (
                        <>
                          <Check size={12} /> Save Changes
                        </>
                      )}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

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
                      {roadmaps.length}
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
                      {posts.length}
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
                    {dataLoading ? (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                          padding: "40px 0",
                        }}
                      >
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            repeat: Infinity,
                            duration: 1,
                            ease: "linear",
                          }}
                          style={{
                            width: 18,
                            height: 18,
                            border: "1.5px solid rgba(0,255,200,0.15)",
                            borderTop: "1.5px solid rgba(0,255,200,0.8)",
                            borderRadius: "50%",
                          }}
                        />
                        <span
                          className="mono"
                          style={{
                            fontSize: 9,
                            color: "rgba(0,255,200,0.3)",
                            letterSpacing: "0.2em",
                            textTransform: "uppercase",
                          }}
                        >
                          Loading...
                        </span>
                      </div>
                    ) : roadmaps.length === 0 ? (
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
                        {roadmaps.map((r, idx) => (
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
                    {dataLoading ? (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                          padding: "40px 0",
                        }}
                      >
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            repeat: Infinity,
                            duration: 1,
                            ease: "linear",
                          }}
                          style={{
                            width: 18,
                            height: 18,
                            border: "1.5px solid rgba(0,255,200,0.15)",
                            borderTop: "1.5px solid rgba(0,255,200,0.8)",
                            borderRadius: "50%",
                          }}
                        />
                        <span
                          className="mono"
                          style={{
                            fontSize: 9,
                            color: "rgba(0,255,200,0.3)",
                            letterSpacing: "0.2em",
                            textTransform: "uppercase",
                          }}
                        >
                          Loading...
                        </span>
                      </div>
                    ) : posts.length === 0 ? (
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
                        {posts.map((post, idx) => (
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
                                  {new Date(post.createdAt).toLocaleDateString(
                                    "en-US",
                                    {
                                      month: "short",
                                      day: "numeric",
                                      year: "numeric",
                                    },
                                  )}
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
          </div>
        </div>
      </main>

      <AnimatePresence>
        {saved && (
          <motion.div
            className="saved-toast"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#4fffb0",
                boxShadow: "0 0 8px #4fffb0",
              }}
            />
            <span
              className="mono"
              style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.1em",
                color: "rgba(0,255,200,0.8)",
              }}
            >
              Profile updated.
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

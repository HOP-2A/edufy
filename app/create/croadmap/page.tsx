"use client";
import Sidebar from "@/app/_components/SideBar";
import { useProvider } from "@/providers/AuthProviders";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Plus,
  Trash2,
  BookOpen,
  FileText,
  Video,
  Code,
  Layers,
} from "lucide-react";

const resourceType = ["Video", "Book", "Documentation", "Tutorial", "Practice"];

const typeIcons: Record<string, React.ReactNode> = {
  Video: <Video size={12} />,
  Book: <BookOpen size={12} />,
  Documentation: <FileText size={12} />,
  Tutorial: <Layers size={12} />,
  Practice: <Code size={12} />,
};

export default function HOME() {
  const [title, setTitle] = useState("");
  const [ltitle, setlTitle] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState("");
  const [purpose, setPurpose] = useState("");
  const [step, setStep] = useState(1);
  const router = useRouter();
  const [learningSections, setLearningSection] = useState<
    { ltitle: string; content: string; type: string }[]
  >([]);

  const add = () => {
    if (!ltitle || !content || !type) return;
    setLearningSection((prev) => [...prev, { ltitle, content, type }]);
    setlTitle("");
    setContent("");
    setType("");
  };

  const remove = (idx: number) => {
    setLearningSection((prev) => prev.filter((_, i) => i !== idx));
  };

  const { user } = useProvider();
  const createRoadmap = async () => {
    const res = await fetch("/api/croadmap", {
      method: "POST",
      body: JSON.stringify({
        title,
        purpose,
        userId: user?.id,
        learningSections,
      }),
    });
    if (res.ok) router.push("/mainMenu");
  };

  const steps = ["Title", "Purpose", "Sections"];
  const canNext1 = title.trim().length > 0;
  const canNext2 = purpose.trim().length > 0;
  const canCreate = learningSections.length > 0;

  return (
    <div
      className="flex min-h-screen text-white antialiased"
      style={{ fontFamily: "'Space Mono', monospace" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@400;700;900&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');
        .unb { font-family: 'Unbounded', sans-serif; }

        .nav-bar {
          background: rgba(0,8,7,0.85);
          backdrop-filter: blur(24px);
          border-bottom: 1px solid rgba(0,255,200,0.06);
        }

        /* PROGRESS */
        .step-bar {
          display: flex; align-items: center; gap: 0;
        }
        .step-dot {
          display: flex; flex-direction: column; align-items: center; gap: 6px;
        }
        .step-circle {
          width: 32px; height: 32px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Unbounded', sans-serif; font-size: 10px; font-weight: 900;
          transition: all 0.3s;
        }
        .step-circle.done {
          background: rgba(0,255,200,0.15);
          border: 1px solid rgba(0,255,200,0.4);
          color: rgba(0,255,200,0.9);
        }
        .step-circle.active {
          background: rgba(0,255,200,0.1);
          border: 1.5px solid rgba(0,255,200,0.6);
          color: rgba(0,255,200,1);
          box-shadow: 0 0 16px rgba(0,255,200,0.2);
        }
        .step-circle.pending {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.2);
        }
        .step-label {
          font-family: 'Space Mono', monospace;
          font-size: 8px; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase;
        }
        .step-connector {
          width: 60px; height: 1px; margin-bottom: 22px;
          transition: background 0.3s;
        }

        /* INPUT */
        .field-wrap { display: flex; flex-direction: column; gap: 8px; }
        .field-label {
          font-family: 'Space Mono', monospace;
          font-size: 9px; font-weight: 700;
          letter-spacing: 0.25em; text-transform: uppercase;
          color: rgba(0,255,200,0.4);
        }
        .teal-input {
          width: 100%; padding: 14px 18px;
          background: rgba(0,255,200,0.03);
          border: 1px solid rgba(0,255,200,0.1);
          border-radius: 12px;
          font-family: 'Space Mono', monospace;
          font-size: 13px; color: white;
          outline: none; transition: all 0.2s;
          resize: none;
        }
        .teal-input::placeholder { color: rgba(255,255,255,0.15); }
        .teal-input:focus {
          border-color: rgba(0,255,200,0.35);
          background: rgba(0,255,200,0.05);
          box-shadow: 0 0 0 3px rgba(0,255,200,0.06);
        }
        .teal-select {
          width: 100%; padding: 14px 18px;
          background: rgba(0,255,200,0.03);
          border: 1px solid rgba(0,255,200,0.1);
          border-radius: 12px;
          font-family: 'Space Mono', monospace;
          font-size: 13px; color: white;
          outline: none; transition: all 0.2s;
          appearance: none; cursor: pointer;
        }
        .teal-select:focus {
          border-color: rgba(0,255,200,0.35);
          background: rgba(0,255,200,0.05);
        }
        .teal-select option { background: #000a09; color: white; }

        /* BUTTONS */
        .btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 13px 28px; border-radius: 12px;
          background: rgba(0,255,200,0.08);
          border: 1px solid rgba(0,255,200,0.22);
          color: rgba(0,255,200,0.9);
          font-family: 'Unbounded', sans-serif;
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.06em; text-transform: uppercase;
          cursor: pointer; transition: all 0.2s;
        }
        .btn-primary:hover:not(:disabled) {
          background: rgba(0,255,200,0.14);
          border-color: rgba(0,255,200,0.4);
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.3);
        }
        .btn-primary:disabled {
          opacity: 0.3; cursor: not-allowed;
        }
        .btn-ghost {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 11px 22px; border-radius: 11px;
          background: rgba(0,255,200,0.04);
          border: 1px solid rgba(0,255,200,0.1);
          color: rgba(0,255,200,0.6);
          font-family: 'Space Mono', monospace;
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.08em; text-transform: uppercase;
          cursor: pointer; transition: all 0.2s;
        }
        .btn-ghost:hover:not(:disabled) {
          background: rgba(0,255,200,0.08);
          border-color: rgba(0,255,200,0.2);
        }
        .btn-ghost:disabled { opacity: 0.3; cursor: not-allowed; }

        /* SECTION CARD */
        .section-card {
          background: rgba(0,255,200,0.015);
          border: 1px solid rgba(0,255,200,0.08);
          border-radius: 14px;
          padding: 16px 18px;
          display: flex; align-items: flex-start;
          justify-content: space-between; gap: 16px;
          transition: border-color 0.2s;
        }
        .section-card:hover { border-color: rgba(0,255,200,0.15); }
        .section-index {
          font-family: 'Unbounded', sans-serif;
          font-size: 9px; font-weight: 900;
          color: rgba(0,255,200,0.25);
          min-width: 24px; padding-top: 2px;
        }
        .type-chip {
          display: inline-flex; align-items: center; gap: 5px;
          padding: 3px 10px; border-radius: 20px;
          background: rgba(0,255,200,0.06);
          border: 1px solid rgba(0,255,200,0.12);
          font-family: 'Space Mono', monospace;
          font-size: 8px; font-weight: 700;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: rgba(0,255,200,0.5);
        }
        .remove-btn {
          width: 28px; height: 28px; border-radius: 8px; flex-shrink: 0;
          background: rgba(255,60,60,0.05);
          border: 1px solid rgba(255,60,60,0.1);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: all 0.2s;
        }
        .remove-btn:hover {
          background: rgba(255,60,60,0.12);
          border-color: rgba(255,60,60,0.25);
        }

        /* ADD FORM */
        .add-form {
          background: rgba(0,255,200,0.02);
          border: 1px dashed rgba(0,255,200,0.12);
          border-radius: 16px;
          padding: 22px;
          display: flex; flex-direction: column; gap: 14px;
        }

        .teal-divider { height: 1px; background: linear-gradient(to right, rgba(0,255,200,0.18), transparent); }
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
              style={{
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "rgba(0,255,200,0.4)",
              }}
            >
              Create Roadmap
            </span>
          </div>
        </nav>

        <div className="flex-grow flex items-center justify-center px-10 py-14">
          <div
            style={{
              width: "100%",
              maxWidth: 560,
              display: "flex",
              flexDirection: "column",
              gap: 40,
            }}
          >
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div className="step-bar">
                {steps.map((label, idx) => {
                  const n = idx + 1;
                  const state =
                    step > n ? "done" : step === n ? "active" : "pending";
                  return (
                    <div
                      key={label}
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <div className="step-dot">
                        <div className={`step-circle ${state}`}>{n}</div>
                        <span
                          className="step-label"
                          style={{
                            color:
                              state === "active"
                                ? "rgba(0,255,200,0.6)"
                                : state === "done"
                                  ? "rgba(0,255,200,0.35)"
                                  : "rgba(255,255,255,0.15)",
                          }}
                        >
                          {label}
                        </span>
                      </div>
                      {idx < steps.length - 1 && (
                        <div
                          className="step-connector"
                          style={{
                            background:
                              step > n
                                ? "rgba(0,255,200,0.25)"
                                : "rgba(255,255,255,0.06)",
                          }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* STEPS */}
            <AnimatePresence mode="wait">
              {/* STEP 1 — TITLE */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  style={{ display: "flex", flexDirection: "column", gap: 32 }}
                >
                  <div>
                    <h2
                      className="unb"
                      style={{
                        fontSize: 38,
                        fontWeight: 900,
                        letterSpacing: "-0.04em",
                        color: "white",
                        marginBottom: 8,
                      }}
                    >
                      Name your roadmap.
                    </h2>
                    <p
                      style={{
                        fontSize: 16,
                        color: "rgba(255,255,255,0.25)",
                        lineHeight: 1.7,
                      }}
                    >
                      Give your roadmap a clear, memorable title.
                    </p>
                  </div>

                  <div className="field-wrap">
                    <label className="field-label">Roadmap Title</label>
                    <input
                      className="teal-input"
                      type="text"
                      placeholder="e.g. Frontend Development Mastery"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      onKeyDown={(e) =>
                        e.key === "Enter" && canNext1 && setStep(2)
                      }
                      autoFocus
                    />
                  </div>

                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <button
                      className="btn-primary"
                      disabled={!canNext1}
                      onClick={() => setStep(2)}
                    >
                      Continue <ArrowRight size={13} />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  style={{ display: "flex", flexDirection: "column", gap: 32 }}
                >
                  <div>
                    <h2
                      className="unb"
                      style={{
                        fontSize: 38,
                        fontWeight: 900,
                        letterSpacing: "-0.04em",
                        color: "white",
                        marginBottom: 8,
                      }}
                    >
                      What is the purpose?
                    </h2>
                    <p
                      style={{
                        fontSize: 16,
                        color: "rgba(255,255,255,0.25)",
                        lineHeight: 1.7,
                      }}
                    >
                      Describe the goal or outcome of this roadmap.
                    </p>
                  </div>

                  <div className="field-wrap">
                    <label className="field-label">Purpose</label>
                    <textarea
                      className="teal-input"
                      rows={4}
                      placeholder="e.g. Help beginners learn modern web development from scratch..."
                      value={purpose}
                      onChange={(e) => setPurpose(e.target.value)}
                      autoFocus
                    />
                  </div>

                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <button className="btn-ghost" onClick={() => setStep(1)}>
                      Back
                    </button>
                    <button
                      className="btn-primary"
                      disabled={!canNext2}
                      onClick={() => setStep(3)}
                    >
                      Continue <ArrowRight size={13} />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  style={{ display: "flex", flexDirection: "column", gap: 28 }}
                >
                  <div>
                    <h2
                      className="unb"
                      style={{
                        fontSize: 38,
                        fontWeight: 900,
                        letterSpacing: "-0.04em",
                        color: "white",
                        marginBottom: 8,
                      }}
                    >
                      Add sections.
                    </h2>
                    <p
                      style={{
                        fontSize: 16,
                        color: "rgba(255,255,255,0.25)",
                        lineHeight: 1.7,
                      }}
                    >
                      Build out the learning path step by step.
                    </p>
                  </div>

                  {learningSections.length > 0 && (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 8,
                      }}
                    >
                      <AnimatePresence>
                        {learningSections.map((section, idx) => (
                          <motion.div
                            key={idx}
                            className="section-card"
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.2 }}
                          >
                            <span className="section-index">
                              {String(idx + 1).padStart(2, "0")}
                            </span>
                            <div style={{ flex: 1 }}>
                              <p
                                style={{
                                  fontSize: 12,
                                  fontWeight: 700,
                                  color: "white",
                                  marginBottom: 5,
                                }}
                              >
                                {section.ltitle}
                              </p>
                              <p
                                style={{
                                  fontSize: 10,
                                  color: "rgba(255,255,255,0.3)",
                                  lineHeight: 1.6,
                                  marginBottom: 8,
                                }}
                              >
                                {section.content}
                              </p>
                              {section.type && (
                                <span className="type-chip">
                                  {typeIcons[section.type]} {section.type}
                                </span>
                              )}
                            </div>
                            <button
                              className="remove-btn"
                              onClick={() => remove(idx)}
                            >
                              <Trash2 size={11} color="rgba(255,80,80,0.6)" />
                            </button>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  )}

                  <div className="teal-divider" />

                  <div className="add-form">
                    <p
                      style={{
                        fontSize: 9,
                        fontWeight: 700,
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "rgba(0,255,200,0.35)",
                      }}
                    >
                      New Section
                    </p>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 12,
                      }}
                    >
                      <div className="field-wrap">
                        <label className="field-label">Title</label>
                        <input
                          className="teal-input"
                          type="text"
                          placeholder="Section title"
                          value={ltitle}
                          onChange={(e) => setlTitle(e.target.value)}
                        />
                      </div>
                      <div className="field-wrap">
                        <label className="field-label">Type</label>
                        <select
                          className="teal-select"
                          value={type}
                          onChange={(e) => setType(e.target.value)}
                        >
                          <option value="">Select type</option>
                          {resourceType.map((source, index) => (
                            <option value={source} key={index}>
                              {source}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="field-wrap">
                      <label className="field-label">
                        Content / Description
                      </label>
                      <textarea
                        className="teal-input"
                        rows={3}
                        placeholder="What will learners find in this section?"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                      />
                    </div>
                    <div
                      style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <button
                        className="btn-ghost"
                        disabled={!ltitle || !content || !type}
                        onClick={add}
                      >
                        <Plus size={12} /> Add Section
                      </button>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <button className="btn-ghost" onClick={() => setStep(2)}>
                      Back
                    </button>
                    <button
                      className="btn-primary"
                      disabled={!canCreate}
                      onClick={createRoadmap}
                    >
                      Create Roadmap <ArrowRight size={13} />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}

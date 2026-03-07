"use client";

import { Calendar } from "@/components/ui/calendar";
import { CheckCircle2, ChevronLeft, Rocket, Sparkles } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProvider } from "../../providers/AuthProviders";
import Sidebar from "@/app/_components/SideBar";

type Question = { id: string; text: string };

export default function CreateRoadmap() {
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState("");
  const [purpose, setPurpose] = useState("");
  const [fade, setFade] = useState(true);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [currentRoadmapId, setCurrentRoadmapId] = useState<string>();
  const [loading, setLoading] = useState(false);

  const { user } = useProvider();
  const progressPercentage = (step / 4) * 100;

  const prevStep = () => setStep((p) => Math.max(1, p - 1));
  const nextStep = () => {
    setFade(false);
    setTimeout(() => {
      setStep((p) => p + 1);
      setFade(true);
    }, 200);
  };

  const createLearningSection = async () => {
    setLoading(true);
    await fetch("/api/roadmap-details", {
      method: "POST",
      body: JSON.stringify({
        roadmapId: currentRoadmapId,
        purpose,
        title,
        startDate,
        endDate,
      }),
    });
    setLoading(false);
  };

  const getAiQs = async () => {
    if (!user) return;
    setLoading(true);
    const response = await fetch(`/api/roadmap/${user.id}`, {
      method: "POST",
      body: JSON.stringify({ purpose, title }),
    });
    const { id } = await response.json();
    setCurrentRoadmapId(id);
    const res = await fetch("/api/projectQuestion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        roadmapId: id,
        roadmapTitle: title,
        purpose,
        startDate,
        endDate,
      }),
    });
    const data = await res.json();
    setQuestions(data);
    setCurrentIndex(0);
    setLoading(false);
    nextStep();
  };

  const giveAnswer = async (id: string) => {
    const res = await fetch("/api/giveAnswer-project", {
      method: "POST",
      body: JSON.stringify({ id, answer }),
    });
    if (res.ok) {
      setCurrentIndex((p) => p + 1);
      setAnswer("");
    }
  };

  return (
    <div
      className="flex min-h-screen text-white antialiased"
      style={{ fontFamily: "'Space Mono', monospace" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@400;700;900&family=Space+Mono:wght@400;700&display=swap');
        .unb { font-family: 'Unbounded', sans-serif; }
        .mono { font-family: 'Space Mono', monospace; }

        .nav-bar {
          background: rgba(0,8,7,0.8);
          backdrop-filter: blur(24px);
          border-bottom: 1px solid rgba(0,255,200,0.06);
        }

        .cr-input {
          width: 100%; background: transparent; border: none;
          border-bottom: 1px solid rgba(0,255,200,0.2);
          padding: 14px 0; font-size: 28px;
          font-family: 'Unbounded', sans-serif; font-weight: 700;
          color: white; outline: none; letter-spacing: -0.03em;
          transition: border-color 0.2s;
        }
        .cr-input::placeholder { color: rgba(255,255,255,0.15); }
        .cr-input:focus { border-color: rgba(0,255,200,0.5); }

        .cr-textarea {
          width: 100%; background: rgba(0,255,200,0.02);
          border: 1px solid rgba(0,255,200,0.1); border-radius: 16px;
          padding: 20px; font-size: 15px;
          font-family: 'Space Mono', monospace;
          color: rgba(255,255,255,0.7); outline: none; resize: none;
          min-height: 140px; transition: border-color 0.2s, box-shadow 0.2s;
        }
        .cr-textarea::placeholder { color: rgba(255,255,255,0.15); }
        .cr-textarea:focus {
          border-color: rgba(0,255,200,0.25);
          box-shadow: 0 0 20px rgba(0,255,200,0.04);
        }

        .cr-btn {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 14px 32px; border-radius: 12px;
          background: rgba(0,255,200,0.08);
          border: 1px solid rgba(0,255,200,0.2);
          color: rgba(0,255,200,0.9);
          font-family: 'Unbounded', sans-serif;
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.06em; text-transform: uppercase;
          cursor: pointer; transition: all 0.2s;
        }
        .cr-btn:hover:not(:disabled) {
          background: rgba(0,255,200,0.14);
          border-color: rgba(0,255,200,0.4);
          box-shadow: 0 0 24px rgba(0,255,200,0.1);
          transform: translateY(-1px);
        }
        .cr-btn:disabled { opacity: 0.25; cursor: not-allowed; }

        .cr-btn-ghost {
          display: inline-flex; align-items: center; gap: 8px;
          background: transparent; border: none;
          color: rgba(255,255,255,0.25);
          font-family: 'Space Mono', monospace;
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          cursor: pointer; transition: color 0.2s; padding: 8px 0;
        }
        .cr-btn-ghost:hover { color: rgba(255,255,255,0.6); }

        .rdp { --rdp-accent-color: rgba(0,255,200,0.7) !important; color: rgba(255,255,255,0.7) !important; }
        .rdp-button:hover:not([disabled]) { background: rgba(0,255,200,0.08) !important; }
        .rdp-day_selected { background: rgba(0,255,200,0.15) !important; color: #4fffb0 !important; border: 1px solid rgba(0,255,200,0.3) !important; }
        .rdp-caption_label { color: rgba(255,255,255,0.5) !important; font-family: 'Space Mono', monospace !important; font-size: 11px !important; }
        .rdp-head_cell { color: rgba(0,255,200,0.35) !important; font-family: 'Space Mono', monospace !important; font-size: 10px !important; }
        .rdp-nav_button { color: rgba(255,255,255,0.3) !important; }
      `}</style>

      <aside
        className="
"
        style={{ width: 210 }}
      >
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
              Create Roadmap
            </span>
          </div>
        </nav>

        <div className="flex-grow flex items-center justify-center px-10 py-16">
          <div style={{ width: "100%", maxWidth: 680 }}>
            <div
              className="flex items-center justify-between"
              style={{ marginBottom: 32 }}
            >
              {step > 1 ? (
                <button className="cr-btn-ghost" onClick={prevStep}>
                  <ChevronLeft size={14} /> Back
                </button>
              ) : (
                <div
                  className="mono flex items-center gap-2"
                  style={{
                    fontSize: 10,
                    color: "rgba(0,255,200,0.35)",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                  }}
                >
                  <Rocket size={11} /> New journey
                </div>
              )}
              <div
                className="mono"
                style={{
                  fontSize: 10,
                  color: "rgba(255,255,255,0.18)",
                  letterSpacing: "0.15em",
                }}
              >
                STEP {step} / 4
              </div>
            </div>

            <div
              style={{
                height: 1,
                background: "rgba(255,255,255,0.06)",
                borderRadius: 1,
                marginBottom: 52,
                overflow: "hidden",
              }}
            >
              <motion.div
                style={{
                  height: "100%",
                  borderRadius: 1,
                  background:
                    "linear-gradient(to right, rgba(0,255,200,0.4), rgba(0,255,200,0.8))",
                  boxShadow: "0 0 8px rgba(0,255,200,0.4)",
                }}
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            </div>

            <div
              className={`transition-opacity duration-200 ${fade ? "opacity-100" : "opacity-0"}`}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                >
                  {step === 1 && (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 36,
                      }}
                    >
                      <div>
                        <div
                          className="mono"
                          style={{
                            fontSize: 9,
                            letterSpacing: "0.3em",
                            color: "rgba(0,255,200,0.4)",
                            textTransform: "uppercase",
                            marginBottom: 16,
                          }}
                        >
                          01 — Project name
                        </div>
                        <h1
                          className="unb"
                          style={{
                            fontSize: "clamp(28px,4vw,46px)",
                            fontWeight: 900,
                            letterSpacing: "-0.04em",
                            lineHeight: 1.1,
                            color: "white",
                          }}
                        >
                          What will you
                          <br />
                          <span
                            style={{
                              WebkitTextStroke: "1.5px rgba(0,255,200,0.5)",
                              color: "transparent",
                              fontStyle: "italic",
                            }}
                          >
                            master?
                          </span>
                        </h1>
                      </div>
                      <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g. Master Backend Development"
                        className="cr-input"
                        autoFocus
                      />
                      <div>
                        <button
                          className="cr-btn"
                          disabled={!title.trim()}
                          onClick={nextStep}
                        >
                          Continue →
                        </button>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 36,
                      }}
                    >
                      <div>
                        <div
                          className="mono"
                          style={{
                            fontSize: 9,
                            letterSpacing: "0.3em",
                            color: "rgba(0,255,200,0.4)",
                            textTransform: "uppercase",
                            marginBottom: 16,
                          }}
                        >
                          02 — Your goal
                        </div>
                        <h1
                          className="unb"
                          style={{
                            fontSize: "clamp(28px,4vw,46px)",
                            fontWeight: 900,
                            letterSpacing: "-0.04em",
                            lineHeight: 1.1,
                            color: "white",
                          }}
                        >
                          What is your
                          <br />
                          <span
                            style={{
                              WebkitTextStroke: "1.5px rgba(0,255,200,0.5)",
                              color: "transparent",
                              fontStyle: "italic",
                            }}
                          >
                            purpose?
                          </span>
                        </h1>
                      </div>
                      <textarea
                        value={purpose}
                        onChange={(e) => setPurpose(e.target.value)}
                        placeholder="Describe your vision..."
                        className="cr-textarea"
                        autoFocus
                      />
                      <div>
                        <button
                          className="cr-btn"
                          disabled={!purpose.trim()}
                          onClick={nextStep}
                        >
                          Continue →
                        </button>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 36,
                      }}
                    >
                      <div>
                        <div
                          className="mono"
                          style={{
                            fontSize: 9,
                            letterSpacing: "0.3em",
                            color: "rgba(0,255,200,0.4)",
                            textTransform: "uppercase",
                            marginBottom: 16,
                          }}
                        >
                          03 — Time frame
                        </div>
                        <h1
                          className="unb"
                          style={{
                            fontSize: "clamp(28px,4vw,46px)",
                            fontWeight: 900,
                            letterSpacing: "-0.04em",
                            lineHeight: 1.1,
                            color: "white",
                          }}
                        >
                          Set your
                          <br />
                          <span
                            style={{
                              WebkitTextStroke: "1.5px rgba(0,255,200,0.5)",
                              color: "transparent",
                              fontStyle: "italic",
                            }}
                          >
                            timeline.
                          </span>
                        </h1>
                      </div>

                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns:
                            "repeat(auto-fit, minmax(250px, 1fr))",
                          gap: 24,
                          padding: 16,
                        }}
                      >
                        {[
                          {
                            label: "Start Date",
                            date: startDate,
                            setDate: setStartDate,
                          },
                          {
                            label: "End Date",
                            date: endDate,
                            setDate: setEndDate,
                          },
                        ].map(({ label, date, setDate }) => (
                          <div
                            key={label}
                            style={{
                              padding: 24,
                              borderRadius: 20,
                              background: "rgba(0, 0, 0, 0.6)",
                              backdropFilter: "blur(10px)",
                              border: "1px solid rgba(0, 255, 200, 0.3)",
                              transition: "transform 0.2s, box-shadow 0.2s",
                              cursor: "pointer",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.transform =
                                "translateY(-3px)";
                              e.currentTarget.style.boxShadow =
                                "0 6px 12px rgba(0,255,200,0.4)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform = "translateY(0)";
                              e.currentTarget.style.boxShadow = "none";
                            }}
                          >
                            <div
                              className="mono"
                              style={{
                                fontSize: 10,
                                letterSpacing: "0.2em",
                                textTransform: "uppercase",
                                color: "#00ffc8",
                                textShadow: "0 0 6px rgba(0, 255, 200, 0.6)",
                                marginBottom: 16,
                              }}
                            >
                              {label}
                            </div>
                            <Calendar
                              mode="single"
                              selected={date}
                              onSelect={setDate}
                              className="bg-transparent border-none"
                              classNames={{
                                caption:
                                  "flex justify-center pt-1 relative items-center",
                                caption_label:
                                  "text-sm font-medium text-[#00ffc8] mono uppercase tracking-wider",

                                head_cell:
                                  "text-gray-500 rounded-md w-9 font-normal text-[0.8rem]",

                                day: "h-9 w-9 p-0 font-normal text-[#00ffc8] aria-selected:opacity-100 hover:bg-[#00ffc8] hover:text-black rounded-md transition-colors",
                                day_selected:
                                  "bg-[#00ffc8] text-black font-bold hover:bg-[#00ffc8] hover:text-black focus:bg-[#00ffc8] focus:text-black",
                                day_today:
                                  "border border-[#00ffc8] text-[#00ffc8]",
                                day_outside: "text-gray-600 opacity-50",
                                day_disabled: "text-gray-800 opacity-20",
                              }}
                            />
                            {date && (
                              <div
                                className="mono"
                                style={{
                                  marginTop: 12,
                                  fontSize: 11,
                                  color: "#00ffc8",
                                  textShadow: "0 0 4px rgba(0, 255, 200, 0.5)",
                                }}
                              >
                                {date.toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      <div>
                        <button
                          className="cr-btn"
                          disabled={!startDate || !endDate || loading}
                          onClick={getAiQs}
                        >
                          {loading ? (
                            <span
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                              }}
                            >
                              <motion.span
                                animate={{ rotate: 360 }}
                                transition={{
                                  repeat: Infinity,
                                  duration: 1,
                                  ease: "linear",
                                }}
                                style={{
                                  display: "inline-block",
                                  width: 12,
                                  height: 12,
                                  border: "1.5px solid rgba(0,255,200,0.3)",
                                  borderTop: "1.5px solid rgba(0,255,200,0.8)",
                                  borderRadius: "50%",
                                }}
                              />
                              Generating questions...
                            </span>
                          ) : (
                            "Answer questions →"
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                  {step === 4 && (
                    <div>
                      {currentIndex < questions.length ? (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 36,
                          }}
                        >
                          <div>
                            <div
                              className="mono"
                              style={{
                                fontSize: 9,
                                letterSpacing: "0.3em",
                                color: "rgba(0,255,200,0.4)",
                                textTransform: "uppercase",
                                marginBottom: 16,
                              }}
                            >
                              {String(currentIndex + 1).padStart(2, "0")} /
                              {String(questions.length).padStart(2, "0")}
                            </div>
                            <h1
                              className="unb"
                              style={{
                                fontSize: "clamp(22px,3vw,34px)",
                                fontWeight: 900,
                                letterSpacing: "-0.03em",
                                lineHeight: 1.2,
                                color: "white",
                              }}
                            >
                              {questions[currentIndex].text}
                            </h1>
                          </div>
                          <div style={{ display: "flex", gap: 6 }}>
                            {questions.map((_, i) => (
                              <div
                                key={i}
                                style={{
                                  width: i === currentIndex ? 20 : 6,
                                  height: 6,
                                  borderRadius: 3,
                                  background:
                                    i < currentIndex
                                      ? "rgba(0,255,200,0.5)"
                                      : i === currentIndex
                                        ? "rgba(0,255,200,0.8)"
                                        : "rgba(255,255,255,0.08)",
                                  transition: "all 0.3s",
                                }}
                              />
                            ))}
                          </div>
                          <input
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            onKeyDown={(e) =>
                              e.key === "Enter" &&
                              answer.trim() &&
                              giveAnswer(questions[currentIndex].id)
                            }
                            placeholder="Your answer..."
                            className="cr-input"
                            autoFocus
                          />
                          <div>
                            <button
                              className="cr-btn"
                              disabled={!answer.trim()}
                              onClick={() =>
                                giveAnswer(questions[currentIndex].id)
                              }
                            >
                              Next →
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: 32,
                            paddingTop: 20,
                            textAlign: "center",
                          }}
                        >
                          <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 200 }}
                          >
                            <CheckCircle2
                              size={52}
                              color="rgba(0,255,200,0.6)"
                            />
                          </motion.div>
                          <div>
                            <h2
                              className="unb"
                              style={{
                                fontSize: 28,
                                fontWeight: 900,
                                color: "white",
                                letterSpacing: "-0.04em",
                                marginBottom: 10,
                              }}
                            >
                              All set.
                            </h2>
                            <p
                              className="mono"
                              style={{
                                fontSize: 11,
                                color: "rgba(255,255,255,0.25)",
                                letterSpacing: "0.05em",
                              }}
                            >
                              Ready to generate your personalized roadmap.
                            </p>
                          </div>
                          <button
                            className="cr-btn"
                            onClick={createLearningSection}
                            disabled={loading}
                            style={{ padding: "16px 40px", fontSize: 12 }}
                          >
                            {loading ? (
                              <motion.span
                                animate={{ rotate: 360 }}
                                transition={{
                                  repeat: Infinity,
                                  duration: 1,
                                  ease: "linear",
                                }}
                                style={{
                                  display: "inline-block",
                                  width: 14,
                                  height: 14,
                                  border: "1.5px solid rgba(0,255,200,0.3)",
                                  borderTop: "1.5px solid rgba(0,255,200,0.8)",
                                  borderRadius: "50%",
                                }}
                              />
                            ) : (
                              <Sparkles size={15} />
                            )}
                            {loading ? "Generating..." : "Generate Roadmap"}
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

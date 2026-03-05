"use client";

import { SendHorizontal, Sparkles, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Sidebar from "@/app/_components/SideBar";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function AiTutor() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const suggestions = [
    "What roadmap should I pick?",
    "What are the best jobs for me?",
    "Give me a really difficult challenge",
    "Recommend me a topic I can learn in an hour",
  ];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSendMessage = async () => {
    if (!message.trim() || isLoading) return;
    const userMessage = message;
    setMessage("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);
    try {
      const response = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage, history: messages }),
      });
      if (!response.ok) throw new Error("Failed");
      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.response },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
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

        .suggestion-btn {
          width: 100%; text-align: left;
          padding: 14px 20px; border-radius: 14px;
          background: rgba(0,255,200,0.02);
          border: 1px solid rgba(0,255,200,0.07);
          color: rgba(255,255,255,0.4);
          font-family: 'Space Mono', monospace;
          font-size: 12px; cursor: pointer;
          transition: all 0.2s;
          display: flex; justify-content: space-between; align-items: center;
        }
        .suggestion-btn:hover {
          background: rgba(0,255,200,0.06);
          border-color: rgba(0,255,200,0.18);
          color: rgba(255,255,255,0.8);
        }
        .suggestion-btn:hover .suggest-arrow { opacity: 1; }
        .suggest-arrow { opacity: 0; transition: opacity 0.2s; color: rgba(0,255,200,0.5); }

        .input-wrap {
          background: rgba(0,255,200,0.02);
          border: 1px solid rgba(0,255,200,0.1);
          border-radius: 20px;
          padding: 16px;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .input-wrap:focus-within {
          border-color: rgba(0,255,200,0.22);
          box-shadow: 0 0 30px rgba(0,255,200,0.04);
        }

        .chat-textarea {
          width: 100%; background: transparent; border: none;
          outline: none; resize: none; min-height: 80px;
          font-family: 'Space Mono', monospace;
          font-size: 14px; color: rgba(255,255,255,0.8);
          line-height: 1.6; padding: 4px 8px;
        }
        .chat-textarea::placeholder { color: rgba(255,255,255,0.15); }

        .send-btn {
          width: 40px; height: 40px; border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: all 0.2s; border: none;
        }
        .send-btn.active {
          background: rgba(0,255,200,0.15);
          border: 1px solid rgba(0,255,200,0.3);
          color: rgba(0,255,200,0.9);
        }
        .send-btn.active:hover {
          background: rgba(0,255,200,0.22);
          box-shadow: 0 0 20px rgba(0,255,200,0.1);
        }
        .send-btn.inactive {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          color: rgba(255,255,255,0.15);
          cursor: not-allowed;
        }

        .msg-user {
          background: rgba(0,255,200,0.07);
          border: 1px solid rgba(0,255,200,0.12);
          border-radius: 18px 18px 4px 18px;
          padding: 14px 18px;
          margin-left: auto;
          max-width: 75%;
        }
        .msg-assistant {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 18px 18px 18px 4px;
          padding: 14px 18px;
          margin-right: auto;
          max-width: 75%;
        }

        .teal-divider { height: 1px; background: linear-gradient(to right, rgba(0,255,200,0.2), transparent); }
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
              AI Tutor
            </span>
          </div>
        </nav>

        <div
          className="flex-1 flex flex-col"
          style={{
            maxWidth: 720,
            width: "100%",
            margin: "0 auto",
            padding: "40px 20px 0",
          }}
        >
          {messages.length === 0 && (
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "5px 14px",
                  borderRadius: 20,
                  background: "rgba(0,255,200,0.05)",
                  border: "1px solid rgba(0,255,200,0.12)",
                  marginBottom: 24,
                }}
              >
                <Sparkles size={11} color="rgba(0,255,200,0.6)" />
                <span
                  className="mono"
                  style={{
                    fontSize: 9,
                    fontWeight: 700,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "rgba(0,255,200,0.5)",
                  }}
                >
                  AI Tutor
                </span>
              </div>
              <h1
                className="unb"
                style={{
                  fontSize: "clamp(28px,4vw,44px)",
                  fontWeight: 900,
                  letterSpacing: "-0.04em",
                  lineHeight: 1.1,
                  color: "white",
                  marginBottom: 12,
                }}
              >
                How can I
                <br />
                <span
                  style={{
                    WebkitTextStroke: "1.5px rgba(0,255,200,0.5)",
                    color: "transparent",
                    fontStyle: "italic",
                  }}
                >
                  help you?
                </span>
              </h1>
              <p
                className="mono"
                style={{
                  fontSize: 11,
                  color: "rgba(255,255,255,0.2)",
                  letterSpacing: "0.04em",
                }}
              >
                Ask me anything about learning, careers, or your goals.
              </p>
            </div>
          )}

          {messages.length > 0 && (
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                gap: 12,
                paddingBottom: 24,
              }}
            >
              <AnimatePresence initial={false}>
                {messages.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={
                      msg.role === "user" ? "msg-user" : "msg-assistant"
                    }
                  >
                    {msg.role === "assistant" && (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                          marginBottom: 8,
                        }}
                      >
                        <Sparkles size={10} color="rgba(0,255,200,0.5)" />
                        <span
                          className="mono"
                          style={{
                            fontSize: 8,
                            fontWeight: 700,
                            letterSpacing: "0.2em",
                            textTransform: "uppercase",
                            color: "rgba(0,255,200,0.4)",
                          }}
                        >
                          AI Tutor
                        </span>
                      </div>
                    )}
                    <p
                      className="mono"
                      style={{
                        fontSize: 13,
                        lineHeight: 1.7,
                        color:
                          msg.role === "user"
                            ? "rgba(255,255,255,0.85)"
                            : "rgba(255,255,255,0.65)",
                      }}
                    >
                      {msg.content}
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="msg-assistant"
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      marginBottom: 8,
                    }}
                  >
                    <Sparkles size={10} color="rgba(0,255,200,0.5)" />
                    <span
                      className="mono"
                      style={{
                        fontSize: 8,
                        fontWeight: 700,
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "rgba(0,255,200,0.4)",
                      }}
                    >
                      AI Tutor
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: 4 }}>
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        style={{
                          width: 5,
                          height: 5,
                          borderRadius: "50%",
                          background: "rgba(0,255,200,0.4)",
                        }}
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{
                          repeat: Infinity,
                          duration: 1.2,
                          delay: i * 0.2,
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
              <div ref={bottomRef} />
            </div>
          )}

          {messages.length === 0 && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
                marginBottom: 24,
              }}
            >
              {suggestions.map((text) => (
                <button
                  key={text}
                  className="suggestion-btn"
                  onClick={() => setMessage(text)}
                >
                  <span>{text}</span>
                  <SendHorizontal size={13} className="suggest-arrow" />
                </button>
              ))}
            </div>
          )}

          <div
            style={{
              position: "sticky",
              bottom: 0,
              paddingBottom: 24,
              paddingTop: 8,
            }}
          >
            <div className="input-wrap">
              <textarea
                ref={textareaRef}
                className="chat-textarea"
                placeholder="Ask me anything..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  paddingTop: 8,
                }}
              >
                <button
                  className={`send-btn ${message.trim() && !isLoading ? "active" : "inactive"}`}
                  onClick={handleSendMessage}
                  disabled={!message.trim() || isLoading}
                >
                  {isLoading ? (
                    <Loader2
                      size={16}
                      style={{ animation: "spin 1s linear infinite" }}
                    />
                  ) : (
                    <SendHorizontal size={16} />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

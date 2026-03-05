"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PageLoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 12 + 3;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        setTimeout(() => setDone(true), 400);
      }
      setProgress(Math.min(p, 100));
    }, 80);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.6, ease: "easeInOut" },
          }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            background: "transparent",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@700;900&family=Space+Mono:wght@400;700&display=swap');

            @keyframes grain {
              0%, 100% { transform: translate(0, 0); }
              10% { transform: translate(-2%, -3%); }
              20% { transform: translate(3%, 2%); }
              30% { transform: translate(-1%, 4%); }
              40% { transform: translate(4%, -1%); }
              50% { transform: translate(-3%, 3%); }
              60% { transform: translate(2%, -4%); }
              70% { transform: translate(-4%, 1%); }
              80% { transform: translate(1%, -2%); }
              90% { transform: translate(3%, 3%); }
            }

            @keyframes pulse-ring {
              0% { transform: scale(0.95); opacity: 0.4; }
              50% { transform: scale(1.05); opacity: 0.15; }
              100% { transform: scale(0.95); opacity: 0.4; }
            }

            @keyframes counter-tick {
              from { opacity: 0; transform: translateY(6px); }
              to { opacity: 1; transform: translateY(0); }
            }

            .grain-layer {
              position: absolute;
              inset: -50%;
              width: 200%;
              height: 200%;
              background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.06'/%3E%3C/svg%3E");
              animation: grain 0.4s steps(1) infinite;
              pointer-events: none;
              z-index: 1;
            }

            .pulse-ring {
              animation: pulse-ring 2s ease-in-out infinite;
            }

            .loader-logo {
              font-family: 'Unbounded', sans-serif;
              font-weight: 900;
              font-style: italic;
              letter-spacing: -0.05em;
              text-transform: uppercase;
              color: white;
            }

            .loader-mono {
              font-family: 'Space Mono', monospace;
            }
          `}</style>

          <div className="grain-layer" />

          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,255,255,0.03) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          {[
            {
              top: 32,
              left: 32,
              borderTop: "1px solid rgba(255,255,255,0.08)",
              borderLeft: "1px solid rgba(255,255,255,0.08)",
            },
            {
              top: 32,
              right: 32,
              borderTop: "1px solid rgba(255,255,255,0.08)",
              borderRight: "1px solid rgba(255,255,255,0.08)",
            },
            {
              bottom: 32,
              left: 32,
              borderBottom: "1px solid rgba(255,255,255,0.08)",
              borderLeft: "1px solid rgba(255,255,255,0.08)",
            },
            {
              bottom: 32,
              right: 32,
              borderBottom: "1px solid rgba(255,255,255,0.08)",
              borderRight: "1px solid rgba(255,255,255,0.08)",
            },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * i, duration: 0.5 }}
              style={{ position: "absolute", width: 40, height: 40, ...s }}
            />
          ))}

          <div
            style={{
              position: "relative",
              zIndex: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 48,
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 16,
              }}
            >
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  className="pulse-ring"
                  style={{
                    position: "absolute",
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    border: "1px solid rgba(255,255,255,0.12)",
                  }}
                />
                <div
                  className="pulse-ring"
                  style={{
                    position: "absolute",
                    width: 110,
                    height: 110,
                    borderRadius: "50%",
                    border: "1px solid rgba(255,255,255,0.05)",
                    animationDelay: "0.4s",
                  }}
                />
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    style={{
                      width: 20,
                      height: 20,
                      border: "1.5px solid transparent",
                      borderTop: "1.5px solid rgba(255,255,255,0.6)",
                      borderRight: "1.5px solid rgba(255,255,255,0.2)",
                      borderRadius: "50%",
                    }}
                  />
                </div>
              </div>

              <div className="loader-logo" style={{ fontSize: 28 }}>
                EDUFY.
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 16,
                width: 280,
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: 1,
                  background: "rgba(255,255,255,0.07)",
                  borderRadius: 1,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <motion.div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    height: "100%",
                    background:
                      "linear-gradient(to right, rgba(255,255,255,0.3), white)",
                    borderRadius: 1,
                    boxShadow: "0 0 8px rgba(255,255,255,0.4)",
                  }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  alignItems: "center",
                }}
              >
                <span
                  className="loader-mono"
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.25em",
                    color: "rgba(255,255,255,0.2)",
                    textTransform: "uppercase",
                  }}
                >
                  Loading
                </span>
                <motion.span
                  key={Math.floor(progress)}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.1 }}
                  className="loader-mono"
                  style={{
                    fontSize: 11,
                    color: "rgba(255,255,255,0.4)",
                    letterSpacing: "0.05em",
                  }}
                >
                  {Math.floor(progress)}%
                </motion.span>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{ position: "absolute", bottom: 32, zIndex: 2 }}
          >
            <span
              className="loader-mono"
              style={{
                fontSize: 9,
                letterSpacing: "0.3em",
                color: "rgba(255,255,255,0.1)",
                textTransform: "uppercase",
              }}
            >
              EDUFY — LEARNING PLATFORM
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

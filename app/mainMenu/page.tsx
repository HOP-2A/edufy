import Footer from "../_components/Footer";
import Sidebar from "../_components/SideBar";
import CallYourRM from "../_components/CallYourRM";

export default function Home() {
  return (
    <div
      className="flex min-h-screen text-white antialiased"
      style={{ fontFamily: "'Space Mono', monospace" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@400;700;900&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');

        .unb { font-family: 'Unbounded', sans-serif; }
        .mono { font-family: 'Space Mono', monospace; }

        .card {
          background: rgba(0,255,200,0.02);
          border: 1px solid rgba(0,255,200,0.07);
          backdrop-filter: blur(10px);
          transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s;
        }
        .card:hover {
          border-color: rgba(0,255,200,0.15);
          box-shadow: 0 0 50px rgba(0,255,200,0.04), 0 30px 60px rgba(0,0,0,0.25);
          transform: translateY(-1px);
        }

        .nav-bar {
          background: rgba(0,8,7,0.8);
          backdrop-filter: blur(24px);
          border-bottom: 1px solid rgba(0,255,200,0.06);
        }

        .search-pill {
          background: rgba(0,255,200,0.03);
          border: 1px solid rgba(0,255,200,0.08);
          transition: all 0.2s;
        }
        .search-pill:focus-within {
          border-color: rgba(0,255,200,0.2);
          box-shadow: 0 0 20px rgba(0,255,200,0.04);
        }

        .teal-bar { background: rgba(0,255,200,0.5); box-shadow: 0 0 12px rgba(0,255,200,0.3); }
        .teal-divider { height:1px; background: linear-gradient(to right, rgba(0,255,200,0.2), transparent); }

        .tag {
          font-size: 8px; font-weight: 700; letter-spacing: 0.25em;
          text-transform: uppercase; color: rgba(0,255,200,0.45);
          font-family: 'Space Mono', monospace;
        }

        .online-dot {
          width:6px; height:6px; border-radius:50%;
          background:#4fffb0; box-shadow: 0 0 8px #4fffb0;
          animation: blink 2s ease-in-out infinite;
        }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.25} }

        .quick-btn {
          display:flex; flex-direction:column; align-items:flex-start;
          gap:6px; padding:18px 20px; border-radius:16px;
          background: rgba(0,255,200,0.03);
          border: 1px solid rgba(0,255,200,0.08);
          cursor:pointer; transition: all 0.25s; text-align:left;
          text-decoration:none;
        }
        .quick-btn:hover {
          background: rgba(0,255,200,0.07);
          border-color: rgba(0,255,200,0.2);
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(0,0,0,0.25);
        }

        .progress-track {
          height:3px; border-radius:2px;
          background: rgba(255,255,255,0.06);
          overflow:hidden;
        }
        .progress-fill {
          height:100%; border-radius:2px;
          background: linear-gradient(to right, rgba(0,255,200,0.4), rgba(0,255,200,0.8));
          box-shadow: 0 0 8px rgba(0,255,200,0.3);
        }

        .view-btn {
          font-size:9px; font-weight:700; letter-spacing:0.18em;
          text-transform:uppercase; color:rgba(0,255,200,0.4);
          padding:5px 14px; border:1px solid rgba(0,255,200,0.1);
          border-radius:20px; background:transparent; cursor:pointer;
          transition:all 0.2s; font-family:'Space Mono',monospace;
        }
        .view-btn:hover {
          color:rgba(0,255,200,0.85); border-color:rgba(0,255,200,0.3);
          background:rgba(0,255,200,0.05);
        }

        .ghost-text {
          font-family:'Unbounded',sans-serif; font-weight:900;
          -webkit-text-stroke:1px rgba(0,255,200,0.08); color:transparent;
          position:absolute; pointer-events:none; user-select:none; line-height:1;
        }

        .activity-dot {
          width:8px; height:8px; border-radius:2px;
          background:rgba(0,255,200,0.15);
          transition:background 0.2s;
        }
        .activity-dot.active { background:rgba(0,255,200,0.55); }
        .activity-dot.mid { background:rgba(0,255,200,0.3); }
      `}</style>

      <aside style={{ width: 210 }}>
        <Sidebar />
      </aside>

      <main className="flex-1 flex flex-col" style={{ marginLeft: 210 }}>
        <div className="flex-grow px-10 lg:px-12 py-10">
          <div
            style={{
              maxWidth: 960,
              margin: "0 auto",
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >
            <header
              style={{
                position: "relative",
                paddingBottom: 32,
                overflow: "hidden",
              }}
            >
              <span
                className="ghost-text"
                style={{ fontSize: 160, right: -40, top: -40, opacity: 0.6 }}
              >
                D
              </span>

              <div
                className="flex items-center gap-3"
                style={{ marginBottom: 20 }}
              >
                <div
                  style={{
                    width: 24,
                    height: 1,
                    background: "rgba(0,255,200,0.4)",
                  }}
                />
                <span className="tag">Your Dashboard</span>
              </div>

              <div
                className="flex justify-between items-end"
                style={{ gap: 20 }}
              >
                <div>
                  <h1
                    className="unb"
                    style={{
                      fontSize: "clamp(34px,5vw,58px)",
                      fontWeight: 900,
                      letterSpacing: "-0.04em",
                      lineHeight: 1.05,
                      color: "white",
                    }}
                  >
                    Welcome back,
                    <br />
                    <span
                      style={{
                        WebkitTextStroke: "1.5px rgba(0,255,200,0.5)",
                        color: "transparent",
                        fontStyle: "italic",
                      }}
                    >
                      Student.
                    </span>
                  </h1>
                  <p
                    className="mono"
                    style={{
                      marginTop: 14,
                      fontSize: 11,
                      color: "rgba(255,255,255,0.2)",
                      letterSpacing: "0.04em",
                    }}
                  >
                    One step forward, every single day.
                  </p>
                </div>
              </div>

              <div className="teal-divider" style={{ marginTop: 28 }} />
            </header>

            <div>
              <div
                className="flex items-center gap-3"
                style={{ marginBottom: 12 }}
              >
                <span className="tag">Quick access</span>
                <div
                  style={{
                    flex: 1,
                    height: 1,
                    background:
                      "linear-gradient(to right, rgba(0,255,200,0.06), transparent)",
                  }}
                />
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4,1fr)",
                  gap: 10,
                }}
              >
                {[
                  {
                    icon: "🤖",
                    label: "AI Tutor",
                    desc: "Ask anything",
                    url: "/ai_tutor",
                  },
                  {
                    icon: "🗺",
                    label: "Roadmap",
                    desc: "Create new",
                    url: "/create/roadmap",
                  },
                  {
                    icon: "📝",
                    label: "Test",
                    desc: "Quiz yourself",
                    url: "/user/tests",
                  },
                  {
                    icon: "👥",
                    label: "Create roudmap",
                    desc: "Get in touch",
                    url: "/create/roadmap",
                  },
                ].map((a) => (
                  <a key={a.label} href={a.url} className="quick-btn">
                    <span style={{ fontSize: 22 }}>{a.icon}</span>
                    <div>
                      <div
                        className="unb"
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          color: "white",
                          letterSpacing: "-0.02em",
                        }}
                      >
                        {a.label}
                      </div>
                      <div
                        className="mono"
                        style={{
                          fontSize: 9,
                          color: "rgba(255,255,255,0.25)",
                          marginTop: 2,
                          letterSpacing: "0.05em",
                        }}
                      >
                        {a.desc}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="card rounded-2xl p-8">
              <CallYourRM />
            </div>
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

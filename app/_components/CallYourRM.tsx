"use client";

import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { ArrowRight, Map } from "lucide-react";

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

const WideCarousel: React.FC = () => {
  const router = useRouter();
  const { userId, isLoaded } = useAuth();

  const [roadmap, setRoadmap] = useState<Roadmap[]>([]);
  const [roadmapId, setRoadmapId] = useState<Roadmap[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoaded || !userId) return;
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/find-user/${userId}`);
        if (!res.ok) throw new Error("Failed to fetch user");
        setUser(await res.json());
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
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
        if (!res.ok) throw new Error("Failed to fetch roadmaps");
        setRoadmapId(await res.json());
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
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
            fetch(`/api/getroadmapinfo/${r.id}`).then((res) => {
              if (!res.ok) throw new Error("Failed roadmap fetch");
              return res.json();
            }),
          ),
        );
        setRoadmap(results);
      } catch {
        setError("Failed to load roadmaps");
      } finally {
        setLoading(false);
      }
    };
    fetchAllRoadmaps();
  }, [roadmapId]);

  if (loading) {
    return (
      <div style={{ display: "flex", gap: 12 }}>
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              width: 220,
              height: 140,
              borderRadius: 16,
              background: "rgba(0,255,200,0.03)",
              border: "1px solid rgba(0,255,200,0.07)",
              animation: "shimmer 1.5s ease-in-out infinite",
              animationDelay: `${i * 0.15}s`,
            }}
          />
        ))}
        <style>{`
          @keyframes shimmer {
            0%,100% { opacity:0.4; }
            50% { opacity:0.8; }
          }
        `}</style>
      </div>
    );
  }

  if (!loading && roadmap.length === 0) {
    return (
      <div
        onClick={() => router.push("/create/roadmap")}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          width: "100%",
          height: 130,
          borderRadius: 16,
          border: "1px dashed rgba(0,255,200,0.15)",
          background: "rgba(0,255,200,0.02)",
          cursor: "pointer",
          transition: "all 0.25s",
        }}
        className="empty-roadmap"
      >
        <style>{`
          .empty-roadmap:hover {
            border-color: rgba(0,255,200,0.3) !important;
            background: rgba(0,255,200,0.05) !important;
          }
        `}</style>
        <Map size={20} color="rgba(0,255,200,0.3)" />
        <span
          style={{
            fontFamily: "Space Mono,monospace",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "rgba(0,255,200,0.35)",
          }}
        >
          Roadmap үүсгэх
        </span>
        <span
          style={{
            fontFamily: "Space Mono,monospace",
            fontSize: 9,
            color: "rgba(255,255,255,0.15)",
          }}
        >
          + шинэ нэмэх
        </span>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@700;900&family=Space+Mono:wght@400;700&display=swap');

        .roadmap-card {
          height: 140px;
          border-radius: 16px;
          background: rgba(0,255,200,0.02);
          border: 1px solid rgba(0,255,200,0.08);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 18px 20px;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.23,1,0.32,1);
          position: relative;
          overflow: hidden;
        }
        .roadmap-card:hover {
          border-color: rgba(0,255,200,0.22);
          background: rgba(0,255,200,0.05);
          transform: translateY(-2px);
          box-shadow: 0 16px 40px rgba(0,0,0,0.3), 0 0 30px rgba(0,255,200,0.04);
        }
        .roadmap-card::before {
          content: '';
          position: absolute;
          top: 0; right: 0;
          width: 60px; height: 60px;
          background: radial-gradient(circle at top right, rgba(0,255,200,0.06), transparent);
          pointer-events: none;
        }
        .roadmap-card:hover::before {
          background: radial-gradient(circle at top right, rgba(0,255,200,0.12), transparent);
        }

        .carousel-arrow {
          width: 30px; height: 30px;
          border-radius: 8px;
          background: rgba(0,255,200,0.05);
          border: 1px solid rgba(0,255,200,0.1);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
          position: static;
          transform: none;
        }
        .carousel-arrow:hover {
          background: rgba(0,255,200,0.1);
          border-color: rgba(0,255,200,0.25);
        }
      `}</style>

      <div style={{ width: "100%", position: "relative" }}>
        <Carousel opts={{ align: "start" }} className="w-full">
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 6,
              marginBottom: 10,
            }}
          >
            <CarouselPrevious
              style={{
                position: "static",
                transform: "none",
                width: 30,
                height: 30,
                borderRadius: 8,
                background: "rgba(0,255,200,0.05)",
                border: "1px solid rgba(0,255,200,0.1)",
                color: "rgba(0,255,200,0.5)",
              }}
            />
            <CarouselNext
              style={{
                position: "static",
                transform: "none",
                width: 30,
                height: 30,
                borderRadius: 8,
                background: "rgba(0,255,200,0.05)",
                border: "1px solid rgba(0,255,200,0.1)",
                color: "rgba(0,255,200,0.5)",
              }}
            />
          </div>

          <CarouselContent style={{ marginLeft: -10 }}>
            {roadmap.map((item, idx) => (
              <CarouselItem
                key={item.id}
                className="pl-[10px]"
                style={{ flexBasis: "33.33%" }}
              >
                <div
                  className="roadmap-card"
                  onClick={() => router.push(`/roadmap/${item.id}`)}
                >
                  <span
                    style={{
                      fontFamily: "Unbounded,sans-serif",
                      fontSize: 9,
                      fontWeight: 700,
                      letterSpacing: "0.2em",
                      color: "rgba(0,255,200,0.25)",
                      textTransform: "uppercase",
                    }}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>

                  <div>
                    <div
                      style={{
                        fontFamily: "Unbounded,sans-serif",
                        fontSize: 12,
                        fontWeight: 700,
                        color: "white",
                        letterSpacing: "-0.02em",
                        lineHeight: 1.35,
                        marginBottom: 10,
                      }}
                    >
                      {item.title}
                    </div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div
                        style={{
                          height: 2,
                          width: 32,
                          borderRadius: 2,
                          background:
                            "linear-gradient(to right, rgba(0,255,200,0.5), rgba(0,255,200,0.1))",
                        }}
                      />
                      <ArrowRight size={13} color="rgba(0,255,200,0.35)" />
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </>
  );
};

export default WideCarousel;

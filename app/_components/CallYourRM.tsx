"use client";

import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
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

  const [searchQuery, setSearchQuery] = useState("");
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
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error(err);
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
      } catch (err) {
        setError("Failed to load roadmaps");
      } finally {
        setLoading(false);
      }
    };

    fetchAllRoadmaps();
  }, [roadmapId]);
  return (
    <div className="w-full px-4 lg:px-8">
      <Carousel opts={{ align: "start" }} className="w-full">
        <CarouselContent className="-ml-3">
          {roadmap.map((item) => (
            <CarouselItem
              key={item.id}
              className="pl-3 basis-[40%] sm:basis-[30%] lg:basis-[20%]"
            >
              <Card className="h-[280px] rounded-2xl border-0 bg-gradient-to-br from-white to-gray-100 shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
                <CardContent className="flex h-full flex-col items-center justify-center text-center p-6">
                  <div className="text-5xl font-bold text-gray-800 mb-3">
                    {item.title}
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="hidden lg:flex" />
        <CarouselNext className="hidden lg:flex" />
      </Carousel>
    </div>
  );
};

export default WideCarousel;

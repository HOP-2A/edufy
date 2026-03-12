import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  context: { params: Promise<{ userId: string }> },
) => {
  const { userId } = await context.params;
  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  const savedPostIds = user.savedPosts;
  const savedRoadmapIds = user.savedRoadmaps;
  const savedPosts = await prisma.post.findMany({
    where: {
      id: {
        in: savedPostIds || [],
      },
    },
    include: {
      user: true,
    },
  });
  const savedMaps = await prisma.roadmap.findMany({
    where: {
      id: {
        in: savedRoadmapIds || [],
      },
    },
    include: {
      user: true,
    },
  });
  const result = {
    savedMaps,
    savedPosts,
  };
  return NextResponse.json(result);
};

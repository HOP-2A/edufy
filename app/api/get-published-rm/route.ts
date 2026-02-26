import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const publicRoadmaps = await prisma.roadmap.findMany({
    where: {
      isPublished: true,
    },
  });

  return NextResponse.json(publicRoadmaps);
};

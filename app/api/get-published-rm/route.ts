import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  const roadmaps = await prisma.roadmap.findMany({
    where: {
      isPublished: true,
    },
  });

  return NextResponse.json(roadmaps);
};

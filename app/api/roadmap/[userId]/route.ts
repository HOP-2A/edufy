import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (
  req: NextRequest,
  context: { params: Promise<{ userId: string }> },
) => {
  const { userId } = await context.params;
  const body = await req.json();
  const createdRoadmap = await prisma.roadmap.create({
    data: {
      userId,
      title: body.title,
      purpose: body.purpose,
    },
  });
  return NextResponse.json(createdRoadmap);
};
export const GET = async (
  req: NextRequest,
  context: { params: Promise<{ userId: string }> },
) => {
  const { userId } = await context.params;
  const roadmaps = await prisma.roadmap.findMany({
    where: {
      userId,
    },
  });
  return NextResponse.json(roadmaps);
};

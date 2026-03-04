import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (
  req: NextRequest,
  context: {
    params: Promise<{ id: string }>;
  },
) => {
  const { id } = await context.params;

  if (!id) {
    return NextResponse.json({ message: "No ID provided" }, { status: 400 });
  }

  const body = await req.json();
  const updatedRoadmap = await prisma.roadmap.update({
    where: { id },
    data: { isPublished: body.isPublished },
  });

  return NextResponse.json(updatedRoadmap);
};

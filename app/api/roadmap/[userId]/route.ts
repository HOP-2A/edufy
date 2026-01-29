import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { userId: string } },
) {
  const { userId } = params;
  const body = await req.json();

  const createdRoadmap = await prisma.roadmap.create({
    data: {
      userId,
      title: body.title,
      purpose: body.purpose,
    },
  });

  return NextResponse.json(createdRoadmap);
}

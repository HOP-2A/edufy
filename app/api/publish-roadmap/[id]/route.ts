import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (
  req: NextRequest,
  { params }: { params: string },
) => {
  const parms = await params;
  const id = parms.id;

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

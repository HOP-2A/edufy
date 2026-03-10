import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const roadmap = await prisma.roadmap.create({
    data: {
      title: body.title,
      purpose: body.purpose,
      userId: body.userId,
    },
  });
  for (const section of body.learningSections) {
    await prisma.learningSection.create({
      data: {
        title: section.ltitle,
        content: section.content,
        roadmapId: roadmap.id,
      },
    });
  }
  return NextResponse.json({ message: "Succesful" });
};

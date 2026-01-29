import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  try {
    const roadmap = await prisma.roadmap.findUnique({
      where: {
        id,
      },
      include: {
        learningSections: {
          include: {
            resources: true,
            tasks: {
              include: {
                resources: true,
                taskQuestions: true,
              },
              orderBy: {
                order: "asc",
              },
            },
          },
        },
      },
    });

    if (!roadmap) {
      return NextResponse.json({ error: "Roadmap not found" }, { status: 404 });
    }

    return NextResponse.json(roadmap);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to fetch roadmap" },
      { status: 500 },
    );
  }
}

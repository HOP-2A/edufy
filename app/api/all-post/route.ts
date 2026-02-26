import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (_req: NextRequest) => {
  const posts = await prisma.post.findMany({
    include: {
      user: true,
    },
  });
  return NextResponse.json(posts);
};

import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server.js";
export const GET = async (
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) => {
  const params = await context.params;
  const user = await prisma.user.findUnique({
    where: {
      id: params.id,
    },
    include: {
      posts: true,
      roadmaps: true,
    },
  });
  return NextResponse.json(user);
};

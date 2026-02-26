import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (
  req: NextRequest,
  context: { params: Promise<{ userId: string }> },
) => {
  const { userId } = await context.params;
  const body = await req.json();
  await prisma.post.create({
    data: {
      userId,
      images: body.image,
      caption: body.caption,
      category: body.caption,
    },
  });
  return NextResponse.json({ message: "succesful" });
};
export const GET = async (
  _req: NextRequest,
  context: { params: Promise<{ userId: string }> },
) => {
  const { userId } = await context.params;
  const posts = await prisma.post.findMany({
    where: {
      userId,
    },
  });
  return NextResponse.json(posts);
};
export const DELETE = async (req: NextRequest) => {
  const body = await req.json();
  await prisma.post.delete({
    where: {
      id: body.id,
    },
  });
  return NextResponse.json({ message: "succesful" });
};

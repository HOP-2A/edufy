import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const POST = async (req: NextRequest) => {
  const body = await req.json();

  await prisma.projectQuestion.update({
    where: {
      id: body.id,
    },
    data: {
      answer: body.answer,
    },
  });
  return NextResponse.json({ message: "successful" });
};

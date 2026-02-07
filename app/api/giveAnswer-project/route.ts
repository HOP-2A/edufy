import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (req: NextRequest) => {
  const body = await req.json();
  await prisma.projectQuestion.update({
    where: {
      id: body.id,
    },
    data: {
      answer: body.answer,
    },
  });
  return NextResponse.json({ message: "Succesful" });
};

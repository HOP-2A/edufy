import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
const genAI = new GoogleGenerativeAI(process.env.TaskGEMINI_KEY || "");
const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});
export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const res = await model.generateContent(body.prompt);
  const aiRes = res.response.text();
  return NextResponse.json(aiRes);
};

import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY || "");
const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

export const POST = async (req: NextRequest) => {
  const body = await req.json();

  const prompt = `You are a helpful AI tutor. Answer the user's question in a clear and concise way. answer short not long .

User question: ${body.message}`;

  const result = await model.generateContent(prompt);
  const response = result.response.text();

  return NextResponse.json({ response });
};

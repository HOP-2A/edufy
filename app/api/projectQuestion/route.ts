import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import prisma from "@/lib/prisma";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY || "");
const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const prompt = `You are an AI Roadmap Planner.

Your task is to ask ONLY the essential questions needed to create a clear, personalized learning roadmap.

STRICT RULES:

Ask questions ONLY

Do NOT explain anything

Do NOT give suggestions

Do NOT create the roadmap

Do NOT add any text outside JSON

Do NOT use markdown

Questions must be short, clear, and practical

Ask between 8 and 10 questions

Do NOT ask opinion-based or unnecessary preference questions

Only ask questions that directly affect difficulty, time planning, structure, or goals

Questions must be in Mongolian

REQUIRED COVERAGE:

Current skill level

Prior experience

Weekly available time

Clear measurable final goal

Deadline pressure

Real constraints or limitations

INPUT:
roadmapTitle: ${body.roadmapTitle}
startDate: ${body.startDate}
endDate: ${body.endDate}
purpose: ${body.purpose}

OUTPUT FORMAT (MUST MATCH EXACTLY):
{
"questions": [
{
"question": "string"
}
]
}

FINAL CHECK:

Output ONLY valid JSON

JSON must be parsable

No trailing commas

No extra fields

No text outside JSON
`;
  const result = await model.generateContent(prompt);
  const ress = result.response.text();
  const jsonMatch = ress.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error("No JSON found in AI response");
  }

  const aiQs = JSON.parse(jsonMatch[0]);
  const createdQs = await Promise.all(
    aiQs.questions.map((qt: { id: string; question: string }) =>
      prisma.projectQuestion.create({
        data: {
          roadmapId: body.roadmapId,
          text: qt.question,
        },
      }),
    ),
  );
  return NextResponse.json(createdQs);
};
export const PUT = async (req: NextRequest) => {
  const body = await req.json();
  const res = await prisma.projectQuestion.update({
    where: {
      id: body.id,
    },
    data: {
      answer: body.answer,
    },
  });
  if (res) {
    return NextResponse.json({ message: "Succesful" });
  }
};

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

Your task is to ask ALL necessary questions required to create a detailed, personalized learning roadmap, ask all in mongolian. 

INPUT FIELDS:
- roadmapTitle
- startDate
- endDate
- purpose

STRICT RULES:
- Ask questions ONLY
- Do NOT explain anything
- Do NOT give suggestions
- Do NOT create the roadmap yet
- Do NOT add any text outside JSON
- Do NOT use markdown
- Questions must be clear, short, and necessary
- Questions must help fully personalize a roadmap
- Avoid redundant or generic questions
- Ask between 8 and 14 questions total

OUTPUT FORMAT (MUST MATCH EXACTLY):
{
  "questions": [
    {
      "id": "q1",
      "question": "string"
    }
  ]
}

QUESTION REQUIREMENTS:
- Cover current skill level
- Cover background or prior experience
- Cover daily and weekly availability
- Cover preferred learning style
- Cover tools or resources access
- Cover constraints or limitations
- Cover goals and success definition
- Cover deadlines or milestones
- Cover motivation level or intensity
- Cover evaluation or progress tracking preferences

INPUT:
roadmapTitle: ${body.roadmapTitle}
startDate: ${body.startDate}
endDate: ${body.endDate}
purpose: ${body.purpose}

FINAL CHECK:
- Output ONLY valid JSON
- JSON must be parsable
- No trailing commas
- No extra fields
- No text outside JSON
-try to give less response dont give too much things
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

import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import prisma from "@/lib/prisma";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY || "");
const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

type TaskQuestion = {
  text: string;
  answer: string;
};

type Task = {
  id: string;
  title: string;
  content: string;
  order: number;
  taskQuestions: TaskQuestion[];
  resources?: { type: string; title: string; url: string }[];
};

type LearningSection = {
  id: string;
  title: string;
  level: string;
  content: string;
  tasks: Task[];
  resources?: { type: string; title: string; url: string }[];
};

type RoadmapAIResponse = {
  description: string;
  levelFrom: string;
  levelTo: string;
  learningSections: LearningSection[];
};

export const POST = async (req: NextRequest) => {
  const body = await req.json();

  const questions = await prisma.projectQuestion.findMany({
    where: { roadmapId: body.roadmapId },
  });

  const prompt = `You are an expert AI Learning Section Creator. Your goal is to generate **all necessary learning sections** based on the following user questions and answers. Each section should **teach or explain the concept clearly**, including practical rules, steps, examples, or mini exercises, not just vague explanations like “this is important.”

**Output rules:**
- Output ONLY valid JSON. No markdown, explanations, or extra text.
- JSON must strictly follow this format:

{
  "learningSections": [
    {
      "id": "section1",
      "title": "Specific topic title",
      "level": "Beginner | Intermediate | Advanced",
      "content": "4–6 sentences that clearly teach or explain the concept, include practical rules, examples, or mini exercises.",
      "resources": [
        {
          "type": "BOOK | VIDEO | ARTICLE | EXERCISE | OTHER",
          "title": "Resource title",
          "url": "Working URL",
          "instructions": "Step-by-step instructions for using the resource."
        }
      ]
    }
  ]
}

**User inputs from the roadmap body:**
Title: ${body.title}
Purpose: ${body.purpose}
Start Date: ${body.startDate}
End Date: ${body.endDate}
**User questions and answers:**
${JSON.stringify(
  questions.map((q) => ({ question: q.text, answer: q.answer })),
)}
`;

  const response = await model.generateContent(prompt);
  const aiRes = response.response.text();

  const jsonMatch = aiRes.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("No JSON found in AI response");

  const aiQs: RoadmapAIResponse = JSON.parse(jsonMatch[0]);

  if (!Array.isArray(aiQs.learningSections))
    throw new Error("Invalid AI response structure");

  for (const section of aiQs.learningSections) {
    const createdSection = await prisma.learningSection.create({
      data: {
        roadmapId: body.roadmapId,
        title: section.title,
        level: section.level,
        content: section.content,
      },
    });

    if (section.resources && section.resources.length > 0) {
      for (const res of section.resources) {
        await prisma.resource.create({
          data: {
            learningSectionId: createdSection.id,
            type: res.type,
            title: res.title,
            url: res.url,
          },
        });
      }
    }
  }

  return NextResponse.json(aiQs);
};

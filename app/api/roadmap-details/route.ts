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

  const prompt = `You are an expert AI Learning Section Planner. Your goal is to generate practical task-based learning sections based on the user’s roadmap input and questions. Each section should tell the user exactly what to do each day or week (like a schedule), e.g., “Monday: practice 10 words,” “Tuesday: review one grammar rule,” “Wednesday: mini exercise,” rather than explaining concepts in theory. Focus on actionable steps.

Output rules:

Output ONLY valid JSON. No markdown, explanations, or extra text.

JSON must strictly follow this format:

{
"learningSections": [
{
"id": "section1",
"title": "Specific task section title",
"level": "Beginner | Intermediate | Advanced",
"content": "4–6 sentences describing exactly what tasks the user should perform each day or week, including exercises, mini tasks, or practice activities. Example: 'Monday: learn 10 new words. Tuesday: review one grammar rule and write 5 sentences.'",
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

User inputs from the roadmap body:
Title: ${body.title}
Purpose: ${body.purpose}
Start Date: ${body.startDate}
End Date: ${body.endDate}
User questions and answers:
${JSON.stringify(
  questions.map((q) => ({ question: q.text, answer: q.answer })),
)}

Key points for generating sections:

Each section corresponds to a time block (day, week, or month).

Content must tell the user what to do, not teach the theory.

Include mini exercises or repeated practice tasks.

Resources should support performing the tasks.

Keep the structure exactly as shown; do not modify keys or JSON format
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

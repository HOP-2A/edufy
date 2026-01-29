import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import prisma from "@/lib/prisma";

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY || "");
const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

// Type definitions
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

  const prompt = `You are an expert AI Learning Section Creator.

Your task is to generate **learning sections only** for a roadmap based on the following user questions and answers. Focus only on beginner-level topics ("Түвшин 1").

INPUT DATA:
${JSON.stringify(
  {
    roadmapTitle: body.title,
    purpose: body.purpose,
    questionsAndAnswers: questions.map((q) => ({
      question: q.text,
      answer: q.answer,
    })),
  },
  null,
  2,
)}

RULES:
- Output ONLY valid JSON. No markdown, no extra text.
- Language: Mongolian.
- Focus exclusively on **beginner-level learning sections (Түвшин 1)**.
- Each section must include:
  - id (e.g., "section1")
  - title (specific beginner topic)
  - level ("Түвшин 1")
  - content (4–6 sentences explaining the concept, why it matters, and what the learner will achieve)
  - resources (2–4 high-quality, actionable resources with real URLs)
    - Resource types: VIDEO | ARTICLE | BOOK | EXERCISE | OTHER
    - Each resource must include instructions on **how to use it**:
      * Example: "Go to this page, scroll to chapter X, complete exercises 1–5"
    - Include only free or widely accessible resources if possible.
- Learning sections should **cover all beginner concepts needed to understand the topic** based on the user’s questions.
- Create 5–10 sections.
- Resources must directly match what the learning section teaches.
- Do not create tasks or taskQuestions.

OUTPUT FORMAT:
{
  "learningSections": [
    {
      "id": "section1",
      "title": "Суурь ойлголт",
      "level": "Түвшин 1",
      "content": "Энэ хэсэгт сурагч нь суурь ойлголтуудыг сурна. ...",
      "resources": [
        {
          "type": "BOOK",
          "title": "English Grammar in Use - Elementary",
          "url": "https://www.cambridge.org/grammar",
        },
        {
          "type": "EXERCISE",
          "title": "Relative Clauses Exercises",
          "url": "https://www.perfect-english-grammar.com/relative-clauses-exercise-1.html",
        }
      ]
    }
  ]
}

Only output valid JSON. Do not include anything outside JSON.`;

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

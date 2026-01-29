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

// API handler
export const POST = async (req: NextRequest) => {
  const body = await req.json();

  // Fetch user's questions
  const questions = await prisma.projectQuestion.findMany({
    where: { roadmapId: body.roadmapId },
  });

  // Build AI prompt
  const prompt = `You are an expert AI Roadmap Generator.

Generate a COMPLETE learning roadmap in STRICTLY VALID JSON.

INPUT DATA:
${JSON.stringify(
  {
    roadmapTitle: body.title,
    purpose: body.purpose,
    questionsAndAnswers: questions.map(
      (q: { text: string; answer: string | null }) => ({
        question: q.text,
        answer: q.answer,
      }),
    ),
  },
  null,
  2,
)}

RULES:
- Output ONLY valid JSON
- No markdown, no explanations, no extra text
- No trailing commas
- All content must be in Mongolian
- Progress from beginner to advanced
- Create 15–30+ sections if needed
- Use levels: "Түвшин 1", "Түвшин 2", "Түвшин 3", "Түвшин 4", etc.

STRUCTURE:
- Each learning section must include:
  - id (e.g. "section1")
  - title
  - level
  - content (4–6 sentences)
  - EXACTLY ONE task
  - 2–4 section resources with real URLs

- Each task must include:
  - id (e.g. "task1")
  - title
  - content (6–10 sentences)
  - order: 1
  - 3–5 taskQuestions (text + detailed answer)
  - 3–6 high-quality resources with REAL URLs

RESOURCE TYPES:
VIDEO | ARTICLE | BOOK | EXERCISE | OTHER

OUTPUT FORMAT:
{
  "description": "...",
  "levelFrom": "...",
  "levelTo": "...",
  "learningSections": [
    {
      "id": "section1",
      "title": "...",
      "level": "Түвшин 1",
      "content": "...",
      "tasks": [
        {
          "id": "task1",
          "title": "...",
          "content": "...",
          "order": 1,
          "taskQuestions": [
            { "text": "...", "answer": "..." }
          ],
          "resources": [
            { "type": "VIDEO", "title": "...", "url": "https://..." }
          ]
        }
      ],
      "resources": [
        { "type": "ARTICLE", "title": "...", "url": "https://..." }
      ]
    }
  ]
}

Generate the roadmap now. Use small, concise data.`;

  // Generate content
  const response = await model.generateContent(prompt);
  const aiRes = response.response.text();

  // Extract JSON safely
  const jsonMatch = aiRes.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("No JSON found in AI response");

  const aiQs: RoadmapAIResponse = JSON.parse(jsonMatch[0]);

  if (!Array.isArray(aiQs.learningSections))
    throw new Error("Invalid AI response structure");

  // Save to database
  for (const section of aiQs.learningSections) {
    const createdSection = await prisma.learningSection.create({
      data: {
        roadmapId: body.roadmapId,
        title: section.title,
        level: section.level,
        content: section.content,
      },
    });

    for (const task of section.tasks) {
      const createdTask = await prisma.task.create({
        data: {
          learningSectionId: createdSection.id,
          title: task.title,
          order: task.order,
          content: task.content,
        },
      });

      await Promise.all(
        task.taskQuestions.map((q) =>
          prisma.taskQuestion.create({
            data: {
              taskId: createdTask.id,
              text: q.text,
              answer: q.answer,
            },
          }),
        ),
      );
    }
  }

  // Return structured roadmap
  return NextResponse.json(aiQs);
};

import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

type task = {
  title: string;
  content: string;
  questions: { text: string; answer: string }[];
};

type questions = {
  text: string;
  answer: string;
};

export const GET = async () => {
  const res = await prisma.learningSection.findMany({
    select: {
      title: true,
      content: true,
    },
  });

  return NextResponse.json(res);
};

const genAI = new GoogleGenerativeAI(process.env.TaskGEMINI_KEY || "");
const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

export const POST = async (req: NextRequest) => {
  const { title, content, learningSectionId, input } = await req.json();

  if (!title || !content || !learningSectionId || !input) {
    return NextResponse.json(
      { error: "missing required fields" },
      { status: 400 },
    );
  }

  const prompt = `
You are an AI learning task generator.

INPUT:

LearningSectionTitle: ${title}
LearningSectionContent: ${content}
userInput: ${input}

TASK RULES:
- Create exactly ONE learning task
- The task should contain exactly 10 questions
- Each question can be:
  - Multiple choice (provide options and correct answer)
  - True/False
  - Fill-in-the-blank
- Each question must have:
  - "text": the question
  - "answer": the correct answer
- The task level is 1 (default)
- Make the task relevant to the LearningSection content
- Keep questions short, clear, and educational

OUTPUT STRICT JSON:
{
  "tasks": [
    {
      "title": "string",
      "content": "string",
      "level": 1,
      "questions": [
        { "text": "string", "answer": "string" }
      ]
    }
  ]
}

RULES:
- Output ONLY valid JSON
- No text outside JSON
- JSON must be parseable
- Do not add extra fields
`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    return NextResponse.json({ error: "Invalid AI response" }, { status: 400 });
  }

  const aiQs = JSON.parse(jsonMatch[0]);

  if (!Array.isArray(aiQs.tasks)) {
    return NextResponse.json({ error: "tasks not array" }, { status: 400 });
  }

  const createdTasks = await Promise.all(
    aiQs.tasks.map(async (task: task, index: number) => {
      const createdTask = await prisma.task.create({
        data: {
          learningSectionId,
          title: task.title,
          content: task.content,
          order: index + 1,
        },
      });

      await Promise.all(
        task.questions.map((q: questions) =>
          prisma.taskQuestion.create({
            data: {
              taskId: createdTask.id,
              text: q.text,
              answer: q.answer,
            },
          }),
        ),
      );

      return createdTask;
    }),
  );

  return NextResponse.json(createdTasks);
};

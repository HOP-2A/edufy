import { Input } from "@/components/ui/input";
import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

type TaskQuestion = {
  text: string;
  answer: string;
};

type Task = {
  title: string;
  content: string;
  level?: number;
  questions: TaskQuestion[];
};

const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export const POST = async (req: NextRequest) => {
  try {
    const { title, content, learningSectionId, input } = await req.json();

    if (!title || !content || !learningSectionId || !input) {
      return NextResponse.json(
        { error: "Missing required fields" },
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
    let aiTasks: Task[] = [];

    if (jsonMatch) {
      try {
        const parsed = JSON.parse(jsonMatch[0]);
        if (Array.isArray(parsed.tasks)) {
          aiTasks = parsed.tasks;
        }
      } catch (err) {
        console.warn("AI JSON parse failed, using fallback task", err);
      }
    }

    if (aiTasks.length === 0) {
      aiTasks = [
        {
          title,
          content,
          level: 1,
          questions: [],
        },
      ];
    }

    const createdTasks = await Promise.all(
      aiTasks.map(async (task, index) => {
        const createdTask = await prisma.task.create({
          data: {
            learningSectionId,
            title: task.title,
            content: task.content,
            order: index + 1,
          },
        });

        if (Array.isArray(task.questions)) {
          await Promise.all(
            task.questions.map((q) =>
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

        const questions = await prisma.taskQuestion.findMany({
          where: { taskId: createdTask.id },
        });

        return {
          ...createdTask,
          questions,
        };
      }),
    );

    return NextResponse.json(createdTasks);
  } catch (err) {
    console.error("POST /api/create-task error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
};

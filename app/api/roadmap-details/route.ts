import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import prisma from "@/lib/prisma";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY || "");
const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});
export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const questions = await prisma.projectQuestion.findMany({
    where: { roadmapId: body.roadmapId },
  });
  const prompt = `You are an expert AI Roadmap Generator that creates highly detailed, personalized learning roadmaps.

Your task is to generate a COMPLETE roadmap in valid JSON format based on the user's roadmap data and question answers.

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

STRICT RULES:
- Output ONLY valid JSON
- NO markdown formatting (no \`\`\`json)
- NO text outside JSON
- NO trailing commas
- NO explanations or commentary
- Create as many learning sections as needed for comprehensive learning (typically 15-30+ sections)
- Use level names: "Түвшин 1", "Түвшин 2", "Түвшин 3", "Түвшин 4", etc.
- Each level should have multiple sections covering different topics
- Each section MUST have EXACTLY ONE task
- Each task must have 3-5 questions for knowledge verification
- Each task must have 3-6 SPECIFIC, HIGH-QUALITY resources with real URLs
- All content must be in Mongolian
- Progress logically from lower to higher levels
- Cover the topic comprehensively - don't limit sections
- Make content highly specific to the roadmapTitle and purpose

OUTPUT FORMAT (MUST MATCH EXACTLY):
{
  "description": "string - 2-3 sentence roadmap overview in Mongolian",
  "levelFrom": "string - starting skill level (e.g., Эхлэгч, Дунд)",
  "levelTo": "string - target skill level (e.g., Дунд, Ахисан)",
  "learningSections": [
    {
      "title": "string - specific section title in Mongolian describing what will be learned",
      "level": "string - must be 'Түвшин 1', 'Түвшин 2', 'Түвшин 3', etc.",
      "content": "string - detailed section overview, 4-6 sentences in Mongolian explaining what will be learned, why it matters, and how it fits in the learning path",
      "tasks": [
        {
          "title": "string - task title in Mongolian (should match or relate to section title)",
          "content": "string - comprehensive task description in Mongolian with: learning objectives, step-by-step approach, practice methods, estimated time, success criteria (6-10 sentences)",
          "order": 1,
          "taskQuestions": [
            {
              "text": "string - specific question in Mongolian to verify understanding",
              "answer": "string - detailed correct answer with thorough explanation in Mongolian"
            }
          ],
          "resources": [
            {
              "type": "VIDEO" | "ARTICLE" | "BOOK" | "EXERCISE" | "OTHER",
              "title": "string - SPECIFIC resource title in Mongolian (e.g., 'Python Tutorial - Variables and Data Types by Corey Schafer')",
              "url": "string - MUST be real, working, specific URL (not null unless absolutely no resource exists)"
            }
          ]
        }
      ],
      "resources": [
        {
          "type": "VIDEO" | "ARTICLE" | "BOOK" | "EXERCISE" | "OTHER",
          "title": "string - SPECIFIC section-level resource title in Mongolian",
          "url": "string - MUST be real, working, specific URL or null only if no resource exists"
        }
      ]
    }
  ]
}

CONTENT QUALITY REQUIREMENTS:

1. DESCRIPTION:
   - Summarize the entire learning journey
   - Mention key outcomes and target skill level
   - Reference the purpose provided

2. COMPREHENSIVE COVERAGE:
   - Create as many sections as needed to cover the topic thoroughly
   - Break down complex topics into multiple focused sections
   - Each section should cover ONE specific concept or skill
   - Don't worry about having too many sections - comprehensive is better
   - Typical roadmaps should have 15-30+ sections depending on complexity

3. LEVEL ORGANIZATION:
   - Түвшин 1: Absolute beginner/Foundation concepts (setup, basics, terminology)
   - Түвшин 2: Building on basics (simple applications, practice)
   - Түвшин 3: Intermediate skills (combining concepts, real projects)
   - Түвшин 4: Advanced topics (optimization, best practices, complex scenarios)
   - Түвшин 5+: Expert/Specialized content (architecture, advanced patterns, niche topics)
   - Create as many sections per level as needed
   - Order sections by level (all Түвшин 1 first, then Түвшин 2, etc.)
   - Within same level, order by logical learning progression

4. LEARNING SECTIONS:
   - Title: Be specific (e.g., "Python-ийн хувьсагч болон өгөгдлийн төрөл" not just "Суурь ойлголт")
   - Content: 4-6 detailed sentences explaining:
     * What exactly will be learned in this section
     * Why this topic is important
     * How it connects to previous and future sections
     * What practical skills will be gained
   - Each section = ONE focused learning topic
   - Section resources: 2-4 supplementary resources for the entire section topic

5. TASKS (ONE per section):
   - Title: Should clearly state what will be accomplished
   - Content: 6-10 comprehensive sentences including:
     * Clear learning objectives (what you'll be able to do)
     * Step-by-step approach to learning this topic
     * Recommended practice methods
     * Estimated time commitment (be realistic)
     * How to know you've mastered it (success criteria)
     * Common pitfalls to avoid
     * How this connects to real-world applications
   - Order: Always 1 (since only one task per section)

6. TASK QUESTIONS (3-5 per task):
   - Test understanding of the specific section topic
   - Mix of question types:
     * Conceptual understanding (what/why)
     * Practical application (how)
     * Problem-solving scenarios
   - Answers must be detailed (3-5 sentences) with:
     * Correct answer
     * Explanation of why it's correct
     * Additional context or examples
   - Difficulty aligned with section level

7. RESOURCES (CRITICAL - MUST BE SPECIFIC):
   - Provide 3-6 resources PER TASK
   - Provide 2-4 resources PER SECTION
   - MUST include real, working URLs - do not use null unless absolutely no resource exists
   - Be SPECIFIC with titles and URLs:
     ❌ BAD: "Python суралцах видео", url: null
     ✅ GOOD: "Python for Beginners - Full Course by freeCodeCamp", url: "https://www.youtube.com/watch?v=rfscVS0vtbw"
   
   - Resource type distribution PER TASK:
     * 2 VIDEO resources (YouTube tutorials, course videos)
     * 1-2 ARTICLE resources (Medium, dev.to, official docs)
     * 1 EXERCISE resource (interactive platforms, practice sites)
     * 0-1 BOOK resources (free ebooks, documentation)
     * 0-1 OTHER resources (tools, playgrounds, communities)
   
   - Prefer well-known, high-quality sources:
     * YouTube: freeCodeCamp, Traversy Media, Programming with Mosh, CS Dojo
     * Articles: Medium, Dev.to, Official Documentation, Real Python
     * Exercises: LeetCode, HackerRank, Exercism, Codecademy
     * Books: Official docs, free O'Reilly books, MDN guides
     * Other: GitHub repos, interactive playgrounds, Stack Overflow
   
   - Title format in Mongolian but include English names:
     * "JavaScript Array Methods - JavaScript Array Methods заавар by Web Dev Simplified"
     * "Python-ийн Dictionary - Real Python гарын авлага"
   
   - URLs must be:
     * Complete (starting with https://)
     * Real and working
     * Directly related to the section topic
     * Free and accessible
     * From reputable sources

8. PERSONALIZATION (use questionsAndAnswers):
   - Adjust total number of sections based on:
     * Time available (more time = more detailed sections)
     * Current experience level (skip basics if experienced)
     * Learning style (more videos for visual, more exercises for hands-on)
   - Adjust depth of each section based on:
     * User's goals (career = comprehensive, hobby = essentials)
     * Available daily time (less time = more focused sections)
   - Resource selection based on:
     * Preferred learning style from answers
     * Tools/platforms user has access to
     * Language preferences if mentioned

9. ROADMAP SCOPE EXAMPLES:
   - Complete Beginner (Эхлэгч → Дунд): 20-30 sections across Түвшин 1-3
   - Skill Enhancement (Дунд → Ахисан): 15-25 sections across Түвшин 3-5
   - Comprehensive Mastery (Эхлэгч → Мэргэжлийн): 30-50 sections across Түвшин 1-6

FINAL VALIDATION CHECKLIST:
✓ Valid JSON syntax (no syntax errors)
✓ All strings properly escaped
✓ No trailing commas anywhere
✓ All required fields present
✓ All content in Mongolian language
✓ levelFrom and levelTo are logical
✓ Sections ordered by level (Түвшин 1 sections first, then Түвшин 2, etc.)
✓ Level field uses correct format: "Түвшин X" where X is a number
✓ Each section has EXACTLY ONE task
✓ Task order is always 1
✓ At least 3 resources per task with REAL URLs
✓ At least 2 resources per section
✓ At least 3 questions per task
✓ Resource types are from valid enum values
✓ URLs are complete, real, and specific (not generic or null)
✓ Resource titles are specific and descriptive
✓ Content is specific to the roadmapTitle and purpose
✓ Comprehensive coverage - don't limit sections artificially
✓ Each section covers ONE focused topic
✓ Clear progression in difficulty across levels
the all learning sections and tasks should have id like section1 or something and task also like task1 or something

Generate the complete roadmap now:`;
  const response = await model.generateContent(prompt);
  const aiRes = response.response.text();
  const jsonMatch = aiRes.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error("No JSON found in AI response");
  }

  const aiQs = JSON.parse(jsonMatch[0]);
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

  return NextResponse.json(JSON.parse(aiRes));
};

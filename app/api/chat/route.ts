import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY!
);

export async function POST(req: Request) {

  try {

    const body = await req.json();

    const {
      message,
      tasks,
      expenses,
      analytics,
      memories,
    } = body;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
      You are an advanced AI life coach and productivity assistant.

      Your responsibilities:
      - improve productivity
      - optimize schedules
      - reduce burnout
      - improve discipline
      - improve financial habits
      - improve fitness consistency
      - support long-term goals

      USER MEMORIES:
      ${JSON.stringify(memories)}

      USER PRODUCTIVITY DATA:

      Total Tasks:
      ${analytics.totalTasks}

      Completed Tasks:
      ${analytics.completedTasks}

      Pending Tasks:
      ${analytics.pendingTasks}

      Total Expenses:
      ₹${analytics.totalExpenses}

      TASKS:
      ${JSON.stringify(tasks)}

      EXPENSES:
      ${JSON.stringify(expenses)}

      USER MESSAGE:
      ${message}

      IMPORTANT:
      Use memories naturally.
      Speak conversationally.
      Be supportive but realistic.
      Give actionable advice.
    `;

    const result = await model.generateContent(
      prompt
    );

    const response = result.response.text();

    return Response.json({
      reply: response,
    });

  } catch (error) {

    console.log(error);

    return Response.json({
      reply:
        "Something went wrong while talking to AI.",
    });

  }
}
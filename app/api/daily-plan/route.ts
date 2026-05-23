import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY!
);

export async function POST(req: Request) {

  try {

    const body = await req.json();

    const {
      tasks,
      expenses,
      memories,
      salary,
    } = body;

    const model =
      genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
      });

    const prompt = `
      You are an advanced AI life optimization system.

      Your job:
      - create highly optimized daily schedules
      - balance productivity and recovery
      - avoid burnout
      - optimize fitness and work
      - improve discipline
      - maximize focus
      - optimize financial stability

      USER MEMORIES:
      ${JSON.stringify(memories)}

      TASKS:
      ${JSON.stringify(tasks)}

      EXPENSES:
      ${JSON.stringify(expenses)}

      MONTHLY SALARY:
      ₹${salary}

      Generate:
      - a full optimized daily schedule
      - productivity recommendations
      - recovery advice
      - financial suggestions
      - discipline improvements

      Make it practical and realistic.

      Format beautifully.
    `;

    const result =
      await model.generateContent(
        prompt
      );

    const response =
      result.response.text();

    return Response.json({
      plan: response,
    });

  } catch (error) {

    console.log(error);

    return Response.json({
      plan:
        "Something went wrong while generating the plan.",
    });

  }
}
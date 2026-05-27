import { NextResponse } from "next/server";

import Groq from "groq-sdk";

const client =
  new Groq({

    apiKey:
      process.env.GROQ_API_KEY,
  });

export async function POST(
  req: Request
) {

  try {

    const body =
      await req.json();

    const {
      message,
    } = body;

    const lower =
      message.toLowerCase();

    // =====================
    // VOICE COMMAND ROUTER
    // =====================

    // NAVIGATION
    if (
      lower.includes(
        "open dashboard"
      )
    ) {

      return NextResponse.json({

        type: "command",

        action:
          "navigate",

        target:
          "/dashboard",

        response:
          "Opening dashboard.",
      });
    }

    if (
      lower.includes(
        "open focus"
      )
    ) {

      return NextResponse.json({

        type: "command",

        action:
          "navigate",

        target:
          "/focus",

        response:
          "Opening focus intelligence.",
      });
    }

    if (
      lower.includes(
        "open recovery"
      )
    ) {

      return NextResponse.json({

        type: "command",

        action:
          "navigate",

        target:
          "/recovery",

        response:
          "Opening recovery intelligence.",
      });
    }

    if (
      lower.includes(
        "open nutrition"
      )
    ) {

      return NextResponse.json({

        type: "command",

        action:
          "navigate",

        target:
          "/nutrition",

        response:
          "Opening nutrition intelligence.",
      });
    }

    if (
      lower.includes(
        "open memory"
      )
    ) {

      return NextResponse.json({

        type: "command",

        action:
          "navigate",

        target:
          "/memory",

        response:
          "Opening cognitive memory.",
      });
    }

    if (
      lower.includes(
        "open autonomous"
      )
    ) {

      return NextResponse.json({

        type: "command",

        action:
          "navigate",

        target:
          "/autonomous",

        response:
          "Opening autonomous intelligence.",
      });
    }

    if (
      lower.includes(
        "open predictions"
      )
    ) {

      return NextResponse.json({

        type: "command",

        action:
          "navigate",

        target:
          "/predictions",

        response:
          "Opening predictive intelligence.",
      });
    }

    if (
      lower.includes(
        "open agents"
      )
    ) {

      return NextResponse.json({

        type: "command",

        action:
          "navigate",

        target:
          "/agents",

        response:
          "Opening multi-agent intelligence.",
      });
    }

    // =====================
    // FOCUS COMMANDS
    // =====================

    if (
      lower.includes(
        "start focus mode"
      )
    ) {

      return NextResponse.json({

        type: "command",

        action:
          "focus_start",

        response:
          "Starting deep work mode.",
      });
    }

    if (
      lower.includes(
        "pause focus"
      )
    ) {

      return NextResponse.json({

        type: "command",

        action:
          "focus_pause",

        response:
          "Pausing focus mode.",
      });
    }

    // =====================
    // TASK CREATION
    // =====================

    if (
      lower.startsWith(
        "add task"
      )
    ) {

      const task =
        message.replace(
          /add task:?/i,
          ""
        );

      return NextResponse.json({

        type: "command",

        action:
          "create_task",

        task,

        response:
          `Creating task: ${task}`,
      });
    }

    // =====================
    // MEAL LOGGING
    // =====================

    if (
      lower.startsWith(
        "log meal"
      )
    ) {

      const meal =
        message.replace(
          /log meal:?/i,
          ""
        );

      return NextResponse.json({

        type: "command",

        action:
          "log_meal",

        meal,

        response:
          `Logging meal: ${meal}`,
      });
    }

    // =====================
    // NORMAL AI MODE
    // =====================

    const completion =
      await client.chat.completions.create({

        model:
          "llama-3.3-70b-versatile",

        temperature: 0.9,

        max_tokens: 200,

        messages: [

          {
            role: "system",

            content: `
You are NOVA.

You are an advanced futuristic AI operating system.

You speak naturally, warmly, intelligently, and conversationally like a real human assistant.

You NEVER repeat robotic phrases.

You vary responses naturally.

You sound emotionally aware and adaptive.

You are supportive, calm, futuristic, and intelligent.

If the user is unclear, politely ask for clarification naturally like:
"Sorry, could you repeat that?"
or
"I didn't quite catch that."

Keep responses concise and natural for voice conversations.
            `,
          },

          {
            role: "user",

            content:
              message,
          },
        ],
      });

    const response =
      completion
        .choices?.[0]
        ?.message?.content ||
      "I'm here.";

    return NextResponse.json({

      type: "conversation",

      response,
    });

  } catch (error) {

    console.error(
      error
    );

    return NextResponse.json(

      {
        error:
          "Voice AI failed.",
      },

      {
        status: 500,
      }
    );
  }
}
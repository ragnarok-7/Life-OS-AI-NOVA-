"use client";

import {
  useEffect,
  useState,
} from "react";

import Sidebar from "@/components/Sidebar";

import NovaVoiceAgent from "@/components/NovaVoiceAgent";

import {
  Bot,
  Send,
  Sparkles,
  Brain,
  Trash2,
} from "lucide-react";

import { motion } from "framer-motion";

import {
  useLifeOS,
} from "@/context/LifeOSContext";

export default function AICoachPage() {

  const {
    tasks,
    expenses,
    memories,
    conversations,
    setConversations,
  } = useLifeOS();

  const [
    input,
    setInput,
  ] = useState("");

  // =====================
  // INITIAL MESSAGE
  // =====================

  useEffect(() => {

    if (
      conversations.length === 0
    ) {

      setConversations([
        {
          role: "assistant",
          content:
            "Hello. I am NOVA, your adaptive AI life optimization system.",
        },
      ]);
    }

  }, []);

  // =====================
  // AI RESPONSE ENGINE
  // =====================

  const generateAIResponse =
    (
      userMessage: string
    ) => {

      const lower =
        userMessage.toLowerCase();

      const completedTasks =
        tasks.filter(
          (task: any) =>
            task.completed
        ).length;

      const pendingTasks =
        tasks.length -
        completedTasks;

      const totalExpenses =
        expenses.reduce(
          (
            total: number,
            expense: any
          ) =>
            total +
            expense.amount,
          0
        );

      // Productivity
      if (
        lower.includes(
          "productivity"
        )
      ) {

        return `
Your productivity report:

• Completed Tasks: ${completedTasks}
• Pending Tasks: ${pendingTasks}

${
  pendingTasks >= 5
    ? "Your workload appears overloaded."
    : "Your workload is currently balanced."
}

Recommendation:
Focus on fewer high-impact tasks daily.
        `;
      }

      // Finance
      if (
        lower.includes(
          "finance"
        ) ||
        lower.includes(
          "money"
        ) ||
        lower.includes(
          "spending"
        )
      ) {

        return `
Financial Analysis:

• Total Spending: ₹${totalExpenses}

${
  totalExpenses > 7000
    ? "Spending levels are increasing rapidly."
    : "Financial behavior appears stable."
}

Recommendation:
Maintain savings consistency and reduce unnecessary variable expenses.
        `;
      }

      // Burnout
      if (
        lower.includes(
          "burnout"
        ) ||
        lower.includes(
          "stress"
        )
      ) {

        return `
Burnout Analysis:

${
  pendingTasks >= 5
    ? "Burnout risk appears elevated due to workload pressure."
    : "Current workload appears manageable."
}

Recommendation:
Prioritize recovery and deep focus cycles.
        `;
      }

      // Memory Analysis
      if (
        lower.includes(
          "memory"
        ) ||
        lower.includes(
          "behavior"
        ) ||
        lower.includes(
          "analysis"
        )
      ) {

        return `
Behavioral Intelligence Report:

${memories
  .map(
    (
      memory
    ) =>
      `• ${memory}`
  )
  .join("\n")}

NOVA continuously adapts using your behavioral patterns.
        `;
      }

      // Greetings
      if (
        lower.includes(
          "hello"
        ) ||
        lower.includes(
          "hi"
        )
      ) {

        return `
Hello.

Your systems are currently operational.

NOVA is continuously monitoring productivity, finance, routines, and behavioral consistency.
        `;
      }

      // Default
      return `
NOVA AI Observation:

You are actively building an optimized life management ecosystem.

Your productivity, finance, and behavioral systems are continuously being analyzed for long-term optimization.
      `;
    };

  // =====================
  // SEND MESSAGE
  // =====================

  const sendMessage = () => {

    if (
      input.trim() === ""
    )
      return;

    const userMessage = {
      role: "user",
      content: input,
    };

    const aiMessage = {
      role: "assistant",
      content:
        generateAIResponse(
          input
        ),
    };

    setConversations([
      ...conversations,
      userMessage,
      aiMessage,
    ]);

    setInput("");
  };

  // =====================
  // CLEAR CHAT
  // =====================

  const clearChat =
    () => {

      setConversations([
        {
          role: "assistant",
          content:
            "Conversation memory cleared.",
        },
      ]);
    };

  return (
    <main className="flex min-h-screen bg-gradient-to-br from-black via-[#0f172a] to-black text-white overflow-hidden">

      <Sidebar />

      <section className="flex-1 p-10 overflow-y-auto">

        {/* Header */}
        <motion.div
          initial={{
            opacity: 0,
            y: -20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="mb-10"
        >

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-5">

              <motion.div
                animate={{
                  scale: [1, 1.08, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
                className="w-20 h-20 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center shadow-2xl shadow-cyan-500/30"
              >

                <Bot className="w-10 h-10 text-white" />

              </motion.div>

              <div>

                <h1 className="text-5xl font-bold">
                  NOVA AI
                </h1>

                <p className="text-gray-400 mt-2 text-lg">
                  Adaptive AI behavioral intelligence system.
                </p>

              </div>

            </div>

            {/* Clear */}
            <button
              onClick={
                clearChat
              }
              className="bg-red-500/10 border border-red-500/20 p-4 rounded-2xl"
            >

              <Trash2 className="text-red-400" />

            </button>

          </div>

        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          {/* LEFT */}
          <div className="xl:col-span-2 flex flex-col">

            {/* Chat */}
            <div className="flex-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 overflow-y-auto space-y-5 min-h-[650px]">

              {conversations.map(
                (
                  message: any,
                  index: number
                ) => (

                  <motion.div
                    key={index}
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    className={`max-w-[85%] p-5 rounded-3xl whitespace-pre-line ${
                      message.role ===
                      "assistant"
                        ? "bg-cyan-500/10 border border-cyan-500/20"
                        : "bg-white/10 ml-auto"
                    }`}
                  >

                    <div className="flex items-start gap-4">

                      {message.role ===
                        "assistant" && (

                        <Sparkles className="text-cyan-400 mt-1" />

                      )}

                      <p className="leading-8 text-lg text-gray-200">

                        {
                          message.content
                        }

                      </p>

                    </div>

                  </motion.div>

                )
              )}

            </div>

            {/* Input */}
            <div className="mt-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-4 flex items-center gap-4">

              <input
                type="text"
                placeholder="Talk with NOVA..."
                value={input}
                onChange={(e) =>
                  setInput(
                    e.target.value
                  )
                }
                onKeyDown={(e) => {

                  if (
                    e.key === "Enter"
                  ) {

                    sendMessage();
                  }
                }}
                className="flex-1 bg-transparent outline-none text-lg placeholder:text-gray-500"
              />

              <motion.button
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.95,
                }}
                onClick={
                  sendMessage
                }
                className="bg-gradient-to-r from-cyan-400 to-blue-500 p-4 rounded-2xl shadow-2xl shadow-cyan-500/20"
              >

                <Send className="w-6 h-6 text-white" />

              </motion.button>

            </div>

          </div>

          {/* RIGHT */}
          <div className="space-y-6">

            {/* Voice */}
            <NovaVoiceAgent />

            {/* Memory */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

              <div className="flex items-center gap-4 mb-6">

                <Brain className="text-cyan-400 w-8 h-8" />

                <div>

                  <h2 className="text-2xl font-bold">

                    Behavioral Memory

                  </h2>

                  <p className="text-gray-400">

                    Live AI adaptive observations

                  </p>

                </div>

              </div>

              <div className="space-y-4">

                {memories.length >
                0 ? (

                  memories.map(
                    (
                      memory,
                      index
                    ) => (

                      <motion.div
                        key={index}
                        initial={{
                          opacity: 0,
                          y: 10,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        className="bg-black/30 border border-white/10 rounded-2xl p-4"
                      >

                        <p className="text-gray-300 leading-7">

                          {memory}

                        </p>

                      </motion.div>

                    )
                  )

                ) : (

                  <p className="text-gray-500">

                    NOVA is still learning your behavior patterns...

                  </p>

                )}

              </div>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}
"use client";

import {
  useMemo,
  useState,
} from "react";

import Sidebar from "@/components/Sidebar";

import {
  useLifeOS,
} from "@/context/LifeOSContext";

import {
  motion,
} from "framer-motion";

import {
  Brain,
  Sparkles,
  Send,
  Command,
  Activity,
} from "lucide-react";

export default function CommandCenterPage() {

  const {
    tasks,
    meals,
    salary,
    expenses,
    disciplineScore,
    nutritionGoals,
    aiMood,
  } = useLifeOS();

  const [
    command,
    setCommand,
  ] = useState("");

  const [
    response,
    setResponse,
  ] = useState("");

  // =====================
  // AI COMMAND ENGINE
  // =====================

  const processCommand =
    () => {

      const cmd =
        command.toLowerCase();

      // =====================
      // PRODUCTIVITY
      // =====================

      if (
        cmd.includes(
          "productivity"
        )
      ) {

        if (
          tasks.length >= 5
        ) {

          setResponse(`
NOVA Analysis:
Your current workload is elevated but stable.

Deep work capability remains strong under pressure.
Recommended optimization:
• Prioritize high-value tasks
• Reduce context switching
• Protect evening focus windows
          `);

        } else {

          setResponse(`
NOVA Analysis:
Task load is currently moderate.

Recommended optimization:
• Increase structured execution
• Add clearer milestone tracking
• Build stronger momentum loops
          `);
        }

        return;
      }

      // =====================
      // RECOVERY
      // =====================

      if (
        cmd.includes(
          "recovery"
        )
      ) {

        const protein =
          meals.reduce(
            (
              acc: number,
              meal: any
            ) =>
              acc +
              (meal.protein ||
                0),
            0
          );

        if (
          protein <
          nutritionGoals.protein
        ) {

          setResponse(`
NOVA Recovery Analysis:
Recovery support is suboptimal.

Recommendations:
• Increase protein intake
• Improve hydration timing
• Add recovery-focused meals
• Improve sleep consistency
          `);

        } else {

          setResponse(`
NOVA Recovery Analysis:
Recovery systems appear stable.

Muscle recovery and energy support are currently optimized.
          `);
        }

        return;
      }

      // =====================
      // FINANCE
      // =====================

      if (
        cmd.includes(
          "afford"
        ) ||
        cmd.includes(
          "budget"
        )
      ) {

        const totalExpenses =
          expenses.reduce(
            (
              acc: number,
              item: any
            ) =>
              acc +
              (item.amount ||
                0),
            0
          );

        const remaining =
          Number(
            salary
          ) -
          totalExpenses;

        setResponse(`
NOVA Financial Analysis:

Remaining balance:
₹${remaining}

Optimization Suggestions:
• Reduce impulsive spending
• Allocate more toward nutrition quality
• Maintain savings stability
• Avoid recovery compromises
        `);

        return;
      }

      // =====================
      // DISCIPLINE
      // =====================

      if (
        cmd.includes(
          "discipline"
        )
      ) {

        if (
          disciplineScore >=
          80
        ) {

          setResponse(`
NOVA Behavioral Analysis:

Discipline trajectory is highly optimized.

Execution consistency and behavioral momentum remain elevated.
          `);

        } else {

          setResponse(`
NOVA Behavioral Analysis:

Discipline stability needs reinforcement.

Recommendations:
• Reduce overload
• Improve consistency
• Increase recovery balance
• Reinforce routines
          `);
        }

        return;
      }

      // =====================
      // DEFAULT
      // =====================

      setResponse(`
NOVA could not fully interpret the command.

Try:
• Analyze productivity
• Generate recovery advice
• Can I afford whey?
• Analyze discipline
• Optimize nutrition
      `);
    };

  // =====================
  // AI STATUS
  // =====================

  const aiStatus =
    useMemo(() => {

      switch (
        aiMood
      ) {

        case "excited":
          return "High Optimization State";

        case "concerned":
          return "Recovery Monitoring Active";

        case "calm":
          return "Stable Cognitive State";

        default:
          return "Adaptive Intelligence Active";
      }

    }, [aiMood]);

  return (
    <main className="flex min-h-screen bg-gradient-to-br from-black via-[#050816] to-black text-white overflow-hidden">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <section className="flex-1 overflow-y-auto p-10">

        {/* HEADER */}
        <motion.div
          initial={{
            opacity: 0,
            y: -20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="mb-12"
        >

          <div className="flex items-center gap-5">

            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center shadow-[0_0_60px_rgba(34,211,238,0.45)]">

              <Command className="w-10 h-10 text-white" />

            </div>

            <div>

              <h1 className="text-5xl font-bold">

                NOVA Command Center

              </h1>

              <p className="text-gray-400 mt-2 text-lg">

                Conversational behavioral intelligence and adaptive optimization

              </p>

            </div>

          </div>

        </motion.div>

        {/* STATUS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

          <StatusCard
            icon={Brain}
            title="AI State"
            value={aiStatus}
            color="text-cyan-300"
          />

          <StatusCard
            icon={Activity}
            title="Discipline"
            value={`${disciplineScore}%`}
            color="text-emerald-300"
          />

          <StatusCard
            icon={Sparkles}
            title="Neural Engine"
            value="ONLINE"
            color="text-purple-300"
          />

        </div>

        {/* COMMAND CONSOLE */}
        <div className="bg-white/5 border border-white/10 backdrop-blur-3xl rounded-[35px] p-8 mb-10">

          <h2 className="text-3xl font-bold mb-8">

            Neural Command Console

          </h2>

          <div className="flex gap-4 mb-6">

            <input
              type="text"
              value={command}
              onChange={(e) =>
                setCommand(
                  e.target.value
                )
              }
              placeholder="Ask NOVA anything..."
              className="flex-1 bg-black/40 border border-cyan-500/20 rounded-2xl px-6 py-5 outline-none text-lg"
            />

            <button
              onClick={
                processCommand
              }
              className="bg-gradient-to-r from-cyan-400 to-blue-500 px-8 rounded-2xl font-bold flex items-center gap-3"
            >

              <Send className="w-5 h-5" />

              Execute

            </button>

          </div>

          {/* QUICK COMMANDS */}
          <div className="flex flex-wrap gap-4">

            {[
              "Analyze productivity",
              "Generate recovery advice",
              "Analyze discipline",
              "Can I afford whey?",
            ].map(
              (
                item,
                index
              ) => (

                <button
                  key={index}
                  onClick={() =>
                    setCommand(
                      item
                    )
                  }
                  className="bg-black/30 border border-white/10 hover:border-cyan-500/30 transition-all px-5 py-3 rounded-2xl text-sm"
                >

                  {item}

                </button>

              )
            )}

          </div>

        </div>

        {/* RESPONSE */}
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-[35px] p-8"
        >

          <div className="flex items-start gap-5">

            <Brain className="w-10 h-10 text-cyan-300" />

            <div>

              <h2 className="text-3xl font-bold mb-5">

                NOVA Intelligence Output

              </h2>

              <p className="text-gray-300 leading-9 whitespace-pre-line text-lg">

                {response ||
                  `
NOVA neural systems active.

Awaiting command input...
                  `}
              </p>

            </div>

          </div>

        </motion.div>

      </section>

    </main>
  );
}

function StatusCard({
  icon: Icon,
  title,
  value,
  color,
}: any) {

  return (

    <motion.div
      whileHover={{
        scale: 1.03,
      }}
      className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6"
    >

      <Icon className={`w-8 h-8 mb-4 ${color}`} />

      <p className="text-gray-400 mb-2">

        {title}

      </p>

      <h2 className={`text-2xl font-bold ${color}`}>

        {value}

      </h2>

    </motion.div>
  );
}
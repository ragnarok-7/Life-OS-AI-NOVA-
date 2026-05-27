"use client";

import {
  useMemo,
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
  CalendarClock,
  Activity,
  Moon,
  TimerReset,
  Flame,
  ShieldAlert,
} from "lucide-react";

export default function AutonomousPage() {

  const {
    disciplineScore,
    meals,
    habits,
    tasks,
  } = useLifeOS();

  // =====================
  // RECOVERY ESTIMATION
  // =====================

  const recoveryState =
    useMemo(() => {

      if (
        meals.length >= 3 &&
        habits.length >= 3
      ) {

        return "Optimal";
      }

      if (
        meals.length >= 2
      ) {

        return "Moderate";
      }

      return "Low";

    }, [
      meals,
      habits,
    ]);

  // =====================
  // BURNOUT ESTIMATION
  // =====================

  const burnoutRisk =
    useMemo(() => {

      let risk = 0;

      if (
        tasks.length > 8
      ) {

        risk += 40;
      }

      if (
        disciplineScore < 50
      ) {

        risk += 30;
      }

      if (
        recoveryState ===
        "Low"
      ) {

        risk += 30;
      }

      return Math.min(
        risk,
        100
      );

    }, [
      tasks,
      disciplineScore,
      recoveryState,
    ]);

  // =====================
  // AI GENERATED SCHEDULE
  // =====================

  const optimizedSchedule =
    useMemo(() => {

      if (
        burnoutRisk >= 70
      ) {

        return [

          {
            time: "08:00 AM",
            title:
              "Light Recovery Start",
            description:
              "Hydration, mobility, low cognitive load",
          },

          {
            time: "10:00 AM",
            title:
              "Shallow Work Block",
            description:
              "Administrative or lower-focus tasks",
          },

          {
            time: "01:00 PM",
            title:
              "Recovery Nutrition",
            description:
              "Protein-focused meal and hydration",
          },

          {
            time: "04:00 PM",
            title:
              "Light Deep Work",
            description:
              "Short focus sprint without overload",
          },

          {
            time: "10:30 PM",
            title:
              "Sleep Optimization",
            description:
              "Reduced stimulation and recovery focus",
          },
        ];
      }

      if (
        burnoutRisk >= 40
      ) {

        return [

          {
            time: "07:00 AM",
            title:
              "Morning Activation",
            description:
              "Hydration and movement priming",
          },

          {
            time: "09:00 AM",
            title:
              "Deep Work Session",
            description:
              "High-focus cognitive execution block",
          },

          {
            time: "01:00 PM",
            title:
              "Recovery Meal",
            description:
              "Balanced nutrition and hydration",
          },

          {
            time: "04:00 PM",
            title:
              "Moderate Focus Block",
            description:
              "Execution without excessive strain",
          },

          {
            time: "11:00 PM",
            title:
              "Recovery Sleep",
            description:
              "Sleep stabilization and nervous system recovery",
          },
        ];
      }

      return [

        {
          time: "06:00 AM",
          title:
            "Elite Morning Routine",
          description:
            "Movement, hydration, cognitive priming",
        },

        {
          time: "08:00 AM",
          title:
            "Peak Deep Work",
          description:
            "Maximum focus execution window",
        },

        {
          time: "01:00 PM",
          title:
            "Performance Nutrition",
          description:
            "Recovery-focused nutrition optimization",
        },

        {
          time: "05:00 PM",
          title:
            "Training / Gym",
          description:
            "Physical performance and recovery adaptation",
        },

        {
          time: "09:00 PM",
          title:
            "Strategic Planning",
          description:
            "Reflection, planning, behavioral review",
        },

        {
          time: "10:30 PM",
          title:
            "Sleep Recovery",
          description:
            "Circadian optimization and recovery stabilization",
        },
      ];

    }, [
      burnoutRisk,
    ]);

  // =====================
  // AI SUMMARY
  // =====================

  const aiSummary =
    useMemo(() => {

      if (
        burnoutRisk >= 70
      ) {

        return `
Cognitive strain appears elevated.

NOVA has reduced workload intensity and prioritized recovery stabilization to minimize burnout accumulation and execution collapse.
        `;
      }

      if (
        burnoutRisk >= 40
      ) {

        return `
Behavioral and cognitive systems appear moderately stable.

NOVA has balanced deep work, recovery, and workload distribution to maintain sustainable execution momentum.
        `;
      }

      return `
Performance systems appear highly stable.

NOVA has optimized deep work intensity, behavioral consistency, recovery timing, and execution scheduling for maximum cognitive performance.
      `;

    }, [
      burnoutRisk,
    ]);

  return (
    <main className="flex min-h-screen bg-gradient-to-br from-black via-[#0f172a] to-black text-white overflow-hidden">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <section className="flex-1 p-10 overflow-y-auto">

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
          className="mb-10"
        >

          <div className="flex items-center gap-5">

            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center shadow-2xl shadow-cyan-500/30">

              <Brain className="w-10 h-10 text-white" />

            </div>

            <div>

              <h1 className="text-5xl font-bold">

                Autonomous Intelligence

              </h1>

              <p className="text-gray-400 mt-2 text-lg">

                AI-driven adaptive scheduling and workload orchestration

              </p>

            </div>

          </div>

        </motion.div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

            <ShieldAlert className="w-8 h-8 text-red-300 mb-4" />

            <p className="text-gray-400 mb-2">

              Burnout Risk

            </p>

            <h2 className="text-5xl font-bold text-red-300">

              {burnoutRisk}%

            </h2>

          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

            <Moon className="w-8 h-8 text-purple-300 mb-4" />

            <p className="text-gray-400 mb-2">

              Recovery State

            </p>

            <h2 className="text-5xl font-bold text-purple-300">

              {recoveryState}

            </h2>

          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

            <Activity className="w-8 h-8 text-green-300 mb-4" />

            <p className="text-gray-400 mb-2">

              Discipline Stability

            </p>

            <h2 className="text-5xl font-bold text-green-300">

              {disciplineScore}%

            </h2>

          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

            <Flame className="w-8 h-8 text-orange-300 mb-4" />

            <p className="text-gray-400 mb-2">

              Execution Momentum

            </p>

            <h2 className="text-5xl font-bold text-orange-300">

              {
                burnoutRisk >= 70
                  ? "Low"
                  : burnoutRisk >= 40
                  ? "Moderate"
                  : "Elite"
              }

            </h2>

          </div>

        </div>

        {/* AI SUMMARY */}
        <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-3xl p-8 mb-10">

          <div className="flex items-start gap-5">

            <Sparkles className="text-cyan-300 w-10 h-10" />

            <div>

              <h2 className="text-3xl font-bold mb-4">

                Autonomous AI Analysis

              </h2>

              <p className="text-gray-300 text-lg leading-9 whitespace-pre-line">

                {aiSummary}

              </p>

            </div>

          </div>

        </div>

        {/* AI GENERATED TIMELINE */}
        <div className="space-y-6">

          {optimizedSchedule.map(
            (
              item,
              index
            ) => (

              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay:
                    index * 0.08,
                }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6"
              >

                <div className="flex items-start gap-5">

                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-cyan-400/20 to-blue-500/20 border border-cyan-500/20 flex items-center justify-center">

                    <CalendarClock className="w-8 h-8 text-cyan-300" />

                  </div>

                  <div className="flex-1">

                    <div className="flex items-center justify-between mb-3">

                      <h2 className="text-2xl font-bold">

                        {item.title}

                      </h2>

                      <p className="text-cyan-300 font-semibold">

                        {item.time}

                      </p>

                    </div>

                    <p className="text-gray-300 text-lg leading-8">

                      {item.description}

                    </p>

                  </div>

                </div>

              </motion.div>

            )
          )}

        </div>

      </section>

    </main>
  );
}
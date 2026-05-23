"use client";

import {
  motion,
} from "framer-motion";

import {
  Brain,
  Activity,
  Wallet,
  Flame,
  TrendingUp,
  ShieldAlert,
} from "lucide-react";

import {
  useLifeOS,
} from "@/context/LifeOSContext";

export default function AIIntelligencePanel() {

  const {
    tasks,
    expenses,
    memories,
  } = useLifeOS();

  // =====================
  // PRODUCTIVITY
  // =====================

  const completedTasks =
    tasks.filter(
      (task: any) =>
        task.completed
    ).length;

  const pendingTasks =
    tasks.length -
    completedTasks;

  const productivityScore =
    tasks.length === 0
      ? 0
      : Math.round(
          (completedTasks /
            tasks.length) *
            100
        );

  // =====================
  // FINANCE
  // =====================

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

  // =====================
  // BURNOUT SCORE
  // =====================

  let burnoutRisk = 20;

  if (
    pendingTasks >= 5
  ) {

    burnoutRisk += 25;
  }

  if (
    productivityScore <
    40
  ) {

    burnoutRisk += 20;
  }

  if (
    tasks.length >= 10
  ) {

    burnoutRisk += 20;
  }

  if (
    totalExpenses > 7000
  ) {

    burnoutRisk += 15;
  }

  burnoutRisk =
    Math.min(
      burnoutRisk,
      100
    );

  // =====================
  // AI RECOMMENDATIONS
  // =====================

  const recommendations: string[] =
    [];

  if (
    burnoutRisk >= 60
  ) {

    recommendations.push(
      "Reduce task overload and prioritize recovery cycles."
    );
  }

  if (
    productivityScore <
    50
  ) {

    recommendations.push(
      "Focus on completing fewer high-impact tasks consistently."
    );
  }

  if (
    totalExpenses > 7000
  ) {

    recommendations.push(
      "Reduce variable spending to improve savings stability."
    );
  }

  if (
    productivityScore >
    80
  ) {

    recommendations.push(
      "Your consistency levels are excellent. Maintain current routines."
    );
  }

  if (
    recommendations.length ===
    0
  ) {

    recommendations.push(
      "Your current life systems appear balanced and stable."
    );
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <motion.div
        initial={{
          opacity: 0,
          y: -10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6"
      >

        <div className="flex items-center gap-4">

          <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center shadow-2xl shadow-cyan-500/20">

            <Brain className="text-white w-8 h-8" />

          </div>

          <div>

            <h2 className="text-3xl font-bold text-white">

              NOVA Intelligence

            </h2>

            <p className="text-gray-400 mt-1">

              Adaptive behavioral analytics engine

            </p>

          </div>

        </div>

      </motion.div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Productivity */}
        <motion.div
          whileHover={{
            scale: 1.02,
          }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6"
        >

          <div className="flex items-center justify-between mb-5">

            <div>

              <p className="text-gray-400 mb-2">

                Productivity Score

              </p>

              <h2 className="text-5xl font-bold text-cyan-400">

                {productivityScore}%

              </h2>

            </div>

            <Activity className="text-cyan-400 w-10 h-10" />

          </div>

          <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden">

            <div
              style={{
                width: `${productivityScore}%`,
              }}
              className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
            />

          </div>

        </motion.div>

        {/* Burnout */}
        <motion.div
          whileHover={{
            scale: 1.02,
          }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6"
        >

          <div className="flex items-center justify-between mb-5">

            <div>

              <p className="text-gray-400 mb-2">

                Burnout Risk

              </p>

              <h2 className="text-5xl font-bold text-red-400">

                {burnoutRisk}%

              </h2>

            </div>

            <Flame className="text-red-400 w-10 h-10" />

          </div>

          <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden">

            <div
              style={{
                width: `${burnoutRisk}%`,
              }}
              className="h-full bg-gradient-to-r from-red-400 to-orange-500 rounded-full"
            />

          </div>

        </motion.div>

        {/* Finance */}
        <motion.div
          whileHover={{
            scale: 1.02,
          }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6"
        >

          <div className="flex items-center justify-between">

            <div>

              <p className="text-gray-400 mb-2">

                Total Spending

              </p>

              <h2 className="text-5xl font-bold text-green-400">

                ₹{totalExpenses}

              </h2>

            </div>

            <Wallet className="text-green-400 w-10 h-10" />

          </div>

        </motion.div>

        {/* AI Stability */}
        <motion.div
          whileHover={{
            scale: 1.02,
          }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6"
        >

          <div className="flex items-center justify-between">

            <div>

              <p className="text-gray-400 mb-2">

                System Stability

              </p>

              <h2 className="text-5xl font-bold text-purple-400">

                {100 - burnoutRisk}%

              </h2>

            </div>

            <ShieldAlert className="text-purple-400 w-10 h-10" />

          </div>

        </motion.div>

      </div>

      {/* Recommendations */}
      <motion.div
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-3xl p-8"
      >

        <div className="flex items-center gap-4 mb-6">

          <TrendingUp className="text-cyan-400 w-8 h-8" />

          <div>

            <h2 className="text-3xl font-bold text-white">

              AI Recommendations

            </h2>

            <p className="text-gray-400">

              Real-time adaptive optimization suggestions

            </p>

          </div>

        </div>

        <div className="space-y-4">

          {recommendations.map(
            (
              recommendation,
              index
            ) => (

              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  x: -10,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  delay:
                    index * 0.1,
                }}
                className="bg-black/30 border border-white/10 rounded-2xl p-5"
              >

                <p className="text-gray-200 text-lg leading-8">

                  • {recommendation}

                </p>

              </motion.div>

            )
          )}

        </div>

      </motion.div>

    </div>
  );
}
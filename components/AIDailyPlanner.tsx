"use client";

import {
  motion,
} from "framer-motion";

import {
  Brain,
  Clock3,
  Zap,
  Moon,
  Target,
  TrendingUp,
} from "lucide-react";

import {
  useLifeOS,
} from "@/context/LifeOSContext";

export default function AIDailyPlanner() {

  const {
    tasks,
    expenses,
  } = useLifeOS();

  // =====================
  // ANALYTICS
  // =====================

  const completedTasks =
    tasks.filter(
      (task: any) =>
        task.completed
    ).length;

  const pendingTasks =
    tasks.filter(
      (task: any) =>
        !task.completed
    );

  const productivityScore =
    tasks.length === 0
      ? 0
      : Math.round(
          (completedTasks /
            tasks.length) *
            100
        );

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
  // AI LOGIC
  // =====================

  let focusRecommendation =
    "Balanced productivity cycle recommended.";

  let recoveryRecommendation =
    "Recovery levels appear stable.";

  let burnoutStatus =
    "Low";

  let optimalFocusHours =
    "2 - 3 hours";

  // Heavy overload
  if (
    pendingTasks.length >= 7
  ) {

    focusRecommendation =
      "Reduce workload pressure and prioritize fewer high-impact tasks.";

    recoveryRecommendation =
      "Recovery cycles are strongly recommended.";

    burnoutStatus =
      "High";

    optimalFocusHours =
      "1.5 - 2 hours";
  }

  // Medium overload
  else if (
    pendingTasks.length >= 4
  ) {

    focusRecommendation =
      "Moderate workload detected. Use structured deep work sessions.";

    recoveryRecommendation =
      "Maintain balanced breaks and hydration.";

    burnoutStatus =
      "Moderate";

    optimalFocusHours =
      "2 - 4 hours";
  }

  // Productivity strong
  if (
    productivityScore >= 80
  ) {

    focusRecommendation =
      "High consistency detected. Maintain momentum carefully.";

    burnoutStatus =
      "Low";
  }

  // Finance stress
  if (
    totalExpenses > 7000
  ) {

    recoveryRecommendation +=
      " Financial pressure may also impact cognitive recovery.";
  }

  // Priority Tasks
  const priorityTasks =
    pendingTasks.slice(
      0, 
      3
    );

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

              NOVA Daily Planner

            </h2>

            <p className="text-gray-400 mt-1">

              AI-generated adaptive execution strategy

            </p>

          </div>

        </div>

      </motion.div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

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

                Burnout Status

              </p>

              <h2 className="text-5xl font-bold text-red-400">

                {burnoutStatus}

              </h2>

            </div>

            <Moon className="text-red-400 w-10 h-10" />

          </div>

        </motion.div>

        {/* Focus */}
        <motion.div
          whileHover={{
            scale: 1.02,
          }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6"
        >

          <div className="flex items-center justify-between mb-5">

            <div>

              <p className="text-gray-400 mb-2">

                Deep Focus Window

              </p>

              <h2 className="text-5xl font-bold text-cyan-400">

                {optimalFocusHours}

              </h2>

            </div>

            <Clock3 className="text-cyan-400 w-10 h-10" />

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

              AI Daily Recommendations

            </h2>

            <p className="text-gray-400">

              Intelligent behavioral optimization insights

            </p>

          </div>

        </div>

        <div className="space-y-5">

          {/* Focus */}
          <div className="bg-black/30 border border-white/10 rounded-2xl p-5">

            <div className="flex items-center gap-3 mb-3">

              <Zap className="text-yellow-400" />

              <h3 className="text-xl font-bold text-white">

                Focus Optimization

              </h3>

            </div>

            <p className="text-gray-300 text-lg leading-8">

              {focusRecommendation}

            </p>

          </div>

          {/* Recovery */}
          <div className="bg-black/30 border border-white/10 rounded-2xl p-5">

            <div className="flex items-center gap-3 mb-3">

              <Moon className="text-blue-400" />

              <h3 className="text-xl font-bold text-white">

                Recovery Strategy

              </h3>

            </div>

            <p className="text-gray-300 text-lg leading-8">

              {recoveryRecommendation}

            </p>

          </div>

        </div>

      </motion.div>

      {/* Priority Tasks */}
      <motion.div
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8"
      >

        <div className="flex items-center gap-4 mb-6">

          <Target className="text-cyan-400 w-8 h-8" />

          <div>

            <h2 className="text-3xl font-bold text-white">

              AI Priority Queue

            </h2>

            <p className="text-gray-400">

              Recommended high-impact execution order

            </p>

          </div>

        </div>

        <div className="space-y-4">

          {priorityTasks.length >
          0 ? (

            priorityTasks.map(
              (
                task: any,
                index
              ) => (

                <motion.div
                  key={task.id}
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

                  <div className="flex items-center gap-4">

                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center font-bold">

                      {index + 1}

                    </div>

                    <p className="text-lg text-gray-200">

                      {task.title}

                    </p>

                  </div>

                </motion.div>

              )
            )

          ) : (

            <p className="text-gray-500">

              No pending tasks detected.

            </p>

          )}

        </div>

      </motion.div>

    </div>
  );
}
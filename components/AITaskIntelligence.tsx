"use client";

import {
  useMemo,
} from "react";

import {
  Brain,
  Zap,
  Flame,
  Clock3,
} from "lucide-react";

import {
  motion,
} from "framer-motion";

import {
  useLifeOS,
} from "@/context/LifeOSContext";

export default function AITaskIntelligence() {

  const {
    tasks,
  } = useLifeOS();

  // =====================
  // AI TASK ANALYSIS
  // =====================

  const analyzedTasks =
    useMemo(() => {

      return tasks.map(
        (task: any) => {

          const text =
            (
              task.title ||
              ""
            ).toLowerCase();

          let priority =
            "Medium";

          let focus =
            "Moderate";

          let burnout =
            "Low";

          let recommendation =
            "Flexible execution";

          // =====================
          // HIGH FOCUS TASKS
          // =====================

          if (
            text.includes(
              "project"
            ) ||
            text.includes(
              "exam"
            ) ||
            text.includes(
              "dsa"
            ) ||
            text.includes(
              "assignment"
            ) ||
            text.includes(
              "interview"
            )
          ) {

            priority =
              "High";

            focus =
              "Deep Focus";

            burnout =
              "Medium";

            recommendation =
              "Morning execution recommended";
          }

          // =====================
          // LOW FOCUS TASKS
          // =====================

          if (
            text.includes(
              "email"
            ) ||
            text.includes(
              "message"
            ) ||
            text.includes(
              "call"
            ) ||
            text.includes(
              "meeting"
            )
          ) {

            priority =
              "Low";

            focus =
              "Light";

            burnout =
              "Low";

            recommendation =
              "Can be batched efficiently";
          }

          return {
            ...task,
            priority,
            focus,
            burnout,
            recommendation,
          };
        }
      );

    }, [tasks]);

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6"
    >

      {/* HEADER */}
      <div className="flex items-center gap-3 mb-6">

        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-400 to-cyan-500 flex items-center justify-center">

          <Brain className="text-white w-6 h-6" />

        </div>

        <div>

          <h2 className="text-2xl font-bold text-white">

            AI Task Intelligence

          </h2>

          <p className="text-gray-400">

            Adaptive cognitive workload analysis

          </p>

        </div>

      </div>

      {/* EMPTY */}
      {analyzedTasks.length === 0 && (

        <div className="bg-black/30 border border-white/10 rounded-2xl p-6">

          <p className="text-gray-300 leading-8">

            No active tasks detected. Once tasks are added, NOVA will begin analyzing cognitive load, execution difficulty, and burnout risk.

          </p>

        </div>

      )}

      {/* TASKS */}
      <div className="space-y-4">

        {analyzedTasks.map(
          (
            task: any,
            index: number
          ) => (

            <motion.div
              key={index}
              whileHover={{
                scale: 1.01,
              }}
              className="bg-black/30 border border-white/10 rounded-2xl p-5"
            >

              {/* TITLE */}
              <div className="flex items-center justify-between mb-4">

                <h3 className="text-xl font-semibold text-white">

                  {task.title}

                </h3>

                <span
                  className={`text-sm px-3 py-1 rounded-full ${
                    task.priority ===
                    "High"
                      ? "bg-red-500/20 text-red-300"
                      : task.priority ===
                        "Low"
                      ? "bg-green-500/20 text-green-300"
                      : "bg-yellow-500/20 text-yellow-300"
                  }`}
                >

                  {task.priority} Priority

                </span>

              </div>

              {/* GRID */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">

                {/* FOCUS */}
                <div className="bg-white/5 rounded-xl p-4">

                  <div className="flex items-center gap-2 mb-2">

                    <Zap className="w-4 h-4 text-cyan-300" />

                    <span className="text-sm text-gray-400">

                      Focus Weight

                    </span>

                  </div>

                  <h4 className="text-lg font-semibold text-cyan-300">

                    {task.focus}

                  </h4>

                </div>

                {/* BURNOUT */}
                <div className="bg-white/5 rounded-xl p-4">

                  <div className="flex items-center gap-2 mb-2">

                    <Flame className="w-4 h-4 text-pink-300" />

                    <span className="text-sm text-gray-400">

                      Burnout Risk

                    </span>

                  </div>

                  <h4 className="text-lg font-semibold text-pink-300">

                    {task.burnout}

                  </h4>

                </div>

                {/* EXECUTION */}
                <div className="bg-white/5 rounded-xl p-4">

                  <div className="flex items-center gap-2 mb-2">

                    <Clock3 className="w-4 h-4 text-yellow-300" />

                    <span className="text-sm text-gray-400">

                      Execution

                    </span>

                  </div>

                  <h4 className="text-lg font-semibold text-yellow-300">

                    Smart Timing

                  </h4>

                </div>

              </div>

              {/* RECOMMENDATION */}
              <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-2xl p-4">

                <p className="text-cyan-200 leading-7">

                  {task.recommendation}

                </p>

              </div>

            </motion.div>

          )
        )}

      </div>

    </motion.div>
  );
}
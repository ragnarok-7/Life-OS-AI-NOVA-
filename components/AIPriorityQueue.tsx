"use client";

import {
  useMemo,
} from "react";

import {
  Brain,
  Flame,
  Zap,
  ArrowUpRight,
} from "lucide-react";

import {
  motion,
} from "framer-motion";

import {
  useLifeOS,
} from "@/context/LifeOSContext";

export default function AIPriorityQueue() {

  const {
    tasks,
  } = useLifeOS();

  // =====================
  // AI PRIORITY SCORING
  // =====================

  const prioritizedTasks =
    useMemo(() => {

      return tasks
        .map(
          (
            task: any
          ) => {

            const text =
              (
                task.title ||
                ""
              ).toLowerCase();

            let score = 50;

            let label =
              "Moderate";

            let recommendation =
              "Flexible execution.";

            let focus =
              "Moderate";

            let energy =
              "Medium";

            // HIGH VALUE
            if (
              text.includes(
                "project"
              ) ||
              text.includes(
                "exam"
              ) ||
              text.includes(
                "interview"
              ) ||
              text.includes(
                "placement"
              ) ||
              text.includes(
                "assignment"
              ) ||
              text.includes(
                "dsa"
              )
            ) {

              score += 40;

              label =
                "Critical Focus";

              focus =
                "Deep Focus";

              energy =
                "High";

              recommendation =
                "Deep-focus execution recommended during peak mental energy.";
            }

            // QUICK TASKS
            if (
              text.includes(
                "email"
              ) ||
              text.includes(
                "call"
              ) ||
              text.includes(
                "reply"
              ) ||
              text.includes(
                "meeting"
              )
            ) {

              score += 10;

              label =
                "Quick Execution";

              focus =
                "Light";

              energy =
                "Low";

              recommendation =
                "Can be grouped into low-energy execution batches.";
            }

            // HEALTH
            if (
              text.includes(
                "gym"
              ) ||
              text.includes(
                "sleep"
              ) ||
              text.includes(
                "workout"
              )
            ) {

              score += 20;

              label =
                "Recovery Critical";

              focus =
                "Recovery";

              energy =
                "Medium";

              recommendation =
                "Recovery-linked activity detected. Long-term performance impact is high.";
            }

            return {
              ...task,
              score,
              label,
              recommendation,
              focus,
              energy,
            };
          }
        )

        .sort(
          (
            a: {score: number;},
            b: {score: number;}
          ) =>
            b.score -
            a.score
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

        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">

          <Brain className="text-white w-6 h-6" />

        </div>

        <div>

          <h2 className="text-2xl font-bold text-white">

            AI Priority Queue

          </h2>

          <p className="text-gray-400">

            Intelligent execution order generation

          </p>

        </div>

      </div>

      {/* EMPTY */}
      {prioritizedTasks.length === 0 && (

        <div className="bg-black/30 border border-white/10 rounded-2xl p-6">

          <p className="text-gray-300 leading-8">

            No tasks available for analysis. Once tasks are added, NOVA will generate adaptive execution priority recommendations.

          </p>

        </div>

      )}

      {/* TASKS */}
      <div className="space-y-4">

        {prioritizedTasks.map(
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

              {/* TOP */}
              <div className="flex items-center justify-between mb-4">

                <div className="flex items-center gap-3">

                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold">

                    {index + 1}

                  </div>

                  <div>

                    <h3 className="text-xl font-semibold text-white">

                      {task.title}

                    </h3>

                    <p className="text-sm text-gray-400">

                      {task.label}

                    </p>

                  </div>

                </div>

                <div className="text-right">

                  <p className="text-sm text-gray-400 mb-1">

                    Priority Score

                  </p>

                  <h3 className="text-2xl font-bold text-cyan-300">

                    {task.score}

                  </h3>

                </div>

              </div>

              {/* METRICS */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">

                {/* FOCUS */}
                <div className="bg-white/5 rounded-xl p-4">

                  <div className="flex items-center gap-2 mb-2">

                    <Zap className="w-4 h-4 text-cyan-300" />

                    <span className="text-sm text-gray-400">

                      Focus Load

                    </span>

                  </div>

                  <h4 className="text-lg font-semibold text-cyan-300">

                    {task.focus}

                  </h4>

                </div>

                {/* ENERGY */}
                <div className="bg-white/5 rounded-xl p-4">

                  <div className="flex items-center gap-2 mb-2">

                    <Flame className="w-4 h-4 text-pink-300" />

                    <span className="text-sm text-gray-400">

                      Energy Cost

                    </span>

                  </div>

                  <h4 className="text-lg font-semibold text-pink-300">

                    {task.energy}

                  </h4>

                </div>

                {/* EXECUTION */}
                <div className="bg-white/5 rounded-xl p-4">

                  <div className="flex items-center gap-2 mb-2">

                    <ArrowUpRight className="w-4 h-4 text-yellow-300" />

                    <span className="text-sm text-gray-400">

                      Execution Window

                    </span>

                  </div>

                  <h4 className="text-lg font-semibold text-yellow-300">

                    Optimized

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
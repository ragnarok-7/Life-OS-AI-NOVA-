"use client";

import {
  useMemo,
} from "react";

import {
  Brain,
  Clock3,
  Flame,
  Sparkles,
} from "lucide-react";

import {
  motion,
} from "framer-motion";

import {
  useLifeOS,
} from "@/context/LifeOSContext";

export default function AIDailyPlanner() {

  const {
    tasks,
  } = useLifeOS();

  // =====================
  // AI DAILY PLAN
  // =====================

  const dailyPlan =
    useMemo(() => {

      const pending =
        tasks.filter(
          (task: any) =>
            !task.completed
        );

      const morning: any[] = [];
      const afternoon: any[] = [];
      const evening: any[] = [];

      pending.forEach(
        (task: any) => {

          const text =
            (
              task.title ||
              ""
            ).toLowerCase();

          // HIGH FOCUS
          if (
            text.includes(
              "project"
            ) ||
            text.includes(
              "exam"
            ) ||
            text.includes(
              "assignment"
            ) ||
            text.includes(
              "interview"
            ) ||
            text.includes(
              "dsa"
            )
          ) {

            morning.push(task);

            return;
          }

          // LIGHT TASKS
          if (
            text.includes(
              "email"
            ) ||
            text.includes(
              "message"
            ) ||
            text.includes(
              "meeting"
            ) ||
            text.includes(
              "call"
            )
          ) {

            afternoon.push(task);

            return;
          }

          // DEFAULT
          evening.push(task);
        }
      );

      return {
        morning,
        afternoon,
        evening,
      };

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

            AI Daily Planner

          </h2>

          <p className="text-gray-400">

            Adaptive execution scheduling engine

          </p>

        </div>

      </div>

      {/* EMPTY */}
      {tasks.length === 0 && (

        <div className="bg-black/30 border border-white/10 rounded-2xl p-6">

          <p className="text-gray-300 leading-8">

            No tasks detected. Once tasks are added, NOVA will generate adaptive execution schedules and focus recommendations.

          </p>

        </div>

      )}

      {/* MORNING */}
      <div className="mb-6">

        <div className="flex items-center gap-2 mb-4">

          <Sparkles className="text-yellow-300 w-5 h-5" />

          <h3 className="text-xl font-semibold text-white">

            Morning Deep Focus

          </h3>

        </div>

        <div className="space-y-3">

          {dailyPlan.morning.map(
            (
              task: any,
              index: number
            ) => (

              <div
                key={index}
                className="bg-black/30 border border-white/10 rounded-2xl p-4"
              >

                <h4 className="text-lg font-semibold text-white mb-2">

                  {task.title}

                </h4>

                <p className="text-cyan-300 text-sm">

                  High cognitive load detected. Morning execution recommended.

                </p>

              </div>

            )
          )}

        </div>

      </div>

      {/* AFTERNOON */}
      <div className="mb-6">

        <div className="flex items-center gap-2 mb-4">

          <Clock3 className="text-cyan-300 w-5 h-5" />

          <h3 className="text-xl font-semibold text-white">

            Afternoon Execution

          </h3>

        </div>

        <div className="space-y-3">

          {dailyPlan.afternoon.map(
            (
              task: any,
              index: number
            ) => (

              <div
                key={index}
                className="bg-black/30 border border-white/10 rounded-2xl p-4"
              >

                <h4 className="text-lg font-semibold text-white mb-2">

                  {task.title}

                </h4>

                <p className="text-cyan-300 text-sm">

                  Lightweight execution task detected. Can be efficiently batched.

                </p>

              </div>

            )
          )}

        </div>

      </div>

      {/* EVENING */}
      <div>

        <div className="flex items-center gap-2 mb-4">

          <Flame className="text-pink-300 w-5 h-5" />

          <h3 className="text-xl font-semibold text-white">

            Evening Recovery Window

          </h3>

        </div>

        <div className="space-y-3">

          {dailyPlan.evening.map(
            (
              task: any,
              index: number
            ) => (

              <div
                key={index}
                className="bg-black/30 border border-white/10 rounded-2xl p-4"
              >

                <h4 className="text-lg font-semibold text-white mb-2">

                  {task.title}

                </h4>

                <p className="text-cyan-300 text-sm">

                  Flexible execution recommended during lower-energy hours.

                </p>

              </div>

            )
          )}

        </div>

      </div>

    </motion.div>
  );
}
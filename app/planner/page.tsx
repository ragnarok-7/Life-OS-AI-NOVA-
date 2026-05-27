"use client";

import Sidebar from "@/components/Sidebar";

import AIDailyPlanner from "@/components/AIDailyPlanner";

import AIDailyPlannerEngine from "@/components/AIDailyPlannerEngine";

import {
  useLifeOS,
} from "@/context/LifeOSContext";

import {
  CalendarDays,
  Clock3,
  Brain,
  Sparkles,
  CheckCircle2,
  Zap,
} from "lucide-react";

import {
  motion,
} from "framer-motion";

export default function PlannerPage() {

  const {
    tasks,
  } = useLifeOS();

  // =====================
  // TASK ANALYTICS
  // =====================

  const completedTasks =
    tasks.filter(
      (task: any) =>
        task.completed
    ).length;

  const pendingTasks =
    tasks.length -
    completedTasks;

  // =====================
  // AI STATUS
  // =====================

  const systemStatus =
    pendingTasks >= 6
      ? "Overloaded"
      : pendingTasks >= 3
      ? "Moderate"
      : "Balanced";

  // =====================
  // FOCUS LOAD
  // =====================

  const highFocusTasks =
    tasks.filter(
      (task: any) => {

        const text =
          (
            task.title ||
            ""
          ).toLowerCase();

        return (
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
            "dsa"
          ) ||
          text.includes(
            "interview"
          )
        );
      }
    ).length;

  return (
    <main className="flex min-h-screen bg-gradient-to-br from-black via-[#0f172a] to-black text-white overflow-hidden">

      {/* Sidebar */}
      <Sidebar />

      {/* Main */}
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

              <CalendarDays className="w-10 h-10 text-white" />

            </motion.div>

            <div>

              <h1 className="text-5xl font-bold">

                AI Planner

              </h1>

              <p className="text-gray-400 mt-2 text-lg">

                Adaptive execution and recovery optimization system

              </p>

            </div>

          </div>

        </motion.div>

        {/* Top Analytics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">

          {/* Pending */}
          <motion.div
            whileHover={{
              scale: 1.03,
            }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6"
          >

            <div className="flex items-center justify-between mb-5">

              <div>

                <p className="text-gray-400 mb-2">

                  Pending Tasks

                </p>

                <h2 className="text-5xl font-bold text-red-400">

                  {pendingTasks}

                </h2>

              </div>

              <Clock3 className="text-red-400 w-10 h-10" />

            </div>

            <p className="text-gray-500">

              AI-monitored execution load

            </p>

          </motion.div>

          {/* Completed */}
          <motion.div
            whileHover={{
              scale: 1.03,
            }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6"
          >

            <div className="flex items-center justify-between mb-5">

              <div>

                <p className="text-gray-400 mb-2">

                  Completed Tasks

                </p>

                <h2 className="text-5xl font-bold text-green-400">

                  {completedTasks}

                </h2>

              </div>

              <CheckCircle2 className="text-green-400 w-10 h-10" />

            </div>

            <p className="text-gray-500">

              Successful execution cycles

            </p>

          </motion.div>

          {/* Focus */}
          <motion.div
            whileHover={{
              scale: 1.03,
            }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6"
          >

            <div className="flex items-center justify-between mb-5">

              <div>

                <p className="text-gray-400 mb-2">

                  Deep Focus

                </p>

                <h2 className="text-5xl font-bold text-yellow-300">

                  {highFocusTasks}

                </h2>

              </div>

              <Zap className="text-yellow-300 w-10 h-10" />

            </div>

            <p className="text-gray-500">

              High cognitive tasks detected

            </p>

          </motion.div>

          {/* System */}
          <motion.div
            whileHover={{
              scale: 1.03,
            }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6"
          >

            <div className="flex items-center justify-between mb-5">

              <div>

                <p className="text-gray-400 mb-2">

                  AI Status

                </p>

                <h2 className="text-5xl font-bold text-cyan-400">

                  {systemStatus}

                </h2>

              </div>

              <Brain className="text-cyan-400 w-10 h-10" />

            </div>

            <p className="text-gray-500">

              Behavioral planning engine active

            </p>

          </motion.div>

        </div>

        {/* EXISTING AI PLANNER */}
        <div className="mb-10">

          <AIDailyPlanner />

        </div>

        {/* NEW AI DAILY ENGINE */}
        <div className="mb-10">

          <AIDailyPlannerEngine />

        </div>

        {/* Bottom Insight */}
        <motion.div
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="mt-10 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-3xl p-8"
        >

          <div className="flex items-start gap-5">

            <Sparkles className="text-cyan-400 w-10 h-10" />

            <div>

              <h2 className="text-3xl font-bold mb-4">

                NOVA Strategic Observation

              </h2>

              <p className="text-gray-300 text-lg leading-9">

                NOVA is now dynamically balancing workload intensity, recovery cycles, deep-focus execution windows, and cognitive sustainability to optimize long-term performance without triggering burnout accumulation.

              </p>

            </div>

          </div>

        </motion.div>

      </section>

    </main>
  );
}
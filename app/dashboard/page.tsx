"use client";

import Sidebar from "@/components/Sidebar";

import AIIntelligencePanel from "@/components/AIIntelligencePanel";

import {
  useLifeOS,
} from "@/context/LifeOSContext";

import {
  Brain,
  CheckCircle2,
  Wallet,
  Activity,
  Sparkles,
} from "lucide-react";

import {
  motion,
} from "framer-motion";

export default function DashboardPage() {

  const {
    tasks,
    expenses,
    memories,
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

              <Brain className="w-10 h-10 text-white" />

            </motion.div>

            <div>

              <h1 className="text-5xl font-bold">

                NOVA Command Center

              </h1>

              <p className="text-gray-400 mt-2 text-lg">

                Adaptive AI operating system dashboard

              </p>

            </div>

          </div>

        </motion.div>

        {/* Top Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

          {/* Tasks */}
          <motion.div
            whileHover={{
              scale: 1.03,
            }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6"
          >

            <div className="flex items-center justify-between mb-5">

              <div>

                <p className="text-gray-400 mb-2">

                  Total Tasks

                </p>

                <h2 className="text-5xl font-bold">

                  {tasks.length}

                </h2>

              </div>

              <CheckCircle2 className="text-cyan-400 w-10 h-10" />

            </div>

            <p className="text-gray-500">

              {completedTasks} completed • {pendingTasks} pending

            </p>

          </motion.div>

          {/* Productivity */}
          <motion.div
            whileHover={{
              scale: 1.03,
            }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6"
          >

            <div className="flex items-center justify-between mb-5">

              <div>

                <p className="text-gray-400 mb-2">

                  Productivity

                </p>

                <h2 className="text-5xl font-bold text-green-400">

                  {productivityScore}%

                </h2>

              </div>

              <Activity className="text-green-400 w-10 h-10" />

            </div>

            <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden">

              <div
                style={{
                  width: `${productivityScore}%`,
                }}
                className="h-full bg-gradient-to-r from-green-400 to-cyan-400 rounded-full"
              />

            </div>

          </motion.div>

          {/* Expenses */}
          <motion.div
            whileHover={{
              scale: 1.03,
            }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6"
          >

            <div className="flex items-center justify-between mb-5">

              <div>

                <p className="text-gray-400 mb-2">

                  Total Spending

                </p>

                <h2 className="text-5xl font-bold text-red-400">

                  ₹{totalExpenses}

                </h2>

              </div>

              <Wallet className="text-red-400 w-10 h-10" />

            </div>

            <p className="text-gray-500">

              AI monitored financial activity

            </p>

          </motion.div>

          {/* Memories */}
          <motion.div
            whileHover={{
              scale: 1.03,
            }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6"
          >

            <div className="flex items-center justify-between mb-5">

              <div>

                <p className="text-gray-400 mb-2">

                  AI Memories

                </p>

                <h2 className="text-5xl font-bold text-purple-400">

                  {memories.length}

                </h2>

              </div>

              <Sparkles className="text-purple-400 w-10 h-10" />

            </div>

            <p className="text-gray-500">

              Behavioral intelligence observations

            </p>

          </motion.div>

        </div>

        {/* AI Intelligence */}
        <AIIntelligencePanel />

      </section>

    </main>
  );
}
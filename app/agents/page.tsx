"use client";

import Sidebar from "@/components/Sidebar";

import {
  motion,
} from "framer-motion";

import {
  Brain,
  Sparkles,
  Activity,
  Moon,
  TimerReset,
  Wallet,
  UtensilsCrossed,
  CalendarClock,
  ShieldCheck,
} from "lucide-react";

export default function AgentsPage() {

  const agents = [

    {
      name: "NOVA Core",
      icon: Brain,
      status: "Online",
      color:
        "from-cyan-400 to-blue-500",
      description:
        "Master orchestration intelligence coordinating all cognitive systems.",
      activity:
        "Managing AI ecosystem synchronization.",
    },

    {
      name: "Focus AI",
      icon: TimerReset,
      status: "Active",
      color:
        "from-orange-400 to-red-500",
      description:
        "Specialized in deep work optimization and productivity execution.",
      activity:
        "Analyzing focus consistency and execution momentum.",
    },

    {
      name: "Recovery AI",
      icon: Moon,
      status: "Monitoring",
      color:
        "from-purple-400 to-pink-500",
      description:
        "Tracks recovery, fatigue, burnout probability, and sleep stability.",
      activity:
        "Evaluating recovery efficiency and fatigue accumulation.",
    },

    {
      name: "Nutrition AI",
      icon: UtensilsCrossed,
      status: "Optimizing",
      color:
        "from-green-400 to-emerald-500",
      description:
        "Optimizes meal timing, nutrition quality, recovery fueling, and budget nutrition.",
      activity:
        "Generating adaptive nutrition recommendations.",
    },

    {
      name: "Finance AI",
      icon: Wallet,
      status: "Analyzing",
      color:
        "from-yellow-400 to-orange-500",
      description:
        "Monitors expenses, savings stability, and spending behavior forecasting.",
      activity:
        "Predicting financial consistency and optimization opportunities.",
    },

    {
      name: "Scheduler AI",
      icon: CalendarClock,
      status: "Adaptive",
      color:
        "from-indigo-400 to-cyan-500",
      description:
        "Autonomously optimizes workload balancing and daily execution structure.",
      activity:
        "Adjusting schedule architecture based on behavioral analytics.",
    },

  ];

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

                Multi-Agent Intelligence

              </h1>

              <p className="text-gray-400 mt-2 text-lg">

                Distributed AI cognition and orchestration architecture

              </p>

            </div>

          </div>

        </motion.div>

        {/* OVERVIEW STATS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">

          {/* AGENTS */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

            <Brain className="w-8 h-8 text-cyan-300 mb-4" />

            <p className="text-gray-400 mb-2">

              AI Agents

            </p>

            <h2 className="text-5xl font-bold text-cyan-300">

              {agents.length}

            </h2>

          </div>

          {/* ACTIVE */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

            <Activity className="w-8 h-8 text-green-300 mb-4" />

            <p className="text-gray-400 mb-2">

              Active Systems

            </p>

            <h2 className="text-5xl font-bold text-green-300">

              100%

            </h2>

          </div>

          {/* ORCHESTRATION */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

            <Sparkles className="w-8 h-8 text-purple-300 mb-4" />

            <p className="text-gray-400 mb-2">

              Coordination

            </p>

            <h2 className="text-5xl font-bold text-purple-300">

              Stable

            </h2>

          </div>

          {/* SECURITY */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

            <ShieldCheck className="w-8 h-8 text-orange-300 mb-4" />

            <p className="text-gray-400 mb-2">

              AI Integrity

            </p>

            <h2 className="text-5xl font-bold text-orange-300">

              Secure

            </h2>

          </div>

        </div>

        {/* AGENT GRID */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

          {agents.map(
            (
              agent,
              index
            ) => {

              const Icon =
                agent.icon;

              return (

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
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-7"
                >

                  {/* TOP */}
                  <div className="flex items-start justify-between mb-6">

                    <div className="flex items-center gap-5">

                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${agent.color} flex items-center justify-center shadow-2xl`}>

                        <Icon className="w-8 h-8 text-white" />

                      </div>

                      <div>

                        <h2 className="text-3xl font-bold">

                          {agent.name}

                        </h2>

                        <p className="text-cyan-300 mt-1">

                          {agent.status}

                        </p>

                      </div>

                    </div>

                  </div>

                  {/* DESCRIPTION */}
                  <div className="mb-6">

                    <p className="text-gray-300 text-lg leading-8">

                      {agent.description}

                    </p>

                  </div>

                  {/* ACTIVITY */}
                  <div className="bg-black/30 border border-white/10 rounded-2xl p-5">

                    <p className="text-gray-400 text-sm mb-2">

                      CURRENT ACTIVITY

                    </p>

                    <p className="text-white text-lg">

                      {agent.activity}

                    </p>

                  </div>

                </motion.div>

              );
            }
          )}

        </div>

        {/* FINAL PANEL */}
        <div className="mt-10 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-3xl p-8">

          <div className="flex items-start gap-5">

            <Sparkles className="text-cyan-300 w-10 h-10" />

            <div>

              <h2 className="text-3xl font-bold mb-4">

                Distributed Intelligence Architecture

              </h2>

              <p className="text-gray-300 text-lg leading-9">

                NOVA now operates as a distributed multi-agent cognitive ecosystem where specialized intelligence systems collaboratively optimize productivity, recovery, nutrition, behavioral consistency, financial stability, execution momentum, and long-term human performance adaptation.

              </p>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}
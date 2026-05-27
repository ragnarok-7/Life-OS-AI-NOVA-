"use client";

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
  Activity,
  TrendingUp,
  MemoryStick,
  Clock3,
} from "lucide-react";

export default function TimelinePage() {

  const context =
    useLifeOS();

  const tasks =
    context?.tasks || [];

  const habits =
    context?.habits || [];

  const meals =
    context?.meals || [];

  const aiMemories =
    context?.aiMemories || [];

  const disciplineScore =
    context?.disciplineScore || 0;

  // =====================
  // TIMELINE EVENTS
  // =====================

  const timelineEvents = [

    {
      title:
        "Behavioral Momentum Stabilized",

      description:
        "Habit consistency improved execution stability and cognitive endurance.",

      icon:
        Activity,

      color:
        "from-green-400 to-emerald-500",

      time:
        "Recent",
    },

    {
      title:
        "Recovery Intelligence Adapted",

      description:
        "Nutrition and recovery consistency improved fatigue resistance patterns.",

      icon:
        Sparkles,

      color:
        "from-purple-400 to-pink-500",

      time:
        "Recent",
    },

    {
      title:
        "AI Personality Evolved",

      description:
        "NOVA adapted communication style and behavioral analysis systems.",

      icon:
        Brain,

      color:
        "from-cyan-400 to-blue-500",

      time:
        "Recent",
    },

    {
      title:
        "Execution Stability Increased",

      description:
        "Focus systems detected stronger deep work consistency and productivity momentum.",

      icon:
        TrendingUp,

      color:
        "from-orange-400 to-red-500",

      time:
        "Ongoing",
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

              <Clock3 className="w-10 h-10 text-white" />

            </div>

            <div>

              <h1 className="text-5xl font-bold">

                Timeline Intelligence

              </h1>

              <p className="text-gray-400 mt-2 text-lg">

                AI-powered behavioral evolution and cognitive history tracking

              </p>

            </div>

          </div>

        </motion.div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">

          {/* TASKS */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

            <TrendingUp className="w-8 h-8 text-cyan-300 mb-4" />

            <p className="text-gray-400 mb-2">

              Total Tasks

            </p>

            <h2 className="text-5xl font-bold text-cyan-300">

              {tasks.length}

            </h2>

          </div>

          {/* HABITS */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

            <Activity className="w-8 h-8 text-green-300 mb-4" />

            <p className="text-gray-400 mb-2">

              Active Habits

            </p>

            <h2 className="text-5xl font-bold text-green-300">

              {habits.length}

            </h2>

          </div>

          {/* MEMORIES */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

            <MemoryStick className="w-8 h-8 text-purple-300 mb-4" />

            <p className="text-gray-400 mb-2">

              AI Memories

            </p>

            <h2 className="text-5xl font-bold text-purple-300">

              {aiMemories.length}

            </h2>

          </div>

          {/* DISCIPLINE */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

            <Brain className="w-8 h-8 text-orange-300 mb-4" />

            <p className="text-gray-400 mb-2">

              Discipline State

            </p>

            <h2 className="text-5xl font-bold text-orange-300">

              {disciplineScore}%

            </h2>

          </div>

        </div>

        {/* TIMELINE */}
        <div className="space-y-8">

          {timelineEvents.map(
            (
              event,
              index
            ) => {

              const Icon =
                event.icon;

              return (

                <motion.div
                  key={index}
                  initial={{
                    opacity: 0,
                    x: -30,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    delay:
                      index * 0.08,
                  }}
                  className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 overflow-hidden"
                >

                  {/* LINE */}
                  <div className="absolute left-10 top-0 bottom-0 w-[2px] bg-gradient-to-b from-cyan-400/50 to-transparent" />

                  <div className="flex items-start gap-6 relative z-10">

                    {/* ICON */}
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${event.color} flex items-center justify-center shadow-2xl`}>

                      <Icon className="w-8 h-8 text-white" />

                    </div>

                    {/* CONTENT */}
                    <div className="flex-1">

                      <div className="flex items-center justify-between mb-3">

                        <h2 className="text-3xl font-bold">

                          {event.title}

                        </h2>

                        <p className="text-cyan-300 font-semibold">

                          {event.time}

                        </p>

                      </div>

                      <p className="text-gray-300 text-lg leading-9">

                        {event.description}

                      </p>

                    </div>

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

                Temporal Intelligence Layer

              </h2>

              <p className="text-gray-300 text-lg leading-9">

                NOVA continuously tracks behavioral evolution, recovery progression, execution momentum, cognitive stability, discipline trends, and adaptive growth patterns to construct a persistent AI-powered second brain across time.

              </p>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}
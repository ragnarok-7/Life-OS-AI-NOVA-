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
  ShieldAlert,
  Activity,
  Bot,
} from "lucide-react";

export default function AutomationPage() {

  const {
    automationFeed,
  } = useLifeOS();

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

              <Bot className="w-10 h-10 text-white" />

            </div>

            <div>

              <h1 className="text-5xl font-bold">

                AI Automation Center

              </h1>

              <p className="text-gray-400 mt-2 text-lg">

                Real-time AI orchestration and autonomous interventions

              </p>

            </div>

          </div>

        </motion.div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

            <Brain className="w-8 h-8 text-cyan-300 mb-4" />

            <p className="text-gray-400 mb-2">

              Active AI Systems

            </p>

            <h2 className="text-5xl font-bold text-cyan-300">

              6

            </h2>

          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

            <Activity className="w-8 h-8 text-green-300 mb-4" />

            <p className="text-gray-400 mb-2">

              Live Events

            </p>

            <h2 className="text-5xl font-bold text-green-300">

              {automationFeed.length}

            </h2>

          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

            <Sparkles className="w-8 h-8 text-purple-300 mb-4" />

            <p className="text-gray-400 mb-2">

              System State

            </p>

            <h2 className="text-5xl font-bold text-purple-300">

              Stable

            </h2>

          </div>

        </div>

        {/* LIVE FEED */}
        <div className="space-y-6">

          {automationFeed.map(
            (
              item: any,
              index: number
            ) => (

              <motion.div
                key={item.id}
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
                    index * 0.03,
                }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6"
              >

                <div className="flex items-start gap-5">

                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-cyan-400/20 to-blue-500/20 border border-cyan-500/20 flex items-center justify-center">

                    <ShieldAlert className="w-7 h-7 text-cyan-300" />

                  </div>

                  <div className="flex-1">

                    <div className="flex items-center justify-between mb-3">

                      <h2 className="text-2xl font-bold">

                        {item.type}

                      </h2>

                      <p className="text-gray-400">

                        {item.time}

                      </p>

                    </div>

                    <p className="text-gray-300 text-lg leading-8">

                      {item.message}

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
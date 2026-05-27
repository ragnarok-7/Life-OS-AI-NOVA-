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
  MemoryStick,
  Sparkles,
} from "lucide-react";

export default function MemoryPage() {

  // SAFE CONTEXT
  const context =
    useLifeOS();

  const memories =
    context?.memories || [];

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

                Memory Intelligence

              </h1>

              <p className="text-gray-400 mt-2 text-lg">

                Persistent AI memory and behavioral intelligence

              </p>

            </div>

          </div>

        </motion.div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

            <MemoryStick className="w-8 h-8 text-cyan-300 mb-4" />

            <p className="text-gray-400 mb-2">

              Stored Memories

            </p>

            <h2 className="text-5xl font-bold text-cyan-300">

              {memories.length}

            </h2>

          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

            <Sparkles className="w-8 h-8 text-purple-300 mb-4" />

            <p className="text-gray-400 mb-2">

              Memory State

            </p>

            <h2 className="text-5xl font-bold text-purple-300">

              Active

            </h2>

          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

            <Brain className="w-8 h-8 text-green-300 mb-4" />

            <p className="text-gray-400 mb-2">

              Cognitive Layer

            </p>

            <h2 className="text-5xl font-bold text-green-300">

              Stable

            </h2>

          </div>

        </div>

        {/* MEMORY FEED */}
        <div className="space-y-6">

          {memories.length === 0 ? (

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 text-center">

              <h2 className="text-3xl font-bold mb-4">

                No Memories Yet

              </h2>

              <p className="text-gray-400 text-lg">

                NOVA will begin storing behavioral and cognitive memories automatically.

              </p>

            </div>

          ) : (

            memories.map(
              (
                memory: any,
                index: number
              ) => (

                <motion.div
                  key={memory.id}
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
                      index * 0.05,
                  }}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6"
                >

                  <div className="flex items-start gap-5">

                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-cyan-400/20 to-blue-500/20 border border-cyan-500/20 flex items-center justify-center">

                      <MemoryStick className="w-7 h-7 text-cyan-300" />

                    </div>

                    <div>

                      <h2 className="text-2xl font-bold mb-3">

                        AI Memory

                      </h2>

                      <p className="text-gray-300 text-lg leading-8">

                        {memory.text || "Behavioral memory stored."}

                      </p>

                    </div>

                  </div>

                </motion.div>

              )
            )

          )}

        </div>

      </section>

    </main>
  );
}
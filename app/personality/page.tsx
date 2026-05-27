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
  Moon,
  ShieldCheck,
  MemoryStick,
} from "lucide-react";

export default function PersonalityPage() {

  const {
    personalityProfile,
    aiMemories,
    aiMood,
  } = useLifeOS();

  return (
    <main className="flex min-h-screen bg-gradient-to-br from-black via-[#0f172a] to-black text-white overflow-hidden">

      <Sidebar />

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

                NOVA Personality Core

              </h1>

              <p className="text-gray-400 mt-2 text-lg">

                Persistent adaptive intelligence and cognitive personalization

              </p>

            </div>

          </div>

        </motion.div>

        {/* PROFILE GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

            <Sparkles className="w-8 h-8 text-cyan-300 mb-4" />

            <p className="text-gray-400 mb-2">

              AI Personality

            </p>

            <h2 className="text-3xl font-bold text-cyan-300">

              {personalityProfile.aiPersonality}

            </h2>

          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

            <Activity className="w-8 h-8 text-green-300 mb-4" />

            <p className="text-gray-400 mb-2">

              Behavior Trend

            </p>

            <h2 className="text-3xl font-bold text-green-300">

              {personalityProfile.behaviorTrend}

            </h2>

          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

            <Moon className="w-8 h-8 text-purple-300 mb-4" />

            <p className="text-gray-400 mb-2">

              Emotional State

            </p>

            <h2 className="text-3xl font-bold text-purple-300">

              {aiMood}

            </h2>

          </div>

        </div>

        {/* PROFILE DETAILS */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 mb-10">

          <div className="flex items-center gap-4 mb-8">

            <ShieldCheck className="w-8 h-8 text-cyan-300" />

            <h2 className="text-3xl font-bold">

              Cognitive Profile

            </h2>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <ProfileCard
              title="Communication Style"
              value={
                personalityProfile.communicationStyle
              }
            />

            <ProfileCard
              title="Productivity Pattern"
              value={
                personalityProfile.productivityPattern
              }
            />

            <ProfileCard
              title="Recovery Pattern"
              value={
                personalityProfile.recoveryPattern
              }
            />

            <ProfileCard
              title="Focus Window"
              value={
                personalityProfile.preferredFocusWindow
              }
            />

            <ProfileCard
              title="Sleep Window"
              value={
                personalityProfile.preferredSleepWindow
              }
            />

            <ProfileCard
              title="Emotional Stability"
              value={
                personalityProfile.emotionalState
              }
            />

          </div>

        </div>

        {/* AI MEMORIES */}
        <div className="space-y-6">

          {aiMemories.map(
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
                    index * 0.04,
                }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6"
              >

                <div className="flex items-start gap-5">

                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-cyan-400/20 to-blue-500/20 border border-cyan-500/20 flex items-center justify-center">

                    <MemoryStick className="w-7 h-7 text-cyan-300" />

                  </div>

                  <div>

                    <h2 className="text-2xl font-bold mb-2">

                      {memory.type}

                    </h2>

                    <p className="text-gray-300 text-lg leading-8">

                      {memory.memory}

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

function ProfileCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {

  return (
    <div className="bg-black/30 border border-white/10 rounded-2xl p-5">

      <p className="text-gray-400 mb-2">

        {title}

      </p>

      <h2 className="text-xl font-bold">

        {value}

      </h2>

    </div>
  );
}
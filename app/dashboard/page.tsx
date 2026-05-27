"use client";

import {
  Brain,
} from "lucide-react";

import Sidebar from "@/components/Sidebar";

import NovaHUD from "@/components/NovaHUD";

import AIProductivityEngine from "@/components/AIProductivityEngine";

export default function DashboardPage() {

  return (
    <main className="flex min-h-screen bg-gradient-to-br from-black via-[#0f172a] to-black text-white overflow-hidden">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <section className="flex-1 p-10 overflow-y-auto">

        {/* HEADER */}
        <div className="mb-10">

          <div className="flex items-center gap-5">

            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center shadow-2xl shadow-cyan-500/30">

              <Brain className="w-10 h-10 text-white" />

            </div>

            <div>

              <h1 className="text-5xl font-bold">

                AI Dashboard

              </h1>

              <p className="text-gray-400 mt-2 text-lg">

                Adaptive intelligence and productivity overview system

              </p>

            </div>

          </div>

        </div>

        {/* TOP STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

          {/* STATUS */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

            <p className="text-gray-400 mb-2">

              Intelligence Layer

            </p>

            <h2 className="text-5xl font-bold text-cyan-300">

              Active

            </h2>

            <p className="text-sm text-gray-500 mt-3">

              AI systems fully operational

            </p>

          </div>

          {/* EMOTIONAL */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

            <p className="text-gray-400 mb-2">

              Emotional Engine

            </p>

            <h2 className="text-5xl font-bold text-pink-300">

              Adaptive

            </h2>

            <p className="text-sm text-gray-500 mt-3">

              Conversational intelligence active

            </p>

          </div>

          {/* MEMORY */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

            <p className="text-gray-400 mb-2">

              Long-Term Memory

            </p>

            <h2 className="text-5xl font-bold text-green-300">

              Learning

            </h2>

            <p className="text-sm text-gray-500 mt-3">

              Persistent memory engine running

            </p>

          </div>

        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

          {/* PRODUCTIVITY */}
          <AIProductivityEngine />

          {/* NOVA CORE */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

            <div className="flex items-center gap-4 mb-8">

              <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">

                <Brain className="text-white w-7 h-7" />

              </div>

              <div>

                <h2 className="text-3xl font-bold">

                  NOVA Core

                </h2>

                <p className="text-gray-400">

                  Adaptive behavioral intelligence system

                </p>

              </div>

            </div>

            <div className="space-y-5">

              {/* NEURAL */}
              <div className="bg-black/30 border border-white/10 rounded-2xl p-5">

                <p className="text-gray-400 mb-2">

                  Neural Intelligence

                </p>

                <h3 className="text-4xl font-bold text-cyan-300">

                  Online

                </h3>

              </div>

              {/* CONVERSATIONAL */}
              <div className="bg-black/30 border border-white/10 rounded-2xl p-5">

                <p className="text-gray-400 mb-2">

                  Conversational Awareness

                </p>

                <h3 className="text-4xl font-bold text-pink-300">

                  Active

                </h3>

              </div>

              {/* LEARNING */}
              <div className="bg-black/30 border border-white/10 rounded-2xl p-5">

                <p className="text-gray-400 mb-2">

                  Behavioral Learning

                </p>

                <h3 className="text-4xl font-bold text-green-300">

                  Evolving

                </h3>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* HUD */}
      <NovaHUD />

    </main>
  );
}
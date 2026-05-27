"use client";

import {
  useState,
  useMemo,
} from "react";

import Sidebar from "@/components/Sidebar";

import {
  motion,
} from "framer-motion";

import {
  Moon,
  Brain,
  Activity,
  AlertTriangle,
  Sparkles,
  BedDouble,
  Clock3,
} from "lucide-react";

export default function RecoveryPage() {

  // =====================
  // STATES
  // =====================

  const [
    sleepHours,
    setSleepHours,
  ] = useState(7);

  const [
    sleepTime,
    setSleepTime,
  ] = useState("00:00");

  const [
    wakeTime,
    setWakeTime,
  ] = useState("07:00");

  // =====================
  // RECOVERY SCORE
  // =====================

  const recoveryScore =
    useMemo(() => {

      let score = 100;

      if (
        sleepHours < 7
      ) {

        score -=
          (7 - sleepHours) *
          12;
      }

      const sleepHour =
        Number(
          sleepTime.split(
            ":"
          )[0]
        );

      if (
        sleepHour >= 1
      ) {

        score -= 15;
      }

      return Math.max(
        Math.min(
          score,
          100
        ),
        10
      );

    }, [
      sleepHours,
      sleepTime,
    ]);

  // =====================
  // FATIGUE LEVEL
  // =====================

  const fatigueLevel =
    useMemo(() => {

      if (
        recoveryScore >= 80
      ) {

        return "Low";
      }

      if (
        recoveryScore >= 50
      ) {

        return "Moderate";
      }

      return "High";

    }, [
      recoveryScore,
    ]);

  // =====================
  // AI INSIGHTS
  // =====================

  const aiInsight =
    useMemo(() => {

      if (
        recoveryScore >= 80
      ) {

        return `
Recovery systems appear highly stable.

Sleep consistency and recovery duration are supporting cognitive performance, productivity stability, and behavioral endurance.
        `;
      }

      if (
        recoveryScore >= 50
      ) {

        return `
Recovery quality appears moderate.

NOVA recommends:
• earlier sleep timing
• hydration optimization
• reduced late-night stimulation
• stable sleep cycles
        `;
      }

      return `
Recovery systems appear strained.

Potential risks:
• reduced focus stability
• lower gym recovery
• increased burnout probability
• emotional fatigue

NOVA recommends prioritizing sleep recovery immediately.
      `;

    }, [
      recoveryScore,
    ]);

  // =====================
  // BURNOUT RISK
  // =====================

  const burnoutRisk =
    useMemo(() => {

      if (
        recoveryScore >= 80
      ) {

        return "Low";
      }

      if (
        recoveryScore >= 50
      ) {

        return "Moderate";
      }

      return "High";

    }, [
      recoveryScore,
    ]);

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

            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-indigo-400 to-purple-500 flex items-center justify-center shadow-2xl shadow-indigo-500/30">

              <Moon className="w-10 h-10 text-white" />

            </div>

            <div>

              <h1 className="text-5xl font-bold">

                Recovery Intelligence

              </h1>

              <p className="text-gray-400 mt-2 text-lg">

                AI-powered sleep and recovery optimization

              </p>

            </div>

          </div>

        </motion.div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">

          {/* SCORE */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

            <Brain className="text-cyan-300 w-8 h-8 mb-4" />

            <p className="text-gray-400 mb-2">

              Recovery Score

            </p>

            <h2 className="text-5xl font-bold text-cyan-300">

              {recoveryScore}%

            </h2>

          </div>

          {/* FATIGUE */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

            <Activity className="text-orange-300 w-8 h-8 mb-4" />

            <p className="text-gray-400 mb-2">

              Fatigue Level

            </p>

            <h2 className="text-5xl font-bold text-orange-300">

              {fatigueLevel}

            </h2>

          </div>

          {/* BURNOUT */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

            <AlertTriangle className="text-red-300 w-8 h-8 mb-4" />

            <p className="text-gray-400 mb-2">

              Burnout Risk

            </p>

            <h2 className="text-5xl font-bold text-red-300">

              {burnoutRisk}

            </h2>

          </div>

          {/* SLEEP */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

            <BedDouble className="text-purple-300 w-8 h-8 mb-4" />

            <p className="text-gray-400 mb-2">

              Sleep Duration

            </p>

            <h2 className="text-5xl font-bold text-purple-300">

              {sleepHours}h

            </h2>

          </div>

        </div>

        {/* INPUTS */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 mb-10">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* HOURS */}
            <div>

              <p className="text-gray-400 mb-3">

                Sleep Hours

              </p>

              <input
                type="number"
                value={sleepHours}
                onChange={(e) =>
                  setSleepHours(
                    Number(
                      e.target.value
                    )
                  )
                }
                className="w-full bg-black/30 border border-white/10 rounded-2xl px-5 py-4 outline-none"
              />

            </div>

            {/* SLEEP TIME */}
            <div>

              <p className="text-gray-400 mb-3">

                Sleep Time

              </p>

              <input
                type="time"
                value={sleepTime}
                onChange={(e) =>
                  setSleepTime(
                    e.target.value
                  )
                }
                className="w-full bg-black/30 border border-white/10 rounded-2xl px-5 py-4 outline-none"
              />

            </div>

            {/* WAKE TIME */}
            <div>

              <p className="text-gray-400 mb-3">

                Wake Time

              </p>

              <input
                type="time"
                value={wakeTime}
                onChange={(e) =>
                  setWakeTime(
                    e.target.value
                  )
                }
                className="w-full bg-black/30 border border-white/10 rounded-2xl px-5 py-4 outline-none"
              />

            </div>

          </div>

        </div>

        {/* AI INSIGHTS */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

          {/* RECOVERY ANALYSIS */}
          <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-3xl p-8">

            <div className="flex items-start gap-5">

              <Brain className="text-indigo-300 w-10 h-10" />

              <div>

                <h2 className="text-3xl font-bold mb-4">

                  AI Recovery Analysis

                </h2>

                <p className="text-gray-300 leading-8 text-lg whitespace-pre-line">

                  {aiInsight}

                </p>

              </div>

            </div>

          </div>

          {/* RECOVERY INTELLIGENCE */}
          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-3xl p-8">

            <div className="flex items-start gap-5">

              <Sparkles className="text-cyan-300 w-10 h-10" />

              <div>

                <h2 className="text-3xl font-bold mb-4">

                  Biological Intelligence

                </h2>

                <p className="text-gray-300 leading-8 text-lg">

                  NOVA continuously analyzes sleep stability, recovery timing, fatigue accumulation, burnout probability, and recovery consistency to optimize long-term cognitive and physical performance.

                </p>

              </div>

            </div>

          </div>

        </div>

        {/* FINAL PANEL */}
        <div className="mt-10 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-3xl p-8">

          <div className="flex items-start gap-5">

            <Clock3 className="text-pink-300 w-10 h-10" />

            <div>

              <h2 className="text-3xl font-bold mb-4">

                Recovery Optimization

              </h2>

              <p className="text-gray-300 text-lg leading-9">

                Sleep timing, recovery duration, circadian consistency, hydration, and behavioral discipline collectively influence cognitive endurance, emotional regulation, productivity stability, and physical recovery efficiency.

              </p>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}
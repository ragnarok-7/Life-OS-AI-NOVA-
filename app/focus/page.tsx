"use client";

import {
  useState,
  useEffect,
  useMemo,
} from "react";

import Sidebar from "@/components/Sidebar";

import {
  motion,
} from "framer-motion";

import {
  Brain,
  TimerReset,
  Play,
  Pause,
  Sparkles,
  Flame,
  Activity,
  Target,
} from "lucide-react";

export default function FocusPage() {

  // =====================
  // TIMER STATES
  // =====================

  const [
    minutes,
    setMinutes,
  ] = useState(25);

  const [
    seconds,
    setSeconds,
  ] = useState(0);

  const [
    running,
    setRunning,
  ] = useState(false);

  const [
    completedSessions,
    setCompletedSessions,
  ] = useState(0);

  const [
    focusStreak,
    setFocusStreak,
  ] = useState(0);

  const [
    totalFocusMinutes,
    setTotalFocusMinutes,
  ] = useState(0);

  // =====================
  // TIMER ENGINE
  // =====================

  useEffect(() => {

    let timer: any;

    if (
      running
    ) {

      timer =
        setInterval(() => {

          if (
            seconds > 0
          ) {

            setSeconds(
              seconds - 1
            );

          } else {

            if (
              minutes === 0
            ) {

              clearInterval(
                timer
              );

              setRunning(
                false
              );

              setCompletedSessions(
                (prev) =>
                  prev + 1
              );

              setFocusStreak(
                (prev) =>
                  prev + 1
              );

              setTotalFocusMinutes(
                (prev) =>
                  prev + 25
              );

              setMinutes(
                25
              );

              setSeconds(
                0
              );

            } else {

              setMinutes(
                minutes - 1
              );

              setSeconds(
                59
              );
            }
          }

        }, 1000);
    }

    return () =>
      clearInterval(
        timer
      );

  }, [
    running,
    minutes,
    seconds,
  ]);

  // =====================
  // PRODUCTIVITY SCORE
  // =====================

  const productivityScore =
    useMemo(() => {

      let score = 0;

      score +=
        completedSessions *
        15;

      score +=
        focusStreak * 10;

      score +=
        Math.floor(
          totalFocusMinutes /
            10
        );

      return Math.min(
        score,
        100
      );

    }, [
      completedSessions,
      focusStreak,
      totalFocusMinutes,
    ]);

  // =====================
  // AI INSIGHTS
  // =====================

  const aiInsight =
    useMemo(() => {

      if (
        productivityScore >= 80
      ) {

        return `
Focus stability is extremely strong.

Deep work consistency and execution momentum appear highly optimized.
        `;
      }

      if (
        productivityScore >= 50
      ) {

        return `
Focus performance is moderate.

NOVA recommends minimizing distractions and increasing uninterrupted work sessions.
        `;
      }

      return `
Execution consistency appears low.

Shorter deep work sessions with consistent repetition may improve cognitive endurance.
      `;

    }, [
      productivityScore,
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

            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center shadow-2xl shadow-cyan-500/30">

              <Brain className="w-10 h-10 text-white" />

            </div>

            <div>

              <h1 className="text-5xl font-bold">

                Focus Intelligence

              </h1>

              <p className="text-gray-400 mt-2 text-lg">

                AI-powered deep work and execution optimization

              </p>

            </div>

          </div>

        </motion.div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">

          {/* SCORE */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

            <Target className="text-cyan-300 w-8 h-8 mb-4" />

            <p className="text-gray-400 mb-2">

              Productivity Score

            </p>

            <h2 className="text-5xl font-bold text-cyan-300">

              {productivityScore}%

            </h2>

          </div>

          {/* SESSIONS */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

            <Activity className="text-green-300 w-8 h-8 mb-4" />

            <p className="text-gray-400 mb-2">

              Sessions

            </p>

            <h2 className="text-5xl font-bold text-green-300">

              {completedSessions}

            </h2>

          </div>

          {/* STREAK */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

            <Flame className="text-orange-300 w-8 h-8 mb-4" />

            <p className="text-gray-400 mb-2">

              Focus Streak

            </p>

            <h2 className="text-5xl font-bold text-orange-300">

              {focusStreak}

            </h2>

          </div>

          {/* TOTAL */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

            <TimerReset className="text-purple-300 w-8 h-8 mb-4" />

            <p className="text-gray-400 mb-2">

              Focus Minutes

            </p>

            <h2 className="text-5xl font-bold text-purple-300">

              {totalFocusMinutes}

            </h2>

          </div>

        </div>

        {/* TIMER */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 mb-10 flex flex-col items-center justify-center">

          <motion.div
            animate={{
              scale:
                running
                  ? [1, 1.03, 1]
                  : 1,
            }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
            }}
            className="w-72 h-72 rounded-full bg-gradient-to-br from-cyan-400/20 to-blue-500/20 border border-cyan-500/20 flex items-center justify-center shadow-2xl shadow-cyan-500/20 mb-8"
          >

            <h1 className="text-7xl font-bold text-cyan-300">

              {String(
                minutes
              ).padStart(
                2,
                "0"
              )}
              :
              {String(
                seconds
              ).padStart(
                2,
                "0"
              )}

            </h1>

          </motion.div>

          <div className="flex gap-5">

            <button
              onClick={() =>
                setRunning(
                  !running
                )
              }
              className="bg-gradient-to-r from-cyan-400 to-blue-500 px-8 py-4 rounded-2xl font-bold flex items-center gap-3"
            >

              {running ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5" />
              )}

              {running
                ? "Pause"
                : "Start"}

            </button>

            <button
              onClick={() => {

                setRunning(
                  false
                );

                setMinutes(
                  25
                );

                setSeconds(
                  0
                );

              }}
              className="bg-white/5 border border-white/10 px-8 py-4 rounded-2xl font-bold flex items-center gap-3"
            >

              <TimerReset className="w-5 h-5" />

              Reset

            </button>

          </div>

        </div>

        {/* AI INSIGHTS */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

          {/* EXECUTION */}
          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-3xl p-8">

            <div className="flex items-start gap-5">

              <Brain className="text-cyan-300 w-10 h-10" />

              <div>

                <h2 className="text-3xl font-bold mb-4">

                  AI Execution Analysis

                </h2>

                <p className="text-gray-300 leading-8 text-lg whitespace-pre-line">

                  {aiInsight}

                </p>

              </div>

            </div>

          </div>

          {/* MOMENTUM */}
          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-3xl p-8">

            <div className="flex items-start gap-5">

              <Sparkles className="text-purple-300 w-10 h-10" />

              <div>

                <h2 className="text-3xl font-bold mb-4">

                  Deep Work Intelligence

                </h2>

                <p className="text-gray-300 leading-8 text-lg">

                  NOVA continuously analyzes deep work consistency, execution stability, productivity endurance, distraction resistance, and cognitive momentum to optimize long-term performance.

                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}
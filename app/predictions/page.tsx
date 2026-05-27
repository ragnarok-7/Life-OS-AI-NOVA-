"use client";

import {
  useMemo,
} from "react";

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
  AlertTriangle,
  Activity,
  TrendingUp,
  ShieldAlert,
  Flame,
} from "lucide-react";

export default function PredictionsPage() {

  const {
    disciplineScore,
    meals,
    habits,
    tasks,
  } = useLifeOS();

  // =====================
  // BURNOUT RISK
  // =====================

  const burnoutRisk =
    useMemo(() => {

      let risk = 0;

      if (
        disciplineScore <
        50
      ) {

        risk += 35;
      }

      if (
        habits.length <
        2
      ) {

        risk += 20;
      }

      if (
        meals.length <
        2
      ) {

        risk += 20;
      }

      if (
        tasks.length >
        8
      ) {

        risk += 25;
      }

      return Math.min(
        risk,
        100
      );

    }, [
      disciplineScore,
      habits,
      meals,
      tasks,
    ]);

  // =====================
  // EXECUTION STABILITY
  // =====================

  const executionStability =
    useMemo(() => {

      return Math.max(
        100 -
          burnoutRisk,
        5
      );

    }, [
      burnoutRisk,
    ]);

  // =====================
  // PRODUCTIVITY FORECAST
  // =====================

  const productivityForecast =
    useMemo(() => {

      if (
        executionStability >=
        80
      ) {

        return `
Execution momentum appears highly stable.

NOVA predicts:
• strong deep work capability
• high productivity consistency
• improved behavioral endurance
        `;
      }

      if (
        executionStability >=
        50
      ) {

        return `
Execution stability appears moderate.

Potential risks:
• cognitive fatigue
• inconsistent focus cycles
• reduced recovery efficiency
        `;
      }

      return `
Execution systems appear unstable.

NOVA predicts elevated probability of:
• productivity decline
• behavioral inconsistency
• cognitive fatigue
• burnout accumulation
        `;
      }

    , [executionStability]);

  // =====================
  // AI FORECAST
  // =====================

  const aiForecast =
    useMemo(() => {

      const forecasts = [];

      if (
        burnoutRisk >= 70
      ) {

        forecasts.push(
          "Burnout probability appears elevated based on current recovery and behavioral patterns."
        );
      }

      if (
        meals.length < 2
      ) {

        forecasts.push(
          "Low nutritional consistency may negatively impact future focus performance."
        );
      }

      if (
        disciplineScore >=
        80
      ) {

        forecasts.push(
          "Behavioral momentum is compounding positively. Long-term discipline trajectory appears strong."
        );
      }

      if (
        tasks.length > 8
      ) {

        forecasts.push(
          "Current workload density may reduce cognitive efficiency in upcoming execution cycles."
        );
      }

      if (
        habits.length >= 3
      ) {

        forecasts.push(
          "Habit consistency is strengthening long-term behavioral stability."
        );
      }

      if (
        forecasts.length === 0
      ) {

        forecasts.push(
          "Behavioral and cognitive systems appear relatively balanced at this time."
        );
      }

      return forecasts;

    }, [
      burnoutRisk,
      meals,
      disciplineScore,
      tasks,
      habits,
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

            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center shadow-2xl shadow-pink-500/30">

              <Brain className="w-10 h-10 text-white" />

            </div>

            <div>

              <h1 className="text-5xl font-bold">

                Predictive Intelligence

              </h1>

              <p className="text-gray-400 mt-2 text-lg">

                AI-powered behavioral and cognitive forecasting

              </p>

            </div>

          </div>

        </motion.div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">

          {/* BURNOUT */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

            <AlertTriangle className="w-8 h-8 text-red-300 mb-4" />

            <p className="text-gray-400 mb-2">

              Burnout Risk

            </p>

            <h2 className="text-5xl font-bold text-red-300">

              {burnoutRisk}%

            </h2>

          </div>

          {/* EXECUTION */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

            <Activity className="w-8 h-8 text-cyan-300 mb-4" />

            <p className="text-gray-400 mb-2">

              Execution Stability

            </p>

            <h2 className="text-5xl font-bold text-cyan-300">

              {executionStability}%

            </h2>

          </div>

          {/* DISCIPLINE */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

            <TrendingUp className="w-8 h-8 text-green-300 mb-4" />

            <p className="text-gray-400 mb-2">

              Discipline Forecast

            </p>

            <h2 className="text-5xl font-bold text-green-300">

              {disciplineScore}%

            </h2>

          </div>

          {/* MOMENTUM */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

            <Flame className="w-8 h-8 text-orange-300 mb-4" />

            <p className="text-gray-400 mb-2">

              Momentum State

            </p>

            <h2 className="text-5xl font-bold text-orange-300">

              {
                executionStability >= 70
                  ? "Strong"
                  : executionStability >= 40
                  ? "Moderate"
                  : "Weak"
              }

            </h2>

          </div>

        </div>

        {/* AI FORECAST */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-10">

          {/* PRODUCTIVITY */}
          <div className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/20 rounded-3xl p-8">

            <div className="flex items-start gap-5">

              <Brain className="text-pink-300 w-10 h-10" />

              <div>

                <h2 className="text-3xl font-bold mb-4">

                  Predictive Analysis

                </h2>

                <p className="text-gray-300 leading-8 text-lg whitespace-pre-line">

                  {productivityForecast}

                </p>

              </div>

            </div>

          </div>

          {/* AI SYSTEM */}
          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-3xl p-8">

            <div className="flex items-start gap-5">

              <Sparkles className="text-cyan-300 w-10 h-10" />

              <div>

                <h2 className="text-3xl font-bold mb-4">

                  Cognitive Forecasting

                </h2>

                <p className="text-gray-300 leading-8 text-lg">

                  NOVA continuously forecasts cognitive strain, behavioral instability, recovery degradation, execution inconsistency, and productivity decline to optimize long-term human performance.

                </p>

              </div>

            </div>

          </div>

        </div>

        {/* FORECAST TIMELINE */}
        <div className="space-y-6">

          {aiForecast.map(
            (
              forecast,
              index
            ) => (

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
                    index * 0.1,
                }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6"
              >

                <div className="flex items-start gap-5">

                  <div className="w-14 h-14 rounded-2xl bg-black/30 border border-white/10 flex items-center justify-center">

                    <ShieldAlert className="w-7 h-7 text-yellow-300" />

                  </div>

                  <div>

                    <h2 className="text-2xl font-bold mb-3">

                      AI Forecast

                    </h2>

                    <p className="text-gray-300 text-lg leading-8">

                      {forecast}

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
"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  motion,
} from "framer-motion";

import {
  Brain,
  TrendingUp,
  AlertTriangle,
  Sparkles,
} from "lucide-react";

import {
  useLifeOS,
} from "@/context/LifeOSContext";

export default function AIProductivityEngine() {

  const {
    tasks,
  } = useLifeOS();

  const [
    insight,
    setInsight,
  ] = useState("");

  // =====================
  // ANALYTICS
  // =====================

  const analytics =
    useMemo(() => {

      const total =
        tasks.length;

      const completed =
        tasks.filter(
          (
            task: any
          ) =>
            task.completed
        ).length;

      const pending =
        total -
        completed;

      const completionRate =
        total > 0
          ? Math.round(
              (
                completed /
                total
              ) * 100
            )
          : 0;

      return {
        total,
        completed,
        pending,
        completionRate,
      };

    }, [tasks]);

  // =====================
  // AI INSIGHTS
  // =====================

  useEffect(() => {

    const {
      total,
      pending,
      completionRate,
    } = analytics;

    // No tasks
    if (total === 0) {

      setInsight(
        "You currently have no active tasks. Either you're extremely organized... or avoiding reality."
      );

      return;
    }

    // Burnout
    if (
      pending >= 10
    ) {

      setInsight(
        "Your workload is starting to look mentally unsustainable. Consider reducing cognitive overload."
      );

      return;
    }

    // High performer
    if (
      completionRate >= 80
    ) {

      setInsight(
        "Your task completion rate has been extremely efficient lately. Momentum is clearly on your side."
      );

      return;
    }

    // Falling behind
    if (
      completionRate <= 30
    ) {

      setInsight(
        "You’ve been adding more tasks than completing recently. Your system may be shifting toward reactive behavior."
      );

      return;
    }

    // Balanced
    setInsight(
      "Your productivity pattern currently looks relatively balanced. Sustainable consistency matters more than intensity."
    );

  }, [analytics]);

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6"
    >

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">

        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">

          <Brain className="text-white w-6 h-6" />

        </div>

        <div>

          <h2 className="text-2xl font-bold text-white">

            AI Productivity Intelligence

          </h2>

          <p className="text-gray-400">

            Behavioral productivity analysis engine

          </p>

        </div>

      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-6">

        {/* Total */}
        <div className="bg-black/30 border border-white/10 rounded-2xl p-5">

          <div className="flex items-center gap-2 mb-3">

            <Sparkles className="text-cyan-400 w-5 h-5" />

            <span className="text-gray-300">

              Total Tasks

            </span>

          </div>

          <h3 className="text-3xl font-bold text-white">

            {analytics.total}

          </h3>

        </div>

        {/* Completed */}
        <div className="bg-black/30 border border-white/10 rounded-2xl p-5">

          <div className="flex items-center gap-2 mb-3">

            <TrendingUp className="text-green-400 w-5 h-5" />

            <span className="text-gray-300">

              Completion Rate

            </span>

          </div>

          <h3 className="text-3xl font-bold text-white">

            {analytics.completionRate}%

          </h3>

        </div>

      </div>

      {/* Insight */}
      <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-2xl p-5">

        <div className="flex items-center gap-3 mb-3">

          <AlertTriangle className="text-cyan-300 w-5 h-5" />

          <h3 className="text-cyan-300 font-semibold">

            NOVA Insight

          </h3>

        </div>

        <p className="text-gray-200 leading-8">

          {insight}

        </p>

      </div>

    </motion.div>
  );
}
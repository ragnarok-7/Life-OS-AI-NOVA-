"use client";

import {
  useMemo,
} from "react";

import {
  Brain,
  AlertTriangle,
  Clock3,
  Flame,
} from "lucide-react";

import {
  motion,
} from "framer-motion";

import {
  useLifeOS,
} from "@/context/LifeOSContext";

export default function AIProcrastinationEngine() {

  const {
    tasks,
  } = useLifeOS();

  // =====================
  // ANALYSIS
  // =====================

  const analysis =
    useMemo(() => {

      const pending =
        tasks.filter(
          (task: any) =>
            !task.completed
        );

      const highFocus =
        pending.filter(
          (task: any) => {

            const text =
              (
                task.title ||
                ""
              ).toLowerCase();

            return (
              text.includes(
                "project"
              ) ||
              text.includes(
                "exam"
              ) ||
              text.includes(
                "assignment"
              ) ||
              text.includes(
                "interview"
              ) ||
              text.includes(
                "dsa"
              )
            );
          }
        );

      let insight =
        "Behavioral patterns currently appear stable.";

      let severity =
        "Low";

      if (
        highFocus.length >= 3
      ) {

        insight =
          "You currently have multiple cognitively demanding tasks pending simultaneously. Avoidance behavior may be developing.";

        severity =
          "High";
      }

      else if (
        pending.length >= 6
      ) {

        insight =
          "Your pending task count has been increasing. Execution friction appears to be building.";

        severity =
          "Moderate";
      }

      else if (
        pending.length >= 10
      ) {

        insight =
          "Severe task accumulation detected. Burnout risk is increasing rapidly.";

        severity =
          "Critical";
      }

      return {
        pending,
        highFocus,
        insight,
        severity,
      };

    }, [tasks]);

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

      {/* HEADER */}
      <div className="flex items-center gap-3 mb-6">

        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-400 to-red-500 flex items-center justify-center">

          <Brain className="text-white w-6 h-6" />

        </div>

        <div>

          <h2 className="text-2xl font-bold text-white">

            Behavioral Resistance Engine

          </h2>

          <p className="text-gray-400">

            AI procrastination and overload analysis

          </p>

        </div>

      </div>

      {/* METRICS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

        {/* Pending */}
        <div className="bg-black/30 border border-white/10 rounded-2xl p-5">

          <div className="flex items-center gap-2 mb-3">

            <Clock3 className="w-5 h-5 text-cyan-300" />

            <span className="text-gray-400">

              Pending Tasks

            </span>

          </div>

          <h3 className="text-4xl font-bold text-white">

            {analysis.pending.length}

          </h3>

        </div>

        {/* High Focus */}
        <div className="bg-black/30 border border-white/10 rounded-2xl p-5">

          <div className="flex items-center gap-2 mb-3">

            <Flame className="w-5 h-5 text-pink-300" />

            <span className="text-gray-400">

              High Focus Tasks

            </span>

          </div>

          <h3 className="text-4xl font-bold text-pink-300">

            {analysis.highFocus.length}

          </h3>

        </div>

        {/* Severity */}
        <div className="bg-black/30 border border-white/10 rounded-2xl p-5">

          <div className="flex items-center gap-2 mb-3">

            <AlertTriangle className="w-5 h-5 text-yellow-300" />

            <span className="text-gray-400">

              Resistance Level

            </span>

          </div>

          <h3
            className={`text-4xl font-bold ${
              analysis.severity ===
              "Critical"
                ? "text-red-400"
                : analysis.severity ===
                  "High"
                ? "text-pink-300"
                : analysis.severity ===
                  "Moderate"
                ? "text-yellow-300"
                : "text-green-300"
            }`}
          >

            {analysis.severity}

          </h3>

        </div>

      </div>

      {/* INSIGHT */}
      <div className="bg-gradient-to-r from-pink-500/10 to-red-500/10 border border-pink-500/20 rounded-2xl p-5">

        <div className="flex items-center gap-2 mb-3">

          <AlertTriangle className="w-5 h-5 text-pink-300" />

          <h3 className="text-pink-300 font-semibold">

            NOVA Behavioral Insight

          </h3>

        </div>

        <p className="text-gray-200 leading-8">

          {analysis.insight}

        </p>

      </div>

    </motion.div>
  );
}
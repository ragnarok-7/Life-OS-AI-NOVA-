"use client";

import {
  useEffect,
  useState,
  useMemo,
} from "react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  Brain,
  Bell,
  Sparkles,
  Activity,
} from "lucide-react";

import {
  useLifeOS,
} from "@/context/LifeOSContext";

export default function NovaHUD() {

  const [
    open,
    setOpen,
  ] = useState(false);

  const [
    currentInsight,
    setCurrentInsight,
  ] = useState(0);

  const {
    aiSpeaking,
    aiListening,
    aiMood,
    tasks,
    meals,
    habits,
    disciplineScore,
  } = useLifeOS();

  // =====================
  // AUTO OPEN
  // =====================

  useEffect(() => {

    if (
      aiSpeaking ||
      aiListening
    ) {

      setOpen(true);

    } else {

      const timeout =
        setTimeout(() => {

          setOpen(false);

        }, 3500);

      return () =>
        clearTimeout(
          timeout
        );
    }

  }, [
    aiSpeaking,
    aiListening,
  ]);

  // =====================
  // SMART AI INSIGHTS
  // =====================

  const insights =
    useMemo(() => {

      const generated = [];

      // TASKS
      if (
        tasks.length === 0
      ) {

        generated.push(
          "You currently have no active tasks. Consider planning your next execution cycle."
        );

      } else {

        generated.push(
          `You currently have ${tasks.length} active tasks being monitored by NOVA.`
        );
      }

      // MEALS
      if (
        meals.length === 0
      ) {

        generated.push(
          "No meals logged today. Nutrition consistency impacts recovery and cognitive performance."
        );

      } else {

        generated.push(
          `${meals.length} meals logged today. Recovery nutrition appears active.`
        );
      }

      // HABITS
      if (
        habits.length === 0
      ) {

        generated.push(
          "No behavioral habits detected. Building small routines improves long-term stability."
        );

      } else {

        generated.push(
          `${habits.length} active habits detected. Behavioral consistency systems online.`
        );
      }

      // DISCIPLINE
      if (
        disciplineScore >= 80
      ) {

        generated.push(
          "Discipline momentum is currently very strong. Behavioral systems appear highly stable."
        );

      } else if (
        disciplineScore >= 50
      ) {

        generated.push(
          "Behavioral consistency is moderate. NOVA recommends improving recovery and execution stability."
        );

      } else {

        generated.push(
          "Discipline systems appear unstable. Focus on small repeatable routines first."
        );
      }

      // GENERIC AI INSIGHTS
      generated.push(
        "Deep work scheduling increases productivity stability and cognitive endurance."
      );

      generated.push(
        "Meal timing significantly impacts focus quality and recovery optimization."
      );

      generated.push(
        "Hydration consistency improves cognitive processing and neural efficiency."
      );

      generated.push(
        "Behavioral momentum compounds over time. Small consistent actions outperform bursts of motivation."
      );

      return generated;

    }, [
      tasks,
      meals,
      habits,
      disciplineScore,
    ]);

  // =====================
  // ROTATING INSIGHTS
  // =====================

  useEffect(() => {

    const interval =
      setInterval(() => {

        setCurrentInsight(
          (prev) =>
            (prev + 1) %
            insights.length
        );

      }, 7000);

    return () =>
      clearInterval(
        interval
      );

  }, [insights]);

  return (
    <div className="fixed bottom-6 right-6 z-50">

      {/* PANEL */}
      <AnimatePresence>

        {open && (

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 20,
              scale: 0.95,
            }}
            transition={{
              duration: 0.3,
            }}
            className="absolute bottom-28 right-0 w-96 bg-black/70 backdrop-blur-3xl border border-cyan-500/10 rounded-3xl p-6 shadow-2xl overflow-hidden"
          >

            {/* HEADER */}
            <div className="flex items-center justify-between mb-5">

              <div>

                <h2 className="text-2xl font-bold text-white">

                  NOVA

                </h2>

                <p className="text-cyan-300 text-sm">

                  Adaptive Intelligence Core

                </p>

              </div>

              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">

                <Bell className="text-cyan-300 w-5 h-5" />

              </div>

            </div>

            {/* AI STATUS */}
            <div className="grid grid-cols-3 gap-3 mb-6">

              <div className="bg-white/5 border border-white/10 rounded-2xl p-3">

                <p className="text-gray-400 text-xs mb-1">

                  Neural State

                </p>

                <h3 className="text-cyan-300 font-bold">

                  {
                    aiSpeaking
                      ? "Speaking"
                      : aiListening
                      ? "Listening"
                      : "Idle"
                  }

                </h3>

              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-3">

                <p className="text-gray-400 text-xs mb-1">

                  Mood

                </p>

                <h3 className="text-pink-300 font-bold capitalize">

                  {aiMood}

                </h3>

              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-3">

                <p className="text-gray-400 text-xs mb-1">

                  Discipline

                </p>

                <h3 className="text-green-300 font-bold">

                  {disciplineScore}%

                </h3>

              </div>

            </div>

            {/* VISUALIZER */}
            <div className="flex gap-1 items-center justify-center h-16 mb-6">

              {Array.from({
                length: 30,
              }).map(
                (_, i) => (

                  <motion.div
                    key={i}
                    animate={{
                      height:
                        aiSpeaking
                          ? [
                              8,
                              Math.random() *
                                50 +
                                10,
                              8,
                            ]
                          : aiListening
                          ? [
                              8,
                              20,
                              8,
                            ]
                          : [
                              8,
                              10,
                              8,
                            ],
                    }}
                    transition={{
                      duration: 0.45,
                      repeat: Infinity,
                      delay:
                        i * 0.025,
                    }}
                    className={`w-1.5 rounded-full ${
                      aiSpeaking
                        ? "bg-cyan-400"
                        : aiListening
                        ? "bg-pink-400"
                        : "bg-white/20"
                    }`}
                  />

                )
              )}

            </div>

            {/* SMART AI NOTIFICATIONS */}
            <motion.div
              key={
                currentInsight
              }
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.4,
              }}
              className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-2xl p-5"
            >

              <div className="flex items-start gap-4">

                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">

                  <Sparkles className="text-cyan-300 w-5 h-5" />

                </div>

                <div>

                  <p className="text-cyan-300 font-semibold mb-2">

                    NOVA Insight

                  </p>

                  <p className="text-gray-300 leading-7 text-sm">

                    {
                      insights[
                        currentInsight
                      ]
                    }

                  </p>

                </div>

              </div>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>

      {/* ORB */}
      <motion.button
        whileHover={{
          scale: 1.08,
        }}
        whileTap={{
          scale: 0.96,
        }}
        onClick={() =>
          setOpen(!open)
        }
        className="relative flex items-center justify-center"
      >

        {/* GLOW */}
        <motion.div
          animate={{
            scale:
              aiSpeaking
                ? [1, 1.45, 1]
                : aiListening
                ? [1, 1.25, 1]
                : [1, 1.08, 1],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
          }}
          className={`absolute w-28 h-28 rounded-full blur-3xl ${
            aiMood ===
            "excited"
              ? "bg-yellow-400"
              : aiMood ===
                "concerned"
              ? "bg-pink-500"
              : aiMood ===
                "calm"
              ? "bg-green-400"
              : "bg-cyan-400"
          }`}
        />

        {/* CORE */}
        <motion.div
          animate={{
            scale:
              aiSpeaking
                ? [1, 1.1, 1]
                : [1, 1.02, 1],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
          }}
          className={`relative w-16 h-16 rounded-full flex items-center justify-center shadow-2xl ${
            aiMood ===
            "excited"
              ? "bg-gradient-to-br from-yellow-300 via-orange-400 to-pink-500"
              : aiMood ===
                "concerned"
              ? "bg-gradient-to-br from-purple-400 via-pink-500 to-red-500"
              : aiMood ===
                "calm"
              ? "bg-gradient-to-br from-green-300 via-cyan-400 to-blue-500"
              : "bg-gradient-to-br from-cyan-400 to-blue-600"
          }`}
        >

          <Brain className="text-white w-7 h-7" />

        </motion.div>

      </motion.button>

    </div>
  );
}
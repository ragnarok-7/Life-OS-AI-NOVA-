"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Brain,
  Clock3,
  Zap,
  Flame,
  Pencil,
  Save,
  Moon,
  Briefcase,
  Coffee,
  Dumbbell,
} from "lucide-react";

import {
  motion,
} from "framer-motion";

import {
  useLifeOS,
} from "@/context/LifeOSContext";

export default function AIDailyPlannerEngine() {

  const {
    tasks,
  } = useLifeOS();

  // =====================
  // GENERATED PLAN
  // =====================

  const generatedPlan =
    useMemo(() => {

      const highFocus =
        tasks.filter(
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
                "dsa"
              ) ||
              text.includes(
                "interview"
              )
            );
          }
        );

      const lowFocus =
        tasks.filter(
          (task: any) => {

            const text =
              (
                task.title ||
                ""
              ).toLowerCase();

            return (
              text.includes(
                "email"
              ) ||
              text.includes(
                "call"
              ) ||
              text.includes(
                "meeting"
              ) ||
              text.includes(
                "message"
              )
            );
          }
        );

      return [
        {
          id: 1,
          time: "8:00 AM",
          title:
            highFocus.length > 0
              ? highFocus[0]
                  ?.title
              : "Deep Work Session",
          type:
            "Deep Focus",
        },

        {
          id: 2,
          time: "10:30 AM",
          title:
            "Recovery Window",
          type:
            "Recovery",
        },

        {
          id: 3,
          time: "12:00 PM",
          title:
            highFocus.length > 1
              ? highFocus[1]
                  ?.title
              : "Execution Block",
          type:
            "Productivity",
        },

        {
          id: 4,
          time: "2:00 PM",
          title:
            "Gym / Physical Reset",
          type:
            "Fitness",
        },

        {
          id: 5,
          time: "4:00 PM",
          title:
            lowFocus.length > 0
              ? lowFocus[0]
                  ?.title
              : "Light Cognitive Tasks",
          type:
            "Light Work",
        },

        {
          id: 6,
          time: "7:00 PM",
          title:
            "Revision / Reflection",
          type:
            "Mental Consolidation",
        },
      ];

    }, [tasks]);

  // =====================
  // EDITABLE PLAN STATE
  // =====================

  const [
    editablePlan,
    setEditablePlan,
  ] = useState<any[]>([]);

  const [
    editingId,
    setEditingId,
  ] = useState<number | null>(
    null
  );

  useEffect(() => {

    setEditablePlan(
      generatedPlan
    );

  }, [generatedPlan]);

  // =====================
  // UPDATE BLOCK
  // =====================

  const updateBlock =
    (
      id: number,
      field: string,
      value: string
    ) => {

      setEditablePlan(
        editablePlan.map(
          (block) => {

            if (
              block.id === id
            ) {

              return {
                ...block,
                [field]:
                  value,
              };
            }

            return block;
          }
        )
      );
    };

  // =====================
  // ICON SYSTEM
  // =====================

  const getTypeIcon =
    (type: string) => {

      switch (type) {

        case "Deep Focus":
          return (
            <Zap className="w-5 h-5 text-yellow-300" />
          );

        case "Recovery":
          return (
            <Coffee className="w-5 h-5 text-pink-300" />
          );

        case "Productivity":
          return (
            <Briefcase className="w-5 h-5 text-cyan-300" />
          );

        case "Fitness":
          return (
            <Dumbbell className="w-5 h-5 text-green-300" />
          );

        case "Light Work":
          return (
            <Flame className="w-5 h-5 text-orange-300" />
          );

        case "Mental Consolidation":
          return (
            <Moon className="w-5 h-5 text-purple-300" />
          );

        default:
          return (
            <Brain className="w-5 h-5 text-cyan-300" />
          );
      }
    };

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
      <div className="flex items-center justify-between mb-6">

        <div className="flex items-center gap-3">

          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">

            <Brain className="text-white w-6 h-6" />

          </div>

          <div>

            <h2 className="text-2xl font-bold text-white">

              AI Daily Planner

            </h2>

            <p className="text-gray-400">

              Adaptive focus orchestration engine

            </p>

          </div>

        </div>

      </div>

      {/* TIMELINE */}
      <div className="space-y-5">

        {editablePlan.map(
          (
            block,
            index
          ) => (

            <motion.div
              key={index}
              whileHover={{
                scale: 1.01,
              }}
              className="bg-black/30 border border-white/10 rounded-2xl p-5 flex items-start gap-5"
            >

              {/* TIME */}
              <div className="min-w-[120px]">

                <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl px-3 py-3 text-center">

                  <Clock3 className="w-5 h-5 text-cyan-300 mx-auto mb-2" />

                  {editingId ===
                  block.id ? (

                    <input
                      value={
                        block.time
                      }
                      onChange={(e) =>
                        updateBlock(
                          block.id,
                          "time",
                          e.target.value
                        )
                      }
                      className="bg-transparent outline-none text-cyan-300 font-semibold text-sm text-center w-full"
                    />

                  ) : (

                    <p className="text-cyan-300 font-semibold text-sm">

                      {block.time}

                    </p>

                  )}

                </div>

              </div>

              {/* CONTENT */}
              <div className="flex-1">

                <div className="flex items-center justify-between mb-3">

                  <div className="flex items-center gap-2">

                    {getTypeIcon(
                      block.type
                    )}

                    <p className="text-sm text-gray-400">

                      {block.type}

                    </p>

                  </div>

                  {/* EDIT BUTTON */}
                  <button
                    onClick={() => {

                      if (
                        editingId ===
                        block.id
                      ) {

                        setEditingId(
                          null
                        );

                      } else {

                        setEditingId(
                          block.id
                        );
                      }
                    }}
                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition"
                  >

                    {editingId ===
                    block.id ? (

                      <Save className="w-5 h-5 text-green-300" />

                    ) : (

                      <Pencil className="w-5 h-5 text-cyan-300" />

                    )}

                  </button>

                </div>

                {/* TITLE */}
                {editingId ===
                block.id ? (

                  <input
                    value={
                      block.title
                    }
                    onChange={(e) =>
                      updateBlock(
                        block.id,
                        "title",
                        e.target.value
                      )
                    }
                    className="bg-transparent outline-none text-xl font-semibold text-white w-full"
                  />

                ) : (

                  <h3 className="text-xl font-semibold text-white">

                    {block.title}

                  </h3>

                )}

              </div>

            </motion.div>

          )
        )}

      </div>

      {/* AI INSIGHT */}
      <div className="mt-6 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-2xl p-5">

        <p className="text-cyan-200 leading-8">

          NOVA continuously balances deep-focus execution, recovery cycles, mental fatigue management, and sustainable productivity optimization.

        </p>

      </div>

    </motion.div>
  );
}
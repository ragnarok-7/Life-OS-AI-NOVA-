"use client";

import { useState } from "react";

import Sidebar from "@/components/Sidebar";

import { useLifeOS } from "@/context/LifeOSContext";

import AITaskIntelligence from "@/components/AITaskIntelligence";

import AIPriorityQueue from "@/components/AIPriorityQueue";

import AIProcrastinationEngine from "@/components/AIProcrastinationEngine";

import {
  CheckCircle2,
  Circle,
  Sparkles,
  Trash2,
  CheckSquare,
} from "lucide-react";

import { motion } from "framer-motion";

export default function TasksPage() {

  const [taskInput, setTaskInput] =
    useState("");

  const {
    tasks,
    setTasks,
  } = useLifeOS();

  // =====================
  // ADD TASK
  // =====================

  const addTask = () => {

    if (
      taskInput.trim() === ""
    )
      return;

    const newTask = {
      id: Date.now(),
      title: taskInput,
      completed: false,
    };

    setTasks([
      ...tasks,
      newTask,
    ]);

    setTaskInput("");
  };

  // =====================
  // ENTER KEY
  // =====================

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {

    if (
      e.key === "Enter"
    ) {

      addTask();
    }
  };

  // =====================
  // TOGGLE TASK
  // =====================

  const toggleTask = (
    id: number
  ) => {

    const updatedTasks =
      tasks.map((task: any) => {

        if (
          task.id === id
        ) {

          return {
            ...task,
            completed:
              !task.completed,
          };
        }

        return task;
      });

    setTasks(updatedTasks);
  };

  // =====================
  // DELETE TASK
  // =====================

  const deleteTask = (
    id: number
  ) => {

    const filteredTasks =
      tasks.filter(
        (task: any) =>
          task.id !== id
      );

    setTasks(filteredTasks);
  };

  // =====================
  // ANALYTICS
  // =====================

  const completedTasks =
    tasks.filter(
      (task: any) =>
        task.completed
    ).length;

  const completionRate =
    tasks.length === 0
      ? 0
      : Math.round(
          (completedTasks /
            tasks.length) *
            100
        );

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

            <motion.div
              animate={{
                scale: [1, 1.08, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
              className="w-20 h-20 rounded-full bg-gradient-to-r from-green-400 to-cyan-400 flex items-center justify-center shadow-2xl shadow-green-500/30"
            >

              <CheckSquare className="w-10 h-10 text-white" />

            </motion.div>

            <div>

              <h1 className="text-5xl font-bold">
                Tasks
              </h1>

              <p className="text-gray-400 mt-2 text-lg">
                Organize your productivity intelligently.
              </p>

            </div>

          </div>

        </motion.div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

            <p className="text-gray-400 mb-2">
              📋 Total Tasks
            </p>

            <h2 className="text-5xl font-bold">
              {tasks.length}
            </h2>

          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

            <p className="text-gray-400 mb-2">
              ✅ Completed
            </p>

            <h2 className="text-5xl font-bold text-green-400">
              {completedTasks}
            </h2>

          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

            <p className="text-gray-400 mb-2">
              🚀 Productivity
            </p>

            <h2 className="text-5xl font-bold text-cyan-400">
              {completionRate}%
            </h2>

          </div>

        </div>

        {/* ADD TASK */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 flex items-center gap-4 mb-10">

          <input
            type="text"
            placeholder="✨ Add a new productivity task..."
            value={taskInput}
            onChange={(e) =>
              setTaskInput(
                e.target.value
              )
            }
            onKeyDown={
              handleKeyDown
            }
            className="flex-1 bg-transparent outline-none text-lg placeholder:text-gray-500"
          />

          <motion.button
            whileHover={{
              scale: 1.03,
            }}
            whileTap={{
              scale: 0.95,
            }}
            onClick={addTask}
            className="bg-gradient-to-r from-cyan-400 to-blue-500 px-8 py-4 rounded-2xl font-bold shadow-2xl shadow-cyan-500/20"
          >

            Add Task

          </motion.button>

        </div>

        {/* TASKS */}
        <div className="space-y-5 mb-10">

          {tasks.map(
            (task: any) => (

              <motion.div
                key={task.id}
                whileHover={{
                  scale: 1.01,
                }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex items-center justify-between"
              >

                <div className="flex items-center gap-5">

                  <button
                    onClick={() =>
                      toggleTask(
                        task.id
                      )
                    }
                  >

                    {task.completed ? (

                      <CheckCircle2 className="text-green-400 w-8 h-8" />

                    ) : (

                      <Circle className="text-gray-500 w-8 h-8" />

                    )}

                  </button>

                  <div>

                    <h3
                      className={`text-2xl font-bold ${
                        task.completed
                          ? "line-through text-gray-500"
                          : ""
                      }`}
                    >

                      {task.title}

                    </h3>

                    <p className="text-gray-500 mt-1">

                      AI behavioral analysis active

                    </p>

                  </div>

                </div>

                <button
                  onClick={() =>
                    deleteTask(
                      task.id
                    )
                  }
                  className="bg-red-500/10 border border-red-500/20 p-3 rounded-2xl"
                >

                  <Trash2 className="text-red-400" />

                </button>

              </motion.div>

            )
          )}

        </div>

        {/* AI INSIGHT */}
        <div className="mb-10 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-3xl p-8">

          <div className="flex items-start gap-5">

            <Sparkles className="text-cyan-400 w-10 h-10" />

            <div>

              <h2 className="text-2xl font-bold mb-3">
                AI Productivity Observation
              </h2>

              <p className="text-gray-300 leading-8 text-lg">

                Consistency beats intensity. Focus on completing fewer meaningful tasks consistently instead of overloading yourself daily.

              </p>

            </div>

          </div>

        </div>

        {/* AI SYSTEMS */}
        <div className="grid grid-cols-1 2xl:grid-cols-2 gap-6">

          {/* LEFT */}
          <div className="space-y-6">

            <AITaskIntelligence />

            <AIProcrastinationEngine />

          </div>

          {/* RIGHT */}
          <div className="space-y-6">

            <AIPriorityQueue />

          </div>

        </div>

      </section>

    </main>
  );
}
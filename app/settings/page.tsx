"use client";

import {
  useEffect,
  useState,
} from "react";

import Sidebar from "@/components/Sidebar";

import {
  Settings,
  Bell,
  Brain,
  Shield,
  Moon,
  Timer,
  Trash2,
  Volume2,
} from "lucide-react";

import { motion } from "framer-motion";

export default function SettingsPage() {

  // Toggles
  const [
    aiVoice,
    setAiVoice,
  ] = useState(true);

  const [
    notifications,
    setNotifications,
  ] = useState(true);

  const [
    animations,
    setAnimations,
  ] = useState(true);

  const [
    pomodoro,
    setPomodoro,
  ] = useState(false);

  const [
    deepWork,
    setDeepWork,
  ] = useState(false);

  // Timer
  const [
    focusMinutes,
    setFocusMinutes,
  ] = useState(25);

  const [
    breakMinutes,
    setBreakMinutes,
  ] = useState(5);

  // Load Settings
  useEffect(() => {

    const savedSettings =
      localStorage.getItem(
        "settings"
      );

    if (savedSettings) {

      const parsed =
        JSON.parse(
          savedSettings
        );

      setAiVoice(
        parsed.aiVoice
      );

      setNotifications(
        parsed.notifications
      );

      setAnimations(
        parsed.animations
      );

      setPomodoro(
        parsed.pomodoro
      );

      setDeepWork(
        parsed.deepWork
      );

      setFocusMinutes(
        parsed.focusMinutes
      );

      setBreakMinutes(
        parsed.breakMinutes
      );
    }

  }, []);

  // Save Settings
  useEffect(() => {

    localStorage.setItem(
      "settings",
      JSON.stringify({
        aiVoice,
        notifications,
        animations,
        pomodoro,
        deepWork,
        focusMinutes,
        breakMinutes,
      })
    );

  }, [
    aiVoice,
    notifications,
    animations,
    pomodoro,
    deepWork,
    focusMinutes,
    breakMinutes,
  ]);

  // Clear Data
  const clearMemories = () => {

    localStorage.removeItem(
      "memories"
    );

    alert(
      "AI memories cleared."
    );
  };

  const clearTasks = () => {

    localStorage.removeItem(
      "tasks"
    );

    alert(
      "Tasks cleared."
    );
  };

  const clearExpenses =
    () => {

      localStorage.removeItem(
        "expenses"
      );

      alert(
        "Expenses cleared."
      );
    };

  // Reusable Toggle
  const Toggle = ({
    enabled,
    setEnabled,
  }: any) => (

    <button
      onClick={() =>
        setEnabled(
          !enabled
        )
      }
      className={`w-16 h-9 rounded-full transition relative ${
        enabled
          ? "bg-cyan-400"
          : "bg-gray-600"
      }`}
    >

      <div
        className={`absolute top-1 w-7 h-7 rounded-full bg-white transition ${
          enabled
            ? "left-8"
            : "left-1"
        }`}
      />

    </button>
  );

  return (
    <main className="flex min-h-screen bg-gradient-to-br from-black via-[#0f172a] to-black text-white overflow-hidden">

      <Sidebar />

      <section className="flex-1 p-10 overflow-y-auto">

        {/* Header */}
        <motion.div
          initial={{
            opacity: 0,
            y: -20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="mb-12"
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
              className="w-20 h-20 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center shadow-2xl shadow-cyan-500/30"
            >

              <Settings className="w-10 h-10 text-white" />

            </motion.div>

            <div>

              <h1 className="text-5xl font-bold">
                Settings
              </h1>

              <p className="text-gray-400 mt-2 text-lg">
                Customize your AI life operating system.
              </p>

            </div>

          </div>

        </motion.div>

        {/* Settings Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

          {/* AI Voice */}
          <motion.div
            whileHover={{
              scale: 1.02,
            }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8"
          >

            <div className="flex items-center justify-between">

              <div className="flex gap-4">

                <Volume2 className="text-cyan-400 w-8 h-8" />

                <div>

                  <h2 className="text-2xl font-bold">
                    AI Voice
                  </h2>

                  <p className="text-gray-400">
                    Enable AI speech responses
                  </p>

                </div>

              </div>

              <Toggle
                enabled={
                  aiVoice
                }
                setEnabled={
                  setAiVoice
                }
              />

            </div>

          </motion.div>

          {/* Notifications */}
          <motion.div
            whileHover={{
              scale: 1.02,
            }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8"
          >

            <div className="flex items-center justify-between">

              <div className="flex gap-4">

                <Bell className="text-yellow-400 w-8 h-8" />

                <div>

                  <h2 className="text-2xl font-bold">
                    Notifications
                  </h2>

                  <p className="text-gray-400">
                    AI reminders and alerts
                  </p>

                </div>

              </div>

              <Toggle
                enabled={
                  notifications
                }
                setEnabled={
                  setNotifications
                }
              />

            </div>

          </motion.div>

          {/* Pomodoro */}
          <motion.div
            whileHover={{
              scale: 1.02,
            }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8"
          >

            <div className="flex items-center justify-between mb-6">

              <div className="flex gap-4">

                <Timer className="text-green-400 w-8 h-8" />

                <div>

                  <h2 className="text-2xl font-bold">
                    Pomodoro Mode
                  </h2>

                  <p className="text-gray-400">
                    Focus & break cycles
                  </p>

                </div>

              </div>

              <Toggle
                enabled={
                  pomodoro
                }
                setEnabled={
                  setPomodoro
                }
              />

            </div>

            <div className="grid grid-cols-2 gap-4">

              <input
                type="number"
                value={
                  focusMinutes
                }
                onChange={(e) =>
                  setFocusMinutes(
                    Number(
                      e.target
                        .value
                    )
                  )
                }
                placeholder="Focus"
                className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3 outline-none"
              />

              <input
                type="number"
                value={
                  breakMinutes
                }
                onChange={(e) =>
                  setBreakMinutes(
                    Number(
                      e.target
                        .value
                    )
                  )
                }
                placeholder="Break"
                className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3 outline-none"
              />

            </div>

          </motion.div>

          {/* Deep Work */}
          <motion.div
            whileHover={{
              scale: 1.02,
            }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8"
          >

            <div className="flex items-center justify-between">

              <div className="flex gap-4">

                <Brain className="text-purple-400 w-8 h-8" />

                <div>

                  <h2 className="text-2xl font-bold">
                    Deep Work Mode
                  </h2>

                  <p className="text-gray-400">
                    Reduce distractions
                  </p>

                </div>

              </div>

              <Toggle
                enabled={
                  deepWork
                }
                setEnabled={
                  setDeepWork
                }
              />

            </div>

          </motion.div>

          {/* Appearance */}
          <motion.div
            whileHover={{
              scale: 1.02,
            }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8"
          >

            <div className="flex items-center justify-between">

              <div className="flex gap-4">

                <Moon className="text-cyan-400 w-8 h-8" />

                <div>

                  <h2 className="text-2xl font-bold">
                    Animations
                  </h2>

                  <p className="text-gray-400">
                    Futuristic UI effects
                  </p>

                </div>

              </div>

              <Toggle
                enabled={
                  animations
                }
                setEnabled={
                  setAnimations
                }
              />

            </div>

          </motion.div>

          {/* Privacy */}
          <motion.div
            whileHover={{
              scale: 1.02,
            }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8"
          >

            <div className="flex items-center gap-4 mb-6">

              <Shield className="text-red-400 w-8 h-8" />

              <div>

                <h2 className="text-2xl font-bold">
                  Data Controls
                </h2>

                <p className="text-gray-400">
                  Manage your local data
                </p>

              </div>

            </div>

            <div className="space-y-4">

              <button
                onClick={
                  clearMemories
                }
                className="w-full bg-red-500/10 border border-red-500/20 rounded-2xl py-4 flex items-center justify-center gap-3 hover:bg-red-500/20 transition"
              >

                <Trash2 className="w-5 h-5 text-red-400" />

                Clear AI Memories

              </button>

              <button
                onClick={
                  clearTasks
                }
                className="w-full bg-yellow-500/10 border border-yellow-500/20 rounded-2xl py-4 flex items-center justify-center gap-3 hover:bg-yellow-500/20 transition"
              >

                <Trash2 className="w-5 h-5 text-yellow-400" />

                Clear Tasks

              </button>

              <button
                onClick={
                  clearExpenses
                }
                className="w-full bg-cyan-500/10 border border-cyan-500/20 rounded-2xl py-4 flex items-center justify-center gap-3 hover:bg-cyan-500/20 transition"
              >

                <Trash2 className="w-5 h-5 text-cyan-400" />

                Clear Expenses

              </button>

            </div>

          </motion.div>

        </div>

      </section>

    </main>
  );
}
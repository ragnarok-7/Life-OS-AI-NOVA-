"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  CheckSquare,
  CalendarDays,
  Bot,
  Wallet,
  BarChart3,
  Settings,
} from "lucide-react";

import { motion } from "framer-motion";

export default function Sidebar() {

  const pathname =
    usePathname();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Planner",
      path: "/planner",
      icon: CalendarDays,
    },
    {
      name: "Tasks",
      path: "/tasks",
      icon: CheckSquare,
    },
    {
      name: "AI Coach",
      path: "/ai-coach",
      icon: Bot,
    },
    {
      name: "Finance",
      path: "/finance",
      icon: Wallet,
    },
    {
      name: "Analytics",
      path: "/analytics",
      icon: BarChart3,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: Settings,
    },
  ];

  return (
    <aside className="w-[280px] min-h-screen bg-white/5 backdrop-blur-xl border-r border-white/10 p-6 flex flex-col">

      {/* Logo */}
      <motion.div
        initial={{
          opacity: 0,
          y: -10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="mb-12"
      >

        <div className="flex items-center gap-4">

          <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center shadow-2xl shadow-cyan-500/30">

            <Bot className="text-white w-7 h-7" />

          </div>

          <div>

            <h1 className="text-2xl font-bold text-white">

              Life OS

            </h1>

            <p className="text-gray-400 text-sm">

              AI Life System

            </p>

          </div>

        </div>

      </motion.div>

      {/* Navigation */}
      <nav className="flex flex-col gap-3">

        {menuItems.map(
          (item, index) => {

            const Icon =
              item.icon;

            const active =
              pathname ===
              item.path;

            return (

              <Link
                key={index}
                href={
                  item.path
                }
              >

                <motion.div
                  whileHover={{
                    scale: 1.03,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 ${
                    active
                      ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-2xl shadow-cyan-500/20"
                      : "bg-white/5 border border-white/5 text-gray-300 hover:bg-white/10"
                  }`}
                >

                  <Icon className="w-6 h-6" />

                  <span className="text-lg font-medium">

                    {item.name}

                  </span>

                </motion.div>

              </Link>
            );
          }
        )}

      </nav>

      {/* Bottom AI Box */}
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        className="mt-auto bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-3xl p-5"
      >

        <h2 className="text-xl font-bold mb-2">

          🚀 AI Optimization Active

        </h2>

        <p className="text-gray-400 leading-7 text-sm">

          Your productivity, finance, and routines are being continuously optimized by AI.

        </p>

      </motion.div>

    </aside>
  );
}
"use client";

import {
  motion,
} from "framer-motion";

import {
  Sparkles,
  Brain,
  Flame,
  Wallet,
  TrendingUp,
} from "lucide-react";

import {
  useLifeOS,
} from "@/context/LifeOSContext";

export default function AutoInsights() {

  const {
    tasks,
    expenses,
    salary,
    memories,
  } = useLifeOS();

  // =====================
  // ANALYTICS
  // =====================

  const completedTasks =
    tasks.filter(
      (task: any) =>
        task.completed
    ).length;

  const pendingTasks =
    tasks.length -
    completedTasks;

  const productivityScore =
    tasks.length === 0
      ? 0
      : Math.round(
          (completedTasks /
            tasks.length) *
            100
        );

  const totalExpenses =
    expenses.reduce(
      (
        total: number,
        expense: any
      ) =>
        total +
        expense.amount,
      0
    );

  const parsedSalary =
    Number(salary) || 0;

  // =====================
  // AUTO INSIGHTS
  // =====================

  const insights: {
    title: string;
    description: string;
    icon: any;
    gradient: string;
  }[] = [];

  // Productivity
  if (
    productivityScore >= 80
  ) {

    insights.push({
      title:
        "High Productivity Momentum",
      description:
        "Your execution consistency appears exceptionally strong recently.",
      icon: TrendingUp,
      gradient:
        "from-green-400 to-cyan-400",
    });
  }

  // Burnout
  if (
    pendingTasks >= 5
  ) {

    insights.push({
      title:
        "Burnout Probability Rising",
      description:
        "Workload pressure has increased significantly. Recovery optimization recommended.",
      icon: Flame,
      gradient:
        "from-red-500 to-orange-500",
    });
  }

  // Finance
  if (
    parsedSalary > 0 &&
    totalExpenses >
      parsedSalary * 0.7
  ) {

    insights.push({
      title:
        "Financial Pressure Detected",
      description:
        "Expenses are consuming most of your monthly financial capacity.",
      icon: Wallet,
      gradient:
        "from-pink-500 to-red-500",
    });
  }

  // Memory Intelligence
  if (
    memories.length >= 3
  ) {

    insights.push({
      title:
        "Behavioral Intelligence Expanding",
      description:
        "NOVA has accumulated enough behavioral observations to improve future recommendations.",
      icon: Brain,
      gradient:
        "from-cyan-400 to-blue-500",
    });
  }

  // Stable system
  if (
    insights.length === 0
  ) {

    insights.push({
      title:
        "Systems Operating Normally",
      description:
        "Productivity, finances, and workload currently appear stable.",
      icon: Sparkles,
      gradient:
        "from-cyan-400 to-blue-500",
    });
  }

  return (
    <div className="space-y-5">

      {insights.map(
        (
          insight,
          index
        ) => {

          const Icon =
            insight.icon;

          return (

            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay:
                  index * 0.1,
              }}
              whileHover={{
                scale: 1.02,
              }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 overflow-hidden relative"
            >

              {/* Glow */}
              <div
                className={`absolute inset-0 opacity-10 bg-gradient-to-r ${insight.gradient}`}
              />

              <div className="relative z-10 flex items-start gap-5">

                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${insight.gradient} flex items-center justify-center shadow-2xl`}
                >

                  <Icon className="text-white w-8 h-8" />

                </div>

                <div>

                  <h2 className="text-2xl font-bold text-white mb-3">

                    {insight.title}

                  </h2>

                  <p className="text-gray-300 text-lg leading-8">

                    {insight.description}

                  </p>

                </div>

              </div>

            </motion.div>

          );
        }
      )}

    </div>
  );
}
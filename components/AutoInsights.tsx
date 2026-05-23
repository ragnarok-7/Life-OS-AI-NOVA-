"use client";

import { useEffect, useState } from "react";

import {
  Sparkles,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";

import { motion } from "framer-motion";

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

type Expense = {
  id: number;
  title: string;
  amount: number;
  category: string;
};

export default function AutoInsights() {

  const [insights, setInsights] =
    useState<string[]>([]);

  useEffect(() => {

    const savedTasks =
      localStorage.getItem("tasks");

    const savedExpenses =
      localStorage.getItem("expenses");

    const savedSalary =
      localStorage.getItem("salary");

    const tasks: Task[] =
      savedTasks
        ? JSON.parse(savedTasks)
        : [];

    const expenses: Expense[] =
      savedExpenses
        ? JSON.parse(savedExpenses)
        : [];

    const salary =
      Number(savedSalary) || 0;

    const generatedInsights: string[] =
      [];

    const completedTasks =
      tasks.filter(
        (task) => task.completed
      ).length;

    const pendingTasks =
      tasks.length -
      completedTasks;

    const completionRate =
      tasks.length === 0
        ? 0
        : (completedTasks /
            tasks.length) *
          100;

    const totalExpenses =
      expenses.reduce(
        (total, expense) =>
          total + expense.amount,
        0
      );

    if (pendingTasks >= 5) {

      generatedInsights.push(
        "⚠️ High pending workload detected. Consider reducing task overload."
      );
    }

    if (completionRate < 40) {

      generatedInsights.push(
        "📉 Productivity levels are lower than usual."
      );
    }

    if (
      salary > 0 &&
      totalExpenses >
        salary * 0.5
    ) {

      generatedInsights.push(
        "💸 Spending patterns are consuming a large portion of salary."
      );
    }

    if (
      generatedInsights.length === 0
    ) {

      generatedInsights.push(
        "🚀 Your productivity and finances look stable today."
      );
    }

    setInsights(
      generatedInsights
    );

  }, []);

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl h-full">

      <div className="flex items-center gap-4 mb-8">

        <div className="bg-cyan-500/20 p-4 rounded-2xl">

          <Sparkles className="text-cyan-400 w-8 h-8" />

        </div>

        <div>

          <h2 className="text-3xl font-bold">
            AI Insights
          </h2>

          <p className="text-gray-400">
            Live behavioral analysis
          </p>

        </div>

      </div>

      <div className="space-y-5">

        {insights.map(
          (
            insight,
            index
          ) => (

            <motion.div
              key={index}
              whileHover={{
                scale: 1.02,
              }}
              className="bg-white/5 border border-white/10 rounded-2xl p-5"
            >

              <div className="flex items-start gap-4">

                <TrendingUp className="text-cyan-400 mt-1" />

                <p className="text-gray-300 leading-7">

                  {insight}

                </p>

              </div>

            </motion.div>
          )
        )}

        {/* Warning */}
        <motion.div
          whileHover={{
            scale: 1.02,
          }}
          className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-5 mt-6"
        >

          <div className="flex gap-4">

            <AlertTriangle className="text-yellow-400 mt-1" />

            <div>

              <h3 className="font-bold text-yellow-300 mb-2">
                AI Observation
              </h3>

              <p className="text-gray-300 leading-7">
                Consistency and recovery balance are the biggest predictors of long-term productivity.
              </p>

            </div>

          </div>

        </motion.div>

      </div>

    </div>
  );
}
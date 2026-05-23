"use client";

import {
  useEffect,
} from "react";

import {
  useLifeOS,
} from "@/context/LifeOSContext";

export default function AIBehaviorEngine() {

  const {
    tasks,
    expenses,
    memories,
    setMemories,
  } = useLifeOS();

  useEffect(() => {

    const insights: string[] =
      [];

    // =====================
    // TASK ANALYSIS
    // =====================

    const completedTasks =
      tasks.filter(
        (task: any) =>
          task.completed
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

    // Overload
    if (pendingTasks >= 7) {

      insights.push(
        "⚠️ Your workload is becoming overloaded. Reduce non-essential tasks."
      );
    }

    // Productivity Drop
    if (
      completionRate < 40 &&
      tasks.length >= 5
    ) {

      insights.push(
        "📉 Your productivity consistency has dropped recently."
      );
    }

    // Strong Productivity
    if (
      completionRate > 80 &&
      tasks.length >= 3
    ) {

      insights.push(
        "🚀 Excellent consistency detected in task completion."
      );
    }

    // =====================
    // FINANCIAL ANALYSIS
    // =====================

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

    // Overspending
    if (totalExpenses > 7000) {

      insights.push(
        "💸 Spending patterns are rising rapidly this cycle."
      );
    }

    // Controlled Spending
    if (
      totalExpenses < 3000 &&
      expenses.length >= 3
    ) {

      insights.push(
        "✅ Financial discipline appears stable."
      );
    }

    // =====================
    // BURNOUT ANALYSIS
    // =====================

    if (
      pendingTasks >= 5 &&
      completionRate < 50
    ) {

      insights.push(
        "🧠 Burnout risk increasing due to excessive pending workload."
      );
    }

    // =====================
    // ROUTINE INTELLIGENCE
    // =====================

    if (
      tasks.length >= 10
    ) {

      insights.push(
        "📚 High activity levels detected. Recovery balance is important."
      );
    }

    // =====================
    // SAFE UPDATE CHECK
    // =====================

    const currentMemories =
      JSON.stringify(
        memories
      );

    const newMemories =
      JSON.stringify(
        insights
      );

    // ONLY update if changed
    if (
      currentMemories !==
      newMemories
    ) {

      setMemories(
        insights
      );
    }

  }, [
    tasks,
    expenses,
    memories,
    setMemories,
  ]);

  return null;
}
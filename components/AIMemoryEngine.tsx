"use client";

import {
  useEffect,
} from "react";

import {
  useLifeOS,
} from "@/context/LifeOSContext";

export default function AIMemoryEngine() {

  const {
    tasks,
    expenses,
    memories,
    setMemories,
  } = useLifeOS();

  useEffect(() => {

    const generatedMemories: string[] =
      [];

    // TASK ANALYSIS
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

    // PRODUCTIVITY MEMORIES
    if (completionRate > 80) {

      generatedMemories.push(
        "User is maintaining high productivity consistency."
      );
    }

    if (pendingTasks >= 5) {

      generatedMemories.push(
        "User workload is becoming overloaded."
      );
    }

    if (
      completionRate < 40 &&
      tasks.length > 3
    ) {

      generatedMemories.push(
        "User productivity dropped recently."
      );
    }

    // FINANCIAL ANALYSIS
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

    if (totalExpenses > 5000) {

      generatedMemories.push(
        "User spending trend is increasing."
      );
    }

    if (
      expenses.length >= 10
    ) {

      generatedMemories.push(
        "User is actively tracking financial behavior."
      );
    }

    // SAVE MEMORIES
    setMemories(
      generatedMemories
    );

  }, [
    tasks,
    expenses,
    setMemories,
  ]);

  return null;
}
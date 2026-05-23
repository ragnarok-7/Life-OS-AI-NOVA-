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
    salary,
  } = useLifeOS();

  useEffect(() => {

    const newMemories: string[] =
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

    const productivityScore =
      tasks.length === 0
        ? 0
        : Math.round(
            (completedTasks /
              tasks.length) *
              100
          );

    // =====================
    // FINANCE ANALYSIS
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

    const parsedSalary =
      Number(salary) || 0;

    // =====================
    // MEMORY RULES
    // =====================

    // Burnout
    if (
      pendingTasks >= 5
    ) {

      newMemories.push(
        "High workload pressure detected repeatedly."
      );
    }

    // Productivity
    if (
      productivityScore >= 80
    ) {

      newMemories.push(
        "User demonstrates strong productivity consistency."
      );
    }

    // Low productivity
    if (
      productivityScore <
        40 &&
      tasks.length >= 5
    ) {

      newMemories.push(
        "Execution consistency appears unstable."
      );
    }

    // Overspending
    if (
      parsedSalary > 0 &&
      totalExpenses >
        parsedSalary * 0.7
    ) {

      newMemories.push(
        "Expense levels are consuming most monthly income."
      );
    }

    // Stable finance
    if (
      parsedSalary > 0 &&
      totalExpenses <
        parsedSalary * 0.4
    ) {

      newMemories.push(
        "User maintains relatively stable financial discipline."
      );
    }

    // =====================
    // SAVE UNIQUE MEMORIES
    // =====================

    const uniqueMemories =
      [
        ...memories,
        ...newMemories,
      ].filter(
        (
          memory,
          index,
          self
        ) =>
          self.indexOf(
            memory
          ) === index
      );

    // Prevent infinite loop
    if (
      uniqueMemories.length !==
      memories.length
    ) {

      setMemories(
        uniqueMemories
      );
    }

  }, [
    tasks,
    expenses,
    salary,
  ]);

  return null;
}
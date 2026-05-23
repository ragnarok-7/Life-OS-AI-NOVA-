"use client";

import {
  useEffect,
  useState,
} from "react";

import Sidebar from "@/components/Sidebar";

import {
  Brain,
  TrendingUp,
  Activity,
  Wallet,
  Sparkles,
} from "lucide-react";

import { motion } from "framer-motion";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

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

export default function AnalyticsPage() {

  const [tasks, setTasks] =
    useState<Task[]>([]);

  const [expenses, setExpenses] =
    useState<Expense[]>([]);

  // Load Data
  useEffect(() => {

    const savedTasks =
      localStorage.getItem(
        "tasks"
      );

    if (savedTasks) {
      setTasks(
        JSON.parse(savedTasks)
      );
    }

    const savedExpenses =
      localStorage.getItem(
        "expenses"
      );

    if (savedExpenses) {
      setExpenses(
        JSON.parse(
          savedExpenses
        )
      );
    }

  }, []);

  // Analytics
  const completedTasks =
    tasks.filter(
      (task) =>
        task.completed
    ).length;

  const pendingTasks =
    tasks.length -
    completedTasks;

  const completionRate =
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
        total,
        expense
      ) =>
        total +
        expense.amount,
      0
    );

  // Expense Categories
  const categoryMap: any = {};

  expenses.forEach(
    (expense) => {

      if (
        !categoryMap[
          expense.category
        ]
      ) {

        categoryMap[
          expense.category
        ] = 0;
      }

      categoryMap[
        expense.category
      ] += expense.amount;
    }
  );

  const expenseChartData =
    Object.keys(
      categoryMap
    ).map((category) => ({
      name: category,
      value:
        categoryMap[
          category
        ],
    }));

  // Productivity
  const productivityData =
    [
      {
        name:
          "Completed",
        value:
          completedTasks,
      },
      {
        name:
          "Pending",
        value:
          pendingTasks,
      },
    ];

  const COLORS = [
    "#22c55e",
    "#3b82f6",
    "#eab308",
    "#ef4444",
    "#a855f7",
  ];

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

            {/* Orb */}
            <motion.div
              animate={{
                scale: [1, 1.08, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
              className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-400 to-cyan-400 flex items-center justify-center shadow-2xl shadow-cyan-500/30"
            >

              <Brain className="w-10 h-10 text-white" />

            </motion.div>

            <div>

              <h1 className="text-5xl font-bold">
                Analytics
              </h1>

              <p className="text-gray-400 mt-2 text-lg">
                AI-powered behavioral intelligence dashboard.
              </p>

            </div>

          </div>

        </motion.div>

        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

          {/* Completion */}
          <motion.div
            whileHover={{
              scale: 1.03,
            }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6"
          >

            <TrendingUp className="text-green-400 w-8 h-8 mb-4" />

            <p className="text-gray-400 mb-2">
              Completion Rate
            </p>

            <h2 className="text-5xl font-bold text-green-400">
              {completionRate}%
            </h2>

          </motion.div>

          {/* Tasks */}
          <motion.div
            whileHover={{
              scale: 1.03,
            }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6"
          >

            <Activity className="text-cyan-400 w-8 h-8 mb-4" />

            <p className="text-gray-400 mb-2">
              Total Tasks
            </p>

            <h2 className="text-5xl font-bold">
              {tasks.length}
            </h2>

          </motion.div>

          {/* Expenses */}
          <motion.div
            whileHover={{
              scale: 1.03,
            }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6"
          >

            <Wallet className="text-red-400 w-8 h-8 mb-4" />

            <p className="text-gray-400 mb-2">
              Total Expenses
            </p>

            <h2 className="text-5xl font-bold text-red-400">
              ₹{totalExpenses}
            </h2>

          </motion.div>

          {/* AI Score */}
          <motion.div
            whileHover={{
              scale: 1.03,
            }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6"
          >

            <Sparkles className="text-purple-400 w-8 h-8 mb-4" />

            <p className="text-gray-400 mb-2">
              AI Productivity
            </p>

            <h2 className="text-5xl font-bold text-purple-400">
              {Math.min(
                100,
                completionRate +
                  completedTasks *
                    5
              )}
              %
            </h2>

          </motion.div>

        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-10">

          {/* Productivity */}
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 h-[500px]"
          >

            <div className="flex items-center gap-4 mb-8">

              <Activity className="text-cyan-400 w-8 h-8" />

              <div>

                <h2 className="text-3xl font-bold">
                  Productivity
                </h2>

                <p className="text-gray-400">
                  Task performance analysis
                </p>

              </div>

            </div>
          
          <div className="w-full h-[300px]">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <BarChart
                data={
                  productivityData
                }
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#333"
                />

                <XAxis
                  dataKey="name"
                />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="value"
                  fill="#06b6d4"
                  radius={[
                    10,
                    10,
                    0,
                    0,
                  ]}
                />

              </BarChart>

            </ResponsiveContainer>
          </div>

          </motion.div>

          {/* Expense Pie */}
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 h-[500px]"
          >

            <div className="flex items-center gap-4 mb-8">

              <Wallet className="text-green-400 w-8 h-8" />

              <div>

                <h2 className="text-3xl font-bold">
                  Expenses
                </h2>

                <p className="text-gray-400">
                  Spending distribution analysis
                </p>

              </div>

            </div>
          <div>
            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <PieChart>

                <Pie
                  data={
                    expenseChartData
                  }
                  dataKey="value"
                  nameKey="name"
                  outerRadius={150}
                  label
                >

                  {expenseChartData.map(
                    (
                      entry,
                      index
                    ) => (

                      <Cell
                        key={`cell-${index}`}
                        fill={
                          COLORS[
                            index %
                              COLORS.length
                          ]
                        }
                      />

                    )
                  )}

                </Pie>

                <Tooltip />

              </PieChart>

            </ResponsiveContainer>
          </div>
          </motion.div>

        </div>

        {/* AI Insight */}
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-3xl p-8"
        >

          <div className="flex items-start gap-5">

            <Sparkles className="text-cyan-400 w-10 h-10" />

            <div>

              <h2 className="text-3xl font-bold mb-4">
                AI Behavioral Observation
              </h2>

              <div className="space-y-4 text-gray-300 leading-8 text-lg">

                {completionRate <
                  40 && (

                  <p>
                    📉 Productivity consistency is currently below optimal levels.
                  </p>

                )}

                {completionRate >=
                  70 && (

                  <p>
                    🚀 High task consistency detected. Current systems are effective.
                  </p>

                )}

                {totalExpenses >
                  10000 && (

                  <p>
                    💸 Spending activity has increased significantly.
                  </p>

                )}

                {tasks.length >=
                  10 && (

                  <p>
                    ⚠️ High workload detected. Consider recovery scheduling.
                  </p>

                )}

                <p>
                  🧠 Long-term consistency remains the strongest predictor of sustainable productivity.
                </p>

              </div>

            </div>

          </div>

        </motion.div>

      </section>

    </main>
  );
}
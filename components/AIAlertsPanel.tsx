"use client";

import {
  motion,
} from "framer-motion";

import {
  AlertTriangle,
  Bell,
  Flame,
  Wallet,
  Brain,
  CheckCircle2,
} from "lucide-react";

import {
  useLifeOS,
} from "@/context/LifeOSContext";

export default function AIAlertsPanel() {

  const {
    tasks,
    expenses,
    salary,
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
  // ALERT ENGINE
  // =====================

  const alerts: {
    title: string;
    description: string;
    icon: any;
    color: string;
  }[] = [];

  // Burnout
  if (
    pendingTasks >= 5
  ) {

    alerts.push({
      title:
        "Burnout Risk Elevated",
      description:
        "Task overload detected. Recovery and prioritization recommended.",
      icon: Flame,
      color:
        "from-red-500 to-orange-500",
    });
  }

  // Low productivity
  if (
    productivityScore <
      40 &&
    tasks.length >= 4
  ) {

    alerts.push({
      title:
        "Low Productivity Detected",
      description:
        "Execution consistency has dropped significantly.",
      icon: AlertTriangle,
      color:
        "from-yellow-500 to-orange-500",
    });
  }

  // Overspending
  if (
    parsedSalary > 0 &&
    totalExpenses >
      parsedSalary * 0.7
  ) {

    alerts.push({
      title:
        "Overspending Warning",
      description:
        "Expenses are consuming most of your monthly income.",
      icon: Wallet,
      color:
        "from-red-500 to-pink-500",
    });
  }

  // Stable system
  if (
    alerts.length === 0
  ) {

    alerts.push({
      title:
        "Systems Stable",
      description:
        "Your productivity, workload, and finances appear balanced.",
      icon: CheckCircle2,
      color:
        "from-green-400 to-emerald-500",
    });
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <motion.div
        initial={{
          opacity: 0,
          y: -10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6"
      >

        <div className="flex items-center gap-4">

          <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center shadow-2xl shadow-cyan-500/20">

            <Bell className="text-white w-8 h-8" />

          </div>

          <div>

            <h2 className="text-3xl font-bold text-white">

              NOVA Alert Engine

            </h2>

            <p className="text-gray-400 mt-1">

              Real-time AI behavioral monitoring system

            </p>

          </div>

        </div>

      </motion.div>

      {/* Alerts */}
      <div className="space-y-5">

        {alerts.map(
          (
            alert,
            index
          ) => {

            const Icon =
              alert.icon;

            return (

              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  x: -20,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
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
                  className={`absolute inset-0 opacity-10 bg-gradient-to-r ${alert.color}`}
                />

                <div className="relative z-10 flex items-start gap-5">

                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${alert.color} flex items-center justify-center shadow-xl`}
                  >

                    <Icon className="text-white w-7 h-7" />

                  </div>

                  <div>

                    <h3 className="text-2xl font-bold text-white mb-2">

                      {alert.title}

                    </h3>

                    <p className="text-gray-300 text-lg leading-8">

                      {alert.description}

                    </p>

                  </div>

                </div>

              </motion.div>

            );
          }
        )}

      </div>

      {/* Footer */}
      <motion.div
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-3xl p-8"
      >

        <div className="flex items-start gap-5">

          <Brain className="text-cyan-400 w-10 h-10" />

          <div>

            <h2 className="text-3xl font-bold mb-4 text-white">

              NOVA Monitoring Status

            </h2>

            <p className="text-gray-300 text-lg leading-9">

              NOVA continuously monitors productivity trends, workload pressure, recovery cycles, and financial behavior to proactively identify risks before they escalate.

            </p>

          </div>

        </div>

      </motion.div>

    </div>
  );
}
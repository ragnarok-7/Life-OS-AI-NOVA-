"use client";

import {
  motion,
} from "framer-motion";

import {
  Wallet,
  TrendingUp,
  TrendingDown,
  PiggyBank,
  AlertTriangle,
  Brain,
} from "lucide-react";

import {
  useLifeOS,
} from "@/context/LifeOSContext";

export default function AIFinancePanel() {

  const {
    expenses,
    salary,
  } = useLifeOS();

  // =====================
  // CALCULATIONS
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

  const remainingBalance =
    parsedSalary -
    totalExpenses;

  const savingsRate =
    parsedSalary === 0
      ? 0
      : Math.round(
          (remainingBalance /
            parsedSalary) *
            100
        );

  // =====================
  // FINANCIAL HEALTH
  // =====================

  let financialHealth =
    "Stable";

  if (
    savingsRate < 20
  ) {

    financialHealth =
      "Critical";
  }

  else if (
    savingsRate < 40
  ) {

    financialHealth =
      "Moderate";
  }

  else if (
    savingsRate >= 60
  ) {

    financialHealth =
      "Excellent";
  }

  // =====================
  // AI RECOMMENDATIONS
  // =====================

  const recommendations: string[] =
    [];

  if (
    savingsRate < 20
  ) {

    recommendations.push(
      "Your savings rate is critically low. Reduce non-essential expenses immediately."
    );
  }

  if (
    totalExpenses >
    parsedSalary * 0.7
  ) {

    recommendations.push(
      "Spending levels are consuming most of your income. Expense optimization recommended."
    );
  }

  if (
    savingsRate >= 40
  ) {

    recommendations.push(
      "Savings stability appears strong. Continue maintaining disciplined spending behavior."
    );
  }

  if (
    parsedSalary === 0
  ) {

    recommendations.push(
      "Add your salary data to enable advanced financial optimization."
    );
  }

  if (
    recommendations.length ===
    0
  ) {

    recommendations.push(
      "Your financial behavior currently appears balanced and sustainable."
    );
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

          <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center shadow-2xl shadow-green-500/20">

            <Wallet className="text-white w-8 h-8" />

          </div>

          <div>

            <h2 className="text-3xl font-bold text-white">

              NOVA Finance Intelligence

            </h2>

            <p className="text-gray-400 mt-1">

              Adaptive salary and expense optimization engine

            </p>

          </div>

        </div>

      </motion.div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {/* Salary */}
        <motion.div
          whileHover={{
            scale: 1.03,
          }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6"
        >

          <div className="flex items-center justify-between mb-4">

            <div>

              <p className="text-gray-400 mb-2">

                Salary

              </p>

              <h2 className="text-4xl font-bold text-green-400">

                ₹{parsedSalary}

              </h2>

            </div>

            <TrendingUp className="text-green-400 w-10 h-10" />

          </div>

        </motion.div>

        {/* Expenses */}
        <motion.div
          whileHover={{
            scale: 1.03,
          }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6"
        >

          <div className="flex items-center justify-between mb-4">

            <div>

              <p className="text-gray-400 mb-2">

                Expenses

              </p>

              <h2 className="text-4xl font-bold text-red-400">

                ₹{totalExpenses}

              </h2>

            </div>

            <TrendingDown className="text-red-400 w-10 h-10" />

          </div>

        </motion.div>

        {/* Savings */}
        <motion.div
          whileHover={{
            scale: 1.03,
          }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6"
        >

          <div className="flex items-center justify-between mb-4">

            <div>

              <p className="text-gray-400 mb-2">

                Savings

              </p>

              <h2 className="text-4xl font-bold text-cyan-400">

                ₹{remainingBalance}

              </h2>

            </div>

            <PiggyBank className="text-cyan-400 w-10 h-10" />

          </div>

        </motion.div>

        {/* Health */}
        <motion.div
          whileHover={{
            scale: 1.03,
          }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6"
        >

          <div className="flex items-center justify-between mb-4">

            <div>

              <p className="text-gray-400 mb-2">

                Financial Health

              </p>

              <h2 className="text-4xl font-bold text-yellow-400">

                {financialHealth}

              </h2>

            </div>

            <AlertTriangle className="text-yellow-400 w-10 h-10" />

          </div>

        </motion.div>

      </div>

      {/* Savings Meter */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

        <div className="flex items-center justify-between mb-5">

          <div>

            <p className="text-gray-400 mb-2">

              Savings Rate

            </p>

            <h2 className="text-5xl font-bold text-cyan-400">

              {savingsRate}%

            </h2>

          </div>

          <Brain className="text-cyan-400 w-10 h-10" />

        </div>

        <div className="w-full h-4 rounded-full bg-white/10 overflow-hidden">

          <div
            style={{
              width: `${Math.max(
                savingsRate,
                5
              )}%`,
            }}
            className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
          />

        </div>

      </div>

      {/* Recommendations */}
      <motion.div
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="bg-gradient-to-r from-green-500/10 to-cyan-500/10 border border-green-500/20 rounded-3xl p-8"
      >

        <h2 className="text-3xl font-bold text-white mb-6">

          AI Financial Recommendations

        </h2>

        <div className="space-y-4">

          {recommendations.map(
            (
              recommendation,
              index
            ) => (

              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  x: -10,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  delay:
                    index * 0.1,
                }}
                className="bg-black/30 border border-white/10 rounded-2xl p-5"
              >

                <p className="text-lg text-gray-200 leading-8">

                  • {recommendation}

                </p>

              </motion.div>

            )
          )}

        </div>

      </motion.div>

    </div>
  );
}
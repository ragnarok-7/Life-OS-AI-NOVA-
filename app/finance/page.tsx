"use client";

import {
  useState,
} from "react";

import Sidebar from "@/components/Sidebar";

import AIFinancePanel from "@/components/AIFinancePanel";

import {
  useLifeOS,
} from "@/context/LifeOSContext";

import {
  Wallet,
  Plus,
  Trash2,
  TrendingDown,
  PiggyBank,
  Brain,
} from "lucide-react";

import {
  motion,
} from "framer-motion";

export default function FinancePage() {

  const {
    expenses,
    setExpenses,
    salary,
    setSalary,
  } = useLifeOS();

  const [
    title,
    setTitle,
  ] = useState("");

  const [
    amount,
    setAmount,
  ] = useState("");

  const [
    category,
    setCategory,
  ] = useState("");

  // =====================
  // ADD EXPENSE
  // =====================

  const addExpense =
    () => {

      if (
        title.trim() === "" ||
        amount.trim() === ""
      )
        return;

      const newExpense = {
        id: Date.now(),
        title,
        amount: Number(
          amount
        ),
        category:
          category || "General",
      };

      setExpenses([
        ...expenses,
        newExpense,
      ]);

      setTitle("");
      setAmount("");
      setCategory("");
    };

  // =====================
  // DELETE EXPENSE
  // =====================

  const deleteExpense =
    (
      id: number
    ) => {

      const filtered =
        expenses.filter(
          (
            expense: any
          ) =>
            expense.id !== id
        );

      setExpenses(filtered);
    };

  // =====================
  // ENTER SUPPORT
  // =====================

  const handleKeyDown =
    (
      e: React.KeyboardEvent<HTMLInputElement>
    ) => {

      if (
        e.key === "Enter"
      ) {

        addExpense();
      }
    };

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

  const remainingBalance =
    (Number(salary) || 0) -
    totalExpenses;

  return (
    <main className="flex min-h-screen bg-gradient-to-br from-black via-[#0f172a] to-black text-white overflow-hidden">

      {/* Sidebar */}
      <Sidebar />

      {/* Main */}
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
          className="mb-10"
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
              className="w-20 h-20 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center shadow-2xl shadow-green-500/30"
            >

              <Wallet className="w-10 h-10 text-white" />

            </motion.div>

            <div>

              <h1 className="text-5xl font-bold">

                AI Finance Center

              </h1>

              <p className="text-gray-400 mt-2 text-lg">

                Adaptive salary and expense intelligence system

              </p>

            </div>

          </div>

        </motion.div>

        {/* Top Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

          {/* Salary */}
          <motion.div
            whileHover={{
              scale: 1.03,
            }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6"
          >

            <div className="flex items-center justify-between mb-5">

              <div>

                <p className="text-gray-400 mb-2">

                  Monthly Salary

                </p>

                <h2 className="text-5xl font-bold text-green-400">

                  ₹{salary || 0}

                </h2>

              </div>

              <PiggyBank className="text-green-400 w-10 h-10" />

            </div>

          </motion.div>

          {/* Expenses */}
          <motion.div
            whileHover={{
              scale: 1.03,
            }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6"
          >

            <div className="flex items-center justify-between mb-5">

              <div>

                <p className="text-gray-400 mb-2">

                  Total Expenses

                </p>

                <h2 className="text-5xl font-bold text-red-400">

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

            <div className="flex items-center justify-between mb-5">

              <div>

                <p className="text-gray-400 mb-2">

                  Remaining Balance

                </p>

                <h2 className="text-5xl font-bold text-cyan-400">

                  ₹{remainingBalance}

                </h2>

              </div>

              <Brain className="text-cyan-400 w-10 h-10" />

            </div>

          </motion.div>

        </div>

        {/* Salary Input */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 mb-10">

          <h2 className="text-2xl font-bold mb-5">

            Update Salary

          </h2>

          <div className="flex flex-col md:flex-row gap-4">

            <input
              type="number"
              placeholder="Enter monthly salary..."
              value={salary}
              onChange={(e) =>
                setSalary(
                  e.target.value
                )
              }
              className="flex-1 bg-black/30 border border-white/10 rounded-2xl px-5 py-4 outline-none text-lg"
            />

          </div>

        </div>

        {/* Add Expense */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 mb-10">

          <h2 className="text-2xl font-bold mb-5">

            Add Expense

          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

            <input
              type="text"
              placeholder="Expense title..."
              value={title}
              onChange={(e) =>
                setTitle(
                  e.target.value
                )
              }
              onKeyDown={
                handleKeyDown
              }
              className="bg-black/30 border border-white/10 rounded-2xl px-5 py-4 outline-none text-lg"
            />

            <input
              type="number"
              placeholder="Amount..."
              value={amount}
              onChange={(e) =>
                setAmount(
                  e.target.value
                )
              }
              onKeyDown={
                handleKeyDown
              }
              className="bg-black/30 border border-white/10 rounded-2xl px-5 py-4 outline-none text-lg"
            />

            <input
              type="text"
              placeholder="Category..."
              value={category}
              onChange={(e) =>
                setCategory(
                  e.target.value
                )
              }
              onKeyDown={
                handleKeyDown
              }
              className="bg-black/30 border border-white/10 rounded-2xl px-5 py-4 outline-none text-lg"
            />

            <motion.button
              whileHover={{
                scale: 1.03,
              }}
              whileTap={{
                scale: 0.95,
              }}
              onClick={
                addExpense
              }
              className="bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl font-bold text-lg flex items-center justify-center gap-3"
            >

              <Plus className="w-5 h-5" />

              Add

            </motion.button>

          </div>

        </div>

        {/* Expenses List */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 mb-10">

          <h2 className="text-3xl font-bold mb-6">

            Expense History

          </h2>

          <div className="space-y-4">

            {expenses.length > 0 ? (

              expenses.map(
                (
                  expense: any
                ) => (

                  <motion.div
                    key={expense.id}
                    whileHover={{
                      scale: 1.01,
                    }}
                    className="bg-black/30 border border-white/10 rounded-2xl p-5 flex items-center justify-between"
                  >

                    <div>

                      <h3 className="text-xl font-bold">

                        {expense.title}

                      </h3>

                      <p className="text-gray-400 mt-1">

                        {expense.category}

                      </p>

                    </div>

                    <div className="flex items-center gap-5">

                      <h2 className="text-2xl font-bold text-red-400">

                        ₹{expense.amount}

                      </h2>

                      <button
                        onClick={() =>
                          deleteExpense(
                            expense.id
                          )
                        }
                        className="bg-red-500/10 border border-red-500/20 p-3 rounded-2xl"
                      >

                        <Trash2 className="text-red-400" />

                      </button>

                    </div>

                  </motion.div>

                )
              )

            ) : (

              <p className="text-gray-500">

                No expenses recorded yet.

              </p>

            )}

          </div>

        </div>

        {/* AI Finance Intelligence */}
        <AIFinancePanel />

      </section>

    </main>
  );
}
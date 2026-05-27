"use client";

import {
  useState,
  useMemo,
} from "react";

import Sidebar from "@/components/Sidebar";

import {
  useLifeOS,
} from "@/context/LifeOSContext";

import {
  motion,
} from "framer-motion";

import {

  Flame,

  Plus,

  Brain,

  CheckCircle2,

  Activity,

  Sparkles,

  Target,

} from "lucide-react";

export default function HabitsPage() {

  const {

    habits,

    setHabits,

    disciplineScore,

  } = useLifeOS();

  // =====================
  // INPUT STATES
  // =====================

  const [
    title,
    setTitle,
  ] = useState("");

  // =====================
  // ADD HABIT
  // =====================

  const addHabit =
    () => {

      if (!title)
        return;

      const newHabit = {

        id:
          Date.now(),

        title,

        streak: 0,

        completed:
          false,

        consistency: 50,
      };

      setHabits([
        newHabit,
        ...habits,
      ]);

      setTitle("");
    };

  // =====================
  // TOGGLE COMPLETE
  // =====================

  const toggleHabit =
    (id: number) => {

      const updated =
        habits.map(
          (
            habit: any
          ) => {

            if (
              habit.id === id
            ) {

              const completed =
                !habit.completed;

              return {

                ...habit,

                completed,

                streak:
                  completed
                    ? habit.streak +
                      1
                    : Math.max(
                        0,
                        habit.streak -
                          1
                      ),

                consistency:
                  completed
                    ? Math.min(
                        100,
                        habit.consistency +
                          5
                      )
                    : Math.max(
                        0,
                        habit.consistency -
                          5
                      ),
              };
            }

            return habit;
          }
        );

      setHabits(
        updated
      );
    };

  // =====================
  // ANALYTICS
  // =====================

  const totalCompleted =
    habits.filter(
      (
        habit: any
      ) =>
        habit.completed
    ).length;

  const avgConsistency =
    useMemo(() => {

      if (
        habits.length ===
        0
      )
        return 0;

      const total =
        habits.reduce(
          (
            acc: number,
            habit: any
          ) =>
            acc +
            habit.consistency,
          0
        );

      return Math.round(
        total /
          habits.length
      );

    }, [habits]);

  // =====================
  // AI INSIGHT
  // =====================

  const aiInsight =
    useMemo(() => {

      if (
        avgConsistency >=
        80
      ) {

        return `
NOVA Analysis:
Behavioral consistency is exceptionally stable.

Execution patterns indicate strong neural reinforcement and disciplined momentum accumulation.
        `;
      }

      if (
        avgConsistency >=
        50
      ) {

        return `
NOVA Analysis:
Behavioral growth is progressing steadily.

Focus on reducing inconsistency and strengthening execution loops.
        `;
      }

      return `
NOVA Analysis:
Behavioral instability detected.

Reduce overload and prioritize sustainable habit reinforcement.
      `;

    }, [
      avgConsistency,
    ]);

  return (
    <main className="flex min-h-screen bg-gradient-to-br from-black via-[#050816] to-black text-white overflow-hidden">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <section className="flex-1 overflow-y-auto p-10">

        {/* HEADER */}
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

            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-orange-400 to-red-500 flex items-center justify-center shadow-[0_0_70px_rgba(249,115,22,0.45)]">

              <Flame className="w-10 h-10 text-white" />

            </div>

            <div>

              <h1 className="text-5xl font-bold">

                Habit Intelligence

              </h1>

              <p className="text-gray-400 mt-2 text-lg">

                Neural reinforcement and behavioral consistency tracking

              </p>

            </div>

          </div>

        </motion.div>

        {/* METRICS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">

          <MetricCard
            icon={Activity}
            title="Discipline"
            value={`${disciplineScore}%`}
            color="text-cyan-300"
          />

          <MetricCard
            icon={CheckCircle2}
            title="Completed"
            value={totalCompleted}
            color="text-green-300"
          />

          <MetricCard
            icon={Target}
            title="Consistency"
            value={`${avgConsistency}%`}
            color="text-orange-300"
          />

          <MetricCard
            icon={Sparkles}
            title="Active Habits"
            value={habits.length}
            color="text-purple-300"
          />

        </div>

        {/* ADD HABIT */}
        <div className="bg-white/5 border border-white/10 rounded-[35px] p-8 backdrop-blur-3xl mb-10">

          <h2 className="text-3xl font-bold mb-8">

            Create Habit Loop

          </h2>

          <div className="flex gap-4">

            <input
              type="text"
              value={title}
              onChange={(e) =>
                setTitle(
                  e.target.value
                )
              }
              placeholder="Enter habit..."
              className="flex-1 bg-black/40 border border-white/10 rounded-2xl px-6 py-5 outline-none text-lg"
            />

            <button
              onClick={
                addHabit
              }
              className="bg-gradient-to-r from-orange-400 to-red-500 px-8 rounded-2xl font-bold flex items-center gap-3"
            >

              <Plus className="w-5 h-5" />

              Create

            </button>

          </div>

        </div>

        {/* HABITS */}
        <div className="space-y-6 mb-10">

          {habits.map(
            (
              habit: any
            ) => (

              <motion.div
                key={habit.id}
                whileHover={{
                  scale: 1.01,
                }}
                className="bg-white/5 border border-white/10 rounded-[35px] p-8 backdrop-blur-3xl"
              >

                <div className="flex items-center justify-between mb-6">

                  <div>

                    <h2 className="text-3xl font-bold">

                      {habit.title}

                    </h2>

                    <p className="text-gray-400 mt-2">

                      Behavioral reinforcement tracking active
                    </p>

                  </div>

                  <button
                    onClick={() =>
                      toggleHabit(
                        habit.id
                      )
                    }
                    className={`px-6 py-3 rounded-2xl font-bold transition-all ${
                      habit.completed
                        ? "bg-green-500"
                        : "bg-white/10"
                    }`}
                  >

                    {habit.completed
                      ? "Completed"
                      : "Mark Done"}

                  </button>

                </div>

                {/* STATS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                  <div className="bg-black/30 rounded-3xl p-6">

                    <p className="text-gray-400 mb-2">

                      Streak

                    </p>

                    <h2 className="text-4xl font-bold text-orange-300">

                      🔥 {habit.streak}

                    </h2>

                  </div>

                  <div className="bg-black/30 rounded-3xl p-6">

                    <p className="text-gray-400 mb-2">

                      Consistency

                    </p>

                    <h2 className="text-4xl font-bold text-cyan-300">

                      {habit.consistency}%

                    </h2>

                  </div>

                </div>

              </motion.div>

            )
          )}

        </div>

        {/* AI INSIGHT */}
        <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-[35px] p-8">

          <div className="flex items-start gap-5">

            <Brain className="w-10 h-10 text-orange-300" />

            <div>

              <h2 className="text-3xl font-bold mb-5">

                NOVA Behavioral Analysis

              </h2>

              <p className="text-gray-300 whitespace-pre-line leading-9 text-lg">

                {aiInsight}

              </p>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}

function MetricCard({
  icon: Icon,
  title,
  value,
  color,
}: any) {

  return (

    <motion.div
      whileHover={{
        scale: 1.03,
      }}
      className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-2xl"
    >

      <Icon className={`w-8 h-8 mb-4 ${color}`} />

      <p className="text-gray-400 mb-2">

        {title}

      </p>

      <h2 className={`text-4xl font-bold ${color}`}>

        {value}

      </h2>

    </motion.div>
  );
}
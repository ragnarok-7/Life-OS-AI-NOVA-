"use client";

import Sidebar from "@/components/Sidebar";

import {
  useLifeOS,
} from "@/context/LifeOSContext";

import {
  motion,
} from "framer-motion";

import {

  Brain,

  Sparkles,

  Activity,

  Target,

  Flame,

  ShieldCheck,

  Rocket,

} from "lucide-react";

export default function OptimizerPage() {

  const {

    tasks,

    meals,

    habits,

    disciplineScore,

    aiMood,

    level,

  } = useLifeOS();

  // =====================
  // ANALYTICS
  // =====================

  const completedHabits =
    habits.filter(
      (
        habit: any
      ) =>
        habit.completed
    ).length;

  const totalProtein =
    meals.reduce(
      (
        acc: number,
        meal: any
      ) =>
        acc +
        (meal.protein || 0),
      0
    );

  // =====================
  // AI DAILY MISSION
  // =====================

  const generateMission =
    () => {

      if (
        disciplineScore >=
        80
      ) {

        return `
MISSION STATUS: ELITE EXECUTION MODE

• Prioritize deep work blocks
• Maintain momentum stability
• Push high-value cognitive tasks
• Preserve recovery balance
• Avoid over-optimization burnout

NOVA Forecast:
High-performance state detected.
        `;
      }

      if (
        disciplineScore >=
        50
      ) {

        return `
MISSION STATUS: STABILIZATION MODE

• Reduce context switching
• Focus on execution consistency
• Complete foundational tasks
• Improve behavioral rhythm

NOVA Forecast:
Momentum recovery in progress.
        `;
      }

      return `
MISSION STATUS: RECOVERY MODE

• Reduce cognitive overload
• Prioritize sleep and nutrition
• Focus on minimal critical tasks
• Restore execution stability

NOVA Forecast:
Burnout prevention protocols recommended.
      `;
    };

  // =====================
  // RECOVERY ANALYSIS
  // =====================

  const recoveryInsight =
    totalProtein >= 100

      ? `
Recovery systems appear stable.

Protein intake and recovery support are currently optimized for sustained performance.
      `

      : `
Recovery support insufficient.

Increase protein intake, hydration consistency, and recovery-focused nutrition.
      `;

  // =====================
  // FOCUS WINDOW
  // =====================

  const focusWindow =
    disciplineScore >= 80

      ? "8 PM - 1 AM"

      : disciplineScore >= 50

      ? "7 PM - 11 PM"

      : "Low intensity recovery focus recommended";

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

            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center shadow-[0_0_70px_rgba(34,211,238,0.45)]">

              <Rocket className="w-10 h-10 text-white" />

            </div>

            <div>

              <h1 className="text-5xl font-bold">

                NOVA Optimizer

              </h1>

              <p className="text-gray-400 mt-2 text-lg">

                Adaptive mission planning and behavioral optimization intelligence

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
            icon={Flame}
            title="Completed Habits"
            value={completedHabits}
            color="text-orange-300"
          />

          <MetricCard
            icon={Target}
            title="Tasks"
            value={tasks.length}
            color="text-green-300"
          />

          <MetricCard
            icon={Sparkles}
            title="Level"
            value={level}
            color="text-purple-300"
          />

        </div>

        {/* MISSION */}
        <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-[35px] p-8 mb-10">

          <div className="flex items-start gap-5">

            <Brain className="w-10 h-10 text-cyan-300" />

            <div>

              <h2 className="text-4xl font-bold mb-6">

                Daily Mission Intelligence

              </h2>

              <p className="text-gray-300 whitespace-pre-line leading-9 text-lg">

                {generateMission()}

              </p>

            </div>

          </div>

        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

          {/* RECOVERY */}
          <div className="bg-white/5 border border-white/10 rounded-[35px] p-8 backdrop-blur-3xl">

            <div className="flex items-center gap-4 mb-6">

              <ShieldCheck className="w-8 h-8 text-green-300" />

              <h2 className="text-3xl font-bold">

                Recovery Intelligence

              </h2>

            </div>

            <p className="text-gray-300 whitespace-pre-line leading-9 text-lg">

              {recoveryInsight}

            </p>

          </div>

          {/* FOCUS WINDOW */}
          <div className="bg-white/5 border border-white/10 rounded-[35px] p-8 backdrop-blur-3xl">

            <div className="flex items-center gap-4 mb-6">

              <Target className="w-8 h-8 text-orange-300" />

              <h2 className="text-3xl font-bold">

                Neural Focus Window

              </h2>

            </div>

            <h2 className="text-5xl font-bold text-orange-300 mb-5">

              {focusWindow}

            </h2>

            <p className="text-gray-400 text-lg leading-8">

              NOVA dynamically adapts cognitive execution windows based on behavioral stability and recovery analytics.

            </p>

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
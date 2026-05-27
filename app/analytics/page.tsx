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

  Activity,

  Flame,

  Wallet,

  TrendingUp,

  ShieldCheck,

  Sparkles,

} from "lucide-react";

import {

  LineChart,

  Line,

  CartesianGrid,

  XAxis,

  YAxis,

  Tooltip,

  ResponsiveContainer,

  PieChart,

  Pie,

  Cell,

  RadarChart,

  PolarGrid,

  PolarAngleAxis,

  PolarRadiusAxis,

  Radar,

} from "recharts";

export default function AnalyticsPage() {

  const {

    disciplineScore,

    meals,

    expenses,

    salary,

    tasks,

    aiMood,

  } = useLifeOS();

  // =====================
  // PRODUCTIVITY DATA
  // =====================

  const productivityData = [

    {
      day: "Mon",
      productivity: 62,
    },

    {
      day: "Tue",
      productivity: 71,
    },

    {
      day: "Wed",
      productivity: 66,
    },

    {
      day: "Thu",
      productivity: 84,
    },

    {
      day: "Fri",
      productivity: disciplineScore,
    },

    {
      day: "Sat",
      productivity: 73,
    },

    {
      day: "Sun",
      productivity: 68,
    },
  ];

  // =====================
  // NUTRITION DATA
  // =====================

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

  const totalCarbs =
    meals.reduce(
      (
        acc: number,
        meal: any
      ) =>
        acc +
        (meal.carbs || 0),
      0
    );

  const totalFats =
    meals.reduce(
      (
        acc: number,
        meal: any
      ) =>
        acc +
        (meal.fats || 0),
      0
    );

  const nutritionData = [

    {
      name: "Protein",
      value: totalProtein,
      color: "#22d3ee",
    },

    {
      name: "Carbs",
      value: totalCarbs,
      color: "#a855f7",
    },

    {
      name: "Fats",
      value: totalFats,
      color: "#f97316",
    },
  ];

  // =====================
  // FINANCE DATA
  // =====================

  const totalExpenses =
    expenses.reduce(
      (
        acc: number,
        item: any
      ) =>
        acc +
        (item.amount || 0),
      0
    );

  const remaining =
    Number(salary) -
    totalExpenses;

  // =====================
  // AI RADAR
  // =====================

  const radarData = [

    {
      subject: "Focus",
      A: disciplineScore,
    },

    {
      subject: "Recovery",
      A:
        totalProtein >= 100
          ? 85
          : 55,
    },

    {
      subject: "Finance",
      A:
        remaining > 0
          ? 78
          : 40,
    },

    {
      subject: "Habits",
      A:
        tasks.length >= 5
          ? 80
          : 50,
    },

    {
      subject: "Energy",
      A:
        meals.length >= 3
          ? 82
          : 58,
    },
  ];

  // =====================
  // AI PREDICTIONS
  // =====================

  const burnoutRisk =
    disciplineScore < 50
      ? "High"
      : disciplineScore < 75
      ? "Moderate"
      : "Low";

  const momentum =
    disciplineScore >= 80
      ? "Rising"
      : "Stable";

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
          className="mb-14"
        >

          <div className="flex items-center gap-5">

            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center shadow-[0_0_70px_rgba(34,211,238,0.45)]">

              <Brain className="w-10 h-10 text-white" />

            </div>

            <div>

              <h1 className="text-5xl font-bold">

                NOVA Analytics

              </h1>

              <p className="text-gray-400 mt-2 text-lg">

                Behavioral intelligence and adaptive optimization metrics

              </p>

            </div>

          </div>

        </motion.div>

        {/* METRICS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">

          <MetricCard
            icon={Activity}
            title="Discipline"
            value={`${disciplineScore}%`}
            color="text-cyan-300"
          />

          <MetricCard
            icon={Wallet}
            title="Remaining"
            value={`₹${remaining}`}
            color="text-green-300"
          />

          <MetricCard
            icon={Flame}
            title="Burnout Risk"
            value={burnoutRisk}
            color="text-orange-300"
          />

          <MetricCard
            icon={Sparkles}
            title="AI Mood"
            value={aiMood}
            color="text-purple-300"
          />

        </div>

        {/* CHARTS */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-10">

          {/* PRODUCTIVITY */}
          <div className="bg-white/5 border border-white/10 rounded-[35px] p-8 backdrop-blur-3xl">

            <h2 className="text-3xl font-bold mb-8">

              Productivity Trend

            </h2>

            <div className="h-[320px]">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <LineChart
                  data={
                    productivityData
                  }
                >

                  <CartesianGrid
                    stroke="rgba(255,255,255,0.08)"
                  />

                  <XAxis
                    dataKey="day"
                    stroke="#888"
                  />

                  <YAxis
                    stroke="#888"
                  />

                  <Tooltip />

                  <Line
                    type="monotone"
                    dataKey="productivity"
                    stroke="#22d3ee"
                    strokeWidth={4}
                  />

                </LineChart>

              </ResponsiveContainer>

            </div>

          </div>

          {/* NUTRITION */}
          <div className="bg-white/5 border border-white/10 rounded-[35px] p-8 backdrop-blur-3xl">

            <h2 className="text-3xl font-bold mb-8">

              Nutrition Breakdown

            </h2>

            <div className="h-[320px]">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <PieChart>

                  <Pie
                    data={
                      nutritionData
                    }
                    dataKey="value"
                    outerRadius={110}
                  >

                    {nutritionData.map(
                      (
                        entry,
                        index
                      ) => (

                        <Cell
                          key={index}
                          fill={
                            entry.color
                          }
                        />

                      )
                    )}

                  </Pie>

                  <Tooltip />

                </PieChart>

              </ResponsiveContainer>

            </div>

          </div>

        </div>

        {/* RADAR + AI */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

          {/* RADAR */}
          <div className="bg-white/5 border border-white/10 rounded-[35px] p-8 backdrop-blur-3xl">

            <h2 className="text-3xl font-bold mb-8">

              Neural Performance Matrix

            </h2>

            <div className="h-[350px]">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <RadarChart
                  data={radarData}
                >

                  <PolarGrid />

                  <PolarAngleAxis
                    dataKey="subject"
                  />

                  <PolarRadiusAxis />

                  <Radar
                    dataKey="A"
                    stroke="#22d3ee"
                    fill="#22d3ee"
                    fillOpacity={0.5}
                  />

                </RadarChart>

              </ResponsiveContainer>

            </div>

          </div>

          {/* AI INSIGHTS */}
          <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-[35px] p-8">

            <div className="flex items-center gap-4 mb-8">

              <ShieldCheck className="w-8 h-8 text-cyan-300" />

              <h2 className="text-3xl font-bold">

                AI Prediction Engine

              </h2>

            </div>

            <div className="space-y-6">

              <InsightCard
                title="Burnout Probability"
                value={burnoutRisk}
                color="text-orange-300"
              />

              <InsightCard
                title="Momentum Forecast"
                value={momentum}
                color="text-cyan-300"
              />

              <InsightCard
                title="Recovery Status"
                value={
                  totalProtein >= 100
                    ? "Stable"
                    : "Needs Optimization"
                }
                color="text-green-300"
              />

              <InsightCard
                title="Behavioral State"
                value={
                  disciplineScore >= 80
                    ? "Optimized"
                    : "Adaptive"
                }
                color="text-purple-300"
              />

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

function InsightCard({
  title,
  value,
  color,
}: any) {

  return (

    <div className="bg-black/30 border border-white/10 rounded-3xl p-6">

      <p className="text-gray-400 mb-2">

        {title}

      </p>

      <h2 className={`text-2xl font-bold ${color}`}>

        {value}

      </h2>

    </div>
  );
}
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
  Sparkles,
  ShieldCheck,
  Cpu,
  Orbit,
  Radio,
  Waves,
  ScanFace,
} from "lucide-react";

export default function CorePage() {

  const context =
    useLifeOS();

  const aiMood =
    context?.aiMood ||
    "neutral";

  const disciplineScore =
    context?.disciplineScore ||
    75;

  const automationFeed =
    context?.automationFeed ||
    [];

  const aiMemories =
    context?.aiMemories ||
    [];

  // =====================
  // AI NODES
  // =====================

  const aiNodes = [

    {
      icon:
        Brain,

      label:
        "Memory Core",

      desc:
        "Persistent neural storage",

      position:
        "top-[18%] left-[50%]",

      iconColor:
        "text-cyan-300",

      glow:
        "bg-cyan-400/30",

      border:
        "border-cyan-500/30",

      labelColor:
        "text-cyan-300",
    },

    {
      icon:
        ShieldCheck,

      label:
        "Behavior Engine",

      desc:
        "Discipline stabilization",

      position:
        "top-[50%] right-[18%]",

      iconColor:
        "text-emerald-300",

      glow:
        "bg-emerald-400/30",

      border:
        "border-emerald-500/30",

      labelColor:
        "text-emerald-300",
    },

    {
      icon:
        Sparkles,

      label:
        "Prediction Layer",

      desc:
        "Future cognition analysis",

      position:
        "bottom-[18%] left-[50%]",

      iconColor:
        "text-purple-300",

      glow:
        "bg-purple-400/30",

      border:
        "border-purple-500/30",

      labelColor:
        "text-purple-300",
    },

    {
      icon:
        Cpu,

      label:
        "Recovery Matrix",

      desc:
        "Adaptive fatigue recovery",

      position:
        "top-[50%] left-[18%]",

      iconColor:
        "text-orange-300",

      glow:
        "bg-orange-400/30",

      border:
        "border-orange-500/30",

      labelColor:
        "text-orange-300",
    },
  ];

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

            <motion.div
              animate={{
                boxShadow: [

                  "0 0 30px rgba(34,211,238,0.4)",

                  "0 0 80px rgba(34,211,238,0.8)",

                  "0 0 30px rgba(34,211,238,0.4)",
                ],
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
              }}
              className="w-20 h-20 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center"
            >

              <Brain className="w-10 h-10 text-white" />

            </motion.div>

            <div>

              <h1 className="text-5xl font-bold">

                NOVA Core

              </h1>

              <p className="text-gray-400 text-lg mt-2">

                Adaptive cognitive orchestration and real-time neural intelligence

              </p>

            </div>

          </div>

        </motion.div>

        {/* MAIN AI VISUAL */}
        <div className="relative h-[760px] mb-20 overflow-hidden rounded-[40px] border border-cyan-500/10 bg-gradient-to-br from-cyan-500/[0.03] to-blue-500/[0.03] backdrop-blur-3xl">

          {/* GRID */}
          <div className="absolute inset-0 opacity-[0.07] bg-[linear-gradient(to_right,#22d3ee_1px,transparent_1px),linear-gradient(to_bottom,#22d3ee_1px,transparent_1px)] bg-[size:80px_80px]" />

          {/* HUGE GLOW */}
          <div className="absolute inset-0 flex items-center justify-center">

            <motion.div
              animate={{
                scale: [1, 1.08, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                repeat: Infinity,
                duration: 4,
              }}
              className="w-[420px] h-[420px] rounded-full bg-cyan-500/10 blur-[120px]"
            />

          </div>

          {/* RADAR SCAN */}
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              repeat: Infinity,
              duration: 10,
              ease: "linear",
            }}
            className="absolute inset-0 flex items-center justify-center"
          >

            <div className="w-[500px] h-[500px] rounded-full border border-cyan-500/10 relative overflow-hidden">

              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent rotate-12 blur-2xl" />

            </div>

          </motion.div>

          {/* CORE */}
          <div className="absolute inset-0 flex items-center justify-center">

            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, 2, -2, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 5,
              }}
              className="relative"
            >

              {/* OUTER RINGS */}
              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  repeat: Infinity,
                  duration: 25,
                  ease: "linear",
                }}
                className="absolute inset-0 w-[320px] h-[320px] -left-[60px] -top-[60px] rounded-full border border-cyan-500/10"
              />

              <motion.div
                animate={{
                  rotate: -360,
                }}
                transition={{
                  repeat: Infinity,
                  duration: 18,
                  ease: "linear",
                }}
                className="absolute inset-0 w-[420px] h-[420px] -left-[110px] -top-[110px] rounded-full border border-cyan-400/10"
              />

              {/* CENTER CORE */}
              <motion.div
                animate={{
                  boxShadow: [

                    "0 0 50px rgba(34,211,238,0.3)",

                    "0 0 120px rgba(34,211,238,0.7)",

                    "0 0 50px rgba(34,211,238,0.3)",
                  ],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                }}
                className="w-[200px] h-[200px] rounded-full bg-gradient-to-br from-cyan-400/20 to-blue-500/20 border border-cyan-500/20 backdrop-blur-3xl flex items-center justify-center relative"
              >

                {/* INNER PULSE */}
                <motion.div
                  animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.4, 0.8, 0.4],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                  }}
                  className="absolute inset-0 rounded-full bg-cyan-400/10 blur-3xl"
                />

                <Brain className="w-24 h-24 text-cyan-300 z-10" />

              </motion.div>

            </motion.div>

          </div>

          {/* CONNECTION LINES */}
          <svg className="absolute inset-0 w-full h-full">

            <line
              x1="50%"
              y1="28%"
              x2="50%"
              y2="40%"
              stroke="rgba(34,211,238,0.2)"
              strokeWidth="1"
            />

            <line
              x1="60%"
              y1="50%"
              x2="72%"
              y2="50%"
              stroke="rgba(34,211,238,0.2)"
              strokeWidth="1"
            />

            <line
              x1="50%"
              y1="60%"
              x2="50%"
              y2="72%"
              stroke="rgba(34,211,238,0.2)"
              strokeWidth="1"
            />

            <line
              x1="28%"
              y1="50%"
              x2="40%"
              y2="50%"
              stroke="rgba(34,211,238,0.2)"
              strokeWidth="1"
            />

          </svg>

          {/* AI NODES */}
          {aiNodes.map(
            (
              node,
              index
            ) => {

              const Icon =
                node.icon;

              return (

                <motion.div
                  key={index}
                  initial={{
                    opacity: 0,
                    scale: 0.8,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: [0, -10, 0],
                  }}
                  transition={{
                    delay:
                      index * 0.2,
                    repeat: Infinity,
                    duration: 4 + index,
                  }}
                  className={`absolute ${node.position} -translate-x-1/2 -translate-y-1/2 group`}
                >

                  {/* NODE */}
                  <motion.div
                    whileHover={{
                      scale: 1.12,
                    }}
                    className="relative"
                  >

                    {/* GLOW */}
                    <div className={`absolute inset-0 ${node.glow} blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500`} />

                    {/* BOX */}
                    <div className={`relative w-[92px] h-[92px] rounded-3xl border ${node.border} bg-black/40 backdrop-blur-2xl flex items-center justify-center`}>

                      <Icon className={`w-10 h-10 ${node.iconColor}`} />

                    </div>

                    {/* HUD LABEL */}
                    <div className="absolute top-1/2 left-[120px] -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">

                      <div className={`bg-black/80 border ${node.border} backdrop-blur-2xl rounded-2xl px-5 py-4 whitespace-nowrap`}>

                        <h2 className={`${node.labelColor} font-bold text-sm mb-1`}>

                          {node.label}

                        </h2>

                        <p className="text-gray-400 text-xs">

                          {node.desc}

                        </p>

                      </div>

                    </div>

                  </motion.div>

                </motion.div>

              );
            }
          )}

          {/* FLOATING TECH ICONS */}
          <motion.div
            animate={{
              y: [-10, 10, -10],
            }}
            transition={{
              repeat: Infinity,
              duration: 4,
            }}
            className="absolute top-20 left-24"
          >

            <Radio className="w-6 h-6 text-cyan-300/70" />

          </motion.div>

          <motion.div
            animate={{
              y: [10, -10, 10],
            }}
            transition={{
              repeat: Infinity,
              duration: 5,
            }}
            className="absolute bottom-24 right-24"
          >

            <Waves className="w-6 h-6 text-purple-300/70" />

          </motion.div>

          <motion.div
            animate={{
              y: [-8, 8, -8],
            }}
            transition={{
              repeat: Infinity,
              duration: 6,
            }}
            className="absolute top-1/2 left-24"
          >

            <ScanFace className="w-6 h-6 text-blue-300/70" />

          </motion.div>

        </div>

        {/* METRICS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">

          <MetricCard
            icon={
              Brain
            }
            title="AI Mood"
            value={aiMood}
            color="text-cyan-300"
          />

          <MetricCard
            icon={
              Activity
            }
            title="Discipline"
            value={`${disciplineScore}%`}
            color="text-green-300"
          />

          <MetricCard
            icon={
              Sparkles
            }
            title="Live AI Events"
            value={
              automationFeed.length
            }
            color="text-purple-300"
          />

          <MetricCard
            icon={
              ShieldCheck
            }
            title="AI Memories"
            value={
              aiMemories.length
            }
            color="text-orange-300"
          />

        </div>

        {/* LIVE ORCHESTRATION */}
        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8">

          <div className="flex items-center gap-4 mb-8">

            <Orbit className="w-8 h-8 text-cyan-300" />

            <h2 className="text-3xl font-bold">

              Live Neural Orchestration

            </h2>

          </div>

          <div className="space-y-5">

            {(automationFeed || [])
              .slice(0, 5)
              .map(
                (
                  item: any,
                  index: number
                ) => (

                  <motion.div
                    key={item.id}
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
                        index * 0.05,
                    }}
                    whileHover={{
                      scale: 1.01,
                    }}
                    className="bg-black/30 border border-white/10 rounded-2xl p-5"
                  >

                    <div className="flex items-center justify-between mb-2">

                      <h2 className="text-xl font-bold text-cyan-300">

                        {item.type}

                      </h2>

                      <p className="text-gray-500 text-sm">

                        {item.time}

                      </p>

                    </div>

                    <p className="text-gray-300 text-lg">

                      {item.message}

                    </p>

                  </motion.div>

                )
              )}

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
      className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6"
    >

      <Icon className={`w-8 h-8 mb-4 ${color}`} />

      <p className="text-gray-400 mb-2">

        {title}

      </p>

      <h2 className={`text-4xl font-bold capitalize ${color}`}>

        {value}

      </h2>

    </motion.div>
  );
}
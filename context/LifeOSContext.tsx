"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

const LifeOSContext =
  createContext<any>(null);

export function LifeOSProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  // =====================
  // PRODUCTIVITY
  // =====================

  const [
    tasks,
    setTasks,
  ] = useState<any[]>([]);

  const [
    expenses,
    setExpenses,
  ] = useState<any[]>([]);

  const [
    memories,
    setMemories,
  ] = useState<any[]>([]);

  const [
    conversations,
    setConversations,
  ] = useState<any[]>([]);

  const [
    habits,
    setHabits,
  ] = useState<any[]>([]);

  // =====================
  // FINANCE
  // =====================

  const [
    salary,
    setSalary,
  ] = useState("");

  // =====================
  // NUTRITION
  // =====================

  const [
    meals,
    setMeals,
  ] = useState<any[]>([]);

  const [
    nutritionGoals,
    setNutritionGoals,
  ] = useState({

    calories: 2200,

    protein: 120,

    carbs: 250,

    fats: 70,

    monthlyBudget: 4000,
  });

  // =====================
  // DISCIPLINE
  // =====================

  const [
    disciplineScore,
    setDisciplineScore,
  ] = useState(75);

  // =====================
  // AI STATES
  // =====================

  const [
    aiSpeaking,
    setAiSpeaking,
  ] = useState(false);

  const [
    aiListening,
    setAiListening,
  ] = useState(false);

  const [
    aiMood,
    setAiMood,
  ] = useState<
    | "neutral"
    | "happy"
    | "calm"
    | "concerned"
    | "excited"
  >("neutral");

  // =====================
  // AI AUTOMATION
  // =====================

  const [
    automationFeed,
    setAutomationFeed,
  ] = useState<any[]>([]);

  // =====================
  // PERSONALITY CORE
  // =====================

  const [
    personalityProfile,
    setPersonalityProfile,
  ] = useState({

    communicationStyle:
      "Adaptive",

    productivityPattern:
      "Evening Focused",

    recoveryPattern:
      "Moderate",

    behaviorTrend:
      "Improving",

    emotionalState:
      "Stable",

    aiPersonality:
      "Calm Strategic",

    preferredFocusWindow:
      "8 PM - 12 AM",

    preferredSleepWindow:
      "12 AM - 7 AM",
  });

  // =====================
  // AI MEMORY
  // =====================

  const [
    aiMemories,
    setAiMemories,
  ] = useState<any[]>([]);

  // =====================
  // PROGRESSION SYSTEM
  // =====================

  const [
    xp,
    setXp,
  ] = useState(0);

  const [
    level,
    setLevel,
  ] = useState(1);

  const [
    achievements,
    setAchievements,
  ] = useState<any[]>([]);

  // =====================
  // AI AGENTS
  // =====================

  const [
    agentRecommendations,
    setAgentRecommendations,
  ] = useState<any[]>([]);

  // =====================
  // LOAD LOCAL STORAGE
  // =====================

  useEffect(() => {

    if (
      typeof window ===
      "undefined"
    )
      return;

    const savedData =
      localStorage.getItem(
        "lifeos-data"
      );

    if (
      savedData
    ) {

      try {

        const parsed =
          JSON.parse(
            savedData
          );

        setTasks(
          parsed.tasks || []
        );

        setExpenses(
          parsed.expenses || []
        );

        setMemories(
          parsed.memories || []
        );

        setConversations(
          parsed.conversations || []
        );

        setHabits(
          parsed.habits || []
        );

        setSalary(
          parsed.salary || ""
        );

        setMeals(
          parsed.meals || []
        );

        setNutritionGoals(
          parsed.nutritionGoals || {

            calories: 2200,

            protein: 120,

            carbs: 250,

            fats: 70,

            monthlyBudget: 4000,
          }
        );

        setDisciplineScore(
          parsed.disciplineScore ||
            75
        );

        setAutomationFeed(
          parsed.automationFeed ||
            []
        );

        setPersonalityProfile(
          parsed.personalityProfile || {

            communicationStyle:
              "Adaptive",

            productivityPattern:
              "Evening Focused",

            recoveryPattern:
              "Moderate",

            behaviorTrend:
              "Improving",

            emotionalState:
              "Stable",

            aiPersonality:
              "Calm Strategic",

            preferredFocusWindow:
              "8 PM - 12 AM",

            preferredSleepWindow:
              "12 AM - 7 AM",
          }
        );

        setAiMemories(
          parsed.aiMemories ||
            []
        );

        setAiMood(
          parsed.aiMood ||
            "neutral"
        );

        setXp(
          parsed.xp || 0
        );

        setLevel(
          parsed.level || 1
        );

        setAchievements(
          parsed.achievements || []
        );

        setAgentRecommendations(
            parsed.agentRecommendations || []
        );

      } catch (
        error
      ) {

        console.log(
          "Storage load error:",
          error
        );
      }
    }

  }, []);

  // =====================
  // SAVE LOCAL STORAGE
  // =====================

  useEffect(() => {

    if (
      typeof window ===
      "undefined"
    )
      return;

    const data = {

      tasks,

      expenses,

      memories,

      conversations,

      habits,

      salary,

      meals,

      nutritionGoals,

      disciplineScore,

      automationFeed,

      personalityProfile,

      aiMemories,

      aiMood,

      xp,

      level,

      achievements,

      agentRecommendations,
    };

    localStorage.setItem(
      "lifeos-data",
      JSON.stringify(
        data
      )
    );

  }, [

    tasks,

    expenses,

    memories,

    conversations,

    habits,

    salary,

    meals,

    nutritionGoals,

    disciplineScore,

    automationFeed,

    personalityProfile,

    aiMemories,

    aiMood,

    xp,

    level,

    achievements,
  ]);

  // =====================
  // XP ENGINE
  // =====================

  useEffect(() => {

    let calculatedXP =
      0;

    // TASKS
    calculatedXP +=
      tasks.length * 15;

    // HABITS
    calculatedXP +=
      habits.filter(
        (
          habit: any
        ) =>
          habit.completed
      ).length * 10;

    // MEALS
    calculatedXP +=
      meals.length * 8;

    // DISCIPLINE
    calculatedXP +=
      disciplineScore * 2;

    // LEVEL
    const calculatedLevel =
      Math.max(
        1,
        Math.floor(
          calculatedXP /
            100
        ) + 1
      );

    setXp(
      calculatedXP
    );

    setLevel(
      calculatedLevel
    );

    // =====================
    // ACHIEVEMENTS
    // =====================

    const unlocked =
      [];

    if (
      tasks.length >= 10
    ) {

      unlocked.push({

        id: 1,

        title:
          "Task Conqueror",

        desc:
          "Completed 10+ tasks",

        icon:
          "⚡",
      });
    }

    if (
      disciplineScore >=
      80
    ) {

      unlocked.push({

        id: 2,

        title:
          "Discipline Master",

        desc:
          "Reached elite discipline state",

        icon:
          "🔥",
      });
    }

    if (
      habits.length >= 5
    ) {

      unlocked.push({

        id: 3,

        title:
          "Habit Architect",

        desc:
          "Built 5 behavioral systems",

        icon:
          "🧠",
      });
    }

    if (
      meals.length >= 10
    ) {

      unlocked.push({

        id: 4,

        title:
          "Recovery Optimized",

        desc:
          "Maintained strong nutrition tracking",

        icon:
          "🥗",
      });
    }

    if (
      calculatedLevel >=
      10
    ) {

      unlocked.push({

        id: 5,

        title:
          "NOVA Strategist",

        desc:
          "Reached Level 10",

        icon:
          "🚀",
      });
    }

    setAchievements(
      unlocked
    );

  }, [

    tasks,

    habits,

    meals,

    disciplineScore,
  ]);

  // =====================
  // AI ACTIVITY ENGINE
  // =====================

  useEffect(() => {

    const generatedFeed =
      [];

    // PRODUCTIVITY

    if (
      tasks.length >= 5
    ) {

      generatedFeed.push({

        id:
          Date.now(),

        type:
          "Productivity Insight",

        message:
          "High workload detected. Deep work capacity remains stable under elevated task pressure.",

        time:
          "Now",
      });
    }

    if (
      tasks.length === 0
    ) {

      generatedFeed.push({

        id:
          Date.now() + 1,

        type:
          "Focus Alert",

        message:
          "No active tasks detected. Structured execution planning recommended.",

        time:
          "Now",
      });
    }

    // NUTRITION

    const totalProtein =
      meals.reduce(
        (
          acc: number,
          meal: any
        ) =>
          acc +
          (meal.protein ||
            0),
        0
      );

    const totalCalories =
      meals.reduce(
        (
          acc: number,
          meal: any
        ) =>
          acc +
          (meal.calories ||
            0),
        0
      );

    if (
      totalProtein <
      nutritionGoals.protein *
        0.7
    ) {

      generatedFeed.push({

        id:
          Date.now() + 2,

        type:
          "Recovery Warning",

        message:
          "Protein intake below optimal recovery threshold. Muscle recovery efficiency may decline.",

        time:
          "Now",
      });
    }

    if (
      totalCalories <
      nutritionGoals.calories *
        0.7
    ) {

      generatedFeed.push({

        id:
          Date.now() + 3,

        type:
          "Energy Alert",

        message:
          "Calorie intake significantly below target. Cognitive stability may decrease over time.",

        time:
          "Now",
      });
    }

    // HABITS

    if (
      habits.length >= 3
    ) {

      generatedFeed.push({

        id:
          Date.now() + 4,

        type:
          "Behavior Analysis",

        message:
          "Habit consistency improving. Behavioral discipline trend appears stable.",

        time:
          "Now",
      });
    }

    // DISCIPLINE

    if (
      disciplineScore >=
      80
    ) {

      generatedFeed.push({

        id:
          Date.now() + 5,

        type:
          "Momentum State",

        message:
          "Execution momentum elevated. Current behavioral trajectory is highly optimized.",

        time:
          "Now",
      });

      setAiMood(
        "excited"
      );

    } else if (
      disciplineScore <
      50
    ) {

      generatedFeed.push({

        id:
          Date.now() + 6,

        type:
          "Burnout Risk",

        message:
          "Discipline stability weakening. Recovery prioritization strongly recommended.",

        time:
          "Now",
      });

      setAiMood(
        "concerned"
      );

    } else {

      setAiMood(
        "calm"
      );
    }

    // FINANCE

    const totalExpenses =
      expenses.reduce(
        (
          acc: number,
          item: any
        ) =>
          acc +
          (item.amount ||
            0),
        0
      );

    if (
      Number(salary) >
        0 &&
      totalExpenses >
        Number(
          salary
        ) *
          0.8
    ) {

      generatedFeed.push({

        id:
          Date.now() + 7,

        type:
          "Finance Alert",

        message:
          "Expense ratio approaching critical threshold. Spending optimization recommended.",

        time:
          "Now",
      });
    }

    // AI MEMORY

    const generatedMemories: {
      id: number;
      memory: string;
      type: string;
    }[]
    =
      [];

    if (
      tasks.length >= 5
    ) {

      generatedMemories.push({

        id:
          Date.now() + 8,

        type:
          "Productivity",

        memory:
          "User demonstrates sustained execution during high workload periods.",
      });
    }

    if (
      meals.length >= 3
    ) {

      generatedMemories.push({

        id:
          Date.now() + 9,

        type:
          "Nutrition",

        memory:
          "Meal consistency positively correlates with recovery stability.",
      });
    }

    if (
      habits.length >= 3
    ) {

      generatedMemories.push({

        id:
          Date.now() + 10,

        type:
          "Behavior",

        memory:
          "Habit execution consistency has improved behavioral resilience.",
      });
    }

    if (
      generatedMemories.length >
      0
    ) {

      setAiMemories(
        (
          prev: any[]
        ) => [

          ...generatedMemories,

          ...prev,
        ].slice(0, 25)
      );
    }

    // PERSONALITY ENGINE

    if (
      disciplineScore >=
      80
    ) {

      setPersonalityProfile(
        (
          prev: any
        ) => ({

          ...prev,

          behaviorTrend:
            "High Momentum",

          aiPersonality:
            "Strategic Motivator",
        })
      );

    } else if (
      disciplineScore <
      50
    ) {

      setPersonalityProfile(
        (
          prev: any
        ) => ({

          ...prev,

          behaviorTrend:
            "Recovery Needed",

          aiPersonality:
            "Supportive Recovery Coach",
        })
      );

    } else {

      setPersonalityProfile(
        (
          prev: any
        ) => ({

          ...prev,

          behaviorTrend:
            "Stable Growth",

          aiPersonality:
            "Calm Strategic",
        })
      );
    }

    // UPDATE FEED

    setAutomationFeed(
      generatedFeed.slice(
        0,
        12
      )
    );

  }, [

    tasks,

    meals,

    habits,

    expenses,

    salary,

    disciplineScore,

    nutritionGoals,
  ]);

  return (
    <LifeOSContext.Provider
      value={{

        // PRODUCTIVITY
        tasks,
        setTasks,

        expenses,
        setExpenses,

        memories,
        setMemories,

        conversations,
        setConversations,

        habits,
        setHabits,

        // FINANCE
        salary,
        setSalary,

        // NUTRITION
        meals,
        setMeals,

        nutritionGoals,
        setNutritionGoals,

        // DISCIPLINE
        disciplineScore,
        setDisciplineScore,

        // AI
        aiSpeaking,
        setAiSpeaking,

        aiListening,
        setAiListening,

        aiMood,
        setAiMood,

        // AUTOMATION
        automationFeed,
        setAutomationFeed,

        // PERSONALITY
        personalityProfile,
        setPersonalityProfile,

        aiMemories,
        setAiMemories,

        // PROGRESSION
        xp,
        setXp,

        level,
        setLevel,

        achievements,
        setAchievements,
      }}
    >

      {children}

    </LifeOSContext.Provider>
  );
}

export const useLifeOS =
  () =>
    useContext(
      LifeOSContext
    );
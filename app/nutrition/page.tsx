"use client";

import {
  useState,
  useMemo,
  useEffect,
} from "react";

import Sidebar from "@/components/Sidebar";

import {
  useLifeOS,
} from "@/context/LifeOSContext";

import {
  motion,
} from "framer-motion";

import {
  UtensilsCrossed,
  Plus,
  Brain,
  DollarSign,
  Flame,
  Beef,
  Wheat,
  Droplets,
  Sparkles,
  Scale,
} from "lucide-react";

export default function NutritionPage() {

  const {
    meals,
    setMeals,
    nutritionGoals,
    salary,
  } = useLifeOS();

  // =====================
  // INPUT STATES
  // =====================

  const [
    mealName,
    setMealName,
  ] = useState("");

  const [
    mealTime,
    setMealTime,
  ] = useState("");

  const [
    weight,
    setWeight,
  ] = useState("");

  const [
    calories,
    setCalories,
  ] = useState("");

  const [
    protein,
    setProtein,
  ] = useState("");

  const [
    carbs,
    setCarbs,
  ] = useState("");

  const [
    fats,
    setFats,
  ] = useState("");

  // =====================
  // FOOD DATABASE
  // PER 100g
  // =====================

  const foodDatabase: any = {

    chicken: {
      calories: 165,
      protein: 31,
      carbs: 0,
      fats: 3.6,
    },

    egg: {
      calories: 155,
      protein: 13,
      carbs: 1.1,
      fats: 11,
    },

    rice: {
      calories: 130,
      protein: 2.7,
      carbs: 28,
      fats: 0.3,
    },

    paneer: {
      calories: 265,
      protein: 18,
      carbs: 3,
      fats: 20,
    },

    oats: {
      calories: 389,
      protein: 17,
      carbs: 66,
      fats: 7,
    },

    milk: {
      calories: 42,
      protein: 3.4,
      carbs: 5,
      fats: 1,
    },

    banana: {
      calories: 89,
      protein: 1.1,
      carbs: 23,
      fats: 0.3,
    },

    dal: {
      calories: 116,
      protein: 9,
      carbs: 20,
      fats: 0.4,
    },

    soy: {
      calories: 173,
      protein: 18,
      carbs: 10,
      fats: 9,
    },

    peanut: {
      calories: 567,
      protein: 25,
      carbs: 16,
      fats: 49,
    },
  };

  // =====================
  // AI ESTIMATION
  // =====================

  const estimateNutrition =
    (
      food: string,
      grams: number
    ) => {

      const lower =
        food.toLowerCase();

      let matchedFood =
        null;

      Object.keys(
        foodDatabase
      ).forEach((item) => {

        if (
          lower.includes(item)
        ) {

          matchedFood =
            item;
        }
      });

      if (
        !matchedFood
      ) {

        return {
          calories: 0,
          protein: 0,
          carbs: 0,
          fats: 0,
        };
      }

      const base =
        foodDatabase[
          matchedFood
        ];

      const multiplier =
        grams / 100;

      return {

        calories:
          Math.round(
            base.calories *
              multiplier
          ),

        protein:
          Math.round(
            base.protein *
              multiplier
          ),

        carbs:
          Math.round(
            base.carbs *
              multiplier
          ),

        fats:
          Math.round(
            base.fats *
              multiplier
          ),
      };
    };

  // =====================
  // AUTO FILL AI VALUES
  // =====================

  useEffect(() => {

    if (
      mealName &&
      weight
    ) {

      const estimated =
        estimateNutrition(
          mealName,
          Number(weight)
        );

      setCalories(
        String(
          estimated.calories
        )
      );

      setProtein(
        String(
          estimated.protein
        )
      );

      setCarbs(
        String(
          estimated.carbs
        )
      );

      setFats(
        String(
          estimated.fats
        )
      );
    }

  }, [
    mealName,
    weight,
  ]);

  // =====================
  // ADD MEAL
  // =====================

  const addMeal =
    () => {

      if (
        !mealName ||
        !mealTime
      )
        return;

      const newMeal = {

        id: Date.now(),

        mealName,

        mealTime,

        weight,

        calories:
          Number(
            calories
          ) || 0,

        protein:
          Number(
            protein
          ) || 0,

        carbs:
          Number(
            carbs
          ) || 0,

        fats:
          Number(
            fats
          ) || 0,
      };

      setMeals([
        newMeal,
        ...meals,
      ]);

      setMealName("");
      setMealTime("");
      setWeight("");
      setCalories("");
      setProtein("");
      setCarbs("");
      setFats("");
    };

  // =====================
  // TOTALS
  // =====================

  const totals =
    useMemo(() => {

      return meals.reduce(
        (
          acc: any,
          meal: any
        ) => {

          acc.calories +=
            meal.calories;

          acc.protein +=
            meal.protein;

          acc.carbs +=
            meal.carbs;

          acc.fats +=
            meal.fats;

          return acc;

        },
        {
          calories: 0,
          protein: 0,
          carbs: 0,
          fats: 0,
        }
      );

    }, [meals]);

  // =====================
  // AI INSIGHT
  // =====================

  const aiInsight =
    useMemo(() => {

      if (
        totals.protein <
        nutritionGoals.protein *
          0.7
      ) {

        return `
Protein intake appears lower than your target today.

NOVA recommends:
• eggs
• soy chunks
• paneer
• curd
• chicken
        `;
      }

      if (
        totals.calories <
        nutritionGoals.calories *
          0.7
      ) {

        return `
Calorie intake appears lower than your target.

Low calorie intake may negatively impact:
• gym recovery
• cognitive focus
• productivity stability
        `;
      }

      return `
Nutrition intake appears balanced today.

NOVA recommends:
• hydration optimization
• balanced meal timing
• maintaining recovery nutrition consistency
      `;

    }, [
      totals,
      nutritionGoals,
    ]);

  // =====================
  // BUDGET INSIGHT
  // =====================

  const budgetAdvice =
    useMemo(() => {

      const budget =
        nutritionGoals.monthlyBudget;

      if (
        budget < 3000
      ) {

        return `
Budget is restrictive.

Affordable protein sources:
• eggs
• soy chunks
• peanuts
• curd
• dal combinations
        `;
      }

      if (
        budget < 6000
      ) {

        return `
Your current budget supports moderate-quality nutrition.

Increasing budget by ₹1000–₹1500/month may significantly improve:
• recovery
• protein quality
• micronutrients
        `;
      }

      return `
Your budget can support high-quality optimized nutrition and recovery planning.
      `;

    }, [
      nutritionGoals,
      salary,
    ]);

  return (
    <main className="flex min-h-screen bg-gradient-to-br from-black via-[#0f172a] to-black text-white overflow-hidden">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <section className="flex-1 p-10 overflow-y-auto">

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
          className="mb-10"
        >

          <div className="flex items-center gap-5">

            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-orange-400 to-red-500 flex items-center justify-center shadow-2xl shadow-orange-500/30">

              <UtensilsCrossed className="w-10 h-10 text-white" />

            </div>

            <div>

              <h1 className="text-5xl font-bold">

                Nutrition Intelligence

              </h1>

              <p className="text-gray-400 mt-2 text-lg">

                AI-powered meal optimization and recovery analysis

              </p>

            </div>

          </div>

        </motion.div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
            <Flame className="text-orange-300 mb-4 w-8 h-8" />
            <p className="text-gray-400 mb-2">Calories</p>
            <h2 className="text-4xl font-bold text-orange-300">
              {totals.calories}
            </h2>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
            <Beef className="text-red-300 mb-4 w-8 h-8" />
            <p className="text-gray-400 mb-2">Protein</p>
            <h2 className="text-4xl font-bold text-red-300">
              {totals.protein}g
            </h2>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
            <Wheat className="text-yellow-300 mb-4 w-8 h-8" />
            <p className="text-gray-400 mb-2">Carbs</p>
            <h2 className="text-4xl font-bold text-yellow-300">
              {totals.carbs}g
            </h2>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
            <Droplets className="text-cyan-300 mb-4 w-8 h-8" />
            <p className="text-gray-400 mb-2">Fats</p>
            <h2 className="text-4xl font-bold text-cyan-300">
              {totals.fats}g
            </h2>
          </div>

        </div>

        {/* ADD MEAL */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 mb-10">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">

            <input
              type="text"
              placeholder="Meal name"
              value={mealName}
              onChange={(e) =>
                setMealName(
                  e.target.value
                )
              }
              className="bg-black/30 border border-white/10 rounded-2xl px-5 py-4 outline-none"
            />

            <input
              type="time"
              value={mealTime}
              onChange={(e) =>
                setMealTime(
                  e.target.value
                )
              }
              className="bg-black/30 border border-white/10 rounded-2xl px-5 py-4 outline-none"
            />

            <div className="relative">

              <Scale className="absolute left-4 top-4 text-gray-500 w-5 h-5" />

              <input
                type="number"
                placeholder="Weight (grams)"
                value={weight}
                onChange={(e) =>
                  setWeight(
                    e.target.value
                  )
                }
                className="w-full bg-black/30 border border-white/10 rounded-2xl pl-12 pr-5 py-4 outline-none"
              />

            </div>

            <input
              type="number"
              placeholder="Calories"
              value={calories}
              onChange={(e) =>
                setCalories(
                  e.target.value
                )
              }
              className="bg-black/30 border border-white/10 rounded-2xl px-5 py-4 outline-none"
            />

            <input
              type="number"
              placeholder="Protein (g)"
              value={protein}
              onChange={(e) =>
                setProtein(
                  e.target.value
                )
              }
              className="bg-black/30 border border-white/10 rounded-2xl px-5 py-4 outline-none"
            />

            <input
              type="number"
              placeholder="Carbs (g)"
              value={carbs}
              onChange={(e) =>
                setCarbs(
                  e.target.value
                )
              }
              className="bg-black/30 border border-white/10 rounded-2xl px-5 py-4 outline-none"
            />

            <input
              type="number"
              placeholder="Fats (g)"
              value={fats}
              onChange={(e) =>
                setFats(
                  e.target.value
                )
              }
              className="bg-black/30 border border-white/10 rounded-2xl px-5 py-4 outline-none"
            />

          </div>

          <button
            onClick={addMeal}
            className="bg-gradient-to-r from-orange-400 to-red-500 px-8 py-4 rounded-2xl font-bold flex items-center gap-3"
          >

            <Plus className="w-5 h-5" />

            Add Meal

          </button>

        </div>

      </section>

    </main>
  );
}
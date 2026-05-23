"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Mic,
  MicOff,
  Volume2,
  Radio,
  Sparkles,
} from "lucide-react";

import { motion } from "framer-motion";

import {
  useLifeOS,
} from "@/context/LifeOSContext";

declare global {
  interface Window {
    webkitSpeechRecognition: any;
  }
}

export default function NovaVoiceAgent() {

  const {
    tasks,
    expenses,
    memories,
    settings,
  } = useLifeOS();

  const [
    listening,
    setListening,
  ] = useState(false);

  const [
    ambientMode,
    setAmbientMode,
  ] = useState(false);

  const [
    transcript,
    setTranscript,
  ] = useState("");

  const [
    activated,
    setActivated,
  ] = useState(false);

  const [
    aiResponse,
    setAiResponse,
  ] = useState("");

  const recognitionRef =
    useRef<any>(null);

  const timeoutRef =
    useRef<any>(null);

  // IMPORTANT
  const activatedRef =
    useRef(false);

  // =====================
  // CLEANUP
  // =====================

  const cleanupRecognition =
    () => {

      if (
        recognitionRef.current
      ) {

        recognitionRef.current.onend =
          null;

        recognitionRef.current.stop();

        recognitionRef.current =
          null;
      }
    };

  // =====================
  // SESSION TIMER
  // =====================

  const resetSessionTimer =
    () => {

      clearTimeout(
        timeoutRef.current
      );

      timeoutRef.current =
        setTimeout(() => {

          activatedRef.current =
            false;

          setActivated(false);

          speak(
            "Session ended. Returning to standby mode."
          );

        }, 45000);
    };

  // =====================
  // SPEAK
  // =====================

  const speak = (
    text: string
  ) => {

    if (
      !settings.aiVoice
    )
      return;

    speechSynthesis.cancel();

    setAiResponse(text);

    const utterance =
      new SpeechSynthesisUtterance(
        text
      );

    utterance.rate = 1;

    utterance.pitch = 1;

    utterance.volume = 1;

    utterance.onstart =
      () => {

        cleanupRecognition();

        setListening(false);
      };

    utterance.onend =
      () => {

        if (
          ambientMode
        ) {

          setTimeout(() => {

            startListening();

          }, 500);
        }
      };

    speechSynthesis.speak(
      utterance
    );
  };

  // =====================
  // AI RESPONSE ENGINE
  // =====================

  const generateResponse =
    (
      input: string
    ) => {

      const lower =
        input.toLowerCase();

      const completedTasks =
        tasks.filter(
          (task: any) =>
            task.completed
        ).length;

      const pendingTasks =
        tasks.length -
        completedTasks;

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

      // Productivity
      if (
        lower.includes(
          "productivity"
        )
      ) {

        return `You currently have ${completedTasks} completed tasks and ${pendingTasks} pending tasks. ${
          pendingTasks >= 5
            ? "Your workload appears overloaded."
            : "Your productivity balance appears stable."
        }`;
      }

      // Finance
      if (
        lower.includes(
          "finance"
        ) ||
        lower.includes(
          "money"
        ) ||
        lower.includes(
          "spending"
        )
      ) {

        return `Your total tracked spending is ₹${totalExpenses}. ${
          totalExpenses > 7000
            ? "Spending trends are increasing rapidly."
            : "Financial behavior appears stable."
        }`;
      }

      // Burnout
      if (
        lower.includes(
          "stress"
        ) ||
        lower.includes(
          "burnout"
        )
      ) {

        return pendingTasks >= 5
          ? "Burnout risk appears elevated due to workload pressure."
          : "Stress indicators appear manageable.";
      }

      // Memory
      if (
        lower.includes(
          "memory"
        ) ||
        lower.includes(
          "behavior"
        )
      ) {

        return memories.length > 0
          ? memories.join(". ")
          : "Behavioral memory systems are still learning.";
      }

      return "I am continuously optimizing your productivity, routines, and behavioral systems.";
    };

  // =====================
  // START LISTENING
  // =====================

  const startListening =
    () => {

      const SpeechRecognition =
        window
          .webkitSpeechRecognition;

      if (
        !SpeechRecognition
      ) {

        alert(
          "Speech recognition not supported."
        );

        return;
      }

      cleanupRecognition();

      const recognition =
        new SpeechRecognition();

      recognition.continuous =
        true;

      recognition.interimResults =
        false;

      recognition.lang =
        "en-US";

      recognition.onstart =
        () => {

          setListening(true);
        };

      recognition.onresult =
        (
          event: any
        ) => {

          const text =
            event.results[
              event.results
                .length - 1
            ][0].transcript;

          setTranscript(text);

          const lower =
            text.toLowerCase();

          console.log(
            "VOICE INPUT:",
            lower
          );

          // =====================
          // WAKE WORD
          // =====================

          if (
            lower.includes(
              "hey nova"
            )
          ) {

            activatedRef.current =
              true;

            setActivated(true);

            resetSessionTimer();

            speak(
              "Yes. I'm listening."
            );

            return;
          }

          // =====================
          // ACTIVE SESSION
          // =====================

          if (
            activatedRef.current
          ) {

            resetSessionTimer();

            const response =
              generateResponse(
                text
              );

            speak(response);
          }
        };

      recognition.onerror =
        (
          event: any
        ) => {

          console.log(
            "Speech error:",
            event.error
          );
        };

      recognition.onend =
        () => {

          setListening(false);

          if (
            ambientMode &&
            !speechSynthesis.speaking
          ) {

            setTimeout(() => {

              startListening();

            }, 700);
          }
        };

      recognition.start();

      recognitionRef.current =
        recognition;
    };

  // =====================
  // STOP
  // =====================

  const stopListening =
    () => {

      cleanupRecognition();

      speechSynthesis.cancel();

      activatedRef.current =
        false;

      setListening(false);

      setAmbientMode(false);

      setActivated(false);
    };

  // =====================
  // AUTO START
  // =====================

  useEffect(() => {

    if (
      ambientMode
    ) {

      startListening();
    }

    return () => {

      cleanupRecognition();
    };

  }, [
    ambientMode,
  ]);

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 overflow-hidden relative">

      {/* Background */}
      <motion.div
        animate={{
          opacity: activated
            ? [0.2, 0.5, 0.2]
            : 0.1,
          scale: activated
            ? [1, 1.12, 1]
            : 1,
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
        className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-3xl"
      />

      <div className="relative z-10">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">

          <div>

            <h2 className="text-3xl font-bold text-white">

              NOVA Voice Core

            </h2>

            <p className="text-gray-400 mt-2">

              Adaptive conversational AI system

            </p>

          </div>

          <Volume2 className="text-cyan-400 w-10 h-10" />

        </div>

        {/* Orb */}
        <div className="flex justify-center mb-8">

          <motion.div
            animate={{
              scale: listening
                ? [1, 1.12, 1]
                : 1,
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="w-44 h-44 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center"
          >

            {listening ? (

              <Mic className="text-white w-20 h-20" />

            ) : (

              <MicOff className="text-white w-20 h-20" />

            )}

          </motion.div>

        </div>

        {/* Transcript */}
        <div className="bg-black/30 border border-white/10 rounded-2xl p-5 mb-4 min-h-[120px]">

          <p className="text-gray-300 leading-8 text-lg">

            {transcript ||
              "Say 'Hey Nova'..."}

          </p>

        </div>

        {/* AI Response */}
        <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-2xl p-5 mb-6 min-h-[140px]">

          <div className="flex items-start gap-3">

            <Sparkles className="text-cyan-400 mt-1" />

            <p className="text-gray-200 leading-8 text-lg">

              {aiResponse ||
                "NOVA responses will appear here..."}

            </p>

          </div>

        </div>

        {/* Controls */}
        {!ambientMode ? (

          <motion.button
            whileHover={{
              scale: 1.03,
            }}
            whileTap={{
              scale: 0.95,
            }}
            onClick={() =>
              setAmbientMode(
                true
              )
            }
            className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 py-5 rounded-2xl font-bold text-lg shadow-2xl shadow-cyan-500/20 flex items-center justify-center gap-3"
          >

            <Radio className="w-6 h-6" />

            Enable Ambient Mode

          </motion.button>

        ) : (

          <motion.button
            whileHover={{
              scale: 1.03,
            }}
            whileTap={{
              scale: 0.95,
            }}
            onClick={
              stopListening
            }
            className="w-full bg-red-500 py-5 rounded-2xl font-bold text-lg shadow-2xl shadow-red-500/20 flex items-center justify-center gap-3"
          >

            <MicOff className="w-6 h-6" />

            Disable Ambient Mode

          </motion.button>

        )}

      </div>

    </div>
  );
}
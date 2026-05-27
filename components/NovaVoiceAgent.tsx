"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  Mic,
  MicOff,
} from "lucide-react";

import {
  useLifeOS,
} from "@/context/LifeOSContext";

export default function NovaVoice() {

  const router =
    useRouter();

  const recognitionRef =
    useRef<any>(null);

  const synthRef =
    useRef<any>(null);

  const [listening,
    setListening] =
    useState(false);

  const {
    setAiListening,
    setAiSpeaking,
    setTasks,
    tasks,
    setMeals,
    meals,
  } = useLifeOS();

  // =====================
  // SPEAK
  // =====================

  const speak =
    (
      text: string
    ) => {

      if (
        !window
          .speechSynthesis
      )
        return;

      window.speechSynthesis.cancel();

      const utterance =
        new SpeechSynthesisUtterance(
          text
        );

      utterance.rate =
        1;

      utterance.pitch =
        1.05;

      utterance.volume =
        1;

      const voices =
        window.speechSynthesis.getVoices();

      const femaleVoice =
        voices.find(
          (
            voice
          ) =>
            voice.name
              .toLowerCase()
              .includes(
                "female"
              ) ||
            voice.name
              .toLowerCase()
              .includes(
                "zira"
              ) ||
            voice.name
              .toLowerCase()
              .includes(
                "samantha"
              )
        );

      if (
        femaleVoice
      ) {

        utterance.voice =
          femaleVoice;
      }

      utterance.onstart =
        () => {

          setAiSpeaking(
            true
          );
        };

      utterance.onend =
        () => {

          setAiSpeaking(
            false
          );
        };

      synthRef.current =
        utterance;

      window.speechSynthesis.speak(
        utterance
      );
    };

  // =====================
  // COMMAND HANDLER
  // =====================

  const handleCommand =
    async (
      transcript: string
    ) => {

      try {

        const response =
          await fetch(
            "/api/voice-ai",
            {

              method:
                "POST",

              headers: {

                "Content-Type":
                  "application/json",
              },

              body:
                JSON.stringify({

                  message:
                    transcript,
                }),
            }
          );

        const data =
          await response.json();

        // =====================
        // COMMAND MODE
        // =====================

        if (
          data.type ===
          "command"
        ) {

          speak(
            data.response
          );

          // NAVIGATION
          if (
            data.action ===
            "navigate"
          ) {

            router.push(
              data.target
            );
          }

          // TASK CREATION
          if (
            data.action ===
            "create_task"
          ) {

            setTasks([
              {
                id: Date.now(),
                title:
                  data.task,
                completed:
                  false,
              },

              ...tasks,
            ]);
          }

          // MEAL LOGGING
          if (
            data.action ===
            "log_meal"
          ) {

            setMeals([
              {
                id: Date.now(),
                mealName:
                  data.meal,
                mealTime:
                  new Date()
                    .toLocaleTimeString(),
                calories: 0,
                protein: 0,
                carbs: 0,
                fats: 0,
              },

              ...meals,
            ]);
          }

          return;
        }

        // =====================
        // NORMAL AI RESPONSE
        // =====================

        speak(
          data.response
        );

      } catch {

        speak(
          "Something went wrong."
        );
      }
    };

  // =====================
  // INIT SPEECH
  // =====================

  useEffect(() => {

    const SpeechRecognition =
      (
        window as any
      )
        .SpeechRecognition ||
      (
        window as any
      )
        .webkitSpeechRecognition;

    if (
      !SpeechRecognition
    )
      return;

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

        setListening(
          true
        );

        setAiListening(
          true
        );
      };

    recognition.onend =
      () => {

        setListening(
          false
        );

        setAiListening(
          false
        );
      };

    recognition.onresult =
      async (
        event: any
      ) => {

        const transcript =
          event.results[
            event.results
              .length - 1
          ][0].transcript;

        await handleCommand(
          transcript
        );
      };

    recognitionRef.current =
      recognition;

  }, []);

  // =====================
  // TOGGLE
  // =====================

  const toggleListening =
    () => {

      if (
        !recognitionRef.current
      )
        return;

      if (
        listening
      ) {

        recognitionRef.current.stop();

      } else {

        recognitionRef.current.start();
      }
    };

  return (
    <button
      onClick={
        toggleListening
      }
      className={`fixed bottom-8 left-8 z-50 w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all ${
        listening
          ? "bg-red-500"
          : "bg-gradient-to-r from-cyan-400 to-blue-500"
      }`}
    >

      {listening ? (

        <MicOff className="text-white w-7 h-7" />

      ) : (

        <Mic className="text-white w-7 h-7" />

      )}

    </button>
  );
}
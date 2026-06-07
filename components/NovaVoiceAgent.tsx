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

    conversations,
    setConversations,
    
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

    const command =
      transcript.toLowerCase();

    // DASHBOARD
    if (
      command.includes(
        "dashboard"
      )
    ) {

      speak(
        "Opening dashboard."
      );

      router.push(
        "/dashboard"
      );

      return;
    }

    // TASKS
    if (
      command.includes(
        "tasks"
      )
    ) {

      speak(
        "Opening tasks."
      );

      router.push(
        "/tasks"
      );

      return;
    }

    // PLANNER
    if (
      command.includes(
        "planner"
      )
    ) {

      speak(
        "Opening planner."
      );

      router.push(
        "/planner"
      );

      return;
    }

    // FINANCE
    if (
      command.includes(
        "finance"
      )
    ) {

      speak(
        "Opening finance."
      );

      router.push(
        "/finance"
      );

      return;
    }

    // MEMORY
    if (
      command.includes(
        "memory"
      )
    ) {

      speak(
        "Opening memory."
      );

      router.push(
        "/memory"
      );

      return;
    }

    const response =
  `You said ${transcript}`;

setConversations(
  (prev: any[]) => [

    ...prev,

    {
      role: "user",
      content:
        transcript,
    },

    {
      role: "assistant",
      content:
        response,
    },

  ]
);

speak(
  response
);

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

  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

    <div className="flex items-center gap-3 mb-5">

      <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center">

        <Mic className="w-6 h-6 text-white" />

      </div>

      <div>

        <h2 className="text-xl font-bold">

          NOVA Voice Assistant

        </h2>

        <p className="text-gray-400 text-sm">

          Voice Control & AI Interaction

        </p>

      </div>

    </div>

    <div className="flex items-center justify-between">

      <div>

        <p className="text-gray-400">

          Status

        </p>

        <p
          className={`font-semibold ${
            listening
              ? "text-red-400"
              : "text-green-400"
          }`}
        >

          {listening
            ? "Listening..."
            : "Ready"}

        </p>

      </div>

      <button
        onClick={
          toggleListening
        }
        className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
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

    </div>

  </div>

);
}
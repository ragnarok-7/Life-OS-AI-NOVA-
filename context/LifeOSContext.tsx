"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

interface Expense {
  id: number;
  title: string;
  amount: number;
  category: string;
}

interface Settings {
  aiVoice: boolean;
  notifications: boolean;
  ambientMode: boolean;
}

interface LifeOSContextType {

  tasks: Task[];
  setTasks: any;

  expenses: Expense[];
  setExpenses: any;

  salary: string;
  setSalary: any;

  memories: string[];
  setMemories: any;

  conversations: any[];
  setConversations: any;

  settings: Settings;
  setSettings: any;
}

const LifeOSContext =
  createContext<
    LifeOSContextType | undefined
  >(undefined);

export function LifeOSProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  // =====================
  // STATES
  // =====================

  const [
    tasks,
    setTasks,
  ] = useState<Task[]>([]);

  const [
    expenses,
    setExpenses,
  ] = useState<Expense[]>(
    []
  );

  const [
    salary,
    setSalary,
  ] = useState("");

  const [
    memories,
    setMemories,
  ] = useState<string[]>(
    []
  );

  const [
    conversations,
    setConversations,
  ] = useState<any[]>([]);

  const [
    settings,
    setSettings,
  ] = useState<Settings>({
    aiVoice: true,
    notifications: true,
    ambientMode: false,
  });

  // =====================
  // LOAD LOCAL STORAGE
  // =====================

  useEffect(() => {

    const storedTasks =
      localStorage.getItem(
        "lifeos_tasks"
      );

    const storedExpenses =
      localStorage.getItem(
        "lifeos_expenses"
      );

    const storedSalary =
      localStorage.getItem(
        "lifeos_salary"
      );

    const storedMemories =
      localStorage.getItem(
        "lifeos_memories"
      );

    const storedConversations =
      localStorage.getItem(
        "lifeos_conversations"
      );

    const storedSettings =
      localStorage.getItem(
        "lifeos_settings"
      );

    if (storedTasks)
      setTasks(
        JSON.parse(
          storedTasks
        )
      );

    if (storedExpenses)
      setExpenses(
        JSON.parse(
          storedExpenses
        )
      );

    if (storedSalary)
      setSalary(
        JSON.parse(
          storedSalary
        )
      );

    if (storedMemories)
      setMemories(
        JSON.parse(
          storedMemories
        )
      );

    if (
      storedConversations
    )
      setConversations(
        JSON.parse(
          storedConversations
        )
      );

    if (storedSettings)
      setSettings(
        JSON.parse(
          storedSettings
        )
      );

  }, []);

  // =====================
  // SAVE TASKS
  // =====================

  useEffect(() => {

    localStorage.setItem(
      "lifeos_tasks",
      JSON.stringify(tasks)
    );

  }, [tasks]);

  // =====================
  // SAVE EXPENSES
  // =====================

  useEffect(() => {

    localStorage.setItem(
      "lifeos_expenses",
      JSON.stringify(
        expenses
      )
    );

  }, [expenses]);

  // =====================
  // SAVE SALARY
  // =====================

  useEffect(() => {

    localStorage.setItem(
      "lifeos_salary",
      JSON.stringify(
        salary
      )
    );

  }, [salary]);

  // =====================
  // SAVE MEMORIES
  // =====================

  useEffect(() => {

    localStorage.setItem(
      "lifeos_memories",
      JSON.stringify(
        memories
      )
    );

  }, [memories]);

  // =====================
  // SAVE CONVERSATIONS
  // =====================

  useEffect(() => {

    localStorage.setItem(
      "lifeos_conversations",
      JSON.stringify(
        conversations
      )
    );

  }, [conversations]);

  // =====================
  // SAVE SETTINGS
  // =====================

  useEffect(() => {

    localStorage.setItem(
      "lifeos_settings",
      JSON.stringify(
        settings
      )
    );

  }, [settings]);

  return (
    <LifeOSContext.Provider
      value={{
        tasks,
        setTasks,

        expenses,
        setExpenses,

        salary,
        setSalary,

        memories,
        setMemories,

        conversations,
        setConversations,

        settings,
        setSettings,
      }}
    >

      {children}

    </LifeOSContext.Provider>
  );
}

export function useLifeOS() {

  const context =
    useContext(
      LifeOSContext
    );

  if (!context) {

    throw new Error(
      "useLifeOS must be used within LifeOSProvider"
    );
  }

  return context;
}
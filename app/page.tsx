"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

export default function TasksPage() {

  const [taskInput, setTaskInput] = useState("");

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Morning Run",
      completed: true,
    },
    {
      id: 2,
      title: "Gym Session",
      completed: false,
    },
  ]);

  // Add Task
  const addTask = () => {

    if (taskInput.trim() === "") return;

    const newTask: Task = {
      id: Date.now(),
      title: taskInput,
      completed: false,
    };

    setTasks([...tasks, newTask]);

    setTaskInput("");
  };

  // Toggle Task
  const toggleTask = (id: number) => {

    const updatedTasks = tasks.map((task) => {

      if (task.id === id) {
        return {
          ...task,
          completed: !task.completed,
        };
      }

      return task;
    });

    setTasks(updatedTasks);
  };

  // Delete Task
  const deleteTask = (id: number) => {

    const filteredTasks = tasks.filter(
      (task) => task.id !== id
    );

    setTasks(filteredTasks);
  };

  return (
    <main className="flex min-h-screen bg-[#0f0f0f] text-white">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <section className="flex-1 p-10">

        {/* Header */}
        <div className="mb-10">

          <h1 className="text-4xl font-bold mb-2">
            Tasks
          </h1>

          <p className="text-gray-400">
            Manage your productivity tasks.
          </p>

        </div>

        {/* Add Task */}
        <div className="flex gap-4 mb-8">

          <input
            type="text"
            placeholder="Enter new task..."
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            className="flex-1 bg-[#181818] border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-white"
          />

          <button
            onClick={addTask}
            className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:opacity-80 transition"
          >
            Add Task
          </button>

        </div>

        {/* Tasks List */}
        <div className="space-y-4">

          {tasks.map((task) => (

            <div
              key={task.id}
              className="flex items-center justify-between bg-[#181818] border border-gray-800 rounded-xl p-5"
            >

              {/* Left */}
              <div className="flex items-center gap-4">

                <button
                  onClick={() => toggleTask(task.id)}
                  className={`w-6 h-6 rounded-full border-2
                  ${
                    task.completed
                      ? "bg-green-500 border-green-500"
                      : "border-gray-500"
                  }`}
                />

                <p
                  className={`text-lg
                  ${
                    task.completed
                      ? "line-through text-gray-500"
                      : "text-white"
                  }`}
                >
                  {task.title}
                </p>

              </div>

              {/* Delete */}
              <button
                onClick={() => deleteTask(task.id)}
                className="text-red-400 hover:text-red-600 transition"
              >
                Delete
              </button>

            </div>

          ))}

        </div>

      </section>

    </main>
  );
}
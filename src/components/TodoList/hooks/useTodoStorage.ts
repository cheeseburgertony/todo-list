import { useState } from "react";
import type { ITask } from "../types";

const STORAGE_KEY = "tasks";

export const useTodoStorage = () => {
  const [tasks, setTasks] = useState<ITask[]>(() => {
    const savedTasks = localStorage.getItem(STORAGE_KEY);
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const updateTasks = (newTasks: ITask[]) => {
    setTasks(newTasks);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newTasks));
  };

  return { tasks, updateTasks };
};

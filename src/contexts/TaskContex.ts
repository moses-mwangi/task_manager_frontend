import { createContext, useContext } from "react";
import { Task, TaskState } from "../types/task";

interface TaskContextType extends TaskState {
  fetchTasks: () => void;
  addTask: (taskData: Partial<Task>) => void;
  toggleTaskStatus: (id: number, isCompleted: boolean) => void;
  editTask: (id: number, updatedData: Partial<Task>) => void;
  removeTask: (id: number) => void;
  setFilter: (filter: string) => void;
  setPage: (page: number) => void;
}

export const TaskContext = createContext<TaskContextType | undefined>(
  undefined
);

export function useTasks(): TaskContextType {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
}

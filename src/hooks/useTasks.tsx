import { useReducer, useEffect, ReactNode, useCallback } from "react";
import * as taskApi from "../api/task";
import { Task } from "../types/task";
import { TaskContext } from "../contexts/TaskContex";

interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  filter: string | "all" | "completed" | "incomplete";
}

type Action =
  | { type: "FETCH_REQUEST" }
  | {
      type: "FETCH_SUCCESS";
      payload: { tasks: Task[]; currentPage: number; totalPages: number };
    }
  | { type: "FETCH_FAILURE"; payload: string }
  | { type: "SET_FILTER"; payload: string }
  | { type: "SET_PAGE"; payload: number };

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  filter: "all",
};

function taskReducer(state: TaskState, action: Action): TaskState {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: null };
    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        tasks: action.payload.tasks,
        currentPage: action.payload.currentPage,
        totalPages: action.payload.totalPages,
      };
    case "FETCH_FAILURE":
      return { ...state, loading: false, error: action.payload };
    case "SET_FILTER":
      return { ...state, filter: action.payload, currentPage: 1 };
    case "SET_PAGE":
      return { ...state, currentPage: action.payload };
    default:
      return state;
  }
}

export function TaskProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  const fetchTasks = useCallback(async () => {
    dispatch({ type: "FETCH_REQUEST" });
    try {
      const data = await taskApi.getTasks(state.currentPage, state.filter);
      const totalPages = Math.ceil(data.count / 5);
      const currentPage = state.currentPage;
      dispatch({
        type: "FETCH_SUCCESS",
        payload: {
          tasks: data.results,

          currentPage,
          totalPages,
        },
      });
    } catch (error: any) {
      dispatch({
        type: "FETCH_FAILURE",
        payload: error.message || "Error fetching tasks",
      });
    }
  }, [state.currentPage, state.filter]);

  const addTask = async (taskData: Partial<Task>) => {
    try {
      await taskApi.addTask(taskData);
      fetchTasks();
    } catch (error: any) {
      dispatch({
        type: "FETCH_FAILURE",
        payload: error.message || "Error adding task",
      });
    }
  };

  const toggleTaskStatus = async (id: number, isCompleted: boolean) => {
    try {
      await taskApi.updateTask(id, { is_completed: !isCompleted });
      fetchTasks();
    } catch (error: any) {
      dispatch({
        type: "FETCH_FAILURE",
        payload: error.message || "Error updating task",
      });
    }
  };

  const editTask = async (id: number, updatedData: Partial<Task>) => {
    try {
      await taskApi.updateTask(id, updatedData);
      fetchTasks();
    } catch (error: any) {
      dispatch({
        type: "FETCH_FAILURE",
        payload: error.message || "Error editing task",
      });
    }
  };

  const removeTask = async (id: number) => {
    try {
      await taskApi.deleteTask(id);
      fetchTasks();
    } catch (error: any) {
      dispatch({
        type: "FETCH_FAILURE",
        payload: error.message || "Error deleting task",
      });
    }
  };

  const setFilter = (filter: string) =>
    dispatch({ type: "SET_FILTER", payload: filter });

  const setPage = (page: number) =>
    dispatch({ type: "SET_PAGE", payload: page });

  useEffect(() => {
    fetchTasks();
  }, [state.currentPage, state.filter, fetchTasks]);

  return (
    <TaskContext.Provider
      value={{
        ...state,
        fetchTasks,
        addTask,
        toggleTaskStatus,
        editTask,
        removeTask,
        setFilter,
        setPage,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

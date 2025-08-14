import axios from "axios";
import { Task } from "../types/task";

const API_URL = "http://localhost:8000/api/tasks/";

export interface TaskResponse {
  results: Task[];
  count: number;
  next: string | null;
  previous: string | null;
}

export const getTasks = async (
  currentPage: number,
  filter: string
): Promise<TaskResponse> => {
  let url = `${API_URL}?page=${currentPage}`;

  if (filter !== "all") {
    const filterOption = filter === "completed";
    url += `&is_completed=${filterOption}`;
  }

  const response = await axios.get<TaskResponse>(url);
  return response.data;
};

export const addTask = async (task: Partial<Task>): Promise<Task> => {
  const response = await axios.post<Task>(API_URL, task);
  return response.data;
};

export const updateTask = async (
  id: number,
  task: Partial<Task>
): Promise<Task> => {
  const response = await axios.patch<Task>(`${API_URL}${id}/`, task);
  return response.data;
};

export const deleteTask = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}${id}/`);
};

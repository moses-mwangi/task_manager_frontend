export interface Task {
  id: number;
  title: string;
  is_completed: boolean;
  description: string;
  created_at: string;
}

export interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  filter: string;
}

export interface TaskFormData {
  title: string;
  description: string;
  is_completed: boolean;
}

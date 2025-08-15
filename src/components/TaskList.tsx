import { useContext, useState } from "react";
import { TaskContext } from "../contexts/TaskContex";
import "../styles/TaskList.css";
import { Task } from "../types/task";
import TaskFilters from "./FilterList";
import Pagination from "./Pagination";
import UpdateTaskModal from "./UpdateTaskModal";

export default function TaskList() {
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const context = useContext(TaskContext);
  if (!context) throw new Error("TaskContext must be used within TaskProvider");

  const { tasks, fetchTasks, toggleTaskStatus, removeTask } = context;

  const deleteTask = async (id: number) => {
    removeTask(id);
    fetchTasks();
  };

  const toggleComplete = async (task: Task) => {
    toggleTaskStatus(task.id, task.is_completed);
    fetchTasks();
  };

  const startEdit = (task: Task) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  const task = editingTask;
  return (
    <>
      <UpdateTaskModal
        task={task}
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      />

      <div className="task-list-wrapper">
        <TaskFilters />
        <ul className="task-list">
          {tasks.map((task) => (
            <li
              key={task.id}
              className={`task-item ${task.is_completed ? "completed" : ""}`}
            >
              <div className="task-info">
                <input
                  type="checkbox"
                  checked={task.is_completed}
                  onChange={() => toggleComplete(task)}
                  className="task-checkbox"
                />
                <div className="task-text">
                  <strong className="task-title">{task.title}</strong>
                  {task.description && (
                    <p className="task-desc">{task.description}</p>
                  )}
                </div>
              </div>
              <div className="task-actions">
                <button
                  className="btn btn-edit"
                  onClick={() => startEdit(task)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-delete"
                  onClick={() => deleteTask(Number(task.id))}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
        <Pagination />
      </div>
    </>
  );
}

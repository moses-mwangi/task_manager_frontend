import { useState, useEffect, useContext } from "react";
import { Task } from "../types/task";
import { TaskContext } from "../contexts/TaskContex";
import "../styles/UpdateTaskModal.css";

interface Props {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
}

const UpdateTaskModal = ({ task, isOpen, onClose }: Props) => {
  const context = useContext(TaskContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

  const { editTask, loading } = context || {};

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setIsCompleted(task.is_completed);
    }
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!task) return;
    editTask?.(task.id, {
      title,
      description,
      is_completed: isCompleted,
    });
    onClose();
  };

  if (!isOpen || !task) return null;

  return (
    <div className="update-task-modal-overlay">
      <div className="update-task-modal">
        <div className="update-task-modal-header">
          <h2>Update Task</h2>
        </div>

        <form onSubmit={handleSubmit} className="update-task-form">
          <div>
            <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="update-task-checkbox">
            <input
              type="checkbox"
              checked={isCompleted}
              onChange={(e) => setIsCompleted(e.target.checked)}
              id="completed"
            />
            <label htmlFor="completed">Completed</label>
          </div>

          <div className="update-task-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="update-btn">
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateTaskModal;

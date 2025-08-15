import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { TaskContext } from "../contexts/TaskContex";
import "../styles/TaskForm.css";
import ButtonLoader from "./loaders/ButtonLoader";

interface FormData {
  title: string;
  description: string;
  is_completed: boolean;
}

export default function TaskForm() {
  const context = useContext(TaskContext);
  const [checked, setChecked] = useState(false);
  const [postTask, setPostTask] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  if (!context) throw new Error("TaskContext must be used within TaskProvider");

  const { addTask } = context;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };

  const onSubmit = (data: FormData) => {
    try {
      setPostTask(true);
      addTask({ ...data, is_completed: checked });
      reset();
      setChecked(false);
    } catch (error) {
      console.error("Error adding task:", error);
    } finally {
      setPostTask(false);
    }
  };

  return (
    <div className="task-form-wrapper">
      <div className="task-form-container">
        <h2 className="task-form-title">Create New Task</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="task-form">
          <div className="form-group">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              id="title"
              type="text"
              className="form-input"
              // {...register("title", { required: true })}
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && (
              <p className="error-message">{errors.title.message}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              id="description"
              className="form-textarea"
              {...register("description", {
                required: "Description is required",
              })}
            ></textarea>
            {errors.description && (
              <p className="error-message">{errors.description.message}</p>
            )}
          </div>

          <div className="form-checkbox-container">
            <input
              id="is_completed"
              type="checkbox"
              checked={checked}
              onChange={handleChange}
              className="form-checkbox"
            />
            <label htmlFor="is_completed" className="form-checkbox-label">
              Completed
            </label>
          </div>

          <div className="button-group">
            <button
              type="button"
              onClick={() => reset()}
              className="button button-secondary"
            >
              Cancel
            </button>
            <button type="submit" className="button button-primary">
              {postTask === true ? <ButtonLoader /> : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

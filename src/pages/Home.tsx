import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import LoadingState from "../components/loaders/LoadingState";
import { TaskContext } from "../contexts/TaskContex";
import ErrorLayout from "../components/ErrorLayout";

export default function Home() {
  const context = useContext(TaskContext);
  if (!context) throw new Error("TaskContext must be used within TaskProvider");

  const { loading, error, fetchTasks } = context;

  if (loading) return <LoadingState />;
  if (error) return <ErrorLayout message={error} onRetry={fetchTasks} />;

  return (
    <div style={{ marginBottom: "40px" }}>
      <Navbar />
      <TaskList />
      <TaskForm />
    </div>
  );
}

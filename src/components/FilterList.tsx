import { useContext } from "react";
import { TaskContext } from "../contexts/TaskContex";
import "../styles/FilterList.css";

const TaskFilters = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("TaskContext must be used within TaskProvider");

  const { filter, setFilter } = context;
  const filters = ["all", "completed", "pending"];

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    const params = new URLSearchParams(window.location.search);
    params.set("is_completed", newFilter);
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${params}`
    );
  };

  return (
    <div className="filter-container">
      {filters.map((f) => (
        <button
          key={f}
          className={`filter-button ${filter === f ? "active" : ""}`}
          onClick={() => handleFilterChange(f)}
        >
          {f.charAt(0).toUpperCase() + f.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default TaskFilters;

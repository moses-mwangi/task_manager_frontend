import { useContext } from "react";
import { TaskContext } from "../contexts/TaskContex";
import "../styles/Pagination.css";
import {
  FaAngleLeft,
  FaAngleRight,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
} from "react-icons/fa";

const Pagination = () => {
  const context = useContext(TaskContext);

  if (!context) throw new Error("TaskContext must be used within TaskProvider");

  const { currentPage, totalPages, setPage } = context;
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setPage(page);

    const params = new URLSearchParams(window.location.search);
    params.set("page", page.toString());
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${params}`
    );
  };

  return (
    <div className="pagination-container">
      <button
        className="pagination-button"
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1}
      >
        <FaAngleDoubleLeft />
      </button>
      <button
        className="pagination-button"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <FaAngleLeft />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          className={`pagination-button ${
            page === currentPage ? "active" : ""
          }`}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </button>
      ))}

      <button
        className="pagination-button"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <FaAngleRight />
      </button>
      <button
        className="pagination-button"
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
      >
        <FaAngleDoubleRight />
      </button>
    </div>
  );
};

export default Pagination;

import React, { useEffect } from "react";
import "../../styles/LoadingState.css";

export default function LoadingState() {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "visible";
    };
  }, []);

  return (
    <div className="loading-overlay">
      <div className="spinner"></div>
    </div>
  );
}

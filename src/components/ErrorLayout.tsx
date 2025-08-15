import "../styles/ErrorLayout.css";

interface ErrorLayoutProps {
  message: string;
  onRetry?: () => void;
}

export default function ErrorLayout({ message, onRetry }: ErrorLayoutProps) {
  return (
    <div className="error-layout">
      <h1>Something went wrong 😢</h1>
      <p>{message}</p>
      {onRetry && (
        <button className="retry-btn" onClick={onRetry}>
          Retry
        </button>
      )}
    </div>
  );
}

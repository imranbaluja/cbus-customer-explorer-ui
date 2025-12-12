interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="error" role="alert">
      <div>{message}</div>
      {onRetry && (
        <button className="btn" style={{ marginTop: "0.5rem" }} onClick={onRetry}>
          Retry
        </button>
      )}
    </div>
  );
}

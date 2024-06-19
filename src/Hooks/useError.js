import { useState } from "react";

export function useError() {
  const [error, setError] = useState("");

  const showError = (error) => {
    setError(error);
  };

  return {
    error,
    showError,
  };
}

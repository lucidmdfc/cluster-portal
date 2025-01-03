'use client';

import { useEffect } from 'react';

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an external service like Sentry or console for debugging
    console.error('Captured error:', error);
  }, [error]);

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Something went wrong!</h1>
      <p>{error.message}</p>
      <button onClick={reset} style={{ padding: '0.5rem 1rem', marginTop: '1rem' }}>
        Try Again
      </button>
    </div>
  );
}

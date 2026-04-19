"use client";

import { useEffect } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import { AlertCircle, RefreshCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorContent}>
        <div className={styles.errorIcon}>
          <AlertCircle size={64} color="var(--color-pink-500)" />
        </div>
        <h2 className={styles.errorTitle}>Something went wrong</h2>
        <p className={styles.errorMessage}>
          We encountered an unexpected technical issue. Don't worry, our team is on it.
        </p>
        <div className="flex gap-4 justify-center mt-8">
          <button 
            onClick={() => reset()} 
            className="btn btn-primary flex items-center gap-2"
          >
            <RefreshCcw size={18} /> Try Again
          </button>
          <Link href="/" className="btn btn-secondary">
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}

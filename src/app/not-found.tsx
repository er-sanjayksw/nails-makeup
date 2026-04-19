import Link from 'next/link';
import styles from './page.module.css';

export default function NotFound() {
  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorContent}>
        <h1 className={styles.errorCode}>404</h1>
        <div className={styles.divider}></div>
        <h2 className={styles.errorTitle}>Lost in Elegance?</h2>
        <p className={styles.errorMessage}>
          It seems the page you are looking for has been moved or doesn't exist.
          Let's get you back to the beauty.
        </p>
        <Link href="/" className="btn btn-primary">
          Back to Home
        </Link>
      </div>
    </div>
  );
}

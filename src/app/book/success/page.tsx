import Link from "next/link";
import styles from "../[serviceId]/booking.module.css";
import { Check, CalendarCheck } from "lucide-react";

export default function BookingSuccessPage() {
  return (
    <div className={styles.successContainer}>
      <div className={`${styles.successContent} fade-in`}>
        <div className={styles.successIcon}>
          <Check size={40} color="var(--color-pink-600)" />
        </div>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', marginBottom: '1rem' }}>
          It's a Date!
        </h1>
        <p style={{ color: '#6b7280', marginBottom: '2.5rem', lineHeight: '1.6' }}>
          Your appointment has been successfully requested. We've sent the details to our artist, and you'll receive a confirmation notification shortly.
        </p>
        
        <div className="flex flex-col gap-3">
          <Link href="/profile" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            <CalendarCheck size={18} /> View My Appointments
          </Link>
          <Link href="/" className="btn btn-secondary">
            Return to Home
          </Link>
        </div>

        <p style={{ marginTop: '3rem', fontSize: '0.8125rem', color: '#9ca3af' }}>
          Need to reschedule? Give us a call at <br />
          <strong style={{ color: '#4b5563' }}>+1 (555) KSW-GLOW</strong>
        </p>
      </div>
    </div>
  );
}

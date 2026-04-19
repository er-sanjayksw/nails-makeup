"use client";

import { useActionState } from "react";
import { createBooking } from "../actions";
import styles from "./booking.module.css";
import { Calendar, Clock, Loader2, Sparkles } from "lucide-react";

interface BookingClientProps {
  serviceId: string;
}

export default function BookingClient({ serviceId }: BookingClientProps) {
  const [state, action, isPending] = useActionState(createBooking as any, { error: null });

  // Minimum date is today
  const minDate = new Date().toISOString().split("T")[0];

  return (
    <div className="glass-panel fade-in-up" style={{ padding: '2.5rem' }}>
      <h3 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <Sparkles size={24} color="var(--color-gold-500)" /> Finalize Appointment
      </h3>

      <form action={action} className={styles.bookingForm}>
        <input type="hidden" name="serviceId" value={serviceId} />

        {/* Date Selection */}
        <div className={styles.formGroup}>
          <label htmlFor="date" className="flex items-center gap-2">
            <Calendar size={18} color="var(--color-pink-500)" /> Select Date
          </label>
          <input 
            type="date" 
            id="date" 
            name="date" 
            min={minDate} 
            className="input" 
            required 
          />
        </div>

        {/* Time Selection */}
        <div className={styles.formGroup}>
          <label htmlFor="time" className="flex items-center gap-2">
            <Clock size={18} color="var(--color-pink-500)" /> Preferred Time
          </label>
          <input 
            type="time" 
            id="time" 
            name="time" 
            className="input" 
            required 
          />
        </div>

        {state?.error && (
          <p className={styles.errorMessage}>{state.error}</p>
        )}

        <div style={{ marginTop: '2.5rem' }}>
          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%', padding: '1.25rem' }}
            disabled={isPending}
          >
            {isPending ? <Loader2 className="spinner" /> : "Confirm Reservation"}
          </button>
          <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.75rem', color: '#6b7280' }}>
            By confirming, you agree to our 15-minute grace period policy.
          </p>
        </div>
      </form>
    </div>
  );
}

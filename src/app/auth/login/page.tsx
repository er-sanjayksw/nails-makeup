"use client";

import Link from "next/link";
import { useLoginForm } from "../hooks";
import styles from "./page.module.css";
import { Lock, Mail, Loader2 } from "lucide-react";

export default function LoginPage() {
  const [state, action, isPending] = useLoginForm();

  return (
    <div className={styles.authContainer}>
      <div className={`glass-panel fade-in-up ${styles.authCard}`}>
        <div className={styles.header}>
          <h1>Welcome Back</h1>
          <p>Login to manage your bookings and orders</p>
        </div>

        <form action={action} className={styles.form}>
          {state?.error && <div className={styles.error}>{state.error}</div>}
          
          <div className={styles.inputGroup}>
            <label htmlFor="email"><Mail size={16} /> Email Address</label>
            <input 
              className="input" 
              type="email" 
              id="email" 
              name="email" 
              placeholder="jane@example.com" 
              required 
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password"><Lock size={16} /> Password</label>
            <input 
              className="input" 
              type="password" 
              id="password" 
              name="password" 
              placeholder="••••••••" 
              required 
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={isPending}>
            {isPending ? <Loader2 className={styles.spinner} /> : "Login"}
          </button>
        </form>

        <div className={styles.footer}>
          <p>Don&apos;t have an account? <Link href="/auth/register">Register here</Link></p>
        </div>
      </div>
    </div>
  );
}

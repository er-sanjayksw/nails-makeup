"use client";

import Link from "next/link";
import { useRegisterForm } from "../../hooks";
import styles from "../page.module.css";
import { User, Mail, Lock, ShieldCheck, Loader2 } from "lucide-react";

export default function AdminRegisterPage() {
  const [state, action, isPending] = useRegisterForm();

  return (
    <div className={styles.authContainer}>
      <div className={`glass-panel fade-in-up ${styles.authCard}`}>
        <div className={styles.header}>
          <h1>Admin Registration</h1>
          <p>Create an administrator account for KSW</p>
        </div>

        <form action={action} className={styles.form}>
          {state?.error && <div className={styles.error}>{state.error}</div>}
          
          <div className={styles.inputGroup}>
            <label htmlFor="name"><User size={16} /> Full Name</label>
            <input className="input" type="text" id="name" name="name" placeholder="Admin Name" required />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="email"><Mail size={16} /> Email Address</label>
            <input className="input" type="email" id="email" name="email" placeholder="admin@kswbeauty.com" required />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password"><Lock size={16} /> Password</label>
            <input className="input" type="password" id="password" name="password" placeholder="••••••••" required />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="adminCode"><ShieldCheck size={16} /> Admin Secret Code</label>
            <input className="input" type="password" id="adminCode" name="adminCode" placeholder="Enter the secret admin code" required />
          </div>

          <button type="submit" className="btn btn-primary" disabled={isPending}>
            {isPending ? <Loader2 className={styles.spinner} /> : "Register as Admin"}
          </button>
        </form>

        <div className={styles.footer}>
          <p>Standard user? <Link href="/auth/register">Register here</Link></p>
          <p>Already have an account? <Link href="/auth/login">Login here</Link></p>
        </div>
      </div>
    </div>
  );
}

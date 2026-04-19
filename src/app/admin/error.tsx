"use client";

import { useEffect } from "react";
import Link from "next/link";
import styles from "@/app/admin/admin.module.css";
import { ShieldAlert, RefreshCcw } from "lucide-react";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Admin Dashboard Error:", error);
  }, [error]);

  return (
    <div className="fade-in" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
      <div className="glass-panel text-center" style={{ padding: '4rem', maxWidth: '600px' }}>
        <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'center' }}>
          <div style={{ backgroundColor: 'var(--color-pink-50)', padding: '2rem', borderRadius: '100px' }}>
             <ShieldAlert size={48} color="var(--color-pink-600)" />
          </div>
        </div>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Dashboard Error</h2>
        <p style={{ color: '#6b7280', marginBottom: '2.5rem' }}>
          There was a problem loading this section of the Admin panel. This could be due to a temporary database issue or an expired session.
        </p>
        <div className="flex gap-4 justify-center">
          <button 
            onClick={() => reset()} 
            className="btn btn-primary flex items-center gap-2"
          >
            <RefreshCcw size={18} /> Refresh Section
          </button>
          <Link href="/auth/login" className="btn btn-secondary">
            Re-login
          </Link>
        </div>
      </div>
    </div>
  );
}

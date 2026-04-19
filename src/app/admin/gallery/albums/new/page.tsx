"use client";

import { useActionState } from "react";
import Link from "next/link";
import { createAlbum } from "../actions";
import styles from "@/app/admin/admin.module.css";
import { ChevronLeft, FolderPlus, ImageIcon, Loader2 } from "lucide-react";

const initialState = { error: null };

export default function NewAlbumPage() {
  const [state, action, isPending] = useActionState(createAlbum as any, initialState);

  return (
    <div className="fade-in">
      <div className={styles.header}>
        <Link href="/admin/gallery" className="btn btn-secondary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ChevronLeft size={16} /> Back to Gallery
        </Link>
      </div>

      <div className="container" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div className="glass-panel" style={{ padding: '3rem' }}>
          <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
            <FolderPlus size={32} color="var(--color-pink-500)" style={{ margin: '0 auto 1rem' }} />
            <h2>Create New Album</h2>
            <p style={{ color: '#6b7280' }}>Group your works by theme or collection.</p>
          </div>

          <form action={action} className={styles.form}>
            {state?.error && <div className="text-red-500 mb-4">{state.error}</div>}

            <div className={styles.inputGroup} style={{ marginBottom: '1.5rem' }}>
              <label htmlFor="name">Album Name *</label>
              <input className="input" type="text" id="name" name="name" placeholder="e.g. Bridal Collection 2026" required />
            </div>

            <div className={styles.inputGroup} style={{ marginBottom: '1.5rem' }}>
              <label htmlFor="description">Short Description</label>
              <textarea className="input" id="description" name="description" rows={3} placeholder="What is this collection about?" />
            </div>

            <div className={styles.inputGroup} style={{ marginBottom: '2rem' }}>
              <label htmlFor="coverImage" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ImageIcon size={16} /> Cover Image
              </label>
              <input className="input" type="file" id="coverImage" name="coverImage" accept="image/*" />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem' }} disabled={isPending}>
              {isPending ? <Loader2 className="spinner" /> : "Create Album"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

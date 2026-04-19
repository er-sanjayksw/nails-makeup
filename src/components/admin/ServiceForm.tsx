"use client";

import { useActionState } from "react";
import { createService } from "@/app/admin/services/actions";
import { FormGroup } from "@/components/admin/FormGroup";
import styles from "@/app/admin/admin.module.css";
import { Sparkles, DollarSign, Clock, AlignLeft, Loader2 } from "lucide-react";

export function ServiceForm() {
  const [state, action, isPending] = useActionState(createService as any, { error: null });

  return (
    <form action={action} className={styles.form}>
      {state?.error && (
        <div style={{ backgroundColor: '#fee2e2', color: '#ef4444', padding: '1rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
          {state.error}
        </div>
      )}

      <FormGroup label="Service Name" id="name">
        <input className="input" type="text" id="name" name="name" placeholder="e.g. Deluxe Gel Manicure" required />
      </FormGroup>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
        <FormGroup label="Price ($)" id="price">
          <input className="input" type="number" id="price" name="price" step="0.01" placeholder="45.00" required />
        </FormGroup>

        <FormGroup label="Duration (Mins)" id="durationMin">
          <input className="input" type="number" id="durationMin" name="durationMin" placeholder="45" required />
        </FormGroup>
      </div>

      <FormGroup label="Service Image" id="image">
        <input className="input" type="file" id="image" name="image" accept="image/*" />
      </FormGroup>

      <FormGroup label="Description" id="description">
        <textarea className="input" id="description" name="description" placeholder="What does this service include?" rows={4} style={{ resize: 'none' }} />
      </FormGroup>

      <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem' }} disabled={isPending}>
        {isPending ? <Loader2 className="spinner" /> : "Create Service"}
      </button>
    </form>
  );
}

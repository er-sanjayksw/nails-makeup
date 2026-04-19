import styles from "@/app/admin/admin.module.css";

interface FormGroupProps {
  label: string;
  id: string;
  children: React.ReactNode;
  error?: string;
}

export function FormGroup({ label, id, children, error }: FormGroupProps) {
  return (
    <div className={styles.inputGroup}>
      <label htmlFor={id}>{label}</label>
      {children}
      {error && <p className="mt-1 text-red-500 text-xs">{error}</p>}
    </div>
  );
}

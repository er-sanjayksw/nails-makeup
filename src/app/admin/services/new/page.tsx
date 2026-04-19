import Link from "next/link";
import styles from "../../admin.module.css";
import { ChevronLeft, Sparkles } from "lucide-react";
import { ServiceForm } from "@/components/admin/ServiceForm";

export default function NewServicePage() {
  return (
    <div className="fade-in">
      <div className={styles.header}>
        <Link href="/admin/services" className="btn btn-secondary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ChevronLeft size={16} /> Back to Services
        </Link>
      </div>

      <div className="container" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div className="glass-panel" style={{ padding: '3rem' }}>
          <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
            <div className={styles.statIcon} style={{ margin: '0 auto 1rem', width: 'fit-content' }}>
              <Sparkles size={32} />
            </div>
            <h2>Add New Service</h2>
            <p style={{ color: '#6b7280' }}>Define a new beauty treatment for your clients.</p>
          </div>

          {/* Modular Form */}
          <ServiceForm />
        </div>
      </div>
    </div>
  );
}

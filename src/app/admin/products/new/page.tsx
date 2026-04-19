import Link from "next/link";
import styles from "../../admin.module.css";
import { ChevronLeft } from "lucide-react";
import { ProductForm } from "@/components/admin/ProductForm";

export default function NewProductPage() {
  return (
    <div className="fade-in">
      <div className={styles.header}>
        <Link href="/admin/products" className="btn btn-secondary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ChevronLeft size={16} /> Back to Shop
        </Link>
      </div>

      <div className="container" style={{ padding: '0 2rem 4rem' }}>
        <header style={{ marginBottom: '3rem' }}>
          <h1>Add New Product</h1>
          <p style={{ color: '#6b7280' }}>List a new professional product in the KSW shop.</p>
        </header>

        {/* Modular Form */}
        <ProductForm />
      </div>
    </div>
  );
}

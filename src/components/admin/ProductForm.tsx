"use client";

import { useActionState } from "react";
import { createProduct } from "@/app/admin/products/actions";
import { FormGroup } from "@/components/admin/FormGroup";
import styles from "@/app/admin/admin.module.css";
import { 
  Package, 
  Tag, 
  DollarSign, 
  BarChart3, 
  Image as ImageIcon, 
  Info,
  Loader2 
} from "lucide-react";

export function ProductForm() {
  const [state, action, isPending] = useActionState(createProduct as any, { error: null });

  return (
    <form action={action} className={styles.form}>
      {state?.error && (
        <div style={{ backgroundColor: '#fee2e2', color: '#ef4444', padding: '1rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
          {state.error}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        {/* Left Column */}
        <div className="flex flex-col gap-6">
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Info size={20} color="var(--color-pink-500)" /> General Info
            </h3>
            <FormGroup label="Product Name *" id="name">
               <input className="input" type="text" id="name" name="name" placeholder="e.g. Signature Nail Oil" required />
            </FormGroup>
            <FormGroup label="Brand" id="brand">
               <input className="input" type="text" id="brand" name="brand" placeholder="e.g. KSW Essence" />
            </FormGroup>
            <FormGroup label="Description" id="description">
               <textarea className="input" id="description" name="description" rows={4} style={{ resize: 'none' }} />
            </FormGroup>
          </div>

          <div className="glass-panel" style={{ padding: '2rem' }}>
            <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ImageIcon size={20} color="var(--color-pink-500)" /> Media
            </h3>
            <FormGroup label="Upload Image" id="image">
              <input className="input" type="file" id="image" name="image" accept="image/*" />
            </FormGroup>
            <FormGroup label="Or Image URL" id="imageUrl">
              <input className="input" type="text" id="imageUrl" name="imageUrl" placeholder="https://..." />
            </FormGroup>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-6">
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Tag size={20} color="var(--color-pink-500)" /> Pricing
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <FormGroup label="Base Price ($) *" id="price">
                <input className="input" type="number" id="price" name="price" step="0.01" placeholder="25.00" required />
              </FormGroup>
              <FormGroup label="Sale Price ($)" id="salePrice">
                <input className="input" type="number" id="salePrice" name="salePrice" step="0.01" placeholder="19.99" />
              </FormGroup>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '2rem' }}>
            <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <BarChart3 size={20} color="var(--color-pink-500)" /> Inventory
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <FormGroup label="Stock Level" id="stock">
                <input className="input" type="number" id="stock" name="stock" placeholder="100" />
              </FormGroup>
              <FormGroup label="SKU" id="sku">
                <input className="input" type="text" id="sku" name="sku" placeholder="KSW-OIL-01" />
              </FormGroup>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <input type="checkbox" id="isAvailable" name="isAvailable" defaultChecked />
              <label htmlFor="isAvailable" style={{ fontWeight: 600 }}>Active & Visible in Shop</label>
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1.25rem', marginTop: '1.5rem' }} disabled={isPending}>
              {isPending ? <Loader2 className="spinner" /> : "Save Product"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

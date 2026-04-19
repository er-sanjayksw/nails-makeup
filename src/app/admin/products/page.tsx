import { prisma } from "@/lib/prisma";
import Link from "next/link";
import styles from "../admin.module.css";
import { Plus } from "lucide-react";

export default async function AdminProducts() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="fade-in">
      <header className={styles.header}>
        <div>
          <h1>Shop Inventory</h1>
          <p>Manage your jewelry and beauty products.</p>
        </div>
        <Link href="/admin/products/new" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Plus size={18} /> Add Product
        </Link>
      </header>

      <div className={styles.tableWrapper}>
        <table className={styles.adminTable}>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: '3rem' }}>
                  Your shop is empty. Start adding products!
                </td>
              </tr>
            ) : (
              products.map((product: any) => (
                <tr key={product.id}>
                  <td style={{ fontWeight: 600 }}>{product.name}</td>
                  <td>{product.categoryId || "General"}</td>
                  <td>${product.price.toFixed(2)}</td>
                  <td>In Stock</td>
                  <td>
                    <button className="btn btn-secondary btn-sm">Edit</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

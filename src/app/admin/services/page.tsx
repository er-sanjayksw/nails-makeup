import { prisma } from "@/lib/prisma";
import Link from "next/link";
import styles from "../admin.module.css";
import { Plus } from "lucide-react";

export default async function AdminServices() {
  const services = await prisma.service.findMany({
    orderBy: { name: 'asc' }
  });

  return (
    <div className="fade-in">
      <header className={styles.header}>
        <div>
          <h1>Services Management</h1>
          <p>View and manage your nail and makeup service catalog.</p>
        </div>
        <Link href="/admin/services/new" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Plus size={18} /> Add Service
        </Link>
      </header>

      <div className={styles.tableWrapper}>
        <table className={styles.adminTable}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Duration</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: '3rem' }}>
                  No services found. Click &quot;Add Service&quot; to get started.
                </td>
              </tr>
            ) : (
              services.map((service: any) => (
                <tr key={service.id}>
                  <td style={{ fontWeight: 600 }}>{service.name}</td>
                  <td>${service.price.toFixed(2)}</td>
                  <td>{service.durationMin} mins</td>
                  <td style={{ color: '#6b7280', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {service.description}
                  </td>
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

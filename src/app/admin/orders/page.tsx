import { prisma } from "@/lib/prisma";
import styles from "../admin.module.css";

export default async function AdminOrders() {
  const orders = await prisma.order.findMany({
    include: { user: true },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="fade-in">
      <header className={styles.header}>
        <div>
          <h1>Customer Orders</h1>
          <p>Monitor shop sales and delivery status.</p>
        </div>
      </header>

      <div className={styles.tableWrapper}>
        <table className={styles.adminTable}>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Total</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '3rem' }}>
                  No orders placed yet.
                </td>
              </tr>
            ) : (
              orders.map(order => (
                <tr key={order.id}>
                  <td style={{ fontFamily: 'monospace' }}>#{order.id.slice(-8)}</td>
                  <td>{order.user.name}</td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td style={{ fontWeight: 600 }}>${order.total.toFixed(2)}</td>
                  <td>
                    <span className={`${styles.statusBadge} ${styles['status' + order.status]}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-secondary btn-sm">Details</button>
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

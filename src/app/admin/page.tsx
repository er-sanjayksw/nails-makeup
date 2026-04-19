import { prisma } from "@/lib/prisma";
import styles from "./admin.module.css";
import { 
  Sparkles, 
  ShoppingBag, 
  Calendar, 
  ClipboardList,
  Users
} from "lucide-react";

export default async function AdminOverview() {
  const [servicesCount, productsCount, bookingsCount, ordersCount, usersCount] = await Promise.all([
    prisma.service.count(),
    prisma.product.count(),
    prisma.booking.count(),
    prisma.order.count(),
    prisma.user.count()
  ]);

  const stats = [
    { label: "Total Services", value: servicesCount, icon: <Sparkles size={24} />, color: "var(--color-pink-500)" },
    { label: "Shop Products", value: productsCount, icon: <ShoppingBag size={24} />, color: "var(--color-pink-500)" },
    { label: "Appointments", value: bookingsCount, icon: <Calendar size={24} />, color: "var(--color-pink-500)" },
    { label: "Total Orders", value: ordersCount, icon: <ClipboardList size={24} />, color: "var(--color-pink-500)" },
    { label: "Registered Users", value: usersCount, icon: <Users size={24} />, color: "var(--color-pink-500)" },
  ];

  return (
    <div className="fade-in">
      <header className={styles.header}>
        <div>
          <h1>Dashboard Overview</h1>
          <p>Welcome back! Here&apos;s what&apos;s happening with KSW Nails.</p>
        </div>
      </header>

      <div className={styles.statsGrid}>
        {stats.map((stat, i) => (
          <div key={i} className={styles.statCard}>
            <div className={styles.statIcon} style={{ color: stat.color }}>
              {stat.icon}
            </div>
            <div className={styles.statInfo}>
              <h3>{stat.label}</h3>
              <p>{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="glass-panel" style={{ padding: '2rem' }}>
        <h3>Recent Activity</h3>
        <p style={{ color: '#6b7280', marginTop: '1rem' }}>
          Real-time activity feed will be implemented in the next phase.
        </p>
      </div>
    </div>
  );
}

import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import styles from "./page.module.css";
import { User, Calendar, ShoppingBag, Settings } from "lucide-react";
import { prisma } from "@/lib/prisma";

export default async function ProfilePage() {
  const session = await getSession();
  
  if (!session) {
    redirect("/auth/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      bookings: {
        include: { service: true },
        orderBy: { date: 'desc' }
      },
      orders: {
        orderBy: { createdAt: 'desc' }
      }
    }
  });

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <div className={`container ${styles.profileContainer}`}>
      <div className={styles.sidebar}>
        <div className={`glass-panel ${styles.userInfoCard}`}>
          <div className={styles.avatarPlaceholder}>
            <User size={48} color="var(--color-pink-400)" />
          </div>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <div className={styles.badge}>Role: {user.role}</div>
        </div>

        <nav className={`glass-panel ${styles.sideNav}`}>
          <a href="#bookings" className={styles.active}><Calendar size={18} /> My Bookings</a>
          <a href="#orders"><ShoppingBag size={18} /> My Orders</a>
          <a href="#settings"><Settings size={18} /> Settings</a>
        </nav>
      </div>

      <div className={styles.mainContent}>
        <section id="bookings" className={`glass-panel fade-in-up ${styles.section}`}>
          <h3>Your Bookings</h3>
          {user.bookings.length === 0 ? (
            <p>You haven&apos;t booked any services yet.</p>
          ) : (
            <div className={styles.listContainer}>
              {user.bookings.map((b: any) => (
                <div key={b.id} className={styles.listItem}>
                  <div>
                    <h4>{b.service.name}</h4>
                    <p>{new Date(b.date).toLocaleDateString()} at {new Date(b.date).toLocaleTimeString()}</p>
                  </div>
                  <div className={`${styles.statusBadge} ${styles[b.status.toLowerCase()]}`}>
                    {b.status}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section id="orders" className={`glass-panel fade-in-up ${styles.section}`} style={{animationDelay: "0.1s"}}>
          <h3>Your Orders</h3>
          {user.orders.length === 0 ? (
            <p>You haven&apos;t placed any orders yet.</p>
          ) : (
            <div className={styles.listContainer}>
              {user.orders.map((o: any) => (
                <div key={o.id} className={styles.listItem}>
                  <div>
                    <h4>Order #{o.id.slice(-8)}</h4>
                    <p>Placed on {new Date(o.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className={styles.statusBadge}>
                    ${o.total.toFixed(2)} • {o.status}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

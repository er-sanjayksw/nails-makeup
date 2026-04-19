import { prisma } from "@/lib/prisma";
import styles from "../admin.module.css";
import { format } from "date-fns"; // Note: User might need to install date-fns

export default async function AdminBookings() {
  const bookings = await prisma.booking.findMany({
    include: { 
      user: true,
      service: true
    },
    orderBy: { date: 'asc' }
  });

  return (
    <div className="fade-in">
      <header className={styles.header}>
        <div>
          <h1>Appointments Calendar</h1>
          <p>Manage booked nail and makeup sessions.</p>
        </div>
      </header>

      <div className={styles.tableWrapper}>
        <table className={styles.adminTable}>
          <thead>
            <tr>
              <th>Date & Time</th>
              <th>Customer</th>
              <th>Service</th>
              <th>Duration</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '3rem' }}>
                  No appointments scheduled.
                </td>
              </tr>
            ) : (
              bookings.map((booking: any) => (
                <tr key={booking.id}>
                  <td style={{ fontWeight: 600 }}>
                    {format(new Date(booking.date), "MMM d, h:mm a")}
                  </td>
                  <td>{booking.user.name}</td>
                  <td>{booking.service.name}</td>
                  <td>{booking.service.durationMin} mins</td>
                  <td>
                    <span className={`${styles.statusBadge} ${styles['status' + booking.status]}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td>
                    <div className={styles.actionsCell}>
                      {booking.status === "PENDING" && (
                        <>
                          <form action={async () => {
                            "use server";
                            const { updateBookingStatus } = await import("./actions");
                            await updateBookingStatus(booking.id, "CONFIRMED");
                          }}>
                            <button type="submit" className="btn btn-secondary btn-sm" style={{ backgroundColor: '#d1fae5', color: '#065f46', borderColor: '#065f46' }}>
                              Accept
                            </button>
                          </form>
                          <form action={async () => {
                            "use server";
                            const { updateBookingStatus } = await import("./actions");
                            await updateBookingStatus(booking.id, "CANCELLED");
                          }}>
                            <button type="submit" className="btn btn-secondary btn-sm" style={{ color: '#991b1b' }}>
                              Decline
                            </button>
                          </form>
                        </>
                      )}
                      {booking.status !== "PENDING" && (
                        <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Processed</span>
                      )}
                    </div>
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

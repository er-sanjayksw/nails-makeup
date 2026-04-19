import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import BookingClient from "@/app/book/[serviceId]/BookingClient";
import styles from "./booking.module.css";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default async function BookingPage({ params }: { params: Promise<{ serviceId: string }> }) {
  const { serviceId } = await params;
  const service = await prisma.service.findUnique({
    where: { id: serviceId }
  });

  if (!service) {
    notFound();
  }

  return (
    <div className={styles.bookingPage}>
      <header className={styles.bookingHeader}>
        <div className="container">
          <Link href="/services" className={styles.backLink}>
            <ChevronLeft size={16} /> Back to Services
          </Link>
          <h1 className="fade-in-up">Reserve Your Glow</h1>
          <p className="fade-in-up">Choose a time that fits your lifestyle for your <strong>{service.name}</strong>.</p>
        </div>
      </header>

      <section className="container" style={{ padding: '0 2rem 6rem' }}>
        <div className={styles.bookingGrid}>
          {/* Summary Card */}
          <div className="glass-panel fade-in-up" style={{ padding: '2.5rem', height: 'fit-content' }}>
            <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--color-pink-100)', paddingBottom: '1rem' }}>
              Service Summary
            </h3>
            <div className="flex flex-col gap-4">
              <div className="flex justify-between">
                <span style={{ color: '#6b7280' }}>Service</span>
                <span style={{ fontWeight: 600 }}>{service.name}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: '#6b7280' }}>Duration</span>
                <span>{service.durationMin} Minutes</span>
              </div>
              <div className="flex justify-between" style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--color-pink-50)' }}>
                <span style={{ fontWeight: 600 }}>Total</span>
                <span style={{ fontWeight: 700, color: 'var(--color-pink-600)', fontSize: '1.25rem' }}>
                  ${service.price.toFixed(2)}
                </span>
              </div>
            </div>
            {service.imageUrl && (
              <img 
                src={service.imageUrl} 
                alt={service.name} 
                style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: 'var(--radius-sm)', marginTop: '2rem' }} 
              />
            )}
          </div>

          {/* Booking Interaction */}
          <BookingClient serviceId={service.id} />
        </div>
      </section>
    </div>
  );
}

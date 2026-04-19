import Link from "next/link";
import styles from "./page.module.css";
import { prisma } from "@/lib/prisma";
import { Calendar } from "lucide-react";

interface Service {
  id: string;
  name: string;
  description: string | null;
  price: number;
  durationMin: number;
  imageUrl: string | null;
}

const fallbackServices: Service[] = [];

export default async function ServicesPage() {
  const dbServices = await prisma.service.findMany() as Service[];
  const services = dbServices.length > 0 ? dbServices : fallbackServices;

  return (
    <div className={styles.servicesContainer}>
      <header className={styles.servicesHeader}>
        <div className="container">
          <h1 className="fade-in-up">Our Services</h1>
          <p className="fade-in-up">Book your next beauty appointment with our top professionals.</p>
        </div>
      </header>

      <section className={`container ${styles.servicesSection}`}>
        {services.length === 0 ? (
          <div className="glass-panel text-center" style={{ padding: '4rem' }}>
            <h3>Booking opens soon</h3>
            <p>We are currently finalizing our service catalog. Stay tuned!</p>
          </div>
        ) : (
          <div className={styles.serviceList}>
            {services.map(service => (
              <div key={service.id} className={`glass-panel ${styles.serviceCard} fade-in-up`}>
                <div className={styles.serviceContent}>
                  <h3>{service.name}</h3>
                  <p className={styles.serviceMeta}>
                    <span>${service.price.toFixed(2)}</span>
                    <span className={styles.dot}>•</span>
                    <span>{service.durationMin} mins</span>
                  </p>
                  <p className={styles.description}>{service.description}</p>
                </div>
                <div className={styles.serviceAction}>
                  <Link href={`/book/${service.id}`} className="btn btn-primary">
                    <Calendar size={18} style={{ marginRight: '0.5rem' }}/> Book Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

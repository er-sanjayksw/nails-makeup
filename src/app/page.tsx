import Link from "next/link";
import styles from "./page.module.css";
import { ArrowRight, Sparkles, Gem } from "lucide-react";

export default function Home() {
  return (
    <div className={styles.main}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className="container">
          <div className={`glass-panel fade-in-up ${styles.heroContent}`}>
            <h1>Beauty that Shines. Nails that Wow.</h1>
            <p>
              Experience luxury nail finishing, premium makeup services, 
              and explore our curated collection of jewelry and beauty products.
            </p>
            <div className={styles.heroActions}>
              <Link href="/services" className="btn btn-primary">
                Book Appointment
              </Link>
              <Link href="/shop" className="btn btn-secondary">
                Shop E-Commerce
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className={`container ${styles.featuresSection}`}>
        <div className="grid grid-cols-3 gap-8">
          <div className="glass-panel text-center">
            <div className={styles.iconWrapper}><Sparkles size={32} /></div>
            <h3>Premium Nails</h3>
            <p>Manicures, pedicures, and nail extensions using the finest products.</p>
            <Link href="/services" className={styles.link}>View Services <ArrowRight size={16} /></Link>
          </div>
          <div className="glass-panel text-center">
            <div className={styles.iconWrapper}><Sparkles size={32} /></div>
            <h3>Makeup Artistry</h3>
            <p>From subtle glows to glamorous events, our makeup artists have you covered.</p>
            <Link href="/services" className={styles.link}>Book Makeup <ArrowRight size={16} /></Link>
          </div>
          <div className="glass-panel text-center">
            <div className={styles.iconWrapper}><Gem size={32} /></div>
            <h3>Luxury Shop</h3>
            <p>Browse our exclusive jewelry pieces and premium skincare online.</p>
            <Link href="/shop" className={styles.link}>Explore Shop <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>
    </div>
  );
}

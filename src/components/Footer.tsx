import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container grid grid-cols-3 ${styles.footerGrid}`}>
        <div>
          <h3>KSWNails& Makeups</h3>
          <p>Luxury nail, makeup services, and premium beauty shop.</p>
        </div>
        <div>
          <h4>Quick Links</h4>
          <ul>
            <li><Link href="/services">Book a Service</Link></li>
            <li><Link href="/shop">Shop E-commerce</Link></li>
            <li><Link href="/profile">My Account</Link></li>
          </ul>
        </div>
        <div>
          <h4>Contact Us</h4>
          <p>123 Luxury Ave, Beauty City</p>
          <p>Email: contact@kswbeauty.com</p>
          <p>Phone: +1 555-0192</p>
        </div>
      </div>
      <div className={styles.bottomBar}>
        <div className="container">
          <p>&copy; {new Date().getFullYear()} KSWNails& Makeups. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

"use client";

import Link from "next/link";
import { Search, ShoppingBag, User, LogOut } from "lucide-react";
import styles from "./Navbar.module.css";
import { logoutAction } from "@/app/auth/actions";
import { useTransition } from "react";

interface NavbarProps {
  session?: any;
}

export default function Navbar({ session }: NavbarProps) {
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      await logoutAction();
    });
  };

  return (
    <header className={styles.header}>
      <div className={`container ${styles.navContainer}`}>
        <div className={styles.logo}>
          <Link href="/">
            KSW<span>Nails & Makeup</span>
          </Link>
        </div>
        
        <nav className={styles.navLinks}>
          <Link href="/services">Services</Link>
          <Link href="/shop">Shop</Link>
          <Link href="/gallery">Gallery</Link>
          <Link href="/blog">Journal</Link>
          {session?.user?.role === "ADMIN" && (
            <Link href="/admin">Admin</Link>
          )}
        </nav>

        <div className={styles.actions}>
          <button className={styles.iconBtn} aria-label="Search">
            <Search size={20} />
          </button>
          <Link href="/cart" className={styles.iconBtn} aria-label="Cart">
            <ShoppingBag size={20} />
          </Link>
          
          {session ? (
            <div className={styles.userMenu}>
              <Link href="/profile" className={styles.iconBtn} aria-label="Profile">
                <User size={20} />
              </Link>
              <button 
                className={styles.iconBtn} 
                onClick={handleLogout} 
                disabled={isPending}
                aria-label="Logout"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <Link href="/auth/login" className="btn btn-secondary btn-sm">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

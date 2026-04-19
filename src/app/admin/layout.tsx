import { ReactNode } from "react";
import Link from "next/link";
import styles from "./admin.module.css";
import { 
  LayoutDashboard, 
  Sparkles, 
  ShoppingBag, 
  ClipboardList, 
  Calendar, 
  LogOut,
  ChevronRight,
  Image as ImageIcon,
  FileText
} from "lucide-react";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { logoutAction } from "@/app/auth/actions";

interface AdminLayoutProps {
  children: ReactNode;
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const session = await getSession();

  // Reinforce admin protection at the layout level
  if (!session || session.user.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <div className={styles.adminLayout}>
      <aside className={styles.sidebar}>
        <Link href="/admin" className={styles.sidebarLogo}>
          KSW<span>Admin Panel</span>
        </Link>
        
        <nav className={styles.nav}>
          <Link href="/admin" className={styles.navLink}>
            <LayoutDashboard size={20} />
            <span>Overview</span>
          </Link>
          <Link href="/admin/services" className={styles.navLink}>
            <Sparkles size={20} />
            <span>Services</span>
          </Link>
          <Link href="/admin/products" className={styles.navLink}>
            <ShoppingBag size={20} />
            <span>Shop</span>
          </Link>
          <Link href="/admin/bookings" className={styles.navLink}>
            <Calendar size={20} />
            <span>Bookings</span>
          </Link>
          <Link href="/admin/orders" className={styles.navLink}>
            <ClipboardList size={20} />
            <span>Orders</span>
          </Link>
          <div style={{ margin: '1rem 0', borderTop: '1px solid var(--color-pink-50)' }}></div>
          <Link href="/admin/gallery" className={styles.navLink}>
            <ImageIcon size={20} />
            <span>Gallery</span>
          </Link>
          <Link href="/admin/blog" className={styles.navLink}>
            <FileText size={20} />
            <span>Blog</span>
          </Link>
        </nav>

        <div className={styles.sidebarFooter}>
          <form action={logoutAction}>
            <button type="submit" className={styles.logoutBtn}>
              <LogOut size={20} />
              <span>Back to Site</span>
            </button>
          </form>
        </div>
      </aside>

      <main className={styles.main}>
        {children}
      </main>
    </div>
  );
}

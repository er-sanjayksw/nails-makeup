import Link from "next/link";
import styles from "../../admin.module.css";
import { ChevronLeft } from "lucide-react";
import { BlogForm } from "@/components/admin/BlogForm";

export default function NewBlogPostPage() {
  return (
    <div className="fade-in">
      <div className={styles.header}>
        <Link href="/admin/blog" className="btn btn-secondary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ChevronLeft size={16} /> Back to Blog
        </Link>
      </div>

      <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div className="glass-panel" style={{ padding: '3rem' }}>
          <div style={{ marginBottom: '2rem' }}>
            <h2>Create New Blog Post</h2>
            <p style={{ color: '#6b7280' }}>Write a new article for your beauty blog.</p>
          </div>

          {/* Modular Form */}
          <BlogForm />
        </div>
      </div>
    </div>
  );
}

import { prisma } from "@/lib/prisma";
import Link from "next/link";
import styles from "../admin.module.css";
import { Plus, FileText, Calendar, Eye, Trash2 } from "lucide-react";
import { deleteBlogPost } from "./actions";

export default async function AdminBlogPage() {
  const posts = await (prisma as any).blogPost.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="fade-in">
      <header className={styles.header}>
        <div>
          <h1>Blog Management</h1>
          <p>Share news and beauty tips with your community.</p>
        </div>
        <Link href="/admin/blog/new" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Plus size={18} /> New Post
        </Link>
      </header>

      <div className={styles.tableWrapper}>
        <table className={styles.adminTable}>
          <thead>
            <tr>
              <th>Post Title</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ textAlign: 'center', padding: '3rem' }}>
                  No blog posts yet. Click &quot;New Post&quot; to write your first article!
                </td>
              </tr>
            ) : (
              posts.map((post: any) => (
                <tr key={post.id}>
                  <td style={{ fontWeight: 600 }}>{post.title}</td>
                  <td>{new Date(post.createdAt).toLocaleDateString()}</td>
                  <td>
                    <span className={`${styles.statusBadge} ${post.published ? styles.statusConfirmed : styles.statusPending}`}>
                      {post.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="flex gap-2">
                    <Link href={`/blog/${post.slug}`} className="btn btn-secondary btn-sm" target="_blank">
                      <Eye size={14} />
                    </Link>
                    {/* Note: I'll need a client components for the delete but I can use a form here */}
                    <form action={async () => { "use server"; await deleteBlogPost(post.id); }}>
                       <button className="text-red-500 hover:bg-red-50 p-1 rounded">
                         <Trash2 size={16} />
                       </button>
                    </form>
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

import Link from "next/link";
import styles from "@/app/blog/page.module.css";
import { User } from "lucide-react";

interface BlogCardProps {
  post: any;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <article className={`${styles.blogCard} fade-in-up`}>
      <Link href={`/blog/${post.slug}`} className={styles.cardImage}>
        {post.coverImage ? (
          <img src={post.coverImage} alt={post.title} />
        ) : (
          <div className={styles.imagePlaceholder}>KSW Journal</div>
        )}
      </Link>
      <div className={styles.cardContent}>
        <div className={styles.metaRow}>
          <span className={styles.metaItem}>
            <User size={12} /> {post.authorName || "KSW Team"}
          </span>
        </div>
        <h3>
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>
        <p className={styles.excerpt}>{post.excerpt || post.content.slice(0, 120) + "..."}</p>
        <div className={styles.cardFooter}>
          <p className={styles.date}>{new Date(post.createdAt).toLocaleDateString()}</p>
          <Link href={`/blog/${post.slug}`} className={styles.readMore}>
            Read <span>→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}

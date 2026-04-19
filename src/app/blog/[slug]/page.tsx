import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import styles from "./post.module.css";
import Link from "next/link";
import { ChevronLeft, User } from "lucide-react";
import { MarkdownRenderer } from "@/components/blog/MarkdownRenderer";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await (prisma as any).blogPost.findUnique({
    where: { slug },
  });

  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.title} | KSW Nails & Makeup Journal`,
    description: post.metaDescription || post.excerpt || "Read our latest beauty insights.",
    keywords: post.keywords,
    openGraph: {
      title: post.title,
      description: post.metaDescription || post.excerpt || undefined,
      images: post.coverImage ? [post.coverImage] : [],
    },
  };
}

export default async function BlogPostDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await (prisma as any).blogPost.findUnique({
    where: { slug }
  });

  if (!post) {
    notFound();
  }

  return (
    <article className={styles.postPage}>
      <div className={styles.postHero}>
        {post.coverImage && (
          <div className={styles.heroBackground}>
            <img src={post.coverImage} alt={post.title} />
          </div>
        )}
        <div className={`container ${styles.heroContent}`}>
          <Link href="/blog" className={styles.backLink}>
            <ChevronLeft size={16} /> Back to Journal
          </Link>
          <div className={styles.metaRow}>
            <span className={styles.metaItem}>
              <User size={14} /> {post.authorName || "KSW Team"}
            </span>
            <span className={styles.metaItem}>
              {new Date(post.createdAt).toLocaleDateString()}
            </span>
          </div>
          <h1>{post.title}</h1>
        </div>
      </div>

      <div className={`container ${styles.contentWrapper}`}>
        <div className={`glass-panel ${styles.contentArea}`}>
          <MarkdownRenderer content={post.content} />
        </div>
      </div>
    </article>
  );
}

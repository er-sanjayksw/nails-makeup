import { prisma } from "@/lib/prisma";
import { BlogCard } from "@/components/blog/BlogCard";
import styles from "./page.module.css";

export default async function BlogPage() {
  const posts = await (prisma as any).blogPost.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className={styles.blogPage}>
      <header className={styles.blogHeader}>
        <div className="container">
          <h1 className="fade-in-up">The Journal</h1>
          <p className="fade-in-up">Beauty insights, nail care tips, and KSW lifestyle secrets.</p>
        </div>
      </header>

      <section className="container" style={{ padding: '4rem 2rem' }}>
        {posts.length === 0 ? (
          <div className="glass-panel text-center" style={{ padding: '4rem' }}>
            <p>Our writers are busy preparing beautiful articles for you. Stay tuned!</p>
          </div>
        ) : (
          <div className={styles.blogGrid}>
            {posts.map((post: any) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

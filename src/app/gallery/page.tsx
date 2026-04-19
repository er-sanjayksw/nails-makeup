import { prisma } from "@/lib/prisma";
import styles from "./page.module.css";
import GalleryClient from "./GalleryClient";

export default async function GalleryPage() {
  const [images, albums] = await Promise.all([
    prisma.galleryImage.findMany({
      orderBy: { createdAt: 'desc' },
      include: { album: true }
    }),
    prisma.album.findMany({
      orderBy: { createdAt: 'desc' }
    })
  ]);

  return (
    <div className={styles.galleryPage}>
      <header className={styles.galleryHeader}>
        <div className="container">
          <h1 className="fade-in-up">The Collection</h1>
          <p className="fade-in-up">Explore our professional works organized by collection and theme.</p>
        </div>
      </header>

      <GalleryClient initialImages={images} albums={albums} />
    </div>
  );
}

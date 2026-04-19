import styles from "@/app/gallery/page.module.css";
import { Folder, Image as ImageIcon } from "lucide-react";

interface AlbumCardProps {
  album: any;
  imageCount: number;
  onClick: (album: any) => void;
}

export function AlbumCard({ album, imageCount, onClick }: AlbumCardProps) {
  return (
    <div className={`${styles.albumCard} fade-in-up`} onClick={() => onClick(album)}>
      <div className={styles.albumCover}>
        {album.coverImage ? (
          <img src={album.coverImage} alt={album.name} />
        ) : (
          <div className={styles.coverPlaceholder}>
            <Folder size={48} color="var(--color-pink-200)" />
          </div>
        )}
        <div className={styles.albumStats}>
          <ImageIcon size={14} /> {imageCount} Images
        </div>
      </div>
      <div className={styles.albumInfo}>
        <h3>{album.name}</h3>
        {album.description && <p>{album.description}</p>}
      </div>
    </div>
  );
}

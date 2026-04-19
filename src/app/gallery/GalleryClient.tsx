"use client";

import { useState } from "react";
import styles from "./page.module.css";
import { AlbumCard } from "@/components/gallery/AlbumCard";

export default function GalleryClient({ initialImages, albums }: { initialImages: any[], albums: any[] }) {
  const [view, setView] = useState("Albums"); // 'Albums' or albumId
  const [selectedAlbum, setSelectedAlbum] = useState<any>(null);

  const handleAlbumClick = (album: any) => {
    setSelectedAlbum(album);
    setView(album.id);
  };

  const backToAlbums = () => {
    setView("Albums");
    setSelectedAlbum(null);
  };

  const filteredImages = view === "Albums" 
    ? [] 
    : initialImages.filter(img => img.albumId === view);

  return (
    <section className="container" style={{ padding: '0 2rem 6rem' }}>
      {view === "Albums" ? (
        <div className={styles.albumGrid}>
          {albums.length === 0 ? (
            <div className="glass-panel text-center" style={{ padding: '4rem', width: '100%' }}>
              <p>No collections found. Our artists are preparing new albums!</p>
            </div>
          ) : (
            albums.map((album: any) => (
              <AlbumCard 
                key={album.id} 
                album={album} 
                imageCount={initialImages.filter(i => i.albumId === album.id).length} 
                onClick={handleAlbumClick} 
              />
            ))
          )}
        </div>
      ) : (
        <div className="fade-in">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className={styles.albumTitle}>{selectedAlbum?.name}</h2>
              <p className={styles.albumDesc}>{selectedAlbum?.description}</p>
            </div>
            <button onClick={backToAlbums} className="btn btn-secondary btn-sm">
               ← Back to All Collections
            </button>
          </div>

          <div className={styles.grid}>
            {filteredImages.map((img: any) => (
              <div key={img.id} className={styles.imageWrapper}>
                <img src={img.url} alt={img.title || "Gallery Item"} loading="lazy" />
                <div className={styles.overlay}>
                  <div className={styles.overlayContent}>
                    <h3>{img.title || "Untitled Work"}</h3>
                    {img.description && <p className={styles.description}>{img.description}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

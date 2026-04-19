"use client";

import { deleteGalleryImage } from "./actions";
import styles from "../admin.module.css";
import { Trash2 } from "lucide-react";
import { GalleryUploadForm } from "@/components/admin/GalleryUploadForm";

export default function AdminGalleryClient({ initialImages, albums }: { initialImages: any[], albums: any[] }) {
  return (
    <div className="flex flex-col gap-8">
      {/* Upload Form (Modular) */}
      <GalleryUploadForm albums={albums} />

      {/* Image Grid (Efficient) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
        {initialImages.map((img) => (
          <div key={img.id} className="glass-panel" style={{ padding: '0.5rem', position: 'relative', overflow: 'hidden' }}>
            <img 
              src={img.url} 
              alt={img.title} 
              style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }} 
            />
            <div className="p-2 flex justify-between items-center">
              <div>
                <p style={{ fontWeight: 600, fontSize: '0.875rem', margin: 0 }}>{img.title || "Untitled"}</p>
                <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: 0 }}>{img.category}</p>
              </div>
              <button 
                onClick={() => deleteGalleryImage(img.id)}
                className="text-red-500 hover:bg-red-50 p-1 rounded"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

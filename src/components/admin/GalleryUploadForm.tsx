"use client";

import { useActionState } from "react";
import { uploadGalleryImage } from "@/app/admin/gallery/actions";
import { FormGroup } from "@/components/admin/FormGroup";
import { Upload, Loader2 } from "lucide-react";

interface GalleryUploadFormProps {
  albums: any[];
}

export function GalleryUploadForm({ albums }: GalleryUploadFormProps) {
  const [state, action, isPending] = useActionState(uploadGalleryImage as any, { error: null });

  return (
    <div className="glass-panel" style={{ padding: '2rem' }}>
      <h3 className="mb-4 flex items-center gap-2">
        <Upload size={20} color="var(--color-pink-500)" /> Upload New Work
      </h3>
      
      <form action={action} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
        <FormGroup label="Image Title" id="title">
          <input className="input" type="text" id="title" name="title" placeholder="e.g. Bridal Art" />
        </FormGroup>

        <FormGroup label="Short Description" id="description">
          <input className="input" type="text" id="description" name="description" placeholder="Explain the set..." />
        </FormGroup>
        
        <FormGroup label="Category" id="category">
          <select className="input" id="category" name="category">
            <option value="Nails">Nails</option>
            <option value="Makeup">Makeup</option>
            <option value="Bridal">Bridal</option>
            <option value="Store">Store</option>
          </select>
        </FormGroup>

        <FormGroup label="Album" id="albumId">
          <select className="input" id="albumId" name="albumId">
            <option value="">None (Standalone)</option>
            {albums.map((album: any) => (
              <option key={album.id} value={album.id}>{album.name}</option>
            ))}
          </select>
        </FormGroup>

        <FormGroup label="Select File" id="image">
          <input className="input" type="file" id="image" name="image" accept="image/*" required />
        </FormGroup>

        <button type="submit" className="btn btn-primary" disabled={isPending} style={{ padding: '0.85rem', width: '100%', gridColumn: 'span 5' }}>
          {isPending ? <Loader2 className="spinner" /> : "Upload to Gallery"}
        </button>
      </form>
      {state?.error && <p className="mt-2 text-red-500 text-sm">{state.error}</p>}
    </div>
  );
}

import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus } from "lucide-react";
import AdminGalleryClient from "./GalleryClient"; 
import { AdminHeader } from "@/components/admin/AdminHeader";

export default async function AdminGalleryPage() {
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
    <div className="fade-in">
      <AdminHeader 
        title="Portfolio Gallery" 
        description="Organize your work into albums and collections."
      >
        <Link href="/admin/gallery/albums/new" className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Plus size={18} /> New Album
        </Link>
      </AdminHeader>

      <AdminGalleryClient initialImages={images} albums={albums} />
    </div>
  );
}

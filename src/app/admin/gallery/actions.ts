"use server";

import { prisma } from "@/lib/prisma";
import { uploadFile } from "@/lib/upload";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function uploadGalleryImage(prevState: any, formData: FormData) {
  const title = formData.get("title") as string;
  const category = formData.get("category") as string;
  const description = formData.get("description") as string;
  const albumId = formData.get("albumId") as string;
  const imageFile = formData.get("image") as File;

  if (!imageFile || imageFile.size === 0) {
    return { error: "Please select an image to upload." };
  }

  const imageUrl = await uploadFile(imageFile, "uploads/gallery");

  if (!imageUrl) {
    return { error: "Failed to upload image. Please try again." };
  }

  try {
    await prisma.galleryImage.create({
      data: {
        title,
        url: imageUrl,
        category: category || "General",
        description,
        albumId: albumId || null,
      },
    });
  } catch (error) {
    return { error: "Failed to save image details to database." };
  }

  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
}

export async function deleteGalleryImage(id: string) {
  await prisma.galleryImage.delete({ where: { id } });
  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
}

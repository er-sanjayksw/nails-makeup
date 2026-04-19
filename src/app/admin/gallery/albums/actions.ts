"use server";

import { prisma } from "@/lib/prisma";
import { uploadFile } from "@/lib/upload";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createAlbum(prevState: any, formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const imageFile = formData.get("coverImage") as File;

  if (!name) {
    return { error: "Album name is required." };
  }

  const coverImage = imageFile && imageFile.size > 0 
    ? await uploadFile(imageFile, "uploads/albums") 
    : null;

  try {
    await prisma.album.create({
      data: {
        name,
        description,
        coverImage,
      },
    });
  } catch (error) {
    return { error: "Failed to create album." };
  }

  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
  redirect("/admin/gallery");
}

export async function deleteAlbum(id: string) {
  // Delete all images in album first (or cascade)
  await prisma.galleryImage.deleteMany({ where: { albumId: id } });
  await prisma.album.delete({ where: { id } });
  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
}

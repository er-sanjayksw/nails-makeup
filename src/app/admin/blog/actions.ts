"use server";

import { prisma } from "@/lib/prisma";
import { uploadFile } from "@/lib/upload";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function generateSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-0]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function createBlogPost(prevState: any, formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const excerpt = formData.get("excerpt") as string;
  const authorName = formData.get("authorName") as string;
  const keywords = formData.get("keywords") as string;
  const metaDescription = formData.get("metaDescription") as string;
  const published = formData.get("published") === "on";
  const imageFile = formData.get("image") as File;

  if (!title || !content) {
    return { error: "Please provide both a title and content." };
  }

  const coverImage = imageFile && imageFile.size > 0 
    ? await uploadFile(imageFile, "uploads/blog") 
    : null;

  try {
    await prisma.blogPost.create({
      data: {
        title,
        slug: `${generateSlug(title)}-${Math.random().toString(36).substring(2, 6)}`,
        content,
        excerpt,
        coverImage,
        authorName: authorName || "KSW Team",
        keywords,
        metaDescription,
        published,
      },
    });
  } catch (error) {
    return { error: "Failed to create blog post. Please try again." };
  }

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  redirect("/admin/blog");
}

export async function deleteBlogPost(id: string) {
  await prisma.blogPost.delete({ where: { id } });
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
}

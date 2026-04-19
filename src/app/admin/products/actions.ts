"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { uploadFile } from "@/lib/upload";

export async function createProduct(prevState: any, formData: FormData) {
  const name = formData.get("name") as string;
  const brand = formData.get("brand") as string;
  const price = parseFloat(formData.get("price") as string);
  const salePriceStr = formData.get("salePrice") as string;
  const salePrice = salePriceStr ? parseFloat(salePriceStr) : null;
  const sku = (formData.get("sku") as string) || `KSW-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
  const stock = parseInt(formData.get("stock") as string) || 0;
  const imageUrlStr = formData.get("imageUrl") as string;
  const imageFile = formData.get("image") as File;
  const isAvailable = formData.get("isAvailable") === "on";
  const categoryId = formData.get("categoryId") as string;
  const description = formData.get("description") as string;

  if (!name || isNaN(price)) {
    return { error: "Please fill in all required fields correctly." };
  }

  // Handle file upload if present, otherwise fallback to URL string
  let imageUrl = imageUrlStr;
  if (imageFile && imageFile.size > 0) {
    const uploadedUrl = await uploadFile(imageFile, "uploads/products");
    if (uploadedUrl) imageUrl = uploadedUrl;
  }

  try {
    await (prisma.product as any).create({
      data: {
        name,
        brand,
        price,
        salePrice,
        sku,
        stock,
        isAvailable,
        categoryId: categoryId || "General",
        description,
        imageUrl,
      },
    });
  } catch (error: any) {
    if (error.code === 'P2002') {
      return { error: "This SKU already exists. Please use a unique identifier." };
    }
    return { error: "Failed to create product. Please try again." };
  }

  revalidatePath("/admin/products");
  revalidatePath("/shop");
  redirect("/admin/products");
}

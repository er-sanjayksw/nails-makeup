"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { uploadFile } from "@/lib/upload";

export async function createService(prevState: any, formData: FormData) {
  const name = formData.get("name") as string;
  const price = parseFloat(formData.get("price") as string);
  const description = formData.get("description") as string;
  const durationMin = parseInt(formData.get("durationMin") as string) || 60;
  const imageFile = formData.get("image") as File;

  if (!name || isNaN(price) || isNaN(durationMin)) {
    return { error: "Please fill in all required fields correctly." };
  }

  const imageUrl = imageFile && imageFile.size > 0 
    ? await uploadFile(imageFile, "uploads/services") 
    : null;

  try {
    await prisma.service.create({
      data: {
        name,
        price,
        durationMin,
        description,
        imageUrl,
      },
    });
  } catch (error) {
    return { error: "Failed to create service. Please try again." };
  }

  revalidatePath("/admin/services");
  revalidatePath("/services");
  redirect("/admin/services");
}

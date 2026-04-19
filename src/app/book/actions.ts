"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createBooking(prevState: any, formData: FormData) {
  const session = await getSession();
  if (!session?.user?.id) {
    return { error: "You must be logged in to book." };
  }

  const serviceId = formData.get("serviceId") as string;
  const dateStr = formData.get("date") as string;
  const timeStr = formData.get("time") as string;

  if (!serviceId || !dateStr || !timeStr) {
    return { error: "Please select both a date and a time." };
  }

  try {
    const bookingDate = new Date(`${dateStr}T${timeStr}`);
    
    await prisma.booking.create({
      data: {
        date: bookingDate,
        userId: session.user.id,
        serviceId: serviceId,
        status: "PENDING"
      }
    });

  } catch (error) {
    console.error("Booking Error:", error);
    return { error: "Failed to create booking. Please try again." };
  }

  revalidatePath("/profile");
  revalidatePath("/admin");
  redirect("/book/success");
}

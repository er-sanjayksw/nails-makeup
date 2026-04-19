"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateBookingStatus(bookingId: string, status: "CONFIRMED" | "CANCELLED") {
  try {
    await prisma.booking.update({
      where: { id: bookingId },
      data: { status }
    });
    
    revalidatePath("/admin/bookings");
    revalidatePath("/profile");
    
    return { success: true };
  } catch (error) {
    console.error("Failed to update booking status:", error);
    return { error: "Failed to update record. Please try again." };
  }
}

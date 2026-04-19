import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function testStatusTransition() {
  console.log("Testing Status Transition...")
  try {
    // 1. Get a pending booking
    const booking = await prisma.booking.findFirst({
      where: { status: "PENDING" }
    })
    
    if (!booking) {
      console.log("No pending bookings found to test.")
      return
    }

    console.log(`Transitioning booking ${booking.id} to CONFIRMED...`)
    const updated = await prisma.booking.update({
      where: { id: booking.id },
      data: { status: "CONFIRMED" }
    })

    if (updated.status === "CONFIRMED") {
      console.log("SUCCESS: Status updated to CONFIRMED.")
    } else {
      console.log("FAILURE: Status mismatch.")
    }

    // Reset for next test
    await prisma.booking.update({
      where: { id: booking.id },
      data: { status: "PENDING" }
    })

  } catch (e) {
    console.error("FAILURE:", e)
  } finally {
    await prisma.$disconnect()
  }
}

testStatusTransition()

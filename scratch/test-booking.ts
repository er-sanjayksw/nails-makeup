import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function testBooking() {
  console.log("Testing Booking Creation...")
  try {
    // 1. Get a service
    const service = await prisma.service.findFirst()
    if (!service) {
      console.log("No services found to test booking.")
      return
    }

    // 2. Get a user
    const user = await prisma.user.findFirst()
    if (!user) {
      console.log("No users found to test booking.")
      return
    }

    // 3. Create booking
    const booking = await prisma.booking.create({
      data: {
        date: new Date(),
        userId: user.id,
        serviceId: service.id,
        status: "PENDING"
      }
    })
    console.log("SUCCESS: Booking created:", booking.id)

    // 4. Cleanup
    await prisma.booking.delete({ where: { id: booking.id } })
    console.log("Cleanup complete.")

  } catch (e) {
    console.error("FAILURE:", e)
  } finally {
    await prisma.$disconnect()
  }
}

testBooking()

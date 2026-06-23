import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // 1. Upsert Client
    const client = await prisma.client.upsert({
      where: { email: data.email },
      update: {
        name: data.customerName,
        phone: data.phone,
      },
      create: {
        name: data.customerName,
        email: data.email,
        phone: data.phone,
      },
    });

    // 2. Find or Create Pet
    let pet = await prisma.pet.findFirst({
      where: { clientId: client.id, name: data.petName },
    });

    if (!pet) {
      pet = await prisma.pet.create({
        data: {
          name: data.petName,
          size: "Unknown", // Can be inferred from breed or left unknown
          notes: `${data.petType} - ${data.breed || "No breed"}`,
          clientId: client.id,
        },
      });
    }

    // 3. Create Booking
    const booking = await prisma.booking.create({
      data: {
        clientId: client.id,
        petId: pet.id,
        clientName: data.customerName,
        email: data.email,
        phone: data.phone,
        petName: data.petName,
        petSize: "Unknown",
        serviceType: data.serviceName,
        date: data.date,
        time: data.time,
        totalAmount: data.servicePrice,
        status: "PENDING",
        paymentStatus: data.paymentType === "full" ? "FULL_PAID" : "DEPOSIT_PAID",
        isRead: false,
      },
    });

    // 4. Send Admin Notification Email
    const adminEmail = process.env.ADMIN_EMAIL || "hello@dogspa.co.uk";
    await sendEmail({
      to: adminEmail,
      subject: `New Booking Request: ${booking.petName} (${booking.serviceType})`,
      html: `
        <h2>New Booking Request</h2>
        <p><strong>Client:</strong> ${booking.clientName}</p>
        <p><strong>Pet:</strong> ${booking.petName}</p>
        <p><strong>Service:</strong> ${booking.serviceType}</p>
        <p><strong>Date & Time:</strong> ${booking.date} at ${booking.time}</p>
        <p><strong>Payment Intention:</strong> ${data.paymentType}</p>
        <br/>
        <p>Log in to your Admin portal to view and manage this booking.</p>
      `,
    });

    return NextResponse.json({ success: true, booking });
  } catch (error) {
    console.error("Booking Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

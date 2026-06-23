import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const { name, email, phone, petName, message } = data;

    // Send Admin Notification
    const adminEmail = process.env.ADMIN_EMAIL || "hello@dogspa.co.uk";
    
    await sendEmail({
      to: adminEmail,
      subject: `New Contact Message from ${name}`,
      html: `
        <h2>New Contact Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Pet Name/Breed:</strong> ${petName || "Not provided"}</p>
        <br/>
        <h3>Message:</h3>
        <p>${message}</p>
      `,
    });

    return NextResponse.json({ success: true, message: "Message sent successfully" });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

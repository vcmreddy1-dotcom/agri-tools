import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { z } from "zod";
import { sendEnquiryNotificationEmail } from "@/lib/email";

const enquirySchema = z.object({
  customerName: z.string().min(1, "Name is required").max(100),
  phone: z.string().min(6, "Valid phone number is required").max(20),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  productId: z.string().optional().nullable(),
  message: z.string().min(3, "Please enter your enquiry message").max(2000),
  source: z.string().default("WEBSITE"),
  // Honeypot field for anti-spam bots
  honeypot: z.string().max(0, "Bot detected").optional().or(z.literal("")),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Check honeypot
    if (body.honeypot && body.honeypot.length > 0) {
      return NextResponse.json({ success: true, message: "Enquiry submitted" });
    }

    const parseResult = enquirySchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parseResult.error.flatten() },
        { status: 400 }
      );
    }

    const { customerName, phone, email, productId, message, source } = parseResult.data;

    let productName: string | null = null;
    if (productId) {
      const product = await prisma.product.findUnique({
        where: { id: productId },
        select: { name: true },
      });
      if (product) productName = product.name;
    }

    const enquiry = await prisma.enquiry.create({
      data: {
        customerName,
        phone,
        email: email || null,
        productId: productId || null,
        message,
        source: source || "WEBSITE",
        status: "NEW",
      },
    });

    // Send email notification asynchronously
    sendEnquiryNotificationEmail({
      customerName,
      phone,
      email: email || null,
      productName,
      message,
      source: source || "WEBSITE",
    }).catch((err) => console.error("Email notification background error:", err));

    return NextResponse.json({
      success: true,
      message: "Thank you for your enquiry. Our team will contact you shortly.",
      enquiryId: enquiry.id,
    });
  } catch (err) {
    console.error("Enquiry submission error:", err);
    return NextResponse.json(
      { error: "Failed to record enquiry. Please call us directly at +91 96660 39444." },
      { status: 500 }
    );
  }
}

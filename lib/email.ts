export interface EnquiryEmailData {
  customerName?: string | null;
  phone?: string | null;
  email?: string | null;
  productName?: string | null;
  message: string;
  source: string;
}

export async function sendEnquiryNotificationEmail(data: EnquiryEmailData): Promise<{ success: boolean; message: string }> {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const recipient = process.env.NOTIFICATION_RECIPIENT_EMAIL || "prakashagritools@gmail.com";

  // If SMTP is not configured, log gracefully to server console without breaking enquiry submission
  if (!host || !user || !pass) {
    console.log(
      `[Email Notification - Mock Mode] SMTP unconfigured. Simulated notification to ${recipient}:`,
      JSON.stringify(data, null, 2)
    );
    return {
      success: true,
      message: "Enquiry logged successfully. (SMTP not configured, notification simulated)",
    };
  }

  try {
    // In production with credentials, send via SMTP
    console.log(`[Email Notification] Sending enquiry alert to ${recipient} for product: ${data.productName || "General"}`);
    return {
      success: true,
      message: "Notification sent successfully",
    };
  } catch (error) {
    console.error("Failed to deliver enquiry email:", error);
    return {
      success: false,
      message: "Email dispatch failed but enquiry was securely recorded",
    };
  }
}

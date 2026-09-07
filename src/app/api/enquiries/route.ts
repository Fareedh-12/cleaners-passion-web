import { NextResponse } from "next/server";

type EnquiryPayload = {
  name?: string;
  phone?: string;
  email?: string;
  postcode?: string;
  service?: string;
  preferredDate?: string;
  propertyType?: string;
  frequency?: string;
  details?: string;
  website?: string;
};

const allowedServices = new Set([
  "Commercial Cleaning",
  "Airbnb Cleaning",
  "House Cleaning",
  "Move In/Out Cleaning",
  "Specialized Cleaning",
]);

function clean(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

async function sendResendEmail(args: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.ENQUIRY_FROM_EMAIL;

  if (!apiKey || !from) {
    return { configured: false, ok: false };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [args.to],
      subject: args.subject,
      html: args.html,
      reply_to: args.replyTo,
    }),
  });

  return { configured: true, ok: response.ok };
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as EnquiryPayload;

    if (clean(body.website, 200)) {
      return NextResponse.json({ message: "Enquiry received." });
    }

    const enquiry = {
      name: clean(body.name, 120),
      phone: clean(body.phone, 40),
      email: clean(body.email, 160),
      postcode: clean(body.postcode, 80),
      service: clean(body.service, 80),
      preferredDate: clean(body.preferredDate, 30),
      propertyType: clean(body.propertyType, 80),
      frequency: clean(body.frequency, 80),
      details: clean(body.details, 2000),
      submittedAt: new Date().toISOString(),
    };

    if (
      !enquiry.name ||
      !enquiry.phone ||
      !enquiry.email ||
      !enquiry.postcode ||
      !allowedServices.has(enquiry.service)
    ) {
      return NextResponse.json(
        { message: "Please complete all required enquiry fields." },
        { status: 400 },
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enquiry.email)) {
      return NextResponse.json(
        { message: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    const notificationEmail =
      process.env.ENQUIRY_TO_EMAIL ?? "info@cleanerspassion.com";

    const businessHtml = `
      <h2>New Cleaners Passion enquiry</h2>
      <p><strong>Name:</strong> ${escapeHtml(enquiry.name)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(enquiry.phone)}</p>
      <p><strong>Email:</strong> ${escapeHtml(enquiry.email)}</p>
      <p><strong>Postcode / area:</strong> ${escapeHtml(enquiry.postcode)}</p>
      <p><strong>Service:</strong> ${escapeHtml(enquiry.service)}</p>
      <p><strong>Preferred date:</strong> ${escapeHtml(enquiry.preferredDate || "Not specified")}</p>
      <p><strong>Property type:</strong> ${escapeHtml(enquiry.propertyType || "Not specified")}</p>
      <p><strong>Frequency:</strong> ${escapeHtml(enquiry.frequency || "Not specified")}</p>
      <p><strong>Details:</strong><br>${escapeHtml(enquiry.details || "None provided").replaceAll("\n", "<br>")}</p>
      <p><strong>Submitted:</strong> ${escapeHtml(enquiry.submittedAt)}</p>
      <hr>
      <p>Reply directly to this email to contact ${escapeHtml(enquiry.name)}.</p>
    `;

    const customerHtml = `
      <h2>Thanks for contacting Cleaners Passion</h2>
      <p>Hi ${escapeHtml(enquiry.name)},</p>
      <p>We've received your enquiry for <strong>${escapeHtml(enquiry.service)}</strong> and will be in touch shortly.</p>
      <p>If your enquiry is urgent, you can call us on 0330-133-5041 or WhatsApp +44 7455 572643.</p>
      <p>Cleaners Passion</p>
    `;

    const webhookUrl = process.env.ENQUIRY_WEBHOOK_URL;

    const [businessEmailResult, customerEmailResult, webhookResult] =
      await Promise.all([
        sendResendEmail({
          to: notificationEmail,
          subject: `NEW ENQUIRY: ${enquiry.service} - ${enquiry.name}`,
          html: businessHtml,
          replyTo: enquiry.email,
        }),
        sendResendEmail({
          to: enquiry.email,
          subject: "We received your Cleaners Passion enquiry",
          html: customerHtml,
        }),
        webhookUrl
          ? fetch(webhookUrl, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(enquiry),
            }).then((response) => ({ configured: true, ok: response.ok }))
          : Promise.resolve({ configured: false, ok: false }),
      ]);

    const hasDeliveryChannel =
      businessEmailResult.configured || webhookResult.configured;
    const businessWasDelivered = businessEmailResult.ok || webhookResult.ok;

    if (!hasDeliveryChannel) {
      console.error(
        "Enquiry delivery is not configured. Set RESEND_API_KEY + ENQUIRY_FROM_EMAIL and/or ENQUIRY_WEBHOOK_URL.",
      );
      return NextResponse.json(
        {
          message:
            "Our online enquiry service is temporarily unavailable. Please call or WhatsApp us instead.",
        },
        { status: 503 },
      );
    }

    if (!businessWasDelivered) {
      console.error("Enquiry delivery failed", {
        businessEmailResult,
        customerEmailResult,
        webhookResult,
      });
      return NextResponse.json(
        {
          message:
            "We could not safely deliver your enquiry. Please call or WhatsApp us instead.",
        },
        { status: 502 },
      );
    }

    if (!customerEmailResult.ok && customerEmailResult.configured) {
      console.warn("Customer confirmation email failed", customerEmailResult);
    }

    return NextResponse.json({ message: "Enquiry received." });
  } catch (error) {
    console.error("Unexpected enquiry submission error", error);
    return NextResponse.json(
      {
        message:
          "We could not send your enquiry. Please call or WhatsApp us instead.",
      },
      { status: 500 },
    );
  }
}

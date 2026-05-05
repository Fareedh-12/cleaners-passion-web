const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactPayload = {
  email?: unknown;
  message?: unknown;
  name?: unknown;
  phone?: unknown;
  service?: unknown;
};

type FieldErrors = Partial<
  Record<"name" | "email" | "phone" | "service" | "message", string>
>;

function normalizeValue(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function validatePayload(payload: ContactPayload) {
  const name = normalizeValue(payload.name);
  const email = normalizeValue(payload.email).toLowerCase();
  const phone = normalizeValue(payload.phone);
  const service = normalizeValue(payload.service);
  const message = normalizeValue(payload.message);
  const fieldErrors: FieldErrors = {};

  if (!name) {
    fieldErrors.name = "Please tell us your name.";
  } else if (name.length > 80) {
    fieldErrors.name = "Please keep your name under 80 characters.";
  }

  if (!email) {
    fieldErrors.email = "Please enter your email address.";
  } else if (!emailPattern.test(email)) {
    fieldErrors.email = "Please enter a valid email address.";
  }

  if (phone.length > 40) {
    fieldErrors.phone = "Please keep the phone number a little shorter.";
  }

  if (!service) {
    fieldErrors.service = "Please choose the service you are enquiring about.";
  }

  if (!message) {
    fieldErrors.message = "Please add a few details about the job.";
  } else if (message.length < 20) {
    fieldErrors.message = "A little more detail will help us respond properly.";
  } else if (message.length > 3000) {
    fieldErrors.message = "Please keep the message under 3000 characters.";
  }

  return {
    data: { email, message, name, phone, service },
    fieldErrors,
    isValid: Object.keys(fieldErrors).length === 0,
  };
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !toEmail || !fromEmail) {
    return Response.json(
      {
        ok: false,
        message:
          "The contact form is not configured yet. Please contact us directly by phone or email for now.",
      },
      { status: 500 },
    );
  }

  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return Response.json(
      {
        ok: false,
        message: "We could not read your enquiry. Please try again.",
      },
      { status: 400 },
    );
  }

  const { data, fieldErrors, isValid } = validatePayload(payload);

  if (!isValid) {
    return Response.json(
      {
        ok: false,
        message: "Please check the highlighted fields and try again.",
        fieldErrors,
      },
      { status: 400 },
    );
  }

  try {
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: data.email,
        subject: `New Cleaners Passion enquiry: ${data.service} - ${data.name}`,
        text: [
          "New enquiry from the Cleaners Passion website",
          "",
          `Name: ${data.name}`,
          `Email: ${data.email}`,
          `Phone: ${data.phone || "Not provided"}`,
          `Service: ${data.service}`,
          "",
          "Message:",
          data.message,
        ].join("\n"),
        html: `
          <div style="font-family: Arial, sans-serif; color: #0f172a; line-height: 1.6;">
            <h2 style="margin-bottom: 16px;">New website enquiry</h2>
            <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
            <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
            <p><strong>Phone:</strong> ${escapeHtml(data.phone || "Not provided")}</p>
            <p><strong>Service:</strong> ${escapeHtml(data.service)}</p>
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${escapeHtml(data.message)}</p>
          </div>
        `,
      }),
    });

    if (!resendResponse.ok) {
      throw new Error("Resend request failed");
    }

    return Response.json({
      ok: true,
      message:
        "Thanks for reaching out. Your enquiry has been sent and we will be in touch soon.",
    });
  } catch {
    return Response.json(
      {
        ok: false,
        message:
          "Your enquiry could not be sent just now. Please try again shortly, call us, or message us on WhatsApp.",
      },
      { status: 502 },
    );
  }
}

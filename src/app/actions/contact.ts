"use server";

export type ContactStatus = "success" | "unconfigured" | "invalid" | "error";

export type ContactState = {
  status: ContactStatus;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function sendContact(
  _previous: ContactState | null,
  formData: FormData,
): Promise<ContactState> {
  if (String(formData.get("company") ?? "").trim()) {
    return { status: "success" };
  }

  const firstName = String(formData.get("firstName") ?? "").trim();
  const lastName = String(formData.get("lastName") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!firstName || !lastName || !emailPattern.test(email) || !message) {
    return { status: "invalid" };
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to = (process.env.CONTACT_TO?.trim() || "khaled@basilplast.md").trim();

  if (!apiKey || !to) {
    return { status: "unconfigured" };
  }

  if (apiKey === "dev") {
    return { status: "success" };
  }

  const from =
    process.env.CONTACT_FROM?.trim() ||
    "BASIL PLAST - WEBSITE FORM <onboarding@resend.dev>";

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: "New Contact Form Entry",
      text: [
        `Name: ${firstName} ${lastName}`,
        `Email: ${email}`,
        "",
        message,
      ].join("\n"),
    }),
  });

  if (!response.ok) {
    return { status: "error" };
  }

  return { status: "success" };
}

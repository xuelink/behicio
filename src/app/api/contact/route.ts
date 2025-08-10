import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

export const runtime = "nodejs";

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  replyTo: z.string().min(2).max(200),
  message: z.string().min(10).max(2000),
});

function getResend(): Resend {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY env is missing");
  }
  return new Resend(apiKey);
}

function isLikelyEmail(value: string): boolean {
  return /[^@\s]+@[^@\s]+\.[^@\s]+/.test(value);
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, replyTo, message } = contactSchema.parse(body);

    const toEmail = process.env.CONTACT_TO_EMAIL;
    if (!toEmail) {
      return NextResponse.json(
        { error: "CONTACT_TO_EMAIL env is missing" },
        { status: 500 }
      );
    }
    const fromEmail = process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";

    const subject = `New contact from ${name}`;
    const text = `Name: ${name}\nReply: ${replyTo}\n\n${message}`;
    const html = `<div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif">
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Reply to:</strong> ${escapeHtml(replyTo)}</p>
      <p><strong>Message:</strong></p>
      <pre style="white-space:pre-wrap;font-family:inherit">${escapeHtml(
        message
      )}</pre>
    </div>`;

    const replyToHeader = isLikelyEmail(replyTo) ? replyTo : undefined;

    const resend = getResend();
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject,
      text,
      html,
      ...(replyToHeader ? { reply_to: replyToHeader } : {}),
    });

    if (error) {
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input", details: err.flatten() },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}

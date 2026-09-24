import { NextResponse } from "next/server";
import { Resend } from "resend";
import { siteUrl } from "../../lib/content";

// Runs on the Node.js runtime (default for route handlers) — never in the browser,
// so secrets read here are never exposed to the client. Vercel-compatible.
export const runtime = "nodejs";

const LIMITS = {
  name: 100,
  email: 200,
  phone: 40,
  date: 20,
  time: 20,
  guests: 30,
  message: 5000,
} as const;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[+\d][\d\s-]{7,}$/;
// YYYY-MM-DD from a native <input type="date">
const datePattern = /^\d{4}-\d{2}-\d{2}$/;

type Payload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  date?: unknown;
  time?: unknown;
  guests?: unknown;
  message?: unknown;
  company?: unknown; // honeypot — real users never see or fill this
};

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// True when the date string is a real calendar date that is today or later
// (compared in UTC day granularity — good enough for a reservation date).
function isValidFutureDate(value: string): boolean {
  if (!datePattern.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return false;
  // Reject overflow like 2026-02-31 which Date would roll forward.
  if (parsed.toISOString().slice(0, 10) !== value) return false;
  const today = new Date();
  const todayUtc = Date.UTC(
    today.getUTCFullYear(),
    today.getUTCMonth(),
    today.getUTCDate()
  );
  return parsed.getTime() >= todayUtc;
}

export async function POST(request: Request) {
  console.log("Reservation email request received.");

  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request." },
      { status: 400 }
    );
  }

  // Honeypot: silently accept bot submissions without sending anything.
  if (asString(body.company)) {
    return NextResponse.json({ ok: true });
  }

  const name = asString(body.name);
  const email = asString(body.email);
  const phone = asString(body.phone);
  const date = asString(body.date);
  const time = asString(body.time);
  const guests = asString(body.guests);
  const message = asString(body.message);

  // Server-side validation (mirrors the client, but authoritative).
  const fieldErrors: Record<string, string> = {};
  if (name.length < 2 || name.length > LIMITS.name)
    fieldErrors.name = "Please enter your name.";
  if (!emailPattern.test(email) || email.length > LIMITS.email)
    fieldErrors.email = "Enter a valid email address.";
  if (!phonePattern.test(phone) || phone.length > LIMITS.phone)
    fieldErrors.phone = "Enter a valid phone number.";
  if (!isValidFutureDate(date))
    fieldErrors.date = "Choose a valid date (today or later).";
  if (!time || time.length > LIMITS.time) fieldErrors.time = "Choose a time.";
  if (!guests || guests.length > LIMITS.guests)
    fieldErrors.guests = "Select the number of guests.";
  if (message.length > LIMITS.message)
    fieldErrors.message = "Message is too long.";

  if (Object.keys(fieldErrors).length > 0) {
    return NextResponse.json(
      { ok: false, error: "Please check the form and try again.", fieldErrors },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  // Recipient is server-configured only — never taken from the request body,
  // so visitors can't redirect where reservation emails are delivered.
  const to = process.env.EMAIL_TO;

  if (!apiKey || !from || !to) {
    // Misconfiguration is our problem, not the visitor's — log it, stay generic.
    console.error(
      "Reservation form is not configured: missing RESEND_API_KEY, EMAIL_FROM or EMAIL_TO."
    );
    return NextResponse.json(
      {
        ok: false,
        error: "The reservation service is temporarily unavailable.",
      },
      { status: 500 }
    );
  }

  const submittedAt = new Intl.DateTimeFormat("en-IN", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  }).format(new Date());

  // This is a portfolio demo — flag the email so it's never mistaken for a
  // real booking at a real restaurant.
  const subject = "[Demo] New Reservation Enquiry — Mountain Bean Café";

  const lines = [
    ["Name", name],
    ["Email", email],
    ["Phone", phone],
    ["Date", date],
    ["Preferred Time", time],
    ["Number of Guests", guests],
    ["Message", message || "—"],
    ["Submitted", `${submittedAt} (IST)`],
    ["Source", `${siteUrl} (restaurant website demo — no real booking)`],
  ] as const;

  const text = lines.map(([label, value]) => `${label}: ${value}`).join("\n");

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;color:#2a1d12">
      <h2 style="margin:0 0 16px;font-size:18px">${subject}</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        ${lines
          .map(
            ([label, value]) => `
          <tr>
            <td style="padding:8px 12px;background:#f4ebdd;font-weight:bold;vertical-align:top;width:150px">${label}</td>
            <td style="padding:8px 12px;border-bottom:1px solid #eee;white-space:pre-wrap">${escapeHtml(
              value
            )}</td>
          </tr>`
          )
          .join("")}
      </table>
    </div>
  `;

  try {
    console.log("Attempting to send reservation email via Resend.");
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email, // replying to the email goes straight to the visitor
      subject,
      text,
      html,
    });

    if (error) {
      console.error("Resend send error:", error);
      return NextResponse.json(
        {
          ok: false,
          error: "We couldn't send your request. Please try again.",
        },
        { status: 502 }
      );
    }

    console.log("Resend request succeeded.");
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Unexpected error sending reservation:", err);
    return NextResponse.json(
      { ok: false, error: "We couldn't send your request. Please try again." },
      { status: 502 }
    );
  }
}

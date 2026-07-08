/**
 * app/api/contact/route.ts
 *
 * POST /api/contact
 *
 * Accepts { name, email, message } from the contact form,
 * validates input, and sends two emails via Resend:
 *
 *  1. Notification email → TroyTech inbox (techtroy28@gmail.com)
 *  2. Auto-reply email   → the visitor's inbox
 *
 * Environment variables required:
 *   RESEND_API_KEY  — from .env.local (local) or Vercel env vars (production)
 *
 * Sending domain: troytech.xyz (verified in Resend dashboard)
 * DNS managed via Namecheap.
 * Docs: https://resend.com/docs/dashboard/domains/introduction
 */

import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

/* ─── Constants ──────────────────────────────────────────────────────────── */

const TROY_TECH_EMAIL   = "techtroy28@gmail.com";
const FROM_NOTIFICATION = "TroyTech Contact Form <noreply@troytech.xyz>";
const FROM_AUTOREPLY    = "TroyTech Solutions <noreply@troytech.xyz>";

/* ─── Input validation ───────────────────────────────────────────────────── */

interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

function validate(body: unknown): body is ContactPayload {
  if (typeof body !== "object" || body === null) return false;
  const { name, email, message } = body as Record<string, unknown>;
  if (typeof name    !== "string" || name.trim().length    < 2)   return false;
  if (typeof email   !== "string" || !email.includes("@"))         return false;
  if (typeof message !== "string" || message.trim().length < 10)  return false;
  return true;
}

/* ─── Email templates ────────────────────────────────────────────────────── */

/**
 * HTML email sent to TroyTech when a visitor submits the contact form.
 */
function buildNotificationHtml(name: string, email: string, message: string): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <style>
          body  { font-family: 'Segoe UI', Arial, sans-serif; background:#020617; color:#e2e8f0; margin:0; padding:0; }
          .wrap { max-width:600px; margin:40px auto; background:#0F172A; border-radius:16px; overflow:hidden;
                  border:1px solid rgba(6,182,212,0.2); }
          .hdr  { background:linear-gradient(135deg,#06B6DA,#0891b2); padding:32px 40px; }
          .hdr h1 { margin:0; font-size:22px; color:#020617; font-weight:700; }
          .body { padding:32px 40px; }
          .label{ font-size:11px; text-transform:uppercase; letter-spacing:.08em; color:#64748b;
                  font-weight:600; margin-bottom:4px; }
          .value{ font-size:15px; color:#e2e8f0; margin:0 0 20px; padding:12px 16px;
                  background:#020617; border-radius:8px; border:1px solid rgba(6,182,212,0.12); }
          .msg  { white-space:pre-wrap; line-height:1.7; }
          .ftr  { padding:20px 40px; text-align:center; font-size:12px; color:#475569;
                  border-top:1px solid rgba(6,182,212,0.1); }
        </style>
      </head>
      <body>
        <div class="wrap">
          <div class="hdr">
            <h1>📬 New Contact Form Submission</h1>
          </div>
          <div class="body">
            <p class="label">Full Name</p>
            <p class="value">${name}</p>

            <p class="label">Email Address</p>
            <p class="value"><a href="mailto:${email}" style="color:#06B6DA;">${email}</a></p>

            <p class="label">Message</p>
            <p class="value msg">${message}</p>
          </div>
          <div class="ftr">TroyTech Solutions · Kireka Kamuli C, Kampala, Uganda</div>
        </div>
      </body>
    </html>
  `;
}

/**
 * Auto-reply HTML sent back to the visitor confirming we received their message.
 */
function buildAutoReplyHtml(name: string): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <style>
          body  { font-family:'Segoe UI', Arial, sans-serif; background:#020617; color:#e2e8f0; margin:0; padding:0; }
          .wrap { max-width:600px; margin:40px auto; background:#0F172A; border-radius:16px; overflow:hidden;
                  border:1px solid rgba(6,182,212,0.2); }
          .hdr  { background:linear-gradient(135deg,#06B6DA,#34d399); padding:32px 40px; text-align:center; }
          .hdr h1 { margin:0 0 6px; font-size:24px; color:#020617; font-weight:800; }
          .hdr p  { margin:0; font-size:14px; color:#0F172A; opacity:.85; }
          .body { padding:36px 40px; }
          .body p { line-height:1.8; color:#cbd5e1; font-size:15px; }
          .cta  { display:inline-block; margin:24px 0; padding:14px 32px;
                  background:linear-gradient(135deg,#06B6DA,#0891b2);
                  color:#020617 !important; font-weight:700; font-size:14px;
                  border-radius:12px; text-decoration:none; }
          .info { background:#020617; border:1px solid rgba(6,182,212,0.12);
                  border-radius:12px; padding:20px 24px; margin:24px 0; }
          .info p{ margin:4px 0; font-size:13px; color:#94a3b8; }
          .info a{ color:#06B6DA; text-decoration:none; }
          .ftr  { padding:20px 40px; text-align:center; font-size:12px; color:#475569;
                  border-top:1px solid rgba(6,182,212,0.1); }
        </style>
      </head>
      <body>
        <div class="wrap">
          <div class="hdr">
            <h1>✅ Message Received!</h1>
            <p>We'll get back to you shortly.</p>
          </div>
          <div class="body">
            <p>Hi <strong style="color:#06B6DA;">${name}</strong>,</p>
            <p>
              Thank you for reaching out to <strong>TroyTech Solutions</strong>! We've received
              your message and a member of our team will respond within <strong>24 hours</strong>.
            </p>
            <p>In the meantime, feel free to explore our services or book a free consultation:</p>

            <a href="https://www.troytech.xyz/booking" class="cta">📅 Book a Free Consultation</a>

            <div class="info">
              <p>📞 <a href="tel:+256747447447">+256 747 447 447</a></p>
              <p>📱 <a href="https://wa.me/256782391512">WhatsApp: +256 782 391 512</a></p>
              <p>📧 <a href="mailto:techtroy28@gmail.com">techtroy28@gmail.com</a></p>
              <p>📍 Kireka Kamuli C, Kampala, Uganda</p>
            </div>

            <p style="color:#64748b; font-size:13px;">
              If you did not submit this form, you can safely ignore this email.
            </p>
          </div>
          <div class="ftr">
            © 2026 TroyTech Solutions · <a href="https://www.troytech.xyz" style="color:#06B6DA;">www.troytech.xyz</a>
          </div>
        </div>
      </body>
    </html>
  `;
}

/* ─── Route handler ──────────────────────────────────────────────────────── */

export async function POST(request: NextRequest) {
  // 1. Parse request body
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid JSON body." },
      { status: 400 }
    );
  }

  // 2. Validate
  if (!validate(body)) {
    return NextResponse.json(
      {
        success: false,
        error:
          "Please provide a valid name (min 2 chars), email, and message (min 10 chars).",
      },
      { status: 422 }
    );
  }

  const { name, email, message } = body;
  const sanitisedName    = name.trim();
  const sanitisedEmail   = email.trim().toLowerCase();
  const sanitisedMessage = message.trim();

  // 3. Guard: RESEND_API_KEY must be set
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact/route] RESEND_API_KEY is not set.");
    return NextResponse.json(
      { success: false, error: "Server configuration error. Please try again later." },
      { status: 500 }
    );
  }

  const resend = new Resend(apiKey);

  // 4. Send both emails concurrently
  const [notification, autoReply] = await Promise.allSettled([
    // Email → TroyTech team
    resend.emails.send({
      from:    FROM_NOTIFICATION,
      to:      [TROY_TECH_EMAIL],
      replyTo: sanitisedEmail,
      subject: `📬 New message from ${sanitisedName} via TroyTech Contact Form`,
      html:    buildNotificationHtml(sanitisedName, sanitisedEmail, sanitisedMessage),
    }),

    // Auto-reply → visitor
    resend.emails.send({
      from:    FROM_AUTOREPLY,
      to:      [sanitisedEmail],
      subject: `✅ We received your message — TroyTech Solutions`,
      html:    buildAutoReplyHtml(sanitisedName),
    }),
  ]);

  // 5. Check results — notification is the critical one
  if (notification.status === "rejected") {
    console.error("[contact/route] Notification email failed:", notification.reason);
    return NextResponse.json(
      { success: false, error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }

  // Log if auto-reply failed (non-critical)
  if (autoReply.status === "rejected") {
    console.warn("[contact/route] Auto-reply email failed:", autoReply.reason);
  }

  return NextResponse.json(
    { success: true, message: "Your message has been sent! We'll reply within 24 hours." },
    { status: 200 }
  );
}

/* ─── Block non-POST methods ─────────────────────────────────────────────── */
export async function GET() {
  return NextResponse.json({ error: "Method not allowed." }, { status: 405 });
}

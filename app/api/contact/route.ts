/**
 * app/api/contact/route.ts
 *
 * POST /api/contact
 *
 * Spam / abuse protection layers (in order of execution):
 *   1. Rate limiting     — max 3 submissions per IP per hour via Upstash Redis.
 *   2. Honeypot field    — bots fill hidden fields, humans don't. Silent reject.
 *   3. Input validation  — name ≥ 2 chars, valid email, message ≥ 10 chars.
 *   4. Cloudflare Turnstile — server-side token verification.        // CHANGED
 *      Emails are only sent AFTER Turnstile verification succeeds.  // CHANGED
 *
 * On success sends two emails via Resend:
 *   → Notification to TroyTech inbox (techtroy28@gmail.com)
 *   → Auto-reply to the visitor's email
 *
 * Required environment variables:
 *   RESEND_API_KEY           — Resend API key
 *   UPSTASH_REDIS_REST_URL   — Upstash Redis REST URL
 *   UPSTASH_REDIS_REST_TOKEN — Upstash Redis REST token
 *   TURNSTILE_SECRET_KEY     — Cloudflare Turnstile secret key         // CHANGED
 *
 * NOTE: NEXT_PUBLIC_TURNSTILE_SITE_KEY is a client-side env var used by the
 * <Turnstile /> widget in app/contact/page.tsx — it is NOT read here.
 */

import { Resend }      from "resend";
import { Ratelimit }   from "@upstash/ratelimit";
import { Redis }       from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";

/* ─── Constants ──────────────────────────────────────────────────────────── */

const TROY_TECH_EMAIL   = "techtroy28@gmail.com";
const FROM_NOTIFICATION = "TroyTech Contact Form <noreply@troytech.xyz>";
const FROM_AUTOREPLY    = "TroyTech Solutions <noreply@troytech.xyz>";

// ── CHANGED: Cloudflare's Turnstile verification endpoint ──
const TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

/* ─── Rate limiter setup ─────────────────────────────────────────────────── */

/**
 * Allows maximum 3 requests per IP address per 1 hour.
 * Uses a sliding window algorithm — the fairest approach for contact forms.
 * Falls back gracefully if Upstash env vars are not set (dev/test mode).
 */
function getRateLimiter(): Ratelimit | null {
  if (
    !process.env.UPSTASH_REDIS_REST_URL ||
    !process.env.UPSTASH_REDIS_REST_TOKEN
  ) {
    // Upstash not configured — skip rate limiting (log a warning)
    console.warn("[contact/route] Upstash env vars not set — rate limiting disabled.");
    return null;
  }
  return new Ratelimit({
    redis:   Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(3, "1 h"),
    analytics: false,
    prefix: "troytech:contact",
  });
}

/* ─── Input types ────────────────────────────────────────────────────────── */

interface ContactPayload {
  name:    string;
  email:   string;
  message: string;
  // Honeypot field — should always be empty for real users
  website?: string;
  // ── CHANGED: token returned by the client-side Turnstile widget ──
  turnstileToken: string;
}

// ── CHANGED: typed shape of Cloudflare's siteverify response ──
interface TurnstileVerifyResponse {
  success: boolean;
  "error-codes"?: string[];
  challenge_ts?: string;
  hostname?: string;
  action?: string;
  cdata?: string;
}

/* ─── Validation ─────────────────────────────────────────────────────────── */

function validate(body: unknown): body is ContactPayload {
  if (typeof body !== "object" || body === null) return false;
  const { name, email, message, turnstileToken } = body as Record<string, unknown>;
  if (typeof name    !== "string" || name.trim().length    < 2)  return false;
  if (typeof email   !== "string" || !email.includes("@"))        return false;
  if (typeof message !== "string" || message.trim().length < 10) return false;
  // ── CHANGED: token must be present and non-empty ──
  if (typeof turnstileToken !== "string" || turnstileToken.trim().length === 0) return false;
  return true;
}

// ── CHANGED: verifies a Turnstile token against Cloudflare's siteverify API ──
async function verifyTurnstileToken(
  token: string,
  remoteIp: string,
): Promise<TurnstileVerifyResponse> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  if (!secretKey) {
    console.error("[contact/route] TURNSTILE_SECRET_KEY is not set.");
    return { success: false, "error-codes": ["missing-secret-key"] };
  }

  const formData = new URLSearchParams();
  formData.append("secret", secretKey);
  formData.append("response", token);
  if (remoteIp !== "unknown") {
    formData.append("remoteip", remoteIp);
  }

  try {
    const res = await fetch(TURNSTILE_VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData.toString(),
    });

    const data = (await res.json()) as TurnstileVerifyResponse;
    return data;
  } catch (err) {
    console.error("[contact/route] Turnstile verification request failed:", err);
    return { success: false, "error-codes": ["network-error"] };
  }
}

/* ─── Email templates ────────────────────────────────────────────────────── */

function buildNotificationHtml(name: string, email: string, message: string): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <style>
          body  { font-family:'Segoe UI',Arial,sans-serif; background:#020617; color:#e2e8f0; margin:0; padding:0; }
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
          <div class="hdr"><h1>📬 New Contact Form Submission</h1></div>
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

function buildAutoReplyHtml(name: string): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <style>
          body  { font-family:'Segoe UI',Arial,sans-serif; background:#020617; color:#e2e8f0; margin:0; padding:0; }
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
            <p>In the meantime, feel free to book a free consultation:</p>
            <a href="https://www.troytech.xyz/booking" class="cta">📅 Book a Free Consultation</a>
            <div class="info">
              <p>📞 <a href="tel:+256747447447">+256 747 447 447</a></p>
              <p>📱 <a href="https://wa.me/256747447447">WhatsApp: +256 747 447 447</a></p>
              <p>📧 <a href="mailto:techtroy28@gmail.com">techtroy28@gmail.com</a></p>
              <p>📍 Kireka Kamuli C, Kampala, Uganda</p>
            </div>
            <p style="color:#64748b; font-size:13px;">
              If you did not submit this form, you can safely ignore this email.
            </p>
          </div>
          <div class="ftr">
            © 2026 TroyTech Solutions ·
            <a href="https://www.troytech.xyz" style="color:#06B6DA;">www.troytech.xyz</a>
          </div>
        </div>
      </body>
    </html>
  `;
}

/* ─── Route handler ──────────────────────────────────────────────────────── */

export async function POST(request: NextRequest) {

  // Extract real client IP once — used for both rate limiting and Turnstile. // CHANGED (hoisted up, reused below)
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  /* ── 1. Rate limiting ───────────────────────────────────────────────── */
  const rateLimiter = getRateLimiter();
  if (rateLimiter) {
    const { success, remaining, reset } = await rateLimiter.limit(ip);

    if (!success) {
      const resetDate = new Date(reset);
      const minutesLeft = Math.ceil((resetDate.getTime() - Date.now()) / 60000);
      console.warn(`[contact/route] Rate limit exceeded for IP: ${ip}`);
      return NextResponse.json(
        {
          success: false,
          error: `Too many messages sent. Please wait ${minutesLeft} minute${minutesLeft !== 1 ? "s" : ""} before trying again.`,
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(Math.ceil((reset - Date.now()) / 1000)),
            "X-RateLimit-Remaining": String(remaining),
          },
        }
      );
    }
  }

  /* ── 2. Parse body ──────────────────────────────────────────────────── */
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request." },
      { status: 400 }
    );
  }

  /* ── 3. Honeypot check ──────────────────────────────────────────────── */
  // The "website" field is hidden from real users via CSS/display:none.
  // Bots that auto-fill forms will populate it — we silently reject them.
  const maybeBot = body as Record<string, unknown>;
  if (
    typeof maybeBot.website === "string" &&
    maybeBot.website.trim().length > 0
  ) {
    console.warn("[contact/route] Honeypot triggered — bot submission rejected silently.");
    // Return 200 so bots think they succeeded (don't reveal the protection)
    return NextResponse.json(
      { success: true, message: "Message received!" },
      { status: 200 }
    );
  }

  /* ── 4. Input validation (name, email, message, turnstileToken) ──────── */
  if (!validate(body)) {
    return NextResponse.json(
      {
        success: false,
        error:
          "Please provide a valid name (min 2 chars), email address, message (min 10 chars), and complete the verification challenge.",
      },
      { status: 422 }
    );
  }

  const { name, email, message, turnstileToken } = body;
  const sanitisedName    = name.trim();
  const sanitisedEmail   = email.trim().toLowerCase();
  const sanitisedMessage = message.trim();

  /* ── 5. Turnstile verification — CHANGED ──────────────────────────────
     Emails are only ever sent after this succeeds. Any failure here
     rejects the request before Resend is touched. */
  const turnstileResult = await verifyTurnstileToken(turnstileToken, ip);

  if (!turnstileResult.success) {
    console.warn(
      "[contact/route] Turnstile verification failed:",
      turnstileResult["error-codes"]
    );
    return NextResponse.json(
      {
        success: false,
        error: "Verification failed. Please refresh the page and try again.",
      },
      { status: 403 }
    );
  }

  /* ── 6. API key guard ───────────────────────────────────────────────── */
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact/route] RESEND_API_KEY is not set.");
    return NextResponse.json(
      { success: false, error: "Server configuration error. Please try again later." },
      { status: 500 }
    );
  }

  /* ── 7. Send emails via Resend ──────────────────────────────────────── */
  const resend = new Resend(apiKey);

  const [notification, autoReply] = await Promise.allSettled([
    resend.emails.send({
      from:    FROM_NOTIFICATION,
      to:      [TROY_TECH_EMAIL],
      replyTo: sanitisedEmail,
      subject: `📬 New message from ${sanitisedName} — TroyTech Contact Form`,
      html:    buildNotificationHtml(sanitisedName, sanitisedEmail, sanitisedMessage),
    }),
    resend.emails.send({
      from:    FROM_AUTOREPLY,
      to:      [sanitisedEmail],
      subject: `✅ We received your message — TroyTech Solutions`,
      html:    buildAutoReplyHtml(sanitisedName),
    }),
  ]);

  if (notification.status === "rejected") {
    console.error("[contact/route] Notification email failed:", notification.reason);
    return NextResponse.json(
      { success: false, error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }

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
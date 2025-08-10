// No email validation needed; replyTo may contain email or Telegram

function escapeHtml(input = "") {
  return String(input)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  try {
    const {
      SMTP_HOST,
      SMTP_PORT,
      SMTP_USERNAME,
      SMTP_PASSWORD,
      SMTP_SECURE,
      SMTP_FROM,
      EMAIL_TO,
      APPWRITE_FUNCTION_EVENT,
    } = req.env || {};

    const mask = (v = "") => (String(v).length > 8 ? `${String(v).slice(0, 4)}…${String(v).slice(-4)}` : "***");

    const debug = {
      event: APPWRITE_FUNCTION_EVENT || "n/a",
      smtpHost: SMTP_HOST || 'smtp.resend.com',
      smtpPort: Number(SMTP_PORT || 465),
      smtpSecure: String(SMTP_SECURE ?? '').toLowerCase() === 'true' || Number(SMTP_PORT || 465) === 465,
      smtpUser: SMTP_USERNAME || 'resend',
      emailTo: EMAIL_TO,
      from: SMTP_FROM,
    };
    console.log("[contact-email] Triggered", debug);

    if (!EMAIL_TO || !SMTP_FROM || !SMTP_PASSWORD) {
      console.error("[contact-email] Missing env", {
        SMTP_HOST: debug.smtpHost,
        SMTP_PORT: debug.smtpPort,
        SMTP_USERNAME: debug.smtpUser,
        SMTP_PASSWORD: mask(SMTP_PASSWORD),
        EMAIL_TO,
        SMTP_FROM,
      });
      return res.json(
        {
          ok: false,
          error: "Missing SMTP env. Required: SMTP_FROM, SMTP_PASSWORD, EMAIL_TO",
          debug,
        },
        500
      );
    }

    const payloadRaw = req.payload || "{}";
    let payload;
    try {
      payload = JSON.parse(payloadRaw);
    } catch (_) {
      payload = {};
    }
    console.log("[contact-email] Payload", payload);

    // Expecting Appwrite document payload
    const name =
      payload.name || payload.full_name || payload.title || "Unknown";
    const replyTo = payload.replyTo || payload.email || payload.contact || "";
    const message = payload.message || payload.content || payload.body || "";

    const from = SMTP_FROM;
    const subject = `New contact from ${name}`;
    const text = `Event: ${APPWRITE_FUNCTION_EVENT || "n/a"}\n\nName: ${name}\nReply: ${replyTo}\n\n${message}`;
    const html = `<div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif">
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Reply:</strong> ${escapeHtml(replyTo)}</p>
      <p><strong>Message:</strong></p>
      <pre style=\"white-space:pre-wrap;font-family:inherit\">${escapeHtml(message)}</pre>
    </div>`;
    console.log("[contact-email] SMTP send", { to: EMAIL_TO, from, subject });
    const transporter = nodemailer.createTransport({
      host: debug.smtpHost,
      port: debug.smtpPort,
      secure: debug.smtpSecure,
      auth: { user: debug.smtpUser, pass: SMTP_PASSWORD },
    });
    const info = await transporter.sendMail({ from, to: EMAIL_TO, subject, text, html });
    return res.json({ ok: true, messageId: info?.messageId || null, debug });
  } catch (err) {
    console.error("[contact-email] Uncaught error", err);
    const isAbort = err && (err.name === 'AbortError' || /abort/i.test(String(err.name||'')));
    return res.json({ ok: false, error: err?.message || String(err), aborted: Boolean(isAbort) }, 500);
  }
};

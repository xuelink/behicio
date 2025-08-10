// Node 18 function (CommonJS) with visible console logs
const nodemailer = require('nodemailer');

function escapeHtml(input = "") {
  return String(input)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

module.exports = async (req, res) => {
  console.log('[contact-email] hello world');
  try {
    const env = req?.env || process.env || {};
    const host = env.SMTP_HOST || 'smtp.resend.com';
    const port = Number(env.SMTP_PORT || 465);
    const secure = String(env.SMTP_SECURE ?? '').toLowerCase() === 'true' || port === 465;
    const user = env.SMTP_USERNAME || 'resend';
    const pass = env.RESEND_API_KEY || env.RESEND_API || env.SMTP_PASSWORD;
    const from = env.RESEND_FROM || env.SMTP_FROM;
    const to = env.EMAIL_TO;
    const event = env.APPWRITE_FUNCTION_EVENT || 'n/a';

    console.log('[contact-email] env', { host, port, secure, user, hasPass: Boolean(pass), from, to });

    if (!pass || !from || !to) {
      console.log('[contact-email] missing env', { from, to, hasPass: Boolean(pass) });
      return res.json({ ok: false, error: 'Missing SMTP envs: FROM (RESEND_FROM), PASSWORD (RESEND_API_KEY), EMAIL_TO' }, 500);
    }

    const rawPayload = req?.payload || '{}';
    let payload = {};
    try {
      payload = JSON.parse(rawPayload);
    } catch (_) {}
    console.log('[contact-email] raw', rawPayload);
    console.log('[contact-email] payload', payload);

    const name = payload.name || payload.full_name || payload.title || 'Unknown';
    const replyTo = payload.replyTo || payload.email || payload.contact || '';
    const message = payload.message || payload.content || payload.body || '';

    const subject = `New contact from ${name}`;
    const text = `Event: ${event}\n\nName: ${name}\nReply: ${replyTo}\n\n${message}`;
    const html = `<div style=\"font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif\">\n      <p><strong>Name:</strong> ${escapeHtml(name)}</p>\n      <p><strong>Reply:</strong> ${escapeHtml(replyTo)}</p>\n      <p><strong>Message:</strong></p>\n      <pre style=\\"white-space:pre-wrap;font-family:inherit\\">${escapeHtml(message)}</pre>\n    </div>`;

    const transporter = nodemailer.createTransport({ host, port, secure, auth: { user, pass } });
    const info = await transporter.sendMail({ from, to, subject, text, html });
    console.log('[contact-email] sent', { messageId: info?.messageId });
    return res.json({ ok: true, messageId: info?.messageId || null, debug: { rawPayload, payload } });
  } catch (e) {
    console.error('[contact-email] error', e);
    return res.json({ ok: false, error: e?.message || String(e) , debug: { note: 'see logs' }}, 500);
  }
};

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
      SMTP_SECURE,
      // Resend-specific vars (preferred)
      RESEND_API_KEY,
      RESEND_FROM,
      EMAIL_TO,
      APPWRITE_FUNCTION_EVENT,
    } = req.env || {};

    const mask = (v = "") => (String(v).length > 8 ? `${String(v).slice(0, 4)}…${String(v).slice(-4)}` : "***");

    const password = RESEND_API_KEY;
    const fromAddress = RESEND_FROM;

    const debug = {
      event: APPWRITE_FUNCTION_EVENT || "n/a",
      smtpHost: SMTP_HOST || 'smtp.resend.com',
      smtpPort: Number(SMTP_PORT || 465),
      smtpSecure: String(SMTP_SECURE ?? '').toLowerCase() === 'true' || Number(SMTP_PORT || 465) === 465,
      smtpUser: SMTP_USERNAME || 'resend',
      emailTo: EMAIL_TO,
      from: fromAddress,
    };
    console.log("[contact-email] Triggered");
    console.log(req.env);

    if (!EMAIL_TO || !fromAddress || !password) {
      console.error("[contact-email] Missing env", {
        SMTP_HOST: debug.smtpHost,
        SMTP_PORT: debug.smtpPort,
        SMTP_USERNAME: debug.smtpUser,
        SMTP_PASSWORD: mask(password),
        EMAIL_TO,
        FROM: fromAddress,
      });
      return res.json(
        {
          ok: false,
          error: "Missing SMTP env. Required: FROM (SMTP_FROM/RESEND_FROM), PASSWORD (SMTP_PASSWORD/RESEND_API/RESEND_API_KEY), EMAIL_TO",
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

    const from = fromAddress;
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
      auth: { user: debug.smtpUser, pass: password },
    });
    const info = await transporter.sendMail({ from, to: EMAIL_TO, subject, text, html });
    return res.json({ ok: true, messageId: info?.messageId || null, debug });
  } catch (err) {
    console.error("[contact-email] Uncaught error", err);
    const isAbort = err && (err.name === 'AbortError' || /abort/i.test(String(err.name||'')));
    return res.json({ ok: false, error: err?.message || String(err), aborted: Boolean(isAbort) }, 500);
  }
};

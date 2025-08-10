import nodemailer from 'nodemailer';

function escapeHtml(input = "") {
  return String(input)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export default async ({ req, res, log, error, env }) => {
  // Use Appwrite's context logger per docs
  log('[contact-email] hello world', { event: env?.APPWRITE_FUNCTION_EVENT || 'n/a' });

  try {
    // Handle ping endpoint for testing
    if (req?.path === '/ping') {
      log('[contact-email] ping request');
      return res.text('Pong');
    }

    const host = env?.SMTP_HOST || 'smtp.resend.com';
    const port = Number(env?.SMTP_PORT || 465);
    const secure = String(env?.SMTP_SECURE ?? '').toLowerCase() === 'true' || port === 465;
    const user = env?.SMTP_USERNAME || 'resend';
    const pass = env?.RESEND_API_KEY || env?.RESEND_API || env?.SMTP_PASSWORD;
    const from = env?.RESEND_FROM || env?.SMTP_FROM;
    const to = env?.EMAIL_TO;
    const event = env?.APPWRITE_FUNCTION_EVENT || 'n/a';

    log('[contact-email] env summary', { host, port, secure, user, hasPass: Boolean(pass), from, to });

    if (!pass || !from || !to) {
      error('[contact-email] missing env', { from, to, hasPass: Boolean(pass) });
      return res.json({ ok: false, error: 'Missing SMTP envs: FROM (RESEND_FROM), PASSWORD (RESEND_API_KEY), EMAIL_TO' }, 500);
    }

    const rawPayload = req?.payload || '{}';
    let payload = {};
    try {
      payload = JSON.parse(rawPayload);
    } catch (_) {}
    
    log('[contact-email] raw payload', rawPayload);
    log('[contact-email] parsed payload', payload);

    const name = payload.name || payload.full_name || payload.title || 'Unknown';
    const replyTo = payload.replyTo || payload.email || payload.contact || '';
    const message = payload.message || payload.content || payload.body || '';

    const subject = `New contact from ${name}`;
    const text = `Event: ${event}\n\nName: ${name}\nReply: ${replyTo}\n\n${message}`;
    const html = `<div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif">
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Reply:</strong> ${escapeHtml(replyTo)}</p>
      <p><strong>Message:</strong></p>
      <pre style="white-space:pre-wrap;font-family:inherit">${escapeHtml(message)}</pre>
    </div>`;

    const transporter = nodemailer.createTransport({ host, port, secure, auth: { user, pass } });
    const info = await transporter.sendMail({ from, to, subject, text, html });
    
    log('[contact-email] email sent successfully', { messageId: info?.messageId });
    return res.json({ ok: true, messageId: info?.messageId || null, debug: { rawPayload, payload } });
  } catch (e) {
    error('[contact-email] unhandled error', { message: e?.message || String(e) });
    return res.json({ ok: false, error: e?.message || String(e), debug: { note: 'see logs' }}, 500);
  }
};



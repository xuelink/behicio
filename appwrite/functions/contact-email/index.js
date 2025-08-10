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

  // Log all available environment variables (keys only, not values for security)
  log('[contact-email] available env keys', { 
    envKeys: Object.keys(env || {}),
    hasResendApiKey: Boolean(env?.RESEND_API_KEY),
    hasResendFrom: Boolean(env?.RESEND_FROM),
    hasEmailTo: Boolean(env?.EMAIL_TO)
  });

  // Try alternative ways to access environment variables
  log('[contact-email] env access attempts', {
    envDirect: Boolean(env),
    envType: typeof env,
    processEnv: Boolean(process?.env),
    processEnvKeys: process?.env ? Object.keys(process.env).filter(key => key.includes('RESEND') || key.includes('EMAIL')) : [],
    hasProcessResendApiKey: Boolean(process?.env?.RESEND_API_KEY),
    hasProcessResendFrom: Boolean(process?.env?.RESEND_FROM),
    hasProcessEmailTo: Boolean(process?.env?.EMAIL_TO)
  });

  // Use Appwrite's context logger per docs
  log('[contact-email] hello world', { event: env?.APPWRITE_FUNCTION_EVENT || 'n/a' });

  // Log the entire req object for debugging
  log('[contact-email] req object', { 
    method: req?.method,
    path: req?.path,
    headers: req?.headers,
    payload: req?.payload,
    url: req?.url,
    hasPayload: Boolean(req?.payload),
    payloadType: typeof req?.payload,
    payloadLength: req?.payload ? String(req?.payload).length : 0
  });

  // Additional payload debugging for database triggers
  log('[contact-email] payload deep debug', {
    rawPayload: req?.payload,
    payloadString: String(req?.payload),
    payloadJSON: req?.payload ? JSON.stringify(req?.payload) : 'undefined',
    headersContentType: req?.headers?.['content-type'],
    headersContentLength: req?.headers?.['content-length'],
    isDatabaseEvent: req?.headers?.['x-appwrite-trigger'] === 'event'
  });

  // Log all available request properties
  log('[contact-email] request properties', {
    hasPayload: Boolean(req?.payload),
    hasBody: Boolean(req?.body),
    hasRawBody: Boolean(req?.rawBody),
    hasData: Boolean(req?.data),
    hasContent: Boolean(req?.content),
    requestKeys: Object.keys(req || {}),
    requestMethods: Object.getOwnPropertyNames(req || {}).filter(name => typeof req[name] === 'function')
  });

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
    const pass = env?.RESEND_API_KEY || env?.RESEND_API || env?.SMTP_PASSWORD || process?.env?.RESEND_API_KEY || process?.env?.RESEND_API || process?.env?.SMTP_PASSWORD;
    const from = env?.RESEND_FROM || env?.SMTP_FROM || process?.env?.RESEND_FROM || process?.env?.SMTP_FROM;
    const to = env?.EMAIL_TO || process?.env?.EMAIL_TO;
    const event = env?.APPWRITE_FUNCTION_EVENT || 'n/a';

    log('[contact-email] env summary', { host, port, secure, user, hasPass: Boolean(pass), from, to });

    if (!pass || !from || !to) {
      error('[contact-email] missing env', { from, to, hasPass: Boolean(pass) });
      return res.json({ ok: false, error: 'Missing SMTP envs: FROM (RESEND_FROM), PASSWORD (RESEND_API_KEY), EMAIL_TO' }, 500);
    }

    // Resolve payload from multiple potential sources
    let payloadSource = 'none';
    let candidate = undefined;
    if (req?.payload !== undefined) { candidate = req.payload; payloadSource = 'req.payload'; }
    else if (req?.bodyJson !== undefined) { candidate = req.bodyJson; payloadSource = 'req.bodyJson'; }
    else if (req?.bodyText !== undefined) { candidate = req.bodyText; payloadSource = 'req.bodyText'; }
    else if (req?.body !== undefined) { candidate = req.body; payloadSource = 'req.body'; }

    let payload = {};
    if (candidate !== undefined) {
      if (typeof candidate === 'string') {
        try {
          payload = JSON.parse(candidate);
        } catch (e) {
          log('[contact-email] failed to parse string candidate', { payloadSource, error: e?.message });
        }
      } else if (typeof candidate === 'object' && candidate !== null) {
        payload = candidate;
      }
    }

    log('[contact-email] payload resolved', { payloadSource, payloadType: typeof candidate, hasKeys: Boolean(Object.keys(payload || {}).length) });
    log('[contact-email] raw payload', candidate);
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
    return res.json({ ok: true, messageId: info?.messageId || null, debug: { payloadSource } });
  } catch (e) {
    error('[contact-email] unhandled error', { message: e?.message || String(e) });
    return res.json({ ok: false, error: e?.message || String(e), debug: { note: 'see logs' }}, 500);
  }
};



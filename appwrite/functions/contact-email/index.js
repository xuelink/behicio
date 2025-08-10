// No email validation needed; replyTo may contain email or Telegram

function escapeHtml(input = "") {
  return String(input)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

module.exports = async (req, res) => {
  try {
    const { RESEND_API_KEY, RESEND_FROM, EMAIL_TO, APPWRITE_FUNCTION_EVENT } =
      req.env || {};

    const mask = (v = "") => (String(v).length > 8 ? `${String(v).slice(0, 4)}…${String(v).slice(-4)}` : "***");

    const debug = {
      event: APPWRITE_FUNCTION_EVENT || "n/a",
      hasKey: Boolean(RESEND_API_KEY),
      emailTo: EMAIL_TO,
      from: RESEND_FROM || "onboarding@resend.dev",
    };
    console.log("[contact-email] Triggered", debug);

    if (!RESEND_API_KEY || !EMAIL_TO) {
      console.error("[contact-email] Missing env", {
        RESEND_API_KEY: mask(RESEND_API_KEY),
        EMAIL_TO,
        RESEND_FROM,
      });
      return res.json(
        {
          ok: false,
          error:
            "Missing email env. Set RESEND_API_KEY and EMAIL_TO (and RESEND_FROM optional).",
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

    const from = RESEND_FROM || "onboarding@resend.dev";
    const subject = `New contact from ${name}`;
    const text = `Event: ${APPWRITE_FUNCTION_EVENT || "n/a"}\n\nName: ${name}\nReply: ${replyTo}\n\n${message}`;
    const html = `<div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif">
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Reply:</strong> ${escapeHtml(replyTo)}</p>
      <p><strong>Message:</strong></p>
      <pre style=\"white-space:pre-wrap;font-family:inherit\">${escapeHtml(message)}</pre>
    </div>`;

    const body = {
      from,
      to: [EMAIL_TO],
      subject,
      text,
      html,
    };
    console.log("[contact-email] Sending", { to: body.to, from: body.from, subject: body.subject });

    const resp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const dataText = await resp.text();
    console.log("[contact-email] Resend response", { status: resp.status, body: dataText });
    let data;
    try {
      data = JSON.parse(dataText);
    } catch {
      data = { raw: dataText };
    }
    if (!resp.ok) {
      return res.json(
        { ok: false, status: resp.status, error: data?.message || data, debug },
        500
      );
    }
    return res.json({ ok: true, id: data?.id || null, debug });
  } catch (err) {
    console.error("[contact-email] Uncaught error", err);
    return res.json({ ok: false, error: err?.message || String(err) }, 500);
  }
};

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

    if (!RESEND_API_KEY || !EMAIL_TO) {
      return res.json(
        {
          ok: false,
          error:
            "Missing email env. Set RESEND_API_KEY and EMAIL_TO (and RESEND_FROM optional).",
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

    const resp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const dataText = await resp.text();
    let data;
    try {
      data = JSON.parse(dataText);
    } catch {
      data = { raw: dataText };
    }
    if (!resp.ok) {
      return res.json(
        { ok: false, status: resp.status, error: data?.message || data },
        500
      );
    }
    return res.json({ ok: true, id: data?.id || null });
  } catch (err) {
    return res.json({ ok: false, error: err?.message || String(err) }, 500);
  }
};

function isLikelyEmail(value) {
  return /[^@\s]+@[^@\s]+\.[^@\s]+/.test(String(value || ""));
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
    const body = {
      from,
      to: EMAIL_TO,
      subject: `New contact from ${name}`,
      text: `Event: ${
        APPWRITE_FUNCTION_EVENT || "n/a"
      }\n\nName: ${name}\nReply: ${replyTo}\n\n${message}`,
      ...(isLikelyEmail(replyTo) ? { reply_to: replyTo } : {}),
    };

    const resp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!resp.ok) {
      const err = await resp.text();
      return res.json({ ok: false, error: err }, 500);
    }

    const data = await resp.json();
    return res.json({ ok: true, id: data.id || null });
  } catch (err) {
    return res.json({ ok: false, error: err?.message || String(err) }, 500);
  }
};

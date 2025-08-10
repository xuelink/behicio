import { NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  replyTo: z.string().min(2).max(200),
  message: z.string().min(10).max(2000),
});

// Kept schema validation; the API no longer sends emails. We now recommend
// using Appwrite from the client or a separate serverless function.

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, replyTo, message } = contactSchema.parse(body);

    // This route is kept as a placeholder. On GitHub Pages, it won't be used.
    // If deployed to a Node runtime, wire this to your preferred backend.
    return NextResponse.json({ ok: true, note: "No-op: use Appwrite client." });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input", details: err.flatten() },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}

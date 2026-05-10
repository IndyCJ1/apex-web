// GET /api/fizzy/check-auth
// Returns 200 { ok: true } if logged in, 401 otherwise.
// Used by the admin page on load to decide which form to show.

interface Env {
  FIZZY_PASSWORD?: string;
}

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  if (!env.FIZZY_PASSWORD) {
    return json({ ok: false, error: "Server not configured" }, 500);
  }
  const cookie = request.headers.get("cookie") || "";
  const expected = await sha256(env.FIZZY_PASSWORD);
  const match = cookie.split(/;\s*/).some((c) => c === `fizzy_session=${expected}`);
  return json({ ok: match }, match ? 200 : 401);
};

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}

async function sha256(text: string): Promise<string> {
  const data = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

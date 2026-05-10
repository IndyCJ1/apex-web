// POST /api/fizzy/login
// Body (form or JSON): { password: string }
// On success: sets HttpOnly session cookie

interface Env {
  FIZZY_PASSWORD?: string;
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  if (!env.FIZZY_PASSWORD) {
    return json({ ok: false, error: "Server not configured (FIZZY_PASSWORD env var missing)" }, 500);
  }

  let submitted = "";
  const ct = request.headers.get("content-type") || "";
  if (ct.includes("application/json")) {
    try {
      const body = await request.json<{ password?: string }>();
      submitted = String(body.password || "");
    } catch {
      submitted = "";
    }
  } else {
    const form = await request.formData();
    submitted = String(form.get("password") || "");
  }

  if (!submitted || submitted !== env.FIZZY_PASSWORD) {
    // small delay to slow naive brute force
    await new Promise((r) => setTimeout(r, 600));
    return json({ ok: false, error: "Wrong password" }, 401);
  }

  const sessionValue = await sha256(env.FIZZY_PASSWORD);
  const cookie = [
    `fizzy_session=${sessionValue}`,
    "HttpOnly",
    "Secure",
    "SameSite=Strict",
    "Path=/",
    "Max-Age=2592000", // 30 days
  ].join("; ");

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": cookie,
      "Cache-Control": "no-store",
    },
  });
};

export const onRequestDelete: PagesFunction<Env> = async () => {
  // Logout — clear cookie
  const cookie = "fizzy_session=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0";
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Content-Type": "application/json", "Set-Cookie": cookie },
  });
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

// /api/fizzy/location
// GET  — returns the current today's-location (public, no auth)
// POST — updates today's-location (auth required via fizzy_session cookie)
// Body (POST, JSON): { location: string, hours: string, status: 'open'|'closed', note?: string }

interface Env {
  FIZZY_KV?: KVNamespace;
  FIZZY_PASSWORD?: string;
}

const KV_KEY = "fizzy:today";

const DEFAULTS = {
  location: "Jefferson Town Square",
  hours: "11am – 8pm",
  status: "open" as "open" | "closed",
  note: "",
  updatedAt: "",
};

type LocationData = typeof DEFAULTS;

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  let data: LocationData = DEFAULTS;
  if (env.FIZZY_KV) {
    try {
      const stored = await env.FIZZY_KV.get<LocationData>(KV_KEY, "json");
      if (stored) data = { ...DEFAULTS, ...stored };
    } catch {
      // fall through to defaults
    }
  }
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      // Public read — short cache so updates show within a minute on cached browsers
      "Cache-Control": "public, max-age=60",
      "Access-Control-Allow-Origin": "*",
    },
  });
};

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  // Auth
  if (!env.FIZZY_PASSWORD) {
    return json({ ok: false, error: "Server not configured" }, 500);
  }
  const cookie = request.headers.get("cookie") || "";
  const expected = await sha256(env.FIZZY_PASSWORD);
  const match = cookie.split(/;\s*/).some((c) => c === `fizzy_session=${expected}`);
  if (!match) {
    return json({ ok: false, error: "Unauthorized" }, 401);
  }

  if (!env.FIZZY_KV) {
    return json({ ok: false, error: "FIZZY_KV namespace not bound" }, 500);
  }

  let body: Partial<LocationData> = {};
  try {
    body = await request.json<Partial<LocationData>>();
  } catch {
    return json({ ok: false, error: "Invalid JSON" }, 400);
  }

  const next: LocationData = {
    location: String(body.location || "").slice(0, 200).trim(),
    hours: String(body.hours || "").slice(0, 100).trim(),
    status: body.status === "closed" ? "closed" : "open",
    note: String(body.note || "").slice(0, 200).trim(),
    updatedAt: new Date().toISOString(),
  };

  if (!next.location) {
    return json({ ok: false, error: "Location is required" }, 400);
  }

  await env.FIZZY_KV.put(KV_KEY, JSON.stringify(next));

  return json({ ok: true, data: next });
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

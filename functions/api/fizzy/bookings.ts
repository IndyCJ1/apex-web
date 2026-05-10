// /api/fizzy/bookings
// GET    — lists all bookings (auth required, admin only)
// POST   — creates a new booking (public, no auth — that's the point)
// DELETE — removes a booking by id (auth required)
//          accepts { id } in JSON body or ?id=... query string

interface Env {
  FIZZY_KV?: KVNamespace;
  FIZZY_PASSWORD?: string;
}

const KV_KEY = "fizzy:bookings";
const MAX_BOOKINGS = 500; // cap so a single attacker can't blow up KV

interface Booking {
  id: string;
  name: string;
  phone: string;
  email: string;
  date: string;
  count: string;
  type: string;
  location: string;
  notes: string;
  submittedAt: string;
}

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  if (!env.FIZZY_PASSWORD) return json({ ok: false, error: "Server not configured" }, 500);
  const cookie = request.headers.get("cookie") || "";
  const expected = await sha256(env.FIZZY_PASSWORD);
  const match = cookie.split(/;\s*/).some((c) => c === `fizzy_session=${expected}`);
  if (!match) return json({ ok: false, error: "Unauthorized" }, 401);

  const list = await readList(env);
  // newest first, then sorted by event date
  list.sort((a, b) => (b.submittedAt || "").localeCompare(a.submittedAt || ""));
  return json({ ok: true, bookings: list });
};

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  if (!env.FIZZY_KV) return json({ ok: false, error: "Booking system not yet configured" }, 503);

  let body: Record<string, unknown> = {};
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: "Invalid JSON" }, 400);
  }

  // Honeypot — bots fill this, real users don't
  if (body._gotcha && String(body._gotcha).trim() !== "") {
    return json({ ok: true }); // pretend success, silently drop
  }

  const booking: Booking = {
    id: cryptoRandomId(),
    name:     trunc(body.name, 100),
    phone:    trunc(body.phone, 30),
    email:    trunc(body.email, 254),
    date:     trunc(body.date, 30),
    count:    trunc(body.count, 30),
    type:     trunc(body.type, 50),
    location: trunc(body.location, 200),
    notes:    trunc(body.notes, 2000),
    submittedAt: new Date().toISOString(),
  };

  if (!booking.name || !booking.phone || !booking.date || !booking.location) {
    return json({ ok: false, error: "Missing required fields" }, 400);
  }

  const list = await readList(env);
  if (list.length >= MAX_BOOKINGS) {
    // drop oldest
    list.sort((a, b) => (a.submittedAt || "").localeCompare(b.submittedAt || ""));
    list.shift();
  }
  list.push(booking);
  await env.FIZZY_KV.put(KV_KEY, JSON.stringify(list));

  return json({ ok: true, id: booking.id });
};

export const onRequestDelete: PagesFunction<Env> = async ({ request, env }) => {
  if (!env.FIZZY_PASSWORD) return json({ ok: false, error: "Server not configured" }, 500);
  if (!env.FIZZY_KV) return json({ ok: false, error: "FIZZY_KV namespace not bound" }, 500);

  const cookie = request.headers.get("cookie") || "";
  const expected = await sha256(env.FIZZY_PASSWORD);
  const match = cookie.split(/;\s*/).some((c) => c === `fizzy_session=${expected}`);
  if (!match) return json({ ok: false, error: "Unauthorized" }, 401);

  let id = "";
  const url = new URL(request.url);
  if (url.searchParams.get("id")) {
    id = String(url.searchParams.get("id"));
  } else {
    try {
      const body = await request.json<{ id?: string }>();
      id = String(body.id || "");
    } catch {
      // ignore
    }
  }
  if (!id) return json({ ok: false, error: "Missing id" }, 400);

  const list = await readList(env);
  const next = list.filter((b) => b.id !== id);
  await env.FIZZY_KV.put(KV_KEY, JSON.stringify(next));
  return json({ ok: true });
};

async function readList(env: Env): Promise<Booking[]> {
  if (!env.FIZZY_KV) return [];
  try {
    const stored = await env.FIZZY_KV.get<Booking[]>(KV_KEY, "json");
    return Array.isArray(stored) ? stored : [];
  } catch {
    return [];
  }
}

function trunc(v: unknown, max: number): string {
  return String(v ?? "").slice(0, max).trim();
}

function cryptoRandomId(): string {
  const arr = new Uint8Array(8);
  crypto.getRandomValues(arr);
  return Array.from(arr).map((b) => b.toString(16).padStart(2, "0")).join("");
}

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

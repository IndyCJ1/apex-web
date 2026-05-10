// /api/fizzy/menu
// GET  — returns the current menu (public, no auth)
// POST — replaces the menu (auth required via fizzy_session cookie)

interface Env {
  FIZZY_KV?: KVNamespace;
  FIZZY_PASSWORD?: string;
}

const KV_KEY = "fizzy:menu";

type Item = { name: string; desc?: string; price: string };

interface Menu {
  dirtySodas: Item[];
  refreshers: Item[];
  addOns: Item[]; // no description
}

const DEFAULTS: Menu = {
  dirtySodas: [
    { name: "The OG", desc: "Dr Pepper · coconut cream · lime", price: "$6" },
    { name: "Pink Sky", desc: "Sprite · coconut · strawberry purée", price: "$6" },
    { name: "Sunshine", desc: "Diet Coke · vanilla cream · peach", price: "$6" },
    { name: "Cotton Candy", desc: "Sprite · raspberry · cream · cotton candy syrup", price: "$7" },
    { name: "Tiger's Eye", desc: "Mountain Dew · pineapple · cream", price: "$6" },
    { name: "Berry Crush", desc: "Coke · blueberry · raspberry · cream", price: "$6" },
  ],
  refreshers: [
    { name: "Strawberry Acai", desc: "Fresh strawberry · acai · sparkling lemonade", price: "$7" },
    { name: "Watermelon Mint", desc: "Watermelon purée · mint · soda water", price: "$7" },
    { name: "Mango Tango", desc: "Mango · passion fruit · sparkling water", price: "$7" },
    { name: "Peach Fizz", desc: "Peach purée · ginger · soda", price: "$7" },
  ],
  addOns: [
    { name: "Whipped cream", price: "+$0.50" },
    { name: "Popping boba (any flavor)", price: "+$1" },
    { name: "Extra purée", price: "+$0.75" },
    { name: "Make it a large (24oz)", price: "+$2" },
  ],
};

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  let data: Menu = DEFAULTS;
  if (env.FIZZY_KV) {
    try {
      const stored = await env.FIZZY_KV.get<Menu>(KV_KEY, "json");
      if (stored) data = stored;
    } catch {
      // fall through
    }
  }
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=60",
      "Access-Control-Allow-Origin": "*",
    },
  });
};

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  if (!env.FIZZY_PASSWORD) return json({ ok: false, error: "Server not configured" }, 500);
  if (!env.FIZZY_KV) return json({ ok: false, error: "FIZZY_KV namespace not bound" }, 500);

  const cookie = request.headers.get("cookie") || "";
  const expected = await sha256(env.FIZZY_PASSWORD);
  const match = cookie.split(/;\s*/).some((c) => c === `fizzy_session=${expected}`);
  if (!match) return json({ ok: false, error: "Unauthorized" }, 401);

  let body: Partial<Menu> = {};
  try {
    body = await request.json<Partial<Menu>>();
  } catch {
    return json({ ok: false, error: "Invalid JSON" }, 400);
  }

  const next: Menu = {
    dirtySodas: cleanItems(body.dirtySodas, true),
    refreshers: cleanItems(body.refreshers, true),
    addOns:     cleanItems(body.addOns, false),
  };

  await env.FIZZY_KV.put(KV_KEY, JSON.stringify(next));
  return json({ ok: true, data: next });
};

function cleanItems(arr: unknown, allowDesc: boolean): Item[] {
  if (!Array.isArray(arr)) return [];
  return arr
    .map((raw): Item | null => {
      if (!raw || typeof raw !== "object") return null;
      const r = raw as Record<string, unknown>;
      const name = String(r.name || "").slice(0, 80).trim();
      const price = String(r.price || "").slice(0, 20).trim();
      if (!name || !price) return null;
      const item: Item = { name, price };
      if (allowDesc) item.desc = String(r.desc || "").slice(0, 200).trim();
      return item;
    })
    .filter((x): x is Item => x !== null)
    .slice(0, 30); // cap at 30 items per category
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

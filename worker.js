const json = (data, status = 200) => new Response(JSON.stringify(data), { status, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" } });
const clean = (v, max = 1000) => String(v ?? "").trim().slice(0, max);
async function authorized(request, env) {
  const supplied = request.headers.get("x-admin-password") || "";
  const expected = env.ADMIN_PASSWORD || "";
  if (!expected || supplied.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < supplied.length; i++) diff |= supplied.charCodeAt(i) ^ expected.charCodeAt(i);
  return diff === 0;
}
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/google819bd25ec5f551d2.html" && request.method === "GET") {
      return new Response("google-site-verification: google819bd25ec5f551d2.html", {
        headers: { "content-type": "text/html; charset=utf-8", "cache-control": "public, max-age=3600" }
      });
    }
    if (!url.pathname.startsWith("/api/")) return env.ASSETS.fetch(request);
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: { "allow": "GET, POST, PATCH, OPTIONS" } });
    if (!env.DB) return json({ error: "Lead storage is not connected yet. Please use WhatsApp for now." }, 503);
    try {
      if (url.pathname === "/api/leads" && request.method === "POST") {
        const body = await request.json();
        if (clean(body.website, 200)) return json({ ok: true }); // honeypot
        const name = clean(body.name, 100), phone = clean(body.phone, 40), email = clean(body.email, 160);
        const need = clean(body.need, 120), message = clean(body.message, 2000);
        if (!name || !phone || !need) return json({ error: "Name, phone and enquiry type are required." }, 400);
        if (!/^[+()0-9 .-]{7,40}$/.test(phone)) return json({ error: "Please enter a valid phone number." }, 400);
        const result = await env.DB.prepare("INSERT INTO leads (name, phone, email, need, message, status, created_at) VALUES (?, ?, ?, ?, ?, 'New', datetime('now'))")
          .bind(name, phone, email, need, message).run();
        return json({ ok: true, id: result.meta.last_row_id }, 201);
      }
      if (url.pathname === "/api/admin/leads" && request.method === "GET") {
        if (!(await authorized(request, env))) return json({ error: "Incorrect admin password." }, 401);
        const result = await env.DB.prepare("SELECT id, name, phone, email, need, message, status, created_at FROM leads ORDER BY id DESC LIMIT 300").all();
        return json({ leads: result.results || [] });
      }
      const match = url.pathname.match(/^\/api\/admin\/leads\/(\d+)$/);
      if (match && request.method === "PATCH") {
        if (!(await authorized(request, env))) return json({ error: "Incorrect admin password." }, 401);
        const body = await request.json();
        const status = clean(body.status, 30);
        if (!["New", "Contacted", "In Progress", "Converted", "Closed"].includes(status)) return json({ error: "Invalid lead status." }, 400);
        await env.DB.prepare("UPDATE leads SET status = ? WHERE id = ?").bind(status, Number(match[1])).run();
        return json({ ok: true });
      }
      return json({ error: "Not found." }, 404);
    } catch (error) {
      return json({ error: "The request could not be completed. Please try again." }, 500);
    }
  }
};
# NISHEL Website

Mobile-first static website with a lightweight Cloudflare Worker backend. No paid AI API, AI tokens, framework build, or external paid CRM is required.

## What is in this repository
- `index.html`: public NISHEL website and customer enquiry form.
- `worker.js`: small API for lead submissions and private admin access.
- `schema.sql`: D1 table and indexes.
- `admin.html`: private lead desk at `/admin.html`.
- `wrangler.jsonc`: Worker + static assets configuration.

## Current lead system
The public form posts to `/api/leads`. When D1 is connected, the Worker stores the name, phone, optional email, enquiry type, message and submission time. If the backend is not connected or unavailable, the form falls back to preparing a WhatsApp message to NISHEL.

The admin page lists the latest 300 enquiries and lets the admin change status (New, Contacted, In Progress, Converted, Closed). Admin access uses the `ADMIN_PASSWORD` Worker secret. Never put this password in website code or share it with customers.

## One-time Cloudflare setup still required for database storage
1. In Cloudflare Dashboard, open **Workers & Pages → D1 SQL Database → Create database**. Name it `nishel-leads`.
2. Open the new database's **Console** and execute the complete contents of `schema.sql` from this repository.
3. Open the `nishel-website` Worker → **Settings → Bindings → Add → D1 database**. Set variable name/binding to `DB` and select `nishel-leads`. Save and deploy.
4. Open Worker **Settings → Variables and Secrets → Add**. Add secret named `ADMIN_PASSWORD` with a strong unique password. Save and deploy.
5. Visit `https://nishel-website.nisel-lifeline.workers.dev/admin.html` and sign in with that password.

The Worker already has a static asset binding named `ASSETS`. D1 storage and admin access will not work until the D1 binding and password secret are configured.

## Privacy and limits
- Collect only information needed to respond to an enquiry. Tell customers how their details are used and provide a way to contact NISHEL for correction/deletion.
- Keep the admin password private; use a strong unique password.
- This is a simple lead inbox, not a full CRM, marketing automation, AI agent, or guaranteed follow-up system.
- No paid AI API is used. Cloudflare free-plan quotas and limits apply and can change.
- Confirm hosting, domain, maintenance and free-page eligibility terms with each participant.

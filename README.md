# NISHEL Website

A responsive, mobile-first single-page NISHEL introduction site. The site is plain HTML and CSS; it does not need a framework or application build.

## Option A — Cloudflare Workers (Wrangler)

This repository now includes `wrangler.jsonc` for an assets-only Cloudflare Worker.

In Cloudflare Workers & Pages, connect the GitHub repository `nishel1/nishel-website`, branch `main`, with the repository root as the root directory. Set the deploy/build command to:

```sh
npx wrangler@latest deploy
```

No separate build output directory is needed for the Workers deployment. Wrangler reads `wrangler.jsonc` and publishes the static files as Worker assets. The Worker name is `nishel`.

## Option B — Cloudflare Pages

If creating a Pages project instead, use:
- Framework preset: **None**
- Build command: `exit 0` (or leave blank)
- Build output directory: `.`
- Production branch: `main`

Cloudflare will provide a `pages.dev` address after deployment.

## Updating the site

Edit `index.html` in GitHub and commit the change. Cloudflare will redeploy automatically once Git integration is configured.

## Important

- The community-support offer is subject to eligibility and final terms agreed with NISHEL.
- One page means one single-page website for one specific business, service or type of work.
- This page does not claim that unfinished AI, booking, payment, account or automation features are live.

# NISHEL Website

Mobile-first NISHEL introduction and enquiry website. Built with plain HTML, CSS and a small amount of browser JavaScript. No framework, build step, AI API, database or paid token service is required for the website itself.

## Cloudflare Workers deployment

- Repository: `nishel1/nishel-website`
- Production branch: `main`
- Root directory: `/`
- Build command: none
- Deploy command: `npx wrangler@latest deploy`
- Worker name: `nishel`

The `wrangler.jsonc` file configures static assets from the repository root. The homepage is `index.html`.

## Website features

- Responsive NISHEL introduction and service sections
- Startup, small-business, creator and local-worker support descriptions
- Community initiative explanation with eligibility and scope caveats
- Three prior project showcase links
- FAQ explaining what is and is not included
- Contact links and enquiry form that prepares a WhatsApp message
- No server-side lead storage; the visitor sends the prepared message themselves

## Important limitations

- This static site does not provide unlimited AI generation, automated lead collection, CRM, user accounts, payments, scheduling or background automation.
- Hosting, custom domains, maintenance, eligibility and the exact scope of free-page support must be agreed with NISHEL before work begins.
- Project showcase links are examples, not claims of partnership, endorsement or customer testimonials.

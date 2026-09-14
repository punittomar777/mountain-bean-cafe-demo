# Mountain Bean Café

A polished, single-page marketing website for a fictional independent café —
built as a portfolio demo. Warm, editorial, mobile-first and production-ready.

**Stack:** Next.js (App Router) · TypeScript · Tailwind CSS v4 · Lucide icons ·
Resend (email). Zero heavy dependencies, Vercel-ready.

## Sections

Navbar · Hero · About · Menu (tabbed) · Food gallery · Why visit us · Reviews ·
Reservation / enquiry form · Location (keyless map embed) · WhatsApp CTA · Footer.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Reservation email (optional)

The reservation form posts to `app/api/contact/route.ts`, which sends email via
[Resend](https://resend.com). Without configuration the site runs fine — the
form simply reports the service is unavailable. To enable it:

```bash
cp .env.example .env.local
# then fill in RESEND_API_KEY, EMAIL_FROM and EMAIL_TO
```

Secrets are read only in the Node.js route handler and never reach the browser.

## Making it a real client's site

Almost everything lives in [`app/lib/content.ts`](app/lib/content.ts):

- **Brand, tagline, `siteUrl`** — names and canonical domain.
- **`whatsapp`** — replace `number` / `display` with the client's WhatsApp number.
- **`menu`, `gallery`, `reviews`, `features`, `openingHours`, `location`** — copy,
  images and details.

Swap the Unsplash image URLs for the client's own photography, update the metadata
in [`app/layout.tsx`](app/layout.tsx) and the JSON-LD in
[`app/components/StructuredData.tsx`](app/components/StructuredData.tsx).

## Scripts

```bash
npm run dev     # development
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
```

---

Demo project — testimonials, contact details and imagery are fictional / placeholder.

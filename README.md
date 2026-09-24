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

- **Brand, tagline, `siteUrl`** — names and canonical domain (used by metadata,
  `sitemap.xml` and `robots.txt`).
- **`demo`** — portfolio credit used by the demo notices; remove the notices for
  a real client.
- **`whatsapp`, `contactDetails`** — replace with the client's number and email.
- **`menu`, `gallery`, `reviews`, `features`, `openingHours`, `location`** — copy,
  images and details. Add the real address and a "Get Directions" link to
  `location` / [`Location.tsx`](app/components/Location.tsx).

Swap the Unsplash image URLs for the client's own photography, update the metadata
in [`app/layout.tsx`](app/layout.tsx) and replace the demo `WebSite` JSON-LD in
[`app/components/StructuredData.tsx`](app/components/StructuredData.tsx) with a
`Restaurant` schema using the client's real address and hours.

## Scripts

```bash
npm run dev     # development
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
```

---

Demo project, live at <https://cafe-demo.punittomar.com> — Mountain Bean Café is
a fictional restaurant. Testimonials, hours and imagery are placeholder; enquiries
reach the developer, [Punit Tomar](https://studio.punittomar.com).

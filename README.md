# Cleaners Passion Web

Marketing site for Cleaners Passion, built with Next.js App Router, TypeScript, and Tailwind CSS.

## Local Development

Install dependencies and run the site:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Contact Form Setup

The enquiry form posts to the server-side route at `src/app/api/contact/route.ts` and sends email with Resend.

Create a local env file from `.env.example` and provide:

```bash
RESEND_API_KEY=
CONTACT_TO_EMAIL=info@cleanerspassion.com
CONTACT_FROM_EMAIL=Cleaners Passion <enquiries@your-verified-domain.com>
```

Notes:

- `RESEND_API_KEY` should come from your Resend account.
- `CONTACT_TO_EMAIL` is the inbox that receives website enquiries.
- `CONTACT_FROM_EMAIL` must use a sender address from a domain verified in Resend.
- The sender secrets stay server-side only and are never exposed to the browser.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

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

The enquiry area uses an embedded Google Form inside the existing contact section layout.

The current Cleaners Passion form is already wired into the site.

If you ever want to swap it later, you can override the default links with a local env file from `.env.example`:

```bash
GOOGLE_FORM_EMBED_URL=https://docs.google.com/forms/d/e/your-form-id/viewform?embedded=true
GOOGLE_FORM_PUBLIC_URL=https://docs.google.com/forms/d/e/your-form-id/viewform
```

Notes:

- `GOOGLE_FORM_EMBED_URL` should be the embed URL that Google Forms gives you from the "Send" dialog.
- `GOOGLE_FORM_PUBLIC_URL` is the standard share URL used for the fallback "open in new tab" link.
- These values are not secrets, and they are only needed if you want to replace the currently embedded form without editing code.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

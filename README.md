## Izzet Behic Sakar — Personal Site (Next.js)

A fast personal website built with Next.js App Router and Tailwind CSS. It includes About, Projects, Services, a Coaching CTA, Instagram embed, and a Contact form that stores messages in Appwrite and sends email via an Appwrite Function.

### Highlights

- Next.js 15 (App Router) + React 19 + Tailwind v4
- Contact form → Appwrite Database (client SDK)
- Appwrite Function `contact-email` (Node 22) sends email via Resend SMTP (Nodemailer)
- Invisible Cloudflare Turnstile captcha (optional)
- Custom English validation messages (no browser‑locale bubbles)
- Open Graph / Twitter preview image (`public/site-preview.png`)
- Simple Instagram profile embed for `@behicsakar`

### Tech stack

- **Next.js 15**, **React 19**, **TypeScript**
- **Tailwind CSS v4**
- **Appwrite Web SDK** (client), **Appwrite Functions** (server)
- **Nodemailer** (SMTP via Resend)
- **lucide-react** icons

### Quick start

1. Install deps: `npm install`
2. Dev server: `npm run dev`
3. Visit `http://localhost:3000`

### Environment variables

Frontend (required for contact storage):

- `NEXT_PUBLIC_APPWRITE_ENDPOINT`
- `NEXT_PUBLIC_APPWRITE_PROJECT_ID`
- `NEXT_PUBLIC_APPWRITE_DATABASE_ID`
- `NEXT_PUBLIC_APPWRITE_COLLECTION_ID`

Frontend (optional):

- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` — enable invisible Turnstile on the form

Function (set in Appwrite Function settings, not global vars):

- `RESEND_API_KEY` — Resend API key (SMTP password)
- `RESEND_FROM` — Verified sender address (e.g., `noreply@behic.io`)
- `EMAIL_TO` — Your recipient address

Notes:

- In Appwrite Cloud, the function reads envs from `process.env`.
- The DB event payload is available as an object on `req.bodyJson`.

### Contact flow

1. User submits form on `/#contact`.
2. Client creates a document in Appwrite using the Web SDK: `{ name, replyTo, message, captchaToken? }`.
3. Appwrite trigger (Database → Documents → Create) invokes Function `contact-email`.
4. Function sends an email via Resend SMTP (Nodemailer). Detailed logs are emitted using the Node 22 context APIs.

Collection attributes (Strings): `name` (required), `replyTo` (required), `message` (required), `captchaToken` (optional).

Permissions: allow document Create for `role: guests` or `role: any`.

### Appwrite Function: `contact-email`

- Runtime: Node 22, entrypoint `index.js`
- Trigger: Database → Documents → Create for the contact collection
- Dependencies: `nodemailer`
- Env: `RESEND_API_KEY`, `RESEND_FROM`, `EMAIL_TO`

The function already contains robust logging and flexible payload resolution. If you manually test via HTTP, you’ll see logs in Executions; for event runs, the useful details are in the execution body/logs.

### Security: Turnstile (optional)

- Loads the Turnstile script and renders an invisible widget.
- On submit, obtains a token and includes `captchaToken` in the document if available.
- Server‑side verification can be added by checking the token in the function against `https://challenges.cloudflare.com/turnstile/v0/siteverify` using a `TURNSTILE_SECRET_KEY`.

### SEO / Social preview

- Open Graph and Twitter metadata configured in `src/app/layout.tsx`.
- Image: `public/site-preview.png` (1200×630). Cached by platforms; bust cache by changing URL or filename if needed.

### Instagram

- Simple profile iframe embed for `@behicsakar` under the Instagram section (no external script required).

### Project structure

```text
src/
  app/
    layout.tsx       # Metadata, OG/Twitter, fonts, global styles
    page.tsx         # All sections (Hero, About, Projects, SkillRise, Services, Instagram, Coaching, Contact, Footer)
    globals.css      # Tailwind base styles
appwrite/
  functions/
    contact-email/   # Node 22 Appwrite Function (Nodemailer/SMTP)
public/
  site-preview.png   # Social share image
```

### Deployment

- Static hosting friendly (e.g., GitHub Pages) — the contact flow uses Appwrite from the client.
- Ensure the four `NEXT_PUBLIC_APPWRITE_*` envs are provided at build time (CI or local).
- The function is deployed from the `appwrite/functions/contact-email` folder via the Appwrite Console.

### Scripts

- `npm run dev` — start dev server (Turbopack)
- `npm run build` — production build
- `npm run start` — run production server
- `npm run lint` — lint

### License

MIT — see `LICENSE`.

## Izzet Behic Sakar — Personal Site (Next.js)

A fast, single‑page personal website built with Next.js App Router and Tailwind CSS. It showcases About, Projects (including LangX and Web3 work), Services, a SkillRise spotlight, a Coaching CTA, and a simple Contact section.

### Tech stack

- **Next.js 15** (App Router, TypeScript)
- **React 19**
- **Tailwind CSS v4**
- **Inter** via `next/font`
- **lucide-react** icons

### Quick start

1. Install deps: `npm install`
2. Run dev server: `npm run dev`
3. Visit `http://localhost:3000`

### Scripts

- `npm run dev` — start dev server (Turbopack)
- `npm run build` — production build
- `npm run start` — run production server
- `npm run lint` — lint

### Project structure

```text
src/
  app/
    layout.tsx       # Metadata, fonts, global styles
    page.tsx         # All sections (Hero, About, Projects, SkillRise, Services, Coaching, Contact, Footer)
    globals.css      # Tailwind base styles
  components/
    ui/
      button.tsx     # Minimal button component (optional)
      card.tsx       # Minimal card component (optional)
  lib/
    utils.ts
public/
  *.svg              # Assets
```

### Customize content

- **Head/meta**: Edit `src/app/layout.tsx` `metadata.title` and `metadata.description`.
- **Hero**: Update headline, location, intro copy, and the image box in `src/app/page.tsx` (section `#home`).
- **Socials**: Update the `socials` array links in `src/app/page.tsx`.
- **Projects**: Edit the `projects` array in `src/app/page.tsx` to add or remove cards. Examples include LangX, wUSDT (Solana), and docs/portal items.
- **SkillRise**: The dedicated section `#skillrise` links to your course platform. Adjust copy/feature pills or link target (`https://skillrise.me/`).
- **Services**: Update the `services` array (Software & AI, Blockchain/Web3, IT & Infrastructure, Coaching).
- **Skills**: Edit the `skills` array (includes `ethers.js`, `Foundry`, `SPL / Solana, ERC‑20, BEP‑20`).
- **Contact**: The form writes to Appwrite Database. Provide envs `NEXT_PUBLIC_APPWRITE_ENDPOINT`, `NEXT_PUBLIC_APPWRITE_PROJECT_ID`, `NEXT_PUBLIC_APPWRITE_DATABASE_ID`, `NEXT_PUBLIC_APPWRITE_COLLECTION_ID`.

### Appwrite Function: contact-email

Located at `appwrite/functions/contact-email/`. Sends an email (via Resend HTTP API) when a document is created in the contact collection.

Setup in Appwrite Console:

- Create Function (Node.js 18+), upload that folder, entrypoint `index.js`.
- Triggers → Events → Database → Documents → Create → select your Database and Contact collection.
- Environment Variables:
  - `RESEND_API_KEY` (required)
  - `EMAIL_TO` (required)
  - `RESEND_FROM` (optional; defaults to `onboarding@resend.dev`)
- Deploy the function.

Troubleshooting:

- If emails aren’t delivered, check Function logs for the Resend API response, verify your sender domain or allowed recipients on Resend, and confirm the trigger targets the correct database/collection.
- Deploy the function.

### Styling

- Global gradient/background and color theme live on `<body>` in `src/app/layout.tsx`.
- Typography uses Inter via `next/font`. Tailwind utilities provide layout and spacing.
- To brand it further, adjust Tailwind classes directly in section markup.

### Deployment

The site is designed for static hosting or serverless deployment.

- Recommended: Vercel (connect repo → Import Project → Build).
- Environment variables: none required by default.

### Notes

- Sections can be split into components (e.g., `src/components/Hero.tsx`) if you prefer. The current single‑file layout is easy to scan and change.
- `lucide-react` provides icons; add/remove imports as needed.
- No database is required unless you enable a real contact backend.

### License

MIT — see `LICENSE` for details.

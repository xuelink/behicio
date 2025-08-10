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
- **Contact**: The form currently shows an alert; wire it to email/Appwrite or another backend.

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

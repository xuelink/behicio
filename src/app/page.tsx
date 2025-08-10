"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Github,
  Linkedin,
  Instagram,
  ArrowRight,
  ExternalLink,
  Dumbbell,
  Code2,
  Cpu,
  MapPin,
} from "lucide-react";

const email = "behicsakar@gmail.com";

const socials = [
  { href: "https://github.com/xuelink", label: "GitHub", Icon: Github },
  {
    href: "https://www.linkedin.com/in/izzetbehic",
    label: "LinkedIn",
    Icon: Linkedin,
  },
  {
    href: "https://instagram.com/start_calisthenics",
    label: "Instagram",
    Icon: Instagram,
  },
];

const projects = [
  {
    title: "LangX.io",
    tagline: "Open‑source language learning platform (15k+ users)",
    link: "https://langx.io",
    tags: ["TypeScript", "Appwrite", "Flutter", "OpenAI"],
    description:
      "Founded and led development of LangX: real‑time chat, AI grammar correction, and multilingual communities with 300+ contributors.",
  },
  {
    title: "AI Productivity & ChatGPT Mastery",
    tagline: "Digital course — launch fast with SkillRise.me",
    link: "https://skillrise.me",
    tags: ["Course", "Automation", "Monetization"],
    description:
      "Action‑focused curriculum on using AI to plan, build, and launch projects quickly.",
  },
  {
    title: "Enterprise IT Optimization",
    tagline: "Tatex Petrochemicals — 20% downtime reduction",
    link: "#",
    tags: ["VMware", "VEEAM", "Microsoft 365"],
    description:
      "Directed IT for 150+ staff across borders; improved workflow efficiency by 30% via virtualization, network upgrades, and cloud backup integration.",
  },
];

const services = [
  {
    Icon: Code2,
    title: "Software & AI",
    points: [
      "Full‑stack apps (React, Flutter, Node, Appwrite)",
      "AI copilots & agents (OpenAI, retrieval, evals)",
      "Product strategy & rapid prototyping",
    ],
  },
  {
    Icon: Dumbbell,
    title: "Calisthenics Coaching (Toronto)",
    points: [
      "Muscle‑ups, levers, handstands",
      "Strength, mobility, injury‑aware progressions",
      "Online or in‑person programming",
    ],
  },
  {
    Icon: Cpu,
    title: "IT & Infrastructure",
    points: [
      "Virtualization (VMware), cloud backups (VEEAM)",
      "Network architecture & security (Ubiquiti, Zero Trust)",
      "Microsoft 365 & Google Workspace integrations",
    ],
  },
];

const skills = [
  "JavaScript / TypeScript",
  "Python",
  "SQL",
  "Solidity",
  "React / Next.js",
  "Flutter",
  "Node.js",
  "Appwrite",
  "PostgreSQL",
  "Docker",
  "MongoDB",
  "Tailwind",
  "OpenAI API",
  "Kubernetes",
  "Solana/BSC",
];

export default function Home() {
  const [emailCopied, setEmailCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 1800);
    } catch {}
  };

  return (
    <div className="min-h-screen">
      {/* Nav */}
      <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 border-b">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <a href="#home" className="font-semibold tracking-tight">
            Izzet Behic Sakar
          </a>
          <nav className="hidden sm:flex items-center gap-6 text-sm">
            <a href="#about" className="hover:text-slate-700">
              About
            </a>
            <a href="#projects" className="hover:text-slate-700">
              Projects
            </a>
            <a href="#services" className="hover:text-slate-700">
              Services
            </a>
            <a href="#coaching" className="hover:text-slate-700">
              Coaching
            </a>
            <a href="#contact" className="hover:text-slate-700">
              Contact
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <Link
              href="#contact"
              className="rounded-2xl border px-3 py-2 hover:bg-slate-50"
            >
              Let’s talk
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="home" className="mx-auto max-w-6xl px-4 pt-16 pb-10">
        <div className="flex flex-col md:flex-row md:items-center gap-8">
          <div className="md:w-3/5">
            <p className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-slate-500">
              <MapPin className="size-4" /> Toronto, Canada
            </p>
            <h1 className="mt-3 text-4xl/tight sm:text-5xl/tight font-extrabold tracking-[-0.02em]">
              Builder, Coach, and AI tinkerer.
            </h1>
            <p className="mt-4 text-slate-600 max-w-prose">
              I design and ship useful things:{" "}
              <span className="font-medium">full‑stack apps</span>,
              <span className="font-medium"> AI copilots</span>, and{" "}
              <span className="font-medium">calisthenics programs</span>.
              Founder of{" "}
              <a
                className="underline underline-offset-4 decoration-slate-300 hover:decoration-slate-700"
                href="https://langx.io"
                target="_blank"
                rel="noreferrer"
              >
                LangX.io
              </a>
              .
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="#projects"
                className="rounded-2xl border px-3 py-2 hover:bg-slate-50 inline-flex items-center"
              >
                See projects <ArrowRight className="size-4 ml-1" />
              </Link>
              <button
                onClick={handleCopy}
                className="rounded-2xl border px-3 py-2 inline-flex items-center"
              >
                <Mail className="size-4 mr-2" />{" "}
                {emailCopied ? "Email copied!" : email}
              </button>
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="inline-flex items-center gap-2 rounded-2xl border px-3 py-2 hover:bg-slate-50"
                >
                  <Icon className="size-5" aria-hidden />{" "}
                  <span className="hidden sm:inline text-sm">{label}</span>
                </a>
              ))}
            </div>
          </div>
          <div className="md:w-2/5">
            <div className="aspect-[4/3] w-full rounded-3xl bg-gradient-to-br from-slate-100 to-slate-200 shadow-inner flex items-center justify-center">
              <span className="text-sm text-slate-500">
                Add a photo or logo here
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold">About</h2>
            <p className="mt-3 text-slate-700">
              Full‑stack developer and calisthenics coach. I build polished
              products, simplify complex ideas, and help people unlock skills
              like muscle‑ups and handstands.
            </p>
            <div className="mt-6">
              <h3 className="font-semibold">Skills</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {skills.map((s) => (
                  <li key={s} className="text-xs rounded-full border px-3 py-1">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="md:col-span-1 rounded-3xl shadow-sm border p-6">
            <h3 className="font-semibold">Quick facts</h3>
            <ul className="mt-3 text-sm space-y-2 text-slate-700">
              <li>• Founder @ LangX.io</li>
              <li>• WSWCF coach & street workout nerd</li>
              <li>• Interested in AI agents & evals</li>
              <li>• Open to collabs & consulting</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold">Featured projects</h2>
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <div
              key={p.title}
              className="rounded-3xl shadow-sm border p-6 hover:shadow-md transition"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold">{p.title}</h3>
                  <p className="text-sm text-slate-600 mt-1">{p.tagline}</p>
                </div>
                <a
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Open ${p.title}`}
                  className="inline-flex"
                >
                  <ExternalLink className="size-5" />
                </a>
              </div>
              <p className="mt-4 text-sm text-slate-700">{p.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[11px] rounded-full border px-2 py-1"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section id="services" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold">What I do</h2>
        <div className="mt-6 grid md:grid-cols-3 gap-6">
          {services.map((s) => (
            <div key={s.title} className="rounded-3xl shadow-sm border p-6">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl border p-2">
                  <s.Icon className="size-6" aria-hidden />
                </div>
                <h3 className="font-semibold">{s.title}</h3>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {s.points.map((pt) => (
                  <li key={pt}>• {pt}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Coaching CTA */}
      <section id="coaching" className="mx-auto max-w-6xl px-4 py-12">
        <div className="rounded-3xl shadow-sm border p-8 md:p-10">
          <div className="md:flex items-center justify-between gap-8">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold">1:1 Calisthenics Coaching</h2>
              <p className="mt-3 text-slate-700">
                Personalized programs for muscle‑ups, back levers, and
                handstands. Progression‑based, sustainable, and
                beginner‑friendly.
              </p>
            </div>
            <div className="mt-6 md:mt-0">
              <a
                href="#contact"
                className="rounded-2xl border px-4 py-3 inline-block"
              >
                Apply for coaching
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold">Contact</h2>
        <p className="mt-2 text-slate-700">
          Reach out for collaborations, coaching, or consulting.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert(
              "Thanks! Your message has been recorded. Replace this with a real backend (Appwrite/email). "
            );
          }}
          className="mt-6 grid sm:grid-cols-2 gap-4"
        >
          <input
            required
            name="name"
            placeholder="Your name"
            className="rounded-2xl border px-4 py-3 outline-none focus:ring-2 focus:ring-slate-300"
          />
          <input
            required
            name="replyTo"
            placeholder="Email or Telegram"
            className="rounded-2xl border px-4 py-3 outline-none focus:ring-2 focus:ring-slate-300"
          />
          <textarea
            required
            name="message"
            placeholder="How can I help?"
            rows={5}
            className="sm:col-span-2 rounded-2xl border px-4 py-3 outline-none focus:ring-2 focus:ring-slate-300"
          />
          <div className="sm:col-span-2 flex items-center justify-between">
            <div className="text-sm text-slate-600">
              Or email me directly:{" "}
              <button
                type="button"
                onClick={() => navigator.clipboard.writeText(email)}
                className="underline underline-offset-4"
              >
                {email}
              </button>
            </div>
            <button type="submit" className="rounded-2xl border px-4 py-2">
              Send
            </button>
          </div>
        </form>
      </section>

      {/* Footer */}
      <footer className="mt-10 border-t">
        <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            © {new Date().getFullYear()} Izzet Behic Sakar. All rights reserved.
          </div>
          <div className="flex items-center gap-3">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="hover:text-slate-700 flex items-center gap-1"
              >
                <Icon className="size-5" aria-hidden />{" "}
                <span className="sr-only">{label}</span>
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

// === Notes ===
// • This follows your repo's Next.js app-router structure (edit in src/app/page.tsx). The README mentions editing app/page.tsx to see live updates.
// • Tailwind utility classes are used throughout. No shadcn dependency required.
// • If you want sections as separate components (e.g., components/Hero.tsx), say the word and I’ll split them out.

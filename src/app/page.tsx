"use client";
import {
  useState,
  useEffect,
  useRef,
  useCallback,
  type TouchEvent,
} from "react";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { Client, Databases, ID } from "appwrite";
import {
  Mail,
  Github,
  Linkedin,
  Instagram,
  ArrowRight,
  ExternalLink,
  Code2,
  Smartphone,
  Cpu,
  MapPin,
  Heart,
  Music,
} from "lucide-react";

// Turnstile global typings to avoid using 'any'
type TurnstileSize = "invisible" | "compact" | "normal";
type Turnstile = {
  render: (
    selector: string,
    options: { sitekey: string; size?: TurnstileSize }
  ) => string;
  execute: (
    id: string,
    options: { action?: string; callback?: (token: string) => void }
  ) => void;
};
declare global {
  interface Window {
    turnstile?: Turnstile;
  }
}

const email = "behicsakar@gmail.com";

const socials = [
  { href: "https://github.com/xuelink", label: "GitHub", Icon: Github },
  {
    href: "https://www.linkedin.com/in/behicsakar/",
    label: "LinkedIn",
    Icon: Linkedin,
  },
  {
    href: "https://instagram.com/behicsakar",
    label: "Instagram",
    Icon: Instagram,
  },
  {
    href: "https://www.tiktok.com/@behicsakar",
    label: "TikTok",
    Icon: Music,
  },
];

const projects = [
  {
    title: "LangX.io",
    tagline: "Open-source language learning platform (15k+ users)",
    link: "https://langx.io",
    tags: ["TypeScript", "Appwrite", "Flutter", "OpenAI"],
    description:
      "Founded and led development of LangX: real-time chat, AI grammar correction, and multilingual communities with 300+ contributors worldwide.",
  },
  {
    title: "LangX Token",
    tagline: "Access token resources and ecosystem tools",
    link: "https://token.langx.io",
    tags: ["Token", "Ecosystem", "Web3"],
    description:
      "Central hub for LangX token utilities, analytics, and ecosystem integrations.",
  },
  {
    title: "New Chapter Technology LLC",
    tagline: "US-based software development and consulting company",
    link: "https://newchapter.tech",
    tags: ["Web Development", "Mobile Apps", "Cloud"],
    description:
      "Collaborated with a Wyoming-based tech firm delivering web, mobile, and cloud solutions across various industries, with a focus on quality and open-source contributions.",
  },
  {
    title: "wUSDT on Solana",
    tagline: "Token listing prep: docs, tokenomics, integrations",
    link: "#",
    tags: ["Solana SPL", "DEX", "Tokenomics"],
    description:
      "Prepared comprehensive listing materials and integration guides for Solana SPL token, focusing on liquidity, wallets, and explorer metadata.",
  },
  {
    title: "Blockchain Smart Contracts Suite",
    tagline: "Custom ERC-20, BEP-20, and SPL token development",
    link: "#",
    tags: ["Solidity", "Web3", "DEX"],
    description:
      "Engineered secure smart contracts for multiple chains with liquidity pool integrations, governance, and staking modules.",
  },
  {
    title: "AI-Driven Calisthenics Coach",
    tagline: "Personalized training plans via chat interface",
    link: "#",
    tags: ["AI", "Fitness", "Chatbot"],
    description:
      "Built a chatbot that generates progression-based calisthenics programs and tracks progress with computer vision pose analysis.",
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
    Icon: Smartphone,
    title: "Mobile Applications (iOS & Android)",
    points: [
      "Cross‑platform apps with Flutter & React Native",
      "Hybrid stacks: Angular + Capacitor",
      "Data layers: MongoDB, Appwrite, Realm",
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
  "ethers.js / web3.js",
  "Hardhat / Foundry",
  "SPL / Solana, ERC‑20, BEP‑20",
];

type Certification = {
  src: string;
  name: string;
  verifyUrl?: string;
  issuer?: string;
};

const certifications: Certification[] = [
  {
    src: "/certs/wswcf_diploma20239552.png",
    name: "WSWCF Calisthenics and Street Workout Personal Trainer",
    issuer: "WSWCF Academy",
    verifyUrl:
      "https://wswcfacademy.com/certification-of-trainers/certified-trainers/?country=&firstname=izzet+behic+sakar&phone=",
  },
  {
    src: "/certs/IUSCA_Level1.png",
    name: "IUSCA Certificate in Strength & Conditioning L1",
    issuer: "IUSCA",
    verifyUrl: "https://www.iusca.org/",
  },
  {
    src: "/certs/SafeSport_Certificate_Core_v3.png",
    name: "SafeSport Core Training",
    issuer: "U.S. Center for SafeSport",
    verifyUrl: "https://safesport.org",
  },
  {
    src: "/certs/NCCP_Safe_Sport_Training_7015528.png",
    name: "NCCP Safe Sport Training #7015528",
    issuer: "NCCP / Coach.ca",
    verifyUrl: "https://thelocker.coach.ca/access/account/public",
  },
  {
    src: "/certs/HSK (Level 3).png",
    name: "Chinese Proficiency - HSK Level 3",
    issuer: "ChineseTest.cn",
    verifyUrl:
      "https://www.chinesetest.cn/queryScore?sid=4149f3b34fd170d933fcbac5b92b9619%275cf381b131154fe0899413f0ccf1fd78",
  },
  {
    src: "/certs/HSK Speaking.png",
    name: "Chinese Proficiency - HSK Speaking",
    issuer: "ChineseTest.cn",
    verifyUrl:
      "https://www.chinesetest.cn/queryScore?sid=36158f727597efe449bea6cf6e448d65%27852ae197ddff4eaf9cca31957b765a0c",
  },
  {
    src: "/certs/Apple_Ads_Certification.png",
    name: "Apple Ads Certification",
    issuer: "Apple",
    verifyUrl: "https://certification-ads.apple.com/certificate/6QZ6dwUstx",
  },
  // Add more certificates here as { src: "/certs/your-file.png", alt: "Your alt", name: "Certificate name" }
];

export default function Home() {
  const [emailCopied, setEmailCopied] = useState(false);
  const [turnstileId, setTurnstileId] = useState<string | null>(null);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const scrollRef = useRef<HTMLDivElement>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  // Touch handling for lightbox swipe on mobile
  const touchStartX = useRef<number | null>(null);
  const touchMoved = useRef(false);

  const onTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches?.[0]?.clientX ?? null;
    touchMoved.current = false;
  };

  const onTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const dx = (e.touches?.[0]?.clientX ?? 0) - touchStartX.current;
    if (Math.abs(dx) > 10) touchMoved.current = true;
  };

  const onTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const dx = (e.changedTouches?.[0]?.clientX ?? 0) - touchStartX.current;
    const threshold = 50; // minimum px swipe to change image
    if (Math.abs(dx) > threshold) {
      if (dx < 0) {
        nextLightbox();
      } else {
        prevLightbox();
      }
    }
    touchStartX.current = null;
    touchMoved.current = false;
  };

  const nextLightbox = useCallback(() => {
    setLightboxIndex((idx) => {
      if (idx === null) return idx;
      return (idx + 1) % certifications.length;
    });
  }, []);

  const prevLightbox = useCallback(() => {
    setLightboxIndex((idx) => {
      if (idx === null) return idx;
      return (idx - 1 + certifications.length) % certifications.length;
    });
  }, []);

  const scrollByCards = (direction: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = Math.round(el.clientWidth * 0.8);
    el.scrollBy({ left: direction * amount, behavior: "smooth" });
  };

  useEffect(() => {
    if (!siteKey) return;
    if (window.turnstile && !turnstileId) {
      const id = window.turnstile.render("#ts-container", {
        sitekey: siteKey,
        size: "invisible",
      });
      setTurnstileId(id);
    }
  }, [siteKey, turnstileId]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxIndex(null);
      } else if (e.key === "ArrowRight") {
        nextLightbox();
      } else if (e.key === "ArrowLeft") {
        prevLightbox();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxIndex, nextLightbox, prevLightbox]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 1800);
    } catch {}
  };

  return (
    <div className="min-h-screen">
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        async
        defer
        onLoad={() => {
          if (siteKey && !turnstileId && window.turnstile) {
            const id = window.turnstile.render("#ts-container", {
              sitekey: siteKey,
              size: "invisible",
            });
            setTurnstileId(id);
          }
        }}
      />
      {/* Nav */}
      <header className="sticky top-0 z-30 border-b border-slate-200/60 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <a href="#home" className="font-semibold tracking-tight">
            Izzet Behic Sakar
          </a>
          <nav className="hidden sm:flex items-center gap-6 text-sm">
            <a href="#about" className="hover:text-slate-700">
              About
            </a>
            <a href="#certifications" className="hover:text-slate-700">
              Certifications
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
              className="rounded-2xl border border-slate-900 bg-slate-900 px-3 py-2 text-white hover:bg-slate-800"
            >
              Let’s talk
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="home" className="mx-auto max-w-7xl px-4 pt-16 pb-10">
        <div className="flex flex-col md:flex-row md:items-center gap-8">
          <div className="md:w-3/5">
            <p className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-slate-500">
              <MapPin className="size-4" /> Toronto, Canada
            </p>
            <h1 className="mt-3 text-5xl/tight sm:text-6xl/tight font-extrabold tracking-[-0.02em] bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
              Builder, Blockchain Engineer, and Calisthenics Coach.
            </h1>
            <p className="mt-4 text-slate-600 max-w-prose">
              I design and ship useful things: {""}
              <span className="font-medium">full‑stack apps</span>,
              <span className="font-medium"> AI copilots</span>, {""}
              <span className="font-medium">blockchain solutions</span> — plus{" "}
              {""}
              <span className="font-medium">calisthenics programs</span>.
              Founder of {""}
              <a
                className="underline underline-offset-4 decoration-slate-300 hover:decoration-slate-700"
                href="https://langx.io"
                target="_blank"
                rel="noreferrer"
              >
                LangX.io
              </a>{" "}
              and {""}
              <a
                className="underline underline-offset-4 decoration-slate-300 hover:decoration-slate-700"
                href="https://skillrise.me"
                target="_blank"
                rel="noreferrer"
              >
                SkillRise.me
              </a>
              .
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="#projects"
                className="rounded-2xl border border-slate-300 px-3 py-2 hover:bg-slate-50 inline-flex items-center"
              >
                See projects <ArrowRight className="size-4 ml-1" />
              </Link>
              <button
                onClick={handleCopy}
                className="rounded-2xl border px-3 py-2 inline-flex items-center"
              >
                <Mail className="size-4 mr-2" /> {""}
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
                  <Icon className="size-5" aria-hidden /> {""}
                  <span className="hidden sm:inline text-sm">{label}</span>
                </a>
              ))}
            </div>
          </div>
          <div className="md:w-2/5">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-gradient-to-br from-slate-100 to-slate-200 shadow-inner">
              <Image
                src="/pp.jpg"
                alt="Izzet Behic Sakar"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="mx-auto max-w-7xl px-4 py-12">
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
              <li>• Founder @ LangX.io & SkillRise.me</li>
              <li>• WSWCF coach & street workout nerd</li>
              <li>• Interested in AI agents & evals</li>
              <li>• Open to collabs & consulting</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section id="certifications" className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="text-2xl font-bold">Certifications</h2>
        <div className="mt-6 rounded-3xl border border-slate-200/60 bg-white/80 backdrop-blur p-4 sm:p-6">
          <div className="flex items-center justify-between mb-3">
            <button
              type="button"
              onClick={() => scrollByCards(-1)}
              className="rounded-xl border px-3 py-1 text-sm hover:bg-slate-50"
              aria-label="Previous certificates"
            >
              Prev
            </button>
            <div className="text-xs text-slate-500">
              {certifications.length} item
              {certifications.length === 1 ? "" : "s"}
            </div>
            <button
              type="button"
              onClick={() => scrollByCards(1)}
              className="rounded-xl border px-3 py-1 text-sm hover:bg-slate-50"
              aria-label="Next certificates"
            >
              Next
            </button>
          </div>
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2"
          >
            {certifications.map((c, i) => (
              <div key={`${c.src}-${i}`} className="shrink-0 snap-center">
                <button
                  type="button"
                  onClick={() => setLightboxIndex(i)}
                  className="relative w-48 sm:w-56 md:w-64 aspect-[4/3] overflow-hidden rounded-xl border bg-slate-100"
                  aria-label={`Open certificate ${i + 1}`}
                >
                  <Image
                    src={c.src}
                    alt={c.name || "Certificate"}
                    fill
                    sizes="(max-width: 640px) 60vw, (max-width: 1024px) 40vw, 25vw"
                    className="object-contain"
                  />
                </button>
                <div className="mt-2 w-48 sm:w-56 md:w-64 text-center text-sm text-slate-700">
                  <div className="font-medium">{c.name}</div>
                  <div className="mt-1 flex items-center justify-center gap-2 text-xs text-slate-500">
                    <span>
                      {c.issuer ??
                        (c.verifyUrl
                          ? new URL(c.verifyUrl).hostname.replace(/^www\./, "")
                          : "")}
                    </span>
                    {c.verifyUrl && (
                      <a
                        href={c.verifyUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Verify ${c.name}`}
                        className="text-slate-500 hover:text-slate-700"
                      >
                        <ExternalLink className="size-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {lightboxIndex !== null && (
          <div
            className="fixed inset-0 z-50 bg-black/70 p-4 flex items-center justify-center"
            role="dialog"
            aria-modal="true"
            onClick={(e) => {
              if (e.currentTarget === e.target) setLightboxIndex(null);
            }}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <button
              type="button"
              onClick={() => setLightboxIndex(null)}
              className="absolute top-4 right-4 rounded-lg border border-white/30 bg-white/10 px-3 py-1.5 text-white backdrop-blur hover:bg-white/20"
              aria-label="Close"
            >
              Close
            </button>

            <button
              type="button"
              onClick={prevLightbox}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 border p-2 text-white hover:bg-white/20"
              aria-label="Previous certificate"
            >
              ‹
            </button>

            <button
              type="button"
              onClick={nextLightbox}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 border p-2 text-white hover:bg-white/20"
              aria-label="Next certificate"
            >
              ›
            </button>

            <div className="w-full max-w-5xl">
              <div className="relative mx-auto w-full aspect-[4/3] overflow-hidden rounded-xl bg-black/20">
                <Image
                  src={certifications[lightboxIndex].src}
                  alt={certifications[lightboxIndex].name || "Certificate"}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                />
              </div>
              <div className="mt-3 text-center text-white/80">
                <div className="font-medium">
                  {certifications[lightboxIndex].name}
                </div>
                <div className="text-xs text-white/60">
                  {certifications[lightboxIndex].issuer ??
                    (certifications[lightboxIndex].verifyUrl
                      ? new URL(
                          certifications[lightboxIndex].verifyUrl
                        ).hostname.replace(/^www\./, "")
                      : "")}
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Projects */}
      <section id="projects" className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="text-2xl font-bold">Featured projects</h2>
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <div
              key={p.title}
              className="rounded-3xl border border-slate-200/60 bg-white/80 backdrop-blur p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
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
                    className="text-[11px] rounded-full bg-slate-100 px-2.5 py-1 text-slate-700"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SkillRise */}
      <section id="skillrise" className="mx-auto max-w-7xl px-4 py-12">
        <div className="rounded-3xl border border-slate-200/60 bg-white/80 backdrop-blur shadow-sm p-8 md:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold">
                SkillRise.me — Rise with New Skills
              </h2>
              <p className="mt-3 text-slate-700">
                Actionable, well‑designed courses and tools to help you master
                digital skills, boost productivity, and build a healthier, more
                focused life. Trusted by 2,000+ learners worldwide.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href="https://skillrise.me/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-2xl border px-4 py-2 hover:bg-slate-50"
                  aria-label="Explore SkillRise courses"
                >
                  Explore Courses{" "}
                  <ExternalLink className="size-4" aria-hidden />
                </a>
              </div>
            </div>
            <div className="mt-2 grid gap-2 text-sm text-slate-700 md:mt-0">
              <div className="rounded-2xl border bg-white/70 px-4 py-2">
                Fast, Focused Learning
              </div>
              <div className="rounded-2xl border bg-white/70 px-4 py-2">
                Beginner‑Friendly Courses
              </div>
              <div className="rounded-2xl border bg-white/70 px-4 py-2">
                AI‑Enhanced Guidance
              </div>
              <div className="rounded-2xl border bg-white/70 px-4 py-2">
                Growth‑Focused Tracks
              </div>
              <div className="rounded-2xl border bg-white/70 px-4 py-2">
                Community Support
              </div>
              <div className="rounded-2xl border bg-white/70 px-4 py-2">
                Anytime, Anywhere Access
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="text-2xl font-bold">What I do</h2>
        <div className="mt-6 grid md:grid-cols-3 gap-6">
          {services.map((s) => (
            <div
              key={s.title}
              className="rounded-3xl border border-slate-200/60 bg-white/80 backdrop-blur p-6 shadow-sm hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-2xl border p-2 bg-white ring-1 ring-slate-200">
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

      {/* Instagram */}
      <section id="instagram" className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="text-2xl font-bold">Instagram</h2>
        <p className="mt-2 text-slate-700">
          Latest posts from{" "}
          <a
            className="underline underline-offset-4"
            href="https://www.instagram.com/behicsakar/"
            target="_blank"
            rel="noreferrer"
          >
            @behicsakar
          </a>
        </p>
        <div className="mt-6 rounded-3xl border overflow-hidden bg-white/80 backdrop-blur">
          <iframe
            src="https://www.instagram.com/behicsakar/embed"
            title="Instagram profile embed"
            loading="lazy"
            style={{ width: "100%", minHeight: 600, border: 0 }}
            allow="encrypted-media; clipboard-write"
          />
        </div>
      </section>

      {/* Coaching CTA */}
      <section id="coaching" className="mx-auto max-w-7xl px-4 py-12">
        <div className="rounded-3xl border border-slate-200/60 bg-white/80 backdrop-blur shadow-sm p-8 md:p-10">
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
      <section id="contact" className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="text-2xl font-bold">Contact</h2>
        <p className="mt-2 text-slate-700">
          Reach out for collaborations, coaching, or consulting.
        </p>
        <form
          noValidate
          onSubmit={async (e) => {
            e.preventDefault();
            const form = e.currentTarget as HTMLFormElement;
            const submitBtn = form.querySelector(
              "button[type=submit]"
            ) as HTMLButtonElement | null;
            if (submitBtn) {
              submitBtn.disabled = true;
              submitBtn.textContent = "Sending...";
            }

            try {
              const formData = new FormData(form);
              const payload: Record<string, string> = {
                name: String(formData.get("name") || ""),
                replyTo: String(formData.get("replyTo") || ""),
                message: String(formData.get("message") || ""),
              };

              // Execute Turnstile (invisible). If not configured, continue without token.
              try {
                if (siteKey && turnstileId && window.turnstile) {
                  const token = await new Promise<string>((resolve) => {
                    window.turnstile!.execute(turnstileId, {
                      action: "contact",
                      callback: (t: string) => resolve(t),
                    });
                  });
                  if (token) payload.captchaToken = token;
                }
              } catch {}

              const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
              const project = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
              const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
              const collectionId =
                process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID;

              if (!endpoint || !project || !databaseId || !collectionId) {
                throw new Error(
                  "Missing Appwrite env vars. Set NEXT_PUBLIC_APPWRITE_* in your environment."
                );
              }

              const client = new Client()
                .setEndpoint(endpoint)
                .setProject(project);
              const databases = new Databases(client);
              await databases.createDocument(
                databaseId,
                collectionId,
                ID.unique(),
                payload,
                []
              );

              form.reset();
              const notice = document.createElement("div");
              notice.setAttribute("role", "status");
              notice.className =
                "sm:col-span-2 rounded-2xl border px-4 py-3 text-green-700 bg-green-50";
              notice.textContent = "Thanks! Your message has been sent.";
              form.appendChild(notice);
              setTimeout(() => notice.remove(), 3500);
            } catch (err) {
              const msg =
                err instanceof Error
                  ? err.message
                  : "Something went wrong. Please try again later.";
              const notice = document.createElement("div");
              notice.setAttribute("role", "alert");
              notice.className =
                "sm:col-span-2 rounded-2xl border px-4 py-3 text-red-700 bg-red-50";
              notice.textContent = msg;
              form.appendChild(notice);
              setTimeout(() => notice.remove(), 5000);
            } finally {
              if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = "Send";
              }
            }
          }}
          className="mt-6 grid sm:grid-cols-2 gap-4"
        >
          <input
            required
            name="name"
            placeholder="Your name"
            onInvalid={(e) => {
              const el = e.currentTarget;
              el.setCustomValidity("Please fill out this field.");
            }}
            onInput={(e) => e.currentTarget.setCustomValidity("")}
            className="rounded-2xl border px-4 py-3 outline-none focus:ring-2 focus:ring-slate-300"
          />
          <input
            required
            name="replyTo"
            placeholder="Email or Telegram"
            onInvalid={(e) => {
              const el = e.currentTarget;
              el.setCustomValidity("Please fill out this field.");
            }}
            onInput={(e) => e.currentTarget.setCustomValidity("")}
            className="rounded-2xl border px-4 py-3 outline-none focus:ring-2 focus:ring-slate-300"
          />
          <textarea
            required
            name="message"
            placeholder="How can I help?"
            rows={5}
            minLength={10}
            onInvalid={(e) => {
              const el = e.currentTarget;
              el.setCustomValidity(
                el.validity.tooShort
                  ? "Please enter at least 10 characters."
                  : "Please fill out this field."
              );
            }}
            onInput={(e) => e.currentTarget.setCustomValidity("")}
            className="sm:col-span-2 rounded-2xl border px-4 py-3 outline-none focus:ring-2 focus:ring-slate-300"
          />
          {/* Turnstile container (invisible) */}
          <div id="ts-container" style={{ height: 0 }} />
          <div className="sm:col-span-2 flex items-center justify-between">
            <div className="text-sm text-slate-600">
              Or email me directly: {""}
              <button
                type="button"
                onClick={() => navigator.clipboard.writeText(email)}
                className="underline underline-offset-4"
              >
                {email}
              </button>
            </div>
            <button
              type="submit"
              className="rounded-2xl border px-4 py-2 disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </form>
      </section>

      {/* Footer */}
      <footer className="mt-10 border-t">
        <div className="mx-auto max-w-7xl px-4 py-8 text-sm text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            © {new Date().getFullYear()} Izzet Behic Sakar. Crafted with{" "}
            <Heart
              className="inline-block size-4 text-red-500 align-[-2px]"
              aria-hidden
              fill="currentColor"
            />{" "}
            and GPT‑5.
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
                <Icon className="size-5" aria-hidden /> {""}
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

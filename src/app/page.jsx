"use client";

import { useState } from "react";
import { motion } from "framer-motion";
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
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PersonalWebsite() {
  const [emailCopied, setEmailCopied] = useState(false);

  const email = "behicsakar@gmail.com";
  const socials = [
    {
      href: "https://github.com/xuelink",
      label: "GitHub",
      icon: <Github className="size-5" aria-hidden />,
    },
    {
      href: "https://www.linkedin.com/in/izzetbehic",
      label: "LinkedIn",
      icon: <Linkedin className="size-5" aria-hidden />,
    },
    {
      href: "https://instagram.com/start_calisthenics",
      label: "Instagram",
      icon: <Instagram className="size-5" aria-hidden />,
    },
  ];

  const projects = [
    {
      title: "LangX.io",
      tagline: "Open-source language learning platform (15k+ users)",
      link: "https://langx.io",
      tags: ["TypeScript", "Appwrite", "Flutter", "OpenAI"],
      description:
        "Founded and led development of LangX, integrating real-time chat, AI grammar correction, and multilingual communities with 300+ contributors worldwide.",
    },
    {
      title: "AI Productivity & ChatGPT Mastery",
      tagline: "Digital course — launch fast with SkillRise.me",
      link: "https://skillrise.me",
      tags: ["Course", "Automation", "Monetization"],
      description:
        "Action-focused curriculum on using AI to plan, build, and launch projects quickly, leveraging over a decade of product and development expertise.",
    },
    {
      title: "Enterprise IT Optimization",
      tagline: "Tatex Petrochemicals — 20% downtime reduction",
      link: "#",
      tags: ["VMware", "VEEAM", "Microsoft 365"],
      description:
        "Directed IT for 150+ staff across borders, improving workflow efficiency by 30% through virtualization, network upgrades, and cloud backup integration.",
    },
  ];

  const services = [
    {
      icon: <Code2 className="size-6" aria-hidden />,
      title: "Software & AI",
      points: [
        "Full‑stack apps (React, Flutter, Node, Appwrite)",
        "AI copilots & agents (OpenAI, retrieval, evals)",
        "Product strategy & rapid prototyping",
      ],
    },
    {
      icon: <Dumbbell className="size-6" aria-hidden />,
      title: "Calisthenics Coaching (Toronto)",
      points: [
        "Muscle‑ups, levers, handstands",
        "Strength, mobility, injury‑aware progressions",
        "Online or in‑person programming",
      ],
    },
    {
      icon: <Cpu className="size-6" aria-hidden />,
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
    "shadcn/ui",
    "OpenAI API",
    "Kubernetes",
    "Solana/BSC",
  ];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch {}
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-white to-slate-50 text-slate-900">
      <main className="mx-auto max-w-6xl px-6 py-16">
        {/* Hero */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-16"
        >
          <div className="flex flex-col items-start gap-6">
            <div className="inline-flex items-center gap-2 rounded-full border bg-white/70 px-3 py-1 text-sm text-slate-700 shadow-sm backdrop-blur">
              <MapPin className="size-4" aria-hidden />
              <span>Toronto, Canada</span>
            </div>
            <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
              Izzet Behic Sakar
            </h1>
            <p className="max-w-2xl text-pretty text-lg text-slate-600">
              Software, AI, and IT infrastructure. I build full‑stack products,
              ship fast, and coach calisthenics.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button onClick={handleCopy} aria-label="Copy email">
                <Mail aria-hidden /> {emailCopied ? "Copied!" : "Copy Email"}
              </Button>
              <Button variant="outline" asChild>
                <a
                  href="https://github.com/xuelink"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github aria-hidden /> GitHub
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a
                  href="https://www.linkedin.com/in/izzetbehic"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin aria-hidden /> LinkedIn
                </a>
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-2 pt-2 text-slate-600">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border bg-white/70 px-3 py-1 text-sm shadow-sm backdrop-blur transition-colors hover:bg-slate-50"
                >
                  {social.icon}
                  <span className="sr-only">{social.label}</span>
                </a>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Projects */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="mb-16"
        >
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Projects</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {projects.map((project) => (
              <Card key={project.title} className="bg-white/70 backdrop-blur">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between text-lg">
                    <span>{project.title}</span>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-slate-500 hover:text-slate-900"
                      aria-label={`Open ${project.title}`}
                    >
                      <ExternalLink className="size-4" aria-hidden />
                    </a>
                  </CardTitle>
                  <CardDescription>{project.tagline}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-slate-700">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.section>

        {/* Services */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-16"
        >
          <h2 className="mb-6 text-2xl font-semibold">Services</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {services.map((service) => (
              <Card key={service.title} className="bg-white/70 backdrop-blur">
                <CardHeader>
                  <div className="inline-flex size-10 items-center justify-center rounded-lg border bg-white/70">
                    {service.icon}
                  </div>
                  <CardTitle className="mt-2 text-lg">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-inside list-disc space-y-2 text-slate-700">
                    {service.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.section>

        {/* Skills */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="mb-16"
        >
          <h2 className="mb-4 text-2xl font-semibold">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border bg-white/70 px-3 py-1 text-sm text-slate-700 shadow-sm backdrop-blur"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.section>

        {/* Contact */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mb-8"
        >
          <Card className="bg-white/70 backdrop-blur">
            <CardContent className="flex flex-col items-start gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-lg font-semibold">
                  Let’s build something.
                </h3>
                <p className="text-slate-600">
                  Reach out for software, AI, IT, or coaching.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button onClick={handleCopy} aria-label="Copy email">
                  <Mail aria-hidden /> {emailCopied ? "Copied!" : email}
                </Button>
                <Button variant="outline" asChild>
                  <a href="mailto:behicsakar@gmail.com">
                    Say hello <ArrowRight aria-hidden />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.section>
      </main>
    </div>
  );
}

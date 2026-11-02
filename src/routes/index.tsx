import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  Check,
  Cloud,
  Copy,
  FileCode2,
  GitBranch,
  KeyRound,
  Lock,
  Octagon,
  ShieldAlert,
  ShieldCheck,
  SlidersHorizontal,
  Terminal,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/openpath-logo.png";
import { Reveal } from "@/components/openpath/Reveal";
import { DashboardPreview } from "@/components/openpath/DashboardPreview";
import grokLogo from "@/assets/ai/grok.svg";
import chatgptLogo from "@/assets/ai/chatgpt.svg";
import claudeLogo from "@/assets/ai/claude.svg";
import notionLogo from "@/assets/ai/notion.svg";
import { TypeLines, CountUp, InViewWords, ScrollHighlight, ScrollTilt, useScrolled } from "@/components/openpath/motion";

const GITHUB = "https://github.com/bipulroy/openpath";
const QUICKSTART =
  "git clone https://github.com/bipulroy/openpath.git && cd openpath && pip install fastapi uvicorn psutil && python server.py";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "OpeNpaTh — Your Cloud AI's Brain. Your Local PC's Hands." },
      {
        name: "description",
        content:
          "Give Grok, ChatGPT, Claude and Notion AI path-jailed terminal and file access to one folder on your PC, with Git rollbacks and a 100ms kill switch.",
      },
      { property: "og:title", content: "OpeNpaTh — Your Cloud AI's Brain. Your Local PC's Hands." },
      {
        property: "og:description",
        content: "The local-to-cloud AI execution bridge. Zero-account tunnels, Git time machine, Master Kill Switch.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function useCopy() {
  const [copied, setCopied] = useState(false);
  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      /* clipboard unavailable */
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  return { copied, copy };
}

function Nav() {
  const scrolled = useScrolled();
  return (
    <header
      className={`fade-up sticky top-0 z-50 border-b backdrop-blur-xl backdrop-saturate-150 transition-[background-color,border-color] duration-500 ${
        scrolled ? "border-border bg-background/75" : "border-transparent bg-background/0"
      }`}
    >
      <nav className="mx-auto flex h-12 max-w-6xl items-center justify-between px-6 text-xs">
        <a href="#top" className="group flex items-center gap-2 text-sm font-semibold tracking-tight">
          <img src={logo} alt="" width={24} height={24} className="h-6 w-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[-8deg]" />
          OpeNpaTh
        </a>
        <div className="hidden items-center gap-8 text-muted-foreground md:flex">
          {[
            ["#why", "Why OpeNpaTh"],
            ["#features", "Features"],
            ["#how", "How it works"],
            ["#security", "Security"],
          ].map(([href, label]) => (
            <a key={href} href={href} className="group relative transition-colors duration-300 hover:text-foreground">
              {label}
              <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-primary transition-transform duration-500 group-hover:scale-x-100" />
            </a>
          ))}
        </div>
        <Button asChild size="sm" className="h-7 rounded-full px-4 text-xs transition-transform duration-300 hover:scale-105 active:scale-95">
          <a href={GITHUB} target="_blank" rel="noreferrer">Download</a>
        </Button>
      </nav>
    </header>
  );
}

function Hero() {
  const { copied, copy } = useCopy();
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="hero-glow pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-6xl px-6 pb-24 pt-24 text-center md:pt-32">
        <div className="fade-up" style={{ animationDelay: "100ms" }}>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-live" />
            v1.0 Open-Source Release • Zero-Account Cloudflare Tunnels
          </span>
        </div>
        <h1 className="mx-auto mt-8 max-w-5xl text-4xl font-semibold leading-[1.06] tracking-[-0.035em] md:text-6xl lg:text-[68px] track-in">
          <TypeLines lines={[{ text: "Stop Being Copy-Paste Labor for Your AI." }, { text: "Let Any Cloud AI Build Directly Inside Your PC Folder.", className: "text-gradient" }]} />
        </h1>
        <p
          className="fade-up mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl"
          style={{ animationDelay: "3600ms" }}
        >
          Connect{" "}
          <span className="inline-flex items-center gap-2 align-middle">
            {[
              [grokLogo, "Grok"],
              [chatgptLogo, "ChatGPT"],
              [claudeLogo, "Claude"],
              [notionLogo, "Notion AI"],
            ].map(([src, alt]) => (
              <img key={alt} src={src} alt={alt} title={alt} className="h-6 w-6 transition-transform duration-300 hover:-translate-y-0.5 hover:scale-110" />
            ))}
          </span>{" "}
          to one local folder. Paste connection.md, watch it build — stop anytime.
        </p>
        <div className="fade-up" style={{ animationDelay: "3800ms" }}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className="h-12 rounded-full px-7 text-[15px] transition-transform duration-300 hover:scale-[1.04] active:scale-95">
              <a href={GITHUB} target="_blank" rel="noreferrer">Download OpeNpaTh Mini</a>
            </Button>
            <Button asChild size="lg" variant="ghost" className="group h-12 rounded-full px-6 text-[15px] text-primary-soft hover:bg-accent hover:text-primary-soft">
              <a href="#demo">
                View live dashboard demo <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </Button>
          </div>
          <button
            type="button"
            onClick={() => copy(QUICKSTART)}
            className="mx-auto mt-6 flex items-center gap-2 rounded-full border border-border bg-ink px-4 py-2 font-mono text-xs text-muted-foreground transition hover:text-foreground active:scale-95"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-live" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? "Quickstart copied" : "Copy quickstart command"}
          </button>
        </div>
        <div id="demo" className="fade-up mt-20 scroll-mt-24" style={{ animationDelay: "4000ms" }}>
          <ScrollTilt>
            <DashboardPreview />
          </ScrollTilt>
        </div>
      </div>
    </section>
  );
}

function Intro() {
  const points = [
    { t: "What it is", d: "A small app on your PC that opens one folder to the cloud AI you already use." },
    { t: "How it connects", d: "One click creates a secure link. You paste a single file into your AI chat." },
    { t: "What happens next", d: "The AI writes code, runs commands and starts your app — while you watch and stay in control." },
  ];
  return (
    <section id="intro" className="mx-auto max-w-6xl scroll-mt-16 px-6 pt-28">
      <Reveal className="text-center">
        <p className="text-sm font-medium text-primary">Small introduction</p>
        <h2 className="mx-auto mt-3 max-w-3xl text-4xl font-semibold tracking-[-0.03em] md:text-6xl">
          <InViewWords segments={[{ text: "Meet OpeNpaTh." }, { text: "A bridge, not a black box.", className: "text-muted-foreground" }]} />
        </h2>
      </Reveal>
      <div className="mt-16 grid gap-5 md:grid-cols-3">
        {points.map((p, i) => (
          <Reveal key={p.t} delay={i * 100}>
            <div className="lift h-full rounded-[28px] bg-card p-9">
              <span className="font-mono text-xs text-primary">0{i + 1}</span>
              <h3 className="mt-4 text-2xl font-semibold tracking-tight">{p.t}</h3>
              <p className="mt-3 text-muted-foreground">{p.d}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Statement() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-32 md:py-44">
      <ScrollHighlight
        className="text-3xl font-semibold leading-[1.18] tracking-[-0.025em] md:text-5xl lg:text-[56px]"
        text="OpeNpaTh turns the AI you already use into a developer that works right on your machine. It writes the files. Runs the commands. Launches the servers. And you can stop all of it in a tenth of a second."
      />
    </section>
  );
}

function Why() {
  const oldWay = [
    "25 manual copy-pastes per feature",
    "Broken shell quotes on large files",
    "Cloud sandbox can't see your folder",
    "$20/mo extra for separate API credits",
  ];
  const newWay = [
    "1-click zero-account Cloudflare tunnel",
    "Paste connection.md into any AI chat",
    "AI builds, tests and runs your local repo",
    "Uses the chat AI you already pay for",
  ];
  return (
    <section id="why" className="mx-auto max-w-6xl scroll-mt-16 px-6 py-28">
      <Reveal className="text-center">
        <p className="text-sm font-medium text-primary">Why OpeNpaTh</p>
        <h2 className="mx-auto mt-3 max-w-3xl text-4xl font-semibold tracking-[-0.03em] md:text-6xl">
          <InViewWords segments={[{ text: "Cloud AI is brilliant." }, { text: "And trapped.", className: "text-muted-foreground" }]} />
        </h2>
      </Reveal>
      <div className="mt-16 grid gap-5 md:grid-cols-2">
        <Reveal>
          <div className="lift h-full rounded-[28px] border border-crush/20 bg-card p-9">
            <p className="text-sm font-medium text-crush">The old way</p>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight">Copy. Paste. Repeat.</h3>
            <ul className="mt-8 space-y-4">
              {oldWay.map((t) => (
                <li key={t} className="flex items-start gap-3 text-muted-foreground">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-crush/15">
                    <X className="h-3 w-3 text-crush" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="lift h-full rounded-[28px] border border-live/25 bg-card p-9">
            <p className="text-sm font-medium text-live">The OpeNpaTh way</p>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight">Connect once. Let it build.</h3>
            <ul className="mt-8 space-y-4">
              {newWay.map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-live/15">
                    <Check className="h-3 w-3 text-live" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section id="features" className="scroll-mt-16 bg-secondary py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="text-center">
          <p className="text-sm font-medium text-primary">Features</p>
          <h2 className="mx-auto mt-3 max-w-3xl text-4xl font-semibold tracking-[-0.03em] md:text-6xl">
            <InViewWords segments={[{ text: "Everything a cloud AI needs." }, { text: "Nothing it shouldn't have.", className: "text-muted-foreground" }]} />
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-5 md:grid-cols-6">
          <Reveal className="md:col-span-4">
            <div className="flex h-full flex-col justify-between lift rounded-[28px] bg-card p-9">
              <div>
                <Cloud className="lift-icon h-8 w-8 text-primary" />
                <h3 className="mt-6 text-3xl font-semibold tracking-tight">Zero-account tunnels.</h3>
                <p className="mt-3 max-w-md text-muted-foreground">
                  Instant public Cloudflare URLs in three seconds — no sign-up, no login. Run Ngrok alongside for automatic failover.
                </p>
              </div>
              <div className="mt-8 space-y-2 font-mono text-xs">
                <div className="flex items-center gap-2 rounded-xl bg-ink px-4 py-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-live" />
                  <span className="text-primary-soft">https://quiet-river-7x2k.trycloudflare.com</span>
                  <span className="ml-auto text-live">primary</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-ink px-4 py-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-pending" />
                  <span className="text-muted-foreground">https://a81f-22.ngrok-free.app</span>
                  <span className="ml-auto text-pending">failover</span>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal className="md:col-span-2" delay={80}>
            <div className="lift flex h-full flex-col rounded-[28px] bg-crush p-9 text-destructive-foreground">
              <Octagon className="lift-icon h-8 w-8" />
              <h3 className="mt-6 text-3xl font-semibold tracking-tight">Stop & Crush.</h3>
              <p className="mt-3 opacity-85">Kill every process, cut the tunnels and rotate the token.</p>
              <p className="mt-auto pt-8 text-6xl font-semibold tracking-tighter">
                &lt;<CountUp to={100} /><span className="text-2xl">ms</span>
              </p>
              <p className="mt-1 font-mono text-xs opacity-80">Ctrl + Shift + K</p>
            </div>
          </Reveal>

          <Reveal className="md:col-span-2">
            <div className="h-full lift rounded-[28px] bg-card p-9">
              <SlidersHorizontal className="lift-icon h-8 w-8 text-pending" />
              <h3 className="mt-6 text-2xl font-semibold tracking-tight">Full Auto or you decide.</h3>
              <p className="mt-3 text-muted-foreground">
                Switch between 100% autonomous and strict 1-click approval cards at any second.
              </p>
              <div className="mt-6 flex flex-wrap gap-2 font-mono text-[11px]">
                <span className="rounded-full bg-primary px-3 py-1 text-primary-foreground">FULL_AUTO</span>
                <span className="rounded-full bg-muted px-3 py-1 text-muted-foreground">SMART_HYBRID</span>
                <span className="rounded-full bg-muted px-3 py-1 text-muted-foreground">MANUAL</span>
              </div>
            </div>
          </Reveal>

          <Reveal className="md:col-span-2" delay={80}>
            <div className="h-full lift rounded-[28px] bg-card p-9">
              <GitBranch className="lift-icon h-8 w-8 text-live" />
              <h3 className="mt-6 text-2xl font-semibold tracking-tight">Git Time Machine.</h3>
              <p className="mt-3 text-muted-foreground">
                Automatic pre-AI checkpoints. If something breaks, roll back byte-for-byte in one click.
              </p>
            </div>
          </Reveal>

          <Reveal className="md:col-span-2" delay={160}>
            <div className="h-full lift rounded-[28px] bg-card p-9">
              <Terminal className="lift-icon h-8 w-8 text-primary-soft" />
              <h3 className="mt-6 text-2xl font-semibold tracking-tight">Native file edits & daemons.</h3>
              <p className="mt-3 text-muted-foreground">
                Clean JSON file edits with no shell-quote bugs. Run dev servers in the background with live PID tracking.
              </p>
            </div>
          </Reveal>

          <Reveal className="md:col-span-6">
            <div className="grid items-center gap-8 lift rounded-[28px] bg-card p-9 md:grid-cols-2">
              <div>
                <FileCode2 className="lift-icon h-8 w-8 text-primary" />
                <h3 className="mt-6 text-3xl font-semibold tracking-tight">One file. Any AI.</h3>
                <p className="mt-3 max-w-md text-muted-foreground">
                  connection.md carries your tunnel URL, token and rules, plus a 50-line Python client using only the standard
                  library. If your chat AI can run Python, it can drive OpeNpaTh.
                </p>
              </div>
              <pre className="overflow-x-auto rounded-2xl bg-ink p-6 font-mono text-[12px] leading-relaxed text-foreground/85">
{`# connection.md
BASE_URL = "https://quiet-river-7x2k.trycloudflare.com"
TOKEN    = "op_9f2c…e41a"
MODE     = "FULL_AUTO"

client = OpeNpaThClient(BASE_URL, TOKEN)
client.write("src/app.py", code)
client.run("pip install -r requirements.txt")
client.run("python app.py", background=True)`}
              </pre>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n: "01", t: "Lock your folder.", d: "Choose a project folder and click Start Cloudflare. A live URL appears in 3 seconds." },
    { n: "02", t: "Paste connection.md.", d: "Copy it with one click and drop it into Grok, ChatGPT, Claude or any AI chat." },
    { n: "03", t: "Watch it build.", d: "Follow the live stream as the AI writes files, installs packages and launches your app." },
  ];
  return (
    <section id="how" className="mx-auto max-w-6xl scroll-mt-16 px-6 py-28">
      <Reveal className="text-center">
        <p className="text-sm font-medium text-primary">How it works</p>
        <h2 className="mt-3 text-4xl font-semibold tracking-[-0.03em] md:text-6xl"><InViewWords segments={[{ text: "Connected in 15 seconds." }]} /></h2>
      </Reveal>
      <div className="relative mt-16 grid gap-10 md:grid-cols-3">
        <Reveal className="absolute left-0 right-0 top-6 hidden md:block">
          <div className="draw-line relative h-px bg-gradient-to-r from-primary/10 via-primary/60 to-primary/10">
            <span className="line-pulse absolute -top-[3px] left-0 h-[7px] w-[7px] rounded-full bg-primary shadow-[0_0_12px_2px_var(--primary)]" />
          </div>
        </Reveal>
        {steps.map((s, i) => (
          <Reveal key={s.n} delay={i * 160} className="group relative">
            <span
              className="step-pop relative flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background font-mono text-sm text-primary transition-colors duration-500 group-hover:border-primary/60 group-hover:text-primary-soft"
              style={{ animationDelay: `${200 + i * 220}ms` }}
            >
              {s.n}
            </span>
            <h3 className="mt-6 text-2xl font-semibold tracking-tight transition-colors duration-500 group-hover:text-primary-soft">{s.t}</h3>
            <p className="mt-2 text-muted-foreground">{s.d}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Security() {
  const pillars = [
    { icon: Lock, t: "Workspace jail", d: "Every path is resolved and checked. Escapes like ../../ are blocked instantly." },
    { icon: KeyRound, t: "256-bit tokens", d: "Rotatable secret keys. One click locks out any running script." },
    { icon: ShieldAlert, t: "Command blacklist", d: "rm -rf /, format, shutdown and friends are blocked — even in Full Auto." },
    { icon: Octagon, t: "Emergency switch", d: "A five-stage lockdown that drops back to manual approval in under 100ms." },
  ];
  return (
    <section id="security" className="scroll-mt-16 bg-ink py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="text-center">
          <ShieldCheck className="mx-auto h-10 w-10 text-live" />
          <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.03em] md:text-6xl">
            <InViewWords segments={[{ text: "Four pillars of local safety." }]} />
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
            Autonomy without anxiety. Your machine stays yours.
          </p>
        </Reveal>
        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <Reveal key={p.t} delay={i * 80}>
              <div className="lift h-full rounded-[24px] border border-border bg-card p-7 hover:border-primary/40">
                <p.icon className="lift-icon h-6 w-6 text-primary" />
                <h3 className="mt-5 text-lg font-semibold tracking-tight">{p.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  const { copied, copy } = useCopy();
  return (
    <section className="relative overflow-hidden">
      <div className="hero-glow pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-4xl px-6 py-32 text-center">
        <Reveal>
          <h2 className="text-5xl font-semibold tracking-[-0.035em] md:text-7xl">
            <InViewWords segments={[{ text: "Give your AI" }, { text: "hands.", className: "text-gradient" }]} />
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
            Free and open source under the MIT license. Works on Windows, macOS and Linux.
          </p>
          <div className="mx-auto mt-10 flex max-w-2xl items-center gap-3 rounded-2xl border border-border bg-ink p-2 pl-5 text-left">
            <code className="flex-1 truncate font-mono text-xs text-muted-foreground">{QUICKSTART}</code>
            <Button onClick={() => copy(QUICKSTART)} className="rounded-xl" size="sm">
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? "Copied" : "Copy"}
            </Button>
          </div>
          <Button asChild size="lg" className="mt-8 h-12 rounded-full px-8 text-[15px]">
            <a href={GITHUB} target="_blank" rel="noreferrer">Download OpeNpaTh Mini</a>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-8 text-xs text-muted-foreground md:flex-row">
        <p className="flex items-center gap-2"><img src={logo} alt="" width={18} height={18} loading="lazy" className="h-[18px] w-[18px]" />© 2026 OpeNpaTh · MIT License</p>
        <div className="flex gap-6">
          <a href={GITHUB} target="_blank" rel="noreferrer" className="hover:text-foreground">GitHub</a>
          <a href="#features" className="hover:text-foreground">Features</a>
          <a href="#security" className="hover:text-foreground">Security</a>
        </div>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <Hero />
        <Intro />
        <Statement />
        <Why />
        <Features />
        <HowItWorks />
        <Security />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}

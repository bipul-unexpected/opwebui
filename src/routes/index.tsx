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
import { Contact } from "@/components/openpath/Contact";
import { DashboardPreview } from "@/components/openpath/DashboardPreview";
import grokLogo from "@/assets/ai/grok.svg";
import chatgptLogo from "@/assets/ai/chatgpt.svg";
import claudeLogo from "@/assets/ai/claude.svg";
import notionLogo from "@/assets/ai/notion.svg";
import { InViewWords, ScrollHighlight, ScrollTilt, useScrolled } from "@/components/openpath/motion";

const GITHUB = "https://github.com/bipul-unexpected/OpeNpaTh";
const QUICKSTART =
  "git clone https://github.com/bipul-unexpected/OpeNpaTh.git";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "OpeNpaTh — Connect Cloud AI to Your Local Files and Terminal" },
      { name: "title", content: "OpeNpaTh — Connect Cloud AI to Your Local Files and Terminal" },
      { name: "description", content: "Connect ChatGPT, Claude or Grok to a local workspace. OpeNpaTh is an open-source AI bridge with file tools, terminal access, approvals and an emergency stop." },
      { name: "keywords", content: "OpeNpaTh, OpenPath AI, AI local workspace, AI to local terminal bridge, connect ChatGPT to local folder, connect Grok to local PC, local DevOps runner, FastAPI workspace gateway, Cloudflare tunnel, AI approval queue, AI kill switch, connection.md" },
      { property: "og:url", content: "https://openpath.biz.id/" },
      { property: "og:title", content: "OpeNpaTh — Connect Cloud AI to Your Local Workspace" },
      { property: "og:description", content: "An open-source AI bridge with local file tools, terminal access, approval modes, audit logs and an emergency stop." },
      { name: "twitter:url", content: "https://openpath.biz.id/" },
      { name: "twitter:title", content: "OpeNpaTh — Connect Cloud AI to Your Local Workspace" },
      { name: "twitter:description", content: "Connect cloud AI to local files and terminal tools with approval modes and an emergency stop." },
    ],
    links: [{ rel: "canonical", href: "https://openpath.biz.id/" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "OpeNpaTh",
        alternateName: ["OpenPath", "OpeNpaTh Local Automation Runner"],
        url: "https://openpath.biz.id/",
        downloadUrl: "https://openpath.biz.id/download",
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Windows, macOS, Linux",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        description: "An open-source local automation runner and workspace gateway connecting cloud AI to local file tools and terminal commands.",
        featureList: ["Workspace file API path jail", "Automatic and manual approval modes", "Cloudflare and Ngrok tunnels", "Python SDK and connection.md", "Process management and audit logs", "Master Stop & Crush emergency switch"],
        author: { "@type": "Person", name: "Bipul", url: "https://github.com/bipul-unexpected" },
        sameAs: "https://github.com/bipul-unexpected/OpeNpaTh",
      }).replace(/</g, "\\u003c"),
    }],
  }),
  component: Index,
});

function useCopy() {
  const [copied, setCopied] = useState(false);
  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard may be unavailable in an insecure context.
    }
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
          <a href="/download">Download</a>
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
            Open source • Cloudflare and Ngrok tunnels
          </span>
        </div>
        <h1 className="mx-auto mt-8 max-w-5xl text-4xl font-semibold leading-[1.06] tracking-[-0.035em] md:text-6xl lg:text-[68px] track-in">
          <span className="block">Stop being copy-paste labor for your AI.</span><span className="block text-gradient">Let cloud AI work in your local folder.</span>
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
          including ChatGPT, Claude and Grok to one local folder. Paste connection.md, watch it build — stop anytime.
        </p>
        <div className="fade-up" style={{ animationDelay: "3800ms" }}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className="h-12 rounded-full px-7 text-[15px] transition-transform duration-300 hover:scale-[1.04] active:scale-95">
              <a href="/download">Download OpeNpaTh</a>
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
            {copied ? "Clone command copied" : "Copy clone command"}
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
          <InViewWords segments={[{ text: "Meet OpeNpaTh." }, { text: "An AI-to-local workspace bridge.", className: "text-muted-foreground" }]} />
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
        text="OpeNpaTh turns the AI you already use into a collaborator that can work on your machine. It edits files, runs commands and starts servers while you stay in control."
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
            <InViewWords segments={[{ text: "Everything a cloud AI needs." }, { text: "With controls you can review.", className: "text-muted-foreground" }]} />
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-5 md:grid-cols-6">
          <Reveal className="md:col-span-4">
            <div className="flex h-full flex-col justify-between lift rounded-[28px] bg-card p-9">
              <div>
                <Cloud className="lift-icon h-8 w-8 text-primary" />
                <h3 className="mt-6 text-3xl font-semibold tracking-tight">Zero-account tunnels.</h3>
                <p className="mt-3 max-w-md text-muted-foreground">
                  Cloudflare Quick Tunnels work without an account. Run Ngrok alongside for automatic failover.
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
              <p className="mt-3 opacity-85">Stop managed processes, cut the tunnels and rotate the token.</p>
              <p className="mt-auto pt-8 text-6xl font-semibold tracking-tighter">
                STOP
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
                Create Git checkpoints before changes and roll back when needed. Check the documentation for rollback behavior.
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
                  connection.md carries your tunnel URL, token and rules, plus a Python client using only the standard
                  library. If your chat AI can run Python, it can drive OpeNpaTh.
                </p>
              </div>
              <pre className="overflow-x-auto rounded-2xl bg-ink p-6 font-mono text-[12px] leading-relaxed text-foreground/85">
{`# connection.md
BASE_URL = "https://quiet-river-7x2k.trycloudflare.com"
TOKEN    = "op_9f2c…e41a"
MODE     = "FULL_AUTO"

from openpath_client import OpenPathClient
client = OpenPathClient(base_url=BASE_URL, token=TOKEN)
client.handshake()
client.write_file("hello.py", "print('Hello')")
client.run_command("python hello.py")`}
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
    { n: "01", t: "Lock your folder.", d: "Choose a project folder and start a Cloudflare tunnel to create a public URL." },
    { n: "02", t: "Paste connection.md.", d: "Copy it with one click and drop it into Grok, ChatGPT, Claude or any AI chat." },
    { n: "03", t: "Watch it build.", d: "Follow the live stream as the AI writes files, installs packages and launches your app." },
  ];
  return (
    <section id="how" className="mx-auto max-w-6xl scroll-mt-16 px-6 py-28">
      <Reveal className="text-center">
        <p className="text-sm font-medium text-primary">How it works</p>
        <h2 className="mt-3 text-4xl font-semibold tracking-[-0.03em] md:text-6xl"><InViewWords segments={[{ text: "Connect in three steps." }]} /></h2>
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
    { icon: Lock, t: "Workspace jail", d: "The file API resolves and checks paths against your selected workspace." },
    { icon: KeyRound, t: "Rotatable tokens", d: "Rotate your secret key to revoke access for future gateway requests." },
    { icon: ShieldAlert, t: "Command blacklist", d: "rm -rf /, format, shutdown and friends are blocked — even in Full Auto." },
    { icon: Octagon, t: "Emergency switch", d: "A five-stage lockdown that stops managed processes and forces manual approval." },
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
          <p className="mx-auto mt-5 max-w-2xl text-sm text-muted-foreground">The file API has a path jail, but shell execution is not a hard sandbox. For untrusted AI, disable command execution, require approval, or use a VM or isolated OS user. Treat connection.md like a password. <a className="text-primary underline" href={`${GITHUB}#6-security-model`}>Read the security model</a>.</p>
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

function FAQ() {
  const questions = [
    ["What is OpeNpaTh?", "OpeNpaTh is an open source gateway that connects a remote AI assistant to a local workspace through an authenticated tunnel."],
    ["Which systems are supported?", "The release offers Windows x64, macOS Apple silicon and Intel, and Linux x64 downloads. Choose your exact build on the downloads page."],
    ["Which Windows download should I choose?", "Most Windows users can use the portable ZIP: extract it and open OpeNpaTh.exe. An installer is also available."],
    ["Does my AI need an account?", "Your AI must be able to run code and make outbound HTTPS requests. Cloudflare Quick Tunnels do not require a Cloudflare account; other tunnel options may require one."],
    ["Can an AI access anything outside my project?", "The file API restricts paths, but shell commands are not a hard sandbox. Disable execution, require approval or use a VM or isolated OS user for untrusted AI."],
    ["How do I report a problem?", "Open an issue on the GitHub repository. Never include your bearer token or connection.md in a public report."],
  ];
  return <section id="faq" className="mx-auto max-w-4xl scroll-mt-20 px-6 py-20"><p className="text-sm font-medium text-primary">GOOD TO KNOW</p><h2 className="mt-4 text-4xl font-semibold tracking-tight">Frequently asked questions</h2><div className="mt-8 space-y-3">{questions.map(([question, answer]) => <details key={question} className="rounded-xl border border-border bg-card p-5"><summary className="cursor-pointer font-semibold focus-visible:outline-2 focus-visible:outline-primary">{question}</summary><p className="mt-3 text-muted-foreground">{answer}</p></details>)}</div></section>;
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
            <a href="/download">Download OpeNpaTh</a>
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
        <div className="flex flex-wrap justify-center gap-6">
          <a href={GITHUB} target="_blank" rel="noreferrer" className="hover:text-foreground">GitHub</a>
          <a href="#features" className="hover:text-foreground">Features</a>
          <a href="#security" className="hover:text-foreground">Security</a>
          <a href="/download" className="hover:text-foreground">Downloads</a>
          <a href="#faq" className="hover:text-foreground">FAQ</a>
          <a href="#contact" className="hover:text-foreground">Contact</a>
        </div>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-background focus:p-4">Skip to content</a>
      <main id="main-content">
        <Hero />
        <Intro />
        <Statement />
        <Why />
        <Features />
        <HowItWorks />
        <Security />
        <FAQ />
        <FinalCta />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowDownToLine, ArrowLeft, ArrowUpRight, ShieldCheck } from "lucide-react";
import { assetLabel, assetPlatform, detectPlatform, fallbackRelease, isVerifiedAsset, RELEASES, type Platform, type Release } from "@/lib/releases";

export const Route = createFileRoute("/download")({
  head: () => ({ meta: [
    { title: "Download OpenPath for Windows, macOS and Linux" },
    { name: "description", content: "Download OpenPath, the open source AI to local workspace bridge. Choose Windows portable or installer, macOS, Linux, source and checksums." },
    { property: "og:title", content: "Download OpenPath" },
    { property: "og:description", content: "Get OpenPath for Windows, macOS or Linux directly from GitHub Releases." },
  ] }),
  component: DownloadPage,
});
const names: Record<Platform, string> = { windows: "Windows", macos: "macOS", linux: "Linux", other: "Source & verification" };
const notes: Record<Platform, string> = {
  windows: "For most Windows users, we recommend the portable ZIP. Extract it and open OpeNpaTh.exe; no installation required.",
  macos: "Choose Apple silicon for M-series Macs or Intel for older Intel Macs. Extract the ZIP and move the app to Applications.",
  linux: "Choose AppImage for a portable application, DEB for Ubuntu or Debian, or the portable archive. These builds are for x64.",
  other: "Review the source or verify your download with the published checksums.",
};
function DownloadPage() {
  const [platform, setPlatform] = useState<Platform>("other");
  const [release, setRelease] = useState<Release>(fallbackRelease);
  const [source, setSource] = useState<"loading" | "live" | "fallback">("loading");
  useEffect(() => {
    setPlatform(detectPlatform(navigator.userAgent));
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), 8000);
    fetch("https://api.github.com/repos/bipul-unexpected/OpeNpaTh/releases/latest", { signal: controller.signal, headers: { Accept: "application/vnd.github+json" } })
      .then((r) => { if (!r.ok) throw new Error("Release unavailable"); return r.json(); })
      .then((r: Release) => {
        if (typeof r.tag_name !== "string" || !Array.isArray(r.assets) || !r.assets.some(isVerifiedAsset)) throw new Error("No release assets");
        setRelease({ ...r, html_url: `${RELEASES}/latest`, assets: r.assets.filter(isVerifiedAsset) }); setSource("live");
      }).catch(() => setSource("fallback")).finally(() => window.clearTimeout(timer));
    return () => { controller.abort(); window.clearTimeout(timer); };
  }, []);
  const order: Platform[] = platform === "other" ? ["windows", "macos", "linux", "other"] : [platform, ...(["windows", "macos", "linux", "other"] as Platform[]).filter((p) => p !== platform)];
  return <div className="min-h-screen bg-background text-foreground">
    <header className="border-b border-border"><nav aria-label="Main navigation" className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5"><a href="/" className="font-semibold">OpeNpaTh</a><a className="text-sm text-muted-foreground hover:text-foreground" href="/">Back to home</a></nav></header>
    <main id="main-content" className="mx-auto max-w-6xl px-6 pb-24 pt-16 md:pt-24">
      <a href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft size={16} /> Home</a>
      <div className="mt-8 max-w-3xl"><p className="text-sm font-medium text-primary">FREE AND OPEN SOURCE · {release.tag_name}</p><h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">Bring your AI closer to your work.</h1><p className="mt-6 text-lg text-muted-foreground">Download OpeNpaTh for your computer. Files are served directly from the official GitHub release.</p></div>
      <div className="mt-8 rounded-xl border border-border bg-card p-5 text-sm text-muted-foreground" role="status">{source === "loading" ? "Checking GitHub for the latest release…" : source === "fallback" ? <>Showing verified {fallbackRelease.tag_name} downloads because the latest release could not be checked. <a className="text-primary underline" href={RELEASES}>Check GitHub for newer versions</a>.</> : <>Latest release from GitHub: <a className="text-primary underline" href={release.html_url}>{release.tag_name}</a>.</>} {platform !== "other" && <>Your detected platform is shown first. You can choose another below.</>}</div>
      <div className="mt-8 flex flex-wrap gap-2" aria-label="Jump to platform">{order.map(p => <a key={p} href={`#${p}`} className="rounded-lg border border-border px-4 py-2 text-sm hover:bg-card">{names[p]}</a>)}</div>
      <div className="mt-12 space-y-14">{order.map(p => { const assets = release.assets.filter(a => assetPlatform(a.name) === p).sort((a,b) => Number(/portable/i.test(b.name) && p === "windows") - Number(/portable/i.test(a.name) && p === "windows")); if (!assets.length) return null; return <section id={p} key={p} className="scroll-mt-8"><div className="flex flex-wrap items-center gap-3"><h2 className="text-2xl font-semibold">{names[p]}</h2>{platform === p && <span className="rounded-full bg-primary/15 px-3 py-1 text-sm text-primary">Your platform</span>}</div><p className="mt-2 max-w-3xl text-muted-foreground">{notes[p]}</p><div className="mt-5 grid gap-4 md:grid-cols-2">{assets.map(a => <article key={a.browser_download_url} className="flex flex-col justify-between gap-5 rounded-xl border border-border bg-card p-6 sm:flex-row sm:items-center"><div className="min-w-0"><h3 className="font-semibold">{assetLabel(a.name)} {p === "windows" && /portable/i.test(a.name) && <span className="ml-1 text-sm font-normal text-primary">Recommended</span>}</h3><p className="mt-2 break-all text-sm text-muted-foreground">{a.name}</p><p className="mt-1 text-sm text-muted-foreground">{a.size >= 1000000 ? `${(a.size / 1000000).toFixed(1)} MB` : `${a.size} bytes`}</p></div><a href={a.browser_download_url} className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90"><ArrowDownToLine size={16} /> Download</a></article>)}</div></section>})}</div>
      <aside className="mt-16 rounded-xl border border-border bg-card p-6"><h2 className="flex items-center gap-2 text-xl font-semibold"><ShieldCheck className="text-primary" /> Before you run</h2><p className="mt-3 max-w-3xl text-muted-foreground">Only download from the official release. Compare SHA256 checksums if you need to verify a file. Shell commands are not a hard sandbox; use manual approvals, disable execution or isolate the app for untrusted agents.</p><div className="mt-5 flex flex-wrap gap-5 text-sm"><a className="text-primary underline" href={RELEASES}>All releases <ArrowUpRight className="inline" size={14} /></a><a className="text-primary underline" href="https://github.com/bipul-unexpected/OpeNpaTh#6-security-model">Security model</a><a className="text-primary underline" href="https://github.com/bipul-unexpected/OpeNpaTh/issues">Report an issue</a></div></aside>
    </main>
  </div>;
}

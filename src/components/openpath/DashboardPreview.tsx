import { useEffect, useState } from "react";
import { Cloud, GitCommit, Octagon, Copy, Check, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

type Mode = "FULL_AUTO" | "SMART_HYBRID" | "MANUAL_APPROVAL";

const LOGS: { tag: "EXEC" | "CRUD" | "OK" | "DAEMON"; text: string }[] = [
  { tag: "CRUD", text: "create  src/app/page.tsx  (142 lines)" },
  { tag: "EXEC", text: "npm install next react react-dom" },
  { tag: "OK", text: "added 312 packages in 8.4s · exit 0" },
  { tag: "CRUD", text: "patch   src/components/TodoList.tsx" },
  { tag: "EXEC", text: "npx prisma migrate dev --name init" },
  { tag: "OK", text: "migration applied · exit 0" },
  { tag: "DAEMON", text: "npm run dev  → PID 48213  · :3000 bound" },
  { tag: "CRUD", text: "create  src/app/api/todos/route.ts" },
  { tag: "OK", text: "GET /api/todos 200 in 41ms" },
];

const tagClass: Record<string, string> = {
  EXEC: "text-pending",
  CRUD: "text-primary-soft",
  OK: "text-live",
  DAEMON: "text-primary",
};

export function DashboardPreview() {
  const [mode, setMode] = useState<Mode>("FULL_AUTO");
  const [count, setCount] = useState(4);
  const [copied, setCopied] = useState(false);
  const [crushing, setCrushing] = useState(false);
  const [crushed, setCrushed] = useState(false);

  useEffect(() => {
    if (crushed) return;
    const id = setInterval(() => setCount((c) => (c >= LOGS.length + 3 ? 3 : c + 1)), 1400);
    return () => clearInterval(id);
  }, [crushed]);

  const visible = LOGS.slice(0, Math.min(count, LOGS.length));

  const crush = () => {
    if (crushing) return;
    setCrushing(true);
    setTimeout(() => {
      setCrushing(false);
      setCrushed(true);
    }, 650);
  };

  const restart = () => {
    setCrushed(false);
    setCount(3);
  };

  return (
    <div
      className={cn(
        "overflow-hidden rounded-[28px] border bg-card shadow-float transition-all duration-700",
        crushing && "crush-shake crush-glow border-crush",
        crushed ? "crush-settle border-crush/60" : "border-border",
      )}
    >
      {/* window bar */}
      <div className="flex items-center gap-3 border-b border-border bg-secondary px-5 py-3.5">
        <div className="flex gap-1.5">
          <span className={cn("h-3 w-3 rounded-full bg-crush/80 transition", crushed && "bg-crush")} />
          <span className={cn("h-3 w-3 rounded-full bg-pending/80 transition", crushed && "opacity-30")} />
          <span className={cn("h-3 w-3 rounded-full bg-live/80 transition", crushed && "opacity-30")} />
        </div>
        <span className="ml-2 font-mono text-xs text-muted-foreground">OpeNpaTh Control Center — D:\Projects\My_App</span>
        {crushed ? (
          <button
            type="button"
            onClick={restart}
            className="restart-glow ml-auto inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-[11px] font-semibold text-primary-foreground transition hover:brightness-110 active:scale-95"
            aria-label="Restart OpeNpaTh"
          >
            <RotateCcw className="h-3 w-3" /> RESTART
          </button>
        ) : (
          <button
            type="button"
            onClick={crush}
            className={cn(
              "ml-auto inline-flex items-center gap-1.5 rounded-full bg-crush px-3 py-1 text-[11px] font-semibold text-destructive-foreground transition hover:brightness-110 active:scale-90",
              crushing && "crush-pulse",
            )}
            aria-label="Master Stop and Crush"
          >
            <Octagon className={cn("h-3 w-3", crushing && "animate-spin")} /> STOP & CRUSH
          </button>
        )}
      </div>

      <div className="grid gap-px bg-border md:grid-cols-[260px_1fr]">
        {/* sidebar */}
        <div className="space-y-5 bg-card p-5 text-left">
          <div>
            <p className="mb-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Execution mode</p>
            <div className="flex flex-col gap-1.5">
              {(["FULL_AUTO", "SMART_HYBRID", "MANUAL_APPROVAL"] as Mode[]).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMode(m)}
                  disabled={crushed}
                  className={cn(
                    "rounded-xl px-3 py-2 text-left font-mono text-xs transition",
                    mode === m ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground",
                    crushed && "cursor-not-allowed opacity-40",
                  )}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-secondary p-3.5">
            <div className="mb-2 flex items-center gap-2 text-xs font-medium">
              <Cloud className={cn("h-3.5 w-3.5 transition-colors", crushed ? "text-crush" : "text-primary")} /> Cloudflare tunnel
              {crushed ? (
                <span className="ml-auto flex items-center gap-1 text-[10px] text-crush">
                  <span className="h-1.5 w-1.5 rounded-full bg-crush" /> OFFLINE
                </span>
              ) : (
                <span className="ml-auto flex items-center gap-1 text-[10px] text-live">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-live" /> LIVE
                </span>
              )}
            </div>
            <p className={cn("truncate font-mono text-[11px] transition-all", crushed ? "text-muted-foreground line-through opacity-50" : "text-primary-soft")}>
              https://quiet-river-7x2k.trycloudflare.com
            </p>
          </div>

          <div className="rounded-2xl bg-secondary p-3.5">
            <div className="mb-1 flex items-center gap-2 text-xs font-medium">
              <GitCommit className="h-3.5 w-3.5 text-live" /> Checkpoint saved
            </div>
            <p className="font-mono text-[11px] text-muted-foreground">openpath-checkpoint-1730279820</p>
          </div>

          <button
            type="button"
            onClick={() => {
              setCopied(true);
              setTimeout(() => setCopied(false), 1600);
            }}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-border py-2 text-xs font-medium transition hover:bg-accent"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-live" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? "Copied" : "Copy connection.md"}
          </button>
        </div>

        {/* terminal */}
        <div className="relative flex min-h-[340px] flex-col bg-ink p-5 text-left font-mono text-[12px] leading-relaxed">
          {crushing && <div className="crush-flash pointer-events-none absolute inset-0 z-10" />}
          <div className="mb-3 flex items-center justify-between text-[11px] text-muted-foreground">
            <span>{crushed ? "event stream · terminated" : "live event stream · stdout"}</span>
            <span className={cn(crushed ? "text-crush" : mode === "FULL_AUTO" ? "text-primary" : "text-pending")}>
              {crushed ? "CRUSHED" : mode}
            </span>
          </div>
          <div className={cn("space-y-1.5 transition-all duration-700", crushed && "opacity-25 blur-[1px]")}>
            {visible.map((l, i) => (
              <div key={i} className="flex gap-3 animate-in fade-in slide-in-from-bottom-1 duration-500">
                <span className={cn("w-14 shrink-0 font-semibold", tagClass[l.tag])}>{l.tag}</span>
                <span className="text-foreground/85">{l.text}</span>
              </div>
            ))}
            {mode !== "FULL_AUTO" && !crushed && (
              <div className="mt-3 rounded-xl border border-pending/30 bg-pending/10 p-3 text-pending">
                PENDING · rm -rf node_modules/.cache — awaiting your approval
              </div>
            )}
            {!crushed && <span className="inline-block h-4 w-2 animate-pulse bg-primary align-middle" />}
          </div>
          {crushed && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-ink/60">
              <Octagon className="h-10 w-10 text-crush crush-stamp" />
              <p className="crush-stamp font-mono text-sm font-bold tracking-widest text-crush">CONNECTION CRUSHED</p>
              <p className="crush-stamp font-mono text-[11px] text-muted-foreground" style={{ animationDelay: "0.15s" }}>
                tunnel closed · processes killed · checkpoint intact
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

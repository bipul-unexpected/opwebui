import { useEffect, useRef, useState, type ReactNode } from "react";

/** Splits text into words that rise in one after another. */
export function AnimatedWords({
  text,
  start = 0,
  step = 70,
  className,
  wordClassName,
}: {
  text: string;
  start?: number;
  step?: number;
  className?: string;
  wordClassName?: string;
}) {
  return (
    <span className={`word-wrap ${className ?? ""}`}>
      {text.split(" ").map((w, i) => (
        <span key={i}>
          <span className={`word ${wordClassName ?? ""}`} style={{ animationDelay: `${start + i * step}ms, 0ms` }}>
            {w}
          </span>
          {" "}
        </span>
      ))}
    </span>
  );
}

/** Scroll-linked tilt: element starts tilted back and settles flat as it scrolls into view. */
export function ScrollTilt({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the top is at the bottom of the screen, 1 when it reaches 25% from top
      const p = Math.min(1, Math.max(0, (vh - r.top) / (vh * 0.75)));
      const e = 1 - Math.pow(1 - p, 3);
      el.style.transform = `perspective(1600px) rotateX(${(1 - e) * 22}deg) scale(${0.9 + e * 0.1}) translateY(${(1 - e) * 40}px)`;
      el.style.opacity = String(0.4 + e * 0.6);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div ref={ref} style={{ transformOrigin: "50% 0%", willChange: "transform, opacity" }}>
      {children}
    </div>
  );
}

/** Counts up to a number once visible. */
export function CountUp({ to, duration = 1600 }: { to: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(to);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setVal(0);
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e?.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const tick = (t: number) => {
          const p = Math.min(1, (t - t0) / duration);
          setVal(Math.round(to * (1 - Math.pow(1 - p, 4))));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, duration]);
  return <span ref={ref}>{val}</span>;
}

/** True once the page has scrolled past a threshold. */
export function useScrolled(threshold = 12) {
  const [s, setS] = useState(false);
  useEffect(() => {
    const on = () => setS(window.scrollY > threshold);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, [threshold]);
  return s;
}

type Segment = { text: string; className?: string };

/** Words rise in one by one when the heading scrolls into view. */
export function InViewWords({
  segments,
  step = 55,
  start = 0,
}: {
  segments: Segment[];
  step?: number;
  start?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          el.classList.add("in-view");
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  let n = 0;
  return (
    <span ref={ref} className="word-wrap">
      {segments.map((seg, si) => (
        <span key={si}>
          {seg.text.split(" ").map((w, wi) => {
            const d = start + n++ * step;
            return (
              <span key={wi}>
                <span className={`word-iv ${seg.className ?? ""}`} style={{ animationDelay: `${d}ms, 0ms` }}>
                  {w}
                </span>{" "}
              </span>
            );
          })}
        </span>
      ))}
    </span>
  );
}

/** Apple-style scrubbed text: each word lights up as you scroll through the block. */
export function ScrollHighlight({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = text.split(" ");
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const spans = Array.from(el.querySelectorAll<HTMLSpanElement>("[data-w]"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      spans.forEach((s) => (s.style.opacity = "1"));
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // progress 0 when block top hits 85% of screen, 1 when block bottom hits 45%
      const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.4)));
      const lit = p * spans.length;
      spans.forEach((s, i) => {
        const t = Math.min(1, Math.max(0, lit - i));
        s.style.opacity = String(0.16 + t * 0.84);
        s.style.filter = t < 1 ? `blur(${(1 - t) * 1.5}px)` : "none";
      });
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
      cancelAnimationFrame(raf);
    };
  }, [text]);
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <span key={i}>
          <span data-w style={{ opacity: 0.16, transition: "opacity 0.25s linear" }}>
            {w}
          </span>{" "}
        </span>
      ))}
    </p>
  );
}

/** Types out lines one character at a time, with a blinking caret. */
export function TypeLines({ lines, speed = 45, start = 300, loop = true, hold = 2600 }: { lines: { text: string; className?: string }[]; speed?: number; start?: number; loop?: boolean; hold?: number }) {
  const total = lines.reduce((n, l) => n + l.text.length, 0);
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setCount(total); return; }
    let t: ReturnType<typeof setTimeout>;
    let c = 0;
    let dir = 1;
    const tick = () => {
      c += dir;
      setCount(c);
      if (dir === 1 && c >= total) {
        if (!loop) return;
        dir = -1;
        t = setTimeout(tick, hold);
      } else if (dir === -1 && c <= 0) {
        dir = 1;
        t = setTimeout(tick, 600);
      } else {
        t = setTimeout(tick, dir === 1 ? speed : Math.max(12, speed / 3));
      }
    };
    t = setTimeout(tick, start);
    return () => clearTimeout(t);
  }, [total, speed, start, loop, hold]);
  let left = count;
  return (
    <span className="relative inline-block">
      <span className="invisible" aria-hidden>{lines.map((l, i) => <span key={i} className="block">{l.text}</span>)}</span>
      <span className="absolute inset-0" aria-label={lines.map((l) => l.text).join(" ")}>
        {lines.map((l, i) => {
          const shown = l.text.slice(0, Math.max(0, left));
          const active = left > 0 && left <= l.text.length || (i === 0 && count === 0);
          left -= l.text.length;
          const done = count >= total && i === lines.length - 1;
          return (
            <span key={i} className="block">
              <span className={l.className}>{shown}</span>
              {(active || done) && <span className="type-caret" />}
            </span>
          );
        })}
      </span>
    </span>
  );
}

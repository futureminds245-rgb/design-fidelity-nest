import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ShoppingCart, User, Plus, X, TrendingUp, TrendingDown } from "lucide-react";
import { DotDigits } from "@/components/DotDigits";
import { categories, stats, biomarkers, supplements } from "@/lib/dashboard-data";
import gradientScore from "@/assets/gradient-score.jpg";
import gradientBio from "@/assets/gradient-biological.jpg";
import gradientTracker from "@/assets/gradient-tracker.jpg";
import vial from "@/assets/vial.png";
import invoices from "@/assets/invoices.png";

export const Route = createFileRoute("/")({
  component: Dashboard,
});

function Chip({
  children,
  variant = "default",
  className = "",
}: {
  children: React.ReactNode;
  variant?: "default" | "lime" | "outline";
  className?: string;
}) {
  const base =
    "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] sm:text-xs font-medium whitespace-nowrap";
  const styles =
    variant === "lime"
      ? "bg-lime text-lime-foreground"
      : variant === "outline"
        ? "bg-white/70 backdrop-blur text-foreground border border-black/5"
        : "bg-chip text-foreground/70";
  return <span className={`${base} ${styles} ${className}`}>{children}</span>;
}

function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-[28px] bg-card shadow-[0_8px_30px_rgba(0,0,0,0.04)] ${className}`}
    >
      {children}
    </div>
  );
}

// Dummy 30-day health delta series (April → June), values in points vs baseline.
// Trends generally upward but with realistic noise.
const HEALTH_SERIES = Array.from({ length: 30 }, (_, i) => {
  const t = i / 29;
  const base = -2 + t * 6; // -2 → +4 linear
  const noise = Math.sin(i * 1.7) * 0.9 + Math.cos(i * 0.6) * 0.5;
  return Math.round((base + noise) * 10) / 10;
});

const DOT_COLORS = [
  "bg-orange-400", "bg-rose-300", "bg-slate-300", "bg-emerald-400",
  "bg-indigo-400", "bg-slate-300", "bg-amber-300", "bg-pink-400",
  "bg-slate-300", "bg-emerald-300", "bg-rose-400", "bg-slate-300",
  "bg-cyan-400", "bg-slate-300", "bg-amber-400", "bg-slate-300",
  "bg-emerald-500", "bg-pink-300", "bg-emerald-400", "bg-slate-300",
  "bg-rose-300", "bg-amber-300", "bg-slate-300", "bg-indigo-300",
  "bg-emerald-400", "bg-slate-300", "bg-pink-400", "bg-emerald-500",
  "bg-cyan-400", "bg-emerald-500",
];

function TimelineSlider() {
  const [day, setDay] = useState(29);
  const delta = HEALTH_SERIES[day];
  const improving = delta >= 0;
  const percent = (day / (HEALTH_SERIES.length - 1)) * 100;

  return (
    <div className="relative pt-14 sm:pt-16">
      {/* Floating pill above thumb */}
      <div
        className="pointer-events-none absolute top-0 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white/90 px-3 py-2 shadow-[0_8px_30px_rgba(0,0,0,0.1)] backdrop-blur-xl transition-[left] duration-100 ease-out"
        style={{ left: `calc(${percent}% * 0.86 + 7%)` }}
      >
        {improving ? (
          <TrendingUp className="h-4 w-4 text-emerald-600" />
        ) : (
          <TrendingDown className="h-4 w-4 text-rose-500" />
        )}
        <div className="text-xs sm:text-sm leading-tight">
          <div className="font-medium">
            {improving ? "Health Improving" : "Health Declining"}
          </div>
          <div className="text-[10px] sm:text-xs text-muted-foreground">
            {improving ? "+" : ""}
            {delta.toFixed(1)} last 30 days
          </div>
        </div>
      </div>

      <div className="relative flex items-center gap-2 rounded-full bg-card px-4 py-4 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
        <span className="shrink-0 text-[11px] sm:text-xs text-muted-foreground">
          April
        </span>
        <div className="relative flex-1">
          {/* Dots */}
          <div className="flex items-center justify-between px-1">
            {DOT_COLORS.map((c, i) => (
              <span
                key={i}
                className={`h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full ${c}`}
                style={{
                  opacity:
                    i === day ? 1 : 0.35 + Math.abs(HEALTH_SERIES[i]) / 12,
                }}
              />
            ))}
          </div>
          {/* Native range input overlaying dots */}
          <input
            type="range"
            min={0}
            max={HEALTH_SERIES.length - 1}
            step={1}
            value={day}
            onChange={(e) => setDay(Number(e.target.value))}
            aria-label="Scrub timeline day"
            className="timeline-range absolute inset-0 h-full w-full cursor-pointer appearance-none bg-transparent"
          />
        </div>
        <span className="shrink-0 text-[11px] sm:text-xs text-muted-foreground">
          June
        </span>
      </div>

      <style>{`
        .timeline-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 9999px;
          background: white;
          border: 2px solid var(--foreground);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          cursor: grab;
        }
        .timeline-range::-webkit-slider-thumb:active { cursor: grabbing; }
        .timeline-range::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 9999px;
          background: white;
          border: 2px solid var(--foreground);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          cursor: grab;
        }
        .timeline-range::-moz-range-track { background: transparent; }
      `}</style>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top bar */}
      <header className="flex items-center justify-between px-4 pt-5 sm:px-6 sm:pt-6 lg:px-10">
        <div className="text-base sm:text-lg font-semibold tracking-tight">
          superpower
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <button className="grid h-9 w-9 sm:h-10 sm:w-10 place-items-center rounded-full bg-card shadow-sm">
            <ShoppingCart className="h-4 w-4" />
          </button>
          <button className="grid h-9 w-9 sm:h-10 sm:w-10 place-items-center rounded-full bg-card shadow-sm">
            <User className="h-4 w-4" />
          </button>
        </div>
      </header>

      <div className="grid gap-6 px-4 pb-10 pt-5 sm:px-6 sm:pt-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:px-10">
        {/* Sidebar */}
        <aside className="flex flex-col gap-3">
          <div className="flex items-baseline gap-6 px-2 pb-2">
            <h2 className="text-xl sm:text-2xl font-semibold">Data</h2>
            <h2 className="text-xl sm:text-2xl font-semibold text-muted-foreground/50">
              Records
            </h2>
          </div>

          <nav className="flex flex-col gap-1.5">
            {categories.map((c) => {
              const Icon = c.icon;
              return (
                <button
                  key={c.label}
                  className={`flex items-center justify-between rounded-full px-4 py-3 text-sm transition ${
                    c.active
                      ? "bg-card shadow-[0_4px_20px_rgba(0,0,0,0.04)]"
                      : "hover:bg-card/60"
                  }`}
                >
                  <span className="flex min-w-0 items-center gap-3">
                    <Icon className="h-4 w-4 shrink-0 text-foreground/60" />
                    <span className="truncate font-medium">{c.label}</span>
                  </span>
                  <span className="flex shrink-0 items-center gap-2">
                    {c.value && <Chip>{c.value}</Chip>}
                    {c.active && (
                      <X className="h-3.5 w-3.5 text-foreground/40" />
                    )}
                  </span>
                </button>
              );
            })}
          </nav>

          <Card className="mt-4 p-5">
            <div className="mb-3 flex items-start justify-between">
              <Chip variant="lime">Go Pro</Chip>
              <X className="h-4 w-4 text-foreground/40" />
            </div>
            <div className="text-sm font-semibold">Free Premium Subscription</div>
            <p className="mt-1 text-xs text-muted-foreground">
              Get even better understanding of your health data.
            </p>
            <div className="mt-4 flex items-end justify-between">
              <div className="flex items-baseline gap-1">
                <DotDigits value="30" size={3} gap={1.5} />
                <span className="ml-1 text-xs text-muted-foreground">Days</span>
              </div>
              <button className="rounded-full bg-chip px-4 py-1.5 text-xs font-medium">
                Try it
              </button>
            </div>
          </Card>
        </aside>

        {/* Main */}
        <main className="flex min-w-0 flex-col gap-6">
          <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight">
            Sophia Caldwell
          </h1>

          {/* Stats row */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-4 sm:gap-x-8">
            {stats.map((s) => (
              <div key={s.label} className="flex items-center gap-2 sm:gap-3">
                <ResponsiveDots value={s.value} />
                {s.accent ? (
                  <Chip variant="lime">{s.label}</Chip>
                ) : (
                  <Chip>{s.label}</Chip>
                )}
              </div>
            ))}
          </div>

          {/* Timeline slider */}
          <TimelineSlider />

          {/* Gradient cards row */}
          <div className="grid gap-4 sm:gap-6 lg:grid-cols-[1fr_1fr_1.1fr]">
            <GradientCard image={gradientScore} title="Superpower Score" value="70" sub="On Track" />
            <GradientCard image={gradientBio} title="Biological age" value="25" sub="2.5 years younger" />
            <Card className="p-5 sm:p-6">
              <div className="mb-4 flex items-start justify-between gap-2">
                <div className="text-sm sm:text-base font-medium">
                  Your results are pending
                </div>
                <X className="h-4 w-4 shrink-0 text-foreground/40" />
              </div>
              <div className="flex items-center justify-between gap-4">
                <div className="flex min-w-0 flex-col gap-3">
                  <div className="flex items-baseline gap-1">
                    <DotDigits value="7-10" size={4} gap={2} />
                    <span className="ml-2 text-xs text-muted-foreground">Days</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-lime shadow-[0_0_10px_var(--lime)]" />
                    <div className="h-0.5 w-16 sm:w-24 bg-foreground/10" />
                    <span className="h-2 w-2 rounded-full bg-foreground/30" />
                    <span className="h-1.5 w-1.5 rounded-full bg-foreground/20" />
                  </div>
                  <p className="max-w-[18ch] text-xs text-muted-foreground">
                    Until then your lab draw data is processed.
                  </p>
                </div>
                <div className="grid h-24 w-24 sm:h-28 sm:w-28 shrink-0 place-items-center rounded-full bg-white shadow-inner">
                  <img
                    src={vial}
                    alt="Sample vial"
                    className="h-20 w-20 sm:h-24 sm:w-24 object-contain"
                    loading="lazy"
                  />
                </div>
              </div>
            </Card>
          </div>

          {/* Upload / tracker row */}
          <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
            <Card className="relative overflow-hidden p-5 sm:p-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-base sm:text-lg font-medium leading-tight">Upload</div>
                  <div className="text-base sm:text-lg font-medium leading-tight">Health Records</div>
                </div>
                <button className="grid h-10 w-10 place-items-center rounded-full bg-chip">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-6 flex justify-center">
                <img src={invoices} alt="Existing invoice records" className="h-28 sm:h-32 object-contain" loading="lazy" />
              </div>
              <div className="mt-4 flex items-center justify-between rounded-full bg-chip px-5 py-3">
                <div>
                  <div className="text-sm font-medium">Existing Records</div>
                  <div className="text-xs text-muted-foreground">2 files</div>
                </div>
              </div>
            </Card>

            <div
              className="relative overflow-hidden rounded-[28px] p-5 sm:p-6 text-white shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
              style={{ backgroundImage: `url(${gradientTracker})`, backgroundSize: "cover", backgroundPosition: "center" }}
            >
              <div className="flex items-start justify-between">
                <div className="text-base sm:text-lg font-medium leading-tight drop-shadow">
                  <div>Connect</div>
                  <div>Health Tracker</div>
                </div>
                <button className="grid h-10 w-10 place-items-center rounded-full bg-white/30 backdrop-blur">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-8 flex justify-center">
                <div className="relative grid h-36 w-36 sm:h-40 sm:w-40 place-items-center">
                  {[0, 1, 2, 3].map((i) => (
                    <span
                      key={i}
                      className="absolute rounded-full border border-white/40"
                      style={{ width: `${40 + i * 24}%`, height: `${40 + i * 24}%` }}
                    />
                  ))}
                  <span className="h-3 w-3 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.9)]" />
                </div>
              </div>
            </div>
          </div>

          {/* Biomarkers */}
          <section className="flex flex-col gap-4">
            <div className="flex items-end justify-between gap-4">
              <div className="min-w-0">
                <h3 className="text-xl sm:text-2xl font-semibold">Biomarkers</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  A snapshot of what's happening inside your body.
                </p>
              </div>
              <button className="shrink-0 rounded-full bg-card px-4 py-1.5 text-xs font-medium shadow-sm">
                See All
              </button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {biomarkers.map((b, i) => {
                const Icon = b.icon;
                return (
                  <Card key={i} className="p-5">
                    <div className="flex items-center gap-2 text-sm text-foreground/70">
                      <Icon className="h-4 w-4" />
                      <span>{b.label}</span>
                    </div>
                    <div className="mt-6 flex items-baseline gap-2">
                      <DotDigits value={b.value} size={4} gap={2} />
                      <span className="text-xs text-muted-foreground">{b.unit}</span>
                    </div>
                    <div className="mt-2 text-xs text-muted-foreground">{b.sub}</div>
                    <div className="mt-4 flex h-6 items-end gap-0.5">
                      {Array.from({ length: 28 }).map((_, k) => (
                        <span
                          key={k}
                          className="w-1 rounded-sm bg-foreground/15"
                          style={{ height: `${20 + ((k * 53) % 80)}%` }}
                        />
                      ))}
                    </div>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Supplements */}
          <section className="flex flex-col gap-4">
            <div className="flex items-end justify-between gap-4">
              <div className="min-w-0">
                <h3 className="text-xl sm:text-2xl font-semibold">
                  Top Supplements for You
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Support your balance with supplements picked for you.
                </p>
              </div>
              <button className="shrink-0 rounded-full bg-card px-4 py-1.5 text-xs font-medium shadow-sm">
                See All
              </button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {supplements.map((s, i) => (
                <Card key={i} className="p-5">
                  <div className="mb-2 flex items-start justify-between">
                    <Chip variant={s.tag === "Best Seller" ? "lime" : "default"}>
                      {s.tag}
                    </Chip>
                  </div>
                  <div className="grid h-36 sm:h-40 place-items-center">
                    <img
                      src={s.image}
                      alt={s.name}
                      className="h-32 w-32 sm:h-36 sm:w-36 object-contain mix-blend-multiply"
                      loading="lazy"
                    />
                  </div>
                  <div className="mt-3 text-sm text-muted-foreground">{s.name}</div>
                  <div className="mt-1 text-xl sm:text-2xl font-semibold">{s.price}</div>
                </Card>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

// DotDigits scaled down on narrow screens using CSS transform so it stays crisp.
function ResponsiveDots({ value }: { value: string }) {
  return (
    <span className="inline-block origin-left scale-90 sm:scale-100">
      <DotDigits value={value} size={4} gap={2} />
    </span>
  );
}

function GradientCard({
  image,
  title,
  value,
  sub,
}: {
  image: string;
  title: string;
  value: string;
  sub: string;
}) {
  return (
    <div
      className="relative flex min-h-[220px] sm:min-h-[240px] flex-col items-center justify-between overflow-hidden rounded-[28px] p-5 sm:p-6 text-foreground shadow-[0_8px_30px_rgba(0,0,0,0.05)]"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="text-sm font-medium text-foreground/70">{title}</div>
      <div className="flex flex-col items-center gap-1">
        <DotDigits value={value} size={6} gap={3} color="rgba(255,255,255,0.95)" />
        <div className="mt-2 text-sm font-medium text-foreground/80">{sub}</div>
      </div>
      <div className="h-4" />
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { ShoppingCart, User, Plus, X, TrendingUp } from "lucide-react";
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
    "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium whitespace-nowrap";
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

function Dashboard() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top bar */}
      <header className="flex items-center justify-between px-6 pt-6 lg:px-10">
        <div className="text-lg font-semibold tracking-tight">superpower</div>
        <div className="flex items-center gap-3">
          <button className="grid h-10 w-10 place-items-center rounded-full bg-card shadow-sm">
            <ShoppingCart className="h-4 w-4" />
          </button>
          <button className="grid h-10 w-10 place-items-center rounded-full bg-card shadow-sm">
            <User className="h-4 w-4" />
          </button>
        </div>
      </header>

      <div className="grid gap-6 px-6 pb-10 pt-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:px-10">
        {/* Sidebar */}
        <aside className="flex flex-col gap-3">
          <div className="flex items-baseline gap-6 px-2 pb-2">
            <h2 className="text-2xl font-semibold">Data</h2>
            <h2 className="text-2xl font-semibold text-muted-foreground/50">
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
                  <span className="flex items-center gap-3">
                    <Icon className="h-4 w-4 text-foreground/60" />
                    <span className="font-medium">{c.label}</span>
                  </span>
                  <span className="flex items-center gap-2">
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
            <div className="text-sm font-semibold">
              Free Premium Subscription
            </div>
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
        <main className="flex flex-col gap-6">
          {/* Header row */}
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <h1 className="text-5xl font-semibold tracking-tight">
                Sophia Caldwell
              </h1>
            </div>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap items-center gap-8">
            {stats.map((s) => (
              <div key={s.label} className="flex items-center gap-3">
                <DotDigits value={s.value} size={4} gap={2} />
                {s.accent ? (
                  <Chip variant="lime">{s.label}</Chip>
                ) : (
                  <Chip>{s.label}</Chip>
                )}
              </div>
            ))}
          </div>

          {/* Timeline strip */}
          <div className="relative">
            <div className="flex items-center gap-2 rounded-full bg-card px-5 py-4 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
              <span className="text-xs text-muted-foreground">April</span>
              <div className="relative mx-3 flex flex-1 items-center gap-2">
                {[
                  "bg-orange-400",
                  "bg-rose-300",
                  "bg-slate-300",
                  "bg-emerald-400",
                  "bg-indigo-400",
                  "bg-slate-300",
                  "bg-amber-300",
                  "bg-pink-400",
                  "bg-slate-300",
                  "bg-emerald-300",
                  "bg-rose-400",
                  "bg-slate-300",
                  "bg-cyan-400",
                  "bg-slate-300",
                  "bg-amber-400",
                  "bg-slate-300",
                  "bg-emerald-500",
                  "bg-pink-300",
                ].map((c, i) => (
                  <span
                    key={i}
                    className={`h-2 w-2 rounded-full ${c}`}
                    style={{ opacity: 0.3 + ((i * 37) % 70) / 100 }}
                  />
                ))}
                <div className="mx-2 h-4 w-px bg-foreground/30" />
                {[
                  "bg-emerald-400",
                  "bg-slate-300",
                  "bg-rose-300",
                  "bg-amber-300",
                  "bg-slate-300",
                  "bg-indigo-300",
                ].map((c, i) => (
                  <span
                    key={`b-${i}`}
                    className={`h-2 w-2 rounded-full ${c}`}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">June</span>
            </div>
            <div className="pointer-events-none absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full bg-white/80 px-4 py-2 shadow-[0_8px_30px_rgba(0,0,0,0.08)] backdrop-blur-xl">
              <TrendingUp className="h-4 w-4" />
              <div className="text-sm">
                <div className="font-medium leading-tight">Health Improving</div>
                <div className="text-xs text-muted-foreground leading-tight">
                  +3.2 last 30 days
                </div>
              </div>
            </div>
          </div>

          {/* Gradient cards row */}
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr_1.1fr]">
            <GradientCard
              image={gradientScore}
              title="Superpower Score"
              value="70"
              sub="On Track"
            />
            <GradientCard
              image={gradientBio}
              title="Biological age"
              value="25"
              sub="2.5 years younger"
            />
            {/* Results pending */}
            <Card className="p-6">
              <div className="mb-4 flex items-start justify-between">
                <div className="text-base font-medium">Your results are pending</div>
                <X className="h-4 w-4 text-foreground/40" />
              </div>
              <div className="flex items-center justify-between gap-4">
                <div className="flex flex-col gap-3">
                  <div className="flex items-baseline gap-1">
                    <DotDigits value="7-10" size={4} gap={2} />
                    <span className="ml-2 text-xs text-muted-foreground">
                      Days
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-lime shadow-[0_0_10px_var(--lime)]" />
                    <div className="h-0.5 w-24 bg-foreground/10" />
                    <span className="h-2 w-2 rounded-full bg-foreground/30" />
                    <span className="h-1.5 w-1.5 rounded-full bg-foreground/20" />
                    <span className="h-1 w-1 rounded-full bg-foreground/20" />
                  </div>
                  <p className="text-xs text-muted-foreground max-w-[16ch]">
                    Until then your lab draw data is processed.
                  </p>
                </div>
                <div className="grid h-28 w-28 shrink-0 place-items-center rounded-full bg-white shadow-inner">
                  <img
                    src={vial}
                    alt="Sample vial"
                    className="h-24 w-24 object-contain"
                    loading="lazy"
                  />
                </div>
              </div>
            </Card>
          </div>

          {/* Upload / tracker row */}
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="relative overflow-hidden p-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-lg font-medium leading-tight">Upload</div>
                  <div className="text-lg font-medium leading-tight">
                    Health Records
                  </div>
                </div>
                <button className="grid h-10 w-10 place-items-center rounded-full bg-chip">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-6 flex justify-center">
                <img
                  src={invoices}
                  alt="Existing invoice records"
                  className="h-32 object-contain"
                  loading="lazy"
                />
              </div>
              <div className="mt-4 flex items-center justify-between rounded-full bg-chip px-5 py-3">
                <div>
                  <div className="text-sm font-medium">Existing Records</div>
                  <div className="text-xs text-muted-foreground">2 files</div>
                </div>
              </div>
            </Card>

            <div
              className="relative overflow-hidden rounded-[28px] p-6 text-white shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
              style={{
                backgroundImage: `url(${gradientTracker})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="flex items-start justify-between">
                <div className="text-lg font-medium leading-tight drop-shadow">
                  <div>Connect</div>
                  <div>Health Tracker</div>
                </div>
                <button className="grid h-10 w-10 place-items-center rounded-full bg-white/30 backdrop-blur">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-8 flex justify-center">
                <div className="relative grid h-40 w-40 place-items-center">
                  {[0, 1, 2, 3].map((i) => (
                    <span
                      key={i}
                      className="absolute rounded-full border border-white/40"
                      style={{
                        width: `${40 + i * 24}%`,
                        height: `${40 + i * 24}%`,
                      }}
                    />
                  ))}
                  <span className="h-3 w-3 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.9)]" />
                </div>
              </div>
            </div>
          </div>

          {/* Biomarkers */}
          <section className="flex flex-col gap-4">
            <div className="flex items-end justify-between">
              <div>
                <h3 className="text-2xl font-semibold">Biomarkers</h3>
                <p className="text-sm text-muted-foreground">
                  A snapshot of what's happening inside your body.
                </p>
              </div>
              <button className="rounded-full bg-card px-4 py-1.5 text-xs font-medium shadow-sm">
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
                      <span className="text-xs text-muted-foreground">
                        {b.unit}
                      </span>
                    </div>
                    <div className="mt-2 text-xs text-muted-foreground">
                      {b.sub}
                    </div>
                    <div className="mt-4 flex h-6 items-end gap-0.5">
                      {Array.from({ length: 28 }).map((_, k) => (
                        <span
                          key={k}
                          className="w-1 rounded-sm bg-foreground/15"
                          style={{
                            height: `${20 + ((k * 53) % 80)}%`,
                          }}
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
            <div className="flex items-end justify-between">
              <div>
                <h3 className="text-2xl font-semibold">Top Supplements for You</h3>
                <p className="text-sm text-muted-foreground">
                  Support your balance with supplements picked for you.
                </p>
              </div>
              <button className="rounded-full bg-card px-4 py-1.5 text-xs font-medium shadow-sm">
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
                  <div className="grid h-40 place-items-center">
                    <img
                      src={s.image}
                      alt={s.name}
                      className="h-32 w-32 object-contain"
                      loading="lazy"
                    />
                  </div>
                  <div className="mt-3 text-sm text-muted-foreground">
                    {s.name}
                  </div>
                  <div className="mt-1 text-2xl font-semibold">{s.price}</div>
                </Card>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
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
      className="relative flex min-h-[240px] flex-col items-center justify-between overflow-hidden rounded-[28px] p-6 text-foreground shadow-[0_8px_30px_rgba(0,0,0,0.05)]"
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

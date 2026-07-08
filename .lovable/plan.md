# Superpower Health Dashboard

Replicate the attached "Superpower" dashboard UI exactly — layout, typography, spacing, blurred gradient cards, dotted-numeric readouts, pill chips, and color accents. Content/data will be static mock data for now (backend can plug in later).

## Scope

Single dashboard page at `/` (replaces the placeholder index). No auth, no backend, no routing beyond the one page.

## Layout

Two-column desktop layout on a warm off-white background (`#f2f2f0`-ish), rounded to a single scrollable page.

```text
┌──────────────────────────────────────────────────────────────┐
│ superpower (wordmark)                    [cart] [profile]    │
├──────────────┬───────────────────────────────────────────────┤
│ Data│Records │  Sophia Caldwell                              │
│              │  106 Total   80 Optimal  21 In range  5 Out   │
│ • All Data   │  ── timeline (Apr → Jun) with [Health Improv]│
│ • Longevity  │                                                │
│ • Heart      │  ┌─────────────┬─────────────┬──────────────┐│
│ • Thyroid    │  │Superpower   │ Biological  │ Results      ││
│ • Immune     │  │Score  70    │ age  25     │ pending 7-10 ││
│ • Hormone    │  │(green blur) │(orange blur)│ (vial image) ││
│ • Metabolic  │  └─────────────┴─────────────┴──────────────┘│
│ • Nutrients  │                                                │
│ • Blood      │  ┌── Upload Health Records ── Connect Tracker┐│
│              │  │ (white card + invoice)  │ (pink gradient) ││
│ [Go Pro card]│  └──────────────────────────────────────────┘│
│              │                                                │
│              │  Biomarkers                  See All          │
│              │  [Heart 103] [Nutrients 43] [Hormone 42] …   │
│              │                                                │
│              │  Top Supplements for You     See All          │
│              │  [Best Seller $24.30] [$19.90] [$45.00]      │
└──────────────┴───────────────────────────────────────────────┘
```

## Visual system (locked to reference)

- **Background**: warm neutral gray `#efeeea`
- **Cards**: pure white, radius ~28px, soft shadow `0 8px 30px rgba(0,0,0,0.04)`
- **Accent chip**: lime yellow `#e8fa5b` (Total, Best Seller, Go Pro)
- **Gradient blur cards** (rendered as generated background images or CSS radial gradients with heavy blur):
  - Superpower Score: orange→green vertical blur
  - Biological age: blue→orange radial blur
  - Connect Health Tracker: hot pink→magenta radial with concentric ring lines
  - Supplement thumbs: green blob, blue blob, orange blob
- **Typography**: 
  - Display/body: **Instrument Sans** or **Inter Tight** (clean geometric sans, matches reference)
  - Big numerics ("106", "80", "5"): **dotted/stencil** style — use a display font like **"Nova Mono"** or a custom SVG dot-matrix rendering
- **Chips/pills**: fully rounded, subtle gray bg `#eeede9` with dark text; small icon + label + optional right-side value chip
- **Sidebar list items**: rounded pill rows, icon left, label, optional value chip right
- **Timeline strip**: horizontal pill containing scattered colored dots + "April … June" labels, with a floating "Health Improving +3.2 last 30 days" pill overlapping it

## Components to build

- `DashboardLayout` — bg + top bar
- `TopBar` — wordmark left, cart + profile icons right
- `Sidebar` — Data/Records tabs, category list with icons + value chips, Go Pro card at bottom
- `ProfileHeader` — name + 4 stat readouts (dot-matrix number + label chip)
- `TimelineStrip` — pill w/ dots + overlapping "Health Improving" callout
- `GradientStatCard` — reusable card for Superpower Score / Biological age (title top, big dotted number center, sub label, gradient bg)
- `ResultsPendingCard` — dark? no, white card with slider 7–10 Days + vial image
- `UploadRecordsCard` — white card with stacked invoice thumbnails + "Existing Records 2 files" inner pill
- `ConnectTrackerCard` — pink gradient card with concentric ring SVG
- `BiomarkerCard` — icon, label, dotted number + unit, tiny sparkline/dots
- `SupplementCard` — product blob image, Best Seller chip, name, price
- `SectionHeader` — title + "See All" pill

## Assets to generate

Use `imagegen` for the blurred gradient backgrounds and product blobs (as JPGs in `src/assets/`):
- superpower-score-gradient.jpg (orange top → vivid green bottom, heavy gaussian blur)
- biological-age-gradient.jpg (soft blue left → warm orange right, radial blur)
- tracker-pink-gradient.jpg (hot pink radial)
- vial.png (small blood vial, transparent bg)
- supplement-green.png, supplement-blue.png, supplement-orange.png (transparent blob pills)
- invoice-stack.png (two overlapping minimal invoice cards, transparent)

Dot-matrix numerals: render inline via a small React component that maps digits to a 5×7 dot grid (SVG circles) — matches the reference exactly and stays crisp at any size.

## Data

All hardcoded in a `src/lib/dashboard-data.ts` module (categories, biomarkers, supplements, stats) so a backend can drop in later without UI churn.

## Technical notes

- TanStack Start route at `src/routes/index.tsx` (replace placeholder)
- Design tokens added to `src/styles.css` under `@theme` (bg, accent-lime, card, muted-chip, radii)
- Fonts loaded via `<link>` in `src/routes/__root.tsx` head (Instrument Sans + Nova Mono)
- Update `__root.tsx` head title/description to "Superpower — Health Dashboard"
- Desktop-first; a minimal responsive collapse (sidebar stacks above) so it doesn't break on tablet, but pixel-matching is desktop only per your note

## Out of scope (this pass)

- Real data / auth / Lovable Cloud
- Interactive filtering, cart, checkout
- Mobile-optimized layout beyond graceful stacking
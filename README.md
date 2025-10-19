# KR Weekly Weather — Next.js + MUI (Dark by Default)

A clean **weekly weather service for Korea** built with **Next.js (App Router)** and **Material UI**.  
Shows **7–16 day** forecasts from **Open‑Meteo**, with **umbrella advice** and **clothing suggestions** for each day.

> Default theme is **Dark**. Includes **Light/Dark/Night theme toggle**, **city selector**, **forecast‑length combo (7/14/16)**, **inline loading spinner**, and a **theme‑aware Open‑Meteo logo with link**.

---

## ✨ Features

- **Korean cities** preset + **Use current location** (browser geolocation)
- **Forecast length selector** (7 / 14 / 16 days — Open‑Meteo daily max is 16)
- **Umbrella guidance** (≥40%: *Recommended*, ≥60%: *Required*)
- **Clothing suggestions** based on min/max and diurnal range
- **3 Themes**: Light / Dark (default) / Night (navy tone)
- **Inline loading**: wait circle + “Loading forecast…” text (no blocking popup)
- **Fixed header** with proper spacer (no overlap on scroll)
- **“API by Open‑Meteo”** with **theme‑aware logo** and hyperlink
- **Type‑safe** (TypeScript) + **SWR** fetching + server **API route**

---

## 🧰 Tech Stack


## 🛠️ Stacks
![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js&logoColor=white)
![App Router](https://img.shields.io/badge/App%20Router-enabled-blue?style=flat-square)
![Material%20UI](https://img.shields.io/badge/Material%20UI-6.x-007FFF?logo=mui&logoColor=white)
![SWR](https://img.shields.io/badge/SWR-data--fetching-000000?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![Open--Meteo%20API](https://img.shields.io/badge/Open--Meteo-API-green?style=flat-square)
![Geolocation](https://img.shields.io/badge/Browser-Geolocation-FF6F00?style=flat-square)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel&logoColor=white)
<br/><br/>


- **Next.js 15 (App Router)**
- **React 18**
- **Material UI v6** (`@mui/material`, `@mui/icons-material`, `@emotion/*`)
- **TypeScript**
- **SWR** for data fetching/cache
- **Open‑Meteo** public API (no key)

---

## 🚀 Getting Started

```bash
npm install   # or: pnpm i / yarn
npm run dev
# http://localhost:3000
```

Production:
```bash
npm run build && npm run start
```

---

## 📁 Project Structure

```
app/
  layout.tsx              # Root layout + ThemeRegistry
  (pages)/page.tsx        # Main UI: city select, days select, grid of cards
  api/forecast/route.ts   # Server-side proxy to Open-Meteo
  globals.css             # Global styles
components/
  ForecastCard.tsx        # Per-day UI + badges
  ModeToggle.tsx          # Light/Dark/Night toggle
  OpenMeteoMark.tsx       # Theme-aware logo (high-contrast + halo)
  ThemeRegistry.tsx       # MUI ThemeProvider, persists mode in localStorage
lib/
  cities.ts               # KR city coordinates
  recommendation.ts       # Umbrella/clothing/comfort badges
public/
  wait-circle.gif         # Inline loading indicator
  open-meteo.svg          # (kept for reference; component is used instead)
next.config.mjs
package.json
tsconfig.json             # includes "@/..." path alias (baseUrl + paths)
```

---

## 🧠 Core Components & Logic

### `app/api/forecast/route.ts`
- Accepts `lat`, `lon`, `days` (clamped **1–16**).
- Calls **Open‑Meteo** with daily fields: `temperature_2m_max`, `temperature_2m_min`, `precipitation_probability_mean` and `timezone=Asia/Seoul`.
- Returns:
  ```ts
  { days: [{ date, tmin, tmax, precipProb }] }
  ```
- **Revalidate** is a numeric literal (`1800` = 30 min) to satisfy Next.js config parsing.

### `components/ForecastCard.tsx`
- Shows weekday + date, min/max, precipitation probability.
- Badges:
  - **Umbrella**: ≥60% *Required*, ≥40% *Recommended*, ≥25% *Consider rain gear*, else *Not needed*.
  - **Clothing**: tiers by max temp.
  - **Comfort**: flags large diurnal range.

### `components/OpenMeteoMark.tsx`
- SVG **cloud + sun** glyph that:
  - Computes **contrast color** against `background.paper` (uses `getContrastText` + luminance fallback).
  - Draws a **halo** (background-colored under‑stroke) so the logo stays visible on any theme.

### `app/(pages)/page.tsx`
- **AppBar** is `fixed` with a `<Toolbar />` spacer → **no content overlap**.
- **City selector (Autocomplete)**, **Days Select (7/14/16)** next to it.
- **SWR** data fetch; **inline loader** when a new city or length is selected.

---

## 🔧 Customization

- **Forecast options**: adjust the `<MenuItem>` list (max 16 days).
- **Umbrella/clothing rules**: tune thresholds in `lib/recommendation.ts`.
- **Default theme**: change initial value in `ThemeRegistry.tsx`.
- **Logo color behavior**: tweak contrast/halo logic in `OpenMeteoMark.tsx`.
- **Cities**: extend `lib/cities.ts` with more KR locales.

---

## 🧩 Changelog (this build)

1. **Initial scaffold**
   - Next.js + MUI app; Night/Dark/Light themes; city list; Open‑Meteo API route.
2. **Path alias fix**
   - Added `baseUrl` + `paths` for `@/...` imports in `tsconfig.json`.
3. **Header overlap fix**
   - Switched AppBar to `fixed` + spacer `<Toolbar />`; wrapped controls on small screens.
4. **Build error fix (config parsing)**
   - `revalidate = 60 * 30` ⇒ **`revalidate = 1800`** (literal required by Next 15).
5. **Inline loading indicator**
   - Replaced Backdrop with inline **wait-circle.gif** next to “Loading forecast…”. 
6. **Forecast length selector**
   - Added **7/14/16** options; server clamps to 16 (Open‑Meteo max).
7. **API improvements**
   - Query param passthrough; stricter error handling; response shape normalized.
8. **Open‑Meteo branding**
   - Replaced static SVG with **theme-aware logo component** (contrast + halo).
9. **Duplicate identifier fix**
   - Renamed clashing `days` variables in `route.ts` (`requestDays` / `rows`).

---

## ❓ Troubleshooting

- **Module not found: `@/...`**
  - Ensure `tsconfig.json` contains:
    ```json
    { "compilerOptions": { "baseUrl": ".", "paths": { "@/*": ["./*"] } } }
    ```
- **Invalid page config (`revalidate` BinaryExpression)**
  - Use a **number literal**: `export const revalidate = 1800;`
- **`Identifier 'days' has already been declared` in API route**
  - Avoid name reuse; e.g. `const requestDays = ...; const rows = ...; return { days: rows }`
- **Header overlaps content when scrolling**
  - Keep `AppBar position="fixed"` and insert `<Toolbar />` after it.

---

## 🔗 Data Source

- **Open‑Meteo** — https://open-meteo.com/ (Public API, no key; daily forecast up to **16 days**)

---

## 📜 License

Demo / sample use. Replace with your project’s license as needed.

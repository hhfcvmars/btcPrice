# CLAUDE.md

## Project Overview

btcPrice is a multi-feature React single-page application for cryptocurrency price tracking and financial tools. It provides real-time OKX exchange market data, price change calculations, historical BTC charts, and a retirement countdown timer. Supports Chinese and English with automatic language detection via IP geolocation.

## Tech Stack

- **Framework:** React 18.3 with hooks and Context API
- **Build Tool:** Vite 5.4 with `@vitejs/plugin-react` (Babel)
- **Routing:** React Router DOM 6.26
- **HTTP Client:** Axios
- **Charting:** Chart.js + react-chartjs-2
- **Date Utils:** date-fns
- **Linting:** ESLint 9 (flat config)
- **Language:** JavaScript/JSX only (no TypeScript)
- **Module System:** ES Modules (`"type": "module"`)

## Commands

```bash
npm run dev       # Start Vite dev server with HMR
npm run build     # Production build (outputs to dist/)
npm run lint      # Run ESLint on all files
npm run preview   # Preview production build locally
```

There is no test framework configured. No test commands are available.

## Project Structure

```
src/
├── main.jsx              # Entry point: BrowserRouter + LanguageProvider setup
├── Wizz.jsx              # Price change calculator (root route component)
├── App.jsx               # OKX market data table with real-time updates
├── CoinDetail.jsx        # Bitcoin historical price chart (Chart.js)
├── WorkCountdown.jsx     # Retirement countdown timer with salary calculator
├── LanguageContext.jsx    # React Context provider for i18n (zh/en)
├── translations.js       # Translation strings for Chinese and English
├── index.css             # Global styles
├── App.css               # Market table styles (dark theme)
├── Wizz.css              # Calculator styles
├── CoinDetail.css        # Chart container styles
├── WorkCountdown.css     # Countdown display styles
└── assets/               # Static assets (images, SVGs)
```

## Architecture

- **State management:** React Context API (LanguageContext for i18n)
- **Routing:** React Router v6 with `BrowserRouter` configured in `main.jsx`
- **Styling:** Component-scoped CSS files (one `.css` per component)
- **Data fetching:** Axios with polling intervals (10s for market data)
- **i18n:** Custom implementation via `LanguageContext.jsx` + `translations.js`; auto-detects Chinese users via IP geolocation (`api.ipify.org` + `ipapi.co`)

## External APIs

- **OKX Exchange API** (no auth required):
  - `/api/v5/market/tickers` — live trading pair data
  - `/api/v5/market/history-candles` — historical candlestick data
- **IP Geolocation:**
  - `https://api.ipify.org` — user IP lookup
  - `https://ipapi.co` — country detection for language auto-selection

## Code Conventions

- React functional components with hooks (no class components)
- JSX files use `.jsx` extension
- ESLint flat config (`eslint.config.js`) with:
  - `@eslint/js` recommended rules
  - `eslint-plugin-react` recommended + JSX runtime rules
  - `eslint-plugin-react-hooks` for hooks best practices
  - `eslint-plugin-react-refresh` for HMR component validation
- React version set to 18.3 in ESLint settings
- ES2020+ language features (browser globals enabled)
- No TypeScript — `@types/react` and `@types/react-dom` are for IDE support only
- Tracked cryptocurrencies: BTC, ETH, LTC, XRP, DOT, DOGE, ADA, SOL, MATIC, LINK

## Key Patterns

- API URLs are hardcoded (no environment variable configuration)
- Components handle their own data fetching with `useEffect`
- Automatic polling with `setInterval` for real-time data (cleanup on unmount)
- Language detection runs on mount via IP geolocation API calls
- Chart.js components registered with required plugins in consuming modules

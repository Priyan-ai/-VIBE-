
# Vibe Project

This repository currently contains the frontend apps for Vibe.

## Project layout

- `web/` -> Web frontend (React + Vite + TypeScript)
- `mobile/` -> Mobile frontend (Expo + React Native + TypeScript)
- `src/` -> Legacy web UI bundle at repository root (React + Vite)
- `backend/` -> Backend API (create or keep your server code here)

## Recommended order (frontend + backend)

1. Start backend API first (`backend/`)
2. Start web frontend (`web/`)
3. Start mobile frontend (`mobile/`)

## Run the apps

### Web frontend

```bash
cd web
npm install
npm run dev
```

### Mobile frontend

```bash
cd mobile
npm install
npm start
```

### Legacy root UI (optional)

```bash
npm install
npm run dev
```

## Notes

- Use `npm.cmd` instead of `npm` in Windows PowerShell if script execution policy blocks npm.
- The malformed temporary folders (`{web`, `mobile/{app`) were removed.
- Mobile TypeScript errors were fixed in `mobile/src/screens/ProfileScreen.tsx`.
  
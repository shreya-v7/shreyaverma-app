# MySpace

A private, **offline-only** personal companion app for my iPhone — journal, tasks, routines, and a quick reference to my work. It's a personal extension of [shreyaverma.com](https://shreyaverma.com): on first launch it seeds my journal with my existing diary/blog entries and shows my experience, education, certificates, and projects pulled from the same data.

> No backend. No accounts. No sync. No analytics. Everything lives in a local SQLite database on the device.

Built with **Expo (SDK 56) + React Native + TypeScript + Expo Router**.

---

## Features

- **Journal / Notes** — free-form entries, auto-saved with timestamps, newest-first. Tap to edit, swipe to delete, tag (`diary`, `idea`, `log`, …), filter by tag, and full-text search. Seeded with my existing diary + blog entries (editable afterwards, never synced back to the website).
- **Tasks / To-dos** — add / complete / delete / reorder, optional due date + priority (low / med / high with a color dot), grouped into **Today / Upcoming / Done**.
- **Routines / Habits** — daily or specific-weekday recurrence, a daily checklist with checkboxes, and a **streak counter** per routine.
- **Reference** — read-only view of experience, education, certificates, and projects, sourced at build time from the website's data shapes.
- **Home / Dashboard** — greeting, "new journal entry" shortcut, today's tasks + routines, and an **On this day** memory card.
- **Settings** — export all data as JSON (share via Files / AirDrop / Mail) for manual backup, an optional reminders toggle, and a data summary.
- Light/dark mode via `useColorScheme`, throughout.

## How to run it (Expo Go)

No custom native build needed — everything runs in **Expo Go**.

```bash
# 1. install dependencies
npm install

# 2. start the dev server
npx expo start

# 3. on your iPhone:
#    - install "Expo Go" from the App Store
#    - make sure the phone and computer are on the same Wi-Fi
#    - open the Camera app and scan the QR code in the terminal
```

Press `i` in the terminal to launch the iOS Simulator, or `r` to reload.

### A note on reminders (optional)

Routine/task reminders use **local notifications**. These work in Expo Go on a physical iPhone. On Android, Expo Go (SDK 53+) has limited notification support — for fully reliable scheduling there, build a custom dev client (`npx expo run:android` or an EAS dev build). The app is fully functional without reminders; they're purely additive.

## Project structure

```
src/
  app/                 # Expo Router routes
    _layout.tsx        # root: gesture root, SQLite provider, theme, modal stack
    (tabs)/            # bottom tabs: Home, Journal, Tasks, Routines, Reference, Settings
    entry/[id].tsx     # full-screen journal editor (modal)
  components/          # reusable UI (screen, fab, swipeable-row, segmented, editors…)
  hooks/               # reactive data hooks (re-query on DB change) + theming
  lib/                 # db schema/migrations, repository, export, notifications, helpers
  data/                # reference content + diary seed (mirrors the website data)
  types/               # Entry, Task, Routine + reference data shapes
  constants/           # colors, spacing, fonts
```

## Data & persistence

- **expo-sqlite** with `SQLiteProvider` + a synchronous repository layer.
- Hooks subscribe to `addDatabaseChangeListener` so the UI updates instantly after any write.
- First-launch seeding (journal entries from `src/data/diary.ts`, a few starter routines/tasks) runs once, guarded by `PRAGMA user_version`.
- The reference tab data lives in `src/data/reference.ts`, kept in sync with the website's `src/data/*` files and typed to match `src/types`.

## Backup

Settings → **Export all data as JSON** writes a `myspace-backup-YYYY-MM-DD.json` file and opens the system share sheet (via `expo-file-system` + `expo-sharing`).

---

Private project — built for personal use.

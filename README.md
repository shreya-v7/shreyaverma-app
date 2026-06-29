# shreyaverma-app

Offline iOS portfolio app for [shreyaverma.com](https://shreyaverma.com): Home, About, Diary, and Projects in a monochrome Geist layout.

Built with **Expo (SDK 56) + React Native + TypeScript + Expo Router**.

## Run

```bash
npm install
npx expo start
```

For a device build:

```bash
npx expo run:ios --device
```

## Structure

```
src/
  app/(tabs)/     # Home, About, Diary, Projects
  components/     # Shared UI
  data/           # Offline portfolio content
  hooks/          # Theme and layout helpers
  lib/            # Spotify / Substack helpers
```

Private personal features (journal, tasks, meal plans, etc.) are kept **local only** and are not part of this repository.

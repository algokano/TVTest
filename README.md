# TVTest

A React Native TV app for **tvOS** and **Android TV** built with TypeScript and React Native CLI (`react-native-tvos`).

The app has a Home screen with dynamic sections loaded from Firebase Remote Config and a TikTok-style video player with HLS (m3u8) playback.

<img width="1280" height="728" alt="image" src="https://github.com/user-attachments/assets/27e1653d-c4e7-4932-8dbe-33f7050c8284" />

<img width="1280" height="719" alt="image" src="https://github.com/user-attachments/assets/47ff5184-7407-4ac5-b29d-5997cd03a27d" />




## Features

**Home Screen**
- Horizontal scrollable sections with items, banners, and badges
- Hero area that updates based on the focused item
- "Continue Watching" section that appears after a user starts watching content and resumes from the last position
- "Coming Soon" section for upcoming content
- All sections, items, and their order are driven by a JSON config from Firebase Remote Config
- Animated hero collapse/expand when navigating between rows

**Video Player**
- HLS (m3u8) streaming via `react-native-video`
- Play, pause, and seek with the TV remote (Left/Right seeks 10 seconds)
- Remembers the last watched position per video and restores it on next visit
- Controls overlay with progress bar, episode info, and play/pause indicator
- Controls auto-hide after 10 seconds during playback, reappear on any key press

**TV Focus System**
- Custom focus management layer built from scratch (`TVFocusProvider`, `useTVFocusGrid`, `TVFocusable`)
- Row-based D-pad navigation on the Home screen with smooth auto-scrolling
- Player screen has its own focus model for navigating between controls (progress bar, back button, next episode button)
- Visible focus indicators on all interactive elements

## Tech Stack

- **React Native TV** (`react-native-tvos 0.83`)
- **TypeScript**
- **Redux Toolkit** + **RTK Query** for state management and data fetching
- **redux-persist** + AsyncStorage for saving playback positions across app restarts
- **Firebase Remote Config** for dynamic home screen layout
- **react-native-video** for HLS playback
- **react-native-reanimated** for animations (hero, controls fade)
- **React Navigation** (native stack)

## Project Structure

```
src/
├── app/                          # App shell, providers, navigation
│   ├── App.tsx
│   └── navigation/
│       └── RootNavigator.tsx
│
├── features/
│   ├── home/                     # Home screen
│   │   ├── screens/
│   │   ├── components/           # SectionRow, ItemCard, BannerRow,
│   │   │                         # ContinueWatchingRow, ComingSoonRow
│   │   └── hooks/                # useHomeSections, useHomeFocusGrid
│   │
│   ├── player/                   # Video player
│   │   ├── screens/
│   │   ├── components/           # VideoItem, PlayerControlsOverlay, ProgressBar
│   │   └── hooks/                # usePlayerControls, useRememberPosition,
│   │                             # useControlsVisibility, useAutoplayFeed,
│   │                             # useAppStatePlayback
│   │
│   └── continueWatching/         # Continue Watching selector logic
│
├── store/                        # Redux store
│   ├── slices/                   # configSlice, catalogSlice, playbackSlice, uiSlice
│   └── services/                 # RTK Query endpoint for Remote Config
│
├── tv/                           # TV-specific focus system
│   ├── focus/                    # TVFocusProvider, useTVKeyPress, useTVFocusGrid
│   └── components/               # TVFocusable, TVTouchable
│
└── shared/                       # Theme, icons, types, constants
```

## How It Works

**Home screen data flow:**
Firebase Remote Config JSON -> RTK Query -> configSlice -> catalogSlice (normalized) -> HomeScreen renders sections

The home screen config is a JSON object with sections, each having an `order`, `type`, and list of items. Changing the JSON changes what shows up on screen and in what order.

**Player focus and controls:**
The player uses a custom focus state machine. The progress bar is focused by default. Up moves focus to the top bar (back / next episode buttons), Down goes back. Left/Right seeks when on the progress bar, or moves between buttons when on the top bar. Select triggers the focused element's action.

**Position memory:**
Every video's playback position is saved to Redux on each progress tick. The `playback` slice is persisted with `redux-persist` and AsyncStorage. When a video loads, `useRememberPosition` seeks to the saved position. This also drives the "Continue Watching" section on the Home screen.

## Running the Project

Make sure you have the [React Native environment](https://reactnative.dev/docs/set-up-your-environment) set up.

```bash
# Install dependencies
yarn

# Android TV
yarn android

# tvOS
cd ios && pod install && cd ..
yarn ios
```

## Key Decisions

- **Custom TV focus layer** instead of relying on the platform's native focus engine. This gives full control over navigation behavior and makes focus predictable across both platforms.
- **Feature-first folder structure** to keep each screen's logic, components, and hooks close together.
- **Redux Toolkit** for state because the app has several pieces of shared state (config, catalog, playback) that multiple screens read from.
- **Refs for seek callbacks** in the player to avoid re-registering override handlers on every state change, which would cause flickering and missed key events.

# TVTest – React Native TV Assignment

## Overview

This project is a **React Native TV** app (tvOS + Android TV) implemented in **TypeScript** using:

- **Redux Toolkit** for state management
- **RTK Query** for (mocked) Remote Config integration
- A dedicated **TV focus layer** for D‑pad navigation
- A **TikTok-style video player** with m3u8 playback and last-position memory

The structure is designed to be feature-first and TV-optimized to showcase production-grade architecture on the big screen.

## Project structure

All application code lives under `src/`:

- `src/app/` – Application shell
  - `App.tsx` – Wires providers (Redux, PersistGate, TVFocusProvider, Navigation)
  - `navigation/RootNavigator.tsx` – Stack navigator for `Home` and `Player`
- `src/store/` – Redux Toolkit store
  - `index.ts` – `configureStore`, `redux-persist` setup, typed hooks
  - `rootReducer.ts` – Combines feature slices and RTK Query reducers
  - `slices/`
    - `configSlice.ts` – Remote Config home JSON + status
    - `catalogSlice.ts` – Normalized sections, banners, and items
    - `playbackSlice.ts` – Playback state and last positions
    - `uiSlice.ts` – Global UI flags
  - `services/remoteConfigApi.ts` – RTK Query endpoint that currently returns **typed mock data** (mirrors Firebase Remote Config JSON)
- `src/features/home/` – Home screen
  - `screens/HomeScreen.tsx` – Sections, banners, Continue Watching, Coming Soon
  - `components/` – `BannerRow`, `SectionRow`, `ItemCard`, `ContinueWatchingRow`, `ComingSoonRow`
  - `hooks/` – `useHomeSections`, `useHomeFocusGrid`
  - `types.ts` – Home-related types re-exported from shared config types
- `src/features/player/` – TikTok-style player
  - `screens/PlayerScreen.tsx` – Fullscreen vertical feed of videos
  - `components/` – `VideoItem` (m3u8 playback via `react-native-video`), `PlayerControlsOverlay`
  - `hooks/` – `usePlayerControls`, `useAutoplayFeed`, `useRememberPosition`
- `src/features/continueWatching/`
  - `logic.ts` – Selector deriving Continue Watching items from playback history
- `src/tv/` – TV-specific focus and primitives
  - `focus/`
    - `TVFocusProvider.tsx` – Central TV key dispatcher using `useTVEventHandler`
    - `useTVKeyPress.ts` – Low-level remote key abstraction
    - `useTVFocusGrid.ts` – Row/grid-level left/right focus management
    - `types.ts` – Focus and keypress types
  - `components/`
    - `TVFocusable.tsx` – Wrapper that adds focus ring styling and press support
    - `TVTouchable.tsx` – Simple TV-friendly pressable
- `src/shared/`
  - `theme/` – `colors`, `spacing` for a TV-friendly 10-foot UI
  - `types/config.ts` – Typed Remote Config schema (sections, banners, items)
  - `constants/`
    - `mockHomeConfig.ts` – Mock Remote Config JSON for the home screen
    - `videos.ts` – Ordered list of m3u8 video metadata (from the assignment)

## Home screen behavior

- Loads **home configuration** via `remoteConfigApi.getHomeConfig` (currently backed by `mockHomeConfig`).
- `configSlice` stores the raw JSON; `catalogSlice` normalizes it into:
  - Sections (with `order`, `type`, `title`)
  - Banners and items, with dynamic section ordering
- `HomeScreen`:
  - Renders **banners** at the top (`BannerRow`)
  - Shows **Continue Watching** if playback history exists (`ContinueWatchingRow`)
  - Renders regular content sections as horizontal rows (`SectionRow`)
  - Optionally shows **Coming Soon** content based on config
- Each row uses `useHomeFocusGrid` → `useTVFocusGrid` + `TVFocusable` for predictable D‑pad navigation.

## Player behavior (TikTok-style)

- Uses `react-native-video` to play the ordered m3u8 URLs from `shared/constants/videos.ts`.
- `PlayerScreen`:
  - Picks the initial video from navigation params (`initialVideoId`) or defaults to the first video.
  - Uses `useAutoplayFeed` to start playback whenever the current video changes.
  - Uses `usePlayerControls` to bind TV remote keys via `TVFocusProvider`:
    - **Up / Down** – Previous / next video
    - **OK / Play-Pause** – Toggle play / pause
    - **Back / Menu** – Navigate back to Home
- `VideoItem`:
  - Reports progress and duration to `playbackSlice` via `updatePlaybackPosition`.
  - Uses `useRememberPosition` to seek to the last watched position when a video loads.

This combination drives the **Continue Watching** row on the Home screen.

## State persistence

- `redux-persist` with `@react-native-async-storage/async-storage` is configured in `store/index.ts`.
- Only the `playback` slice is whitelisted for persistence (last watched positions and current video).
- The app is wrapped with `PersistGate` in `src/app/App.tsx` to ensure state is rehydrated before rendering.

## Remote Config notes

- For the assignment, Remote Config is **abstracted** behind RTK Query:
  - `remoteConfigApi.getHomeConfig` currently returns `mockHomeConfig`.
  - In a real deployment, you would replace this implementation to call **Firebase Remote Config**, converting the JSON string into the typed `HomeScreenConfig`.
- This keeps the UI and state management independent from the actual backend.

## Running the project

1. Install dependencies:

   ```bash
   yarn
   ```

2. iOS (tvOS):

   ```bash
   cd ios
   pod install
   cd ..
   yarn ios
   ```

3. Android TV:

   ```bash
   yarn android
   ```

> Note: Additional native setup is required for `react-native-video` and `@react-native-async-storage/async-storage` (standard React Native linking / autolinking and `pod install` in `ios/`).

## How this showcases TV-specific skills

- **TV focus layer**: Centralized, testable, and reusable focus management (`TVFocusProvider`, `useTVFocusGrid`, `TVFocusable`) instead of ad-hoc key handling inside screens.
- **Feature-first architecture**: Clear separation between `home`, `player`, `continueWatching`, and shared infra (`store`, `tv`, `shared`).
- **Typed Remote Config**: Strongly typed config schema and normalization layer, making dynamic ordering and layout changes safe.
- **Playback-aware UX**: TikTok-style player with per-video progress tracking, persistent Continue Watching, and remote-driven controls tailored for the 10-foot experience.

This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.

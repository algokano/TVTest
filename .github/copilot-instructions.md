# Copilot Instructions — TVTest (React Native TV)

## Project Overview

React Native TV app (tvOS + Android TV) using `react-native-tvos` (not stock `react-native`). TypeScript, Redux Toolkit, RTK Query, and a custom D-pad focus system. Feature-first architecture under `src/`.

## Path Aliases

Configured in both `tsconfig.json` and `babel.config.js` (via `babel-plugin-module-resolver`). Always use these in imports:

- `@app/*` → `src/app/*`
- `@store/*` → `src/store/*`
- `@features/*` → `src/features/*`
- `@tv/*` → `src/tv/*`
- `@shared/*` → `src/shared/*`

## Architecture & Data Flow

```
RTK Query (remoteConfigApi) → useHomeSections hook → dispatches to configSlice + catalogSlice
catalogSlice normalizes nested config into flat dictionaries (sections, banners, items by ID)
playbackSlice tracks per-video watch positions → drives Continue Watching (continueWatching/logic.ts)
Only playbackSlice is persisted via redux-persist + AsyncStorage
```

- **Store:** `src/store/index.ts` exports typed hooks `useAppDispatch` and `useAppSelector` — always use these, never raw `useDispatch`/`useSelector`.
- **Root reducer:** `src/store/rootReducer.ts` combines 4 slices (`config`, `catalog`, `playback`, `ui`) + RTK Query reducer.
- **Remote Config:** `src/store/services/remoteConfigApi.ts` uses `queryFn` returning mock data. To integrate real Firebase, replace the `queryFn` implementation only.

## TV Focus System (Critical)

The custom focus system in `src/tv/` is the core TV interaction layer. Understand this before modifying any UI:

1. **`TVFocusProvider`** (`src/tv/focus/TVFocusProvider.tsx`) — Context-based central key dispatcher using `useTVEventHandler`. Wraps the entire app above navigation.
2. **`useTVFocusGrid`** (`src/tv/focus/useTVFocusGrid.ts`) — Tracks `focusedIndex` for a horizontal list; registers Left/Right handlers via `setHandlers`. Returns `getFocusProps(index)` for each item.
3. **`TVFocusable`** (`src/tv/components/TVFocusable.tsx`) — Pressable wrapper that shows a focus ring when `isFocused` is true. Spread `focusProps` from the grid hook onto this component.
4. **Key ownership:** Only one handler set is active at a time. The most recently mounted row/screen "claims" D-pad input via `setHandlers`. This means focus management is imperative, not declarative.

**Pattern for adding a new focusable row:**

```tsx
const { focusedIndex, getFocusProps } = useHomeFocusGrid(items.length);
// In render:
{
  items.map((item, i) => (
    <TVFocusable
      key={item.id}
      {...getFocusProps(i)}
      onPress={() => handlePress(item)}
    >
      <ItemCard item={item} />
    </TVFocusable>
  ));
}
```

## Key Types

- **`TVKeyName`**: `'up' | 'down' | 'left' | 'right' | 'select' | 'back' | 'playPause'` — defined in `src/tv/focus/types.ts`
- **`HomeScreenConfig`**, **`SectionConfig`**, **`BannerConfig`**, **`ItemConfig`**: defined in `src/shared/types/config.ts` — the canonical remote config schema
- **`SectionType`**: `'continue_watching' | 'banner' | 'regular' | 'coming_soon'`
- **`RootStackParamList`**: `{ Home: undefined; Player: { initialVideoId?: string } }` — in `src/app/navigation/RootNavigator.tsx`

## Feature Conventions

- **Feature folders** (`src/features/<name>/`) contain `screens/`, `components/`, `hooks/`, and optionally `types.ts`.
- **Home feature** re-exports shared types from `@shared/types/config` via its own `types.ts` barrel.
- **Continue Watching** is a cross-feature concern: `src/features/continueWatching/logic.ts` exports a `createSelector`-based selector that cross-references catalog items with `playbackSlice.lastPositions` (threshold: ≥5 seconds watched).
- **Player** uses index-based video feed navigation over the `orderedVideos` array from `@shared/constants/videos`.

## Video Playback

- Uses `react-native-video` with HLS (`.m3u8`) streams.
- **`useRememberPosition`** — seeks to saved position on video load (resume behavior).
- **`useAutoplayFeed`** — dispatches `startPlayback` whenever the current video index changes.
- **`usePlayerControls`** — maps TV remote keys: Up/Down = prev/next video, Select/PlayPause = toggle, Back = navigate back.
- Position data is dispatched to `playbackSlice.updatePlaybackPosition` on every progress event.

## Theme & Styling

- Dark theme with pink/magenta accent — constants in `src/shared/theme/colors.ts` and `spacing.ts`.
- 10-foot UI sizing: banner cards 520×260, item cards 260px wide (16:9).
- No dynamic theming — all values are static objects.

## Build & Run

```bash
yarn                          # Install dependencies
cd ios && pod install && cd .. # iOS native deps
yarn start                    # Metro dev server
yarn ios                      # Build & run tvOS
yarn android                  # Build & run Android TV
yarn test                     # Jest tests (react-native preset)
yarn lint                     # ESLint
```

- `react-native-reanimated/plugin` must be **last** in the Babel plugins array.
- Node ≥20 required.

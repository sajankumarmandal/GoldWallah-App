# GoldWallah App

Expo React Native application for GoldWallah, written with JavaScript and `.jsx` source files.

This repository contains the cross-platform app frontend. Backend services should continue to come from the existing GoldWallah web/backend project; do not place backend secrets, database URLs, payment credentials, admin credentials, KYC storage keys, or private API tokens in this client repository.

## Requirements

- Node.js 20 or newer
- npm
- Expo Go for device testing, or native Android/iOS tooling for simulator runs

## Commands

```bash
npm install
npm run start
npm run android
npm run ios
npm run web
```

`npm run ios` requires macOS for the iOS simulator. On Windows, use Expo Go on an iPhone or EAS builds for iOS testing.

## Backend Configuration

The app uses the existing GoldWallah backend API. Set only public Expo variables in `.env`:

```bash
EXPO_PUBLIC_API_BASE_URL=http://localhost:5000/api/v1
EXPO_PUBLIC_APP_NAME=GoldWallah
```

For Expo web, the backend CORS and CSRF trusted origin must include the web dev origin. For native Android/iOS builds, keep the backend reachable from the device or simulator, for example by using your machine LAN address instead of `localhost`.

## Project Structure

- `index.js` registers the Expo root component.
- `App.jsx` mounts the app shell.
- `src/screens/HomeScreen.jsx` contains the responsive GoldWallah home page.
- `src/services/authService.js` maps app auth actions to the existing backend.
- `src/components/*.jsx` contains reusable UI components.
- `src/assets/` contains local app assets.

## Security Notes

- The app currently contains no bundled secrets.
- Access tokens are kept in memory by the app shell and are not written to localStorage or AsyncStorage.
- Sensitive seller, jeweller, KYC, bidding, commission, and payout flows are intentionally not mocked as production logic.
- Production API integration should use authenticated backend endpoints, RBAC, ownership checks, rate limits, audit logs, safe error handling, and private document access.
- Only public frontend configuration may use `EXPO_PUBLIC_*` environment variables.

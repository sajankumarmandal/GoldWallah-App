# GoldWallah App

Expo React Native application for GoldWallah, written with JavaScript and `.jsx` source files.

This repository contains the cross-platform app frontend. Backend services should continue to come from the existing GoldWallah web/backend project; do not place backend secrets, database URLs, payment credentials, admin credentials, KYC storage keys, or private API tokens in this client repository.

The project uses the ES6+ module system. App code should use `import` and `export`; do not add CommonJS `require()` or `module.exports` modules.

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

## Project Structure

- `index.js` registers the Expo root component.
- `App.jsx` mounts the app shell.
- `src/screens/HomeScreen.jsx` contains the responsive GoldWallah home page.
- `src/components/*.jsx` contains reusable UI components.
- `src/assets/` contains local app assets.

## Security Notes

- The app currently contains no bundled secrets.
- Sensitive seller, jeweller, KYC, bidding, commission, and payout flows are intentionally not mocked as production logic.
- Production API integration should use authenticated backend endpoints, RBAC, ownership checks, rate limits, audit logs, safe error handling, and private document access.
- Only public frontend configuration may use `EXPO_PUBLIC_*` environment variables.

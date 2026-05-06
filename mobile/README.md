# Mobile App (Frontend)

Figma reference:
- https://www.figma.com/design/dJN9LcXOoB7lLHTZznNO8g/Raritone_Final?node-id=1-702&m=dev

## Implemented React Native frontend
- `App.tsx` boots the mobile app and renders the React Navigation stack/tab navigator.
- `src/navigation/AppNavigator.tsx` uses React Navigation stack + bottom tabs to connect Splash → Onboarding → Auth → Home → Product → BodyScan → Processing → Avatar/Try-On/Profile.
- `src/components/*` contains reusable Button, Input, ProductCard, and Header components.
- `src/screens/*` contains all required screens from the screenshots rebuilt as React Native UI, not images.
- `src/styles/theme.ts` contains the strict black/white premium theme tokens.

## Run (Expo)
```bash
cd mobile
npm install
npm run start
```

## Check structure
```bash
npm run check
```

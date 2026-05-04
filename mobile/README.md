# Mobile App (Frontend)

Figma reference:
- https://www.figma.com/design/dJN9LcXOoB7lLHTZznNO8g/Raritone_Final?node-id=1-702&m=dev

## Added in this repo
- `design/figma-spec.md` — mapping of key product flows to screen structure.
- `src/theme/tokens.ts` — black/white premium design tokens.
- `src/config/routes.ts` — route identifiers matching primary app flows.
- `src/components/PlaceholderScreen.tsx` — route-aware screen scaffold.
- `src/screens/Auth/LoginOtpScreen.tsx` — first implemented auth screen.
- `src/screens/TryOn/TryOnStudioScreen.tsx` — first implemented try-on studio screen.
- `App.tsx` — route-driven shell implementing baseline navigation flow.

## Run (Expo)
```bash
cd mobile
npm install
npm run start
```

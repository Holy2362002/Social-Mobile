## Social Mobile (Expo/React Native)
Notice 
Go to the Social Api from social-api repository
social - api run first with nodemon filename 

**Companion app for the Social API**. This app handles auth, feed, posts, comments, and likes. It uses React Query and stores the JWT in AsyncStorage.

- **Backend repo**: `../social-api` (must be running first)
- **Auth**: Bearer JWT (`Authorization: Bearer <token>`)
- **Auto-login**: Verifies token at `GET /users/verify` (see `components/AppProvider.tsx`)

### Requirements
- Node 18+
- pnpm/npm/yarn
- Expo CLI (`npm i -g expo`)
- Android Studio (emulator) or Xcode (iOS)

### Environment
The app selects the API base URL by platform:
- iOS: `http://localhost:8800`
- Android emulator: `http://10.0.2.2:8800`
- Default/web: `http://localhost:8800`

If your API runs elsewhere, update `BASE_URL` in `components/AppProvider.tsx`.

### Quick Start
1) Start the API (see the API README):
```bash
cd ../social-api
npm install
npm run dev
```
2) Start the mobile app:
```bash
cd ../social-mobile
npm install
npx expo start
```
3) Press `a` for Android emulator, `i` for iOS simulator, or scan the QR code.

### Authentication
- On launch, the app reads `token` from AsyncStorage and calls `GET /users/verify`.
- If valid, user data is cached in context and React Query.
- To log out, remove the `token` from AsyncStorage and reset app state.

### Project Structure (mobile)
```
components/
  AppProvider.tsx     # Auth bootstrap + React Query provider
  card.tsx
  comments.tsx
app/
  (home)/index.tsx    # Home/feed
  post/[id].tsx       # Post details
  ...
type/global.ts        # Shared app types (UserType, etc.)
```

### Useful Scripts
```bash
npm run start    # Expo dev server
npm run android  # Start on Android
npm run ios      # Start on iOS
```

### Troubleshooting
- Android cannot reach `localhost`: use `http://10.0.2.2:8800`.
- iOS simulator can use `http://localhost:8800`.
- If requests fail on device, ensure your machine IP is reachable and use that IP as `BASE_URL`.

### Related
- API service: see `../social-api/README.md`

# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

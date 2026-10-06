# Shut Up!! — iOS app (React Native + Expo)

A tiny iOS app: tap the **Push** button and "Shut Up!!" pops up dancing
(it bounces, wiggles, and pulses on every tap).

## Test it on your iPhone

1. Install Node.js 18+ on your computer and the **Expo Go** app on your iPhone.
2. Clone this repo and install dependencies:

```sh
git clone https://github.com/atyagi09/musetest.git
cd musetest
npm install
```

3. Start the dev server:

```sh
npx expo start
```

4. Scan the QR code with your iPhone camera (or inside the Expo Go app).

## How it works

- `App.js` — the whole app: a `Push` button and an `Animated.Text` that
  springs in and then dances in a continuous loop.
- Built with React Native 0.86 + Expo SDK 57.

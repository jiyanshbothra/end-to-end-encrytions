# Only between us

A scroll-driven introduction to end-to-end encryption, built with Vite and vanilla JavaScript.

## Run locally

Install Node.js, then run:

```sh
npm.cmd install
npm.cmd run dev
```

Create a static production build with `npm.cmd run build`. Preview it with `npm.cmd run preview`.

## Deploy

The `dist/` directory contains the static site after a build. The included GitHub Actions workflow builds and publishes it on pushes to `main`. In the repository, open **Settings → Pages** and set **Build and deployment → Source** to **GitHub Actions**. The workflow also attempts to enable Pages automatically, which requires repository admin access.

## About

The lesson covers plain text, public/private keys, shared secrets, local encryption, ciphertext delivery, and local decryption. The phone tilt is implemented in CSS and JavaScript; no third-party tilt library is required.

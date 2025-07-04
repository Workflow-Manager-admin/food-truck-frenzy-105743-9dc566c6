# Lightweight React Template for KAVIA

This project provides a minimal React template with a clean, modern UI and minimal dependencies.

## Features

- **Lightweight**: No heavy UI frameworks - uses only vanilla CSS and React
- **Modern UI**: Clean, responsive design with KAVIA brand styling
- **Fast**: Minimal dependencies for quick loading times
- **Simple**: Easy to understand and modify

## Environment Variables for API Keys

This app requires two external APIs:
- **Pixabay** for image search (https://pixabay.com/api/docs/)
- **Firebase** for backend/auth (https://console.firebase.google.com/)

1. **Configure keys**
    - Copy `.env.template` to `.env`
    - Add your [Pixabay API key](https://pixabay.com/api/docs/).
    - Create a Project in Firebase & paste your config.

2. **Security Note**
    - Never commit your real `.env` with production credentials.
    - **Do not expose keys that grant admin or write access.** Frontend uses only client, browser-safe config!


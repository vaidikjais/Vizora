# Vizora - AI YouTube Thumbnail Generator

An AI-powered platform for creating YouTube thumbnails with optimized templates, custom controls, and intelligent prompt generation. Built with Next.js, React, and Google Gemini.

Live Demo: [https://vizora-iezz.vercel.app/](https://vizora-iezz.vercel.app/)

---

## Features

- AI Generation: Create thumbnails automatically using Google Gemini 2.5 Flash.
- Smart Prompt Optimization: Enhance standard user inputs to generate better, more consistent image results.
- Customization: Control category, style, text, focus, and color schemes.
- Quick Templates: Pre-defined aesthetic styles like Professional, Viral, Foodie, and Gamer.
- Multiple Variations: Generate several distinct thumbnail options per request.
- Configurable Aspect Ratios: Built-in layout support for 16:9, 1:1, 4:3, 9:16, and 21:9.
- Authentication: Secure user accounts and session management powered by Clerk.

---

## Tech Stack

- Frontend: Next.js 15, React 19, Tailwind CSS, Radix UI
- Backend: Next.js API Routes
- AI: Google Gemini 2.5 Flash
- Auth: Clerk

---

## Quick Start

### 1. Clone the repository and install dependencies

```bash
git clone <repo-url>
cd vizora
npm install
```

### 2. Set up environment variables

Create a `.env.local` file at the root of the project with the following essential variables:

```env
# AI API Key (required for generation)
GOOGLE_AI_API_KEY=your_gemini_api_key_here

# Clerk Authentication Keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Clerk Route Configuration
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/mode-select
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/mode-select
```

### 3. Run the development server

```bash
npm run dev
```

Open http://localhost:3000 in your browser to view the application. 

---

## How It Works

1. Upload a base image representing your video content.
2. Select your workflow: choose a quick aesthetic template or write a custom detailed prompt.
3. The platform processes your request and returns multiple AI-generated thumbnail variations.
4. Preview the results and download your favorites directly to your device.

---

## Project Structure

```text
src/
├── app/                    # Next.js Pages and API Routes
│   ├── api/                # API endpoints for generation
│   ├── upload/             # Initial image upload interface
│   ├── mode-select/        # Workflow selection (Templates vs Custom)
│   ├── templates/          # Quick predefined aesthetic styles
│   ├── custom/             # Advanced custom prompt builder
│   ├── output/             # Results gallery and download page
│   └── sign-in/            # Authentication routes
├── components/             # Reusable UI components
└── lib/                    # Shared utilities
```

---

## Deployment

Vizora is optimized for seamless deployment on platforms like Vercel. Connect your repository, add the required environment variables in the project settings, and deploy.

---

## License

MIT License. Created by Vaidik Jaiswal.

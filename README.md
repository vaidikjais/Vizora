
**Vizora – AI YouTube Thumbnail Generator**

An AI-powered platform for creating stunning YouTube thumbnails with templates, customization, and smart prompt optimization.
Built with Next.js, React, Google Gemini, and OpenAI.
Made by Vaidik Jaiswal ✨

🌐 **Live Demo**: [https://vizora-bice.vercel.app/](https://vizora-bice.vercel.app/) ✨

---

## 🚀 Features

- **🎯 AI Generation** – Smart thumbnails using Google Gemini 2.5 Flash
- **🧠 Smart Prompt Optimization** – OpenAI GPT-4 for query rewriting and enhancement
- **🎨 Customization** – Categories, styles, text, focus, and color schemes
- **⚡ Quick Templates** – Viral, Professional, Foodie, Gamer & more
- **🔄 Multiple Variations** – Get 4+ AI-generated thumbnails per request
- **📊 Quality Scoring** – Each thumbnail is auto-scored for optimization
- **🔒 Simple Authentication** – Username/password login system
- **📐 Multiple Aspect Ratios** – 16:9, 1:1, 4:3, 9:16, 21:9 support

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS, Radix UI
- **Backend**: Next.js API Routes
- **AI**: Google Gemini 2.5 Flash (image generation), OpenAI GPT-4 (prompt optimization)
- **Auth**: Custom simple authentication system
- **Storage**: Local file system for generated images

---

## ⚡ Quick Start

### 1. Clone repo & install dependencies

```bash
git clone <repo-url>
cd vizora && npm install
```

### 2. Set up environment variables

Create a `.env.local` file with:

```env
GOOGLE_AI_API_KEY=your_gemini_api_key_here
OPENAI_API_KEY=your_openai_api_key_here
DEMO_USERNAME=chaicode
DEMO_PASSWORD=ilovetea
```

### 3. Run development server

```bash
npm run dev
```

### 4. Open http://localhost:3000

**Demo Credentials**: `chaicode` / `ilovetea`

---

## 🎨 How It Works

1. **Upload** a base image
2. **Customize** with templates or custom options (category, style, colors, aspect ratio)
3. **Generate** thumbnails (AI creates multiple variations)
4. **Preview** → **Download** → **Create More**

---

## 📂 Project Structure

```
src/
├── app/                    # Pages & APIs
│   ├── api/               # generate, rewrite, iterate
│   ├── upload/            # Image upload page
│   ├── filters/           # Customization page
│   ├── output/            # Results page
│   └── sign-in/           # Authentication
├── components/            # UI components
└── lib/                   # Utilities & auth
```

---

## 🔧 Key Features

### AI-Powered Generation

- Uses Google Gemini 2.5 Flash for image generation
- OpenAI GPT-4 for intelligent prompt rewriting and optimization
- Smart prompt enhancement with industry-specific elements
- Multiple AI-generated variations per request
- Fallback to CSS-enhanced versions if AI fails

### Customization Options

- **Templates**: Pop, Professional, Viral, Foodie, Gamer
- **Categories**: Entertainment, Food, Gaming, Tech, etc.
- **Styles**: Bold Text, Minimalist, Cinematic, Cartoonish, etc.
- **Aspect Ratios**: 16:9, 1:1, 4:3, 9:16, 21:9
- **Color Schemes**: Bright, Dark, Pastel, Brand colors

### User Experience

- Drag-and-drop image upload
- Real-time generation progress
- Multiple thumbnail variations
- Direct download functionality
- Responsive design

---

## 🚀 Deployment

- **Vercel** – Connect repo & set env variables
- **Netlify** – Works with proper build settings
- **Railway** – Node.js deployment supported
- **Custom hosting** – Any Node.js environment

---

## 🔮 Roadmap

- [ ] User dashboard & thumbnail library
- [ ] Batch processing (multiple thumbnails at once)
- [ ] Brand kits & advanced templates
- [ ] Analytics dashboard
- [ ] Social media platform support

---

## 📄 License

MIT © 2025 – Made with ❤️ by Vaidik Jaiswal

# Vizora - AI YouTube Thumbnail Generator

A comprehensive AI-powered platform for creating stunning YouTube thumbnails with advanced customization options, preset templates, and intelligent prompt optimization. Built with Next.js, React, and powered by Google Gemini and OpenAI.

## 🚀 Features

### 🎯 **Smart Thumbnail Generation**

- **AI-Powered**: Uses Gemini and OpenAI for intelligent thumbnail creation
- **Prompt Optimization**: Advanced Corrective RAG system for optimal results
- **Multi-Model Support**: Generates variations using different AI models
- **Quality Scoring**: Automatic optimization scoring for each thumbnail

### 🎨 **Comprehensive Customization**

- **11 Content Categories**: Entertainment, Food, Gaming, Tech, Education, Travel, Music, Fitness, Product Review, News, Motivation
- **6 Thumbnail Styles**: Bold Text + Face, Minimalist, Cinematic, Cartoonish, Corporate, Clickbait
- **4 Text Options**: Auto-generate catchy text, No text, Highlighted Keywords, Emoji-style
- **4 Focus Options**: Face-focused, Object-focused, Split Screen, Collage
- **4 Color Schemes**: Bright + Vibrant, Dark + Contrast, Pastel, Brand Colors

### ⚡ **Quick Templates**

- **"Make my video POP"** - High energy, vibrant colors, bold text
- **"Professional & Clean"** - Minimalist design, corporate feel
- **"Viral/Clickbait"** - Shocking elements, high contrast
- **"Foodie Special"** - Mouth-watering, appetizing design
- **"Gamer Mode"** - Epic gaming aesthetic, bold graphics

### 🔄 **Intelligent Workflow**

- **Step-by-Step Process**: Guided workflow with progress tracking
- **Template or Custom**: Choose quick templates or detailed customization
- **Real-time Preview**: See your selections and image preview
- **Multiple Variations**: Generate 3+ variations per request

## 🛠️ Technical Architecture

### **Frontend**

- **Next.js 15** with App Router and Turbopack
- **React 19** with modern hooks
- **Tailwind CSS** for styling
- **Radix UI** components for accessibility
- **Clerk** for username/password authentication

### **Backend APIs**

- **`/api/rewrite`** - Advanced prompt optimization with Corrective RAG
- **`/api/generate`** - Multi-model thumbnail generation
- **`/api/iterate`** - Thumbnail refinement and variations

### **AI Integration**

- **Google Gemini** - Primary image generation
- **OpenAI GPT-4** - Prompt optimization and enhancement
- **Corrective RAG** - Quality analysis and improvement

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── generate/route.js      # Main thumbnail generation
│   │   ├── rewrite/route.js       # Prompt optimization
│   │   └── iterate/route.js       # Thumbnail refinement
│   ├── dashboard/page.js          # Main dashboard
│   ├── sign-in/[[...sign-in]]/    # Authentication pages
│   ├── sign-up/[[...sign-up]]/    # Registration pages
│   ├── about/page.js              # About page
│   ├── contact/page.js            # Contact page
│   ├── cases/page.js              # Success stories
│   ├── what-we-do/page.js         # Services overview
│   └── layout.js                  # Root layout
├── components/
│   ├── ui/                        # Reusable UI components
│   ├── navigation.jsx             # Navigation bar
│   ├── gallery/                   # Image gallery components
│   ├── stepper/                   # Progress stepper
│   └── upload/                    # File upload components
└── lib/
    ├── ai/                        # AI integration utilities
    ├── auth/                      # Authentication utilities
    ├── file-handling/             # File processing utilities
    ├── clerk-config.js            # Clerk configuration
    └── utils.js                   # Utility functions
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Google AI API key (Gemini)
- OpenAI API key
- Clerk account for authentication

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd vizora
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.local.example .env.local
   ```

   Add your API keys and configuration:

   ```env
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key

   # Clerk Configuration - Username/Password only
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
   NEXT_PUBLIC_CLERK_IDENTIFIER=username

   # AI APIs
   GOOGLE_AI_API_KEY=your_google_ai_key
   OPENAI_API_KEY=your_openai_key

   # Demo credentials (optional)
   DEMO_USERNAME=your_demo_username
   DEMO_PASSWORD=your_demo_password

   # File upload settings
   MAX_FILE_SIZE=10485760
   UPLOAD_DIR=temp/uploads
   GENERATED_DIR=temp/generated
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Configure Clerk Dashboard**

   - Go to your Clerk Dashboard
   - Navigate to "User & Authentication" → "Email, Phone, Username"
   - Enable "Username" as a required field
   - Go to "Social Connections" and disable all social providers
   - Save your changes

6. **Access the application**
   - Open [http://localhost:3000](http://localhost:3000)
   - Sign up with a new account or use demo credentials (if configured)

## 🎯 Usage Guide

### **Quick Start with Templates**

1. Upload your base image
2. Choose a quick template (e.g., "Make my video POP")
3. Click "Generate Now"
4. Get 3 optimized thumbnails instantly

### **Custom Workflow**

1. Upload your base image
2. Click "Custom Options"
3. Select your preferences:
   - **Category**: Choose your content type
   - **Style**: Pick the visual style
   - **Text**: Decide on text handling
   - **Focus**: Choose subject emphasis
   - **Colors**: Select color scheme
4. Add custom prompt (optional)
5. Generate thumbnails

### **Advanced Features**

- **Quality Scoring**: Each thumbnail gets an optimization score
- **Variations**: Multiple styles generated automatically
- **Download**: Save thumbnails in high resolution
- **Iterate**: Refine existing thumbnails

## 🔧 API Documentation

### **Generate Thumbnails**

```javascript
POST /api/generate
{
  "image": "base64_image_data",
  "category": "gaming",
  "style": "bold-text-face",
  "textOption": "auto-generate",
  "focus": "face-focused",
  "colorScheme": "bright-vibrant",
  "customPrompt": "optional_custom_prompt",
  "selectedTemplate": "gamer"
}
```

### **Optimize Prompts**

```javascript
POST /api/rewrite
{
  "prompt": "original_prompt",
  "industry": "gaming",
  "targetAudience": "general",
  "stylePreferences": "modern and engaging",
  "iterations": 2
}
```

## 🎨 Design System

### **Color Palette**

- **Primary**: `oklch(0.75 0.25 25)` - Vibrant orange-red
- **Background**: `oklch(0.08 0.02 30)` - Dark charcoal
- **Text**: `oklch(0.985 0 0)` - Pure white
- **Muted**: `oklch(0.708 0 0)` - Light gray

### **Typography**

- **Font**: Geist Sans (Google Fonts)
- **Headings**: Bold, large scale
- **Body**: Regular weight, readable

### **Components**

- **Cards**: Glassmorphism with backdrop blur
- **Buttons**: Primary and outline variants
- **Progress**: Animated progress bars
- **Badges**: Status and category indicators

## 🔒 Security & Privacy

- **Authentication**: Clerk-based username/password authentication
- **Protected Routes**: Middleware protection for dashboard and APIs
- **File Handling**: Secure image upload and processing
- **API Protection**: Rate limiting and validation
- **Data Privacy**: Automatic file cleanup
- **Environment Variables**: Secure credential management

## 🚀 Deployment

### **Vercel (Recommended)**

1. Connect your GitHub repository
2. Add environment variables
3. Deploy automatically

### **Other Platforms**

- **Netlify**: Compatible with Next.js
- **Railway**: Easy deployment with environment management
- **AWS**: Use Amplify or custom setup

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check this README and inline comments
- **Issues**: Report bugs via GitHub Issues
- **Authentication Setup**: See `CLERK_CONFIGURATION.md` for detailed setup
- **Demo**: Use demo credentials for testing (if configured)
- **Contact**: Reach out via the contact page

## 🔧 Troubleshooting

### Authentication Issues

- Ensure Clerk Dashboard is configured for username authentication
- Check that social providers are disabled in Clerk Dashboard
- Verify environment variables are correctly set
- Restart the development server after configuration changes

### API Issues

- Verify Google AI and OpenAI API keys are valid
- Check API rate limits and quotas
- Ensure file upload directories exist and are writable

### Development Issues

- Clear `.next` cache: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check Node.js version compatibility

## 🔮 Roadmap

- [ ] **Real-time Collaboration**: Team thumbnail creation
- [ ] **Analytics Dashboard**: Performance tracking
- [ ] **Brand Kit Integration**: Custom color schemes
- [ ] **Batch Processing**: Multiple thumbnails at once
- [ ] **Mobile App**: Native iOS/Android apps
- [ ] **API Marketplace**: Third-party integrations
- [ ] **Advanced Templates**: More preset designs
- [ ] **Video Thumbnail Preview**: Real-time preview generation
- [ ] **Export Options**: Multiple format support
- [ ] **User Dashboard**: Personal thumbnail library

---

**Built with ❤️ using Next.js, React, and AI**

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

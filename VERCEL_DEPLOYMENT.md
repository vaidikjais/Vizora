# Vercel Deployment Guide

## Environment Variables Setup

To make the image generation work on the deployed version, you need to set up these environment variables in your Vercel project:

### 1. Go to Vercel Dashboard
- Visit [vercel.com](https://vercel.com)
- Select your Vizora project

### 2. Navigate to Settings
- Click on your project
- Go to "Settings" tab
- Click on "Environment Variables"

### 3. Add These Environment Variables

#### Required for AI Features:
```env
GOOGLE_AI_API_KEY=your_gemini_api_key_here
OPENAI_API_KEY=your_openai_api_key_here
```

#### Required for Authentication:
```env
DEMO_USERNAME=chaicode
DEMO_PASSWORD=ilovetea
```

### 4. Get Your API Keys

#### Google Gemini API Key:
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy the key and paste it as `GOOGLE_AI_API_KEY`

#### OpenAI API Key:
1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create a new API key
3. Copy the key and paste it as `OPENAI_API_KEY`

### 5. Redeploy
After adding the environment variables:
- Go to "Deployments" tab
- Click "Redeploy" on your latest deployment

### 6. Test
- Visit your live site
- Try uploading an image and generating thumbnails
- Check the browser console for any error messages

## Troubleshooting

If image generation still doesn't work:

1. **Check Environment Variables**: Make sure all variables are set correctly
2. **Check API Keys**: Verify your API keys are valid and have sufficient credits
3. **Check Console**: Open browser dev tools and look for error messages
4. **Check Vercel Logs**: Go to your deployment and check the function logs

## Demo Credentials
- **Username**: `chaicode`
- **Password**: `ilovetea`

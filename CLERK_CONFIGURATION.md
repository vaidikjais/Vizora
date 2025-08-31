# Clerk Configuration Guide

## Environment Variables Setup

Update your `.env.local` file with the following configuration:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key_here
CLERK_SECRET_KEY=your_secret_key_here

# Clerk Configuration - Disable social providers, enable username/password
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# Demo credentials (keep these secure)
DEMO_USERNAME=your_demo_username
DEMO_PASSWORD=your_demo_password

# Other existing variables...
OPENAI_API_KEY=your_openai_api_key_here
GOOGLE_AI_API_KEY=your_google_ai_api_key_here
ALLOWED_EMAILS=your_email@example.com
MAX_FILE_SIZE=10485760
UPLOAD_DIR=temp/uploads
GENERATED_DIR=temp/generated
```

## Clerk Dashboard Configuration

To completely disable Google login and enable only username/password:

1. Go to your Clerk Dashboard
2. Navigate to "User & Authentication" → "Email, Phone, Username"
3. Enable "Username" as a required field
4. Go to "Social Connections"
5. Disable all social providers (Google, GitHub, etc.)
6. Save your changes

## What's Been Updated

1. **Removed social buttons styling** from the ClerkProvider
2. **Created clerk-config.js** to disable social providers
3. **Updated sign-in and sign-up pages** to use username/password only
4. **Removed demo credentials** from the UI (now stored in .env)
5. **Added proper redirect URLs** for better user experience

## Testing

After making these changes:

1. Restart your development server
2. Visit `/sign-in` - you should only see username/password fields
3. Visit `/sign-up` - you should only see username/email/password fields
4. No Google or other social login buttons should appear

## Security Notes

- Keep your demo credentials in the `.env.local` file only
- Never commit `.env.local` to version control
- Use strong passwords for demo accounts
- Consider implementing rate limiting for login attempts

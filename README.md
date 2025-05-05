# TikTok Authentication Callback Page

This directory contains the TikTok authentication callback page and API endpoints for handling the TikTok OAuth flow, including QR code authentication.

## Setup Instructions

### 1. Deploy the Callback Page

You have several options to deploy this callback page:

#### Option 1: GitHub Pages (Recommended for simplicity)

1. Create a new GitHub repository or use an existing one
2. Push the contents of this directory to the repository
3. Enable GitHub Pages in the repository settings
4. Set the source to the branch and directory containing these files
5. Your callback page will be available at `https://yourusername.github.io/repository-name`

#### Option 2: Vercel or Netlify (Recommended for API functionality)

1. Create an account on [Vercel](https://vercel.com) or [Netlify](https://netlify.com)
2. Connect your GitHub repository to Vercel/Netlify
3. Deploy the repository
4. Your callback page will be available at the domain provided by Vercel/Netlify

### 2. Update TikTok Developer Settings

1. Go to the [TikTok Developer Portal](https://developers.tiktok.com/)
2. Navigate to your app settings
3. Update the "Redirect URI" to match the URL of your deployed callback page
4. Make sure the redirect URI exactly matches what's in your app configuration

### 3. Update App Configuration

Update the `AppConfig` class in your Flutter app:

```dart
// lib/config/app_config.dart
static const String tiktokRedirectUri = 'https://yourusername.github.io/repository-name';
```

## How It Works

### Regular OAuth Flow

1. User clicks "Login with TikTok" in your app
2. App opens the TikTok authorization URL in a browser
3. User logs in to TikTok and grants permissions
4. TikTok redirects back to your callback page with an authorization code
5. The callback page displays the code and provides options to copy it or send it back to the app

### QR Code Flow

1. App requests a QR code from TikTok API
2. App displays the QR code to the user
3. User scans the QR code with their TikTok app
4. User grants permissions in the TikTok app
5. App periodically checks the QR code status
6. When the status is "confirmed", the app receives an authorization code
7. App exchanges the authorization code for an access token

## Troubleshooting

### QR Code Not Working

1. Make sure your TikTok app is up to date
2. Verify that your app has the correct permissions configured in the TikTok Developer Portal
3. Check that the redirect URI exactly matches what's in your app configuration
4. Try using the regular OAuth flow as a fallback

### Authorization Code Not Received

1. Check the browser console for errors
2. Verify that your callback page is correctly deployed and accessible
3. Make sure the redirect URI in your TikTok Developer Portal matches the URL of your callback page
4. Check that your app has the correct permissions configured

## API Endpoints

If you deploy to Vercel or Netlify, you can use the included API endpoints:

- `/api/tiktok/check-qr-status` - Check the status of a QR code
- `/api/tiktok/redirect` - Handle the redirect from TikTok OAuth flow

These endpoints require server-side processing and won't work with GitHub Pages alone.
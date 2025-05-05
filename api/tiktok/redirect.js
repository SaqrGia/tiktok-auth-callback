// This is a serverless function that can be deployed to Vercel, Netlify, or similar platforms
// It handles the redirect from TikTok OAuth flow

export default async function handler(req, res) {
  // Get the code and state from the query parameters
  const { code, state, error, error_description } = req.query;
  
  // If there's an error, redirect to the error page
  if (error) {
    return res.redirect(`/?error=${encodeURIComponent(error)}&error_description=${encodeURIComponent(error_description || '')}`);
  }
  
  // If there's no code, redirect to the error page
  if (!code) {
    return res.redirect(`/?error=no_code&error_description=${encodeURIComponent('No authorization code received from TikTok')}`);
  }
  
  // Redirect to the main page with the code and state
  return res.redirect(`/?code=${encodeURIComponent(code)}&state=${encodeURIComponent(state || '')}`);
}
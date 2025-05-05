// This is a serverless function that can be deployed to Vercel, Netlify, or similar platforms
// It acts as a proxy to check the TikTok QR code status

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { token } = req.body;
    
    if (!token) {
      return res.status(400).json({ error: 'Token is required' });
    }

    // TikTok API credentials - in production, these should be environment variables
    const clientKey = process.env.TIKTOK_CLIENT_KEY || 'sbawd7xakgmyt8g669';
    const clientSecret = process.env.TIKTOK_CLIENT_SECRET || 'MypxLqu31goKj7W7YSvnjVaYNDd6wxxI';
    
    // Call TikTok API to check QR code status
    const response = await fetch('https://open.tiktokapis.com/v2/oauth/check_qrcode/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
      },
      body: new URLSearchParams({
        'client_key': clientKey,
        'client_secret': clientSecret,
        'token': token,
      }).toString()
    });

    const data = await response.json();
    
    // Process the response based on TikTok's API structure
    let result = {
      status: 'unknown',
      code: null,
    };

    if (data) {
      // Case 1: Simple structure with status
      if (data.status) {
        result.status = data.status;
        
        // If scan is confirmed and code is received
        if (data.status === 'confirmed' && data.code) {
          result.code = data.code;
        }
        
        // Save state for later use if available
        if (data.state) {
          result.state = data.state;
        }
        
        // Save client_ticket for later use if available
        if (data.client_ticket) {
          result.client_ticket = data.client_ticket;
        }
      }
      // Case 2: Structure with data and error
      else if (data.error && data.data) {
        // If there's an error, check the error code
        const error = data.error;
        if (error && error.code !== 'ok') {
          return res.status(400).json({ 
            error: `Error checking QR status: ${error.message || "Unknown error"}` 
          });
        }
        
        // If data exists, extract it
        const responseData = data.data;
        if (responseData) {
          result.status = responseData.status || 'unknown';
          if (responseData.code) {
            result.code = responseData.code;
          }
          
          // Keep any additional information
          if (responseData.state) {
            result.state = responseData.state;
          }
          if (responseData.client_ticket) {
            result.client_ticket = responseData.client_ticket;
          }
        }
      }
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error('Error checking QR code status:', error);
    return res.status(500).json({ error: 'Failed to check QR code status' });
  }
}
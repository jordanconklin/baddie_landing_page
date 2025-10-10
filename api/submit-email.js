const { createClient } = require('@supabase/supabase-js');

// Rate limiting - track requests by IP
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS = 5;

function checkRateLimit(ip) {
  const now = Date.now();
  const userRequests = rateLimitMap.get(ip) || [];
  
  // Remove old requests outside the window
  const recentRequests = userRequests.filter(time => now - time < RATE_LIMIT_WINDOW);
  
  if (recentRequests.length >= MAX_REQUESTS) {
    return false;
  }
  
  recentRequests.push(now);
  rateLimitMap.set(ip, recentRequests);
  return true;
}

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle OPTIONS request for CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    // Get IP for rate limiting
    const ip = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'unknown';
    
    // Check rate limit
    if (!checkRateLimit(ip)) {
      return res.status(429).json({ 
        error: 'Too many requests. Please try again later.' 
      });
    }
    
    const { email } = req.body;
    
    // Validate email
    if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }
    
    // Initialize Supabase client
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );
    
    // Save to Supabase
    const { data, error } = await supabase
      .from('email_signups')
      .insert([{ 
        email: email.toLowerCase().trim(),
        created_at: new Date().toISOString()
      }])
      .select();
    
    if (error) {
      console.error('Supabase error:', error);
      
      // Handle duplicate email
      if (error.code === '23505') {
        return res.status(400).json({ 
          error: 'This email is already registered!' 
        });
      }
      
      throw error;
    }
    
    console.log('✅ Email saved to Supabase:', email);
    
    return res.status(200).json({ 
      success: true, 
      message: 'Email successfully added to waitlist!' 
    });
    
  } catch (error) {
    console.error('Error submitting email:', error);
    return res.status(500).json({ 
      error: 'Failed to submit email. Please try again.' 
    });
  }
};


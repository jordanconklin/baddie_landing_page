const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const rateLimit = require('express-rate-limit');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Enable CORS for cross-origin requests
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Rate limiter for email endpoint - 5 submissions per hour per IP
const emailLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  message: { error: 'Too many submissions. Please try again later.' }
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// API endpoint to serve privacy policy
app.get('/api/privacy-policy', (req, res) => {
  try {
    const privacyPolicyPath = path.join(__dirname, 'public', 'privacy-policy.json');
    const privacyPolicy = JSON.parse(fs.readFileSync(privacyPolicyPath, 'utf8'));
    res.json(privacyPolicy);
  } catch (error) {
    console.error('Error reading privacy policy:', error);
    res.status(500).json({ error: 'Failed to load privacy policy' });
  }
});

// Email signup endpoint with rate limiting
app.post('/api/submit-email', emailLimiter, async (req, res) => {
  try {
    const { email } = req.body;

    // Validate email
    if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

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
      throw error;
    }

    console.log('✅ Email saved to Supabase:', email);

    res.json({ 
      success: true, 
      message: 'Email successfully added to waitlist!' 
    });

  } catch (error) {
    console.error('Error submitting email:', error);
    res.status(500).json({ 
      error: 'Failed to submit email. Please try again.' 
    });
  }
});

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 
-- Make email unique if you haven't already
-- Run this in Supabase SQL Editor

ALTER TABLE email_signups 
ADD CONSTRAINT email_signups_email_unique UNIQUE (email);


# Deploy to Vercel - Step by Step Guide

## ✅ What I've Set Up For You

1. **Created Vercel API Route**: `/api/submit-email.js`
   - Handles email submissions
   - Includes rate limiting (5 emails per hour per IP)
   - Connects to Supabase

2. **Created `vercel.json`**: Configuration for Vercel deployment

3. **Updated Frontend**: Changed API calls to use `/api/submit-email` (works both locally and on Vercel)

4. **Created `.vercelignore`**: Excludes old Express server

---

## 🚀 Deployment Steps

### 1. Install Vercel CLI (optional, but recommended)
```bash
npm install -g vercel
```

### 2. Deploy to Vercel

**Option A: Using Vercel CLI (Recommended)**
```bash
# Login to Vercel
vercel login

# Deploy
vercel --prod
```

**Option B: Using Vercel Dashboard**
1. Go to [vercel.com](https://vercel.com)
2. Click "Add New" → "Project"
3. Import your Git repository
4. Vercel will auto-detect React and configure it

---

## 🔐 IMPORTANT: Add Environment Variables

After deploying, you **MUST** add your Supabase credentials to Vercel:

### In Vercel Dashboard:
1. Go to your project
2. Click **Settings** → **Environment Variables**
3. Add these two variables:

| Name | Value |
|------|-------|
| `SUPABASE_URL` | `https://xzgsxbywtixrjtmsghrn.supabase.co` |
| `SUPABASE_SERVICE_ROLE_KEY` | `your-service-role-key-from-.env` |

4. Click **Save**
5. **Redeploy** your project for changes to take effect

---

## 🧪 Testing Locally with Vercel Dev

To test the Vercel setup locally:

```bash
# Install Vercel CLI first (if not already)
npm install -g vercel

# Run Vercel dev server
vercel dev
```

This will run your app exactly as it will on Vercel.

---

## 📝 Local Development (Current Setup)

For now, continue using:
```bash
npm run dev
```

This still works and runs both the React app and the old Express server locally.

---

## 🎉 After Deployment

1. Your site will be live at `https://your-project.vercel.app`
2. The API will be at `https://your-project.vercel.app/api/submit-email`
3. Emails will save to your Supabase database
4. Rate limiting will prevent abuse

---

## 🔧 Troubleshooting

**API not working after deploy?**
- Make sure you added the environment variables in Vercel dashboard
- Check Vercel Functions logs: Dashboard → Functions → Logs

**Getting 500 errors?**
- Verify your Supabase URL is correct (no typos!)
- Make sure the `email_signups` table exists in Supabase
- Check you're using the SERVICE_ROLE_KEY, not the anon key

---

## 🗑️ Old Files You Can Delete (After Vercel Deploy Works)

Once everything works on Vercel, you can safely delete:
- `server.js` (replaced by `/api/submit-email.js`)
- Update `package.json` to remove:
  - `"server": "node server.js"` script
  - `"dev"` script (or change to just `"start"`)
  - `express`, `cors`, `express-rate-limit` dependencies (if you want)

But **don't delete these yet** - keep them until you confirm Vercel works!


# Security Setup Instructions 🔒

## Overview
Your contact form now includes three layers of security protection:

1. ✅ **Google reCAPTCHA v3** - Invisible bot protection
2. ✅ **Rate Limiting** - Max 5 submissions per hour per IP address
3. ✅ **Input Sanitization** - Prevents XSS and injection attacks

---

## Required Setup Steps

### Step 1: Get Google reCAPTCHA Keys

1. Go to [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
2. Click **"+"** to create a new site
3. Fill in the form:
   - **Label**: Portfolio Contact Form (or any name you prefer)
   - **reCAPTCHA type**: Select **"reCAPTCHA v3"**
   - **Domains**: Add your domains:
     - `localhost` (for local testing)
     - `your-site-name.vercel.app` (your production domain)
     - Add any custom domains you have
   - **Accept the reCAPTCHA Terms of Service**
4. Click **Submit**
5. You'll see two keys:
   - **Site Key** (starts with 6L...)
   - **Secret Key** (starts with 6L...)
   
   **Keep these keys safe!**

### Step 2: Update Local Environment Variables

Open or create `.env.local` in your project root and add:

```env
# Email Configuration
EMAIL_USER=evanmsanchez15@gmail.com
EMAIL_PASSWORD=your-gmail-app-password-here

# reCAPTCHA Configuration
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your-site-key-here
RECAPTCHA_SECRET_KEY=your-secret-key-here
```

**Important Notes:**
- `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` - Must start with `NEXT_PUBLIC_` (this is used in the browser)
- `RECAPTCHA_SECRET_KEY` - Server-side only (never exposed to browser)
- Replace `your-site-key-here` with your actual Site Key from Step 1
- Replace `your-secret-key-here` with your actual Secret Key from Step 1

### Step 3: Update Vercel Environment Variables

For production deployment, add these environment variables in Vercel:

1. Go to [Vercel Dashboard](https://vercel.com)
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add the following variables:

| Key | Value | Environments |
|-----|-------|-------------|
| `EMAIL_USER` | `evanmsanchez15@gmail.com` | ✓ All |
| `EMAIL_PASSWORD` | Your Gmail App Password | ✓ All |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | Your reCAPTCHA Site Key | ✓ All |
| `RECAPTCHA_SECRET_KEY` | Your reCAPTCHA Secret Key | ✓ All |

5. Click **Save** for each variable
6. **Redeploy** your site for changes to take effect

---

## Security Features Explained

### 1. Google reCAPTCHA v3 (Invisible)
- **What it does**: Analyzes user behavior to determine if they're human or bot
- **Score-based**: Assigns a score from 0.0 (bot) to 1.0 (human)
- **Threshold**: Set to 0.5 (blocks suspicious traffic)
- **User Experience**: Completely invisible - no clicking required
- **Fallback**: If reCAPTCHA is not configured, form still works (for testing)

### 2. Rate Limiting
- **What it does**: Limits form submissions per IP address
- **Limit**: Maximum 5 submissions per hour per IP
- **Response**: Returns 429 error with message "Too many requests"
- **Storage**: In-memory (resets on server restart)
- **Production Note**: For high-traffic sites, consider Redis or database storage

### 3. Input Sanitization
- **What it does**: Cleans and validates user input
- **Name**: Max 100 characters, min 2 characters
- **Email**: Validates format using validator library
- **Message**: Max 5000 characters, min 10 characters
- **XSS Prevention**: Encodes HTML special characters (< > " ' /)
- **Email Info**: Includes IP address and rate limit info for tracking

---

## Testing Locally

After setting up environment variables:

1. Restart your dev server:
   ```bash
   npm run dev
   ```

2. Navigate to: `http://localhost:3000/contact`

3. Fill out the form and submit

4. Check your email at `evanmsanchez15@gmail.com`

5. **Test Rate Limiting**: Try submitting 6+ times within an hour to see the rate limit error

---

## Monitoring & Maintenance

### Check for Bot Activity
- Emails include IP address and remaining rate limit attempts
- Monitor for patterns of suspicious submissions

### Adjust reCAPTCHA Score Threshold
If you're getting too many false positives (real users blocked):
- Edit `src/app/api/contact/route.ts`
- Find: `data.score >= 0.5`
- Lower to `0.3` for more lenient filtering

If you're getting spam:
- Raise to `0.7` for stricter filtering

### View reCAPTCHA Analytics
- Go to [reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
- Click on your site
- View statistics and analytics

---

## Troubleshooting

### "reCAPTCHA verification failed"
- Check that both keys are correctly added to environment variables
- Verify your domain is added in reCAPTCHA admin console
- Make sure you're using v3 keys (not v2)

### "Too many requests"
- This is working as intended
- Wait 1 hour and try again
- Or restart your dev server (resets in-memory rate limiting)

### Emails not sending
- Verify `EMAIL_USER` and `EMAIL_PASSWORD` are set
- Check Gmail App Password is correct
- Review server logs for errors

---

## Production Deployment Checklist

- ✅ Add all 4 environment variables to Vercel
- ✅ Add production domain to reCAPTCHA admin console
- ✅ Redeploy site after adding environment variables
- ✅ Test form on production site
- ✅ Verify email delivery
- ✅ Test rate limiting
- ✅ Monitor for spam in first few days

---

## Security Best Practices

- ✅ Never commit `.env.local` to git (already in `.gitignore`)
- ✅ Never share your Secret Key publicly
- ✅ Rotate Gmail App Password periodically
- ✅ Monitor reCAPTCHA analytics regularly
- ✅ Keep dependencies updated: `npm audit` and `npm update`
- ✅ Review email logs for suspicious patterns

---

## Need Help?

If you encounter issues:
1. Check browser console for errors (F12)
2. Check server logs in Vercel dashboard
3. Verify all environment variables are set correctly
4. Test locally first before debugging production

Your contact form is now protected against:
- ❌ Automated bots
- ❌ Spam floods
- ❌ XSS attacks
- ❌ Email injection
- ❌ Script injection


# Email Setup Instructions

## Overview
Your contact form is now set up to send emails to `evanmsanchez15@gmail.com` when users submit the form.

## Required Setup Steps

### 1. Create Gmail App Password

Since Gmail requires secure authentication, you need to create an **App Password**:

1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Enable **2-Factor Authentication** (if not already enabled)
   - Go to Security > 2-Step Verification
3. Generate an App Password:
   - Go to Security > 2-Step Verification > App passwords
   - Select app: **Mail**
   - Select device: **Other** (name it "Portfolio Website")
   - Click **Generate**
4. Copy the 16-character password (remove spaces)

### 2. Create Environment Variables File

Create a file named `.env.local` in the root of your project with:

```
EMAIL_USER=evanmsanchez15@gmail.com
EMAIL_PASSWORD=your-app-password-here
```

Replace `your-app-password-here` with the app password you generated in step 1.

### 3. Restart Development Server

After creating the `.env.local` file, restart your development server:

```bash
npm run dev
```

## How It Works

1. User fills out the contact form (name, email, message)
2. Form submission sends data to `/api/contact` endpoint
3. Server sends an email to `evanmsanchez15@gmail.com` with:
   - User's name
   - User's email (set as reply-to, so you can reply directly)
   - User's message
4. Success popup appears with message: "Thank you for reaching out! I'll get back to you within 24-48 hours."
5. Popup auto-closes after 5 seconds (or user can click Close button)

## Testing

To test the contact form:
1. Run `npm run dev`
2. Navigate to the contact page
3. Fill out the form with test data
4. Click "SEND MESSAGE"
5. Check your inbox at evanmsanchez15@gmail.com

## Deployment Notes

When deploying to production (e.g., Vercel, Netlify):
- Add the environment variables (`EMAIL_USER` and `EMAIL_PASSWORD`) in your hosting platform's environment variable settings
- Make sure `.env.local` is in your `.gitignore` (it should be by default)
- Never commit your app password to version control

## Security

- The `.env.local` file is already in `.gitignore` and won't be committed
- Never share your Gmail App Password
- If compromised, revoke the app password and generate a new one from Google Account settings


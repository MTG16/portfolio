# 📧 Nodemailer Setup Guide

Your portfolio now uses **Nodemailer** with Express.js backend for reliable email delivery to `mughilthirukkumar16@gmail.com`.

## ⚡ Quick Start

### 1. Get Gmail App Password (Required!)

1. Go to [Google Account Settings](https://myaccount.google.com/)
2. **Security** → **2-Step Verification** (must be enabled)
3. **App passwords** → **Generate app password**
4. Select **"Mail"** as the app
5. Copy the 16-character password (like: `abcd efgh ijkl mnop`)

### 2. Update .env File

Open `.env` file and replace `your-gmail-app-password-here` with your actual app password:

```env
EMAIL_USER=mughilthirukkumar16@gmail.com
EMAIL_PASS=abcdefghijklmnop  # Replace with your actual app password (no spaces)
```

### 3. Start the Server

```bash
npm start
```

### 4. Test Your Contact Form

1. Open browser: http://localhost:3000
2. Fill out the contact form
3. Submit message
4. Check `mughilthirukkumar16@gmail.com` for the email!

## 🚀 Features

### ✅ What's Working:
- **Professional HTML Emails** with styling
- **Direct Gmail Delivery** to your inbox
- **Reply-To Functionality** - reply directly to senders
- **Form Validation** with real-time feedback
- **Loading States** and success/error messages
- **Mobile Responsive** design
- **Dark Mode Support**
- **Server Health Check** at `/api/health`

### 📧 Email Template:
Your emails will look like this:

```
Subject: New Contact Form Message from [Name]

📧 New Portfolio Contact Message

Name: [User's Name]
Email: [User's Email]
Message: [User's Message]

📧 Reply directly to this email to respond to [Name]
Sent from your portfolio website • [Timestamp]
```

## 🔧 Project Structure

```
Portfolio/
├── server.js          # Express server with Nodemailer
├── index.html         # Your portfolio HTML
├── script.js          # Updated with backend API calls
├── style.css          # All your beautiful styles
├── .env              # Gmail credentials (keep secret!)
├── package.json       # Node.js dependencies
└── node_modules/      # Installed packages
```

## 🌐 Deployment Options

### Local Development:
```bash
npm start
# Access: http://localhost:3000
```

### Production Deployment:

**Heroku:**
```bash
# Set environment variables in Heroku dashboard
heroku config:set EMAIL_USER=mughilthirukkumar16@gmail.com
heroku config:set EMAIL_PASS=your-app-password
```

**Vercel/Netlify:**
- Add environment variables in dashboard
- Deploy as Node.js application

**VPS/Server:**
```bash
# Install PM2 for process management
npm install -g pm2
pm2 start server.js
```

## 🐛 Troubleshooting

### Common Issues:

**"Authentication failed"**
- Make sure 2-Step Verification is enabled on your Google account
- Generate a fresh App Password
- Remove spaces from the app password in .env

**"Network error"**
- Server not running: run `npm start`
- Port conflict: change PORT in .env file

**"Invalid email"**
- Check email format validation
- Make sure all fields are filled

### Debug Mode:
Set `NODE_ENV=development` in .env to see detailed error messages.

## 📊 API Endpoints

### Contact Form:
```
POST /api/contact
Content-Type: application/json

{
  "from_name": "John Doe",
  "from_email": "john@example.com", 
  "message": "Hello Mughil!"
}
```

### Health Check:
```
GET /api/health
Response: {"status": "Server is running!", "timestamp": "..."}
```

## 🔒 Security Features

✅ **CORS Protection** - Only allowed origins can access API
✅ **Input Validation** - Server-side validation of all fields
✅ **Environment Variables** - Credentials stored securely
✅ **Error Handling** - Graceful error responses
✅ **Rate Limiting** - Built into Gmail API
✅ **Reply-To Headers** - Secure sender identification

## ⚙️ Configuration Options

In `.env` file:
```env
EMAIL_USER=mughilthirukkumar16@gmail.com  # Your Gmail
EMAIL_PASS=your-app-password              # 16-character app password
PORT=3000                                 # Server port
NODE_ENV=development                      # Environment mode
```

---

## 🎉 You're All Set!

Your contact form now delivers emails directly to `mughilthirukkumar16@gmail.com` using:
- ✅ **Nodemailer** for reliable delivery
- ✅ **Express.js** backend server
- ✅ **Gmail SMTP** service
- ✅ **Professional email templates**
- ✅ **Full control over email delivery**

**Next Steps:**
1. Get Gmail App Password
2. Update .env file
3. Run `npm start`
4. Test the contact form
5. Deploy to production!

🚀 **Happy Coding!**
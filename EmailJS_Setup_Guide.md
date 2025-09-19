# EmailJS Setup Guide for Contact Form

Follow these steps to set up EmailJS for your contact form to receive emails at **mughilthirukkumar16@gmail.com**

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (allows 200 emails/month)
3. Verify your email address

## Step 2: Add Email Service

1. Go to **Email Services** in your EmailJS dashboard
2. Click **Add New Service**
3. Choose **Gmail** (or your preferred email provider)
4. Enter your email: `mughilthirukkumar16@gmail.com`
5. Follow the authentication process
6. Copy your **Service ID** (something like `service_xxxxxxx`)

## Step 3: Create Email Template

1. Go to **Email Templates**
2. Click **Create New Template**
3. Use this template:

**Subject:** `New Contact Form Message from {{from_name}}`

**Content:**
```
Hello Mughil,

You have received a new message from your portfolio contact form:

Name: {{from_name}}
Email: {{from_email}}
Message: {{message}}

---
Sent from your portfolio website
```

4. Save the template and copy your **Template ID** (something like `template_xxxxxxx`)

## Step 4: Get Public Key

1. Go to **Account** → **General**
2. Find your **Public Key** (something like `xxxxxxxxxxxxxxxx`)

## Step 5: Update Your Code

Replace the placeholders in `script.js`:

```javascript
// Line 111: Replace YOUR_PUBLIC_KEY
emailjs.init('your_actual_public_key_here');

// Lines 257-258: Replace YOUR_SERVICE_ID and YOUR_TEMPLATE_ID
emailjs.sendForm(
    'your_service_id_here',    // Your Gmail service ID
    'your_template_id_here',   // Your template ID
    contactForm
)
```

## Example Configuration

```javascript
// Example (replace with your actual values)
emailjs.init('aBcD1234567890123456');

emailjs.sendForm(
    'service_gmail123',
    'template_contact456',
    contactForm
)
```

## Step 6: Test the Contact Form

1. Open your portfolio in a browser
2. Fill out the contact form with test data
3. Submit the form
4. Check your email: `mughilthirukkumar16@gmail.com`
5. You should receive the message within a few seconds

## Security Features

✅ **Client-side only** - No backend server required
✅ **Your email stays private** - Only you see the messages
✅ **Spam protection** - EmailJS has built-in limits
✅ **Free tier** - 200 emails/month included

## Troubleshooting

**If emails aren't working:**
1. Check browser console for errors
2. Verify all IDs are correct (Service ID, Template ID, Public Key)
3. Make sure Gmail service is properly connected
4. Check EmailJS dashboard for delivery status

**Common Issues:**
- Wrong service/template IDs
- Email service not authenticated properly
- Browser blocking third-party scripts (disable ad blockers)

## Form Features

Your contact form now includes:
- ✅ Real-time validation
- ✅ Loading spinner during send
- ✅ Success/error messages
- ✅ Form reset after successful send
- ✅ Dark mode support
- ✅ Mobile responsive design

---

**Your Email:** mughilthirukkumar16@gmail.com
**Free Limit:** 200 emails/month
**Setup Time:** ~10 minutes
// EmailJS Setup Script
// Follow these steps to enable email functionality

// Step 1: Go to https://www.emailjs.com/ and create a free account
// Step 2: Add Gmail service and get your Service ID
// Step 3: Create an email template and get Template ID  
// Step 4: Get your Public Key from Account settings
// Step 5: Replace the values below with your actual IDs

// REPLACE THESE VALUES WITH YOUR ACTUAL EMAILJS CREDENTIALS:
const EMAILJS_CONFIG = {
    PUBLIC_KEY: 'YOUR_PUBLIC_KEY_HERE',        // e.g., 'user_aBcD1234567890123456'
    SERVICE_ID: 'YOUR_SERVICE_ID_HERE',        // e.g., 'service_gmail123'
    TEMPLATE_ID: 'YOUR_TEMPLATE_ID_HERE'       // e.g., 'template_contact456'
};

// Step 6: After replacing the values above, copy this code to the bottom of script.js:

/*
// Initialize EmailJS
(function() {
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
})();

// Update the emailJSConfigured flag in script.js from false to true:
let emailJSConfigured = true; // Change this line in script.js

// Replace YOUR_SERVICE_ID and YOUR_TEMPLATE_ID in the emailjs.sendForm call with:
emailjs.sendForm(
    EMAILJS_CONFIG.SERVICE_ID,
    EMAILJS_CONFIG.TEMPLATE_ID,
    contactForm
)
*/

// EMAIL TEMPLATE SUGGESTION:
// Subject: New Contact Form Message from {{from_name}}
// Content:
// Hello Mughil,
// 
// You have received a new message from your portfolio:
// 
// Name: {{from_name}}
// Email: {{from_email}}
// Message: {{message}}
// 
// Reply directly to this email to respond.
// 
// ---
// Sent from your portfolio website

console.log('EmailJS Setup Guide loaded. Follow the instructions in this file to enable email functionality.');
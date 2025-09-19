const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname)));

// Serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Create transporter for Gmail
const createTransporter = () => {
    return nodemailer.createTransporter({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER || 'mughilthirukkumar16@gmail.com', // Your Gmail
            pass: process.env.EMAIL_PASS || 'emgf ycgo hzml qvcg'     // Your App Password
        }
    });
};

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
    try {
        const { from_name, from_email, message } = req.body;

        // Validate required fields
        if (!from_name || !from_email || !message) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(from_email)) {
            return res.status(400).json({
                success: false,
                message: 'Please enter a valid email address'
            });
        }

        const transporter = createTransporter();

        // Email content
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'mughilthirukkumar16@gmail.com', // Your email
            subject: `New Contact Form Message from ${from_name}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                    <h2 style="color: #4f46e5; text-align: center;">New Portfolio Contact Message</h2>
                    
                    <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="color: #333; margin-bottom: 15px;">Message Details:</h3>
                        
                        <p><strong style="color: #4f46e5;">Name:</strong> ${from_name}</p>
                        <p><strong style="color: #4f46e5;">Email:</strong> ${from_email}</p>
                        <p><strong style="color: #4f46e5;">Message:</strong></p>
                        <div style="background: white; padding: 15px; border-left: 4px solid #4f46e5; margin: 10px 0;">
                            ${message.replace(/\n/g, '<br>')}
                        </div>
                    </div>
                    
                    <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
                        <p style="color: #666; font-size: 14px;">
                            📧 Reply directly to this email to respond to ${from_name}
                        </p>
                        <p style="color: #999; font-size: 12px;">
                            Sent from your portfolio website • ${new Date().toLocaleString()}
                        </p>
                    </div>
                </div>
            `,
            replyTo: from_email // This allows you to reply directly to the sender
        };

        // Send email
        await transporter.sendMail(mailOptions);

        console.log(`✅ Email sent successfully from ${from_name} (${from_email})`);

        res.json({
            success: true,
            message: 'Message sent successfully!'
        });

    } catch (error) {
        console.error('❌ Error sending email:', error);
        
        res.status(500).json({
            success: false,
            message: 'Failed to send message. Please try again.',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'Server is running!', 
        timestamp: new Date().toISOString(),
        email: 'mughilthirukkumar16@gmail.com',
        port: PORT
    });
});

// Test endpoint
app.get('/test', (req, res) => {
    res.send(`
        <h1>🚀 Portfolio Server is Running!</h1>
        <p>📧 Email: mughilthirukkumar16@gmail.com</p>
        <p>🌐 Server: http://localhost:${PORT}</p>
        <p>📬 Contact API: <a href="/api/contact">/api/contact</a></p>
        <p>❤️ Health Check: <a href="/api/health">/api/health</a></p>
        <hr>
        <p><a href="/">← Back to Portfolio</a></p>
    `);
});

// Start server
app.listen(PORT, () => {
    console.log(`
🚀 Portfolio Server Running!
📧 Email Service: Gmail + Nodemailer
🌐 Local: http://localhost:${PORT}
📬 Contact API: http://localhost:${PORT}/api/contact
    `);
});

module.exports = app;
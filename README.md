# Mughil T - Interactive Portfolio

A modern, interactive portfolio website with animations and dynamic features.

## 🚀 Features

- **Interactive Animations**: Scroll-triggered animations, typing effects, floating particles
- **Responsive Design**: Mobile-friendly layout that works on all devices
- **Dark/Light Theme**: Toggle between themes with smooth transitions
- **Resume Download**: Downloadable resume functionality
- **Form Validation**: Real-time form validation with animations
- **Skills Progress Bars**: Animated progress indicators
- **Project Showcases**: Interactive project cards with hover effects

## 📄 Resume Setup

### Option 1: Replace with PDF Resume
1. Add your resume PDF file to the portfolio folder (e.g., `Mughil_T_Resume.pdf`)
2. Update the `downloadResume()` function in `script.js`:

```javascript
function downloadResume() {
    // Replace with your actual PDF file path
    const link = document.createElement('a');
    link.href = './Mughil_T_Resume.pdf';
    link.download = 'Mughil_T_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showDownloadAnimation();
}
```

### Option 2: Update the HTML Resume Template
Edit the `createSampleResume()` function in `script.js` to include your actual:
- Personal information (email, phone, LinkedIn)
- Work experience
- Education details
- Projects
- Skills

### Option 3: Use Google Drive/Cloud Link
1. Upload your resume to Google Drive or another cloud service
2. Get a shareable download link
3. Update the function:

```javascript
function downloadResume() {
    window.open('https://your-google-drive-link', '_blank');
    showDownloadAnimation();
}
```

## 🎨 Customization

### Colors and Theme
Update CSS variables in `style.css`:
```css
:root {
    --primary-color: #4f46e5;
    --secondary-color: #4338ca;
    --gradient-start: #4f46e5;
    --gradient-end: #7c3aed;
}
```

### Personal Information
- Update profile images (`T-Mughil.jpg`)
- Modify text content in `index.html`
- Update social media links in the footer

## 📱 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## 🚀 Deployment

1. Upload all files to your web hosting service
2. Ensure your resume file is accessible
3. Test the download functionality
4. Update any file paths as needed

## 📧 Contact

Feel free to reach out for any questions or collaborations!

---

*Built with HTML5, CSS3, and vanilla JavaScript*
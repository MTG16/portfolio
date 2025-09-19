// Mobile toggle
const menubtn = document.querySelector('.menu-btn');
const navlinks = document.querySelector('.nav-links');

menubtn.addEventListener('click', () => {
    navlinks.classList.toggle('active');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            navlinks.classList.remove('active');
        }
    });
});

// Active navigation highlighting based on scroll position
function highlightActiveNav() {
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    const offset = 100; // Offset for navbar height
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - offset)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightActiveNav);
window.addEventListener('load', highlightActiveNav);

// Scroll-triggered animations
function animateOnScroll() {
    const animatedElements = document.querySelectorAll('.fade-in, .slide-left, .slide-right, .scale-in, .skills-card, .project-card');
    const windowHeight = window.innerHeight;
    const scrollTop = window.scrollY;
    
    animatedElements.forEach((element, index) => {
        const elementTop = element.offsetTop;
        const elementBottom = elementTop + element.clientHeight;
        const viewportTop = scrollTop;
        const viewportBottom = scrollTop + windowHeight;
        
        // Element is visible when any part of it is in the viewport
        const isVisible = elementBottom > viewportTop && elementTop < viewportBottom;
        
        // Element enters viewport (start animation)
        const isEntering = elementTop < viewportBottom - 100; // Start animation 100px before fully visible
        
        // Element completely leaves viewport (remove animation)
        const hasLeft = elementBottom < viewportTop || elementTop > viewportBottom;
        
        if (isEntering && isVisible && !element.classList.contains('animate')) {
            // Add delay for staggered effect on cards
            if (element.classList.contains('skills-card') || element.classList.contains('project-card')) {
                // Get index within the same type of elements for proper staggering
                const sameTypeElements = Array.from(document.querySelectorAll('.' + element.classList[0]));
                const indexInType = sameTypeElements.indexOf(element);
                setTimeout(() => {
                    element.classList.add('animate');
                }, indexInType * 100);
            } else {
                element.classList.add('animate');
            }
        } else if (hasLeft) {
            // Remove animation class when element completely leaves viewport
            element.classList.remove('animate');
        }
    });
}

// Throttle scroll events for better performance
let ticking = false;
function requestTick() {
    if (!ticking) {
        requestAnimationFrame(() => {
            animateOnScroll();
            highlightActiveNav();
            ticking = false;
        });
        ticking = true;
    }
}

window.addEventListener('scroll', requestTick);

// Nodemailer Backend Configuration
const API_BASE_URL = window.location.origin; // Automatically detects current domain

// Form validation with EmailJS integration
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const submitBtn = document.getElementById('submitBtn');
const btnText = submitBtn.querySelector('.btn-text');
const btnLoading = submitBtn.querySelector('.btn-loading');

// Validation functions
function validateName(name) {
    return name.trim().length >= 2;
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateMessage(message) {
    return message.trim().length >= 10;
}

function showError(formGroup, message) {
    formGroup.classList.remove('success');
    formGroup.classList.add('error');
    
    let errorElement = formGroup.querySelector('.error-message');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.classList.add('error-message');
        formGroup.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
    setTimeout(() => errorElement.classList.add('show'), 10);
}

function showSuccess(formGroup) {
    formGroup.classList.remove('error');
    formGroup.classList.add('success');
    
    const errorElement = formGroup.querySelector('.error-message');
    if (errorElement) {
        errorElement.classList.remove('show');
        setTimeout(() => errorElement.remove(), 300);
    }
}

function showFormMessage(message, isSuccess = true) {
    // Create or update form message
    let messageElement = contactForm.querySelector('.form-message');
    if (!messageElement) {
        messageElement = document.createElement('div');
        messageElement.className = 'form-message';
        contactForm.appendChild(messageElement);
    }
    
    messageElement.textContent = message;
    messageElement.className = `form-message ${isSuccess ? 'success' : 'error'} show`;
    
    // Remove message after 5 seconds
    setTimeout(() => {
        messageElement.classList.remove('show');
    }, 5000);
}

function resetButtonState() {
    submitBtn.disabled = false;
    btnText.style.display = 'inline';
    btnLoading.style.display = 'none';
    submitBtn.style.background = '';
}

function setLoadingState() {
    submitBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline';
    submitBtn.style.background = '#6366f1';
}

// Real-time validation
nameInput.addEventListener('blur', () => {
    const formGroup = nameInput.parentElement;
    if (validateName(nameInput.value)) {
        showSuccess(formGroup);
    } else {
        showError(formGroup, 'Name must be at least 2 characters long');
    }
});

emailInput.addEventListener('blur', () => {
    const formGroup = emailInput.parentElement;
    if (validateEmail(emailInput.value)) {
        showSuccess(formGroup);
    } else {
        showError(formGroup, 'Please enter a valid email address');
    }
});

messageInput.addEventListener('blur', () => {
    const formGroup = messageInput.parentElement;
    if (validateMessage(messageInput.value)) {
        showSuccess(formGroup);
    } else {
        showError(formGroup, 'Message must be at least 10 characters long');
    }
});

// Form submission with EmailJS
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const nameValid = validateName(nameInput.value);
    const emailValid = validateEmail(emailInput.value);
    const messageValid = validateMessage(messageInput.value);
    
    // Validate all fields
    if (!nameValid) {
        showError(nameInput.parentElement, 'Name must be at least 2 characters long');
    } else {
        showSuccess(nameInput.parentElement);
    }
    
    if (!emailValid) {
        showError(emailInput.parentElement, 'Please enter a valid email address');
    } else {
        showSuccess(emailInput.parentElement);
    }
    
    if (!messageValid) {
        showError(messageInput.parentElement, 'Message must be at least 10 characters long');
    } else {
        showSuccess(messageInput.parentElement);
    }
    
    // If all fields are valid, send email via Nodemailer backend
    if (nameValid && emailValid && messageValid) {
        setLoadingState();
        
        // Prepare form data
        const formData = {
            from_name: nameInput.value.trim(),
            from_email: emailInput.value.trim(),
            message: messageInput.value.trim()
        };
        
        // Send POST request to backend
        fetch(`${API_BASE_URL}/api/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log('✅ Email sent successfully!');
                showFormMessage(`✅ Hi ${formData.from_name}! Your message has been sent successfully. I'll get back to you soon!`, true);
                
                // Reset form
                contactForm.reset();
                
                // Remove success states
                document.querySelectorAll('.form-group').forEach(group => {
                    group.classList.remove('success', 'error');
                });
            } else {
                console.error('❌ Error:', data.message);
                showFormMessage(`❌ ${data.message || 'There was an error sending your message. Please try again.'}`, false);
            }
            
            resetButtonState();
        })
        .catch(error => {
            console.error('❌ Network error:', error);
            showFormMessage('❌ Network error. Please check if the server is running or contact me directly at mughilthirukkumar16@gmail.com', false);
            resetButtonState();
        });
    }
});
// Loading screen
function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    loadingScreen.classList.add('fade-out');
    
    setTimeout(() => {
        loadingScreen.style.display = 'none';
        // Start animations after loading screen is hidden
        highlightActiveNav();
        animateOnScroll();
        startTypingAnimation();
    }, 500);
}

// Initialize progress bars
function initializeProgressBars() {
    const skillBars = document.querySelectorAll('.progress-bar');
    skillBars.forEach(bar => {
        bar.style.width = '0%';
    });
}

window.addEventListener('load', () => {
    // Initialize theme
    initializeTheme();
    // Initialize progress bars
    initializeProgressBars();
    // Create particles
    createParticles();
    // Hide loading screen after minimum 2 seconds for better UX
    setTimeout(hideLoadingScreen, 2000);
});

// Particles Animation
function createParticles() {
    const particlesContainer = document.getElementById('particlesContainer');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
    }
    
    // Recreate particles periodically for continuous animation
    setInterval(() => {
        if (particlesContainer.children.length < particleCount) {
            createParticle(particlesContainer);
        }
    }, 2000);
}

function createParticle(container) {
    const particle = document.createElement('div');
    const shapes = ['particle', 'particle triangle'];
    const sizes = ['small', 'medium', 'large'];
    
    // Random shape and size
    const shapeClass = shapes[Math.floor(Math.random() * shapes.length)];
    const sizeClass = sizes[Math.floor(Math.random() * sizes.length)];
    
    particle.className = `${shapeClass} ${sizeClass}`;
    
    // Random position
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    
    // Random animation delay
    particle.style.animationDelay = Math.random() * 6 + 's';
    
    // Random opacity
    particle.style.opacity = Math.random() * 0.6 + 0.2;
    
    container.appendChild(particle);
    
    // Remove particle after animation completes
    setTimeout(() => {
        if (particle.parentNode) {
            particle.remove();
        }
    }, 12000);
}

// Theme toggle functionality
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const theme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    setTheme(theme);
}

function setTheme(theme) {
    const themeToggle = document.getElementById('themeToggle');
    const icon = themeToggle.querySelector('i');
    
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    if (theme === 'dark') {
        icon.className = 'fas fa-sun';
        themeToggle.setAttribute('title', 'Switch to Light Mode');
    } else {
        icon.className = 'fas fa-moon';
        themeToggle.setAttribute('title', 'Switch to Dark Mode');
    }
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
}

// Add event listener for theme toggle
document.getElementById('themeToggle').addEventListener('click', toggleTheme);

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
    }
});

// Resume Download Functionality
function downloadResume() {
    // Create a temporary link element
    const link = document.createElement('a');
    
    // Use your existing PDF file
    link.href = './T_Mughil_Resume.pdf';
    link.download = 'Mughil_T_Resume.pdf';
    link.target = '_blank';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Show download animation
    showDownloadAnimation();
}


// Show download animation
function showDownloadAnimation() {
    const resumeButtons = document.querySelectorAll('.resume-btn');
    
    resumeButtons.forEach(button => {
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i> Downloaded!';
        button.style.background = '#10b981';
        button.style.borderColor = '#10b981';
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.style.background = '';
            button.style.borderColor = '';
        }, 2000);
    });
}

// Typewriter effect for header text
function startTypingAnimation() {
    const typingText = document.querySelector('.typing-text');
    const descriptionText = document.querySelector('.typing-description');
    const descriptionContainer = document.querySelector('.description-text');
    
    const mainText = "Hi, I'm Mughil T";
    const description = "A passionate web developer with a knack for creating dynamic and responsive websites. I love turning ideas into reality through code.";
    
    let i = 0;
    let j = 0;
    
    // Type main heading
    function typeMainText() {
        if (i < mainText.length) {
            typingText.textContent += mainText.charAt(i);
            i++;
            setTimeout(typeMainText, 100);
        } else {
            // Start typing description after main text is complete
            setTimeout(() => {
                descriptionContainer.style.opacity = '1';
                typeDescription();
            }, 500);
        }
    }
    
    // Type description
    function typeDescription() {
        if (j < description.length) {
            descriptionText.textContent += description.charAt(j);
            j++;
            setTimeout(typeDescription, 50);
        }
    }
    
    // Start the animation after a small delay
    setTimeout(typeMainText, 1000);
}

// Scroll to top functionality
const scrollToTopBtn = document.getElementById('scrollToTop');

function toggleScrollButton() {
    if (window.scrollY > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
}

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add scroll button toggle to the scroll event
function requestTick() {
    if (!ticking) {
        requestAnimationFrame(() => {
            animateOnScroll();
            animateSkillBars();
            highlightActiveNav();
            toggleScrollButton();
            ticking = false;
        });
        ticking = true;
    }
}

// Animate skill progress bars
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.progress-bar');
    const windowHeight = window.innerHeight;
    const scrollTop = window.scrollY;
    
    skillBars.forEach((bar, index) => {
        const skillLevel = bar.getAttribute('data-skill');
        const skillsSection = bar.closest('.skills');
        
        if (skillsSection) {
            const sectionTop = skillsSection.offsetTop;
            const sectionBottom = sectionTop + skillsSection.clientHeight;
            const viewportTop = scrollTop;
            const viewportBottom = scrollTop + windowHeight;
            
            // Check if skills section is visible
            const isSectionVisible = sectionBottom > viewportTop && sectionTop < viewportBottom;
            const isSectionEntering = sectionTop < viewportBottom - 100;
            const hasSectionLeft = sectionBottom < viewportTop || sectionTop > viewportBottom;
            
            if (isSectionEntering && isSectionVisible && (bar.style.width === '0%' || bar.style.width === '')) {
                // Animate progress bars with staggered delay
                setTimeout(() => {
                    bar.style.width = skillLevel + '%';
                }, index * 150 + 500); // Start after section animation + stagger
            } else if (hasSectionLeft) {
                // Reset progress bars immediately when section leaves
                bar.style.transition = 'width 0.3s ease';
                bar.style.width = '0%';
                // Restore original transition after reset
                setTimeout(() => {
                    bar.style.transition = 'width 1.5s ease';
                }, 300);
            }
        }
    });
}

// Update the scroll event to include skill bar animations
function requestTick() {
    if (!ticking) {
        requestAnimationFrame(() => {
            animateOnScroll();
            animateSkillBars();
            highlightActiveNav();
            ticking = false;
        });
        ticking = true;
    }
}

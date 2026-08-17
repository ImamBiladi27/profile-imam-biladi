// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Smooth Scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header background change on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.background = '#ffffff';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = '#ffffff';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Animate elements on scroll
const animateElements = document.querySelectorAll('.skill-card, .timeline-item, .contact-info .info-item');

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

animateElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'all 0.6s ease';
    observer.observe(element);
});

// Progress bar animation for skills
const progressBars = document.querySelectorAll('.progress');

const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const width = entry.target.style.width;
            entry.target.style.width = '0';
            setTimeout(() => {
                entry.target.style.width = width;
            }, 100);
            progressObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

progressBars.forEach(bar => {
    progressObserver.observe(bar);
});

// Form submission handling using simplified sendForm method
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    const submitBtn = document.getElementById('submit-btn');
    
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Replace with your actual EmailJS credentials
        const serviceID = 'service_p5pojth';      // ← Update Service ID (contoh: service_gmail123)
        const templateID = 'template_p5xgbxk';    // ← Update Template ID (misal: template_auto_reply)
        
        emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
                submitBtn.textContent = 'Send Message';
                
                // Success Alert with SweetAlert2
                Swal.fire({
                    icon: 'success',
                    title: 'Message Sent!',
                    text: 'Thank you for your message! I will get back to you soon.',
                    confirmButtonColor: '#007bff',
                    backdrop: true,
                    allowOutsideClick: false,
                    allowEscapeKey: false
                });
                
                contactForm.reset();
            }, (err) => {
                submitBtn.textContent = 'Send Message';
                console.error('Email failed:', err);
                
                // Error Alert with SweetAlert2
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Failed to send message. Please try again or contact me at imambiladi27@gmail.com',
                    confirmButtonColor: '#dc3545',
                    backdrop: true,
                    allowOutsideClick: false
                });
            });
    });
}

// Typing effect for hero section (optional enhancement)
const heroTitles = ['Software Developer', 'Web Developer', 'Full Stack Developer'];
let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const heroSubtitle = document.querySelector('.hero-text h2');

function typeEffect() {
    const currentTitle = heroTitles[titleIndex];

    if (isDeleting) {
        heroSubtitle.textContent = currentTitle.substring(0, charIndex - 1);
        charIndex--;
    } else {
        heroSubtitle.textContent = currentTitle.substring(0, charIndex + 1);
        charIndex++;
    }

    let typingSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentTitle.length) {
        typingSpeed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % heroTitles.length;
        typingSpeed = 500; // Pause before new word
    }

    setTimeout(typeEffect, typingSpeed);
}

// Start typing effect after page load
setTimeout(typeEffect, 2000);

// Add parallax effect to hero image
window.addEventListener('scroll', () => {
    const heroImage = document.querySelector('.hero-image');
    const scrolled = window.pageYOffset;
    const rate = scrolled * 0.3;

    if (heroImage) {
        heroImage.style.transform = `translateY(${rate}px)`;
    }
});

console.log('Imam Biladi Profile Page Loaded Successfully!');

// Dynamic Copyright Year
document.getElementById('current-year').textContent = new Date().getFullYear();

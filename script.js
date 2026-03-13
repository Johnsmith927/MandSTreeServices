// M and S Tree Care - Main JavaScript

// Mobile menu toggle
function toggleMenu() {
    const nav = document.querySelector('.main-nav');
    const menuToggle = document.querySelector('.menu-toggle');
    
    nav.classList.toggle('active');
    menuToggle.classList.toggle('active');
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
    const nav = document.querySelector('.main-nav');
    const menuToggle = document.querySelector('.menu-toggle');
    const header = document.querySelector('.site-header');
    
    if (!header.contains(e.target) && nav.classList.contains('active')) {
        nav.classList.remove('active');
        menuToggle.classList.remove('active');
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add header shadow on scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('.site-header');
    
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
    } else {
        header.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
    }
});

// Hero Slideshow
let slideIndex = 0;
let slideTimer;

function showSlides() {
    const slides = document.getElementsByClassName("slide");
    const dots = document.getElementsByClassName("dot");
    
    if (slides.length === 0) return; // Exit if no slides
    
    // Hide all slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove('active');
    }
    
    // Increment slide index
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    
    // Remove active class from all dots
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove('active');
    }
    
    // Show current slide and dot
    slides[slideIndex - 1].classList.add('active');
    if (dots.length > 0) {
        dots[slideIndex - 1].classList.add('active');
    }
    
    // Change slide every 5 seconds
    slideTimer = setTimeout(showSlides, 5000);
}

function currentSlide(n) {
    clearTimeout(slideTimer);
    slideIndex = n - 1;
    showSlides();
}

// Start slideshow when page loads
document.addEventListener('DOMContentLoaded', function() {
    showSlides();
    
    // About section slideshow
    showAboutSlides();
});

// About Section Slideshow
let aboutSlideIndex = 0;

function showAboutSlides() {
    const slides = document.getElementsByClassName("about-slide");
    
    if (slides.length === 0) return;
    
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove('active');
    }
    
    aboutSlideIndex++;
    if (aboutSlideIndex > slides.length) {
        aboutSlideIndex = 1;
    }
    
    slides[aboutSlideIndex - 1].classList.add('active');
    
    setTimeout(showAboutSlides, 4000); // Change every 4 seconds
}

// Phone number click tracking (optional - for analytics)
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', function() {
        console.log('Phone number clicked: ' + this.getAttribute('href'));
        // Add your analytics tracking code here if needed
    });
});

// Form validation
function validateContactForm() {
    const form = document.getElementById('contact-form');
    
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        const submitBtn = document.getElementById('submit-btn');
        const btnText = document.getElementById('btn-text');
        const formStatus = document.getElementById('form-status');
        
        // Show loading state
        submitBtn.disabled = true;
        btnText.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        formStatus.style.display = 'none';
        
        // Check if using placeholder form ID
        const formAction = form.getAttribute('action');
        if (formAction.includes('YOUR_FORM_ID')) {
            e.preventDefault();
            
            // Show error message
            submitBtn.disabled = false;
            btnText.innerHTML = '<i class="fas fa-paper-plane"></i> Send Request';
            formStatus.style.display = 'block';
            formStatus.style.color = '#c0392b';
            formStatus.style.padding = '1rem';
            formStatus.style.background = '#ffe6e6';
            formStatus.style.borderRadius = '8px';
            formStatus.innerHTML = '<strong>⚠️ Form Not Configured</strong><br>Please set up Formspree first.<br><br>For now, please call <a href="tel:+14126891966" style="color: #c0392b; font-weight: bold;">(412) 689-1966</a> directly.';
            
            return false;
        }
        
        // If form ID is set, let it submit normally
        // Formspree will handle the redirect to thank-you page
    });
}

validateContactForm();

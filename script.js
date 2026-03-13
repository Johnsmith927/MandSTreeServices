// Safe Wash Pressure Soft Wash Cleaning - Main JavaScript

// ===== MOBILE MENU TOGGLE =====
function toggleMenu() {
    const nav = document.querySelector('.main-nav');
    const menuToggle = document.querySelector('.menu-toggle');

    nav.classList.toggle('active');
    menuToggle.classList.toggle('active');

    // Animate hamburger into X
    const spans = menuToggle.querySelectorAll('span');
    if (menuToggle.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
    } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
    }
}

// Close mobile menu when clicking outside
document.addEventListener('click', function (e) {
    const nav = document.querySelector('.main-nav');
    const menuToggle = document.querySelector('.menu-toggle');
    const header = document.querySelector('.site-header');

    if (!header.contains(e.target) && nav.classList.contains('active')) {
        nav.classList.remove('active');
        menuToggle.classList.remove('active');
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
    }
});

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const headerHeight = document.querySelector('.site-header')?.offsetHeight || 0;
            const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
            window.scrollTo({ top, behavior: 'smooth' });

            // Close mobile menu if open
            const nav = document.querySelector('.main-nav');
            const menuToggle = document.querySelector('.menu-toggle');
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                menuToggle.classList.remove('active');
                const spans = menuToggle.querySelectorAll('span');
                spans[0].style.transform = '';
                spans[1].style.opacity = '';
                spans[2].style.transform = '';
            }
        }
    });
});

// ===== HEADER: SHADOW + SHRINK ON SCROLL =====
window.addEventListener('scroll', function () {
    const header = document.querySelector('.site-header');
    if (!header) return;

    if (window.scrollY > 80) {
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.18)';
        header.style.padding = '0.5rem 0';
    } else {
        header.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
        header.style.padding = '';
    }
});

// ===== SCROLL-TRIGGERED ANIMATIONS =====
const animationObserver = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            // Once animated, stop watching (performance)
            animationObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
});

document.addEventListener('DOMContentLoaded', function () {

    // Elements to animate on scroll
    const selectors = [
        '.service-card',
        '.feature-item',
        '.testimonial-card',
        '.gallery-item',
        '.service-detail-text',
        '.service-detail-image',
        '.faq-item',
        '.stat-item',
        '.section-header',
        '.contact-form',
        '.contact-info-section',
    ];

    selectors.forEach(selector => {
        document.querySelectorAll(selector).forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(32px)';
            el.style.transition = `opacity 0.6s ease ${index * 0.08}s, transform 0.6s ease ${index * 0.08}s`;
            animationObserver.observe(el);
        });
    });

    // Inject the animate-in style once
    if (!document.getElementById('animate-in-style')) {
        const style = document.createElement('style');
        style.id = 'animate-in-style';
        style.textContent = `.animate-in { opacity: 1 !important; transform: translateY(0) !important; }`;
        document.head.appendChild(style);
    }

    // ===== HERO SLIDESHOW =====
    initHeroSlideshow();

    // ===== ABOUT SECTION SLIDESHOW =====
    initAboutSlideshow();

    // ===== FAQ ACCORDION =====
    initFAQ();

    // ===== REVIEW SLIDER =====
    initReviewSlider();

    // ===== ANIMATED COUNTERS =====
    initCounters();

    // ===== FORM VALIDATION =====
    validateContactForm();

    // ===== GALLERY LIGHTBOX HINT =====
    initGalleryHover();
});

// ===== HERO SLIDESHOW =====
let slideIndex = 0;
let slideTimer;

function initHeroSlideshow() {
    const slides = document.getElementsByClassName('slide');
    if (slides.length === 0) return;
    showSlide(1);
}

function showSlide(n) {
    const slides = document.getElementsByClassName('slide');
    const dots = document.getElementsByClassName('dot');
    if (slides.length === 0) return;

    if (n > slides.length) slideIndex = 1;
    else if (n < 1) slideIndex = slides.length;
    else slideIndex = n;

    Array.from(slides).forEach(s => s.classList.remove('active'));
    Array.from(dots).forEach(d => d.classList.remove('active'));

    slides[slideIndex - 1].classList.add('active');
    if (dots.length > 0) dots[slideIndex - 1].classList.add('active');

    clearTimeout(slideTimer);
    slideTimer = setTimeout(() => showSlide(slideIndex + 1), 5000);
}

function currentSlide(n) {
    clearTimeout(slideTimer);
    showSlide(n);
}

function changeSlide(dir) {
    clearTimeout(slideTimer);
    showSlide(slideIndex + dir);
}

// ===== ABOUT SECTION SLIDESHOW =====
let aboutSlideIndex = 0;
let aboutTimer;

function initAboutSlideshow() {
    const slides = document.getElementsByClassName('about-slide');
    if (slides.length === 0) return;
    showAboutSlide(1);
}

function showAboutSlide(n) {
    const slides = document.getElementsByClassName('about-slide');
    if (slides.length === 0) return;

    if (n > slides.length) aboutSlideIndex = 1;
    else if (n < 1) aboutSlideIndex = slides.length;
    else aboutSlideIndex = n;

    Array.from(slides).forEach(s => s.classList.remove('active'));
    slides[aboutSlideIndex - 1].classList.add('active');

    clearTimeout(aboutTimer);
    aboutTimer = setTimeout(() => showAboutSlide(aboutSlideIndex + 1), 4000);
}

// ===== FAQ ACCORDION =====
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length === 0) return;

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        if (!question || !answer) return;

        // Set initial state
        answer.style.maxHeight = '0';
        answer.style.overflow = 'hidden';
        answer.style.transition = 'max-height 0.4s ease, padding 0.4s ease, opacity 0.4s ease';
        answer.style.opacity = '0';

        question.style.cursor = 'pointer';

        question.addEventListener('click', function () {
            const isOpen = item.classList.contains('active');

            // Close all
            faqItems.forEach(fi => {
                fi.classList.remove('active');
                const a = fi.querySelector('.faq-answer');
                if (a) {
                    a.style.maxHeight = '0';
                    a.style.opacity = '0';
                    a.style.paddingTop = '0';
                    a.style.paddingBottom = '0';
                }
                const icon = fi.querySelector('.faq-icon');
                if (icon) icon.style.transform = '';
            });

            // Open clicked if it was closed
            if (!isOpen) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 40 + 'px';
                answer.style.opacity = '1';
                answer.style.paddingTop = '1rem';
                answer.style.paddingBottom = '1rem';
                const icon = item.querySelector('.faq-icon');
                if (icon) icon.style.transform = 'rotate(180deg)';
            }
        });
    });
}

// Public toggle function (for inline onclick if used)
function toggleFAQ(el) {
    const item = el.closest('.faq-item');
    if (item) item.querySelector('.faq-question').click();
}

// ===== REVIEW / TESTIMONIAL SLIDER =====
let reviewIndex = 0;

function initReviewSlider() {
    const slider = document.querySelector('.review-slider');
    if (!slider) return;

    const reviews = slider.querySelectorAll('.review-slide');
    const dots = document.querySelectorAll('.review-dot');
    if (reviews.length === 0) return;

    showReview(0);

    // Keyboard navigation
    document.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') changeReview(-1);
        if (e.key === 'ArrowRight') changeReview(1);
    });
}

function showReview(n) {
    const reviews = document.querySelectorAll('.review-slide');
    const dots = document.querySelectorAll('.review-dot');
    if (reviews.length === 0) return;

    if (n >= reviews.length) reviewIndex = 0;
    else if (n < 0) reviewIndex = reviews.length - 1;
    else reviewIndex = n;

    reviews.forEach(r => {
        r.style.opacity = '0';
        r.style.transform = 'translateX(20px)';
        r.style.display = 'none';
    });

    dots.forEach(d => d.classList.remove('active'));

    const current = reviews[reviewIndex];
    current.style.display = 'block';
    // Force reflow for animation
    current.offsetHeight;
    current.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    current.style.opacity = '1';
    current.style.transform = 'translateX(0)';

    if (dots[reviewIndex]) dots[reviewIndex].classList.add('active');
}

function changeReview(dir) {
    showReview(reviewIndex + dir);
}

function goToReview(n) {
    showReview(n);
}

// ===== ANIMATED COUNTERS =====
function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (counters.length === 0) return;

    const counterObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
}

function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-count'));
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1800;
    const start = performance.now();

    function update(timestamp) {
        const elapsed = timestamp - start;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target) + suffix;
        if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
}

// ===== GALLERY HOVER EFFECTS =====
function initGalleryHover() {
    const items = document.querySelectorAll('.gallery-item');
    items.forEach(item => {
        item.addEventListener('mouseenter', function () {
            this.style.transition = 'transform 0.35s ease, box-shadow 0.35s ease';
        });
    });
}

// ===== CONTACT FORM =====
function validateContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    // Floating label effect
    form.querySelectorAll('.form-group input, .form-group textarea, .form-group select').forEach(input => {
        input.addEventListener('focus', function () {
            this.style.borderColor = 'var(--primary-color, #1a5490)';
            this.style.boxShadow = '0 0 0 3px rgba(26, 84, 144, 0.12)';
        });
        input.addEventListener('blur', function () {
            this.style.borderColor = '';
            this.style.boxShadow = '';
        });
    });

    form.addEventListener('submit', function (e) {
        const submitBtn = document.getElementById('submit-btn');
        const btnText = document.getElementById('btn-text');
        const formStatus = document.getElementById('form-status');

        submitBtn.disabled = true;
        if (btnText) btnText.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        if (formStatus) formStatus.style.display = 'none';

        const formAction = form.getAttribute('action');
        if (formAction && formAction.includes('YOUR_FORM_ID')) {
            e.preventDefault();
            submitBtn.disabled = false;
            if (btnText) btnText.innerHTML = '<i class="fas fa-paper-plane"></i> Send Request';
            if (formStatus) {
                formStatus.style.display = 'block';
                formStatus.style.cssText = 'display:block; color:#c0392b; padding:1rem; background:#ffe6e6; border-radius:8px; margin-top:1rem;';
                formStatus.innerHTML = '<strong>⚠️ Form Not Configured</strong><br>Please set up Formspree first.<br><br>For now, please call <a href="tel:+14126891966" style="color:#c0392b;font-weight:bold;">(412) 689-1966</a> or book online.';
            }
        }
        // If valid Formspree ID, let it submit normally
    });
}

// ===== PHONE NUMBER CLICK TRACKING =====
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', function () {
        // Hook into your analytics here if needed
        console.log('Phone clicked:', this.getAttribute('href'));
    });
});

// ===== BACK TO TOP BUTTON =====
(function () {
    const btn = document.createElement('button');
    btn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    btn.setAttribute('aria-label', 'Back to top');
    btn.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 48px;
        height: 48px;
        border-radius: 50%;
        border: none;
        background: var(--primary-color, #1a5490);
        color: #fff;
        font-size: 1.1rem;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        opacity: 0;
        transform: translateY(10px);
        transition: opacity 0.3s ease, transform 0.3s ease;
        z-index: 999;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    document.body.appendChild(btn);

    window.addEventListener('scroll', function () {
        if (window.scrollY > 400) {
            btn.style.opacity = '1';
            btn.style.transform = 'translateY(0)';
        } else {
            btn.style.opacity = '0';
            btn.style.transform = 'translateY(10px)';
        }
    });

    btn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    btn.addEventListener('mouseenter', function () {
        this.style.background = 'var(--secondary-color, #dc143c)';
        this.style.transform = 'translateY(-2px)';
    });
    btn.addEventListener('mouseleave', function () {
        this.style.background = 'var(--primary-color, #1a5490)';
        this.style.transform = window.scrollY > 400 ? 'translateY(0)' : 'translateY(10px)';
    });
})();

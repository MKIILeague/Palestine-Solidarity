// Navigation Menu Toggle
const burger = document.querySelector('.nav__burger');
const nav = document.querySelector('.nav__links');
const navLinks = document.querySelectorAll('.nav__link');

burger?.addEventListener('click', () => {
    // Toggle Navigation
    nav.classList.toggle('nav__links--active');
    
    // Animate Links
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });

    // Burger Animation
    burger.classList.toggle('nav__burger--active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (nav?.classList.contains('nav__links--active') && 
        !e.target.closest('.nav__burger') && 
        !e.target.closest('.nav__links')) {
        nav.classList.remove('nav__links--active');
        burger.classList.remove('nav__burger--active');
        navLinks.forEach(link => {
            link.style.animation = '';
        });
    }
});

// News Ticker
class NewsTicker {
    constructor(element) {
        this.element = element;
        this.items = [
            "Humanitarian aid reaches affected areas in Gaza",
            "International community calls for immediate ceasefire",
            "Palestinian children need your support for education",
            "Join our upcoming peace rally this weekend",
            "New medical supplies delivered to hospitals"
        ];
        this.currentIndex = 0;
        this.init();
    }

    init() {
        this.element.innerHTML = `<div class="news__ticker-item">${this.items[0]}</div>`;
        this.startTicker();
    }

    startTicker() {
        setInterval(() => {
            this.currentIndex = (this.currentIndex + 1) % this.items.length;
            const tickerItem = this.element.querySelector('.news__ticker-item');
            tickerItem.style.animation = 'none';
            tickerItem.offsetHeight; // Trigger reflow
            tickerItem.textContent = this.items[this.currentIndex];
            tickerItem.style.animation = 'tickerSlide 2s ease-in-out';
        }, 5000);
    }
}

// Hero Slideshow
let slideIndex = 1;
let slideshowInterval;

function showSlides(n) {
    const slides = document.querySelectorAll('.hero__slide');
    const dots = document.querySelectorAll('.hero__dot');
    
    if (!slides.length) return; // Exit if no slides found

    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }
    
    slides.forEach(slide => slide.style.display = "none");
    dots.forEach(dot => dot.classList.remove('hero__dot--active'));
    
    slides[slideIndex - 1].style.display = "block";
    if (dots.length) {
        dots[slideIndex - 1].classList.add('hero__dot--active');
    }
}

function changeSlide(n) {
    clearInterval(slideshowInterval);
    showSlides(slideIndex += n);
    startSlideshow();
}

function currentSlide(n) {
    clearInterval(slideshowInterval);
    showSlides(slideIndex = n);
    startSlideshow();
}

function startSlideshow() {
    slideshowInterval = setInterval(() => {
        slideIndex++;
        showSlides(slideIndex);
    }, 5000);
}

// Initialize components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize News Ticker
    const newsTicker = document.querySelector('.news__ticker');
    if (newsTicker) {
        new NewsTicker(newsTicker);
    }

    // Initialize Slideshow
    const slides = document.querySelectorAll('.hero__slide');
    if (slides.length) {
        showSlides(slideIndex);
        startSlideshow();
    }

    // Initialize News Filters
    const filterButtons = document.querySelectorAll('.filter-btn');
    const newsItems = document.querySelectorAll('.news-item');

    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filter = button.getAttribute('data-filter');
                newsItems.forEach(item => {
                    const category = item.getAttribute('data-category');
                    if (filter === 'all' || filter === category) {
                        item.style.display = 'block';
                        item.style.animation = 'slideIn 0.5s ease-out';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // Initialize Form Validation
    const form = document.querySelector('.footer__form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = e.target.querySelector('.footer__input').value;
            
            if (validateEmail(email)) {
                showMessage('Thank you for subscribing!', 'success');
                e.target.reset();
            } else {
                showMessage('Please enter a valid email address.', 'error');
            }
        });
    }
});

// Form Validation Helper
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Message Display Helper
function showMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type === 'success' ? 'form-message--success' : 'form-message--error'}`;
    messageDiv.textContent = message;
    
    const form = document.querySelector('.footer__form');
    if (form) {
        form.appendChild(messageDiv);
        setTimeout(() => messageDiv.remove(), 3000);
    }
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes navLinkFade {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes tickerSlide {
        0% {
            opacity: 0;
            transform: translateY(20px);
        }
        10%, 90% {
            opacity: 1;
            transform: translateY(0);
        }
        100% {
            opacity: 0;
            transform: translateY(-20px);
        }
    }

    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

document.head.appendChild(style);



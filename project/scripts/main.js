/**
 * HYPEthread - Main JavaScript File
 * Now with proper inverted logo theming
 */

document.addEventListener("DOMContentLoaded", () => {
    // ======================
    // 1. THEME TOGGLE SYSTEM (Updated with inverted logo logic)
    // ======================
    const themeToggle = document.getElementById('themeToggle');
    const siteLogo = document.getElementById('siteLogo');

    function initTheme() {
            const savedTheme = localStorage.getItem('theme') || 
                                             (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
            document.body.classList.toggle('light-mode', savedTheme === 'light');
            updateThemeElements();
    }

    function updateThemeElements() {
            const isLightMode = document.body.classList.contains('light-mode');
            
            // Update toggle button icon
            if (themeToggle) {
                    themeToggle.textContent = isLightMode ? '🌙' : '☀️';
            }
            
            // Update logo (INVERTED logic - light logo in dark mode and vice versa)
            if (siteLogo) {
                    siteLogo.src = isLightMode 
                            ? 'images/hypethreaddark.png'  // Dark logo in light mode
                            : 'images/hypethreadlight.png'; // Light logo in dark mode
            }
    }

    if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                    document.body.classList.toggle('light-mode');
                    localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
                    updateThemeElements();
            });
    }

    // Initialize theme on load
    initTheme();

    // Watch for system preference changes
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', e => {
            if (!localStorage.getItem('theme')) {
                    document.body.classList.toggle('light-mode', e.matches);
                    updateThemeElements();
            }
    });

    // ======================
    // 2. MOBILE MENU TOGGLE
    // ======================
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if (menuToggle && navLinks) {
            menuToggle.addEventListener('click', () => {
                    navLinks.classList.toggle('show');
                    menuToggle.setAttribute('aria-expanded', navLinks.classList.contains('show'));
            });
    }

    // ======================
    // 3. DYNAMIC CONTENT
    // ======================
    const products = [
            { 
                    id: 1,
                    name: "2025 Hoodie Drop", 
                    price: "$59.99",
                    image: "hoodie.jpg",
                    trending: true
            },
            // ... rest of your product array
    ];

    function renderProducts() {
            const grid = document.getElementById('productGrid');
            if (!grid) return;

            const trendingProducts = products.filter(product => product.trending);
            
            grid.innerHTML = trendingProducts.map(product => `
                    <div class="item-card" data-id="${product.id}">
                            <img src="images/products/${product.image}" alt="${product.name}" loading="lazy">
                            <p>${product.name}</p>
                            <span class="price">${product.price}</span>
                            <button class="btn-wishlist">♡</button>
                    </div>
            `).join('');

            document.querySelectorAll('.btn-wishlist').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                            e.stopPropagation();
                            const productId = parseInt(btn.closest('.item-card').dataset.id);
                            toggleWishlist(productId);
                            btn.textContent = isInWishlist(productId) ? '♥' : '♡';
                    });
            });
    }

    // ======================
    // 4. WISHLIST SYSTEM
    // ======================
    function getWishlist() {
            return JSON.parse(localStorage.getItem('wishlist')) || [];
    }

    function toggleWishlist(productId) {
            const wishlist = getWishlist();
            const index = wishlist.indexOf(productId);
            
            if (index === -1) {
                    wishlist.push(productId);
            } else {
                    wishlist.splice(index, 1);
            }
            
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
            updateWishlistCount();
    }

    function isInWishlist(productId) {
            return getWishlist().includes(productId);
    }

    function updateWishlistCount() {
            const count = getWishlist().length;
            const counter = document.getElementById('wishlistCounter');
            if (counter) {
                    counter.textContent = count > 0 ? `(${count})` : '';
            }
    }

    // ======================
    // 6. CONTACT FORM HANDLING
    // ======================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    
                    const formData = {
                            name: contactForm.name.value.trim(),
                            email: contactForm.email.value.trim(),
                            message: contactForm.message.value.trim(),
                            timestamp: new Date().toISOString()
                    };

                    if (!formData.email.includes('@')) {
                            alert('Please enter a valid email address!');
                            return;
                    }

                    const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
                    submissions.push(formData);
                    localStorage.setItem('contactSubmissions', JSON.stringify(submissions));

                    const confirmation = document.createElement('div');
                    confirmation.className = 'form-confirmation';
                    confirmation.innerHTML = `
                            <p>Thanks, ${formData.name}! We'll contact you soon.</p>
                            <small>Message sent at ${new Date().toLocaleTimeString()}</small>
                    `;
                    contactForm.replaceWith(confirmation);
                    contactForm.reset();
            });
    }

    // Initialize all systems
    renderProducts();
    updateWishlistCount();

    setTimeout(() => {
            document.querySelectorAll('.item-card').forEach(card => {
                    const productId = parseInt(card.dataset.id);
                    const btn = card.querySelector('.btn-wishlist');
                    if (btn && isInWishlist(productId)) {
                            btn.textContent = '♥';
                    }
            });
    }, 100);
});

function formatPrice(amount) {
    return `$${parseFloat(amount).toFixed(2)}`;
}
// ======================
    // HERO CAROUSEL (Optimized)
    // ======================
    function initCarousel() {
        const carousel = document.getElementById('heroCarousel');
        if (!carousel) return;
        
        const slides = document.querySelectorAll('.hero-slide');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        const indicatorsContainer = document.getElementById('carouselIndicators');
        let currentIndex = 0;
        let slideInterval;
        
        // Create indicators
        function createIndicators() {
            indicatorsContainer.innerHTML = '';
            slides.forEach((_, index) => {
                const indicator = document.createElement('button');
                indicator.classList.add('indicator');
                indicator.setAttribute('aria-label', `Go to slide ${index + 1}`);
                if (index === 0) indicator.classList.add('active');
                indicator.addEventListener('click', () => goToSlide(index));
                indicatorsContainer.appendChild(indicator);
            });
        }
        
        // Update carousel position
        function updateCarousel() {
            carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
            document.querySelectorAll('.indicator').forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentIndex);
                indicator.setAttribute('aria-current', index === currentIndex);
            });
        }
        
        // Go to specific slide
        function goToSlide(index) {
            currentIndex = index;
            updateCarousel();
            resetAutoAdvance();
        }
        
        // Next slide
        function nextSlide() {
            currentIndex = (currentIndex + 1) % slides.length;
            updateCarousel();
            resetAutoAdvance();
        }
        
        // Previous slide
        function prevSlide() {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateCarousel();
            resetAutoAdvance();
        }
        
        // Auto-advance
        function startAutoAdvance() {
            slideInterval = setInterval(nextSlide, 5000);
        }
        
        function resetAutoAdvance() {
            clearInterval(slideInterval);
            startAutoAdvance();
        }
        
        // Initialize
        createIndicators();
        startAutoAdvance();
        
        // Event listeners
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);
        
        // Pause on hover
        carousel.addEventListener('mouseenter', () => clearInterval(slideInterval));
        carousel.addEventListener('mouseleave', startAutoAdvance);
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') nextSlide();
            if (e.key === 'ArrowLeft') prevSlide();
        });
    }

    // Initialize carousel
    initCarousel();
// In main.js (newsletter form)
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = newsletterForm.querySelector('input');
    if (!emailInput.value.includes('@')) {
      emailInput.classList.add('error');
      emailInput.setAttribute('aria-invalid', 'true');
      return;
    }
    alert('Subscribed!');
    newsletterForm.reset();
  });
}

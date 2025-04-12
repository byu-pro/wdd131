document.addEventListener("DOMContentLoaded", () => {
        // 1. THEME TOGGLE SYSTEM
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
            
            if (themeToggle) {
                themeToggle.textContent = isLightMode ? '🌙' : '☀️';
            }
            
            if (siteLogo) {
                siteLogo.src = isLightMode 
                    ? 'images/hypethread_dark.webp'
                    : 'images/hypethread_light.webp';
            }
        }
    
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                document.body.classList.toggle('light-mode');
                localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
                updateThemeElements();
            });
        }
    
        initTheme();
    
        window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', e => {
            if (!localStorage.getItem('theme')) {
                document.body.classList.toggle('light-mode', e.matches);
                updateThemeElements();
            }
        });
    
        // 2. MOBILE MENU TOGGLE
        const menuToggle = document.getElementById('menuToggle');
        const navLinks = document.getElementById('navLinks');
    
        if (menuToggle && navLinks) {
            menuToggle.addEventListener('click', () => {
                navLinks.classList.toggle('show');
                menuToggle.setAttribute('aria-expanded', navLinks.classList.contains('show'));
            });
        }
    
        // 3. WISHLIST SYSTEM
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
    
        // 4. CONTACT FORM
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
    
        // 5. HERO CAROUSEL
        function initCarousel() {
            const carousel = document.getElementById('heroCarousel');
            if (!carousel) return;
            
            const slides = document.querySelectorAll('.hero-slide');
            const prevBtn = document.querySelector('.prev-btn');
            const nextBtn = document.querySelector('.next-btn');
            const indicatorsContainer = document.getElementById('carouselIndicators');
            let currentIndex = 0;
            let slideInterval;
            
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
            
            function updateCarousel() {
                carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
                document.querySelectorAll('.indicator').forEach((indicator, index) => {
                    indicator.classList.toggle('active', index === currentIndex);
                    indicator.setAttribute('aria-current', index === currentIndex);
                });
            }
            
            function goToSlide(index) {
                currentIndex = index;
                updateCarousel();
                resetAutoAdvance();
            }
            
            function nextSlide() {
                currentIndex = (currentIndex + 1) % slides.length;
                updateCarousel();
                resetAutoAdvance();
            }
            
            function prevSlide() {
                currentIndex = (currentIndex - 1 + slides.length) % slides.length;
                updateCarousel();
                resetAutoAdvance();
            }
            
            function startAutoAdvance() {
                slideInterval = setInterval(nextSlide, 5000);
            }
            
            function resetAutoAdvance() {
                clearInterval(slideInterval);
                startAutoAdvance();
            }
            
            createIndicators();
            startAutoAdvance();
            
            if (nextBtn) nextBtn.addEventListener('click', nextSlide);
            if (prevBtn) prevBtn.addEventListener('click', prevSlide);
            
            carousel.addEventListener('mouseenter', () => clearInterval(slideInterval));
            carousel.addEventListener('mouseleave', startAutoAdvance);
            
            document.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowRight') nextSlide();
                if (e.key === 'ArrowLeft') prevSlide();
            });
        }
    
        initCarousel();
    
        // 6. NEWSLETTER FORM
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
    
        // Initialize wishlist
        updateWishlistCount();
    });
    
    function formatPrice(amount) {
        return `$${parseFloat(amount).toFixed(2)}`;
    }
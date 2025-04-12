/**
 * HYPEthread - Main JavaScript File
 * Implements all dynamic functionality for W06 Project requirements
 */

document.addEventListener("DOMContentLoaded", () => {
    // ======================
    // 1. THEME TOGGLE SYSTEM
    // ======================
    const themeToggle = document.getElementById('themeToggle');
    function initTheme() {
      const savedTheme = localStorage.getItem('theme') || 
                        (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
      document.body.classList.toggle('light-mode', savedTheme === 'light');
      updateThemeIcon();
    }
  
    function updateThemeIcon() {
      if (themeToggle) {
        themeToggle.textContent = document.body.classList.contains('light-mode') ? '🌙' : '☀️';
      }
    }
  
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
        updateThemeIcon();
      });
    }
  
    // Initialize theme on load
    initTheme();
  
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
    // Product data array (meets array/object requirement)
    const products = [
      { 
        id: 1,
        name: "2025 Hoodie Drop", 
        price: "$59.99",
        image: "hoodie.jpg",
        trending: true
      },
      { 
        id: 2,
        name: "Limited Sneakers", 
        price: "$129.99",
        image: "sneakers.jpg",
        trending: true
      },
      { 
        id: 3,
        name: "Graphic Tee", 
        price: "$29.99",
        image: "shirt.jpg",
        trending: false
      }
    ];
  
    // Render products to grid (DOM manipulation)
    function renderProducts() {
      const grid = document.getElementById('productGrid');
      if (!grid) return;
  
      // Filter and map (array methods)
      const trendingProducts = products.filter(product => product.trending);
      
      grid.innerHTML = trendingProducts.map(product => `
        <div class="item-card" data-id="${product.id}">
          <img src="images/products/${product.image}" alt="${product.name}" loading="lazy">
          <p>${product.name}</p>
          <span class="price">${product.price}</span>
          <button class="btn-wishlist">♡</button>
        </div>
      `).join('');
  
      // Add event listeners to new elements
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
    // 5. TIME-BASED GREETING
    // ======================
    function getGreetingMessage() {
      const hour = new Date().getHours();
      let timeOfDay;
      
      // Conditional logic requirement
      if (hour < 12) timeOfDay = "morning";
      else if (hour < 18) timeOfDay = "afternoon";
      else timeOfDay = "evening";
      
      return `Good ${timeOfDay}, fashion icon! Welcome to HYPEthread.`;
    }
  
    // Insert greeting on homepage
    if (window.location.pathname.endsWith("index.html") || window.location.pathname === "/") {
      const greeting = document.createElement('p');
      greeting.className = 'dynamic-greeting';
      greeting.textContent = getGreetingMessage();
      document.querySelector('main').prepend(greeting);
    }
  
    // ======================
    // 6. CONTACT FORM HANDLING
    // ======================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Form data object
        const formData = {
          name: contactForm.name.value.trim(),
          email: contactForm.email.value.trim(),
          message: contactForm.message.value.trim(),
          timestamp: new Date().toISOString()
        };
  
        // Validation (conditional logic)
        if (!formData.email.includes('@')) {
          alert('Please enter a valid email address!');
          return;
        }
  
        // Save to localStorage
        const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
        submissions.push(formData);
        localStorage.setItem('contactSubmissions', JSON.stringify(submissions));
  
        // Feedback to user (DOM manipulation)
        const confirmation = document.createElement('div');
        confirmation.className = 'form-confirmation';
        confirmation.innerHTML = `
          <p>Thanks, ${formData.name}! We'll contact you soon.</p>
          <small>Message sent at ${new Date().toLocaleTimeString()}</small>
        `;
        contactForm.replaceWith(confirmation);
  
        // Reset form
        contactForm.reset();
      });
    }
  
    // ======================
    // INITIALIZE ALL SYSTEMS
    // ======================
    renderProducts();
    updateWishlistCount();
  
    // Set initial wishlist button states
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
  
  // ======================
  // HELPER FUNCTIONS
  // ======================
  function formatPrice(amount) {
    return `$${parseFloat(amount).toFixed(2)}`;
  }
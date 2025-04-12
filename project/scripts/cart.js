document.addEventListener("DOMContentLoaded", () => {
    // DOM Elements
    const cartItems = document.getElementById('cartItems');
    const subtotalEl = document.getElementById('subtotal');
    const shippingEl = document.getElementById('shipping');
    const totalEl = document.getElementById('total');
    const checkoutBtn = document.getElementById('checkoutBtn');
    const cartCounter = document.getElementById('cartCounter');
  
    // Load cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
    // Render cart items
    function renderCart() {
      if (cart.length === 0) {
        cartItems.innerHTML = `
          <div class="empty-cart">
            <img src="images/empty-cart.svg" alt="Empty cart" class="empty-cart-icon">
            <p>Your cart is empty</p>
            <a href="products.html" class="btn-primary">Browse Products</a>
          </div>
        `;
        checkoutBtn.disabled = true;
        updateCartSummary(0);
        updateCartCounter();
        return;
      }
  
      cartItems.innerHTML = cart.map(item => `
        <div class="cart-item" data-id="${item.id}">
          <img src="images/products/${item.image}" alt="${item.name}" class="cart-item-img">
          <div class="cart-item-details">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <div class="cart-item-controls">
              <div class="quantity-selector">
                <button class="quantity-btn minus">−</button>
                <span class="quantity">${item.quantity}</span>
                <button class="quantity-btn plus">+</button>
              </div>
              <span class="item-price">$${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          </div>
          <button class="remove-item" aria-label="Remove item">
            &times;
          </button>
        </div>
      `).join('');
  
      // Add event listeners
      document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
        btn.addEventListener('click', decreaseQuantity);
      });
  
      document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
        btn.addEventListener('click', increaseQuantity);
      });
  
      document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', removeItem);
      });
  
      updateCartSummary();
      updateCartCounter();
      checkoutBtn.disabled = false;
    }
  
    // Update cart summary
    function updateCartSummary() {
      const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const shipping = subtotal > 50 ? 0 : 5.99;
      const total = subtotal + shipping;
  
      subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
      shippingEl.textContent = subtotal > 50 ? 'FREE' : `$${shipping.toFixed(2)}`;
      totalEl.textContent = `$${total.toFixed(2)}`;
    }
  
    // Update cart counter
    function updateCartCounter() {
      const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
      cartCounter.textContent = totalItems > 0 ? `(${totalItems})` : '';
    }
  
    // Quantity handlers
    function decreaseQuantity(e) {
      const itemId = parseInt(e.target.closest('.cart-item').dataset.id);
      const itemIndex = cart.findIndex(item => item.id === itemId);
  
      if (cart[itemIndex].quantity > 1) {
        cart[itemIndex].quantity--;
      } else {
        cart.splice(itemIndex, 1);
      }
  
      saveCart();
      renderCart();
    }
  
    function increaseQuantity(e) {
      const itemId = parseInt(e.target.closest('.cart-item').dataset.id);
      const itemIndex = cart.findIndex(item => item.id === itemId);
      cart[itemIndex].quantity++;
      saveCart();
      renderCart();
    }
  
    function removeItem(e) {
      const itemId = parseInt(e.target.closest('.cart-item').dataset.id);
      cart = cart.filter(item => item.id !== itemId);
      saveCart();
      renderCart();
    }
  
    // Save cart to localStorage
    function saveCart() {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  
    // Checkout handler
    checkoutBtn.addEventListener('click', () => {
      alert('Checkout functionality would be implemented here!\nTotal: ' + totalEl.textContent);
      // In a real implementation, this would redirect to a checkout page
    });
  
    // Initialize
    renderCart();
  });
  document.addEventListener("DOMContentLoaded", () => {
    // Cart counter element
    const cartCounter = document.querySelector('.cart-count');
    
    // Add to cart functionality
    document.querySelectorAll('.add-to-cart').forEach(button => {
      button.addEventListener('click', function() {
        const productId = parseInt(this.dataset.id);
        addToCart(productId);
      });
    });
  
    function addToCart(productId) {
      // This would be replaced with your actual product data
      const product = {
        id: productId,
        name: document.querySelector(`.add-to-cart[data-id="${productId}"]`).closest('.product-info').querySelector('h3').textContent,
        price: parseFloat(document.querySelector(`.add-to-cart[data-id="${productId}"]`).closest('.product-info').querySelector('.price').textContent.replace('$', '')),
        image: document.querySelector(`.add-to-cart[data-id="${productId}"]`).closest('.product-card').querySelector('img').src.split('/').pop()
      };
      
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      const existingItem = cart.find(item => item.id === productId);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({
          ...product,
          quantity: 1
        });
      }
      
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartCounter();
      
      // Visual feedback
      const button = document.querySelector(`.add-to-cart[data-id="${productId}"]`);
      button.textContent = 'Added!';
      setTimeout(() => {
        button.textContent = 'Add to Cart';
      }, 1500);
    }
  
    function updateCartCounter() {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
      if (cartCounter) {
        cartCounter.textContent = totalItems > 0 ? `(${totalItems})` : '';
      }
    }
  
    // Initialize cart counter
    updateCartCounter();
  });
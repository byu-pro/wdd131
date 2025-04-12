document.addEventListener("DOMContentLoaded", () => {
  const products = [
    // Your complete products array (keep all existing products)
    // Make sure several have trending: true for the featured section
    {
      id: 1,
      name: "Oversized Denim Jacket",
      price: 79.99,
      category: "outerwear",
      image: "denim-jacket.webp",
      description: "Washed denim jacket with distressed details",
      trending: true
    },
    {
      id: 2,
      name: "Utility Cargo Pants",
      price: 54.99,
      category: "bottoms",
      image: "cargo-pants.webp",
      description: "Black utility cargo pants with multiple pockets",
      trending: true
    },
    {
      id: 3,
      name: "Signature Joggers",
      price: 49.99,
      category: "bottoms",
      image: "trending-joggers.webp",
      description: "Gray signature joggers with elastic waistband",
      trending: true
    }
    // ... (keep all your other product objects)
  ];

  // DOM elements - only targeting the featured products section
  const productGrid = document.getElementById('productGrid');
  const cartCounter = document.querySelector('.cart-count');

  // Render only trending products for featured section
  function renderFeaturedProducts() {
    // Clear existing content
    productGrid.innerHTML = '';
    
    // Filter trending products
    const trendingProducts = products.filter(product => product.trending);
    
    // Show message if no trending products
    if (trendingProducts.length === 0) {
      productGrid.innerHTML = '<p class="no-products">No trending items available</p>';
      return;
    }

    // Create product cards for trending items
    trendingProducts.forEach(product => {
      const productCard = document.createElement('div');
      productCard.className = 'product-card';
      productCard.innerHTML = `
        <div class="product-image-container">
          <img src="images/${product.image}" 
               alt="${product.name}" 
               loading="lazy"
               width="400"
               height="500">
          <button class="quick-view" aria-label="Quick view ${product.name}">Quick View</button>
        </div>
        <div class="product-info">
          <h3>${product.name}</h3>
          <p class="price">$${product.price.toFixed(2)}</p>
          <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        </div>
      `;
      productGrid.appendChild(productCard);
    });

    // Initialize cart button event listeners
    initializeCartButtons();
  }

  // Cart functionality
  function initializeCartButtons() {
    document.querySelectorAll('.add-to-cart').forEach(button => {
      button.addEventListener('click', function(e) {
        const productId = parseInt(e.target.dataset.id);
        addToCart(productId);
      });
    });
  }

  function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1
      });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCounter();
    
    // Visual feedback
    const button = document.querySelector(`.add-to-cart[data-id="${productId}"]`);
    if (button) {
      const originalText = button.textContent;
      button.textContent = 'Added!';
      button.disabled = true;
      setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
      }, 1500);
    }
  }

  function updateCartCounter() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCounter) {
      cartCounter.textContent = totalItems > 0 ? `(${totalItems})` : '';
    }
  }

  // Initialize featured products and cart
  renderFeaturedProducts();
  updateCartCounter();
});
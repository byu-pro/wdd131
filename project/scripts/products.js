document.addEventListener("DOMContentLoaded", () => {
    // Product data array
    const products = [
      {
        id: 1,
        name: "OG Logo Hoodie",
        price: 59.99,
        category: "hoodies",
        image: "hoodie.jpg",
        description: "Our signature hoodie with embroidered logo",
        trending: true
      },
      {
        id: 2,
        name: "High-Top Sneakers",
        price: 129.99,
        category: "footwear",
        image: "sneakers.jpg",
        description: "Limited edition high-top sneakers",
        trending: true
      },
      {
        id: 3,
        name: "Graphic Tee",
        price: 29.99,
        category: "tees",
        image: "tee.jpg",
        description: "100% cotton graphic t-shirt",
        trending: false
      },
      {
        id: 4,
        name: "Cargo Pants",
        price: 49.99,
        category: "bottoms",
        image: "pants.jpg",
        description: "Utility cargo pants with multiple pockets",
        trending: true
      },
      {
        id: 5,
        name: "Dad Hat",
        price: 24.99,
        category: "accessories",
        image: "hat.jpg",
        description: "Structured dad hat with curved brim",
        trending: false
      },
      {
        id: 6,
        name: "Coach Jacket",
        price: 79.99,
        category: "outerwear",
        image: "jacket.jpg",
        description: "Lightweight coach jacket with water resistance",
        trending: true
      }
    ];
  
    // DOM elements
    const productGrid = document.getElementById('fullProductGrid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const cartCounter = document.getElementById('cartCounter');
  
    // Render all products
    function renderProducts(category = 'all') {
      productGrid.innerHTML = '';
      
      const filteredProducts = category === 'all' 
        ? products 
        : products.filter(product => product.category === category);
      
      if (filteredProducts.length === 0) {
        productGrid.innerHTML = '<p class="no-products">No products found in this category</p>';
        return;
      }
  
      filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'item-card';
        productCard.innerHTML = `
          <img src="images/products/${product.image}" alt="${product.name}" loading="lazy">
          <div class="product-info">
            <h3>${product.name}</h3>
            <p class="product-desc">${product.description}</p>
            <div class="product-footer">
              <span class="price">$${product.price.toFixed(2)}</span>
              <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
          </div>
        `;
        productGrid.appendChild(productCard);
      });
  
      // Add event listeners to new cart buttons
      document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
      });
    }
  
    // Add to cart function
    function addToCart(e) {
      const productId = parseInt(e.target.dataset.id);
      const product = products.find(p => p.id === productId);
      
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
      e.target.textContent = 'Added!';
      e.target.disabled = true;
      setTimeout(() => {
        e.target.textContent = 'Add to Cart';
        e.target.disabled = false;
      }, 1500);
    }
  
    // Update cart counter
    function updateCartCounter() {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
      cartCounter.textContent = totalItems > 0 ? `(${totalItems})` : '';
    }
  
    // Filter products by category
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        renderProducts(button.dataset.category);
      });
    });
  
    // Initialize
    renderProducts();
    updateCartCounter();
  });
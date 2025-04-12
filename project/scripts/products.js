document.addEventListener("DOMContentLoaded", () => {
  const products = [
    // Hoodies
    {
      id: 1,
      name: "OG Logo Hoodie",
      price: 59.99,
      category: "hoodies",
      image: "hoodie.webp",
      description: "Our signature hoodie with embroidered logo",
      trending: true
    },
    {
      id: 2,
      name: "Tech Zip Hoodie",
      price: 64.99,
      category: "hoodies",
      image: "tech-hoodie.webp",
      description: "Slim fit zip-up with breathable tech fabric",
      trending: false
    },
    {
      id: 3,
      name: "Tie-Dye Hoodie",
      price: 54.99,
      category: "hoodies",
      image: "tie-dye-hoodie.webp",
      description: "Trippy colors with a retro HYPEthread logo",
      trending: true
    },
    {
      id: 4,
      name: "Oversized Hoodie",
      price: 62.99,
      category: "hoodies",
      image: "oversized-hoodie.webp",
      description: "Cozy oversized pullover for maximum comfort",
      trending: false
    },

    // Tees
    {
      id: 5,
      name: "Graphic Tee",
      price: 29.99,
      category: "tees",
      image: "tee.webp",
      description: "100% cotton graphic t-shirt",
      trending: false
    },
    {
      id: 6,
      name: "Oversized Tee",
      price: 34.99,
      category: "tees",
      image: "oversized-tee.webp",
      description: "Relaxed-fit oversized t-shirt with front print",
      trending: true
    },
    {
      id: 7,
      name: "Minimalist Tee",
      price: 27.99,
      category: "tees",
      image: "minimalist-tee.webp",
      description: "Clean and simple logo tee",
      trending: false
    },
    {
      id: 8,
      name: "HYPE Core Tee",
      price: 32.99,
      category: "tees",
      image: "core-tee.webp",
      description: "Core line tee with signature embroidery",
      trending: true
    },

    // Footwear
    {
      id: 9,
      name: "High-Top Sneakers",
      price: 129.99,
      category: "footwear",
      image: "sneakers.webp",
      description: "Limited edition high-top sneakers",
      trending: true
    },
    {
      id: 10,
      name: "Low-Top Kicks",
      price: 109.99,
      category: "footwear",
      image: "lowtop-sneakers.webp",
      description: "Sleek and comfy low-top trainers",
      trending: false
    },
    {
      id: 11,
      name: "Street Skater Shoes",
      price: 89.99,
      category: "footwear",
      image: "skater-shoes.webp",
      description: "Flat-soled skate shoes with grip",
      trending: false
    },
    {
      id: 12,
      name: "Chunky Sneakers",
      price: 139.99,
      category: "footwear",
      image: "chunky-sneakers.webp",
      description: "Thick-soled trend-forward sneakers",
      trending: true
    },

    // Bottoms
    {
      id: 13,
      name: "Cargo Pants",
      price: 49.99,
      category: "bottoms",
      image: "pants.webp",
      description: "Utility cargo pants with multiple pockets",
      trending: true
    },
    {
      id: 14,
      name: "Track Pants",
      price: 44.99,
      category: "bottoms",
      image: "track-pants.webp",
      description: "Athletic track pants with side stripes",
      trending: false
    },
    {
      id: 15,
      name: "Distressed Jeans",
      price: 69.99,
      category: "bottoms",
      image: "distressed-jeans.webp",
      description: "Faded jeans with knee rips",
      trending: true
    },
    {
      id: 16,
      name: "Chino Joggers",
      price: 39.99,
      category: "bottoms",
      image: "chino-joggers.webp",
      description: "Smart casual joggers with stretch",
      trending: false
    },

    // Accessories
    {
      id: 17,
      name: "Dad Hat",
      price: 24.99,
      category: "accessories",
      image: "hat.webp",
      description: "Structured dad hat with curved brim",
      trending: false
    },
    {
      id: 18,
      name: "Bucket Hat",
      price: 22.99,
      category: "accessories",
      image: "bucket-hat.webp",
      description: "Casual bucket hat with logo patch",
      trending: false
    },
    {
      id: 19,
      name: "Logo Beanie",
      price: 19.99,
      category: "accessories",
      image: "beanie.webp",
      description: "Stretch-knit beanie with HYPEthread patch",
      trending: false
    },
    {
      id: 20,
      name: "Crossbody Bag",
      price: 34.99,
      category: "accessories",
      image: "crossbody-bag.webp",
      description: "Compact streetwear-style sling bag",
      trending: true
    },

    // Outerwear
    {
      id: 21,
      name: "Coach Jacket",
      price: 79.99,
      category: "outerwear",
      image: "jacket.webp",
      description: "Lightweight coach jacket with water resistance",
      trending: true
    },
    {
      id: 22,
      name: "Denim Jacket",
      price: 89.99,
      category: "outerwear",
      image: "denim-jacket.webp",
      description: "Washed denim jacket with distressed details",
      trending: false
    },
    {
      id: 23,
      name: "Puffer Vest",
      price: 59.99,
      category: "outerwear",
      image: "puffer-vest.webp",
      description: "Sleeveless insulated vest for layering",
      trending: false
    },
    {
      id: 24,
      name: "Windbreaker",
      price: 69.99,
      category: "outerwear",
      image: "windbreaker.webp",
      description: "Light windbreaker with contrast zips",
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
  
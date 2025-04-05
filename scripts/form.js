// Product list to populate dropdown
const products = [
    { id: 'prod1', name: 'Wireless Mouse' },
    { id: 'prod2', name: 'Mechanical Keyboard' },
    { id: 'prod3', name: 'HD Monitor' },
    { id: 'prod4', name: 'USB-C Hub' }
  ];
  
  window.addEventListener('DOMContentLoaded', () => {
    const productSelect = document.getElementById('product');
  
    products.forEach(product => {
      const option = document.createElement('option');
      option.value = product.name;
      option.textContent = product.name;
      productSelect.appendChild(option);
    });
  });
  
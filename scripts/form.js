// Product list to populate dropdown
const products = [
  { id: 'prod1', name: 'Wireless Mouse' },
  { id: 'prod2', name: 'Mechanical Keyboard' },
  { id: 'prod3', name: 'HD Monitor' },
  { id: 'prod4', name: 'USB-C Hub' }
];

// Form validation messages
const validationMessages = {
  product: 'Please select a product',
  rating: 'Please rate the product',
  installDate: {
    required: 'Please select installation date',
    future: 'Date cannot be in the future'
  },
  features: 'Please select at least one feature'
};

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const form = document.querySelector('form');
  const productSelect = document.getElementById('product');
  const installDateInput = document.getElementById('installDate');
  const featuresCheckboxes = document.querySelectorAll('input[name="features"]');
  const ratingInputs = document.querySelectorAll('input[name="rating"]');

  // 1. Populate product dropdown
  populateProducts();
  
  // 2. Set up event listeners
  setupEventListeners();
  
  // 3. Focus first element
  productSelect.focus();

  function populateProducts() {
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.disabled = true;
    defaultOption.selected = true;
    defaultOption.textContent = 'Choose a Product...';
    productSelect.appendChild(defaultOption);

    products.forEach(product => {
      const option = document.createElement('option');
      option.value = product.id;
      option.textContent = product.name;
      productSelect.appendChild(option);
    });
  }

  function setupEventListeners() {
    // Real-time validation
    productSelect.addEventListener('change', validateProduct);
    installDateInput.addEventListener('change', validateInstallDate);
    featuresCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', validateFeatures);
    });
    ratingInputs.forEach(radio => {
      radio.addEventListener('change', validateRating);
    });

    // Form submission
    form.addEventListener('submit', handleFormSubmit);
  }

  // Validation functions
  function validateProduct() {
    const errorElement = document.getElementById('product-error') || createErrorElement(productSelect);
    if (productSelect.value === '') {
      showError(errorElement, validationMessages.product);
      return false;
    }
    hideError(errorElement);
    return true;
  }

  function validateInstallDate() {
    const errorElement = document.getElementById('installDate-error') || createErrorElement(installDateInput);
    const selectedDate = new Date(installDateInput.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!installDateInput.value) {
      showError(errorElement, validationMessages.installDate.required);
      return false;
    } else if (selectedDate > today) {
      showError(errorElement, validationMessages.installDate.future);
      return false;
    }
    hideError(errorElement);
    return true;
  }

  function validateFeatures() {
    const checkedFeatures = Array.from(featuresCheckboxes).some(cb => cb.checked);
    const firstCheckbox = featuresCheckboxes[0];
    const errorElement = document.getElementById('features-error') || createErrorElement(firstCheckbox.parentElement.parentElement);

    if (!checkedFeatures) {
      showError(errorElement, validationMessages.features);
      return false;
    }
    hideError(errorElement);
    return true;
  }

  function validateRating() {
    const checkedRating = Array.from(ratingInputs).some(radio => radio.checked);
    const firstRating = ratingInputs[0];
    const errorElement = document.getElementById('rating-error') || createErrorElement(firstRating.parentElement);

    if (!checkedRating) {
      showError(errorElement, validationMessages.rating);
      return false;
    }
    hideError(errorElement);
    return true;
  }

  // Helper functions
  function createErrorElement(inputElement) {
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.id = `${inputElement.id}-error`;
    inputElement.parentNode.insertBefore(errorElement, inputElement.nextSibling);
    return errorElement;
  }

  function showError(element, message) {
    element.textContent = message;
    element.style.display = 'block';
    element.setAttribute('role', 'alert');
    element.previousElementSibling.classList.add('error');
  }

  function hideError(element) {
    if (element) {
      element.style.display = 'none';
      element.removeAttribute('role');
      element.previousElementSibling?.classList.remove('error');
    }
  }

  // Form submission handler
  function handleFormSubmit(e) {
    e.preventDefault();
    
    // Validate all fields
    const isProductValid = validateProduct();
    const isDateValid = validateInstallDate();
    const isFeaturesValid = validateFeatures();
    const isRatingValid = validateRating();

    if (isProductValid && isDateValid && isFeaturesValid && isRatingValid) {
      // Prepare form data
      const formData = {
        productId: productSelect.value,
        productName: productSelect.options[productSelect.selectedIndex].text,
        rating: document.querySelector('input[name="rating"]:checked')?.value,
        installDate: installDateInput.value,
        features: Array.from(featuresCheckboxes)
          .filter(cb => cb.checked)
          .map(cb => cb.value),
        review: document.getElementById('review').value,
        username: document.getElementById('username').value,
        timestamp: new Date().toISOString()
      };

      // In a real app, you would send this to a server
      console.log('Form data valid:', formData);
      
      // Show success message (in a real app, you might redirect)
      alert('Thank you for your review!');
      form.reset();
      
      // Reset errors
      document.querySelectorAll('.error-message').forEach(el => hideError(el));
    } else {
      // Scroll to first error
      const firstError = document.querySelector('.error-message[style="display: block;"]');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }

  // Initialize date picker with max date as today
  const today = new Date().toISOString().split('T')[0];
  installDateInput.setAttribute('max', today);
});
// Constants
const products = [
  { id: 'prod1', name: 'Wireless Mouse' },
  { id: 'prod2', name: 'Mechanical Keyboard' },
  { id: 'prod3', name: 'HD Monitor' },
  { id: 'prod4', name: 'USB-C Hub' }
];

const validationMessages = {
  product: 'Please select a product',
  rating: 'Please rate the product',
  installDate: {
    required: 'Please select installation date',
    future: 'Date cannot be in the future',
    invalid: 'Please enter a valid date'
  },
  features: 'Please select at least one feature'
};

const errorClasses = {
  container: 'error-container',
  message: 'error-message',
  field: 'error-field'
};

// Main initialization
document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const form = document.querySelector('form');
  const productSelect = document.getElementById('product');
  const installDateInput = document.getElementById('installDate');
  const featuresCheckboxes = document.querySelectorAll('input[name="features"]');
  const ratingInputs = document.querySelectorAll('input[name="rating"]');

  // Initialize
  populateProducts();
  setupEventListeners();
  initializeDatePicker();
  productSelect.focus();

  // Functions
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

  function initializeDatePicker() {
    const today = new Date().toISOString().split('T')[0];
    installDateInput.setAttribute('max', today);
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
    today.setHours(23, 59, 59, 999);

    if (!installDateInput.value) {
      showError(errorElement, validationMessages.installDate.required);
      return false;
    }
    
    if (isNaN(selectedDate.getTime())) {
      showError(errorElement, validationMessages.installDate.invalid);
      return false;
    }

    if (selectedDate > today) {
      showError(errorElement, validationMessages.installDate.future);
      return false;
    }
    
    hideError(errorElement);
    return true;
  }

  function validateFeatures() {
    const checkedFeatures = Array.from(featuresCheckboxes).filter(cb => cb.checked);
    const errorElement = document.getElementById('features-error') || 
                        createErrorElement(featuresCheckboxes[0].closest('.checkbox-group'));

    if (checkedFeatures.length < 1) {
      showError(errorElement, validationMessages.features);
      return false;
    }
    
    hideError(errorElement);
    return true;
  }

  function validateRating() {
    const rating = document.querySelector('input[name="rating"]:checked')?.value;
    const errorElement = document.getElementById('rating-error') || 
                        createErrorElement(ratingInputs[0].parentElement);

    if (!rating) {
      showError(errorElement, validationMessages.rating);
      return false;
    }
    
    hideError(errorElement);
    return true;
  }

  // Helper functions
  function createErrorElement(inputElement) {
    const errorElement = document.createElement('div');
    errorElement.className = errorClasses.message;
    errorElement.id = `${inputElement.id}-error`;
    inputElement.parentNode.insertBefore(errorElement, inputElement.nextSibling);
    return errorElement;
  }

  function showError(element, message) {
    element.textContent = message;
    element.classList.add(errorClasses.message);
    element.style.display = 'block';
    element.setAttribute('role', 'alert');
    
    const input = element.previousElementSibling.querySelector('input, select, textarea') || 
                 element.previousElementSibling;
    input.classList.add(errorClasses.field);
    input.setAttribute('aria-invalid', 'true');
  }

  function hideError(element) {
    if (element) {
      element.style.display = 'none';
      element.removeAttribute('role');
      
      const input = element.previousElementSibling.querySelector('input, select, textarea') || 
                   element.previousElementSibling;
      input.classList.remove(errorClasses.field);
      input.removeAttribute('aria-invalid');
    }
  }

  function sanitizeInput(value) {
    if (!value) return value;
    const div = document.createElement('div');
    div.textContent = value;
    return div.innerHTML;
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
      const formData = new FormData(form);
      const data = {
        product: {
          id: productSelect.value,
          name: productSelect.options[productSelect.selectedIndex].text
        },
        rating: formData.get('rating'),
        installDate: formData.get('installDate'),
        features: formData.getAll('features'),
        review: sanitizeInput(formData.get('review')),
        username: sanitizeInput(formData.get('username')),
        timestamp: new Date().toISOString()
      };

      // For GET method forms
      if (form.method.toLowerCase() === 'get') {
        const params = new URLSearchParams();
        Object.entries(data).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            value.forEach(v => params.append(key, v));
          } else if (value) {
            params.append(key, value);
          }
        });
        window.location.href = `${form.action}?${params.toString()}`;
        return;
      }

      console.log('Form data:', data);
      showSuccessMessage();
      form.reset();
      document.querySelectorAll('.error-message').forEach(el => hideError(el));
    } else {
      const firstError = document.querySelector(`.${errorClasses.message}[style="display: block;"]`);
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }

  function showSuccessMessage() {
    const existingSuccess = document.querySelector('.success-message');
    if (existingSuccess) existingSuccess.remove();
    
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="#4CAF50">
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
      </svg>
      <h3>Thank you for your review!</h3>
      <p>Your feedback has been submitted successfully.</p>
    `;
    form.parentNode.insertBefore(successDiv, form.nextSibling);
    
    setTimeout(() => {
      successDiv.style.opacity = '0';
      setTimeout(() => successDiv.remove(), 300);
    }, 5000);
  }

  // Cleanup function
  return function cleanup() {
    productSelect.removeEventListener('change', validateProduct);
    installDateInput.removeEventListener('change', validateInstallDate);
    featuresCheckboxes.forEach(checkbox => {
      checkbox.removeEventListener('change', validateFeatures);
    });
    ratingInputs.forEach(radio => {
      radio.removeEventListener('change', validateRating);
    });
    form.removeEventListener('submit', handleFormSubmit);
  };
});
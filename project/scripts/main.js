document.addEventListener("DOMContentLoaded", () => {
    // Home page greeting
    if (window.location.pathname.includes("index.html") || window.location.pathname === "/") {
      const greeting = document.createElement("p");
      greeting.textContent = getGreetingMessage();
      greeting.style.textAlign = "center";
      greeting.style.marginTop = "1rem";
      document.querySelector("main").appendChild(greeting);
    }
  
    // Contact form logic
    const form = document.getElementById("contactForm");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const userData = {
          name: form.name.value.trim(),
          email: form.email.value.trim(),
          message: form.message.value.trim()
        };
  
        // Store in localStorage
        localStorage.setItem("contactSubmission", JSON.stringify(userData));
  
        // Alert user
        alert(`Thanks, ${userData.name}! We'll be in touch.`);
  
        // Reset form
        form.reset();
      });
    }
  });
  
  // Greeting helper using conditional logic and template literals
  function getGreetingMessage() {
    const hour = new Date().getHours();
    let timeOfDay = "";
  
    if (hour < 12) timeOfDay = "morning";
    else if (hour < 18) timeOfDay = "afternoon";
    else timeOfDay = "evening";
  
    return `Good ${timeOfDay}, fashion icon! Welcome to HYPEthread.`;
  }
  document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");
  
    if (toggle && navLinks) {
      toggle.addEventListener("click", () => {
        navLinks.classList.toggle("show");
      });
    }
  
    // Existing greeting + form logic...
    if (window.location.pathname.includes("index.html") || window.location.pathname === "/") {
      const greeting = document.createElement("p");
      greeting.textContent = getGreetingMessage();
      greeting.style.textAlign = "center";
      greeting.style.marginTop = "1rem";
      document.querySelector("main").appendChild(greeting);
    }
  
    const form = document.getElementById("contactForm");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const userData = {
          name: form.name.value.trim(),
          email: form.email.value.trim(),
          message: form.message.value.trim()
        };
  
        localStorage.setItem("contactSubmission", JSON.stringify(userData));
        alert(`Thanks, ${userData.name}! We'll be in touch.`);
        form.reset();
      });
    }
  });
  
  function getGreetingMessage() {
    const hour = new Date().getHours();
    let timeOfDay = "";
  
    if (hour < 12) timeOfDay = "morning";
    else if (hour < 18) timeOfDay = "afternoon";
    else timeOfDay = "evening";
  
    return `Good ${timeOfDay}, fashion icon! Welcome to HYPEthread.`;
  }
    
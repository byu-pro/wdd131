// Hamburger menu functionality
const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector("nav");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    nav.classList.toggle("active");
});

// Close menu when a link is clicked
document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        nav.classList.remove("active");
    });
});

// Dynamic footer content
const currentYearSpan = document.getElementById("currentYear");
const lastModifiedSpan = document.getElementById("lastModified");

// Set current year
currentYearSpan.textContent = new Date().getFullYear();

// Set last modified date
lastModifiedSpan.textContent = document.lastModified;

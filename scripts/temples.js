// ✅ Update footer with the current year and last modified date
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("lastModified").textContent = document.lastModified;

    const yearSpan = document.createElement("span");
    yearSpan.textContent = new Date().getFullYear();
    document.querySelector("footer p").prepend(`© ${yearSpan.textContent} `);
});

// ✅ Hamburger Menu Toggle
const hamburgerBtn = document.createElement("button");
hamburgerBtn.innerHTML = "☰"; // Initial menu icon
hamburgerBtn.id = "hamburger-btn";
document.querySelector("header").prepend(hamburgerBtn);

const nav = document.querySelector("nav ul");

// Toggle function
hamburgerBtn.addEventListener("click", () => {
    nav.classList.toggle("show");
    // Change ☰ to ✖ when menu is open
    hamburgerBtn.innerHTML = nav.classList.contains("show") ? "✖" : "☰";
});

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

// Set current year dynamically
currentYearSpan.textContent = new Date().getFullYear();

// Set last modified date dynamically
lastModifiedSpan.textContent = document.lastModified;

// Temple Data
const temples = [
  { templeName: "Aba Nigeria", location: "Aba, Nigeria", dedicated: "2005, August, 7", area: 11500, imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg" },
  { templeName: "Manti Utah", location: "Manti, Utah, United States", dedicated: "1888, May, 21", area: 74792, imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg" },
  { templeName: "Payson Utah", location: "Payson, Utah, United States", dedicated: "2015, June, 7", area: 96630, imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg" },
  { templeName: "Yigo Guam", location: "Yigo, Guam", dedicated: "2020, May, 2", area: 6861, imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg" },
  { templeName: "Washington D.C.", location: "Kensington, Maryland, United States", dedicated: "1974, November, 19", area: 156558, imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg" },
  { templeName: "Lima Perú", location: "Lima, Perú", dedicated: "1986, January, 10", area: 9600, imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg" },
  { templeName: "Mexico City Mexico", location: "Mexico City, Mexico", dedicated: "1983, December, 2", area: 116642, imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg" },
  { templeName: "São Paulo Brazil", location: "São Paulo, Brazil", dedicated: "1978, October, 30", area: 59246, imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/sao-paulo-brazil/400x250/sao-paulo-brazil-temple-1120397-wallpaper.jpg" },
  { templeName: "Sydney Australia", location: "Sydney, Australia", dedicated: "1984, September, 20", area: 39600, imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/sydney-australia/400x250/sydney-australia-temple-1849488-wallpaper.jpg" },
  { templeName: "Johannesburg South Africa", location: "Johannesburg, South Africa", dedicated: "1985, August, 24", area: 19000, imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/johannesburg-south-africa/400x250/johannesburg-south-africa-temple-lds-965899-wallpaper.jpg" }
];

// Function to display temples
function displayTemples(templesArray) {
    const templeGrid = document.querySelector(".temple-grid");
    templeGrid.innerHTML = ""; // Clear existing content

    templesArray.forEach(temple => {
        const figure = document.createElement("figure");

        const img = document.createElement("img");
        img.src = temple.imageUrl;
        img.alt = temple.templeName;
        img.loading = "lazy"; // Lazy loading

        const figcaption = document.createElement("figcaption");
        figcaption.innerHTML = `
            <strong>${temple.templeName}</strong><br>
            Location: ${temple.location}<br>
            Dedicated: ${temple.dedicated}<br>
            Area: ${temple.area} sq. ft.
        `;

        figure.appendChild(img);
        figure.appendChild(figcaption);
        templeGrid.appendChild(figure);
    });
}

// Filter temples based on category
function filterTemples(filter) {
    let filteredTemples = [];
    
    switch(filter) {
        case "old":
            filteredTemples = temples.filter(temple => {
                const year = parseInt(temple.dedicated.split(",")[0]); // Extract year from dedicated date
                return year < 1900;
            });
            break;
        case "new":
            filteredTemples = temples.filter(temple => {
                const year = parseInt(temple.dedicated.split(",")[0]); // Extract year from dedicated date
                return year > 2000;
            });
            break;
        case "large":
            filteredTemples = temples.filter(temple => temple.area > 90000);
            break;
        case "small":
            filteredTemples = temples.filter(temple => temple.area < 10000);
            break;
        default:
            filteredTemples = temples; // Show all temples (Home)
    }

    displayTemples(filteredTemples);
}

// Add event listeners to navigation links
document.querySelector("nav ul").addEventListener("click", event => {
    if (event.target.tagName === "A") {
        event.preventDefault();
        const filterType = event.target.textContent.toLowerCase(); // Get text and convert to lowercase
        filterTemples(filterType);
    }
});

// Load all temples on page load
document.addEventListener("DOMContentLoaded", () => {
    displayTemples(temples);
});

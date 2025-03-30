// Hamburger menu functionality
const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector("nav");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  nav.classList.toggle("active");
});

// Close menu when a link is clicked
document.querySelectorAll("nav a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    nav.classList.remove("active");
  });
});

// Dynamic footer content
document.getElementById("currentYear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// Temple Data
const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg",
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg",
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg",
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg",
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg",
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg",
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg",
  },
  {
    templeName: "São Paulo Brazil",
    location: "São Paulo, Brazil",
    dedicated: "1978, October, 30",
    area: 59246,
    imageUrl:
      "https://www.churchofjesuschrist.org/imgs/940f3e201364433a3d5d3dc14b0cacee38d41d1d/full/500%2C/0/default",
  },
  {
    templeName: "Sydney Australia",
    location: "Sydney, Australia",
    dedicated: "1984, September, 20",
    area: 39600,
    imageUrl:
      "https://www.churchofjesuschrist.org/imgs/8dd109cda45dda79ebe30b0461d5d0afba41f653/full/500%2C/0/default",
  },
  {
    templeName: "Johannesburg South Africa",
    location: "Johannesburg, South Africa",
    dedicated: "1985, August, 24",
    area: 19000,
    imageUrl:
      "https://www.churchofjesuschrist.org/imgs/b378c080e5880db5bf2bcf6d828b2f3fd59820de/full/500%2C/0/default",
  },
];

// Function to display temples
function displayTemples(templesArray) {
  const templeGrid = document.querySelector(".temple-grid");
  if (!templeGrid) return; // Prevent errors if grid is missing

  templeGrid.innerHTML = ""; // Clear existing content

  templesArray.forEach(
    ({ templeName, location, dedicated, area, imageUrl }) => {
      const figure = document.createElement("figure");

      const img = document.createElement("img");
      img.src = imageUrl;
      img.alt = templeName;
      img.loading = "lazy"; // Lazy loading

      const figcaption = document.createElement("figcaption");
      figcaption.innerHTML = `
            <strong>${templeName}</strong><br>
            Location: ${location}<br>
            Dedicated: ${dedicated}<br>
            Area: ${area} sq. ft.
        `;

      figure.append(img, figcaption);
      templeGrid.appendChild(figure);
    }
  );
}

// Filter temples based on category
function filterTemples(filter) {
  let filteredTemples = temples;

  if (filter === "old") {
    filteredTemples = temples.filter(
      ({ dedicated }) => parseInt(dedicated.split(",")[0]) < 1900
    );
  } else if (filter === "new") {
    filteredTemples = temples.filter(
      ({ dedicated }) => parseInt(dedicated.split(",")[0]) > 2000
    );
  } else if (filter === "large") {
    filteredTemples = temples.filter(({ area }) => area > 90000);
  } else if (filter === "small") {
    filteredTemples = temples.filter(({ area }) => area < 10000);
  }

  displayTemples(filteredTemples);
}

// Add event listeners to navigation links
document.querySelector("nav ul").addEventListener("click", (event) => {
  const link = event.target.closest("a");
  if (!link) return;

  event.preventDefault();
  filterTemples(link.textContent.toLowerCase());
});

// Load all temples on page load
document.addEventListener("DOMContentLoaded", () => {
  displayTemples(temples);
});

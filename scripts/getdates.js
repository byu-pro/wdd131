document.addEventListener("DOMContentLoaded", function () {
    // Fix the incorrect ID names
    document.getElementById("currentYear").textContent = new Date().getFullYear();
    document.getElementById("lastModifiedDate").textContent = "Last Modified: " + document.lastModified;
});

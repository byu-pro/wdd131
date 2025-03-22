document.addEventListener("DOMContentLoaded", () => {
    // ✅ Set the current last modified date in a readable format
    const lastModifiedDate = new Date(document.lastModified);
    document.getElementById("lastModified").textContent = lastModifiedDate.toLocaleString();

    // ✅ Static values for weather
    const temperature = 22; // Celsius
    const windSpeed = 10; // km/h

    // ✅ Function to calculate wind chill (Celsius)
    function calculateWindChill(temp, wind) {
        return (13.12 + 0.6215 * temp - 11.37 * Math.pow(wind, 0.16) + 0.3965 * temp * Math.pow(wind, 0.16)).toFixed(1);
    }

    // ✅ Check if wind chill is applicable
    let windChillText = "N/A";  // Default
    if (temperature <= 10 && windSpeed > 4.8) {
        windChillText = calculateWindChill(temperature, windSpeed) + "°C";
    }

    // ✅ Display wind chill only if the element exists
    const windChillElement = document.getElementById("windChill");
    if (windChillElement) {
        windChillElement.textContent = windChillText;
    }
});

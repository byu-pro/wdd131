document.addEventListener("DOMContentLoaded", () => {
    // Set the current year
    document.getElementById("lastModified").textContent = document.lastModified;

    // Static values for weather
    const temperature = 22; // Celsius
    const windSpeed = 10; // km/h

    // Function to calculate wind chill in Celsius
    function calculateWindChill(temp, wind) {
        return (13.12 + 0.6215 * temp - 11.37 * Math.pow(wind, 0.16) + 0.3965 * temp * Math.pow(wind, 0.16)).toFixed(1);
    }

    // Check if wind chill is applicable
    let windChill = "N/A";
    if (temperature <= 10 && windSpeed > 4.8) {
        windChill = calculateWindChill(temperature, windSpeed) + "°C";
    }

    // Display wind chill
    document.getElementById("windChill").textContent = windChill;
});

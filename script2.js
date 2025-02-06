document.addEventListener("DOMContentLoaded", function () {
    // Fetch moon data initially and update every 5 minutes
    fetchMoonData();
    setInterval(fetchMoonData, 5 * 60 * 1000);
});

// Function to fetch moon phase data from Farmsense API
function fetchMoonData(retryCount = 2) {
    const loadingElement = document.getElementById("loading");
    if (loadingElement) loadingElement.style.display = "block"; // Show loading message

    const today = new Date();
    const unixTimestamp = Math.floor(today.getTime() / 1000); // Convert to UNIX timestamp
    const apiUrl = `https://api.farmsense.net/v1/moonphases/?d=${unixTimestamp}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}`);
            return response.json();
        })
        .then(data => {
            if (loadingElement) loadingElement.style.display = "none"; // Hide loading

            if (Array.isArray(data) && data.length > 0) {
                const moonData = data[0];

                // Extract moon information
                const moonPhase = moonData.Phase || "Unknown";
                const illumination = Math.round((moonData.Illumination || 0) * 100);
                const moonAge = moonData.Age || "Unknown";
                const distance = moonData.Distance ? `${Math.round(moonData.Distance)} km` : "N/A";
                const nextPhase = determineNextPhase(moonPhase);
                const daysUntilNext = calculateDaysUntilNext(moonAge);

                // Update UI elements
                updateMoonInfo({
                    phase: moonPhase,
                    visibility: illumination + "%",
                    nextPhase: nextPhase,
                    daysToNext: daysUntilNext,
                    age: `${moonAge} days`,
                    distance: `Distance from Earth: ${distance}`
                });
            } else {
                throw new Error("Invalid API response.");
            }
        })
        .catch(error => {
            console.error("Error fetching moon data:", error);
            if (loadingElement) loadingElement.style.display = "none"; // Hide loading

            if (retryCount > 0) {
                console.warn(`Retrying fetch... (${retryCount} attempts left)`);
                setTimeout(() => fetchMoonData(retryCount - 1), 3000); // Retry after 3 seconds
            } else {
                displayError("Failed to fetch moon data. Please try again later.");
            }
        });
}

// Function to update the UI with moon data
function updateMoonInfo({ phase, visibility, nextPhase, daysToNext, age, distance }) {
    setText("moon-phase", `Moon Phase: ${phase}`);
    setText("moon-visibility", `Visibility: ${visibility}`);
    setText("next-phase", `Next Phase: ${nextPhase}`);
    setText("days-to-next", `Days Until Next Phase: ${daysToNext}`);
    setText("moon-age", `Moon Age: ${age}`);
    setText("moon-distance", distance);
}

// Function to set text content safely
function setText(id, text) {
    const element = document.getElementById(id);
    if (element) element.textContent = text;
}

// Function to display an error message
function displayError(message) {
    updateMoonInfo({
        phase: `Error: ${message}`,
        visibility: "",
        nextPhase: "",
        daysToNext: "",
        age: "",
        distance: ""
    });
}

// Function to determine the next moon phase based on the current phase
function determineNextPhase(currentPhase) {
    const phases = [
        "New Moon",
        "Waxing Crescent",
        "First Quarter",
        "Waxing Gibbous",
        "Full Moon",
        "Waning Gibbous",
        "Last Quarter",
        "Waning Crescent"
    ];

    let index = phases.indexOf(currentPhase);
    return index !== -1 ? phases[(index + 1) % phases.length] : "Unknown";
}

// Function to estimate days until the next moon phase based on moon age
function calculateDaysUntilNext(moonAge) {
    const moonCycle = 29.53; // Average length of a lunar cycle in days
    if (typeof moonAge !== "number") return "Unknown";
    return Math.max(1, Math.round(moonCycle - moonAge)); // Ensure at least 1 day remaining
}

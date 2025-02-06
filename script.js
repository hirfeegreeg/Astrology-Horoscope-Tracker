// 🌎 Display user's timezone with a FAKE SECURITY ALERT
const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
document.querySelector('.location-info').textContent = `🌎 Your Timezone: ${userTimezone} (Tracking Enabled ✅)`;

// 🎉 List of preset events (Totally Real)
const presetEvents = [
    { name: "New Year's Day", date: "2025-01-01T00:00:00" },
    { name: "Lunar New Year", date: "2025-02-10T00:00:00" },
    { name: "Easter Sunday", date: "2025-04-20T00:00:00" },
    { name: "Ramadan Begins", date: "2025-03-01T00:00:00" },
    { name: "Diwali", date: "2025-10-29T00:00:00" },
    { name: "Halloween", date: "2025-10-31T00:00:00" },
    { name: "Christmas", date: "2025-12-25T00:00:00" },
    { name: "New Year's Eve", date: "2025-12-31T00:00:00" }
];

// 🛠️ Adjust past events to future dates
function adjustEventDate(eventDate) {
    const now = new Date();
    const event = new Date(eventDate);
    if (event < now) {
        event.setFullYear(now.getFullYear() + 1);
    }
    return event;
}

// ⏳ Calculate time remaining
function calculateTimeRemaining(targetDate) {
    const now = new Date();
    const target = adjustEventDate(targetDate);
    const diff = target - now;

    if (diff <= 0) return "🎉 Happening Now! (Your funds may be arriving soon!)";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

// 📆 Add countdown to the list
function addCountdown(eventName, targetDate) {
    const countdownList = document.getElementById("countdown-list");

    if (countdownList.textContent.trim() === "No active countdowns.") {
        countdownList.innerHTML = "";
    }

    const countdownDiv = document.createElement("div");
    countdownDiv.classList.add("countdown-item");
    countdownDiv.innerHTML = `<strong>${eventName}:</strong> 
        <span class="countdown-timer">${calculateTimeRemaining(targetDate)}</span>`;

    countdownList.appendChild(countdownDiv);

    // ⏳ Update countdown every second
    const countdownInterval = setInterval(() => {
        const timeLeft = calculateTimeRemaining(targetDate);
        countdownDiv.querySelector(".countdown-timer").textContent = timeLeft;

        if (timeLeft === "🎉 Happening Now! (Your funds may be arriving soon!)") {
            clearInterval(countdownInterval);
            showCelebration(eventName);
        }
    }, 1000);
}

// 🎉 Fake celebration alert
function showCelebration(eventName) {
    alert(`🎉 CONGRATULATIONS! ${eventName} is happening now!\n\n💰 YOU HAVE WON 10,000 DOLA DOLA! 💰\n\n⚠️ Please send a $99 processing fee to claim.`);
}

// 📅 Handle user countdown input
document.getElementById("countdown-button").addEventListener("click", function () {
    const eventDateInput = document.getElementById("event-date").value;
    const eventTimeInput = document.getElementById("event-time").value || "00:00";
    const eventName = document.getElementById("event-name").value.trim() || "Limited-Time Bonus Event!";

    if (!eventDateInput) {
        alert("🚨 ERROR: You MUST select a date to qualify for the FREE REWARD!");
        return;
    }

    const eventDateTime = `${eventDateInput}T${eventTimeInput}:00`;
    addCountdown(eventName, eventDateTime);
});

// 🌙 Scam Mode (Dark Mode) Toggle
const darkModeToggle = document.getElementById("toggle-dark-mode");

function applyScamMode(state) {
    document.body.classList.toggle("dark-mode", state);
    localStorage.setItem("darkMode", state ? "enabled" : "disabled");

    darkModeToggle.textContent = state ? "🔆 Disable SCAM Mode" : "🌙 Enable SCAM Mode";
}

// 🛠️ Load dark mode settings
applyScamMode(localStorage.getItem("darkMode") === "enabled");

darkModeToggle.addEventListener("click", () => {
    applyScamMode(!document.body.classList.contains("dark-mode"));
});

// 🎁 Fake "Claim Reward" button
document.getElementById("claim-reward").addEventListener("click", function () {
    alert(`🎁 CONGRATULATIONS! YOU HAVE WON A SECRET PRIZE!\n\n🚀 PROCESSING...\n\n⚠️ Send $99 via wire transfer to receive your prize.`);
});

// 🎯 Display preset events as scammy buttons
function displayPresetEvents() {
    const presetContainer = document.getElementById("preset-events");
    presetContainer.innerHTML = "";

    presetEvents.forEach(event => {
        const eventDiv = document.createElement("div");
        eventDiv.classList.add("preset-event");
        eventDiv.innerHTML = `
            <p>🎁 ${event.name} (LIMITED TIME OFFER!)</p>
            <button class="start-countdown" data-name="${event.name}" data-date="${event.date}">💰 Start Countdown & WIN BIG 💰</button>
        `;
        presetContainer.appendChild(eventDiv);
    });

    // Attach event listeners dynamically
    document.querySelectorAll(".start-countdown").forEach(button => {
        button.addEventListener("click", function () {
            addCountdown(this.dataset.name, this.dataset.date);
        });
    });
}

// 🛠️ Initialize preset events
window.onload = displayPresetEvents;

document.addEventListener("DOMContentLoaded", function() {
    // Generate daily horoscope and update compatibility result
    generateDailyHoroscope();
    
    // Check compatibility on button click
    document.getElementById("check-compatibility").addEventListener("click", function() {
        checkCompatibility();
    });
});

// Function to generate a fake daily horoscope
function generateDailyHoroscope() {
    const horoscopePredictions = [
        "Today is your lucky day! Wealth is on the horizon, take action!",
        "Beware of close friends, someone might be plotting against you.",
        "Romance is in the air, look out for new connections today.",
        "The universe is aligned, expect a big win soon!",
        "Today is a great day to make new investments in your future!",
        "Money will come your way unexpectedly, but don't spend it all at once!",
        "Beware, a hidden opportunity is waiting for you today, seize it!",
        "New love interests will enter your life. Stay open to possibilities.",
        "Your energy today will attract people who can help you grow.",
        "The stars say you'll make an unexpected new friend today."
    ];
    const randomIndex = Math.floor(Math.random() * horoscopePredictions.length);
    document.getElementById("daily-horoscope").textContent = horoscopePredictions[randomIndex];
}

// Function to check compatibility based on names
function checkCompatibility() {
    const nameOne = document.getElementById("name-one").value;
    const nameTwo = document.getElementById("name-two").value;

    if (!nameOne || !nameTwo) {
        document.getElementById("compatibility-result").textContent = "Please enter both names!";
        return;
    }

    const compatibilityScore = Math.floor(Math.random() * 100) + 1; // Random score between 1 and 100
    document.getElementById("compatibility-result").textContent = `Your compatibility score is: ${compatibilityScore}%`;
}

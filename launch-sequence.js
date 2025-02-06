document.addEventListener("DOMContentLoaded", function() {
    // Initial setup: hide the countdown and explosion
    const countdownElement = document.getElementById("countdown");
    const explosionElement = document.getElementById("explosion");
    const redButton = document.getElementById("red-button");

    // Key displays
    const key1Display = document.getElementById("key1-display");
    const key2Display = document.getElementById("key2-display");

    // Button elements for rotating keys
    const rotateKey1 = document.getElementById("rotate-key1");
    const rotateKey2 = document.getElementById("rotate-key2");

    // Get audio elements for siren and explosion
    const sirenSound = document.getElementById("siren-sound");
    const explosionSound = document.getElementById("explosion-sound");

    // Initial states of the keys
    let key1State = 0; // 0 is initial state
    let key2State = 0; // 0 is initial state

    // Rotate key 1
    rotateKey1.addEventListener("click", function() {
        key1State = (key1State + 1) % 3; // Rotate between 0, 1, 2 states
        updateKeyDisplay();
        checkKeys();
    });

    // Rotate key 2
    rotateKey2.addEventListener("click", function() {
        key2State = (key2State + 1) % 3; // Rotate between 0, 1, 2 states
        updateKeyDisplay();
        checkKeys();
    });

    // Update key displays based on the current state
    function updateKeyDisplay() {
        key1Display.textContent = key1State === 0 ? "🔑" : key1State === 1 ? "🔒" : "🔓";
        key2Display.textContent = key2State === 0 ? "🔑" : key2State === 1 ? "🔒" : "🔓";
    }

    // Check if both keys are in the correct state to enable the red button
    function checkKeys() {
        if (key1State === 2 && key2State === 2) { // Both keys must be in the "correct" position (state 2)
            redButton.disabled = false;
            alert("🔴 Both keys are in the correct position! Press the red button to start the countdown.");
        }
    }

    // Start the countdown when red button is pressed
    redButton.addEventListener("click", function() {
        redButton.disabled = true;
        startCountdown();
    });

    // Start a countdown of 1 hour (3600 seconds)
    function startCountdown() {
        // Play the siren sound when countdown starts
        sirenSound.play();
        let timeRemaining = 3600; // seconds
        const interval = setInterval(function() {
            if (timeRemaining <= 0) {
                clearInterval(interval);
                triggerExplosion();
            } else {
                const hours = Math.floor(timeRemaining / 3600);
                const minutes = Math.floor((timeRemaining % 3600) / 60);
                const seconds = timeRemaining % 60;
                countdownElement.textContent = `${hours}h ${minutes}m ${seconds}s`;
                timeRemaining--;
            }
        }, 1000);
    }

    // Trigger the "nuke" explosion after countdown
    function triggerExplosion() {
        // Stop the siren and play the explosion sound
        sirenSound.pause();
        sirenSound.currentTime = 0; // Reset to the beginning
        explosionSound.play();

        countdownElement.textContent = "";
        explosionElement.style.display = "block"; // Show explosion message
        setTimeout(function() {
            alert("💥 Nuke Launched! 💥 Goodbye!");
        }, 1000);
    }
});

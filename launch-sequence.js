document.addEventListener("DOMContentLoaded", function() {
    const countdownElement = document.getElementById("countdown");
    const explosionElement = document.getElementById("explosion");
    const redButton = document.getElementById("red-button");

    const diagnostic = document.getElementById("run-diagnostic");
    const key1 = document.getElementById("rotate-key1");
    const key2 = document.getElementById("rotate-key2");
    const switch1 = document.getElementById("switch1");
    const switch2 = document.getElementById("switch2");
    const launchCodeInput = document.getElementById("launch-code");
    const submitCode = document.getElementById("submit-code");
    const fingerprint = document.getElementById("fingerprint");
    const retinaScan = document.getElementById("retina-scan");
    const finalConfirmation = document.getElementById("final-confirmation");
    const warningMessage = document.getElementById("warning");

    // Load AI voice confirmation sounds
    const systemCheckSound = new Audio("System diagnostic ch (1).mp3");
    const keyTurnSound = new Audio("Key rotation verifie (1).mp3");
    const launchArmedSound = new Audio("Launch system armed .mp3");
    const securityClearanceSound = new Audio("Security clearance a.mp3");
    const biometricScanCompleteSound = new Audio("Biometric scan compl.mp3");
    const retinaScanVerifiedSound = new Audio("Retina scan verified.mp3");
    const launchSequenceActivatedSound = new Audio("Launch sequence acti.mp3");
    const tMinus10SecondsSound = new Audio("T minus 10 seconds t.mp3");
    const launchSuccessfulSound = new Audio("Launch successful Ta.mp3");

    // Beep and error sounds
    const beep = new Audio("beep.mp3");
    const errorSound = new Audio("error.mp3");

    const sirenSound = new Audio("siren.mp3");
    const explosionSound = new Audio("explosion.wav");

    let step = 0;

    diagnostic.addEventListener("click", function() {
        systemCheckSound.play();
        alert("✅ System diagnostic check complete. All systems are operational.");
        key1.disabled = false;
        key2.disabled = false;
        diagnostic.disabled = true;
    });

    key1.addEventListener("click", () => turnKey(key1));
    key2.addEventListener("click", () => turnKey(key2));

    function turnKey(key) {
        key.disabled = true;
        step++;
        if (step === 2) {
            keyTurnSound.play();
            switch1.disabled = false;
            switch2.disabled = false;
            beep.play();
            alert("✅ Key rotation verified. Proceed to switch activation.");
        }
    }

    switch1.addEventListener("click", () => flipSwitch(switch1));
    switch2.addEventListener("click", () => flipSwitch(switch2));

    function flipSwitch(switchBtn) {
        switchBtn.disabled = true;
        step++;
        if (step === 4) {
            launchArmedSound.play();
            launchCodeInput.disabled = false;
            submitCode.disabled = false;
            beep.play();
            alert("⚠️ Launch system armed. Security code required.");
        }
    }

    submitCode.addEventListener("click", function() {
        let code = launchCodeInput.value;
        if (code === "0000") {
            securityClearanceSound.play();
            fingerprint.disabled = false;
            alert("✅ Code Accepted! Scan fingerprint.");
        } else {
            errorSound.play();
            alert("❌ Incorrect Code! Try Again.");
        }
    });

    fingerprint.addEventListener("click", function() {
        biometricScanCompleteSound.play();
        retinaScan.disabled = false;
        alert("✅ Biometric Scan Complete! Perform retina scan.");
    });

    retinaScan.addEventListener("click", function() {
        retinaScanVerifiedSound.play();
        finalConfirmation.disabled = false;
        alert("✅ Retina Scan Verified! Confirm final launch.");
    });

    finalConfirmation.addEventListener("click", function() {
        launchSequenceActivatedSound.play();
        redButton.disabled = false;
        warningMessage.style.display = "block";
        alert("🚀 Final Confirmation Complete! Press RED BUTTON to launch.");
    });

    redButton.addEventListener("click", function() {
        tMinus10SecondsSound.play();
        alert("🔥 LAUNCH INITIATED...");
        startCountdown();
    });

    function startCountdown() {
        sirenSound.play();
        let timeRemaining = 10;

        const interval = setInterval(() => {
            if (timeRemaining <= 0) {
                clearInterval(interval);
                triggerExplosion();
            } else {
                countdownElement.textContent = `${timeRemaining}s`;
                timeRemaining--;
            }
        }, 1000);
    }

    function triggerExplosion() {
        sirenSound.pause();
        explosionSound.play();
        countdownElement.textContent = "";
        explosionElement.style.display = "block";
        launchSuccessfulSound.play();
        alert("💥 Nuke Launched! 💥 Goodbye!");
    }
});


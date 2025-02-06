document.getElementById("join-vip").addEventListener("click", function () {
    let cardNumber = document.getElementById("fake-card").value.trim();

    if (cardNumber.length !== 16) {
        alert("🚨 ERROR: Please enter a valid 16-digit card number!");
        return;
    }

    document.getElementById("processing").style.display = "block";

    setTimeout(() => {
        alert("🎉 CONGRATULATIONS!\n\n✅ PAYMENT SUCCESSFUL!\n\n⚠️ Your VIP status will be activated within 24 hours.\n\n(Actually... no. You just got scammed. 😆)");
        document.getElementById("processing").style.display = "none";
    }, 3000);
});

// 🔥 Fake VIP Slots Countdown
let vipSlots = 2;
setInterval(() => {
    if (vipSlots > 0) {
        vipSlots--;
        document.getElementById("vip-slots").textContent = vipSlots;
    } else {
        alert("⚠️ ERROR: No more VIP slots left! You missed out on MILLIONS! 💰");
        clearInterval();
    }
}, 10000);

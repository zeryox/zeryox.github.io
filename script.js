function playGame() {
    const chambers = 6; // Total chambers
    const bulletPosition = Math.floor(Math.random() * chambers); // Random position for the bullet
    const playerPosition = Math.floor(Math.random() * chambers); // Random position for the player

    if (playerPosition === bulletPosition) {
        document.getElementById("result").innerHTML = "Bang! You're shot!";
    } else {
        document.getElementById("result").innerHTML = "Click! You're safe!";
    }
}
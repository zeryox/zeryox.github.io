let playerHand = [];
let dealerHand = [];
const deck = createDeck();
let playerScore = 0;
let dealerScore = 0;

function createDeck() {
    const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
    const deck = [];
    for (let suit of suits) {
        for (let value of values) {
            deck.push({ suit, value });
        }
    }
    return deck.sort(() => Math.random() - 0.5);
}

function dealCard(hand) {
    hand.push(deck.pop());
}

function calculateScore(hand) {
    let score = 0;
    let aces = 0;
    for (let card of hand) {
        if (['Jack', 'Queen', 'King'].includes(card.value)) {
            score += 10;
        } else if (card.value === 'Ace') {
            aces += 1;
            score += 11; // Initially count Ace as 11
        } else {
            score += parseInt(card.value);
        }
    }
    while (score > 21 && aces) {
        score -= 10; // Convert Ace from 11 to 1
        aces -= 1;
    }
    return score;
}

function updateDisplay() {
    document.getElementById('dealer-hand').innerText = `Dealer: ${dealerHand.map(card => card.value + ' of ' + card.suit).join(', ')}`;
    document.getElementById('player-hand').innerText = `Player: ${playerHand.map(card => card.value + ' of ' + card.suit).join(', ')}`;
    document.getElementById('message').innerText = `Player Score: ${playerScore} | Dealer Score: ${dealerScore}`;
}

function resetGame() {
    playerHand = [];
    dealerHand = [];
    playerScore = 0;
    dealerScore = 0;
    deck = createDeck();
    dealCard(playerHand);
    dealCard(dealerHand);
    dealCard(playerHand);
    dealCard(dealerHand);
    playerScore = calculateScore(playerHand);
    dealerScore = calculateScore(dealerHand);
    updateDisplay();
}

document.getElementById('hit').addEventListener('click', () => {
    dealCard(playerHand);
    playerScore = calculateScore(playerHand);
    updateDisplay();
    if (playerScore > 21) {
        document.getElementById('message').innerText = "You busted! Game over.";
    }
});

document.getElementById('stand').addEventListener('click', () => {
    while (dealerScore < 17) {
        dealCard(dealerHand);
        dealerScore = calculateScore(dealerHand);
    }
    updateDisplay();
    if (dealerScore > 21 || playerScore > dealerScore) {
        document.getElementById('message').innerText = "You win!";
    } else if (playerScore < dealerScore) {
        document.getElementById('message').innerText = "Dealer wins!";
    } else {
        document.getElementById('message').innerText = "It's a tie!";
    }
});

document.getElementById('restart').addEventListener('click', resetGame);

// Start the game on load
resetGame();

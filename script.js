@import url('https://fonts.googleapis.com/css2?family=Acme&family=Carter+One&family=Cookie&family=Island+Moments&family=PT+Serif+Caption&family=Playfair+Display+SC:wght@400;700;900&family=Red+Hat+Display:wght@700;900&family=Roboto+Mono&display=swap');

/* UNIVERSAL BODY STYLING */
*{
 margin: 0;
 padding: 0;
 box-sizing: border-box;
}

/*  BODY STYLING */
body{
 margin-top: 15px;
 font-family: 'Roboto Mono', monospace;
 text-align: center;
 color: white;
 background-color: rgb(5, 51, 5);
}

/* BODY H1 STYLING */
h1{
 color: goldenrod;
 font-size: 50px;
 letter-spacing: 2px;
 text-decoration: underline;
 margin-bottom: 20px;
 cursor: pointer;
}

/* DISPLAY MESSAGE STYLING */
#message-el{
 font-style: italic;
 font-size: 30px;
 margin-bottom: 20px;
}

/* PARAGRAPH MESSAGE STYLING */
p{
 font-size: 30px;
 margin-bottom: 20px;
}

/* BUTTONS STYLING */
button{
 padding: 10px;
 border: none;
 color: rgb(5, 51, 5);
 font-weight: bold;
 width: 200px;
 font-size: 25px;
 border-radius: 3px;
 text-transform: uppercase;
 background-color: goldenrod;
 text-align: center;
 margin: auto;
 display: flex;
 justify-content: center;
 margin-bottom: 6px;
 margin-top: 6px;
 font-family: 'Roboto Mono', monospace;
}

button:hover{
 transition: 0.3s ease-in-out;
 background-color: #b18005;
}

/* PLAYER MESSAGE STYLING */
#player-el{
 margin-top: 20px;
 font-weight: bold;
}

/* MEDIA QUERY STYLING STARTS HERE */
@media screen and (max-width: 300px) {
 body{
  margin-top: 30px;
 }

 h1{
  font-size: 40px;
  letter-spacing: 2px;
  text-decoration: underline;
  margin-bottom: 20px;
 }
 
 #message-el{
  font-size: 16px;
 }

 p{
  font-size: 17px;
 }

 button{
  padding: 5px;
  width: 120px;
  font-size: 20px;
 }
 
 #player-el{
  font-size: 15px;
 }
}
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

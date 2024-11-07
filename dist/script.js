var cash = 1000;
var bet = 100;

var faces = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
var suits = ['Diamonds','Clubs','Hearts','Spades'];

function card(name, face, suit, value) {
  this.name = name;
  this.face = face;
  this.suit = suit;
  this.value = value;
}

var deck = [];

function shuffleDeck() {
  deck = [];
  
  for(var i = 0; i<faces.length; i++) {
    for(var j = 0; j<suits.length; j++) {
      var temp;
      if(i > 9) {
        temp = new card(faces[i] + ' of ' + suits[j], faces[i], suits[j], 10);
      }
      else {
        temp = new card(faces[i] + ' of ' + suits[j], faces[i], suits[j], i + 1);
      }
      deck.push(temp);
    }
  }
}

shuffleDeck();

function hand() {
  this.player = 'none';
  this.cards = [];
  this.value = 0;
}

function startGame() {
  playerHand = new hand();
  computerHand = new hand();
  playerHand.player = 'player';
  computerHand.player = 'computer';
  startingHand();
  showValue();
  if( playerHand.value == 21) {
    win();
    $('.buttons').addClass('hide');
    $('#reset').removeClass('hide');
    if(deck.length < 10) {
      shuffleDeck();
    }
  }
}

function startingHand() {
  for( var i = 0; i<2; i++) {
    hit(playerHand);
  }
  computerHit();
}

function computerHit() {
  hit(computerHand);
  showCompValue();
}

function showValue() {
  $('#gameBoard').append('<div class="player-value">' + playerHand.value.toString() + '</div');
  if(playerHand.value > 21){
    $('#gameBoard').append('<div class="player-value">You Bust!</div');
    showCompValue();
    computerTurn();
    $('.buttons').addClass('hide');
  }
}

function showCompValue() {
  $('#gameBoard').append('<div class="computer-value">' + computerHand.value.toString() + '</div');
  if(computerHand.value > 21){
    $('#gameBoard').append('<div class="computer-value">Computer Bust!</div');
  }
}

function addCards(addHand) {
  var total = 0;
  var list = [];
  for( var i = 0; i < addHand.cards.length; i++) {
    if( addHand.cards[i].face != 'A' ) {
      list.unshift(addHand.cards[i]);
    }
    else {
      list.push(addHand.cards[i]);
    }
  }
  
  for( var i = 0; i < list.length; i++) {
    if( list[i].face != 'A' ) {
      total += list[i].value;
    }
    else {
      if( total < 11) {
        total += 11;
      }
      else {
        total += 1;
      }
    }
  }
  
  return total;
}

function buildCard( buildPlayer, buildColor, buildFace, buildSuit, buildHand ) {
  var str = '<div class="single-left ';
  str = str.concat(buildColor);
  str = str.concat('"><div class="facevalue">');
  str = str.concat(buildFace);
  str = str.concat('</div><div class="facetype">');
  str = str.concat(buildSuit);
  str = str.concat('</div></div>');
  if(buildPlayer == 'player') {
    $('.player-section').append( str );
    if(buildHand.cards.length == 1) {
      $('.player-section .single-left').addClass('first');  
    }
  }
  else {
    $('.computer-section').append( str );
    if(buildHand.cards.length == 1) {
      $('.computer-section .single-left').addClass('first');  
    }
  }
}

function hit(hitHand) {
  var num = Math.floor((Math.random() * (deck.length - 1)));
  var temp = deck[num];
  hitHand.cards.push(temp);
  hitHand.value = addCards(hitHand);
  playSound('hit');
  if( deck[num].suit == "Diamonds" ) {
    if( hitHand.player == 'player') {
      buildCard('player', 'red', deck[num].face, '&diams;', hitHand );
    }
    else {
      buildCard('computer', 'red', deck[num].face, '&diams;', hitHand );
    }
  }
  if( deck[num].suit == "Clubs" ) {
    if( hitHand.player == 'player') {
      buildCard('player', 'black', deck[num].face, '&clubs;', hitHand );
    }
    else {
      buildCard('computer', 'black', deck[num].face, '&clubs;', hitHand );
    }
  }
  if( deck[num].suit == "Hearts" ) {
    if( hitHand.player == 'player') {
      buildCard('player', 'red', deck[num].face, '&hearts;', hitHand );
    }
    else {
      buildCard('computer', 'red', deck[num].face, '&hearts;', hitHand );
    }
  }
  if( deck[num].suit == "Spades" ) {
    if( hitHand.player == 'player') {
      buildCard('player', 'black', deck[num].face, '&spades;', hitHand );
    }
    else {
      buildCard('computer', 'black', deck[num].face, '&spades;', hitHand );
    }
  }
  deck.splice(num,1);
}

function computerTurn() {
  if(playerHand.value < 22) {
    if(computerHand.value < 17) {
      computerHit();
      computerTurn();
    }
    else {
      checkScore();
    }
  }
  else {
    checkScore();
  }
}

function updateCashBet() {
  $('#cash').text('Cash: $' + cash.toString());
  $('#bet').text('Bet: $' + bet.toString());
}

function win() {
  $('#gameBoard').append('<div class="result">You win $' + bet.toString() + '!</div');
  cash += bet;
  updateCashBet();
  playSound('win');
}

function draw() {
  $('#gameBoard').append('<div class="result">You Draw!</div');
  playSound('draw');
}

function lose() {
  $('#gameBoard').append('<div class="result">You lose $' + bet.toString() + '!</div');
  cash -= bet;
  updateCashBet();
  if( cash < bet ) {
    bet = 100;
  }
  playSound('lose');
}

function checkScore() {
  if(playerHand.value < 22) {
    if(playerHand.value > computerHand.value) {
      win();
    }
    else {
      if(computerHand.value < 22) {
        if(computerHand.value == playerHand.value) {
          draw();
        }
        else {
          lose();
        }
      }
    }
    if(computerHand.value > 21) {
      win();
    }
  }
  else{
    lose();
  }
  if( cash > 0) {
    $('#reset').removeClass('hide');
  }
  else {
    $('#gameBoard').append('<div class="result">Game Over!</div>');
    $('#startover').removeClass('hide');
  }
  if(deck.length < 10) {
    shuffleDeck();
  }
}

function reset() {
  $('#gameBoard').text('');
  $('#gameBoard').append('<div class="player-section card-section"></div><div class="computer-section card-section"></div>');
  updateCashBet();
  $('.changeBet').removeClass('hide');
}

function startover() {
  cash = 1000;
  bet = 100;
  updateCashBet();
  shuffleDeck();
  reset();
}

$('#playHit').click(function() {
  hit(playerHand);
  showValue();
});

$('#playStay').click(function() {
  computerHit();
  computerTurn();
  $('.buttons').addClass('hide');
});

$('#addBet').click(function() {
  if(bet < cash) {
    bet += 100;
    updateCashBet();
  }
});

$('#subBet').click(function() {
  if(bet > 100) {
    bet -= 100;
    updateCashBet();
  }
});

$('#placeBet').click(function() {
  $('.changeBet').addClass('hide');
  $('.buttons').removeClass('hide');
  startGame();
});

$('#reset').click(function() {
  $('#reset').addClass('hide');
  reset();
});

$('#startover').click(function() {
  $('#startover').addClass('hide');
  startover();
});

// Sounds found on soundbible.com
function playSound( sound ) {
  if( sound == 'win' ) {
    var audio = new Audio('https://goo.gl/RvisKU');
    audio.volume = .3;
  }
  if( sound == 'draw' ) {
    var audio = new Audio('https://goo.gl/F4zXc9');
    audio.volume = .3;
  }
  if( sound == 'lose' ) {
    var audio = new Audio('https://goo.gl/cnh2hB');
    audio.volume = .3;
  }
  if( sound == 'hit' ) {
    var audio = new Audio('https://goo.gl/JuVzLs');
    audio.volume = .05;
  }
  audio.play();
}
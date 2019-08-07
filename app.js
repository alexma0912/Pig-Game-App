/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


//global variable
var currentScore, totalScore, activePlayer;
currentScore = 0;
totalScore = [0,0];
activePlayer = 0;

initial();

//initial all variables
function initial() {
    currentScore = 0;
    totalScore = [0,0];
    activePlayer = 0;
    document.getElementById('score-0').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    document.getElementsByClassName('dice1')[0].style.display = 'none';
    document.getElementsByClassName('dice2')[0].style.display = 'none';
    document.getElementsByClassName('player-0-panel')[0].className = 'player-0-panel active';
    document.getElementsByClassName('player-1-panel')[0].className = 'player-1-panel';
};

//Roll Dice button
var diceRoll = document.getElementsByClassName('btn-roll')[0];
diceRoll.addEventListener('click', function() {
    var dice1, dice2;
    dice1 = Math.floor(Math.random()*6+1);
    dice2 = Math.floor(Math.random()*6+1);
    //display dice
    document.getElementsByClassName('dice1')[0].style.display = 'block';
    document.getElementsByClassName('dice1')[0].src = 'dice-'+dice1+'.png';
    document.getElementsByClassName('dice2')[0].style.display = 'block';
    document.getElementsByClassName('dice2')[0].src = 'dice-'+dice2+'.png';
    //if no dice equals 1, sum up the currentScore
    if(dice1!=1 && dice2!=1) {
        currentScore += (dice1+dice2);
        document.getElementById('current-'+activePlayer).textContent = currentScore;
    } else {  //if one dice equals 1, switch player
        if(activePlayer==0) {
            initialPlayer1();
            switchUser();
        } else {
            initialPlayer2();
            switchUser();
        }
    }
});

function initialPlayer1() {
    document.getElementsByClassName('player-'+activePlayer+'-panel active')[0].className = 'player-'+activePlayer+'-panel';
    document.getElementById('current-'+activePlayer).textContent = 0;
    activePlayer = 1;
};

function initialPlayer2() {
    document.getElementsByClassName('player-'+activePlayer+'-panel active')[0].className = 'player-'+activePlayer+'-panel';
    document.getElementById('current-'+activePlayer).textContent = 0;
    activePlayer = 0;
};

function switchUser() {
    currentScore = 0;
    document.getElementsByClassName('player-'+activePlayer+'-panel')[0].className += ' active';
}

//Hold button
var holdBtn = document.getElementsByClassName('btn-hold')[0];
holdBtn.addEventListener('click', function() {
    totalScore[activePlayer] += currentScore;
    document.getElementById('score-'+activePlayer).textContent = totalScore[activePlayer];
    //check if the total score is larget than 100， get the winner
    if(totalScore[activePlayer] >= 100) {
        document.getElementsByClassName('player-'+activePlayer+'-panel')[0].classList.add('winner');
        document.getElementById('name-'+activePlayer).textContent = 'Winner!';
        diceRoll.disabled = true;
        holdBtn.disabled = true;
    } else {
        //if total score is less than 100, switch player
        if(activePlayer == 0) {
            initialPlayer1();
            switchUser();
        } else {
            initialPlayer2();
            switchUser();
        }
    }
});

//New Game button
var newGame = document.getElementsByClassName('btn-new')[0];
newGame.addEventListener('click', function() {
    diceRoll.disabled = false;
    holdBtn.disabled = false;
    document.getElementsByClassName('player-'+activePlayer+'-panel')[0].classList.remove('winner');
    document.getElementById('name-'+activePlayer).textContent = "Player " + (activePlayer+1);
    initial();
});
/*
GAME RULES:git 
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

var scores, roundScore, activePlayer;

scores = [0,0];
roundScore = 0;
activePlayer = 0;

document.querySelector('.btn-roll').addEventListener('click',rollDice);
document.querySelector('.btn-hold').addEventListener('click',holdRoundScore);
function rollDice(){
    //Random Number
    var dice = Math.floor(Math.random() * 6) + 1;
    //Display result
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display  = 'block';
    diceDOM.src = 'dice-'+dice+'.png';

    if(dice !== 1){
        //Sum to current
        roundScore += dice;
        document.getElementById('current-'+activePlayer).innerHTML = roundScore;
    }else{
        //Switch Players
        roundScore = 0;
        changeUI();
    }
}
function holdRoundScore(){
    scores[activePlayer] += roundScore;
    roundScore = 0;
    document.querySelector('#score-'+activePlayer).innerHTML = scores[activePlayer]
    if(scores[activePlayer] >= 20){
        document.querySelector('#name-'+activePlayer).textContent = "WINNER!"
        window.addEventListener('click', function (event) {
            event.stopPropagation();
        }, true);
    }
    changeUI();
}
function changeUI(){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}
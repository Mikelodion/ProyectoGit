/*
GAME RULES:git 
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

var scores, roundScore, activePlayer, gamePlaying, lastDice, scoreToReach;

document.querySelector('.btn-new').addEventListener('click', init);
function init(){
    scoreToReach = document.querySelector('.inp-score').value;
    document.querySelector('.btn-roll').addEventListener('click',rollDice);
    document.querySelector('.btn-hold').addEventListener('click',holdRoundScore);
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    
    document.querySelector('#name-0').textContent = "Player 0";
    document.querySelector('#name-1').textContent = "Player 1";
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('#score-0').innerHTML = 0;
    document.querySelector('#score-1').innerHTML = 0;
    document.getElementById('current-0').innerHTML = 0;
    document.getElementById('current-1').innerHTML = 0;
}
function rollDice(){
    if(gamePlaying){
        var dice;
        //Random Number
        //dice = Math.floor(Math.random() * 6) + 1;
        dice = Math.floor(Math.random() + 6);
        //Display result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display  = 'block';
        diceDOM.src = 'dice-'+dice+'.png';

        if(dice !== 1){
            //Sum to current
            if(dice == lastDice && dice == 6){
                roundScore = 0;
                scores[activePlayer] = 0;
                document.querySelector('#score-'+activePlayer).innerHTML = scores[activePlayer];
                changeUI();
            }else{
                lastDice = dice;
                roundScore += dice;
                document.getElementById('current-'+activePlayer).innerHTML = roundScore;
            }
        }else{
            //Switch Players
            roundScore = 0;
            changeUI();
        }
    }
}
function holdRoundScore(){
    lastDice = undefined;
    scores[activePlayer] += roundScore;
    roundScore = 0;
    document.querySelector('#score-'+activePlayer).innerHTML = scores[activePlayer];
    if(scores[activePlayer] >= scoreToReach){
        var winner = document.querySelector('#name-'+activePlayer);
        winner.textContent = "WINNER!"
        winner.parentElement.classList.remove('active');
        winner.parentElement.classList.add('winner');
        document.querySelector('.dice').style.display = 'none';
        gamePlaying = false
    }else{
        document.querySelector('.dice').style.display = 'none';
        changeUI();
    }
}
function changeUI(){
    lastDice = undefined;
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}

var scores, roundScore, activePlayer, gameActive, lastDice;

startNewGame();

document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gameActive) {
        //random number
        const dice = Math.floor(Math.random() * 6) + 1

        //display the results
        const diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        //implement 2times throwing 6 makes you lose score
        /* if (dice === 6 && lastDice === 6) {
            //Player looses score
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = '0';
            nextPlayer();
        } else 
        */
      
        if (dice !== 1) {
            //add to score
            roundScore += dice
            document.querySelector('#current-' + activePlayer ).textContent = roundScore;
        } else {
            nextPlayer()
        }
    }  
        /*
        lastDice = dice;
        */
})

document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gameActive) {
        //update scores
        scores[activePlayer] += roundScore;

        //update UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer]

        var input = document.querySelector('.set-score').value;
        var winningScore;
        
        // Undefined, 0, null or "" are COERCED to false
        // Anything else is COERCED to true
        if(input) {
            winningScore = input;
        } else {
            winningScore = 100;
        }

        //check if player won the game
        if (scores[activePlayer] >= winningScore) {
            
            document.getElementById('name-' + activePlayer).textContent = 'WINNER!!'
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner')
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active')

            gameActive = false
            setTimeout(function() {startNewGame()}, 5000)
            
        } else {
            nextPlayer()
        }
    }
})

document.querySelector('.btn-new').addEventListener('click', startNewGame)

function nextPlayer() {
    roundScore = 0
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

    document.querySelector('#current-' + activePlayer ).textContent = roundScore;

    document.querySelector('.player-0-panel').classList.toggle('active')
    document.querySelector('.player-1-panel').classList.toggle('active')

    document.querySelector('.dice').style.display = 'none';
}


function startNewGame() {
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    winningScore = 100;
    gameActive = true;

    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'PLAYER 1'
    document.getElementById('name-1').textContent = 'PLAYER 2'

    document.querySelector('.player-0-panel').classList.remove('active')
    document.querySelector('.player-1-panel').classList.remove('active')
    document.querySelector('.player-0-panel').classList.add('active')
    document.querySelector('.player-0-panel').classList.remove('winner')
    document.querySelector('.player-1-panel').classList.remove('winner')
}




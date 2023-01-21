function createSquare(index) {
    const div = document.createElement('div');
    div.classList.add('game-square');
    div.addEventListener('click', (e) => gameBoard.addChoice(e, index), { once: true });

    return div;
}

const loadChoices = (() => {
    const choice1 = document.querySelector('#player1');
    const choice2 = document.querySelector('#player2');
    choice2.value = 'o'
    return { choice1, choice2 }
})()
// Create game board 
const gameBoard = (() => {
    const board = document.querySelector('.game-board');
    const gameFields = Array(9).fill('');
    const fillGameBoard = () => {
       
        board.innerHTML = '';
        gameFields.forEach((_, i) => board.appendChild(createSquare(i)));
        gameFields.fill('');
        
    };
    const addChoice = (e, i) => {
        const player = game.getTurn();
        if (isWinner(player.symbol) === false) {
            e.target.classList.add(`${player.symbol}`);
            gameFields[i] = player.symbol;
            
            if (isWinner(player.symbol)) game.gameOver(player) 
            else game.switchTurn()
        } 
        else if (isWinner(player.symbol) === null) game.gameOver(null);
        else {
            game.gameOver(player);
            
        };
    };
    const isWinner = (symbol) => {
        const winConditions = ['012', '345', '678', '036', '147', '258', '048', '246'];
        const choices = gameFields.reduce((acc, el, i) => {
            if (el === symbol) acc.push(i);
            return acc;
        }, []);
        let result = false;
        let i = 0;
        while (!result && i < winConditions.length) {
            const sequence = winConditions[i].split('');
            sequence.every((num) => choices.includes(+num)) ? result = true : result = false;
            i++;
        }
        if (choices.length === 5 && result === false) return null;
        return result;
    };
    return { fillGameBoard, addChoice };
})();

const player = (inp, name='Player1') => {
    let playerName = name;
    let score = 0;
    const symbol = inp;
    const addScore = () => score++;
    return { playerName, symbol, addScore };
};

const setPlayers = () => {
    console.log('Hey');
}

const game = (() => {
    let player1;
    let player2;
    let xTurn;
    const startGame = () => {
        if (loadChoices.choice1.value === loadChoices.choice2.value) return console.log('Invalid symbols')
        gameBoard.fillGameBoard();
        loadChoices.choice1.disabled = true;
        loadChoices.choice2.disabled = true;
        player1 = player(loadChoices.choice1.value, 'Player1');
        player2 = player(loadChoices.choice2.value, 'Player2');
    };
    const getTurn = () => {
        const currentTurn = xTurn ? player2 : player1;
        return currentTurn;
    };
    const switchTurn = () => {
        xTurn = !xTurn;
    };
    const gameOver = (player) => {
        const modal = document.querySelector('.modal');
        const overlay = document.querySelector('#overlay');
        const winnerMessage = document.querySelector('#winner-message');
        if (player.symbol === null) console.log('DRAW!');
        else {
            winnerMessage.textContent = `${player.playerName} wins`;
            modal.classList.add('active');
            overlay.classList.add('active');
        };
    }
    document.querySelector('#startGame').addEventListener('click', () => startGame());
    return { player1, player2, getTurn, switchTurn, gameOver };
})();

document.querySelector('#close').addEventListener('click', (e) => {
    console.log('Close modal');
    e.target.closest('#overlay').classList.remove('active');
    e.target.closest('.modal').classList.remove('active');
})

gameBoard.fillGameBoard()
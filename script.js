function createSquare(index) {
    const div = document.createElement('div');
    div.classList.add('game-square');
    div.addEventListener('click', (e) => gameBoard.addChoice(e, index), { once: true });

    return div;
}

const gameBoard = (() => {
    const board = document.querySelector('.game-board');
    const gameFields = Array(9).fill('');
    const fillGameBoard = () => {
        board.innerHTML = '';
        gameFields.forEach((_, i) => board.appendChild(createSquare(i)));
        gameFields.fill('');
    };
    const addChoice = (e, i) => {
        const symbol = game.getTurn();
        e.target.classList.add(`${symbol}`);
        gameFields[i] = game.getTurn();
        if (isWinner(symbol)) game.gameOver(symbol);
        else if (isWinner(symbol) === null) game.gameOver(symbol, null);
        else game.switchTurn();
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

const player = (inp) => {
    let score = 0;
    const symbol = inp;
    const addScore = () => score++;
    return { symbol, addScore };
};

const game = (() => {
    const player1 = player('x');
    const player2 = player('o');
    let xTurn;
    const startGame = () => {
        gameBoard.fillGameBoard();
    };
    const getTurn = () => {
        const currentTurn = xTurn ? player1 : player2;
        return currentTurn.symbol;
    };
    const switchTurn = () => {
        xTurn = !xTurn;
    };
    const gameOver = (symbol, draw) => {
        if (draw === null) console.log('DRAW!');
        else console.log(`${symbol} wins!`);
    }
    document.querySelector('#startGame').addEventListener('click', () => startGame());
    return { player1, player2, getTurn, switchTurn, gameOver };
})();

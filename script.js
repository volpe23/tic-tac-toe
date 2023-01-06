function createSquare(index) {
    const div = document.createElement('div');
    div.classList.add('game-square');
    div.addEventListener('click', () => console.log(index));
    return div;
}

// const Gameboard = {
//     board: document.querySelector('.game-board'),
//     boardSquares: Array(9).fill().map((_, i) => i + 1),

//     createBoard: function() {
//         this.boardSquares.forEach(_ => this.board.append(createSquare()));
//     }
// };

// function fillGameBoard() {

// }
const Gameboard = (() => {
    const board = document.querySelector('.game-board');
    const gameFields = Array(9).fill().map(x => x = '');

    const fillGameBoard = () => gameFields.forEach((_, i) => board.appendChild(createSquare(i)));
    const addChoice = (choice, index) => {
        gameFields[index].textContent = choice;
    };
    return { fillGameBoard, addChoice };
})();

const Player = (inp) => {
    let score = 0;
    const symbol = inp;
    const addScore = () => score++;
    return { symbol, addScore};
};

Gameboard.fillGameBoard();
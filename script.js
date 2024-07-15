const cells = document.querySelectorAll('.cell');
let currentPlayer = 'X';
let board = Array(9).fill(null);

const checkWinner = () => {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }

    return null;
};

const handleClick = (e) => {
    const index = e.target.dataset.index;
    if (board[index] || checkWinner()) return;

    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    if (checkWinner()) {
        setTimeout(() => alert(`Player ${currentPlayer} wins!`), 100);
    } else if (board.every(cell => cell)) {
        setTimeout(() => alert('It\'s a draw!'), 100);
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
};

const restartGame = () => {
    board.fill(null);
    cells.forEach(cell => {
        cell.textContent = '';
    });
    currentPlayer = 'X';
};

cells.forEach(cell => cell.addEventListener('click', handleClick));
document.getElementById('restartButton').addEventListener('click', restartGame);

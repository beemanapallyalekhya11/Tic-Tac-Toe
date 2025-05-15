const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('game-board');
const statusMessage = document.getElementById('statusMessage');
const restartButton = document.getElementById('restartButton');

let currentPlayer = 'X';
let isGameOver = false;

const EMOJIS = {
  'X': '❌',
  'O': '⭕'
};

const WINNING_COMBINATIONS = [
  [0, 1, 2], // Top row
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
  [0, 3, 6], // Left column
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column
  [0, 4, 8], // Diagonal TL-BR
  [2, 4, 6], // Diagonal TR-BL
];

startGame();

function startGame() {
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('x', 'o');
    cell.addEventListener('click', handleClick, { once: true });
  });
  currentPlayer = 'X';
  isGameOver = false;
  statusMessage.textContent = `Player ${EMOJIS[currentPlayer]}'s turn 😊`;
}

restartButton.addEventListener('click', startGame);

function handleClick(e) {
  if (isGameOver) return;
  const cell = e.target;
  cell.textContent = EMOJIS[currentPlayer];
  cell.classList.add(currentPlayer.toLowerCase());

  const winIndex = getWinningComboIndex(currentPlayer);
  if (winIndex !== -1) {
    endGame(false, currentPlayer);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
  }
}

function swapTurns() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusMessage.textContent = `Player ${EMOJIS[currentPlayer]}'s turn 😊`;
}

function endGame(draw, winner = null) {
  isGameOver = true;
  if (draw) {
    statusMessage.textContent = "It's a draw! 🤝";
  } else {
    statusMessage.textContent = `Player ${EMOJIS[winner]} wins! 🎉`;
  }
}

function isDraw() {
  return [...cells].every(cell => cell.textContent !== '');
}

function getWinningComboIndex(player) {
  for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
    const combo = WINNING_COMBINATIONS[i];
    if (combo.every(index => cells[index].classList.contains(player.toLowerCase()))) {
      return i;
    }
  }
  return -1;
}

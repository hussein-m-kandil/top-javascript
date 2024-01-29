console.log("Odin Tic Tac Toe: Ok!");

function createPlayer(name, type) {
  let score = 0;

  function incrementScore() {
    return ++score;
  }

  function render() {
    console.log(type + " Player, " + name + ", Score: " + score);
  }

  return { incrementScore, render };
}

const gameBoard = (function () {
  const board = Array(9).fill("", 0, 8);

  function isWinner() {
    if (
      (board[0] === board[1] && board[1] === board[2]) || // 1st row
      (board[0] === board[4] && board[4] === board[8]) || // Diagonal
      (board[3] === board[4] && board[4] === board[5]) || // 2nd row
      (board[6] === board[7] && board[7] === board[8]) || // 3rd row
      (board[6] === board[4] && board[4] === board[2]) // Diagonal
    ) {
      return true;
    }
    return false;
  }

  function clear() {
    board.splice(0, 9, Array(9).fill("", 0, 8));
  }

  function render() {
    console.table(board);
  }

  return { render, clear };
})();

const display = (function () {
  function render(gameBoard, x, o) {
    gameBoard.render();
    x.render();
    o.render();
  }

  return { render };
})();

// Create players
let xPlayerName, oPlayerName;
// do {
// xPlayerName = window.prompt("X Player Name: ");
// oPlayerName = window.prompt("O Player Name: ");
// } while (!xPlayerName || !oPlayerName);
const xPlayer = createPlayer(xPlayerName, "X");
const oPlayer = createPlayer(oPlayerName, "O");

// Play a game
display.render(gameBoard, xPlayer, oPlayer);

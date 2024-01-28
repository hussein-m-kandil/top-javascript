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
  const board = [
    ["s", "", "s"],
    ["", "s", ""],
    ["s", "", "s"],
  ];

  function clear() {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        board[i][j] = "";
      }
    }
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
do {
  xPlayerName = window.prompt("X Player Name: ");
  oPlayerName = window.prompt("O Player Name: ");
} while (!xPlayerName || !oPlayerName);
const xPlayer = createPlayer(xPlayerName, "X");
const oPlayer = createPlayer(oPlayerName, "O");

// Play a game
display.render(gameBoard, xPlayer, oPlayer);

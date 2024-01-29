const gameEvents = (function () {
  const events = {};

  function add(eventName, callbackfn) {
    if (typeof eventName === "string" && typeof callbackfn === "function") {
      events[eventName] = events[eventName] ?? [];
      events[eventName].push(callbackfn);
    }
  }

  function remove(eventName, callbackfn) {
    if (typeof eventName === "string") {
      const callbacks = events[eventName];
      if (Array.isArray(callbacks)) {
        const i = callbacks.indexOf(callbackfn);
        if (i > -1) {
          callbacks.splice(i, 1);
        }
      }
    }
  }

  function emit(eventName) {
    if (typeof eventName === "string") {
      const callbacks = events[eventName];
      if (Array.isArray(callbacks)) {
        callbacks.forEach((callbackfn) => callbackfn());
      }
    }
  }

  return { add, remove, emit };
})();

const gameBoard = (function () {
  const board = Array(9).fill("", 0);

  function validateIndex(placeIndex) {
    const i = Number(placeIndex);
    if (Number.isInteger(i) && i >= 0 && i < 9) {
      return i;
    }
    return -1;
  }

  function isValidPlace(placeIndex) {
    return !board[placeIndex];
  }

  function checkForWin() {
    if (
      (board[0] && board[0] === board[1] && board[1] === board[2]) || // 1st row
      (board[3] && board[3] === board[4] && board[4] === board[5]) || // 2nd row
      (board[6] && board[6] === board[7] && board[7] === board[8]) || // 3rd row
      (board[0] && board[0] === board[3] && board[3] === board[6]) || // 1st column
      (board[1] && board[1] === board[4] && board[4] === board[7]) || // 2nd column
      (board[2] && board[2] === board[5] && board[5] === board[8]) || // 3rd column
      (board[0] && board[0] === board[4] && board[4] === board[8]) || // Diagonal
      (board[6] && board[6] === board[4] && board[4] === board[2]) // Diagonal
    ) {
      gameEvents.emit("win");
    }
  }

  function clear() {
    board.fill("", 0);
  }

  function render() {
    console.table([
      [board[0], board[1], board[2]],
      [board[3], board[4], board[5]],
      [board[6], board[7], board[8]],
    ]);
  }

  function mark(placeIndex, marker) {
    const i = validateIndex(placeIndex);
    if (i > -1) {
      if (isValidPlace(i)) {
        board[i] = marker;
        render();
        checkForWin();
      }
    }
  }

  function isEmptyPlace() {
    for (let i = 0; i < board.length; i++) {
      if (!board[i]) {
        return true;
      }
    }
  }

  return { clear, render, mark, isEmptyPlace };
})();

function createPlayer(name, type) {
  let score = 0;

  function getName() {
    return name;
  }

  function getType() {
    return type;
  }

  function getScore() {
    return score;
  }

  function incrementScore() {
    return ++score;
  }

  function render() {
    console.log(type + " Player, " + name + ", Score: " + score);
  }

  return { getName, getType, getScore, incrementScore, render };
}

// Create players
let xPlayerName = "Foo",
  oPlayerName = "Baz";
// do {
// xPlayerName = window.prompt("X Player Name: ");
// oPlayerName = window.prompt("O Player Name: ");
// } while (!xPlayerName || !oPlayerName);
const xPlayer = createPlayer(xPlayerName, "X");
const oPlayer = createPlayer(oPlayerName, "O");
const players = [xPlayer, oPlayer];

// Play a game
gameBoard.render(), xPlayer.render(), oPlayer.render();

let win = false;
function onWin() {
  win = true;
}
gameEvents.add("win", onWin);
const usedPlaces = [];
let currentPlayer,
  i = 0;
while (gameBoard.isEmptyPlace() && !win) {
  let randomPlaceIndex; // Choose a random, not used place
  do {
    randomPlaceIndex = Math.floor(Math.random() * 9);
  } while (usedPlaces.includes(randomPlaceIndex));
  usedPlaces.push(randomPlaceIndex); // Mark chosen place as used
  currentPlayer = players[i % 2]; // Toggle current player
  console.log(
    "Current Player: " +
      currentPlayer.getName() +
      ", Type: " +
      currentPlayer.getType() +
      ", Mark on: " +
      randomPlaceIndex +
      "."
  );
  gameBoard.mark(randomPlaceIndex, currentPlayer.getType());
  i++;
}

if (win) {
  console.log("'" + currentPlayer.getName() + "' Win!");
} else {
  console.log("Tie!");
}

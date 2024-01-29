(function () {
  const WIN_EVENT_NAME = "win";
  const TIE_EVENT_NAME = "tie";

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
            if (callbacks.length < 1) delete events[eventName];
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
    const board = Array(9);

    function init() {
      board.fill("", 0);
      render();
    }

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

    function isEmptyPlace() {
      for (let i = 0; i < board.length; i++) {
        if (!board[i]) {
          return true;
        }
      }
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
        gameEvents.emit(WIN_EVENT_NAME);
      }
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

    return { init, mark, isEmptyPlace };
  })(WIN_EVENT_NAME, TIE_EVENT_NAME);

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

    function init() {
      render();
    }

    return { init, getName, getType, getScore, incrementScore };
  }

  // Create players
  let xPlayerName = "Foo",
    oPlayerName = "Baz";
  // do {
  // xPlayerName = window.prompt("X Player Name: ");
  // oPlayerName = window.prompt("O Player Name: ");
  // } while (!xPlayerName || !oPlayerName);
  const players = [
    createPlayer(xPlayerName, "X"),
    createPlayer(oPlayerName, "O"),
  ];

  // Play a game
  gameBoard.init(), players[0].init(), players[1].init();

  let win = false;
  function onWin() {
    win = true;
  }
  gameEvents.add(WIN_EVENT_NAME, onWin);
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

  gameEvents.remove(WIN_EVENT_NAME, onWin);
})();

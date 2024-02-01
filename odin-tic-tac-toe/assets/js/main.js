(function () {
  const gameEvents = (function () {
    const START_EVENT_NAME = "start";
    const WIN_EVENT_NAME = "win";
    const TIE_EVENT_NAME = "tie";
    const END_EVENT_NAME = "end";
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

    function emit(eventName, ...args) {
      if (typeof eventName === "string") {
        const callbacks = events[eventName];
        if (Array.isArray(callbacks)) {
          callbacks.forEach((callbackfn) => callbackfn(...args));
        }
      }
    }

    return {
      add,
      remove,
      emit,
      START_EVENT_NAME,
      WIN_EVENT_NAME,
      TIE_EVENT_NAME,
      END_EVENT_NAME,
    };
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
        gameEvents.emit(gameEvents.WIN_EVENT_NAME);
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
  })();

  const displayController = (function () {
    const welcomeDialog = document.createElement("dialog");

    function handleNumOfPlayers(event) {
      const numOfPlayers = Number(event.target.value);
      gameEvents.emit(gameEvents.START_EVENT_NAME, numOfPlayers);
    }

    function createChoicesButtons(className, textContentArr, clickHandler) {
      const buttons = [];
      for (let i = 0; i < 2; i++) {
        const x = i + 1;
        buttons[i] = document.createElement("button");
        buttons[i].setAttribute("type", "button");
        buttons.className = className;
        buttons[i].textContent = textContentArr[i];
        buttons[i].value = String(textContentArr[i].slice(0, 1)).toLowerCase();
        buttons[i].addEventListener("click", clickHandler);
      }
      return buttons;
    }

    function fillWelcomeDialog([firstChoice, secondChoice]) {
      const welcomeDiv = document.createElement("div");
      welcomeDiv.className = "welcome";
      welcomeDiv.append(firstChoice, secondChoice);
      welcomeDialog.appendChild(welcomeDiv);
    }

    function EmptyWelcomeDialog() {
      welcomeDialog.childNodes.forEach((child) => child.remove());
    }

    function terminateWelcomeDialog() {
      welcomeDialog.close();
      setTimeout(() => welcomeDialog.remove(), 1000);
    }

    function onStart(num) {
      if (num === 1) {
        EmptyWelcomeDialog();
        fillWelcomeDialog(
          createChoicesButtons(
            "players-type-choice",
            ["X", "O"],
            terminateWelcomeDialog
          )
        );
      } else {
        terminateWelcomeDialog();
      }
    }

    function init() {
      gameEvents.add(gameEvents.START_EVENT_NAME, onStart);
      fillWelcomeDialog(
        createChoicesButtons(
          "players-num-choice",
          ["1 Player", "2 Players"],
          handleNumOfPlayers
        )
      );
      document.body.appendChild(welcomeDialog);
      welcomeDialog.showModal();
    }

    return { init };
  })();

  const playerCreator = (function () {
    function create(type) {
      let score = 0;

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
        console.log(type + " Player, Score: " + score);
      }

      function init() {
        render();
      }

      return { init, getType, getScore, incrementScore };
    }

    return { create };
  })();

  // Create players
  const players = [playerCreator.create("X"), playerCreator.create("O")];

  // Play a game
  let numOfPlayers;
  function onStart(num) {
    numOfPlayers = num;
    console.log("" + num + " Player" + (num > 1 ? "s" : "") + " Game.");
  }
  gameEvents.add(gameEvents.START_EVENT_NAME, onStart);
  displayController.init();
  gameBoard.init(), players[0].init(), players[1].init();

  let win = false;
  function onWin() {
    win = true;
  }
  gameEvents.add(gameEvents.WIN_EVENT_NAME, onWin);
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
        currentPlayer.getType() +
        ", Mark on: " +
        randomPlaceIndex +
        "."
    );
    gameBoard.mark(randomPlaceIndex, currentPlayer.getType());
    i++;
  }

  if (win) {
    console.log("" + currentPlayer.getType() + " Win!");
  } else {
    console.log("Tie!");
  }

  gameEvents.remove(gameEvents.WIN_EVENT_NAME, onWin);
})();

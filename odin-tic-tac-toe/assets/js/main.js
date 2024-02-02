(function () {
  const gameEvents = (function () {
    const START_EVENT_NAME = "start";
    const WIN_EVENT_NAME = "win";
    const TIE_EVENT_NAME = "tie";
    const MARK_EVENT_NAME = "mark";
    const ONE_PLAYER_GAME_EVENT_NAME = "oneplayergame";
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
      ONE_PLAYER_GAME_EVENT_NAME,
      WIN_EVENT_NAME,
      MARK_EVENT_NAME,
      TIE_EVENT_NAME,
    };
  })();

  const gameBoard = (function () {
    const board = Array(9);

    function init() {
      board.fill("", 0);
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

    function checkForWin(type) {
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
        gameEvents.emit(gameEvents.WIN_EVENT_NAME, type);
      }
    }

    function mark(placeIndex, type) {
      const i = validateIndex(placeIndex);
      if (i > -1) {
        if (isValidPlace(i)) {
          board[i] = type;
          checkForWin(type);
          return true;
        } else {
          return false;
        }
      }
    }

    return { init, mark, isEmptyPlace };
  })();

  const displayController = (function () {
    const dialog = document.createElement("dialog");

    function handleNumOfPlayers(event) {
      const numOfPlayers = Number(event.target.value);
      gameEvents.emit(gameEvents.START_EVENT_NAME, numOfPlayers);
    }

    function createDialogContentDiv() {
      const dialogContentDiv = document.createElement("div");
      dialogContentDiv.className = "dialog-content";
      return dialogContentDiv;
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

    function createWelcomeContent([firstChoice, secondChoice]) {
      const welcomeDiv = createDialogContentDiv();
      welcomeDiv.append(firstChoice, secondChoice);
      return welcomeDiv;
    }

    function fillDialog(content) {
      dialog.appendChild(content);
    }

    function showDialog() {
      document.body.appendChild(dialog);
      dialog.showModal();
    }

    function emptyDialog() {
      dialog.childNodes.forEach((child) => child.remove());
    }

    function terminateDialog() {
      dialog.close();
      emptyDialog();
      setTimeout(() => dialog.remove(), 1000);
    }

    function onStart(num) {
      if (num === 1) {
        emptyDialog();
        fillDialog(
          createWelcomeContent(
            createChoicesButtons("players-type-choice", ["X", "O"], (event) => {
              terminateDialog();
              gameEvents.emit(
                gameEvents.ONE_PLAYER_GAME_EVENT_NAME,
                event.target.value
              );
            })
          )
        );
      } else {
        terminateDialog();
      }
    }

    function createMessageDiv(message) {
      const messageDiv = document.createElement("div");
      messageDiv.className = "message";
      messageDiv.textContent = message;
      return messageDiv;
    }

    function createDialogCloseButton() {
      const button = document.createElement("button");
      button.setAttribute("type", "button");
      button.className = "dialog-close circle-btn";
      button.textContent = "x";
      button.addEventListener("click", terminateDialog);
      return button;
    }

    function showMessage(message) {
      const contentDiv = createDialogContentDiv();
      contentDiv.append(createDialogCloseButton(), createMessageDiv(message));
      fillDialog(contentDiv);
      showDialog();
    }

    function listenToAllBoardCells() {
      document.querySelectorAll(".board-cell")?.forEach((cell, cellIndex) =>
        cell.addEventListener("click", () => {
          gameEvents.emit(gameEvents.MARK_EVENT_NAME, cell, cellIndex);
        })
      );
    }

    function init() {
      gameEvents.add(gameEvents.START_EVENT_NAME, onStart);
      listenToAllBoardCells();
      fillDialog(
        createWelcomeContent(
          createChoicesButtons(
            "players-num-choice",
            ["1 Player", "2 Players"],
            handleNumOfPlayers
          )
        )
      );
      showDialog();
    }

    function mark(cell, type) {
      cell.textContent = type;
    }

    function showWinMessage(type) {
      showMessage("" + String(type).toUpperCase() + " Win!");
    }

    function showTieMessage(type) {
      showMessage("Tie!");
    }

    return { init, mark, showWinMessage, showTieMessage };
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

      return { getType, getScore, incrementScore };
    }

    return { create };
  })();

  // Play a game
  const players = [playerCreator.create("X"), playerCreator.create("O")];
  let numOfPlayers,
    computerType,
    gameStarted = false,
    win = false,
    roundNum = 0;

  function onStart(value) {
    const num = Number(value);
    if (!Number.isNaN(num)) {
      numOfPlayers = num;
      gameStarted = num === 2;
    }
  }

  function onOneGamePlayer(value) {
    computerType = String(value).toLocaleLowerCase() === "x" ? "O" : "X";
    gameStarted = true;
  }

  function onMark(cell, cellIndex) {
    if (gameStarted) {
      if (gameBoard.isEmptyPlace()) {
        let currentPlayerType = players[roundNum % 2].getType();
        marked = gameBoard.mark(cellIndex, currentPlayerType);
        if (marked) {
          roundNum++;
          displayController.mark(cell, currentPlayerType);
        }
      } else {
        gameEvents.emit(gameEvents.TIE_EVENT_NAME);
      }
    }
  }

  function onWin(type) {
    setTimeout(() => displayController.showWinMessage(type), 500);
    win = true;
    gameStarted = false;
  }

  function onTie() {
    setTimeout(() => displayController.showTieMessage(), 500);
    gameStarted = false;
  }

  gameEvents.add(gameEvents.START_EVENT_NAME, onStart);
  gameEvents.add(gameEvents.ONE_PLAYER_GAME_EVENT_NAME, onOneGamePlayer);
  gameEvents.add(gameEvents.MARK_EVENT_NAME, onMark);
  gameEvents.add(gameEvents.WIN_EVENT_NAME, onWin);
  gameEvents.add(gameEvents.TIE_EVENT_NAME, onTie);

  gameBoard.init(), displayController.init();

  // TEST...

  // const testInterval = setInterval(testGame, 500);
  // function testGame() {
  //   if (roundNum === 0) {
  //     document
  //       .querySelector('dialog>.dialog-content>button[value="2"]')
  //       .click();
  //   }
  //   const usedPlaces = [];
  //   if (!win) {
  //     let randomPlaceIndex; // Choose a random, not used place
  //     do {
  //       randomPlaceIndex = Math.floor(Math.random() * 9);
  //     } while (usedPlaces.includes(randomPlaceIndex));
  //     usedPlaces.push(randomPlaceIndex); // Mark chosen place as used
  //     document.querySelectorAll(".board-cell")[randomPlaceIndex].click();
  //   } else {
  //     clearInterval(testInterval);
  //   }
  // }

  // TEMP CODE...

  // let win = false;
  // function onWin() {
  //   win = true;
  // }
  // gameEvents.add(gameEvents.WIN_EVENT_NAME, onWin);
  // const usedPlaces = [];
  // let currentPlayer,
  //   i = 0;
  // if (gameBoard.isEmptyPlace() && !win) {
  //   let randomPlaceIndex; // Choose a random, not used place
  //   do {
  //     randomPlaceIndex = Math.floor(Math.random() * 9);
  //   } while (usedPlaces.includes(randomPlaceIndex));
  //   usedPlaces.push(randomPlaceIndex); // Mark chosen place as used
  //   currentPlayer = players[i % 2]; // Toggle current player
  //   gameBoard.mark(randomPlaceIndex, currentPlayer.getType());
  //   document.querySelectorAll(".board-cell")[randomPlaceIndex].click();
  //   i++;
  // }

  // if (win) {
  //   console.log("" + currentPlayer.getType() + " Win!");
  // } else {
  //   console.log("Tie!");
  // }

  // gameEvents.remove(gameEvents.WIN_EVENT_NAME, onWin);
})();

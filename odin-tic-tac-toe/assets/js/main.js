(function () {
  const gameEvents = (function () {
    // Game events' names
    const START_EVENT_NAME = "start";
    const ONE_PLAYER_GAME_EVENT_NAME = "oneplayergame";
    const WIN_EVENT_NAME = "win";
    const TIE_EVENT_NAME = "tie";
    const MARK_EVENT_NAME = "mark";
    const MARKED_EVENT_NAME = "marked";
    const RESET_EVENT_NAME = "reset";
    const RESET_BOARD_EVENT_NAME = "resetboard";
    const RESTART_EVENT_NAME = "restart";
    // Game events' state
    let events;

    function init() {
      events = {};
    }

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
      init,
      add,
      remove,
      emit,
      START_EVENT_NAME,
      ONE_PLAYER_GAME_EVENT_NAME,
      WIN_EVENT_NAME,
      MARK_EVENT_NAME,
      MARKED_EVENT_NAME,
      TIE_EVENT_NAME,
      RESET_EVENT_NAME,
      RESET_BOARD_EVENT_NAME,
      RESTART_EVENT_NAME,
    };
  })();

  const gameBoard = (function () {
    const board = Array(9);

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
      } else if (!isEmptyPlace()) {
        gameEvents.emit(gameEvents.TIE_EVENT_NAME);
      }
    }

    function mark(placeIndex, type) {
      const i = validateIndex(placeIndex);
      if (i > -1) {
        if (isEmptyPlace() && isValidPlace(i)) {
          board[i] = type;
          checkForWin(type);
          return true;
        } else {
          return false;
        }
      }
    }

    function onResetBoard() {
      board.fill("", 0);
    }

    function init() {
      board.fill("", 0);
      gameEvents.add(gameEvents.RESET_BOARD_EVENT_NAME, onResetBoard);
    }

    return { init, mark, isEmptyPlace };
  })();

  const display = (function () {
    const dialog = document.createElement("dialog");
    const allBoardCells = document.querySelectorAll(".board-cell");
    const playersNum = document.querySelector(".players-num");
    const xScore = document.querySelector("span.x-score");
    const oScore = document.querySelector("span.o-score");
    const ties = document.querySelector("span.ties");
    const currentPlayer = document.querySelector(".current-player");
    let eventListenersAdded = false;

    function handleNumOfPlayers(event) {
      const numOfPlayers = Number(event.target.value);
      gameEvents.emit(gameEvents.START_EVENT_NAME, numOfPlayers);
      playersNum.textContent = numOfPlayers === 1 ? "1 Player" : "2 Players";
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
      setTimeout(() => dialog.remove(), 500);
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

    function showWinMessage(type) {
      showMessage("" + String(type).toUpperCase() + " Win!");
    }

    function showTieMessage(type) {
      showMessage("Tie!");
    }

    function onMarked(cell, type) {
      cell.textContent = type;
      if (String(type).toLowerCase() === "x") {
        currentPlayer.textContent = "O";
      } else {
        currentPlayer.textContent = "X";
      }
    }

    function onWin(type) {
      setTimeout(() => {
        showWinMessage(type);
        if (String(type).toLowerCase() === "x") {
          let currentScore = Number(xScore.textContent);
          xScore.textContent = currentScore ? ++currentScore : 1;
        } else {
          let currentScore = Number(oScore.textContent);
          oScore.textContent = currentScore ? ++currentScore : 1;
        }
        currentPlayer.textContent = "X";
      }, 500);
    }

    function onTie() {
      setTimeout(() => {
        showTieMessage();
        let currentTies = Number(ties.textContent);
        ties.textContent = currentTies ? ++currentTies : 1;
        currentPlayer.textContent = "X";
      }, 500);
    }

    function onResetBoard() {
      allBoardCells.forEach((cell) => (cell.textContent = ""));
      currentPlayer.textContent = "X";
    }

    function listenToResetButton() {
      document
        .querySelector(".reset")
        .addEventListener("click", () =>
          gameEvents.emit(gameEvents.RESET_EVENT_NAME)
        );
    }

    function listenToAllBoardCells() {
      allBoardCells.forEach((cell, cellIndex) =>
        cell.addEventListener("click", () => {
          gameEvents.emit(gameEvents.MARK_EVENT_NAME, cell, cellIndex);
        })
      );
    }

    function addEventListeners() {
      listenToResetButton();
      listenToAllBoardCells();
      eventListenersAdded = true;
    }

    function resetState() {
      playersNum.textContent = "1 Player";
      xScore.textContent = "0";
      oScore.textContent = "0";
      ties.textContent = "0";
      currentPlayer.textContent = "X";
    }

    function init() {
      gameEvents.add(gameEvents.START_EVENT_NAME, onStart);
      gameEvents.add(gameEvents.WIN_EVENT_NAME, onWin);
      gameEvents.add(gameEvents.TIE_EVENT_NAME, onTie);
      gameEvents.add(gameEvents.MARKED_EVENT_NAME, onMarked);
      gameEvents.add(gameEvents.RESET_BOARD_EVENT_NAME, onResetBoard);
      if (!eventListenersAdded) addEventListeners();
      resetState();
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

    return { init };
  })();

  const game = (function () {
    let players,
      numOfPlayers,
      computerType,
      gameStarted,
      boardRestarted,
      win,
      tie,
      markCount;

    function createPlayer(type) {
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
      if (gameStarted && !win && !tie) {
        let type = players[markCount % 2].getType();
        marked = gameBoard.mark(cellIndex, type);
        if (marked) {
          markCount++;
          gameEvents.emit(gameEvents.MARKED_EVENT_NAME, cell, type);
          boardRestarted = false;
        }
      }
    }

    function onWin() {
      win = true;
      tie = false;
    }

    function onTie() {
      tie = true;
      win = false;
    }

    function resetState() {
      win = false;
      tie = false;
      markCount = 0;
    }

    function onReset() {
      if (!boardRestarted) {
        resetState();
        gameEvents.emit(gameEvents.RESET_BOARD_EVENT_NAME);
        boardRestarted = true;
      } else {
        gameEvents.emit(gameEvents.RESTART_EVENT_NAME);
      }
    }

    function init() {
      players = [createPlayer("X"), createPlayer("O")];
      numOfPlayers = 0;
      computerType = null;
      gameStarted = false;
      boardRestarted = false;
      resetState();
      gameEvents.add(gameEvents.START_EVENT_NAME, onStart);
      gameEvents.add(gameEvents.ONE_PLAYER_GAME_EVENT_NAME, onOneGamePlayer);
      gameEvents.add(gameEvents.MARK_EVENT_NAME, onMark);
      gameEvents.add(gameEvents.WIN_EVENT_NAME, onWin);
      gameEvents.add(gameEvents.TIE_EVENT_NAME, onTie);
      gameEvents.add(gameEvents.RESET_EVENT_NAME, onReset);
    }

    return { init };
  })();

  // Play a game
  (function startNewGame() {
    gameEvents.init();
    gameEvents.add(gameEvents.RESTART_EVENT_NAME, startNewGame);
    gameBoard.init(), game.init(), display.init();
  })();

  // TEST...

  // const testInterval = setInterval(testGame, 500);
  // function testGame() {
  //   if (markCount === 0) {
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

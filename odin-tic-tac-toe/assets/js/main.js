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
    const COMPUTER_TURN_EVENT_NAME = "computerturn";
    const USER_TURN_EVENT_NAME = "userturn";
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
      COMPUTER_TURN_EVENT_NAME,
      USER_TURN_EVENT_NAME,
    };
  })();

  const gameBoard = (function () {
    const board = Array(9);
    const usedCells = [];

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
          usedCells.push(i);
          checkForWin(type);
          return true;
        } else {
          return false;
        }
      }
    }

    function onComputerTurn(computerType) {
      let randomCellIndex; // Choose a random, not used place
      do {
        randomCellIndex = Math.floor(Math.random() * 9);
      } while (usedCells.includes(randomCellIndex));
      setTimeout(
        () => {
          mark(randomCellIndex, computerType);
          gameEvents.emit(
            gameEvents.MARKED_EVENT_NAME,
            randomCellIndex,
            computerType
          );
          gameEvents.emit(gameEvents.USER_TURN_EVENT_NAME);
        },
        usedCells.length === 0 ? 2000 : 1000 // Respect start animation
      );
    }

    function resetState() {
      board.fill("", 0);
      usedCells.splice(0);
    }

    function onResetBoard() {
      resetState();
    }

    function init() {
      resetState();
      gameEvents.add(gameEvents.RESET_BOARD_EVENT_NAME, onResetBoard);
      gameEvents.add(gameEvents.COMPUTER_TURN_EVENT_NAME, onComputerTurn);
    }

    return { init, mark };
  })();

  const display = (function () {
    const dialog = document.createElement("dialog"),
      boardCells = [];
    let gameUI, playersNum, xScore, oScore, ties, currentPlayer, resetBtn;

    function handleNumOfPlayers(event) {
      const numOfPlayers = Number(event.target.value);
      gameEvents.emit(gameEvents.START_EVENT_NAME, numOfPlayers);
      playersNum.textContent = numOfPlayers === 1 ? "1 Player" : "2 Players";
    }

    function createElement(tagName, className, textContent, attrs) {
      const element = document.createElement(tagName);
      if (className) element.className = className;
      if (textContent) element.textContent = textContent;
      if (Array.isArray(attrs) && attrs.length > 0) {
        for (let i = 0; i < attrs.length; i++) {
          if (Array.isArray(attrs[i]) && attrs[i].length === 2) {
            element.setAttribute(attrs[i][0], attrs[i][1]);
          }
        }
      }
      return element;
    }

    function createGameUI() {
      // Game board section
      const playerTurn = createElement("div", "player-turn");
      currentPlayer = createElement("span", "current-player", "X");
      playerTurn.append(currentPlayer, document.createTextNode(" Turn"));
      const game = createElement("div", "game");
      const board = createElement("div", "board-container");
      for (let i = 0; i < 9; i++) {
        const cell = createElement("div", "board-cell");
        cell.addEventListener("click", () => {
          gameEvents.emit(gameEvents.MARK_EVENT_NAME, i);
        });
        board.appendChild(cell);
        boardCells.push(cell);
      }
      board.append(
        createElement("div", "horizontal-divider first-h-div"),
        createElement("div", "horizontal-divider last-h-div"),
        createElement("div", "vertical-divider first-v-div"),
        createElement("div", "vertical-divider last-v-div")
      );
      game.append(playerTurn, board);
      // Game control section
      const settings = createElement("div", "settings");
      playersNum = createElement("div", "players-num", "1 Player");
      resetBtn = createElement("button", "reset circle-btn", "↺", [
        ["type", "button"],
      ]);
      resetBtn.addEventListener("click", () =>
        gameEvents.emit(gameEvents.RESET_EVENT_NAME)
      );
      settings.append(playersNum, resetBtn);
      const scores = createElement("div", "scores");
      const xScoreDiv = createElement("div");
      xScore = createElement("span", "x-score", "0");
      xScoreDiv.append(document.createTextNode("X: "), xScore);
      const tiesDiv = createElement("div");
      ties = createElement("span", "ties", "0");
      tiesDiv.append(document.createTextNode("Ties: "), ties);
      const oScoreDiv = createElement("div");
      oScore = createElement("span", "o-score", "0");
      oScoreDiv.append(document.createTextNode("O: "), oScore);
      scores.append(xScoreDiv, tiesDiv, oScoreDiv);
      const control = createElement("div", "control");
      control.append(settings, scores);
      gameUI = createElement("div", "container");
      gameUI.append(control, game);
    }

    function startAnimation(element) {
      element.setAttribute("style", "opacity: 0; transform: scale(75%);");
    }

    function endAnimation(element) {
      setTimeout(() => {
        element.setAttribute("style", "opacity: 1; transform: scale(100%);");
        element.removeAttribute("style");
      }, 250);
    }

    function showGameUI() {
      startAnimation(gameUI);
      document.body.appendChild(gameUI);
      endAnimation(gameUI);
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
      startAnimation(dialog);
      dialog.showModal();
      endAnimation(dialog);
    }

    function emptyDialog() {
      [...dialog.children].forEach((child) => child.remove());
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
              showGameUI();
              gameEvents.emit(
                gameEvents.ONE_PLAYER_GAME_EVENT_NAME,
                event.target.value
              );
            })
          )
        );
      } else {
        terminateDialog();
        showGameUI();
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

    function resetBoard() {
      boardCells.forEach((cell) => (cell.textContent = ""));
      currentPlayer.textContent = "X";
    }

    function onMarked(cellIndex, type) {
      type = String(type);
      boardCells[cellIndex].textContent = type;
      if (type.toLowerCase() === "x") {
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
      }, 250);
    }

    function onTie() {
      setTimeout(() => {
        showTieMessage();
        let currentTies = Number(ties.textContent);
        ties.textContent = currentTies ? ++currentTies : 1;
        currentPlayer.textContent = "X";
      }, 250);
    }

    function onResetBoard() {
      resetBoard();
    }

    function resetState() {
      playersNum.textContent = "1 Player";
      xScore.textContent = "0";
      oScore.textContent = "0";
      ties.textContent = "0";
      currentPlayer.textContent = "X";
    }

    function init() {
      if (!gameUI) createGameUI();
      gameEvents.add(gameEvents.START_EVENT_NAME, onStart);
      gameEvents.add(gameEvents.WIN_EVENT_NAME, onWin);
      gameEvents.add(gameEvents.TIE_EVENT_NAME, onTie);
      gameEvents.add(gameEvents.MARKED_EVENT_NAME, onMarked);
      gameEvents.add(gameEvents.RESET_BOARD_EVENT_NAME, onResetBoard);
      resetState();
      resetBoard();
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
      userType,
      computerType,
      computerTurn,
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
      userType = computerType === "X" ? "O" : "X";
      computerTurn = computerType === "X";
      if (computerTurn) {
        gameEvents.emit(gameEvents.COMPUTER_TURN_EVENT_NAME, computerType);
      }
      gameStarted = true;
    }

    function onMark(cellIndex) {
      if (gameStarted && !computerTurn && !win && !tie) {
        let type;
        if (numOfPlayers === 2) {
          type = players[markCount % 2].getType();
        } else {
          type = userType;
        }
        const marked = gameBoard.mark(cellIndex, type);
        if (marked) {
          markCount++;
          gameEvents.emit(gameEvents.MARKED_EVENT_NAME, cellIndex, type);
          if (numOfPlayers === 1 && !win && !tie) {
            gameEvents.emit(gameEvents.COMPUTER_TURN_EVENT_NAME, computerType);
            computerTurn = true;
          }
          boardRestarted = false;
        }
      }
    }

    function onUserTurn() {
      computerTurn = false;
    }

    function resetState() {
      win = false;
      tie = false;
      markCount = 0;
      boardRestarted = true;
      computerTurn = numOfPlayers === 1 && computerType === "X";
      if (computerTurn) {
        gameEvents.emit(gameEvents.COMPUTER_TURN_EVENT_NAME, computerType);
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

    function onReset() {
      if (!boardRestarted) {
        gameEvents.emit(gameEvents.RESET_BOARD_EVENT_NAME);
        // boardRestarted = true;
        resetState();
      } else {
        gameEvents.emit(gameEvents.RESTART_EVENT_NAME);
      }
    }

    function init() {
      players = [createPlayer("X"), createPlayer("O")];
      numOfPlayers = 0;
      userType = null;
      computerType = null;
      gameStarted = false;
      // boardRestarted = false;
      resetState();
      gameEvents.add(gameEvents.START_EVENT_NAME, onStart);
      gameEvents.add(gameEvents.ONE_PLAYER_GAME_EVENT_NAME, onOneGamePlayer);
      gameEvents.add(gameEvents.MARK_EVENT_NAME, onMark);
      gameEvents.add(gameEvents.WIN_EVENT_NAME, onWin);
      gameEvents.add(gameEvents.TIE_EVENT_NAME, onTie);
      gameEvents.add(gameEvents.RESET_EVENT_NAME, onReset);
      gameEvents.add(gameEvents.USER_TURN_EVENT_NAME, onUserTurn);
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

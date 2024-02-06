(function () {
  const gameEvents = (function () {
    // Game events' names
    const START_EVENT_NAME = "start";
    const STARTED_EVENT_NAME = "started";
    const HARD_GAME_EVENT_NAME = "hard";
    const MEDIUM_GAME_EVENT_NAME = "medium";
    const EASY_GAME_EVENT_NAME = "easy";
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
      STARTED_EVENT_NAME,
      HARD_GAME_EVENT_NAME,
      MEDIUM_GAME_EVENT_NAME,
      EASY_GAME_EVENT_NAME,
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
    let computerCallbackTimeout, justStarted, hard, medium, easy;

    function isWin(boardArr) {
      // For every set of board cells (row, column or diagonal),
      // check whether first cell is not empty
      // and is equal the other cells in the set.
      return (
        // 1st row
        (boardArr[0] &&
          boardArr[0] === boardArr[1] &&
          boardArr[1] === boardArr[2]) ||
        // 2nd row
        (boardArr[3] &&
          boardArr[3] === boardArr[4] &&
          boardArr[4] === boardArr[5]) ||
        // 3rd row
        (boardArr[6] &&
          boardArr[6] === boardArr[7] &&
          boardArr[7] === boardArr[8]) ||
        // 1st column
        (boardArr[0] &&
          boardArr[0] === boardArr[3] &&
          boardArr[3] === boardArr[6]) ||
        // 2nd column
        (boardArr[1] &&
          boardArr[1] === boardArr[4] &&
          boardArr[4] === boardArr[7]) ||
        // 3rd column
        (boardArr[2] &&
          boardArr[2] === boardArr[5] &&
          boardArr[5] === boardArr[8]) ||
        // Diagonal
        (boardArr[0] &&
          boardArr[0] === boardArr[4] &&
          boardArr[4] === boardArr[8]) ||
        // Diagonal
        (boardArr[6] &&
          boardArr[6] === boardArr[4] &&
          boardArr[4] === boardArr[2])
      );
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

    function validateIndex(placeIndex) {
      const i = Number(placeIndex);
      if (Number.isInteger(i) && i >= 0 && i < 9) {
        return i;
      }
      return -1;
    }

    function checkForWin(type) {
      if (isWin(board)) {
        gameEvents.emit(gameEvents.WIN_EVENT_NAME, type);
      } else if (!isEmptyPlace()) {
        gameEvents.emit(gameEvents.TIE_EVENT_NAME);
      }
    }

    function mark(placeIndex, type) {
      justStarted = false;
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

    function selectRandomly() {
      let i;
      do {
        i = Math.floor(Math.random() * 9);
      } while (usedCells.includes(i));
      return i;
    }

    function shuffleArray(arr) {
      const newArr = [...arr];
      // Fisher-Yates shuffle algorithm
      for (let i = newArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        // Swap current element with random choice from left behind group of elements
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
      }
      return newArr;
    }

    function selectSpecial() {
      // Select cell in the middle/corners
      if (!usedCells.includes(4)) return 4;
      const specials = shuffleArray([0, 2, 6, 8]);
      for (let i = 0; i < specials.length; i++) {
        if (!usedCells.includes(specials[i])) return specials[i];
      }
      return null;
    }

    function selectWinningCellIndex(boardArr, type) {
      for (let i = 0; i < 9; i++) {
        if (!usedCells.includes(i)) {
          const oldValue = boardArr[i];
          boardArr[i] = type;
          if (isWin(boardArr)) return i;
          boardArr[i] = oldValue;
        }
      }
      return null;
    }

    function selectCleverly(computerType, userType) {
      const boardCopy = [...board];
      // If it is a hard game:
      return hard
        ? // Win, prevent user's win, select special cell or select any
          selectWinningCellIndex(boardCopy, computerType) ??
            selectWinningCellIndex(boardCopy, userType) ??
            selectSpecial() ??
            selectRandomly()
        : // Win, prevent user's win or select any
          selectWinningCellIndex(boardCopy, computerType) ??
            selectWinningCellIndex(boardCopy, userType) ??
            selectRandomly();
    }

    function selectEasily(computerType, userType) {
      const boardCopy = [...board];
      // Random the possibilities of preventing user's win
      const varDenominator = Math.floor(Math.random() * 2) + 2;
      return (
        // Win
        selectWinningCellIndex(boardCopy, computerType) ??
        // Prevent user's win, but not every time
        (usedCells.length % varDenominator === 0
          ? selectWinningCellIndex(boardCopy, userType)
          : null) ??
        // Select any
        selectRandomly()
      );
    }

    function onComputerTurn(computerType, userType) {
      let selectedCellIndex;
      if (hard || medium) {
        selectedCellIndex = selectCleverly(computerType, userType);
      } else {
        selectedCellIndex = selectEasily(computerType, userType);
      }
      computerCallbackTimeout = setTimeout(
        () => {
          mark(selectedCellIndex, computerType);
          gameEvents.emit(
            gameEvents.MARKED_EVENT_NAME,
            selectedCellIndex,
            computerType
          );
          gameEvents.emit(gameEvents.USER_TURN_EVENT_NAME);
        },
        justStarted ? 1500 : 1000 // Respect start animation
      );
    }

    function resetState() {
      board.fill("", 0);
      usedCells.splice(0);
      clearTimeout(computerCallbackTimeout);
      justStarted = false;
    }

    function onResetBoard() {
      resetState();
    }

    function onStart() {
      justStarted = true;
    }

    function onHard() {
      hard = true;
    }

    function onMedium() {
      medium = true;
    }

    function onEasy() {
      easy = true;
    }

    function init() {
      hard = false;
      medium = false;
      easy = false;
      resetState();
      gameEvents.add(gameEvents.RESET_BOARD_EVENT_NAME, onResetBoard);
      gameEvents.add(gameEvents.COMPUTER_TURN_EVENT_NAME, onComputerTurn);
      gameEvents.add(gameEvents.START_EVENT_NAME, onStart);
      gameEvents.add(gameEvents.HARD_GAME_EVENT_NAME, onHard);
      gameEvents.add(gameEvents.MEDIUM_GAME_EVENT_NAME, onMedium);
      gameEvents.add(gameEvents.EASY_GAME_EVENT_NAME, onEasy);
    }

    return { init, mark };
  })();

  const display = (function () {
    const dialog = document.createElement("dialog"),
      boardCells = [];
    let gameUI, playersNum, xScore, oScore, ties, currentPlayer, resetBtn;

    function startAnimation(element) {
      element.setAttribute("style", "opacity: 0; transform: scale(75%);");
    }

    function endAnimation(element) {
      setTimeout(() => {
        element.setAttribute("style", "opacity: 1; transform: scale(100%);");
        element.removeAttribute("style");
      }, 200);
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
      // Game control section
      const settings = createElement("div", "settings");
      playersNum = createElement("div", "players-num", "2 Players");
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
      // Game board section
      const playerTurn = createElement("div", "player-turn");
      currentPlayer = createElement("span", "current-player", "X");
      playerTurn.append(currentPlayer, document.createTextNode(" Turn"));
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
      const game = createElement("div", "game");
      game.append(playerTurn, board);
      // Game container
      gameUI = createElement("div", "container");
      gameUI.append(control, game);
    }

    function showGameUI() {
      startAnimation(gameUI);
      document.body.appendChild(gameUI);
      endAnimation(gameUI);
    }

    function createChoicesButtons(className, textContentArr, clickHandler) {
      const buttons = [];
      // Loop for the length of text content array
      for (let i = 0; i < textContentArr.length; i++) {
        buttons[i] = createElement("button", className, textContentArr[i], [
          ["type", "button"],
          ["value", textContentArr[i].slice(0, 1).toLowerCase()],
        ]);
        buttons[i].addEventListener("click", clickHandler);
      }
      return buttons;
    }

    function createDialog(contentsArr) {
      if (dialog.children.length > 0) {
        // Empty the dialog
        [...dialog.children].forEach((child) => child.remove());
      }
      const dialogContentDiv = createElement("div", "dialog-content");
      dialogContentDiv.append(...contentsArr);
      dialog.appendChild(dialogContentDiv);
    }

    function showDialog() {
      document.body.appendChild(dialog);
      startAnimation(dialog);
      dialog.showModal();
      endAnimation(dialog);
    }

    function terminateDialog() {
      dialog.close();
      setTimeout(() => dialog.remove(), 500);
    }

    function showMessage(message) {
      const closeButton = createElement(
        "button",
        "dialog-close circle-btn",
        "x",
        [["type", "button"]]
      );
      closeButton.addEventListener("click", terminateDialog);
      const messageDiv = createElement("div", "message", message);
      createDialog([closeButton, messageDiv]);
      setTimeout(showDialog, 500);
    }

    function askForDifficultyLevel(playerType) {
      createDialog(
        createChoicesButtons(
          "difficulty-level",
          ["Easy", "Medium", "Hard"],
          (event) => {
            const difficultyLevel = event.target.value;
            terminateDialog();
            showGameUI();
            gameEvents.emit(
              gameEvents.ONE_PLAYER_GAME_EVENT_NAME,
              playerType,
              difficultyLevel
            );
          }
        )
      );
    }

    function askForPlayerType() {
      createDialog(
        createChoicesButtons("players-type-choice", ["X", "O"], (event) => {
          askForDifficultyLevel(event.target.value);
        })
      );
    }

    function handleNumOfPlayers(event) {
      const numOfPlayers = Number(event.target.value);
      gameEvents.emit(gameEvents.START_EVENT_NAME, numOfPlayers);
      playersNum.textContent = numOfPlayers === 1 ? "1 Player" : "2 Players";
    }

    function resetBoard() {
      boardCells.forEach((cell) => (cell.textContent = ""));
    }

    function resetState() {
      playersNum.textContent = "1 Player";
      xScore.textContent = "0";
      oScore.textContent = "0";
      ties.textContent = "0";
      currentPlayer.textContent = "X";
    }

    function invertCurrentPlayerType(type) {
      if (type.toLowerCase() === "x") {
        currentPlayer.textContent = "O";
      } else {
        currentPlayer.textContent = "X";
      }
    }

    function onStart(num) {
      if (num === 1) {
        askForPlayerType();
      } else {
        terminateDialog();
        showGameUI();
      }
    }

    function onStarted(type) {
      currentPlayer.textContent = type;
    }

    function onMarked(cellIndex, type) {
      boardCells[cellIndex].textContent = type;
      invertCurrentPlayerType(type);
    }

    function onWin(type) {
      showMessage("" + type + " Win!");
      if (type === "X") {
        let currentScore = Number(xScore.textContent);
        xScore.textContent = currentScore ? ++currentScore : 1;
      } else {
        let currentScore = Number(oScore.textContent);
        oScore.textContent = currentScore ? ++currentScore : 1;
      }
    }

    function onTie() {
      showMessage("Tie!");
      let currentTies = Number(ties.textContent);
      ties.textContent = currentTies ? ++currentTies : 1;
    }

    function onResetBoard(type) {
      currentPlayer.textContent = type;
      resetBoard();
    }

    function onHard() {
      const gameLevelSpan = createElement("span", "game-level", " (Hard)");
      playersNum.appendChild(gameLevelSpan);
    }

    function onMedium() {
      const gameLevelSpan = createElement("span", "game-level", " (Medium)");
      playersNum.appendChild(gameLevelSpan);
    }

    function onEasy() {
      const gameLevelSpan = createElement("span", "game-level", " (Easy)");
      playersNum.appendChild(gameLevelSpan);
    }

    function init() {
      if (!gameUI) createGameUI();
      gameEvents.add(gameEvents.START_EVENT_NAME, onStart);
      gameEvents.add(gameEvents.STARTED_EVENT_NAME, onStarted);
      gameEvents.add(gameEvents.WIN_EVENT_NAME, onWin);
      gameEvents.add(gameEvents.TIE_EVENT_NAME, onTie);
      gameEvents.add(gameEvents.MARKED_EVENT_NAME, onMarked);
      gameEvents.add(gameEvents.RESET_BOARD_EVENT_NAME, onResetBoard);
      gameEvents.add(gameEvents.HARD_GAME_EVENT_NAME, onHard);
      gameEvents.add(gameEvents.MEDIUM_GAME_EVENT_NAME, onMedium);
      gameEvents.add(gameEvents.EASY_GAME_EVENT_NAME, onEasy);
      resetState();
      resetBoard();
      createDialog(
        createChoicesButtons(
          "players-num-choice",
          ["1 Player", "2 Players"],
          handleNumOfPlayers
        )
      );
      showDialog();
    }

    return { init };
  })();

  const game = (function () {
    let roundCount,
      players,
      currentPlayer,
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

    function invertCurrentPlayer() {
      markCount++;
      currentPlayer = players[markCount % 2];
    }

    function resetState() {
      win = false;
      tie = false;
      markCount = roundCount;
      currentPlayer = players[markCount % 2];
      boardRestarted = true;
      computerTurn =
        numOfPlayers === 1 && computerType === currentPlayer.getType();
    }

    function onStart(value) {
      const num = Number(value);
      if (!Number.isNaN(num)) {
        numOfPlayers = num;
        gameStarted = num === 2;
        if (gameStarted) {
          gameEvents.emit(
            gameEvents.STARTED_EVENT_NAME,
            currentPlayer.getType()
          );
        }
      }
    }

    function onOneGamePlayer(type, difficultyLevel) {
      if (type.toUpperCase() === players[0].getType()) {
        [userType, computerType] = [players[0].getType(), players[1].getType()];
      } else {
        [computerType, userType] = [players[0].getType(), players[1].getType()];
      }
      difficultyLevel = difficultyLevel.toLowerCase();
      let theWord;
      if (difficultyLevel === "h") {
        gameEvents.emit(gameEvents.HARD_GAME_EVENT_NAME);
        theWord = "hard";
      } else if (difficultyLevel === "m") {
        gameEvents.emit(gameEvents.MEDIUM_GAME_EVENT_NAME);
        theWord = "medium";
      } else {
        gameEvents.emit(gameEvents.EASY_GAME_EVENT_NAME);
        theWord = "easy";
      }
      console.log("I will go '" + theWord + "' with you!");
      computerTurn = computerType === currentPlayer.getType();
      if (computerTurn) {
        gameEvents.emit(
          gameEvents.COMPUTER_TURN_EVENT_NAME,
          computerType,
          userType
        );
      }
      gameStarted = true;
      gameEvents.emit(gameEvents.STARTED_EVENT_NAME, currentPlayer.getType());
    }

    function onMark(cellIndex) {
      if (gameStarted && !computerTurn && !win && !tie) {
        let type = currentPlayer.getType();
        const marked = gameBoard.mark(cellIndex, type);
        if (marked) {
          invertCurrentPlayer();
          gameEvents.emit(gameEvents.MARKED_EVENT_NAME, cellIndex, type);
          if (numOfPlayers === 1 && !win && !tie) {
            gameEvents.emit(
              gameEvents.COMPUTER_TURN_EVENT_NAME,
              computerType,
              userType
            );
            computerTurn = true;
          }
          boardRestarted = false;
        }
      }
    }

    function onUserTurn() {
      computerTurn = false;
      invertCurrentPlayer();
    }

    function onWin() {
      roundCount++;
      win = true;
      tie = false;
    }

    function onTie() {
      roundCount++;
      tie = true;
      win = false;
    }

    function onReset() {
      if (!boardRestarted) {
        resetState();
        gameEvents.emit(
          gameEvents.RESET_BOARD_EVENT_NAME,
          currentPlayer.getType()
        );
        if (computerTurn) {
          gameEvents.emit(
            gameEvents.COMPUTER_TURN_EVENT_NAME,
            computerType,
            userType
          );
        }
      } else {
        gameEvents.emit(gameEvents.RESTART_EVENT_NAME, currentPlayer.getType());
      }
    }

    function init() {
      roundCount = 0;
      players = [createPlayer("X"), createPlayer("O")];
      currentPlayer = players[0];
      numOfPlayers = 0;
      userType = null;
      computerType = null;
      gameStarted = false;
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
})();

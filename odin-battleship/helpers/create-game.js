import { createElement } from './create-element';
import { gameEvents } from '../game-events';
import { PlayerInfo } from '../components/player-info';
import { Board } from '../components/board';
import { Player } from '../player';

/**
 * Creates a game object to hold the state of the game
 * @returns @type {Object}
 */
function createNewState() {
  return {
    playersData: [
      {
        name: 'user',
        player: Player(Player.TYPES.HUMAN),
        playerUI: createElement('div', 'first-player'),
      },
      {
        name: 'computer',
        player: Player(Player.TYPES.COMPUTER),
        playerUI: createElement('div', 'second-player'),
      },
    ],
    currentPlayerIndex: 0,
    allPlayersDisabled: false,
    gameStarted: false,
    /**
     * Switches the current player's index
     */
    switchCurrentPlayer() {
      this.currentPlayerIndex = (this.currentPlayerIndex + 1) % 2;
    },
    /**
     * Renders the player's info section in the player's UI
     * @param {number} playerIndex
     */
    renderPlayerInfo(playerIndex) {
      const playerData = this.playersData[playerIndex];
      const oldChildren = [...playerData.playerUI.children];
      oldChildren.forEach((child) => child.remove());
      playerData.playerUI.append(
        PlayerInfo(
          playerData.name,
          playerData.player.type,
          this.gameStarted ? null : playerData.player.gameBoard,
        ),
      );
      if (oldChildren.length > 1) {
        playerData.playerUI.appendChild(oldChildren[1]);
      }
    },
    /**
     * Renders the player's board section in the player's UI
     * @param {number} playerIndex
     */
    renderPlayerBoard(playerIndex) {
      const playerData = this.playersData[playerIndex];
      const currentPlayer = playerIndex === this.currentPlayerIndex;
      const disabled =
        (this.allPlayersDisabled || currentPlayer) && this.gameStarted;
      const playerTypeComputer =
        playerData.player.type === Player.TYPES.COMPUTER;
      const clickable = playerTypeComputer && !currentPlayer && !disabled;
      if ([...playerData.playerUI.children].length > 1) {
        playerData.playerUI.removeChild(playerData.playerUI.lastChild);
      }
      playerData.playerUI.appendChild(
        Board(
          playerData.player.gameBoard,
          playerData.player.type === Player.TYPES.COMPUTER,
          disabled,
          clickable,
        ),
      );
    },
    /**
     * Renders the recent player's UI-information/board to the DOM
     * @param {number} playerIndex
     * @param {HTMLDivElement?} parentElement - Optional parent to append player's UI to it
     */
    renderPlayerUI(playerIndex, parentElement) {
      const playerData = this.playersData[playerIndex];
      [...playerData.playerUI.children].forEach((child) => child.remove());
      this.renderPlayerInfo(playerIndex);
      this.renderPlayerBoard(playerIndex);
      if (parentElement) parentElement.append(playerData.playerUI);
    },
    /**
     * Renders the recent ALL player's UIs-information/board to the DOM
     * @param {HTMLDivElement} parentElement - Optional parent to append ALL player's UIs to it
     */
    renderAllPlayersUI(parentElement) {
      for (let i = 0; i < this.playersData.length; i++) {
        this.renderPlayerUI(i, parentElement);
      }
    },
    /**
     * Plays on a computer's turn
     */
    playIfComputerTurn() {
      const currentPlayer = this.playersData[this.currentPlayerIndex].player;
      if (currentPlayer.type === Player.TYPES.COMPUTER) {
        setTimeout(() => {
          currentPlayer.play();
        }, 1000);
      }
    },
    /**
     * Checks whether the computer is the current player
     */
    isComputerCurrentPlayer() {
      return (
        this.playersData[this.currentPlayerIndex].player.type ===
        Player.TYPES.COMPUTER
      );
    },
  };
}

let gameState = createNewState();

let evaluatingAttack = false;

/** Handles ATTACK event */
function attackHandler(cellPlacePair) {
  if (!evaluatingAttack) {
    evaluatingAttack = true;
    const opponentIndex = gameState.currentPlayerIndex === 0 ? 1 : 0;
    const opponentPlayer = gameState.playersData[opponentIndex].player;
    opponentPlayer.gameBoard.receiveAttack(cellPlacePair);
    evaluatingAttack = false;
  }
}

/** Handles HIT event */
function hitHandler() {
  // Continue with the current player, but rerender the opponent's board
  gameState.renderPlayerUI(gameState.currentPlayerIndex === 0 ? 1 : 0);
  gameState.playIfComputerTurn();
}

/** Handles MISS event */
function missHandler() {
  gameState.switchCurrentPlayer();
  gameState.renderAllPlayersUI();
  gameState.playIfComputerTurn();
}

/** Handles LOSS event */
function lossHandler() {
  gameEvents.emit(gameEvents.GAME_OVER);
}

/** Handles SHIP_MOVED event */
function shipMovedHandler() {
  if (gameState.gameStarted) {
    gameState.renderAllPlayersUI();
  } else {
    gameState.renderPlayerBoard(0);
  }
}

/** Adds all game events' handlers */
function addGameEventsHandlers() {
  gameEvents.add(gameEvents.SHIP_MOVED, shipMovedHandler);
  gameEvents.add(gameEvents.ATTACK, attackHandler);
  gameEvents.add(gameEvents.HIT, hitHandler);
  gameEvents.add(gameEvents.MISS, missHandler);
  gameEvents.add(gameEvents.LOSS, lossHandler);
}

/** Removes all game events' handlers */
function removeGameEventsHandlers() {
  gameEvents.remove(gameEvents.SHIP_MOVED, shipMovedHandler);
  gameEvents.remove(gameEvents.ATTACK, attackHandler);
  gameEvents.remove(gameEvents.HIT, hitHandler);
  gameEvents.remove(gameEvents.MISS, missHandler);
  gameEvents.remove(gameEvents.LOSS, lossHandler);
}

/**
 * Creates a game object to hold the state of the game
 * @returns @type {BattleshipGame}
 */
export default function createGame(gameContainer) {
  return {
    gameContainer,
    initiateNewGame() {
      removeGameEventsHandlers();
      gameState = createNewState();
      addGameEventsHandlers();
      [...this.gameContainer.children].forEach((child) => child.remove());
      gameState.renderPlayerUI(0, this.gameContainer);
    },
    /**
     * - Resets game's state/events.
     * - Rerenders the game's UI after removing the old UI from the game's container.
     */
    startGame() {
      gameState.gameStarted = true;
      [...this.gameContainer.children].forEach((child) => child.remove());
      gameState.renderAllPlayersUI(this.gameContainer);
    },
    /** Checks whether the current player is the computer (should be called on a player's loss) */
    isComputerWon() {
      return gameState.isComputerCurrentPlayer();
    },
    /** Renders disabled UI */
    endCurrentGame() {
      gameState.gameStarted = false;
      gameState.allPlayersDisabled = true;
      gameState.renderAllPlayersUI();
    },
  };
}

export { createGame };

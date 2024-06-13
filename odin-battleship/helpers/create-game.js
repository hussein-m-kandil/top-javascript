import { createElement } from './create-element';
import { PlayerInfo } from '../components/player-info';
import { Board } from '../components/board';
import { Player } from '../player';

const BattleshipGame = {
  playersData: [
    {
      name: 'first-player',
      player: Player(Player.TYPES.HUMAN),
      playerUI: createElement('div', 'first-player'),
    },
    {
      name: 'second-player',
      player: Player(Player.TYPES.COMPUTER),
      playerUI: createElement('div', 'second-player'),
    },
  ],
  allPlayersDisabled: false,
  currentPlayerIndex: 0,
  /**
   * Switches the current player's index
   */
  switchCurrentPlayer() {
    this.currentPlayerIndex = (this.currentPlayerIndex + 1) % 2;
  },
  /**
   * Renders the recent player's UI-information/board to the DOM
   * @param {number} playerIndex
   * @param {HTMLDivElement?} parentElement - Optional parent to append player's UI to it
   */
  renderPlayerUI(playerIndex, parentElement) {
    const playerData = this.playersData[playerIndex];
    const currentPlayer = playerIndex === this.currentPlayerIndex;
    const disabled = this.allPlayersDisabled || currentPlayer;
    const playerTypeComputer = playerData.player.type === Player.TYPES.COMPUTER;
    const clickable = playerTypeComputer && !currentPlayer && !disabled;
    [...playerData.playerUI.children].forEach((child) => child.remove());
    playerData.playerUI.append(
      PlayerInfo(playerData.name, playerData.player.type),
      Board(
        playerData.player.gameBoard,
        playerData.player.type === Player.TYPES.COMPUTER,
        disabled,
        clickable,
      ),
    );
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
};

/**
 * Creates a game object to hold the state of the game
 * @returns {BattleshipGame}
 */
export default function createGame() {
  return BattleshipGame;
}

export { createGame };

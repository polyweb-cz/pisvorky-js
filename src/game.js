/**
 * Piškvorky 15×15 - Herní logika
 * Story 1.1: Vykreslit mřížku a střídání tahů
 * Story 1.2: Detekce výhry a remízy
 */

import { checkGameState } from './win-detector.js';

class TicTacToeGame {
    constructor(size = 15) {
        this.size = size;
        this.currentPlayer = 'X';
        this.gameState = this.initializeGameState();
        this.moveHistory = [];
        this.gameOver = false;
        this.winner = null;
        this.isDraw = false;
        this.winningCells = [];
    }

    /**
     * Inicializace herního stavu - vytvoří prázdnou 2D array
     * @returns {Array<Array<null>>} 2D pole 15×15 s hodnotami null
     */
    initializeGameState() {
        return Array.from({ length: this.size }, () =>
            Array.from({ length: this.size }, () => null)
        );
    }

    /**
     * Přidá tah na danou pozici
     * @param {number} row - řádek (0-14)
     * @param {number} col - sloupec (0-14)
     * @returns {boolean} true pokud byl tah úspěšný, false pokud pozice je již obsazená
     */
    makeMove(row, col) {
        // AC2.4 & AC2.7: Blokování tahů po výhře/remíze
        if (this.gameOver) {
            return false;
        }

        // Validace pozice
        if (row < 0 || row >= this.size || col < 0 || col >= this.size) {
            return false;
        }

        // Kontrola, zda je pole volné
        if (this.gameState[row][col] !== null) {
            return false;
        }

        // Uložení tahu
        this.gameState[row][col] = this.currentPlayer;
        this.moveHistory.push({ row, col, player: this.currentPlayer });

        // AC2.1: Kontrola výhry/remízy po tahu
        const gameStateResult = checkGameState(this.gameState, row, col, this.size);

        if (gameStateResult.isGameOver) {
            this.gameOver = true;

            if (gameStateResult.isWin) {
                // AC2.1, AC2.2: Výhra detekována
                this.winner = gameStateResult.winner;
                this.winningCells = gameStateResult.winningCells;
            } else if (gameStateResult.isDraw) {
                // AC2.5: Remíza detekována
                this.isDraw = true;
            }
        } else {
            // Střídání hráčů jen když hra pokračuje
            this.switchPlayer();
        }

        return true;
    }

    /**
     * Střídání hráčů X ↔ O
     */
    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    }

    /**
     * Vrátí hodnotu na dané pozici
     * @param {number} row - řádek
     * @param {number} col - sloupec
     * @returns {string|null} 'X', 'O' nebo null
     */
    getCellValue(row, col) {
        if (row < 0 || row >= this.size || col < 0 || col >= this.size) {
            return null;
        }
        return this.gameState[row][col];
    }

    /**
     * Kontrola, zda je pozice obsazená
     * @param {number} row - řádek
     * @param {number} col - sloupec
     * @returns {boolean} true pokud je obsazená
     */
    isCellOccupied(row, col) {
        return this.getCellValue(row, col) !== null;
    }

    /**
     * Reset hry do výchozího stavu
     * AC2.8: "Nová hra" resetuje stav a hraje X
     */
    reset() {
        this.currentPlayer = 'X';
        this.gameState = this.initializeGameState();
        this.moveHistory = [];
        this.gameOver = false;
        this.winner = null;
        this.isDraw = false;
        this.winningCells = [];
    }

    /**
     * Získání aktuálního hráče
     * @returns {string} 'X' nebo 'O'
     */
    getCurrentPlayer() {
        return this.currentPlayer;
    }

    /**
     * Získání celého herního stavu
     * @returns {Array<Array<string|null>>}
     */
    getGameState() {
        return this.gameState;
    }
}

/**
 * UI Controller - řídí renderování a interakci s DOM
 */
class GameUI {
    constructor(game) {
        this.game = game;
        this.gridContainer = document.getElementById('gridContainer');
        this.currentPlayerElement = document.getElementById('currentPlayer');
        this.resetButton = document.getElementById('resetButton');
        this.gameResultModal = document.getElementById('gameResultModal');
        this.gameResultMessage = document.getElementById('gameResultMessage');
        this.modalCloseButton = document.getElementById('modalCloseButton');

        this.init();
    }

    /**
     * Inicializace UI - vytvoření mřížky a event listeners
     */
    init() {
        this.renderGrid();
        this.attachEventListeners();
        this.updateTurnIndicator();
    }

    /**
     * Vykreslení mřížky 15×15
     */
    renderGrid() {
        this.gridContainer.innerHTML = '';

        for (let row = 0; row < this.game.size; row++) {
            for (let col = 0; col < this.game.size; col++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.dataset.row = row;
                cell.dataset.col = col;

                const value = this.game.getCellValue(row, col);
                if (value) {
                    cell.textContent = value;
                    cell.dataset.value = value;
                    cell.classList.add('occupied');
                }

                this.gridContainer.appendChild(cell);
            }
        }
    }

    /**
     * Připojení event listeners
     */
    attachEventListeners() {
        // Event delegation pro klikání na pole
        this.gridContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('cell')) {
                this.handleCellClick(e.target);
            }
        });

        // Reset button
        this.resetButton.addEventListener('click', () => {
            this.handleReset();
        });

        // Modal close button
        if (this.modalCloseButton) {
            this.modalCloseButton.addEventListener('click', () => {
                this.hideModal();
            });
        }

        // Zavření modalu kliknutím mimo
        if (this.gameResultModal) {
            this.gameResultModal.addEventListener('click', (e) => {
                if (e.target === this.gameResultModal) {
                    this.hideModal();
                }
            });
        }
    }

    /**
     * Obsluha kliknutí na pole
     * @param {HTMLElement} cellElement - element pole
     */
    handleCellClick(cellElement) {
        const row = parseInt(cellElement.dataset.row);
        const col = parseInt(cellElement.dataset.col);

        // Pokus o tah
        const moveSuccessful = this.game.makeMove(row, col);

        if (moveSuccessful) {
            // Update jen změněného pole
            this.updateCell(cellElement, row, col);
            // Update indikátoru tahu
            this.updateTurnIndicator();

            // AC2.1, AC2.2, AC2.3: Kontrola game over
            if (this.game.gameOver) {
                if (this.game.winner) {
                    // AC2.2: Zvýraznění výherní kombinace
                    this.highlightWinningCells();
                    // AC2.3: Zobrazení modalu s vítězem
                    this.showWinnerModal(this.game.winner);
                } else if (this.game.isDraw) {
                    // AC2.6: Zobrazení remízy
                    this.showDrawModal();
                }
            }
        }
    }

    /**
     * Update jednoho pole
     * @param {HTMLElement} cellElement - element pole
     * @param {number} row - řádek
     * @param {number} col - sloupec
     */
    updateCell(cellElement, row, col) {
        const value = this.game.getCellValue(row, col);
        if (value) {
            cellElement.textContent = value;
            cellElement.dataset.value = value;
            cellElement.classList.add('occupied');
        }
    }

    /**
     * Update indikátoru aktuálního hráče
     * AC3.3, AC3.4: Barva se mění podle hráče (X=červená, O=modrá)
     */
    updateTurnIndicator() {
        const currentPlayer = this.game.getCurrentPlayer();
        this.currentPlayerElement.textContent = currentPlayer;

        // Odstranit staré třídy
        this.currentPlayerElement.classList.remove('player-x', 'player-o');

        // Přidat novou třídu podle hráče
        if (currentPlayer === 'X') {
            this.currentPlayerElement.classList.add('player-x');
        } else if (currentPlayer === 'O') {
            this.currentPlayerElement.classList.add('player-o');
        }
    }

    /**
     * Obsluha resetu hry
     * AC2.8: Reset vrátí hru do výchozího stavu
     */
    handleReset() {
        this.game.reset();
        this.renderGrid();
        this.updateTurnIndicator();
        this.hideModal();
    }

    /**
     * AC2.2: Zvýraznění výherních polí
     */
    highlightWinningCells() {
        if (!this.game.winningCells || this.game.winningCells.length === 0) {
            return;
        }

        this.game.winningCells.forEach(([row, col]) => {
            const cell = this.gridContainer.querySelector(
                `[data-row="${row}"][data-col="${col}"]`
            );
            if (cell) {
                cell.classList.add('winning-cell');
            }
        });
    }

    /**
     * AC2.3: Zobrazení modalu s vítězem
     * @param {string} winner - 'X' nebo 'O'
     */
    showWinnerModal(winner) {
        if (!this.gameResultModal || !this.gameResultMessage) {
            return;
        }

        this.gameResultMessage.textContent = `Vítěz: ${winner}`;
        this.gameResultModal.classList.add('visible');
    }

    /**
     * AC2.6: Zobrazení modalu s remízou
     */
    showDrawModal() {
        if (!this.gameResultModal || !this.gameResultMessage) {
            return;
        }

        this.gameResultMessage.textContent = 'Remíza';
        this.gameResultModal.classList.add('visible');
    }

    /**
     * Skrytí modalu
     */
    hideModal() {
        if (!this.gameResultModal) {
            return;
        }

        this.gameResultModal.classList.remove('visible');
    }
}

// Inicializace hry při načtení stránky
let game;
let gameUI;

if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        game = new TicTacToeGame(15);
        gameUI = new GameUI(game);
    });
}

// Export pro testování (pro Node.js environment)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TicTacToeGame, GameUI };
}

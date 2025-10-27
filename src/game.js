/**
 * Piškvorky 15×15 - Herní logika
 * Story 1.1: Vykreslit mřížku a střídání tahů
 */

class TicTacToeGame {
    constructor(size = 15) {
        this.size = size;
        this.currentPlayer = 'X';
        this.gameState = this.initializeGameState();
        this.moveHistory = [];
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

        // Střídání hráčů
        this.switchPlayer();

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
     */
    reset() {
        this.currentPlayer = 'X';
        this.gameState = this.initializeGameState();
        this.moveHistory = [];
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
     */
    updateTurnIndicator() {
        this.currentPlayerElement.textContent = this.game.getCurrentPlayer();
    }

    /**
     * Obsluha resetu hry
     */
    handleReset() {
        this.game.reset();
        this.renderGrid();
        this.updateTurnIndicator();
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

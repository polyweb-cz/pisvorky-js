/**
 * Piškvorky 15×15 - Herní logika
 * Story 1.1: Vykreslit mřížku a střídání tahů
 * Story 1.2: Detekce výhry a remízy
 * Story 1.4: Režim s překážkami
 */

import { checkGameState } from './win-detector.js';
import { generateRandomObstacles, isObstacleSet, obstaclesToSet } from './obstacles.js';

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
        this.obstacles = []; // AC4.4: Pole s pozicemi zaminovaných polí
        this.obstaclesSet = new Set(); // Pro rychlé hledání O(1)
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
     * @returns {boolean} true pokud byl tah úspěšný, false pokud pozice je již obsazená nebo zaminovaná
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

        // AC4.6: Kontrola, zda je pole zaminované
        if (isObstacleSet(row, col, this.obstaclesSet)) {
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
     * Vrátí počet tahů v aktuální partii
     * Story 3.1: Detekce, zda byla partie hrana
     * @returns {number} Počet tahů v gameState
     */
    get moveCount() {
        let count = 0;
        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                if (this.gameState[row][col] !== null) {
                    count++;
                }
            }
        }
        return count;
    }

    /**
     * Reset hry do výchozího stavu
     * AC2.8: "Nová hra" resetuje stav a hraje X
     * AC4: Překážky se resetují (generují se nové nebo se odstraní)
     * Story 3.1: Automatický reset bez ohledu na počet tahů
     */
    reset() {
        this.currentPlayer = 'X';
        this.gameState = this.initializeGameState();
        this.moveHistory = [];
        this.gameOver = false;
        this.winner = null;
        this.isDraw = false;
        this.winningCells = [];
        // Překážky zůstávají - budou regenerovány v GameUI.handleReset()
    }

    /**
     * Nastaví překážky pro hru
     * @param {Array<Array<number>>} obstacles - Pole [[row, col], ...]
     */
    setObstacles(obstacles) {
        this.obstacles = obstacles;
        this.obstaclesSet = obstaclesToSet(obstacles);
    }

    /**
     * Vymaže všechny překážky
     */
    clearObstacles() {
        this.obstacles = [];
        this.obstaclesSet = new Set();
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
        this.obstaclesSelect = document.getElementById('obstaclesSelect'); // Story 4.4: Změna z checkbox na select

        this.init();
    }

    /**
     * Inicializace UI - vytvoření mřížky a event listeners
     */
    init() {
        // Story 4.5: Obnovit state selectu z URL hash
        this.restoreObstaclesFromURL();
        this.renderGrid();
        this.attachEventListeners();
        this.updateTurnIndicator();
    }

    /**
     * Story 4.5: Obnovit stav selectu z URL hash
     * Pokud je URL hash aktivní, automaticky generuje překážky
     */
    restoreObstaclesFromURL() {
        if (!this.obstaclesSelect) return;

        const enabled = this.getObstaclesFromHash();
        this.obstaclesSelect.value = enabled ? 'yes' : 'no';

        if (enabled) {
            // Vygeneruj překážky při startu, pokud je URL hash na 'yes'
            const obstacles = generateRandomObstacles(15, this.game.size);
            this.game.setObstacles(obstacles);
        }
    }

    /**
     * Story 4.5: Čti stav překážek z URL hash
     * @returns {boolean} true pokud jsou překážky zapnuty
     */
    getObstaclesFromHash() {
        try {
            const hash = window.location.hash.slice(1); // Odebrat #
            const params = new URLSearchParams(hash);
            return params.get('obstacles') === 'yes';
        } catch {
            return false; // Default: bez překážek
        }
    }

    /**
     * Story 4.5: Nastav stav překážek v URL hash
     * @param {boolean} enabled - true pro "S překážkami"
     */
    setObstaclesHash(enabled) {
        const newHash = enabled ? '#obstacles=yes' : '';
        if (window.location.hash !== newHash) {
            window.location.hash = newHash;
        }
    }

    /**
     * AC5.3: Získat hodnotu z cookie
     * @param {string} name - Název cookie
     * @returns {string|null} Hodnota cookie nebo null
     */
    getCookie(name) {
        const nameEQ = name + '=';
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            cookie = cookie.trim();
            if (cookie.indexOf(nameEQ) === 0) {
                return cookie.substring(nameEQ.length);
            }
        }
        return null;
    }

    /**
     * AC5.3, AC5.4: Nastavit cookie s expiration 365 dní
     * @param {string} name - Název cookie
     * @param {string} value - Hodnota
     * @param {number} days - Počet dní (default 365)
     */
    setCookie(name, value, days = 365) {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        const expires = 'expires=' + date.toUTCString();
        document.cookie = name + '=' + value + ';' + expires + ';path=/';
    }

    /**
     * Vykreslení mřížky 15×15
     * AC4.5: Zaminovaná pole se zobrazují jako černá plocha s ikonou
     */
    renderGrid() {
        this.gridContainer.innerHTML = '';

        for (let row = 0; row < this.game.size; row++) {
            for (let col = 0; col < this.game.size; col++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.dataset.row = row;
                cell.dataset.col = col;

                // AC4.5: Kontrola, zda je pole zaminované
                if (this.game.obstacles && this.game.obstacles.some(([r, c]) => r === row && c === col)) {
                    cell.classList.add('obstacle');
                    cell.classList.add('occupied'); // AC4.7: Také occupied pro consistency
                } else {
                    const value = this.game.getCellValue(row, col);
                    if (value) {
                        cell.textContent = value;
                        cell.dataset.value = value;
                        cell.classList.add('occupied');
                    }
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

        // Story 4.5: Obstacles select - uložit do URL hash při změně
        if (this.obstaclesSelect) {
            this.obstaclesSelect.addEventListener('change', (e) => {
                const enableObstacles = e.target.value === 'yes';
                this.setObstaclesHash(enableObstacles);
                // Reset hru se novým nastavením
                this.handleReset();
            });
        }

        // Story 4.5: Poslouchej URL hash změny (back/forward button)
        window.addEventListener('hashchange', () => {
            const enabled = this.getObstaclesFromHash();
            if (this.obstaclesSelect) {
                this.obstaclesSelect.value = enabled ? 'yes' : 'no';
            }
            // Reset hru se novým nastavením
            this.handleReset();
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
     * Story 4.4: Adaptováno z checkbox na select
     */
    handleReset() {
        this.game.reset();

        // AC4.4, Story 4.4: Pokud je select na 'yes', vygeneruj překážky
        if (this.obstaclesSelect && this.obstaclesSelect.value === 'yes') {
            const obstacles = generateRandomObstacles(15, this.game.size);
            this.game.setObstacles(obstacles);
        } else {
            // AC4.3: Bez překážek
            this.game.clearObstacles();
        }

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

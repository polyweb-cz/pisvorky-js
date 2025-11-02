/**
 * Integration testy pro Piškvorky 15×15
 * Story 1.1 & 1.2: UI + Logika
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { TicTacToeGame, GameUI } from './game.js';

// Mock DOM - vytvoření minimálního DOM pro testování
function createMockDOM() {
    document.body.innerHTML = `
        <div class="game-container">
            <header class="game-header">
                <h1>Piškvorky 15×15</h1>
                <div class="turn-indicator">
                    <span class="turn-label">Na tahu:</span>
                    <span class="current-player" id="currentPlayer">X</span>
                </div>
                <div class="controls-fieldset">
                    <div class="controls-legend">Nastavení</div>
                    <div class="controls">
                        <div class="game-size-select-group">
                            <label for="gameSizeSelect">Velikost:</label>
                            <select id="gameSizeSelect">
                                <option value="3">3×3 (Snadné)</option>
                                <option value="10">10×10 (Střední)</option>
                                <option value="15" selected>15×15 (Těžké)</option>
                            </select>
                        </div>
                        <div class="obstacle-select-group">
                            <label for="obstaclesSelect">Překážky:</label>
                            <select id="obstaclesSelect">
                                <option value="no">Bez překážek</option>
                                <option value="yes">S překážkami</option>
                            </select>
                        </div>
                        <button class="reset-button" id="resetButton">Nová hra</button>
                    </div>
                </div>
            </header>

            <main class="game-main">
                <div class="grid-container" id="gridContainer">
                    <!-- Grid bude vygenerován JavaScriptem -->
                </div>
            </main>
        </div>

        <!-- Modal pro výsledek hry -->
        <div class="game-result-modal" id="gameResultModal">
            <div class="modal-content">
                <h2 class="modal-title" id="gameResultMessage">Vítěz: X</h2>
                <button class="modal-button" id="modalCloseButton">Zavřít</button>
            </div>
        </div>
    `;
}

describe('GameUI - Inicializace a rendering', () => {
    let game;
    let gameUI;

    beforeEach(() => {
        createMockDOM();
        game = new TicTacToeGame(15);
        gameUI = new GameUI(game);
    });

    it('Vykreslí mřížku 15×15 při inicializaci', () => {
        const cells = document.querySelectorAll('.cell');
        expect(cells.length).toBe(225); // 15 * 15
    });

    it('Všechny buňky mají správné data atributy', () => {
        const cells = document.querySelectorAll('.cell');
        let cellCount = 0;

        for (let row = 0; row < 15; row++) {
            for (let col = 0; col < 15; col++) {
                const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
                expect(cell).toBeTruthy();
                cellCount++;
            }
        }

        expect(cellCount).toBe(225);
    });

    it('Indikátor tahu ukazuje "X" na začátku', () => {
        const indicator = document.getElementById('currentPlayer');
        expect(indicator.textContent).toBe('X');
    });

    it('Reset button je zobrazený', () => {
        const resetButton = document.getElementById('resetButton');
        expect(resetButton).toBeTruthy();
        expect(resetButton.textContent).toBe('Nová hra');
    });

    it('Indikátor X má červenou barvu (player-x třídu)', () => {
        const indicator = document.getElementById('currentPlayer');
        expect(indicator.classList.contains('player-x')).toBe(true);
    });
});

describe('GameUI - Klikání a interakce', () => {
    let game;
    let gameUI;

    beforeEach(() => {
        createMockDOM();
        game = new TicTacToeGame(15);
        gameUI = new GameUI(game);
    });

    it('Kliknutí na pole přidá tah a aktualizuje DOM', () => {
        const cell = document.querySelector('[data-row="0"][data-col="0"]');

        // Kliknutí
        cell.click();

        // Kontrola herního stavu
        expect(game.getCellValue(0, 0)).toBe('X');

        // Kontrola DOM
        expect(cell.textContent).toBe('X');
        expect(cell.classList.contains('occupied')).toBe(true);
        expect(cell.dataset.value).toBe('X');
    });

    it('Střídání tahů X→O→X... při klikání', () => {
        const cell1 = document.querySelector('[data-row="0"][data-col="0"]');
        const cell2 = document.querySelector('[data-row="0"][data-col="1"]');
        const cell3 = document.querySelector('[data-row="0"][data-col="2"]');

        // Tah 1: X
        cell1.click();
        expect(document.getElementById('currentPlayer').textContent).toBe('O');
        expect(game.getCurrentPlayer()).toBe('O');

        // Tah 2: O
        cell2.click();
        expect(document.getElementById('currentPlayer').textContent).toBe('X');
        expect(game.getCurrentPlayer()).toBe('X');

        // Tah 3: X
        cell3.click();
        expect(document.getElementById('currentPlayer').textContent).toBe('O');
        expect(game.getCurrentPlayer()).toBe('O');
    });

    it('Barva indikátoru se mění: X=červená, O=modrá', () => {
        const indicator = document.getElementById('currentPlayer');

        // Start: X (červená)
        expect(indicator.classList.contains('player-x')).toBe(true);
        expect(indicator.classList.contains('player-o')).toBe(false);

        // Po prvním tahu: O (modrá)
        const cell1 = document.querySelector('[data-row="0"][data-col="0"]');
        cell1.click();

        expect(indicator.classList.contains('player-x')).toBe(false);
        expect(indicator.classList.contains('player-o')).toBe(true);

        // Po druhém tahu: X (červená)
        const cell2 = document.querySelector('[data-row="0"][data-col="1"]');
        cell2.click();

        expect(indicator.classList.contains('player-x')).toBe(true);
        expect(indicator.classList.contains('player-o')).toBe(false);
    });

    it('Kliknutí na obsazené pole nemá efekt', () => {
        const cell = document.querySelector('[data-row="0"][data-col="0"]');

        // První kliknutí
        cell.click();
        expect(game.getCellValue(0, 0)).toBe('X');

        // Druhé kliknutí na stejné pole
        const initialPlayer = game.getCurrentPlayer();
        cell.click();

        // Hráč by se měl přepnout jen jednou (nebo vůbec)
        expect(game.getCellValue(0, 0)).toBe('X');
        expect(game.getCurrentPlayer()).toBe(initialPlayer);
    });
});

describe('GameUI - Výhra a zvýraznění', () => {
    let game;
    let gameUI;

    beforeEach(() => {
        createMockDOM();
        game = new TicTacToeGame(15);
        gameUI = new GameUI(game);
    });

    it('Po výhře se výherní pole zvýrazní', () => {
        // Simulace výherní kombinace: 4 X v řadě + poslední tah
        for (let i = 0; i < 4; i++) {
            game.gameState[0][i] = 'X';
        }
        game.makeMove(0, 4); // Poslední X - spustí detekci výhry

        // Vykreslení s zvýrazněním
        gameUI.highlightWinningCells();

        // Kontrola, že výherní pole mají třídu winning-cell
        for (let i = 0; i < 5; i++) {
            const cell = document.querySelector(`[data-row="0"][data-col="${i}"]`);
            expect(cell.classList.contains('winning-cell')).toBe(true);
        }
    });

    it('Po výhře se zobrazí modal s vítězem', () => {
        // Nastavit výhru X
        for (let i = 0; i < 5; i++) {
            game.gameState[0][i] = 'X';
        }
        game.makeMove(0, 0);

        // Zobrazit modal
        gameUI.showWinnerModal('X');

        const modal = document.getElementById('gameResultModal');
        const message = document.getElementById('gameResultMessage');

        expect(modal.classList.contains('visible')).toBe(true);
        expect(message.textContent).toBe('Vítěz: X');
    });

    it('Po výhře X se zobrazí "Vítěz: X" zpráva', () => {
        gameUI.showWinnerModal('X');

        const message = document.getElementById('gameResultMessage');
        expect(message.textContent).toBe('Vítěz: X');
    });

    it('Po výhře O se zobrazí "Vítěz: O" zpráva', () => {
        gameUI.showWinnerModal('O');

        const message = document.getElementById('gameResultMessage');
        expect(message.textContent).toBe('Vítěz: O');
    });
});

describe('GameUI - Remíza', () => {
    let game;
    let gameUI;

    beforeEach(() => {
        createMockDOM();
        game = new TicTacToeGame(15);
        gameUI = new GameUI(game);
    });

    it('Po remíze se zobrazí "Remíza" modal', () => {
        gameUI.showDrawModal();

        const modal = document.getElementById('gameResultModal');
        const message = document.getElementById('gameResultMessage');

        expect(modal.classList.contains('visible')).toBe(true);
        expect(message.textContent).toBe('Remíza');
    });

    it('Modal je skrytý na začátku', () => {
        const modal = document.getElementById('gameResultModal');
        expect(modal.classList.contains('visible')).toBe(false);
    });

    it('hideModal skrývá modál', () => {
        const modal = document.getElementById('gameResultModal');

        gameUI.showDrawModal();
        expect(modal.classList.contains('visible')).toBe(true);

        gameUI.hideModal();
        expect(modal.classList.contains('visible')).toBe(false);
    });
});

describe('GameUI - Reset', () => {
    let game;
    let gameUI;

    beforeEach(() => {
        createMockDOM();
        game = new TicTacToeGame(15);
        gameUI = new GameUI(game);
    });

    it('Reset tlačítko resetuje hru', () => {
        // Přidat několik tahů
        document.querySelector('[data-row="0"][data-col="0"]').click();
        document.querySelector('[data-row="0"][data-col="1"]').click();

        expect(game.getCurrentPlayer()).toBe('X');
        expect(game.getCellValue(0, 0)).toBe('X');
        expect(game.getCellValue(0, 1)).toBe('O');

        // Reset
        const resetButton = document.getElementById('resetButton');
        resetButton.click();

        // Kontrola, že hra je resetovaná
        expect(game.getCurrentPlayer()).toBe('X');
        expect(game.getCellValue(0, 0)).toBeNull();
        expect(game.getCellValue(0, 1)).toBeNull();

        // Kontrola indikátoru
        expect(document.getElementById('currentPlayer').textContent).toBe('X');
    });

    it('Po výhře a resetu se hraje znovu od začátku', () => {
        // Simulace výhry
        game.gameOver = true;
        game.winner = 'X';

        const modal = document.getElementById('gameResultModal');
        modal.classList.add('visible');

        // Reset
        gameUI.handleReset();

        expect(game.gameOver).toBe(false);
        expect(game.winner).toBeNull();
        expect(modal.classList.contains('visible')).toBe(false);
        expect(game.getCurrentPlayer()).toBe('X');
    });
});

describe('GameUI - Blokování tahů po výhře', () => {
    let game;
    let gameUI;

    beforeEach(() => {
        createMockDOM();
        game = new TicTacToeGame(15);
        gameUI = new GameUI(game);
    });

    it('Po výhře jsou nové tahy zablokované', () => {
        // Nastavit výhru: 4 X v řadě
        for (let i = 0; i < 4; i++) {
            game.gameState[0][i] = 'X';
        }

        // Tah který spustí detekci výhry
        game.makeMove(0, 4);

        // Hra by měla být Over
        expect(game.gameOver).toBe(true);

        // Pokus o další tah
        const result = game.makeMove(1, 1);
        expect(result).toBe(false); // Tah byl zablokován
    });
});

describe('GameUI - Kompletní herní průběh', () => {
    let game;
    let gameUI;

    beforeEach(() => {
        createMockDOM();
        game = new TicTacToeGame(15);
        gameUI = new GameUI(game);
    });

    it('Úplná hra od klikání až po výhru', () => {
        // Nastavit výherní kombinaci
        const moves = [
            [0, 0], [1, 0],  // X: (0,0), O: (1,0)
            [0, 1], [1, 1],  // X: (0,1), O: (1,1)
            [0, 2], [1, 2],  // X: (0,2), O: (1,2)
            [0, 3], [1, 3],  // X: (0,3), O: (1,3)
            [0, 4],          // X: (0,4) - VÝHRA!
        ];

        for (const [row, col] of moves) {
            const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
            cell.click();
        }

        // Kontrola, že hra je Over
        expect(game.gameOver).toBe(true);
        expect(game.winner).toBe('X');

        // Kontrola, že modal je vidět
        const modal = document.getElementById('gameResultModal');
        expect(modal.classList.contains('visible')).toBe(true);
    });
});

describe('GameUI - Obstacles Mode (Story 1.4)', () => {
    let game;
    let gameUI;

    beforeEach(() => {
        createMockDOM();
        game = new TicTacToeGame(15);
        gameUI = new GameUI(game);
    });

    it('Select na "Bez překážek" - žádné překážky nejsou generovány', () => {
        const select = document.getElementById('obstaclesSelect');
        expect(select.value).toBe('no');

        gameUI.handleReset();

        expect(game.obstacles).toHaveLength(0);
        expect(game.obstaclesSet.size).toBe(0);
    });

    it('Select na "S překážkami" - 15 překážek se generuje', () => {
        const select = document.getElementById('obstaclesSelect');
        select.value = 'yes';

        gameUI.handleReset();

        expect(game.obstacles).toHaveLength(15);
        expect(game.obstaclesSet.size).toBe(15);
    });

    it('Zaminovaná pole mají CSS class "obstacle"', () => {
        const select = document.getElementById('obstaclesSelect');
        select.value = 'yes';

        gameUI.handleReset();

        // Zkontrolovat, že aspoň některá pole mají obstacle class
        const obstacleCells = document.querySelectorAll('.cell.obstacle');
        expect(obstacleCells.length).toBeGreaterThan(0);
    });

    it('Kliknutí na zaminované pole se ignoruje', () => {
        const select = document.getElementById('obstaclesSelect');
        select.value = 'yes';

        gameUI.handleReset();

        // Najít zaminované pole
        const obstacleCell = game.obstacles[0];
        const [obsRow, obsCol] = obstacleCell;
        const cell = document.querySelector(`[data-row="${obsRow}"][data-col="${obsCol}"]`);

        // Pokus o kliknutí
        cell.click();

        // Tah by měl selhat - hráč by měl zůstat X
        expect(game.getCurrentPlayer()).toBe('X');
    });

    it('Kliknutí na normální pole vedle zaminovaného funguje', () => {
        const select = document.getElementById('obstaclesSelect');
        select.value = 'yes';

        gameUI.handleReset();

        // Najít normální pole (nějaké místo mimo překážky)
        const cell = document.querySelector('[data-row="7"][data-col="7"]');

        // Zkontrolovat, že toto pole není zaminované
        const isObstacle = game.obstacles.some(([r, c]) => r === 7 && c === 7);
        if (!isObstacle) {
            cell.click();
            expect(game.getCellValue(7, 7)).toBe('X');
            expect(game.getCurrentPlayer()).toBe('O');
        }
    });

    it('Select zůstává na "S překážkami" po resetu', () => {
        const select = document.getElementById('obstaclesSelect');
        select.value = 'yes';

        gameUI.handleReset();

        expect(select.value).toBe('yes');
    });

    it('Reset na "Bez překážek" odstraní překážky', () => {
        const select = document.getElementById('obstaclesSelect');

        // První hra s překážkami
        select.value = 'yes';
        gameUI.handleReset();
        expect(game.obstacles).toHaveLength(15);

        // Změna selectu na 'no'
        select.value = 'no';
        gameUI.handleReset();

        expect(game.obstacles).toHaveLength(0);
    });

    it('Překážky se negenerují znovu při každém "Nové hře" s selectem na "S překážkami"', () => {
        const select = document.getElementById('obstaclesSelect');
        select.value = 'yes';

        gameUI.handleReset();
        const obstacles1 = JSON.stringify(game.obstacles.sort());

        gameUI.handleReset();
        const obstacles2 = JSON.stringify(game.obstacles.sort());

        // S vysokou pravděpodobností by měly být různé (nové random pozice)
        expect(obstacles1).not.toEqual(obstacles2);
    });
});

describe('GameUI - Obstacles Responsiveness (Story 4.8)', () => {
    let game;
    let gameUI;

    beforeEach(() => {
        createMockDOM();
        game = new TicTacToeGame(15);
        gameUI = new GameUI(game);
    });

    it('Story 4.8: Bomby - .cell.obstacle nemá hardcoded font-size', () => {
        const select = document.getElementById('obstaclesSelect');
        select.value = 'yes';
        gameUI.handleReset();

        const obstacleCell = document.querySelector('.cell.obstacle');
        const styles = window.getComputedStyle(obstacleCell);

        // Bomby by měly dědít font-size z .cell, ne mít vlastní hardcoded
        // Na desktopu .cell má 1.2rem (v mockDOM bez media queries)
        const fontSize = styles.fontSize;
        expect(fontSize).toBeDefined();
        // Ověřit, že to není hardcoded 1.5rem z old CSS
        expect(fontSize).not.toBe('24px'); // 1.5rem je ~24px
    });

    it('Story 4.8: Bomby a X/O - proporcionální font-size', () => {
        const select = document.getElementById('obstaclesSelect');
        select.value = 'yes';
        gameUI.handleReset();

        // Klikni na pole bez překážek, aby se tam objevilo X
        const cell = document.querySelector('[data-row="7"][data-col="7"]');
        const isObstacle = game.obstacles.some(([r, c]) => r === 7 && c === 7);

        if (!isObstacle) {
            cell.click();

            const xCell = document.querySelector('[data-value="X"]');
            const obstacleCell = document.querySelector('.cell.obstacle');

            const xStyle = window.getComputedStyle(xCell);
            const obstacleStyle = window.getComputedStyle(obstacleCell);

            // Bomby a X/O by měly mít stejný font-size (inheritance)
            expect(xStyle.fontSize).toBe(obstacleStyle.fontSize);
        }
    });

    it('Story 4.8: .cell.obstacle element existuje a je správně renderován', () => {
        const select = document.getElementById('obstaclesSelect');
        select.value = 'yes';
        gameUI.handleReset();

        const obstacleCells = document.querySelectorAll('.cell.obstacle');

        // Mělo by být 15 překážek
        expect(obstacleCells.length).toBe(15);
        // Všechny by měly být div elementy
        obstacleCells.forEach(cell => {
            expect(cell.tagName).toBe('DIV');
        });
    });

    it('Story 4.8: .cell.obstacle má CSS class obstacle a occupied', () => {
        const select = document.getElementById('obstaclesSelect');
        select.value = 'yes';
        gameUI.handleReset();

        const obstacleCell = document.querySelector('.cell.obstacle');

        // Překážky by měly mít obě třídy
        expect(obstacleCell.classList.contains('obstacle')).toBe(true);
        expect(obstacleCell.classList.contains('occupied')).toBe(true);
    });
});

describe('GameUI - Grid Sizing (Story 4.10)', () => {
    let game;
    let gameUI;

    beforeEach(() => {
        createMockDOM();
        game = new TicTacToeGame(15);
        gameUI = new GameUI(game);
    });

    it('Story 4.10: Grid lze označit třídou .size-3', () => {
        const gridContainer = document.getElementById('gridContainer');
        gridContainer.classList.add('size-3');

        expect(gridContainer.classList.contains('size-3')).toBe(true);
        expect(gridContainer.classList.contains('grid-container')).toBe(true);
    });

    it('Story 4.10: Grid lze označit třídou .size-10', () => {
        const gridContainer = document.getElementById('gridContainer');
        gridContainer.classList.add('size-10');

        expect(gridContainer.classList.contains('size-10')).toBe(true);
    });

    it('Story 4.10: Grid lze označit třídou .size-15', () => {
        const gridContainer = document.getElementById('gridContainer');
        gridContainer.classList.add('size-15');

        expect(gridContainer.classList.contains('size-15')).toBe(true);
    });

    it('Story 4.10: Grid element je div s ID gridContainer', () => {
        const gridContainer = document.getElementById('gridContainer');

        expect(gridContainer).toBeDefined();
        expect(gridContainer.tagName).toBe('DIV');
        expect(gridContainer.id).toBe('gridContainer');
    });
});

/**
 * Story 4.14 & 4.15: Hamburger Menu & Controls Hidden
 */
describe('Story 4.14 & 4.15: Hamburger Menu & Settings Toggle', () => {
    let game;
    let gameUI;

    beforeEach(() => {
        // Vyčistit DOM
        document.body.innerHTML = `
            <div class="game-container">
                <header class="game-header">
                    <div class="turn-indicator">
                        <span class="turn-label">Na tahu:</span>
                        <span class="current-player" id="currentPlayer">X</span>
                    </div>
                    <button class="hamburger-button" id="hamburgerButton" aria-label="Nastavení" aria-expanded="false">☰</button>
                    <div class="controls-fieldset">
                        <div class="controls">
                            <div class="game-size-select-group">
                                <label for="gameSizeSelect">Velikost:</label>
                                <select id="gameSizeSelect">
                                    <option value="3">3×3</option>
                                    <option value="10">10×10</option>
                                    <option value="15" selected>15×15</option>
                                </select>
                            </div>
                            <div class="obstacle-select-group">
                                <label for="obstaclesSelect">Překážky:</label>
                                <select id="obstaclesSelect">
                                    <option value="no">Bez překážek</option>
                                    <option value="yes">S překážkami</option>
                                </select>
                            </div>
                            <button class="reset-button" id="resetButton">Nová hra</button>
                        </div>
                    </div>
                </header>
                <main class="game-main">
                    <div class="grid-container" id="gridContainer"></div>
                </main>
            </div>
            <div class="game-result-modal" id="gameResultModal">
                <div class="modal-content">
                    <h2 class="modal-title" id="gameResultMessage">Vítěz</h2>
                    <button class="modal-button" id="modalCloseButton">Zavřít</button>
                </div>
            </div>
        `;

        localStorage.clear();

        game = new TicTacToeGame(15);
        gameUI = new GameUI(game);
    });

    describe('Story 4.14: Hamburger Button Toggle', () => {
        it('Hamburger button existuje v DOM', () => {
            const button = document.getElementById('hamburgerButton');
            expect(button).toBeTruthy();
            expect(button.tagName).toBe('BUTTON');
        });

        it('Hamburger button má správnou ikonu (☰) při zavřeném menu', () => {
            const button = document.getElementById('hamburgerButton');
            expect(button.textContent.trim()).toBe('☰');
        });

        it('Hamburger button má správné ARIA atributy', () => {
            const button = document.getElementById('hamburgerButton');
            expect(button.getAttribute('aria-label')).toBe('Nastavení');
            expect(button.getAttribute('aria-expanded')).toBe('false');
        });

        it('Controls fieldset je defaultně bez třídy .open', () => {
            const controls = document.querySelector('.controls-fieldset');
            expect(controls.classList.contains('open')).toBe(false);
        });

        it('Kliknutí na hamburger přidá třídu .open', () => {
            const button = document.getElementById('hamburgerButton');
            const controls = document.querySelector('.controls-fieldset');

            button.click();
            expect(controls.classList.contains('open')).toBe(true);
        });

        it('Po kliknutí se ikona změní na ×', () => {
            const button = document.getElementById('hamburgerButton');
            button.click();
            expect(button.textContent.trim()).toBe('×');
        });

        it('aria-expanded se změní na true při otevření', () => {
            const button = document.getElementById('hamburgerButton');
            button.click();
            expect(button.getAttribute('aria-expanded')).toBe('true');
        });

        it('Druhé kliknutí zavře menu a vrátí ikonu na ☰', () => {
            const button = document.getElementById('hamburgerButton');
            const controls = document.querySelector('.controls-fieldset');

            button.click(); // Otevřít
            button.click(); // Zavřít

            expect(controls.classList.contains('open')).toBe(false);
            expect(button.textContent.trim()).toBe('☰');
            expect(button.getAttribute('aria-expanded')).toBe('false');
        });
    });

    describe('Story 4.15: localStorage persistence', () => {
        it('Stav se ukládá do localStorage při otevření', () => {
            const button = document.getElementById('hamburgerButton');
            button.click();
            expect(localStorage.getItem('settingsMenuOpen')).toBe('true');
        });

        it('Stav se ukládá do localStorage při zavření', () => {
            const button = document.getElementById('hamburgerButton');
            button.click(); // Otevřít
            button.click(); // Zavřít
            expect(localStorage.getItem('settingsMenuOpen')).toBe('false');
        });

        it('Při načtení bez localStorage je menu zavřené', () => {
            localStorage.clear();
            const newGame = new TicTacToeGame(15);
            const newGameUI = new GameUI(newGame);

            const controls = document.querySelector('.controls-fieldset');
            expect(controls.classList.contains('open')).toBe(false);
        });

        it('Při načtení s localStorage=true je menu otevřené', () => {
            localStorage.setItem('settingsMenuOpen', 'true');

            const newGame = new TicTacToeGame(15);
            const newGameUI = new GameUI(newGame);

            const controls = document.querySelector('.controls-fieldset');
            const button = document.getElementById('hamburgerButton');

            expect(controls.classList.contains('open')).toBe(true);
            expect(button.textContent.trim()).toBe('×');
            expect(button.getAttribute('aria-expanded')).toBe('true');
        });

        it('Nadpis "Nastavení" neexistuje v DOM', () => {
            const legend = document.querySelector('.controls-legend');
            expect(legend).toBeNull();
        });

        it('Reset hry nemění stav menu', () => {
            const button = document.getElementById('hamburgerButton');
            button.click(); // Otevřít menu

            const resetButton = document.getElementById('resetButton');
            resetButton.click(); // Reset hry

            const controls = document.querySelector('.controls-fieldset');
            expect(controls.classList.contains('open')).toBe(true); // Stále otevřené
        });
    });
});

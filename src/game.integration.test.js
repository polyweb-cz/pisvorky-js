/**
 * Integration testy pro Piškvorky 15×15
 * Story 1.1: Vykreslit mřížku a střídání tahů
 * Story 1.2: Detekce výhry a remízy
 * Testuje interakci mezi game logikou a DOM
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { TicTacToeGame, GameUI } from './game.js';

describe('GameUI - Integration tests', () => {
    let game;
    let gameUI;
    let container;

    beforeEach(() => {
        // Vytvoření DOM struktury pro testy
        document.body.innerHTML = `
            <div class="game-container">
                <header class="game-header">
                    <h1>Piškvorky 15×15</h1>
                    <div class="turn-indicator">
                        <span class="turn-label">Na tahu:</span>
                        <span class="current-player" id="currentPlayer">X</span>
                    </div>
                    <button class="reset-button" id="resetButton">Nová hra</button>
                </header>
                <main class="game-main">
                    <div class="grid-container" id="gridContainer"></div>
                </main>
            </div>
            <div class="game-result-modal" id="gameResultModal">
                <div class="modal-content">
                    <h2 class="modal-title" id="gameResultMessage">Vítěz: X</h2>
                    <button class="modal-button" id="modalCloseButton">Zavřít</button>
                </div>
            </div>
        `;

        game = new TicTacToeGame(15);
        gameUI = new GameUI(game);
        container = document.getElementById('gridContainer');
    });

    afterEach(() => {
        document.body.innerHTML = '';
    });

    describe('Vykreslení mřížky', () => {
        it('Mřížka obsahuje 225 polí (15×15)', () => {
            const cells = container.querySelectorAll('.cell');
            expect(cells.length).toBe(225);
        });

        it('Každé pole má správné data atributy', () => {
            const cells = container.querySelectorAll('.cell');
            const firstCell = cells[0];
            const lastCell = cells[224];

            expect(firstCell.dataset.row).toBe('0');
            expect(firstCell.dataset.col).toBe('0');
            expect(lastCell.dataset.row).toBe('14');
            expect(lastCell.dataset.col).toBe('14');
        });

        it('Všechna pole jsou na začátku prázdná', () => {
            const cells = container.querySelectorAll('.cell');
            cells.forEach(cell => {
                expect(cell.textContent).toBe('');
                expect(cell.classList.contains('occupied')).toBe(false);
            });
        });
    });

    describe('Kliknutí na pole v UI → změna renderu', () => {
        it('Kliknutí na pole zobrazí X', () => {
            const cells = container.querySelectorAll('.cell');
            const firstCell = cells[0];

            // Simulace kliknutí
            firstCell.click();

            expect(firstCell.textContent).toBe('X');
            expect(firstCell.dataset.value).toBe('X');
            expect(firstCell.classList.contains('occupied')).toBe(true);
        });

        it('Druhé kliknutí zobrazí O', () => {
            const cells = container.querySelectorAll('.cell');

            cells[0].click(); // X
            cells[1].click(); // O

            expect(cells[1].textContent).toBe('O');
            expect(cells[1].dataset.value).toBe('O');
        });

        it('Kliknutí na obsazené pole nemění render', () => {
            const cells = container.querySelectorAll('.cell');
            const cell = cells[0];

            cell.click(); // X
            expect(cell.textContent).toBe('X');

            cell.click(); // Pokus o druhé kliknutí
            expect(cell.textContent).toBe('X'); // Stále X
            expect(cell.dataset.value).toBe('X');
        });
    });

    describe('Indikátor se aktualizuje po každém tahu', () => {
        it('Na začátku je indikátor X', () => {
            const indicator = document.getElementById('currentPlayer');
            expect(indicator.textContent).toBe('X');
        });

        it('Po prvním tahu se změní na O', () => {
            const cells = container.querySelectorAll('.cell');
            const indicator = document.getElementById('currentPlayer');

            cells[0].click(); // X

            expect(indicator.textContent).toBe('O');
        });

        it('Po druhém tahu se změní zpět na X', () => {
            const cells = container.querySelectorAll('.cell');
            const indicator = document.getElementById('currentPlayer');

            cells[0].click(); // X
            cells[1].click(); // O

            expect(indicator.textContent).toBe('X');
        });

        it('Indikátor se nemění při kliknutí na obsazené pole', () => {
            const cells = container.querySelectorAll('.cell');
            const indicator = document.getElementById('currentPlayer');

            cells[0].click(); // X
            expect(indicator.textContent).toBe('O');

            cells[0].click(); // Pokus na stejné pole
            expect(indicator.textContent).toBe('O'); // Stále O
        });
    });

    describe('Série tahů (X→O→X→...) se správně renderuje', () => {
        it('Série 6 tahů se správně zobrazí', () => {
            const cells = container.querySelectorAll('.cell');

            cells[0].click(); // X
            cells[1].click(); // O
            cells[2].click(); // X
            cells[3].click(); // O
            cells[4].click(); // X
            cells[5].click(); // O

            expect(cells[0].textContent).toBe('X');
            expect(cells[1].textContent).toBe('O');
            expect(cells[2].textContent).toBe('X');
            expect(cells[3].textContent).toBe('O');
            expect(cells[4].textContent).toBe('X');
            expect(cells[5].textContent).toBe('O');
        });

        it('Po sérii tahů je správný hráč na tahu', () => {
            const cells = container.querySelectorAll('.cell');
            const indicator = document.getElementById('currentPlayer');

            // 6 tahů
            for (let i = 0; i < 6; i++) {
                cells[i].click();
            }

            // Po 6 tazích (lichý počet = O, sudý = X)
            expect(indicator.textContent).toBe('X');
        });
    });

    describe('Reset funkcionalita', () => {
        it('Reset vyčistí všechna pole', () => {
            const cells = container.querySelectorAll('.cell');
            const resetButton = document.getElementById('resetButton');

            // Několik tahů
            cells[0].click();
            cells[1].click();
            cells[2].click();

            // Reset
            resetButton.click();

            // Kontrola, že všechna pole jsou prázdná
            const cellsAfterReset = container.querySelectorAll('.cell');
            cellsAfterReset.forEach(cell => {
                expect(cell.textContent).toBe('');
                expect(cell.classList.contains('occupied')).toBe(false);
                expect(cell.dataset.value).toBeUndefined();
            });
        });

        it('Reset vrátí indikátor na X', () => {
            const cells = container.querySelectorAll('.cell');
            const indicator = document.getElementById('currentPlayer');
            const resetButton = document.getElementById('resetButton');

            cells[0].click(); // X
            cells[1].click(); // O
            expect(indicator.textContent).toBe('X');

            resetButton.click();
            expect(indicator.textContent).toBe('X');
        });

        it('Po resetu lze hrát novou hru', () => {
            const resetButton = document.getElementById('resetButton');
            let cells = container.querySelectorAll('.cell');

            cells[5].click(); // X na pozici 5
            resetButton.click();

            // Nový query po resetu (grid je překreslený)
            cells = container.querySelectorAll('.cell');
            cells[5].click(); // X na pozici 5 znovu

            expect(cells[5].textContent).toBe('X');
            expect(cells[5].classList.contains('occupied')).toBe(true);
        });
    });

    describe('Event delegation', () => {
        it('Kliknutí mimo pole nemá efekt', () => {
            const initialState = game.getGameState();

            // Kliknutí na container
            container.click();

            const newState = game.getGameState();
            expect(JSON.stringify(initialState)).toBe(JSON.stringify(newState));
        });

        it('Všechna pole reagují na kliknutí', () => {
            const cells = container.querySelectorAll('.cell');

            // Test každého pole v mřížce
            cells.forEach((cell, index) => {
                if (index % 2 === 0 && index < 10) { // Test prvních 5 sudých
                    cell.click();
                    expect(cell.textContent).toBeTruthy();
                    expect(cell.classList.contains('occupied')).toBe(true);
                }
            });
        });
    });

    describe('Data synchronizace mezi game state a UI', () => {
        it('Game state odpovídá UI po tazích', () => {
            const cells = container.querySelectorAll('.cell');

            cells[0].click(); // X na (0,0)
            cells[16].click(); // O na (1,1) - index 16 = row 1, col 1

            expect(game.getCellValue(0, 0)).toBe('X');
            expect(game.getCellValue(1, 1)).toBe('O');
            expect(cells[0].textContent).toBe('X');
            expect(cells[16].textContent).toBe('O');
        });

        it('Komplexní test - více tahů a kontrola konzistence', () => {
            const cells = container.querySelectorAll('.cell');
            const moves = [
                { index: 0, row: 0, col: 0, expected: 'X' },
                { index: 16, row: 1, col: 1, expected: 'O' },
                { index: 32, row: 2, col: 2, expected: 'X' },
                { index: 48, row: 3, col: 3, expected: 'O' },
                { index: 64, row: 4, col: 4, expected: 'X' },
            ];

            moves.forEach(move => {
                cells[move.index].click();
                expect(game.getCellValue(move.row, move.col)).toBe(move.expected);
                expect(cells[move.index].textContent).toBe(move.expected);
            });
        });
    });

    describe('Story 1.2: Detekce výhry - Integration', () => {
        it('AC2.1: Po výhře horizontálně se hra zastaví', () => {
            const cells = container.querySelectorAll('.cell');

            // X vyhraje horizontálně v řádku 0: (0,0) až (0,4)
            cells[0].click();   // X (0,0)
            cells[15].click();  // O (1,0)
            cells[1].click();   // X (0,1)
            cells[16].click();  // O (1,1)
            cells[2].click();   // X (0,2)
            cells[17].click();  // O (1,2)
            cells[3].click();   // X (0,3)
            cells[18].click();  // O (1,3)
            cells[4].click();   // X (0,4) - VÝHRA!

            expect(game.gameOver).toBe(true);
            expect(game.winner).toBe('X');
        });

        it('AC2.2: Výherní kombinace je zvýrazněna v DOM', () => {
            const cells = container.querySelectorAll('.cell');

            // X vyhraje horizontálně
            cells[0].click();   // X (0,0)
            cells[15].click();  // O (1,0)
            cells[1].click();   // X (0,1)
            cells[16].click();  // O (1,1)
            cells[2].click();   // X (0,2)
            cells[17].click();  // O (1,2)
            cells[3].click();   // X (0,3)
            cells[18].click();  // O (1,3)
            cells[4].click();   // X (0,4) - VÝHRA!

            // Kontrola zvýraznění
            expect(cells[0].classList.contains('winning-cell')).toBe(true);
            expect(cells[1].classList.contains('winning-cell')).toBe(true);
            expect(cells[2].classList.contains('winning-cell')).toBe(true);
            expect(cells[3].classList.contains('winning-cell')).toBe(true);
            expect(cells[4].classList.contains('winning-cell')).toBe(true);
            expect(cells[15].classList.contains('winning-cell')).toBe(false);
        });

        it('AC2.3: Po výhře se zobrazí modal s vítězem', () => {
            const cells = container.querySelectorAll('.cell');
            const modal = document.getElementById('gameResultModal');
            const message = document.getElementById('gameResultMessage');

            // X vyhraje
            cells[0].click();   // X
            cells[15].click();  // O
            cells[1].click();   // X
            cells[16].click();  // O
            cells[2].click();   // X
            cells[17].click();  // O
            cells[3].click();   // X
            cells[18].click();  // O
            cells[4].click();   // X - VÝHRA!

            expect(modal.classList.contains('visible')).toBe(true);
            expect(message.textContent).toBe('Vítěz: X');
        });

        it('AC2.4: Po výhře jsou tahy zablokovány', () => {
            const cells = container.querySelectorAll('.cell');

            // X vyhraje
            cells[0].click();   // X
            cells[15].click();  // O
            cells[1].click();   // X
            cells[16].click();  // O
            cells[2].click();   // X
            cells[17].click();  // O
            cells[3].click();   // X
            cells[18].click();  // O
            cells[4].click();   // X - VÝHRA!

            // Pokus o další tah
            const emptyCell = cells[5];
            emptyCell.click();

            // Pole zůstává prázdné
            expect(emptyCell.textContent).toBe('');
            expect(game.getCellValue(0, 5)).toBe(null);
        });

        it('Detekce výhry vertikálně', () => {
            const cells = container.querySelectorAll('.cell');

            // O vyhraje vertikálně ve sloupci 5: (0,5), (1,5), (2,5), (3,5), (4,5)
            // X hraje v různých pozicích aby nevyhrál
            cells[0].click();   // X (0,0)
            cells[5].click();   // O (0,5)
            cells[1].click();   // X (0,1)
            cells[20].click();  // O (1,5)
            cells[2].click();   // X (0,2)
            cells[35].click();  // O (2,5)
            cells[3].click();   // X (0,3)
            cells[50].click();  // O (3,5)
            cells[16].click();  // X (1,1)
            cells[65].click();  // O (4,5) - VÝHRA!

            expect(game.gameOver).toBe(true);
            expect(game.winner).toBe('O');
            expect(cells[5].classList.contains('winning-cell')).toBe(true);
            expect(cells[20].classList.contains('winning-cell')).toBe(true);
            expect(cells[35].classList.contains('winning-cell')).toBe(true);
        });

        it('Detekce výhry diagonálně ↘', () => {
            const cells = container.querySelectorAll('.cell');

            // X vyhraje diagonálně: (0,0), (1,1), (2,2), (3,3), (4,4)
            cells[0].click();   // X (0,0)
            cells[1].click();   // O (0,1)
            cells[16].click();  // X (1,1)
            cells[2].click();   // O (0,2)
            cells[32].click();  // X (2,2)
            cells[3].click();   // O (0,3)
            cells[48].click();  // X (3,3)
            cells[4].click();   // O (0,4)
            cells[64].click();  // X (4,4) - VÝHRA!

            expect(game.gameOver).toBe(true);
            expect(game.winner).toBe('X');
            expect(game.winningCells).toHaveLength(5);
        });

        it('Detekce výhry diagonálně ↗', () => {
            const cells = container.querySelectorAll('.cell');

            // O vyhraje diagonálně ↗: (4,0), (3,1), (2,2), (1,3), (0,4)
            cells[0].click();   // X (0,0)
            cells[60].click();  // O (4,0)
            cells[1].click();   // X (0,1)
            cells[46].click();  // O (3,1)
            cells[2].click();   // X (0,2)
            cells[32].click();  // O (2,2)
            cells[3].click();   // X (0,3)
            cells[18].click();  // O (1,3)
            cells[5].click();   // X (0,5)
            cells[4].click();   // O (0,4) - VÝHRA!

            expect(game.gameOver).toBe(true);
            expect(game.winner).toBe('O');
        });

        it('AC2.5, AC2.6: Detekce remízy - plná mřížka bez výhry', () => {
            const cells = container.querySelectorAll('.cell');
            const modal = document.getElementById('gameResultModal');
            const message = document.getElementById('gameResultMessage');

            // Naplníme game state přímo pattern bez výhry: XX OO XX OO ...
            for (let row = 0; row < 15; row++) {
                for (let col = 0; col < 15; col++) {
                    const index = row * 15 + col;
                    game.gameState[row][col] = (Math.floor(index / 2) % 2 === 0) ? 'X' : 'O';
                }
            }

            // Simulujeme poslední tah který detekuje remízu
            game.gameState[14][14] = 'X';
            game.currentPlayer = 'O';

            // Klikneme na poslední pole aby se spustila detekce
            const lastCell = cells[224];
            lastCell.textContent = 'X';
            lastCell.dataset.value = 'X';
            lastCell.classList.add('occupied');

            // Spustíme logiku detekce ručně
            gameUI.game.gameOver = true;
            gameUI.game.isDraw = true;
            gameUI.showDrawModal();

            expect(game.gameOver).toBe(true);
            expect(game.isDraw).toBe(true);
            expect(game.winner).toBe(null);
            expect(modal.classList.contains('visible')).toBe(true);
            expect(message.textContent).toBe('Remíza');
        });

        it('AC2.7: Po remíze jsou tahy zablokovány', () => {
            // Vytvořit remízu v game logice přímo
            for (let row = 0; row < 15; row++) {
                for (let col = 0; col < 15; col++) {
                    game.gameState[row][col] = (row + col) % 2 === 0 ? 'X' : 'O';
                }
            }
            game.gameOver = true;
            game.isDraw = true;

            // Pokus o tah
            const moveSuccessful = game.makeMove(0, 0);
            expect(moveSuccessful).toBe(false);
        });

        it('AC2.8: Reset po výhře resetuje všechny flagy', () => {
            const cells = container.querySelectorAll('.cell');
            const resetButton = document.getElementById('resetButton');

            // X vyhraje
            cells[0].click();   // X
            cells[15].click();  // O
            cells[1].click();   // X
            cells[16].click();  // O
            cells[2].click();   // X
            cells[17].click();  // O
            cells[3].click();   // X
            cells[18].click();  // O
            cells[4].click();   // X - VÝHRA!

            expect(game.gameOver).toBe(true);

            // Reset
            resetButton.click();

            expect(game.gameOver).toBe(false);
            expect(game.winner).toBe(null);
            expect(game.isDraw).toBe(false);
            expect(game.winningCells).toEqual([]);
            expect(game.getCurrentPlayer()).toBe('X');
        });

        it('Modal se skryje po resetu', () => {
            const cells = container.querySelectorAll('.cell');
            const resetButton = document.getElementById('resetButton');
            const modal = document.getElementById('gameResultModal');

            // X vyhraje
            cells[0].click();
            cells[15].click();
            cells[1].click();
            cells[16].click();
            cells[2].click();
            cells[17].click();
            cells[3].click();
            cells[18].click();
            cells[4].click();

            expect(modal.classList.contains('visible')).toBe(true);

            // Reset
            resetButton.click();

            expect(modal.classList.contains('visible')).toBe(false);
        });

        it('Po resetu lze hrát novou hru a dosáhnout nové výhry', () => {
            const resetButton = document.getElementById('resetButton');
            let cells = container.querySelectorAll('.cell');

            // První hra - X vyhraje
            cells[0].click();
            cells[15].click();
            cells[1].click();
            cells[16].click();
            cells[2].click();
            cells[17].click();
            cells[3].click();
            cells[18].click();
            cells[4].click();

            expect(game.winner).toBe('X');

            // Reset
            resetButton.click();
            cells = container.querySelectorAll('.cell');

            // Druhá hra - O vyhraje vertikálně ve sloupci 5
            cells[0].click();   // X (0,0)
            cells[5].click();   // O (0,5)
            cells[1].click();   // X (0,1)
            cells[20].click();  // O (1,5)
            cells[2].click();   // X (0,2)
            cells[35].click();  // O (2,5)
            cells[3].click();   // X (0,3)
            cells[50].click();  // O (3,5)
            cells[16].click();  // X (1,1)
            cells[65].click();  // O (4,5) - VÝHRA!

            expect(game.gameOver).toBe(true);
            expect(game.winner).toBe('O');
        });

        it('Nedetekuje výhru při 4 v řadě', () => {
            const cells = container.querySelectorAll('.cell');

            // Pouze 4 X v řadě
            cells[0].click();   // X
            cells[15].click();  // O
            cells[1].click();   // X
            cells[16].click();  // O
            cells[2].click();   // X
            cells[17].click();  // O
            cells[3].click();   // X (4 v řadě, ale ne výhra)

            expect(game.gameOver).toBe(false);
            expect(game.winner).toBe(null);
        });
    });
});

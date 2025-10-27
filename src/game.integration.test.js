/**
 * Integration testy pro Piškvorky 15×15
 * Story 1.1: Vykreslit mřížku a střídání tahů
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
});

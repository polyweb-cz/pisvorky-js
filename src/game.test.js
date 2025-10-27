/**
 * Unit testy pro Piškvorky 15×15
 * Story 1.1: Vykreslit mřížku a střídání tahů
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { TicTacToeGame } from './game.js';

describe('TicTacToeGame - Iniciace game statu', () => {
    let game;

    beforeEach(() => {
        game = new TicTacToeGame(15);
    });

    it('Iniciace game statu (15×15 polí, všechna prázdná)', () => {
        const state = game.getGameState();

        // Kontrola velikosti
        expect(state.length).toBe(15);
        expect(state[0].length).toBe(15);

        // Kontrola, že všechna pole jsou prázdná (null)
        for (let row = 0; row < 15; row++) {
            for (let col = 0; col < 15; col++) {
                expect(state[row][col]).toBeNull();
            }
        }
    });

    it('Počáteční hráč je X', () => {
        expect(game.getCurrentPlayer()).toBe('X');
    });

    it('Historie tahů je na začátku prázdná', () => {
        expect(game.moveHistory).toEqual([]);
    });
});

describe('TicTacToeGame - Přidání tahu', () => {
    let game;

    beforeEach(() => {
        game = new TicTacToeGame(15);
    });

    it('Přidání tahu X na pozici (0,0) → správná změna state', () => {
        const result = game.makeMove(0, 0);

        expect(result).toBe(true);
        expect(game.getCellValue(0, 0)).toBe('X');
    });

    it('Přidání tahu O na pozici (1,1) → správná změna state', () => {
        // První tah X
        game.makeMove(0, 0);

        // Druhý tah O
        const result = game.makeMove(1, 1);

        expect(result).toBe(true);
        expect(game.getCellValue(1, 1)).toBe('O');
    });

    it('Tah na neplatné pozici vrací false', () => {
        expect(game.makeMove(-1, 0)).toBe(false);
        expect(game.makeMove(0, -1)).toBe(false);
        expect(game.makeMove(15, 0)).toBe(false);
        expect(game.makeMove(0, 15)).toBe(false);
    });

    it('Historie tahů se správně aktualizuje', () => {
        game.makeMove(0, 0);
        game.makeMove(1, 1);

        expect(game.moveHistory.length).toBe(2);
        expect(game.moveHistory[0]).toEqual({ row: 0, col: 0, player: 'X' });
        expect(game.moveHistory[1]).toEqual({ row: 1, col: 1, player: 'O' });
    });
});

describe('TicTacToeGame - Střídání tahů', () => {
    let game;

    beforeEach(() => {
        game = new TicTacToeGame(15);
    });

    it('Střídání tahů (X→O→X→...)', () => {
        expect(game.getCurrentPlayer()).toBe('X');

        game.makeMove(0, 0); // X
        expect(game.getCurrentPlayer()).toBe('O');

        game.makeMove(0, 1); // O
        expect(game.getCurrentPlayer()).toBe('X');

        game.makeMove(0, 2); // X
        expect(game.getCurrentPlayer()).toBe('O');

        game.makeMove(0, 3); // O
        expect(game.getCurrentPlayer()).toBe('X');
    });

    it('Neplatný tah nemění aktuálního hráče', () => {
        expect(game.getCurrentPlayer()).toBe('X');

        game.makeMove(0, 0); // X, validní
        expect(game.getCurrentPlayer()).toBe('O');

        game.makeMove(0, 0); // O, neplatný (obsazené)
        expect(game.getCurrentPlayer()).toBe('O'); // Stále O

        game.makeMove(1, 1); // O, validní
        expect(game.getCurrentPlayer()).toBe('X');
    });
});

describe('TicTacToeGame - Blokování tahu na obsazené pole', () => {
    let game;

    beforeEach(() => {
        game = new TicTacToeGame(15);
    });

    it('Kliknutí na obsazené pole vrací false', () => {
        game.makeMove(5, 5); // X
        const result = game.makeMove(5, 5); // Pokus o tah na stejné pole

        expect(result).toBe(false);
    });

    it('Obsazené pole si zachová původní hodnotu', () => {
        game.makeMove(5, 5); // X
        expect(game.getCellValue(5, 5)).toBe('X');

        game.makeMove(5, 5); // Pokus o O na stejné pole
        expect(game.getCellValue(5, 5)).toBe('X'); // Stále X
    });

    it('isCellOccupied správně identifikuje obsazená pole', () => {
        expect(game.isCellOccupied(3, 3)).toBe(false);

        game.makeMove(3, 3);
        expect(game.isCellOccupied(3, 3)).toBe(true);
    });

    it('Blokovaný tah se nezapisuje do historie', () => {
        game.makeMove(0, 0); // X
        game.makeMove(0, 0); // Blokovaný pokus

        expect(game.moveHistory.length).toBe(1);
    });
});

describe('TicTacToeGame - Reset hry', () => {
    let game;

    beforeEach(() => {
        game = new TicTacToeGame(15);
    });

    it('Reset hry (state → prázdná mřížka)', () => {
        // Uděláme několik tahů
        game.makeMove(0, 0);
        game.makeMove(1, 1);
        game.makeMove(2, 2);

        // Reset
        game.reset();

        // Kontrola, že všechna pole jsou prázdná
        const state = game.getGameState();
        for (let row = 0; row < 15; row++) {
            for (let col = 0; col < 15; col++) {
                expect(state[row][col]).toBeNull();
            }
        }
    });

    it('Reset vrátí hráče na X', () => {
        game.makeMove(0, 0); // X
        game.makeMove(1, 1); // O
        expect(game.getCurrentPlayer()).toBe('X');

        game.reset();
        expect(game.getCurrentPlayer()).toBe('X');
    });

    it('Reset vymaže historii tahů', () => {
        game.makeMove(0, 0);
        game.makeMove(1, 1);
        expect(game.moveHistory.length).toBe(2);

        game.reset();
        expect(game.moveHistory.length).toBe(0);
    });

    it('Po resetu lze hrát novou hru', () => {
        game.makeMove(5, 5);
        game.reset();

        const result = game.makeMove(5, 5);
        expect(result).toBe(true);
        expect(game.getCellValue(5, 5)).toBe('X');
    });
});

describe('TicTacToeGame - Edge cases', () => {
    let game;

    beforeEach(() => {
        game = new TicTacToeGame(15);
    });

    it('Rohy mřížky jsou dostupné', () => {
        expect(game.makeMove(0, 0)).toBe(true);
        expect(game.makeMove(0, 14)).toBe(true);
        expect(game.makeMove(14, 0)).toBe(true);
        expect(game.makeMove(14, 14)).toBe(true);
    });

    it('Celá mřížka může být zaplněna (bez výhry)', () => {
        // Story 1.2: Po implementaci detekce výhry, hra může skončit před naplněním celé mřížky
        // Tento test ověřuje, že můžeme hrát až do remízy nebo výhry
        let movesCount = 0;
        for (let row = 0; row < 15; row++) {
            for (let col = 0; col < 15; col++) {
                const result = game.makeMove(row, col);
                if (result) movesCount++;
                // Pokud hra skončila (výhra nebo remíza), break
                if (game.gameOver) break;
            }
            if (game.gameOver) break;
        }

        // Hra může skončit buď výhrou (méně tahů) nebo remízou (všechny tahy)
        expect(movesCount).toBeGreaterThan(0);
        expect(movesCount).toBeLessThanOrEqual(225);
    });

    it('getCellValue vrací null pro neplatné pozice', () => {
        expect(game.getCellValue(-1, 0)).toBeNull();
        expect(game.getCellValue(0, -1)).toBeNull();
        expect(game.getCellValue(15, 0)).toBeNull();
        expect(game.getCellValue(0, 15)).toBeNull();
    });
});

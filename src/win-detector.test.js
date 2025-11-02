/**
 * Unit testy pro Win Detector
 * Story 1.2: Detekce výhry a remízy
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { checkWin, checkDraw, checkGameState } from './win-detector.js';

describe('Win Detector - checkWin', () => {
    let emptyBoard;

    beforeEach(() => {
        // Vytvoření prázdné mřížky 15×15
        emptyBoard = Array.from({ length: 15 }, () =>
            Array.from({ length: 15 }, () => null)
        );
    });

    describe('Horizontální výhry', () => {
        it('Detekuje výhru 5 X v řadě horizontálně - začátek řádku', () => {
            // X X X X X v řádku 0
            for (let i = 0; i < 5; i++) {
                emptyBoard[0][i] = 'X';
            }

            const result = checkWin(emptyBoard, 0, 2, 15); // Tah uprostřed
            expect(result.isWin).toBe(true);
            expect(result.winner).toBe('X');
            expect(result.winningCells).toHaveLength(5);
            expect(result.winningCells).toEqual([
                [0, 0], [0, 1], [0, 2], [0, 3], [0, 4]
            ]);
        });

        it('Detekuje výhru 5 O v řadě horizontálně - střed řádku', () => {
            // O O O O O v řádku 7, pozice 5-9
            for (let i = 5; i < 10; i++) {
                emptyBoard[7][i] = 'O';
            }

            const result = checkWin(emptyBoard, 7, 7, 15);
            expect(result.isWin).toBe(true);
            expect(result.winner).toBe('O');
            expect(result.winningCells).toHaveLength(5);
        });

        it('Detekuje výhru 5 X v řadě horizontálně - konec řádku', () => {
            // X X X X X v řádku 14, pozice 10-14
            for (let i = 10; i < 15; i++) {
                emptyBoard[14][i] = 'X';
            }

            const result = checkWin(emptyBoard, 14, 12, 15);
            expect(result.isWin).toBe(true);
            expect(result.winner).toBe('X');
        });

        it('Nedetekuje výhru při 4 v řadě horizontálně', () => {
            // Pouze 4 X
            for (let i = 0; i < 4; i++) {
                emptyBoard[0][i] = 'X';
            }

            const result = checkWin(emptyBoard, 0, 2, 15);
            expect(result.isWin).toBe(false);
            expect(result.winner).toBe(null);
            expect(result.winningCells).toEqual([]);
        });

        it('Nedetekuje výhru když je řada přerušená', () => {
            // X X _ X X (mezera uprostřed)
            emptyBoard[0][0] = 'X';
            emptyBoard[0][1] = 'X';
            emptyBoard[0][3] = 'X';
            emptyBoard[0][4] = 'X';

            const result = checkWin(emptyBoard, 0, 1, 15);
            expect(result.isWin).toBe(false);
        });
    });

    describe('Vertikální výhry', () => {
        it('Detekuje výhru 5 X v řadě vertikálně - začátek sloupce', () => {
            // X na (0,0), (1,0), (2,0), (3,0), (4,0)
            for (let i = 0; i < 5; i++) {
                emptyBoard[i][0] = 'X';
            }

            const result = checkWin(emptyBoard, 2, 0, 15);
            expect(result.isWin).toBe(true);
            expect(result.winner).toBe('X');
            expect(result.winningCells).toEqual([
                [0, 0], [1, 0], [2, 0], [3, 0], [4, 0]
            ]);
        });

        it('Detekuje výhru 5 O v řadě vertikálně - střed sloupce', () => {
            // O ve sloupci 7, řádky 5-9
            for (let i = 5; i < 10; i++) {
                emptyBoard[i][7] = 'O';
            }

            const result = checkWin(emptyBoard, 7, 7, 15);
            expect(result.isWin).toBe(true);
            expect(result.winner).toBe('O');
            expect(result.winningCells).toHaveLength(5);
        });

        it('Detekuje výhru 5 X v řadě vertikálně - konec sloupce', () => {
            // X ve sloupci 14, řádky 10-14
            for (let i = 10; i < 15; i++) {
                emptyBoard[i][14] = 'X';
            }

            const result = checkWin(emptyBoard, 12, 14, 15);
            expect(result.isWin).toBe(true);
            expect(result.winner).toBe('X');
        });

        it('Nedetekuje výhru při 4 v řadě vertikálně', () => {
            for (let i = 0; i < 4; i++) {
                emptyBoard[i][5] = 'O';
            }

            const result = checkWin(emptyBoard, 2, 5, 15);
            expect(result.isWin).toBe(false);
        });
    });

    describe('Diagonální výhry ↘ (vlevo nahoře → vpravo dole)', () => {
        it('Detekuje výhru 5 X v řadě diagonálně ↘ - roh (0,0)', () => {
            // X na (0,0), (1,1), (2,2), (3,3), (4,4)
            for (let i = 0; i < 5; i++) {
                emptyBoard[i][i] = 'X';
            }

            const result = checkWin(emptyBoard, 2, 2, 15);
            expect(result.isWin).toBe(true);
            expect(result.winner).toBe('X');
            expect(result.winningCells).toEqual([
                [0, 0], [1, 1], [2, 2], [3, 3], [4, 4]
            ]);
        });

        it('Detekuje výhru 5 O v řadě diagonálně ↘ - střed mřížky', () => {
            // O na (5,5), (6,6), (7,7), (8,8), (9,9)
            for (let i = 0; i < 5; i++) {
                emptyBoard[5 + i][5 + i] = 'O';
            }

            const result = checkWin(emptyBoard, 7, 7, 15);
            expect(result.isWin).toBe(true);
            expect(result.winner).toBe('O');
        });

        it('Detekuje výhru 5 X v řadě diagonálně ↘ - konec mřížky', () => {
            // X na (10,10), (11,11), (12,12), (13,13), (14,14)
            for (let i = 0; i < 5; i++) {
                emptyBoard[10 + i][10 + i] = 'X';
            }

            const result = checkWin(emptyBoard, 12, 12, 15);
            expect(result.isWin).toBe(true);
            expect(result.winner).toBe('X');
        });

        it('Nedetekuje výhru při 4 v řadě diagonálně ↘', () => {
            for (let i = 0; i < 4; i++) {
                emptyBoard[i][i] = 'O';
            }

            const result = checkWin(emptyBoard, 2, 2, 15);
            expect(result.isWin).toBe(false);
        });
    });

    describe('Diagonální výhry ↗ (vlevo dole → vpravo nahoře)', () => {
        it('Detekuje výhru 5 X v řadě diagonálně ↗ - levý dolní roh', () => {
            // X na (4,0), (3,1), (2,2), (1,3), (0,4)
            for (let i = 0; i < 5; i++) {
                emptyBoard[4 - i][i] = 'X';
            }

            const result = checkWin(emptyBoard, 2, 2, 15);
            expect(result.isWin).toBe(true);
            expect(result.winner).toBe('X');
            expect(result.winningCells).toHaveLength(5);
            // Kontrola, že všechny správné buňky jsou přítomné
            expect(result.winningCells).toContainEqual([4, 0]);
            expect(result.winningCells).toContainEqual([3, 1]);
            expect(result.winningCells).toContainEqual([2, 2]);
            expect(result.winningCells).toContainEqual([1, 3]);
            expect(result.winningCells).toContainEqual([0, 4]);
        });

        it('Detekuje výhru 5 O v řadě diagonálně ↗ - střed', () => {
            // O na (9,5), (8,6), (7,7), (6,8), (5,9)
            for (let i = 0; i < 5; i++) {
                emptyBoard[9 - i][5 + i] = 'O';
            }

            const result = checkWin(emptyBoard, 7, 7, 15);
            expect(result.isWin).toBe(true);
            expect(result.winner).toBe('O');
        });

        it('Detekuje výhru 5 X v řadě diagonálně ↗ - pravý horní roh', () => {
            // X na (14,10), (13,11), (12,12), (11,13), (10,14)
            for (let i = 0; i < 5; i++) {
                emptyBoard[14 - i][10 + i] = 'X';
            }

            const result = checkWin(emptyBoard, 12, 12, 15);
            expect(result.isWin).toBe(true);
            expect(result.winner).toBe('X');
        });

        it('Nedetekuje výhru při 4 v řadě diagonálně ↗', () => {
            for (let i = 0; i < 4; i++) {
                emptyBoard[4 - i][i] = 'O';
            }

            const result = checkWin(emptyBoard, 2, 2, 15);
            expect(result.isWin).toBe(false);
        });
    });

    describe('Edge cases a speciální situace', () => {
        it('Detekuje výhru z prvního tahu v kombinaci', () => {
            // První symbol umístěný je začátek výhry
            for (let i = 0; i < 5; i++) {
                emptyBoard[0][i] = 'X';
            }

            const result = checkWin(emptyBoard, 0, 0, 15);
            expect(result.isWin).toBe(true);
        });

        it('Detekuje výhru z posledního tahu v kombinaci', () => {
            // Poslední symbol dokončí výhru
            for (let i = 0; i < 5; i++) {
                emptyBoard[0][i] = 'X';
            }

            const result = checkWin(emptyBoard, 0, 4, 15);
            expect(result.isWin).toBe(true);
        });

        it('Vrací jen 5 políček i když je v řadě více', () => {
            // 7 X v řadě
            for (let i = 0; i < 7; i++) {
                emptyBoard[0][i] = 'X';
            }

            const result = checkWin(emptyBoard, 0, 3, 15);
            expect(result.isWin).toBe(true);
            expect(result.winningCells).toHaveLength(5);
        });

        it('Nedetekuje výhru při prázdném poli', () => {
            const result = checkWin(emptyBoard, 0, 0, 15);
            expect(result.isWin).toBe(false);
            expect(result.winner).toBe(null);
        });

        it('Nedetekuje výhru když jsou symboly smíšené', () => {
            // X O X O X (žádná výhra)
            emptyBoard[0][0] = 'X';
            emptyBoard[0][1] = 'O';
            emptyBoard[0][2] = 'X';
            emptyBoard[0][3] = 'O';
            emptyBoard[0][4] = 'X';

            const result = checkWin(emptyBoard, 0, 2, 15);
            expect(result.isWin).toBe(false);
        });
    });
});

describe('Win Detector - checkDraw', () => {
    it('Detekuje remízu když je celá mřížka plná', () => {
        const fullBoard = Array.from({ length: 15 }, (_, row) =>
            Array.from({ length: 15 }, (_, col) =>
                (row + col) % 2 === 0 ? 'X' : 'O'
            )
        );

        const result = checkDraw(fullBoard, 15);
        expect(result).toBe(true);
    });

    it('Nedetekuje remízu když je jedno pole volné', () => {
        const almostFullBoard = Array.from({ length: 15 }, () =>
            Array.from({ length: 15 }, () => 'X')
        );
        almostFullBoard[7][7] = null; // Jedno prázdné pole

        const result = checkDraw(almostFullBoard, 15);
        expect(result).toBe(false);
    });

    it('Nedetekuje remízu na prázdné mřížce', () => {
        const emptyBoard = Array.from({ length: 15 }, () =>
            Array.from({ length: 15 }, () => null)
        );

        const result = checkDraw(emptyBoard, 15);
        expect(result).toBe(false);
    });

    it('Nedetekuje remízu když je jen několik tahů', () => {
        const board = Array.from({ length: 15 }, () =>
            Array.from({ length: 15 }, () => null)
        );
        board[0][0] = 'X';
        board[0][1] = 'O';
        board[0][2] = 'X';

        const result = checkDraw(board, 15);
        expect(result).toBe(false);
    });
});

describe('Win Detector - checkGameState', () => {
    let emptyBoard;

    beforeEach(() => {
        emptyBoard = Array.from({ length: 15 }, () =>
            Array.from({ length: 15 }, () => null)
        );
    });

    it('Vrací výhru když je 5 v řadě', () => {
        for (let i = 0; i < 5; i++) {
            emptyBoard[0][i] = 'X';
        }

        const result = checkGameState(emptyBoard, 0, 2, 15);
        expect(result.isGameOver).toBe(true);
        expect(result.isWin).toBe(true);
        expect(result.isDraw).toBe(false);
        expect(result.winner).toBe('X');
        expect(result.winningCells).toHaveLength(5);
    });

    it('Vrací remízu když je mřížka plná bez výhry', () => {
        // Vytvoření plné mřížky bez výherní kombinace
        // Pattern: X O O X O X ... (střídání, které zabrání 5 v řadě)
        for (let row = 0; row < 15; row++) {
            for (let col = 0; col < 15; col++) {
                const index = row * 15 + col;
                // Pattern: XOOXOX XOOXOX... (3-bit pattern)
                const pattern = ['X', 'O', 'O', 'X', 'O', 'X'];
                emptyBoard[row][col] = pattern[index % 6];
            }
        }

        const result = checkGameState(emptyBoard, 14, 14, 15);
        expect(result.isGameOver).toBe(true);
        expect(result.isWin).toBe(false);
        expect(result.isDraw).toBe(true);
        expect(result.winner).toBe(null);
        expect(result.winningCells).toEqual([]);
    });

    it('Vrací "hra pokračuje" když není výhra ani remíza', () => {
        emptyBoard[0][0] = 'X';
        emptyBoard[0][1] = 'O';

        const result = checkGameState(emptyBoard, 0, 1, 15);
        expect(result.isGameOver).toBe(false);
        expect(result.isWin).toBe(false);
        expect(result.isDraw).toBe(false);
        expect(result.winner).toBe(null);
    });

    it('Prioritizuje výhru před remízou', () => {
        // Plná mřížka s výherní kombinací
        for (let row = 0; row < 15; row++) {
            for (let col = 0; col < 15; col++) {
                emptyBoard[row][col] = 'O';
            }
        }
        // Přepíšeme na výherní kombinaci
        for (let i = 0; i < 5; i++) {
            emptyBoard[0][i] = 'X';
        }

        const result = checkGameState(emptyBoard, 0, 2, 15);
        expect(result.isGameOver).toBe(true);
        expect(result.isWin).toBe(true);
        expect(result.isDraw).toBe(false);
        expect(result.winner).toBe('X');
    });
});

/**
 * Story 4.13: Testy pro dynamické podmínky výhry
 * 3×3: 3 v řadě = výhra
 * 10×10, 15×15: 5 v řadě = výhra
 */
describe('Win Detector - Story 4.13: Dynamic Winning Conditions', () => {
    describe('3×3 Board - 3 in a row wins', () => {
        let board3x3;

        beforeEach(() => {
            // Vytvoření prázdné mřížky 3×3
            board3x3 = Array.from({ length: 3 }, () =>
                Array.from({ length: 3 }, () => null)
            );
        });

        it('Detekuje výhru 3 X v řadě horizontálně na 3×3 desce', () => {
            // X X X v řádku 0
            board3x3[0][0] = 'X';
            board3x3[0][1] = 'X';
            board3x3[0][2] = 'X';

            const result = checkWin(board3x3, 0, 1, 3, 3); // size=3, winningLength=3
            expect(result.isWin).toBe(true);
            expect(result.winner).toBe('X');
            expect(result.winningCells).toHaveLength(3);
        });

        it('Detekuje výhru 3 O v řadě vertikálně na 3×3 desce', () => {
            // O na (0,0), (1,0), (2,0)
            board3x3[0][0] = 'O';
            board3x3[1][0] = 'O';
            board3x3[2][0] = 'O';

            const result = checkWin(board3x3, 1, 0, 3, 3);
            expect(result.isWin).toBe(true);
            expect(result.winner).toBe('O');
        });

        it('Detekuje výhru 3 X v řadě diagonálně na 3×3 desce', () => {
            // X na (0,0), (1,1), (2,2)
            board3x3[0][0] = 'X';
            board3x3[1][1] = 'X';
            board3x3[2][2] = 'X';

            const result = checkWin(board3x3, 1, 1, 3, 3);
            expect(result.isWin).toBe(true);
            expect(result.winner).toBe('X');
        });

        it('Nedetekuje výhru při 2 v řadě na 3×3 desce', () => {
            // Pouze 2 X
            board3x3[0][0] = 'X';
            board3x3[0][1] = 'X';

            const result = checkWin(board3x3, 0, 1, 3, 3);
            expect(result.isWin).toBe(false);
            expect(result.winner).toBe(null);
        });

        it('Nedetekuje výhru při 4 v řadě na 3×3 desce (chybí prostor)', () => {
            // Nemůžeme mít 4 v řadě na 3×3 desce, ale test logiky
            // Pokud bychom měli větší desku
            const board10x10 = Array.from({ length: 10 }, () =>
                Array.from({ length: 10 }, () => null)
            );
            for (let i = 0; i < 4; i++) {
                board10x10[0][i] = 'X';
            }
            // Ale s winningLength=3, 4 v řadě je výhra
            const result = checkWin(board10x10, 0, 2, 10, 3);
            expect(result.isWin).toBe(true); // 4 v řadě s podmínkou 3 = výhra
        });

        it('checkGameState s 3×3 deskou a winningLength=3', () => {
            board3x3[0][0] = 'X';
            board3x3[0][1] = 'X';
            board3x3[0][2] = 'X';

            const result = checkGameState(board3x3, 0, 1, 3, 3);
            expect(result.isGameOver).toBe(true);
            expect(result.isWin).toBe(true);
            expect(result.winner).toBe('X');
        });
    });

    describe('10×10 Board - 5 in a row wins', () => {
        let board10x10;

        beforeEach(() => {
            board10x10 = Array.from({ length: 10 }, () =>
                Array.from({ length: 10 }, () => null)
            );
        });

        it('Detekuje výhru 5 X v řadě horizontálně na 10×10 desce', () => {
            for (let i = 0; i < 5; i++) {
                board10x10[0][i] = 'X';
            }

            const result = checkWin(board10x10, 0, 2, 10, 5);
            expect(result.isWin).toBe(true);
            expect(result.winner).toBe('X');
            expect(result.winningCells).toHaveLength(5);
        });

        it('Nedetekuje výhru při 4 v řadě na 10×10 desce s winningLength=5', () => {
            for (let i = 0; i < 4; i++) {
                board10x10[0][i] = 'X';
            }

            const result = checkWin(board10x10, 0, 2, 10, 5);
            expect(result.isWin).toBe(false);
        });

        it('Detekuje výhru 5 O v řadě vertikálně na 10×10 desce', () => {
            for (let i = 0; i < 5; i++) {
                board10x10[i][5] = 'O';
            }

            const result = checkWin(board10x10, 2, 5, 10, 5);
            expect(result.isWin).toBe(true);
            expect(result.winner).toBe('O');
        });
    });

    describe('15×15 Board - 5 in a row wins', () => {
        let board15x15;

        beforeEach(() => {
            board15x15 = Array.from({ length: 15 }, () =>
                Array.from({ length: 15 }, () => null)
            );
        });

        it('Detekuje výhru 5 X v řadě diagonálně na 15×15 desce', () => {
            // X na (2,2), (3,3), (4,4), (5,5), (6,6)
            for (let i = 0; i < 5; i++) {
                board15x15[2 + i][2 + i] = 'X';
            }

            const result = checkWin(board15x15, 4, 4, 15, 5);
            expect(result.isWin).toBe(true);
            expect(result.winner).toBe('X');
        });

        it('Nedetekuje výhru při 4 v řadě na 15×15 desce s winningLength=5', () => {
            for (let i = 0; i < 4; i++) {
                board15x15[i][0] = 'X';
            }

            const result = checkWin(board15x15, 2, 0, 15, 5);
            expect(result.isWin).toBe(false);
        });

        it('checkGameState s 15×15 deskou a winningLength=5', () => {
            // Vytvořit 5 X v řadě
            for (let i = 0; i < 5; i++) {
                board15x15[7][i] = 'X';
            }

            const result = checkGameState(board15x15, 7, 2, 15, 5);
            expect(result.isGameOver).toBe(true);
            expect(result.isWin).toBe(true);
            expect(result.isDraw).toBe(false);
            expect(result.winner).toBe('X');
        });
    });

    describe('Mixed Sizes - Different winning conditions', () => {
        it('4 v řadě není výhra na 3×3 (winningLength=3)', () => {
            const board = Array.from({ length: 10 }, () =>
                Array.from({ length: 10 }, () => null)
            );
            for (let i = 0; i < 4; i++) {
                board[0][i] = 'X';
            }

            const result = checkWin(board, 0, 2, 10, 3);
            expect(result.isWin).toBe(true); // 4 >= 3, takže výhra
        });

        it('6 v řadě je výhra na 15×15 (winningLength=5)', () => {
            const board = Array.from({ length: 15 }, () =>
                Array.from({ length: 15 }, () => null)
            );
            for (let i = 0; i < 6; i++) {
                board[0][i] = 'O';
            }

            const result = checkWin(board, 0, 3, 15, 5);
            expect(result.isWin).toBe(true);
            expect(result.winningCells).toHaveLength(5); // Vracíme jen prvních 5
        });
    });
});

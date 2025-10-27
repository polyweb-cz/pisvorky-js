/**
 * Piškvorky 15×15 - Win Detector
 * Story 1.2: Detekce výhry a remízy
 *
 * Detekuje výhru (5 v řadě) ve 4 směrech:
 * - Horizontálně (←→)
 * - Vertikálně (↑↓)
 * - Diagonálně ↘ (vlevo nahoře → vpravo dole)
 * - Diagonálně ↗ (vlevo dole → vpravo nahoře)
 */

/**
 * Hlavní funkce pro detekci výhry
 * @param {Array<Array<string|null>>} gameState - 2D pole herního stavu
 * @param {number} lastRow - poslední tahem umístěný řádek
 * @param {number} lastCol - poslední tahem umístěný sloupec
 * @param {number} size - velikost mřížky (15)
 * @returns {{isWin: boolean, winner: string|null, winningCells: Array<Array<number>>}}
 */
export function checkWin(gameState, lastRow, lastCol, size = 15) {
    const player = gameState[lastRow][lastCol];

    // Pokud pole není obsazené, nemůže být výhra
    if (!player) {
        return { isWin: false, winner: null, winningCells: [] };
    }

    // Kontrola všech 4 směrů
    const directions = [
        { dr: 0, dc: 1 },   // Horizontálně →
        { dr: 1, dc: 0 },   // Vertikálně ↓
        { dr: 1, dc: 1 },   // Diagonálně ↘
        { dr: 1, dc: -1 },  // Diagonálně ↗
    ];

    for (const direction of directions) {
        const result = checkDirection(gameState, lastRow, lastCol, direction.dr, direction.dc, size);
        if (result.isWin) {
            return {
                isWin: true,
                winner: player,
                winningCells: result.cells
            };
        }
    }

    return { isWin: false, winner: null, winningCells: [] };
}

/**
 * Kontrola jedného směru od posledního tahu
 * @param {Array<Array<string|null>>} gameState - herní stav
 * @param {number} row - řádek posledního tahu
 * @param {number} col - sloupec posledního tahu
 * @param {number} dr - delta row (směr po řádcích)
 * @param {number} dc - delta col (směr po sloupcích)
 * @param {number} size - velikost mřížky
 * @returns {{isWin: boolean, cells: Array<Array<number>>}}
 */
function checkDirection(gameState, row, col, dr, dc, size) {
    const player = gameState[row][col];
    const cells = [[row, col]]; // Začínáme s pozicí posledního tahu

    // Počítej v pozitivním směru
    let r = row + dr;
    let c = col + dc;
    while (r >= 0 && r < size && c >= 0 && c < size && gameState[r][c] === player) {
        cells.push([r, c]);
        r += dr;
        c += dc;
    }

    // Počítej v negativním směru
    r = row - dr;
    c = col - dc;
    while (r >= 0 && r < size && c >= 0 && c < size && gameState[r][c] === player) {
        cells.unshift([r, c]); // Přidej na začátek pro zachování pořadí
        r -= dr;
        c -= dc;
    }

    // Výhra = 5 nebo více políček v řadě
    const isWin = cells.length >= 5;

    // Pokud je více než 5, vezmi jen prvních 5 (pro zvýraznění)
    const winningCells = isWin ? cells.slice(0, 5) : [];

    return { isWin, cells: winningCells };
}

/**
 * Detekce remízy - kontrola, zda jsou všechna pole obsazená
 * @param {Array<Array<string|null>>} gameState - herní stav
 * @param {number} size - velikost mřížky
 * @returns {boolean} true pokud je remíza (všechna pole obsazená bez výhry)
 */
export function checkDraw(gameState, size = 15) {
    for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
            if (gameState[row][col] === null) {
                return false; // Našli jsme volné pole
            }
        }
    }
    return true; // Všechna pole jsou obsazená
}

/**
 * Kompletní kontrola stavu hry po tahu
 * Kombinuje checkWin a checkDraw
 * @param {Array<Array<string|null>>} gameState - herní stav
 * @param {number} lastRow - poslední tahem umístěný řádek
 * @param {number} lastCol - poslední tahem umístěný sloupec
 * @param {number} size - velikost mřížky
 * @returns {{
 *   isGameOver: boolean,
 *   isWin: boolean,
 *   isDraw: boolean,
 *   winner: string|null,
 *   winningCells: Array<Array<number>>
 * }}
 */
export function checkGameState(gameState, lastRow, lastCol, size = 15) {
    // Nejdříve kontrola výhry
    const winResult = checkWin(gameState, lastRow, lastCol, size);

    if (winResult.isWin) {
        return {
            isGameOver: true,
            isWin: true,
            isDraw: false,
            winner: winResult.winner,
            winningCells: winResult.winningCells
        };
    }

    // Pokud není výhra, kontrola remízy
    const isDraw = checkDraw(gameState, size);

    return {
        isGameOver: isDraw,
        isWin: false,
        isDraw: isDraw,
        winner: null,
        winningCells: []
    };
}

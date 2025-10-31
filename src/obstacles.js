/**
 * Piškvorky 15×15 - Obstacles Mode
 * Story 1.4: Náhodné generování překážek (zaminovaných polí)
 *
 * Obsahuje logiku pro:
 * - Generování náhodných pozic překážek
 * - Ověření, zda je pole zaminované
 * - Správu stavu překážek
 */

/**
 * Generuje pole náhodných pozic zaminovaných polí
 * @param {number} count - Počet překážek k vygenerování (default 15)
 * @param {number} size - Velikost mřížky (default 15)
 * @returns {Array<Array<number>>} Pole [row, col] pozic překážek
 *
 * @example
 * const obstacles = generateRandomObstacles(15, 15);
 * // Vrátí: [[3, 5], [7, 2], [14, 14], ...]
 */
export function generateRandomObstacles(count = 15, size = 15) {
    // Validace
    if (count > size * size) {
        throw new Error(`Nelze vygenerovat ${count} překážek na mřížce ${size}×${size}`);
    }

    // Použít Set pro efektivní detekci duplicit (O(1) lookup)
    const positions = new Set();

    while (positions.size < count) {
        const row = Math.floor(Math.random() * size);
        const col = Math.floor(Math.random() * size);
        const key = `${row},${col}`;
        positions.add(key);
    }

    // Převést Set stringů zpět na pole [row, col]
    return Array.from(positions).map(key => {
        const [row, col] = key.split(',').map(Number);
        return [row, col];
    });
}

/**
 * Kontroluje, zda je daná pozice zaminovaná (obsahuje překážku)
 * @param {number} row - Řádek
 * @param {number} col - Sloupec
 * @param {Array<Array<number>>} obstacles - Pole překážek [[row, col], ...]
 * @returns {boolean} true pokud je pozice zaminovaná
 *
 * @example
 * const obstacles = [[0, 0], [1, 1]];
 * isObstacle(0, 0, obstacles); // true
 * isObstacle(5, 5, obstacles); // false
 */
export function isObstacle(row, col, obstacles) {
    return obstacles.some(([obsRow, obsCol]) => obsRow === row && obsCol === col);
}

/**
 * Konvertuje pole překážek na Set pro efektivnější hledání
 * @param {Array<Array<number>>} obstacles - Pole překážek
 * @returns {Set<string>} Set stringů "row,col" pro O(1) lookup
 *
 * @example
 * const obstacles = [[0, 0], [1, 1]];
 * const obstacleSet = obstaclesToSet(obstacles);
 * obstacleSet.has('0,0'); // true
 */
export function obstaclesToSet(obstacles) {
    return new Set(obstacles.map(([row, col]) => `${row},${col}`));
}

/**
 * Kontroluje, zda je pozice zaminovaná pomocí Set (efektivnější)
 * @param {number} row - Řádek
 * @param {number} col - Sloupec
 * @param {Set<string>} obstacleSet - Set překážek (z obstaclesToSet)
 * @returns {boolean} true pokud je pozice zaminovaná
 *
 * @example
 * const obstacles = [[0, 0], [1, 1]];
 * const obstacleSet = obstaclesToSet(obstacles);
 * isObstacleSet(0, 0, obstacleSet); // true (O(1) lookup)
 */
export function isObstacleSet(row, col, obstacleSet) {
    return obstacleSet.has(`${row},${col}`);
}

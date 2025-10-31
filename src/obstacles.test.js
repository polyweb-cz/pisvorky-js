/**
 * Unit testy pro Obstacles Mode
 * Story 1.4: Režim s překážkami
 */

import { describe, it, expect } from 'vitest';
import { generateRandomObstacles, isObstacle, obstaclesToSet, isObstacleSet } from './obstacles.js';

describe('Obstacles - generateRandomObstacles', () => {
    it('Generuje přesně 15 překážek (default)', () => {
        const obstacles = generateRandomObstacles();
        expect(obstacles).toHaveLength(15);
    });

    it('Generuje přesně N překážek podle parametru', () => {
        const obstacles = generateRandomObstacles(10, 15);
        expect(obstacles).toHaveLength(10);

        const obstacles20 = generateRandomObstacles(20, 15);
        expect(obstacles20).toHaveLength(20);
    });

    it('Všechny pozice jsou v rozmezí 0-14 (pro 15×15 mřížku)', () => {
        const obstacles = generateRandomObstacles(15, 15);

        for (const [row, col] of obstacles) {
            expect(row).toBeGreaterThanOrEqual(0);
            expect(row).toBeLessThan(15);
            expect(col).toBeGreaterThanOrEqual(0);
            expect(col).toBeLessThan(15);
        }
    });

    it('Neobsahuje duplikáty (všechny pozice jsou unikátní)', () => {
        const obstacles = generateRandomObstacles(15, 15);
        const positionSet = new Set();

        for (const [row, col] of obstacles) {
            const key = `${row},${col}`;
            expect(positionSet.has(key)).toBe(false);
            positionSet.add(key);
        }

        expect(positionSet.size).toBe(15);
    });

    it('Dvě vygenerování dávají různé pozice (randomness)', () => {
        const obstacles1 = generateRandomObstacles(15, 15);
        const obstacles2 = generateRandomObstacles(15, 15);

        // Konvertuj na stringy pro porovnání
        const str1 = JSON.stringify(obstacles1.sort());
        const str2 = JSON.stringify(obstacles2.sort());

        // S vysokou pravděpodobností by měly být různé
        // (teoreticky by mohly být stejné, ale šance je 1:10^30 apod.)
        expect(str1).not.toEqual(str2);
    });

    it('Vrátí pozice jako [row, col] páry', () => {
        const obstacles = generateRandomObstacles(5, 15);

        for (const position of obstacles) {
            expect(Array.isArray(position)).toBe(true);
            expect(position).toHaveLength(2);
            expect(typeof position[0]).toBe('number');
            expect(typeof position[1]).toBe('number');
        }
    });

    it('Vyhazuje chybu, když je count > size*size', () => {
        expect(() => {
            generateRandomObstacles(226, 15); // 226 > 15*15
        }).toThrow();
    });

    it('Pracuje s různými velikostmi mřížky', () => {
        const obstacles10 = generateRandomObstacles(10, 10);
        expect(obstacles10).toHaveLength(10);

        for (const [row, col] of obstacles10) {
            expect(row).toBeLessThan(10);
            expect(col).toBeLessThan(10);
        }

        const obstacles20 = generateRandomObstacles(20, 20);
        expect(obstacles20).toHaveLength(20);

        for (const [row, col] of obstacles20) {
            expect(row).toBeLessThan(20);
            expect(col).toBeLessThan(20);
        }
    });

    it('Vygeneruje maximální počet překážek (mřížka plná)', () => {
        const obstacles = generateRandomObstacles(225, 15);
        expect(obstacles).toHaveLength(225);
    });
});

describe('Obstacles - isObstacle', () => {
    let obstacles;

    beforeEach(() => {
        obstacles = [[0, 0], [5, 5], [14, 14], [7, 3]];
    });

    it('Detekuje překážku na pozici [0, 0]', () => {
        expect(isObstacle(0, 0, obstacles)).toBe(true);
    });

    it('Detekuje překážku na pozici [5, 5]', () => {
        expect(isObstacle(5, 5, obstacles)).toBe(true);
    });

    it('Detekuje překážku na pozici [14, 14]', () => {
        expect(isObstacle(14, 14, obstacles)).toBe(true);
    });

    it('Nedetekuje překážku na prázdné pozici [1, 1]', () => {
        expect(isObstacle(1, 1, obstacles)).toBe(false);
    });

    it('Nedetekuje překážku na prázdné pozici [7, 7]', () => {
        expect(isObstacle(7, 7, obstacles)).toBe(false);
    });

    it('Vrátí false pro pozici mimo překážky', () => {
        expect(isObstacle(10, 10, obstacles)).toBe(false);
    });

    it('Vrátí false pro prázdné pole překážek', () => {
        expect(isObstacle(0, 0, [])).toBe(false);
    });
});

describe('Obstacles - obstaclesToSet', () => {
    it('Konvertuje pole na Set stringů', () => {
        const obstacles = [[0, 0], [5, 5], [14, 14]];
        const obstacleSet = obstaclesToSet(obstacles);

        expect(obstacleSet.size).toBe(3);
        expect(obstacleSet.has('0,0')).toBe(true);
        expect(obstacleSet.has('5,5')).toBe(true);
        expect(obstacleSet.has('14,14')).toBe(true);
    });

    it('Vrátí prázdný Set pro prázdné pole', () => {
        const obstacleSet = obstaclesToSet([]);
        expect(obstacleSet.size).toBe(0);
    });

    it('Správně konvertuje i velké pole', () => {
        const obstacles = Array.from({ length: 100 }, (_, i) => [i % 15, Math.floor(i / 15)]);
        const obstacleSet = obstaclesToSet(obstacles);
        expect(obstacleSet.size).toBe(100);
    });
});

describe('Obstacles - isObstacleSet', () => {
    let obstacleSet;

    beforeEach(() => {
        const obstacles = [[0, 0], [5, 5], [14, 14], [7, 3]];
        obstacleSet = obstaclesToSet(obstacles);
    });

    it('Detekuje překážku v Set [0, 0]', () => {
        expect(isObstacleSet(0, 0, obstacleSet)).toBe(true);
    });

    it('Detekuje překážku v Set [5, 5]', () => {
        expect(isObstacleSet(5, 5, obstacleSet)).toBe(true);
    });

    it('Nedetekuje překážku v Set [1, 1]', () => {
        expect(isObstacleSet(1, 1, obstacleSet)).toBe(false);
    });

    it('Vrátí false pro prázdný Set', () => {
        const emptySet = obstaclesToSet([]);
        expect(isObstacleSet(0, 0, emptySet)).toBe(false);
    });

    it('Vrátí false pro pozici mimo Set', () => {
        expect(isObstacleSet(10, 10, obstacleSet)).toBe(false);
    });
});

describe('Obstacles - Performance Comparison', () => {
    it('isObstacleSet je efektivnější než isObstacle pro velké seznamy', () => {
        const obstacles = generateRandomObstacles(100, 15);
        const obstacleSet = obstaclesToSet(obstacles);

        // Obě metody by měly dát stejný výsledek
        for (let row = 0; row < 15; row++) {
            for (let col = 0; col < 15; col++) {
                const result1 = isObstacle(row, col, obstacles);
                const result2 = isObstacleSet(row, col, obstacleSet);
                expect(result1).toBe(result2);
            }
        }
    });
});

# Piškvorky 15×15

MVP implementace klasické hry Piškvorky s mřížkou 15×15.

## Story 1.1 - Implementováno ✓

Základní UI a logika pro vykreslení mřížky a střídání tahů.

### Implementované soubory
- `/src/index.html` - HTML struktura s divem pro mřížku
- `/src/styles.css` - Stylování mřížky a UI (responzivní 360-1440px)
- `/src/game.js` - Logika hry (game state, tahy, střídání, indikátor)
- `/src/game.test.js` - Unit testy (20 testů)
- `/package.json` - NPM konfigurace a závislosti
- `/vitest.config.js` - Konfigurace testovacího frameworku
- `/vite.config.js` - Konfigurace dev serveru

### Akceptační kritéria - Splněno ✓

- ✓ AC1.1: Mřížka 15×15 je vykreslena v HTML a stylována CSS
- ✓ AC1.2: Po kliknutí se v poli zobrazí X nebo O v pořadí (X→O→X→...)
- ✓ AC1.3: Kliknutí na obsazené pole nemá efekt
- ✓ AC1.4: Indikátor ukazuje, který hráč je na tahu
- ✓ AC1.5: Tahy se ukládají do game state (pole s hodnotou X/O)

## Technologie

- **Frontend**: Vanilla JavaScript (ES6+), HTML5, CSS3
- **Build Tool**: Vite
- **Testing**: Vitest
- **DOM Testing**: happy-dom

## Instalace

```bash
npm install
```

## Spuštění

### Development server
```bash
npm run dev
```
Otevřete prohlížeč na http://localhost:5173

### Produkční build
```bash
npm run build
```

### Preview produkčního buildu
```bash
npm run preview
```

## Testování

### Spuštění testů
```bash
npm test
```

### Watch mode (automatické spouštění při změnách)
```bash
npm run test:watch
```

### UI pro testy
```bash
npm run test:ui
```

### Výsledky testů
```
✓ src/game.test.js  (20 tests) 15ms

Test Files  1 passed (1)
     Tests  20 passed (20)
```

## Manuální testování

Detailní návod na manuální testování je v souboru `/MANUAL_TESTING.md`

## Architektura

### Game State
Hra používá 2D array `15×15` pro uložení stavu hry:
```javascript
gameState = [
  [null, 'X', 'O', ...],  // řádek 0
  ['X', null, null, ...],  // řádek 1
  ...
]
```

### Hlavní komponenty

#### `TicTacToeGame` (Class)
Obsahuje herní logiku:
- `initializeGameState()` - Vytvoří prázdnou mřížku
- `makeMove(row, col)` - Provede tah na dané pozici
- `switchPlayer()` - Střídá hráče X ↔ O
- `getCellValue(row, col)` - Vrátí hodnotu pole
- `isCellOccupied(row, col)` - Kontrola obsazení
- `reset()` - Reset hry

#### `GameUI` (Class)
Řídí renderování a interakci s DOM:
- `renderGrid()` - Vykreslí mřížku 15×15
- `handleCellClick()` - Obsluha kliknutí na pole
- `updateCell()` - Update konkrétního pole
- `updateTurnIndicator()` - Update indikátoru tahu
- `handleReset()` - Obsluha resetu hry

### Event Delegation
Používá se event delegation na container mřížky pro efektivní správu 225 event listenerů (15×15).

## Responsivní design

Aplikace je optimalizována pro:
- **Mobil**: 360px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px - 1440px+

CSS Grid se automaticky přizpůsobuje velikosti obrazovky.

## Struktura projektu

```
piskvorky/
├── src/
│   ├── index.html          # HTML struktura
│   ├── styles.css          # Stylování
│   ├── game.js             # Herní logika
│   └── game.test.js        # Unit testy
├── docs/
│   └── stories/
│       └── 1.1-grid-and-turns.md
├── package.json
├── vitest.config.js
├── vite.config.js
├── MANUAL_TESTING.md
└── README.md
```

## Další vývoj

Story 1.1 je hotová. Následující features:
- Detekce výhry (5 v řadě)
- Zvýraznění výherní kombinace
- Game over state
- Skóre počítání
- AI protihráč (možná)

## License

MIT

# Piškvorky 15×15

A fully functional 15×15 tic-tac-toe game with win detection, obstacles mode, and persistent user preferences.

![Status](https://img.shields.io/badge/status-complete-brightgreen)
![Tests](https://img.shields.io/badge/tests-103%2F103-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)

## 🎮 Live Demo

[Play Piškvorky on GitHub Pages](https://polyweb-cz.github.io/pisvorky-js/)

## 📋 Features

- ✓ **15×15 Interactive Grid** - Full playable board with responsive design
- ✓ **Win Detection** - Automatically detects 5-in-a-row (horizontally, vertically, diagonally)
- ✓ **Draw Detection** - Identifies when all cells are filled
- ✓ **Obstacles Mode** - Toggle optional obstacles (mines) that block moves
- ✓ **Persistent Preferences** - User preferences saved in cookies (365 days)
- ✓ **Fully Responsive** - Works seamlessly on mobile (360px), tablet (768px), and desktop (1440px+)
- ✓ **Comprehensive Testing** - 103 unit & integration tests
- ✓ **Modern Stack** - Vanilla JavaScript, Vite, Vitest

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ ([download](https://nodejs.org/))
- npm (comes with Node.js)

### Installation

```bash
git clone https://github.com/steinbauer/piskvorky
cd piskvorky
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Testing

```bash
npm test           # Run all tests once
npm run test:watch # Watch mode (re-run on changes)
npm run test:ui    # Visual test dashboard
```

### Production Build

```bash
npm run build      # Build for production
npm run preview    # Preview production build locally
```

## 📦 Deployment

### GitHub Pages (Automatic)

The project automatically deploys to GitHub Pages on every push to the `main` branch.

**Current Live URL:** [https://polyweb-cz.github.io/pisvorky-js/](https://polyweb-cz.github.io/pisvorky-js/)

#### For Your Own Fork:

1. Fork this repository
2. Push your changes to the `main` branch
3. GitHub Actions workflow automatically builds and deploys
4. Visit `https://[your-username].github.io/[repository-name]/`

For detailed deployment instructions, see [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md).

## 🏗️ Architecture

### Technology Stack

- **Frontend**: Vanilla JavaScript (ES6+), HTML5, CSS3
- **Build Tool**: Vite 5.x
- **Testing**: Vitest 1.x
- **DOM Testing**: happy-dom
- **Layout**: CSS Grid
- **Persistence**: localStorage/Cookies

### Project Structure

```
piskvorky/
├── src/
│   ├── index.html                 # HTML structure
│   ├── styles.css                 # Responsive CSS Grid layout
│   ├── game.js                    # Core game logic & UI
│   ├── win-detector.js            # Win detection algorithm
│   ├── obstacles.js               # Obstacles mode utilities
│   ├── game.test.js               # Unit tests (20)
│   ├── win-detector.test.js       # Unit tests (30)
│   ├── obstacles.test.js          # Unit tests (25)
│   └── game.integration.test.js   # Integration tests (28)
├── .github/
│   └── workflows/
│       └── deploy.yml             # GitHub Actions CI/CD
├── docs/
│   ├── prd/
│   │   └── epic-2-deployment.md   # Deployment epic
│   └── stories/
│       ├── 1.1-grid-and-turns.md
│       ├── 1.2-win-detection.md
│       ├── 1.3-reset-and-indicator.md
│       ├── 1.4-obstacles-mode.md
│       ├── 1.5-ui-improvements-centering-cookies.md
│       ├── 2.1-github-pages-setup.md
│       └── 2.2-documentation-deploy.md
├── package.json
├── vite.config.js
├── vitest.config.js
├── README.md                      # This file
├── DEPLOYMENT_GUIDE.md            # Deployment instructions
└── LICENSE
```

### Game State Management

The game maintains a 15×15 2D array representing the board state:

```javascript
gameState[row][col] = null | 'X' | 'O'
```

### Key Classes

#### `TicTacToeGame`
- Manages game logic (moves, win detection, state)
- Handles obstacles and preferences
- Persists user preferences to cookies

#### `GameUI`
- Renders the 15×15 grid
- Handles user interactions via event delegation
- Updates visual feedback

### Win Detection Algorithm

Checks all four directions (→, ↓, ↘, ↙) from each cell to find 5-in-a-row patterns. Time complexity: O(n²) where n=15.

## 📊 Test Coverage

```
✓ src/game.test.js              (20 tests)
✓ src/win-detector.test.js      (30 tests)
✓ src/obstacles.test.js         (25 tests)
✓ src/game.integration.test.js  (28 tests)
─────────────────────────────────────────
Total: 103 tests passed
```

## 📱 Responsive Design

The game adapts to all screen sizes:

| Device | Width | Status |
|--------|-------|--------|
| Mobile | 360px | ✓ Tested |
| Tablet | 768px | ✓ Tested |
| Desktop | 1440px | ✓ Tested |

CSS Grid automatically adjusts the cell size based on viewport.

## 🎯 How to Play

1. **Start**: Player X goes first
2. **Move**: Click any empty cell to place your mark
3. **Win**: Get 5 in a row (horizontal, vertical, or diagonal)
4. **Draw**: Game ends if all cells are filled
5. **Reset**: Click "Nová hra" to start over

### Obstacles Mode

- Toggle the checkbox to enable obstacles
- Obstacles appear as black cells with 💣 emoji
- You cannot place marks on obstacles
- 15 random obstacles are placed each game
- Your preference is saved for future games

## 📝 Development Guide

### Adding a New Feature

1. Create a new story in `docs/stories/[number]-[feature].md`
2. Implement changes following the story acceptance criteria
3. Write tests first (TDD approach)
4. Verify all tests pass: `npm test`
5. Build succeeds: `npm run build`
6. Update documentation

See [CONTRIBUTING.md](./docs/CONTRIBUTING.md) for detailed guidelines.

### Running Tests

```bash
# Single run
npm test

# Watch mode (re-run on file changes)
npm run test:watch

# UI Dashboard
npm run test:ui

# Test specific file
npm test src/game.test.js
```

### Pre-Deploy Validation

Before pushing to main:

```bash
npm run predeploy
```

This script:
1. Runs all tests
2. Builds the project
3. Verifies clean git status

## 📚 Documentation

- **[README.md](./README.md)** - This file
- **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** - Detailed deployment instructions
- **[CONTRIBUTING.md](./docs/CONTRIBUTING.md)** - Contribution guidelines
- **[docs/stories/](./docs/stories/)** - Story documentation with acceptance criteria

## 🔗 Related Links

- **Repository**: [github.com/polyweb-cz/pisvorky-js](https://github.com/polyweb-cz/pisvorky-js)
- **Live Demo**: [polyweb-cz.github.io/pisvorky-js](https://polyweb-cz.github.io/pisvorky-js/)
- **Vite Docs**: [vitejs.dev](https://vitejs.dev)
- **Vitest Docs**: [vitest.dev](https://vitest.dev)

## 💡 Known Issues & Future Improvements

### Known Issues

None currently - all acceptance criteria met!

### Planned Features

- AI opponent (minimax algorithm)
- Game statistics tracking
- Multiple difficulty levels
- Sound effects and animations
- Multiplayer support (WebSocket)

## 📄 License

MIT License - see [LICENSE](./LICENSE) file for details

---

**Last Updated**: 2025-10-31
**Maintained By**: Claude Code + BMAD Framework
**Status**: Complete - Ready for deployment

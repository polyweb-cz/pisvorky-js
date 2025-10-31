# Contributing Guidelines - Piškvorky 15×15

Thank you for your interest in contributing to Piškvorky! This document explains the development process and how to contribute.

## Table of Contents

1. [Development Philosophy](#development-philosophy)
2. [Project Structure](#project-structure)
3. [BMAD Stories Workflow](#bmad-stories-workflow)
4. [Setting Up Development](#setting-up-development)
5. [Making Changes](#making-changes)
6. [Testing](#testing)
7. [Code Standards](#code-standards)
8. [Git Workflow](#git-workflow)
9. [Pull Requests](#pull-requests)

---

## Development Philosophy

This project uses the **BMAD (Business Model for Agile Development)** framework:

- **Stories-First**: All development happens through documented stories
- **Acceptance Criteria**: Every story has clear, testable acceptance criteria
- **Documented**: Stories document the "why" and "what" before implementation
- **Tested**: Code changes include tests and validation
- **Tracked**: Git history maps directly to stories

### Core Rule

> **All code changes MUST be implemented through BMAD stories. Direct coding outside of stories is not permitted.**

---

## Project Structure

```
piskvorky/
├── src/                          # Application code
│   ├── index.html
│   ├── styles.css
│   ├── game.js
│   ├── win-detector.js
│   ├── obstacles.js
│   └── *.test.js                # Test files (colocated with source)
│
├── docs/
│   ├── prd/                      # Product documentation
│   │   └── epic-*.md             # Epic documents
│   └── stories/                  # Story documents
│       └── [number]-[title].md   # Individual stories
│
├── .github/
│   └── workflows/
│       └── deploy.yml            # GitHub Actions CI/CD
│
├── .bmad-core/
│   └── PROJECT_GUIDELINES.md    # BMAD configuration
│
└── [Config files]                # package.json, vite.config.js, etc.
```

### Story Numbering

Stories are numbered as: `[EPIC].[STORY]`

- `1.1`, `1.2`, `1.3` = Epic 1 stories
- `2.1`, `2.2`, `2.3` = Epic 2 stories

### File Naming

Story files follow the pattern:
```
docs/stories/[NUMBER]-[title-with-dashes].md
```

Example: `1.4-obstacles-mode.md`

---

## BMAD Stories Workflow

### Step 1: Create a Story Document

Create a new file in `docs/stories/` with the story template:

```markdown
# Story [NUMBER]: [Title]

## Story ID
[NUMBER]

## Title
[Descriptive title]

## Epic
[EPIC_NUMBER]

## Status
Draft

## Description
[Why are we doing this? What problem does it solve?]

## Functional Requirements Covered
- FR1: [Requirement]
- FR2: [Requirement]

## Acceptance Criteria
- AC[NUM].1: [Testable criterion]
- AC[NUM].2: [Testable criterion]
- AC[NUM].3: [Testable criterion]

## File List

### New Files
- List new files to create

### Modified Files
- List files to modify

## Test Plan
- [ ] Test 1
- [ ] Test 2

## Technical Notes
[Implementation details, code samples, design notes]

## Definition of Done
- [ ] All AC met
- [ ] Tests pass
- [ ] Build succeeds
- [ ] Documentation updated

## Comments
[Additional notes or decisions]
```

### Step 2: Implement the Story

1. **Create/modify files** according to the story's file list
2. **Write tests first** (TDD approach)
3. **Implement features** to pass tests and meet AC
4. **Verify**: All tests pass, build succeeds
5. **Update documentation**: Update README, other docs if needed

### Step 3: Validate and Mark Done

1. Run: `npm test` - all tests pass ✓
2. Run: `npm run build` - build succeeds ✓
3. Update story status: "Draft" → "In Progress" → "Completed"
4. Check all items in "Definition of Done" section
5. Document what was implemented in the story file

### Step 4: Commit and Push

Stories are committed to git as complete units:

```bash
git add docs/stories/[story-number]-[title].md
git add src/[modified-files].js
git commit -m "Story [NUMBER]: [Title]

- Feature description
- Tests added/updated
- Build: ✓
- Tests: ✓"
```

---

## Setting Up Development

### 1. Clone the Repository

```bash
git clone https://github.com/[username]/piskvorky
cd piskvorky
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Run Tests

```bash
npm test              # Run once
npm run test:watch   # Watch mode
npm run test:ui      # Visual dashboard
```

---

## Making Changes

### Creating a New Feature

1. **Plan the story** - Write story document first
2. **Design**: Decide architecture, modules, files needed
3. **Tests first**: Write tests for expected behavior
4. **Implement**: Write code to pass tests
5. **Refactor**: Clean up, optimize if needed
6. **Document**: Update README, story status, etc.

### Code Organization

- **Game logic**: `src/game.js`
- **Win detection**: `src/win-detector.js`
- **Obstacles**: `src/obstacles.js`
- **UI/DOM**: Integrated in `game.js` or separate module
- **Tests**: Colocated as `*.test.js` files

### Example: Adding a New Feature

1. Create story document: `docs/stories/3.1-new-feature.md`
2. Write tests in `src/new-feature.test.js`
3. Implement in `src/new-feature.js`
4. Update `src/game.js` if needed for integration
5. Run tests: `npm test` ✓
6. Build: `npm run build` ✓
7. Update story: mark as "Completed"
8. Commit: story + implementation

---

## Testing

### Test Framework

- **Framework**: Vitest
- **DOM**: happy-dom
- **Coverage**: Aim for >80% on new code

### Test Files Structure

```javascript
// src/my-feature.test.js
import { describe, it, expect } from 'vitest';
import { myFunction } from './my-feature.js';

describe('myFunction', () => {
  it('should do something specific', () => {
    const result = myFunction(input);
    expect(result).toBe(expected);
  });

  it('should handle edge case', () => {
    // Edge case test
  });
});
```

### Running Tests

```bash
npm test                    # Run all tests once
npm run test:watch         # Watch mode
npm run test:ui            # Visual dashboard
npm test -- src/game.test.js  # Specific file
```

### Test Coverage Goals

- **Unit tests**: Test individual functions in isolation
- **Integration tests**: Test features working together
- **Edge cases**: Off-by-one, empty arrays, null values, etc.

### Pre-commit Testing

Always verify before pushing:

```bash
npm test && npm run build
```

---

## Code Standards

### JavaScript Style

- **Style**: ES6+ modern JavaScript
- **Format**: 2-space indentation
- **Naming**: camelCase for variables/functions, PascalCase for classes
- **Comments**: JSDoc for public functions

### Example Code Style

```javascript
/**
 * Checks if a cell contains a winning pattern
 * @param {number} row - Cell row
 * @param {number} col - Cell column
 * @returns {boolean} True if winning pattern
 */
function isWinningCell(row, col) {
  return checkDirection(row, col, 'horizontal');
}
```

### CSS Standards

- **Grid-based**: Use CSS Grid for layout
- **Responsive**: Mobile-first approach
- **Variables**: Use CSS custom properties for colors/sizes
- **Comments**: Document complex selectors

### HTML Standards

- **Semantic**: Use semantic HTML elements
- **Accessibility**: Include aria labels where needed
- **Structure**: Keep HTML simple and clean

---

## Git Workflow

### Branch Strategy

- **Main branch**: Always contains deployable code
- **Feature branches**: Not used (stories committed directly to main)

### Commit Messages

Format:
```
Story [NUMBER]: [Title]

- Detailed description of changes
- Implementation notes
- Test status: ✓
- Build status: ✓
```

### Example Commit

```bash
git commit -m "Story 1.4: Obstacles Mode

- Added random obstacle generation (15 mines per game)
- Implemented obstacle blocking in makeMove()
- Added checkbox to toggle obstacles mode
- 25 new unit tests for obstacle utilities
- All 103 tests pass
- Build: ✓"
```

### Making a Pull Request

1. Create a feature branch: `git checkout -b story/1.4-obstacles`
2. Implement the story
3. Push: `git push origin story/1.4-obstacles`
4. Create PR on GitHub with story link
5. Include test results and build status
6. Get review and merge to main
7. Automatic deployment to GitHub Pages

---

## Pull Requests

### PR Template

```markdown
## Story
Story [NUMBER]: [Title]

## Summary
[2-3 sentences describing changes]

## Changes
- [ ] Feature 1 implemented
- [ ] Feature 2 implemented
- [ ] Tests written
- [ ] Documentation updated

## Test Results
- All tests pass: ✓ (103/103)
- Build succeeds: ✓
- Responsive design: ✓ (360-1440px)

## Related Files
- `docs/stories/[number].md`
- `src/[modified].js`
- `README.md` (if needed)
```

### PR Review Checklist

Reviewers should verify:
- [ ] Story document is complete and accurate
- [ ] Acceptance criteria are met
- [ ] Tests are passing (103+)
- [ ] Build succeeds
- [ ] Code follows project standards
- [ ] Documentation is updated
- [ ] No breaking changes

---

## FAQ

**Q: Can I commit code outside of stories?**
A: No - all code changes must be part of a documented story.

**Q: How do I get started?**
A: Read a completed story (e.g., `docs/stories/1.1-*.md`) to understand the format.

**Q: What if my change is small?**
A: Create a small story document - it documents the change even if it's minor.

**Q: How do I report bugs?**
A: Create a story describing the bug, expected behavior, and fix.

**Q: Can I suggest new features?**
A: Create a story document with the feature idea and requirements.

**Q: How long does it take to review?**
A: PRs are reviewed within 2-3 days on average.

---

## Questions or Help?

- Check existing story documents for examples
- Review test files for testing patterns
- Read [README.md](../README.md) for architecture overview
- Check [DEPLOYMENT_GUIDE.md](../DEPLOYMENT_GUIDE.md) for deployment info

---

**Last Updated**: 2025-10-31
**Framework**: BMAD (Business Model for Agile Development)
**Status**: Production Ready

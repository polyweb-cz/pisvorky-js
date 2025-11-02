# Project Guidelines - Piškvorky

## ⚠️ CRITICAL: BMAD Stories-Only Development

**This project MUST be developed exclusively through BMAD Stories mode.**

### Rule
- ❌ DO NOT make direct code changes outside of stories
- ✅ DO create new stories for all features/improvements
- ✅ DO use `/BMad:tasks:create-next-story` command
- ✅ DO implement changes within story documents

### Why?
- Maintains audit trail and documentation
- Proper acceptance criteria tracking
- Clean git history with story references
- Better planning and organization

## 🔐 Git Configuration

**⚠️ IMPORTANT: Git commits are blocked by settings.local.json**

### Configuration Details
```json
{
  "permissions": {
    "deny": ["Bash(git commit:*)"]
  }
}
```

- All `git commit` commands from CLI/Bash are **DENIED**
- Commits must be managed through IDE or proper authorization channels
- This prevents accidental commits outside of BMAD stories workflow
- Claude Code cannot commit directly

### What IS Allowed:
- `git add:*` (with ask permission)
- `npm test` - verify all tests pass before committing
- Story documentation updates

**DO NOT:**
- Try to commit from terminal/bash (it's blocked!)
- Try to bypass the deny rule
- Try to push without proper review process

## Current Status
- **Epic 1 (MVP)**: COMPLETE (5/5 stories done)
  - Story 1.1: ✓ Grid & Turn Alternation
  - Story 1.2: ✓ Win Detection & Draw
  - Story 1.3: ✓ Reset & Color Indicator
  - Story 1.4: ✓ Obstacles Mode
  - Story 1.5: ✓ UI Improvements (Centering & Cookies)
- **Active Development Mode**: BMAD Stories Only
- **Next Action**: Create Epic 2 or new features via stories

### Recent Incident (Corrected)
- ❌ Attempted direct implementation of UI improvements (Story 1.5)
- ✅ Corrected: Properly created Story 1.5 through BMAD process
- ✅ All code changes tracked in story documentation
- 📝 Git commit hook prevents direct terminal commits

---

Last Updated: 2025-10-31
Maintained By: Claude Code + BMAD Framework

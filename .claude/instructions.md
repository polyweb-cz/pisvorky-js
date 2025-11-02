# Claude Code Project Instructions

## 🔐 Permissions & Restrictions

### For `piskvorky` Project

**GIT RESTRICTIONS:**
- ❌ CANNOT `git commit` - blocked in settings.local.json
- ❌ CANNOT `git push` - blocked in settings.local.json
- ✅ CAN `git add` - stage changes for user to commit

**DEVELOPMENT WORKFLOW:**
- ❌ DO NOT make direct code changes outside of stories
- ✅ DO create new stories for ALL features/improvements
- ✅ DO implement changes WITHIN story documents
- ✅ DO use `/BMad:tasks:create-next-story` command
- ✅ DO stage changes with `git add` (user commits/pushes)

### Why This Approach?

1. **Audit Trail**: All changes tracked in story documentation
2. **Acceptance Criteria**: Proper testing and validation
3. **Clean Git History**: Story references in commits
4. **Organization**: BMAD framework discipline
5. **User Control**: Human reviews and approves commits

---

## 📋 Workflow for Changes

### ✅ CORRECT: Using Stories

1. Create story document (or ask user to create)
2. Implement changes according to story acceptance criteria
3. Stage with `git add`
4. User commits and pushes

### ❌ INCORRECT: Direct Changes

- ❌ Directly editing code files without story context
- ❌ Committing/pushing automatically
- ❌ Making UI/design changes outside of stories
- ❌ Bug fixes without story documentation

---

## 🛠️ Allowed Commands

**Always OK:**
- Read files
- Run tests (`npm test`)
- Check git status/logs
- Build (`npm run build`)
- Stage changes (`git add`)

**Only With Story Context:**
- Edit code files (src/, styles, etc.)
- Create new features
- Refactor existing code

**NEVER:**
- `git commit` (blocked)
- `git push` (blocked)
- Direct code changes without story

---

## 🎯 Remember

**On startup, always check:**
1. Is there an active story?
2. Does the change belong in a story?
3. Are acceptance criteria defined?
4. Is user reviewing the changes?

**When done with story:**
1. Stage with `git add`
2. Inform user
3. Let user commit/push

---

**Last Updated**: 2025-11-02
**Project**: Piškvorky (piskvorky)
**Framework**: BMAD Method

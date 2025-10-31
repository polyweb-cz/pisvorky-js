# Deployment Guide - Piškvorky 15×15

This guide explains how to deploy Piškvorky to GitHub Pages and optionally configure a custom domain.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Automatic Deployment (GitHub Pages)](#automatic-deployment-github-pages)
3. [Custom Domain Setup](#custom-domain-setup)
4. [Troubleshooting](#troubleshooting)
5. [Manual Deployment](#manual-deployment-advanced)

---

## Prerequisites

- GitHub account
- Repository with Piškvorky code
- Git configured locally
- Node.js 18+ and npm installed

## Automatic Deployment (GitHub Pages)

### Step 1: Repository Setup

GitHub Pages deployment is **already configured** in this repository. No additional setup is needed!

The workflow is defined in `.github/workflows/deploy.yml` and automatically:
1. Runs on every push to `main` or `master` branch
2. Executes `npm install` and `npm test`
3. Builds the project with `npm run build`
4. Deploys the `dist/` folder to GitHub Pages

### Step 2: Verify GitHub Pages Settings

1. Go to your repository on GitHub
2. Navigate to **Settings → Pages**
3. Confirm:
   - **Source**: "GitHub Actions" is selected
   - **Branch**: Points to your main branch
   - **Custom domain**: Leave empty (unless you have one)

### Step 3: Deploy

Simply push to the main branch:

```bash
git add .
git commit -m "Deploy feature: Story 2.2"
git push origin main
```

### Step 4: Verify Deployment

1. Go to repository **Actions** tab
2. Watch for the workflow to complete (green checkmark = success)
3. Access your live game at:
   ```
   https://[your-username].github.io/piskvorky/
   ```

### Build Validation

The deployment **will fail** if:
- Tests fail: `npm test` returns non-zero exit code
- Build fails: `npm run build` encounters errors
- Assets are invalid

This is intentional - it ensures only working code is deployed.

---

## Custom Domain Setup

If you own a domain and want to use it instead of `github.io`:

### Option A: Using GitHub's Domain Management (Recommended)

1. **Buy a domain** from a registrar (Namecheap, GoDaddy, etc.)

2. **Add domain to GitHub Pages**:
   - Go to **Settings → Pages**
   - Enter your custom domain (e.g., `piskvorky.example.com`)
   - Click "Save"

3. **GitHub creates a DNS check file** - wait for verification (can take a few minutes)

4. **Configure DNS** at your registrar:
   - For subdomain (e.g., `piskvorky.example.com`):
     ```
     Type: CNAME
     Name: piskvorky
     Value: [your-username].github.io
     ```

   - For apex domain (e.g., `example.com`):
     ```
     Type: A
     Name: @
     Values: (GitHub will provide 4 IP addresses in Settings → Pages)
     ```

5. **Verify** - GitHub will notify you when DNS is configured correctly

6. **Update Vite config** (optional, for development):
   ```javascript
   // vite.config.js
   export default {
     base: '/',  // Change from '/piskvorky/' to '/' for custom domain
     // ... rest of config
   }
   ```

### Option B: Using Cloudflare (Alternative)

1. Add your domain to Cloudflare
2. Point nameservers to Cloudflare
3. Create DNS record:
   - Type: CNAME
   - Name: piskvorky (or @ for apex)
   - Content: [your-username].github.io
4. Enable HTTPS (Cloudflare handles this)

---

## Troubleshooting

### Game doesn't load on GitHub Pages URL

**Problem**: Assets return 404 errors

**Solution**:
1. Check that `base: '/piskvorky/'` is set in `vite.config.js`
2. Verify assets are in `dist/` folder:
   ```bash
   npm run build
   ls -la dist/
   ```
3. Check Network tab (F12) - assets should load from `/piskvorky/assets/`

### Workflow fails in Actions

**Problem**: GitHub Actions workflow shows red X

**Solutions**:
1. **Tests failing**: Run locally to debug:
   ```bash
   npm test
   ```

2. **Build failing**: Build locally:
   ```bash
   npm run build
   ```

3. **Check workflow logs**:
   - Go to **Actions** tab
   - Click the failed workflow
   - Expand "Build and Deploy" to see error logs

### Custom domain not working

**Problem**: Domain shows 404 or doesn't point to GitHub Pages

**Solutions**:
1. **Check DNS propagation**:
   - Use [MXToolbox](https://mxtoolbox.com/dnscheck.aspx) or similar
   - DNS changes take up to 24 hours to propagate

2. **Verify GitHub settings**:
   - Go to **Settings → Pages**
   - Domain shows with green checkmark (verified)
   - No 404 error message

3. **Clear browser cache**:
   ```bash
   # Hard refresh in browser
   Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)
   ```

4. **Check DNS records**:
   - For CNAME: Should point to `[username].github.io`
   - For A: Should have GitHub's IP addresses

### Deployment doesn't start after push

**Problem**: GitHub Actions workflow doesn't run

**Solutions**:
1. Check branch name - workflow only runs on `main` or `master`
2. Verify workflow file exists: `.github/workflows/deploy.yml`
3. Check file has no syntax errors (YAML format)
4. Wait a few seconds - sometimes GitHub takes time to trigger

---

## Manual Deployment (Advanced)

If automatic deployment doesn't work, you can manually build and push:

```bash
# Build the project
npm run build

# The dist/ folder now contains production-ready files

# You can serve this folder with any web server:
# - GitHub Pages (recommended, already configured)
# - Netlify: drag-and-drop dist/ folder
# - Vercel: connect repository
# - AWS S3: upload dist/ folder
# - Any static host
```

---

## Pre-Deployment Checklist

Before pushing to main (deploying):

- [ ] All tests pass: `npm test`
- [ ] Production build succeeds: `npm run build`
- [ ] No uncommitted changes: `git status`
- [ ] Code review completed
- [ ] Documentation updated
- [ ] Features are tested locally

### Quick Validation Script

```bash
# Run this before pushing
npm test && npm run build && git status
```

If all three pass without errors, you're ready to deploy!

---

## Monitoring Deployments

### View Deployment History

1. Go to repository **Actions** tab
2. Click "Deployments" (left sidebar)
3. See all deployment attempts with timestamps

### View Live Site Analytics

GitHub Pages provides basic analytics:
1. Go to **Settings → Pages**
2. Look for traffic information (if available)

### Check Site Status

Monitor that your site is up:
- Visit the live URL in a browser
- Play a quick game
- Check Network tab (F12) for asset loading

---

## FAQ

**Q: How often does deployment happen?**
A: Every time you push to the main branch. Typical time: 1-2 minutes.

**Q: Can I deploy from a different branch?**
A: Yes, edit `.github/workflows/deploy.yml` and add your branch to the `on.push.branches` list.

**Q: What if tests fail?**
A: The deployment is automatically skipped. Fix the failing tests and push again.

**Q: Can I rollback a deployment?**
A: Yes, either:
- Revert the commit: `git revert [commit-hash]` and push
- Push an older version to main

**Q: Does deployment cost money?**
A: No, GitHub Pages is free with unlimited bandwidth.

**Q: How long is the game available?**
A: As long as your GitHub repository exists and is public.

---

## Support

If you encounter issues:

1. Check this guide's **Troubleshooting** section
2. Review GitHub Actions workflow logs
3. Check [GitHub Pages documentation](https://docs.github.com/en/pages)
4. Visit [Vite deployment guide](https://vitejs.dev/guide/static-deploy.html)

---

**Last Updated**: 2025-10-31
**Status**: Production Ready

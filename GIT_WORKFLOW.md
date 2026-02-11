# 📋 Git Workflow & Project Rules - HERA

## 🌳 Branch Structure

### Current Setup:
- **`main`** - Production branch (backend + frontend)
- **`develop`** - Development integration (recommended)
- **`feature/*`** - Feature development branches
- **`hotfix/*`** - Emergency bug fixes

## 📤 Git Push Rules

### ❌ JANGAN LAKUKAN:
```bash
git push origin main --force    # Dangerous!
git commit -m "fix"             # Bad commit message
git add . && git push           # No review
```

### ✅ WORKFLOW YANG BENAR:

#### 1. Feature Development:
```bash
# Update main
git checkout main
git pull origin main

# Buat feature branch
git checkout -b feature/landing-page-update

# Develop & commit dengan message yang jelas
git add .
git commit -m "feat(frontend): update landing page with new design"

# Push feature branch
git push origin feature/landing-page-update

# Buat Pull Request di GitHub untuk review
```

#### 2. Bug Fix:
```bash
git checkout -b hotfix/jsx-error-fix
git add .
git commit -m "fix(frontend): escape JSX character in HomePage"
git push origin hotfix/jsx-error-fix
# Create PR
```

## 📝 Commit Message Convention

### Format:
```
<type>(<scope>): <description>

[optional body]
```

### Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting, missing semicolons, etc
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance

### Examples:
```bash
git commit -m "feat(backend): add user authentication"
git commit -m "fix(frontend): resolve login form validation"
git commit -m "docs: update installation guide"
git commit -m "chore: update dependencies"
```

## 🔄 Team Collaboration

### Daily Workflow:
```bash
# 1. Morning sync
git checkout main
git pull origin main

# 2. Create feature branch
git checkout -b feature/my-feature

# 3. Work & commit regularly
git add .
git commit -m "feat: add new component"

# 4. Push & create PR
git push origin feature/my-feature
# Create Pull Request di GitHub

# 5. After PR merged
git checkout main
git pull origin main
git branch -d feature/my-feature
```

## 🚨 Emergency Procedures

### Rollback Last Commit:
```bash
git reset --soft HEAD~1  # Keep changes
git reset --hard HEAD~1  # Discard changes
```

### Revert Specific Commit:
```bash
git log --oneline
git revert <commit-hash>
```

## 📋 Pre-Push Checklist

- [ ] Code tested locally
- [ ] No console errors
- [ ] Build successful
- [ ] Commit message follows convention
- [ ] No sensitive data committed

## 🔐 Security Rules

### Never Commit:
- `.env` files
- Database passwords
- API keys
- Personal information

### Always Commit:
- `.env.example` files
- Documentation updates
- Test files
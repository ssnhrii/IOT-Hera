# 📋 Git Workflow & Project Rules - HERA

# 📋 Git Workflow & Project Rules - HERA

## 🌳 Branch Structure

### Current Setup:
- **`main`** - Documentation only (README.md, guides, etc.)
- **`backend`** - Backend development (Node.js, Express, MySQL)
- **`frontend`** - Frontend development (React, Vite, Tailwind)
- **`feature/*`** - Feature development branches (branch from backend/frontend)
- **`hotfix/*`** - Emergency bug fixes

### Branch Purpose:
- **Main Branch**: Contains only project documentation and guides
- **Backend Branch**: All backend code, can be developed independently
- **Frontend Branch**: All frontend code, can be developed independently
- **Feature Branches**: Created from backend or frontend branch for specific features

## 📤 Git Push Rules

### ❌ JANGAN LAKUKAN:
```bash
git push origin main --force    # Dangerous!
git commit -m "fix"             # Bad commit message
git add . && git push           # No review
```

### ✅ WORKFLOW YANG BENAR:

#### 1. Backend Development:
```bash
# Switch to backend branch
git checkout backend
git pull origin backend

# Create feature branch from backend
git checkout -b feature/auth-system

# Develop & commit
git add .
git commit -m "feat(backend): add JWT authentication system"

# Push feature branch
git push origin feature/auth-system

# Create Pull Request to merge into backend branch
```

#### 2. Frontend Development:
```bash
# Switch to frontend branch
git checkout frontend
git pull origin frontend

# Create feature branch from frontend
git checkout -b feature/dashboard-ui

# Develop & commit
git add .
git commit -m "feat(frontend): add dashboard components"

# Push feature branch
git push origin feature/dashboard-ui

# Create Pull Request to merge into frontend branch
```

#### 3. Documentation Updates:
```bash
# Switch to main branch
git checkout main
git pull origin main

# Update documentation
git add .
git commit -m "docs: update installation guide"
git push origin main
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

### Daily Workflow for Backend Developer:
```bash
# 1. Morning sync
git checkout backend
git pull origin backend

# 2. Create feature branch
git checkout -b feature/my-backend-feature

# 3. Work & commit regularly
git add .
git commit -m "feat(backend): add new API endpoint"

# 4. Push & create PR to backend branch
git push origin feature/my-backend-feature
# Create Pull Request to merge into backend branch

# 5. After PR merged
git checkout backend
git pull origin backend
git branch -d feature/my-backend-feature
```

### Daily Workflow for Frontend Developer:
```bash
# 1. Morning sync
git checkout frontend
git pull origin frontend

# 2. Create feature branch
git checkout -b feature/my-frontend-feature

# 3. Work & commit regularly
git add .
git commit -m "feat(frontend): add new component"

# 4. Push & create PR to frontend branch
git push origin feature/my-frontend-feature
# Create Pull Request to merge into frontend branch

# 5. After PR merged
git checkout frontend
git pull origin frontend
git branch -d feature/my-frontend-feature
```

### Working on Both Backend & Frontend:
```bash
# For backend changes
git checkout backend
git checkout -b feature/api-integration
# ... make backend changes ...
git push origin feature/api-integration

# For frontend changes
git checkout frontend
git checkout -b feature/ui-integration
# ... make frontend changes ...
git push origin feature/ui-integration
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
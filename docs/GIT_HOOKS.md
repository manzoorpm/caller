# Git Hooks Documentation

This project uses [Husky](https://typicode.github.io/husky/) and [lint-staged](https://github.com/okonet/lint-staged) to enforce code quality standards before commits.

## Configured Hooks

### Pre-commit Hook

**Location:** `.husky/pre-commit`

**What it does:**

- Automatically runs on `git commit`
- Executes `lint-staged` which:
  - Runs ESLint with `--fix` on staged `.js`, `.jsx`, `.ts`, `.tsx` files
  - Runs Prettier on staged files to ensure consistent formatting
  - Applies changes automatically

**Files affected:**

- JavaScript/TypeScript files: `*.{js,jsx,ts,tsx}`
- Configuration files: `*.{json,md,yml,yaml}`

**Example workflow:**

```bash
# 1. Make changes to a file
echo "const foo={bar:1}" > example.ts

# 2. Stage the file
git add example.ts

# 3. Commit (hook runs automatically)
git commit -m "feat: add example"

# Husky runs lint-staged:
# ✓ Runs ESLint --fix
# ✓ Formats with Prettier
# ✓ Stages the formatted changes
# ✓ Commits
```

### Commit Message Hook

**Location:** `.husky/commit-msg`

**What it does:**

- Validates commit messages follow [Conventional Commits](https://www.conventionalcommits.org/) format
- Rejects commits with invalid format
- Allows merge commits to pass through

**Format:**

```
<type>[optional scope]: <description>

[optional body]

[optional footer]
```

**Valid types:**

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that don't affect code meaning (white-space, formatting)
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `perf`: Code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to build process or auxiliary tools
- `build`: Changes that affect the build system or dependencies
- `ci`: Changes to CI configuration files and scripts
- `revert`: Reverts a previous commit

**Valid examples:**

```bash
git commit -m "feat: add user authentication"
git commit -m "fix(api): handle null response in getUserData"
git commit -m "docs: update installation instructions"
git commit -m "refactor: simplify error handling logic"
git commit -m "perf(search): improve query performance"
```

**Invalid examples:**

```bash
git commit -m "added stuff"           # ❌ No type
git commit -m "feature: new login"    # ❌ Invalid type (use 'feat')
git commit -m "fix:"                  # ❌ No description
git commit -m "Fix bug"               # ❌ Type must be lowercase
```

## Bypassing Hooks

**⚠️ Not recommended for production code**

If you absolutely need to bypass hooks (e.g., emergency hotfix):

```bash
# Skip all hooks
git commit --no-verify -m "emergency fix"

# Or use the shorthand
git commit -n -m "emergency fix"
```

## Configuration

### lint-staged Configuration

Located in `package.json`:

```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{json,md,yml,yaml}": ["prettier --write"]
  }
}
```

### Modifying Hooks

To modify the pre-commit hook:

```bash
# Edit the hook file
vim .husky/pre-commit

# The file should contain:
npx lint-staged
```

To modify lint-staged configuration:

```bash
# Edit package.json and update the "lint-staged" section
```

## Troubleshooting

### Hook not running

If hooks aren't running automatically:

```bash
# Reinstall Husky hooks
npm run prepare

# Make hooks executable
chmod +x .husky/pre-commit
chmod +x .husky/commit-msg
```

### ESLint or Prettier errors

If you encounter linting errors during commit:

```bash
# Fix issues manually
npm run lint:fix
npm run format

# Stage the fixes
git add .

# Try committing again
git commit -m "fix: resolve linting issues"
```

### Hook fails but you want to commit anyway

Only use this for valid reasons (e.g., work in progress on a feature branch):

```bash
git commit --no-verify -m "wip: work in progress"
```

## Best Practices

1. **Let the hooks fix formatting**: Don't manually format code; let Prettier handle it
2. **Write meaningful commit messages**: Follow Conventional Commits format
3. **Don't bypass hooks in main branch**: Only bypass in feature branches if absolutely necessary
4. **Fix lint errors**: Don't commit code with linting errors
5. **Stage incrementally**: Stage related changes together for better commit messages

## Integration with CI/CD

The GitHub Actions workflow also runs these checks:

```yaml
# .github/workflows/ci.yml
- name: Run ESLint
  run: npm run lint

- name: Check Prettier formatting
  run: npm run format:check
```

This ensures that even if hooks are bypassed, the CI will catch issues.

## Resources

- [Husky Documentation](https://typicode.github.io/husky/)
- [lint-staged Documentation](https://github.com/okonet/lint-staged)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)

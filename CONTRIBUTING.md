# Contributing to DRESSING

Thank you for your interest in contributing to DRESSING! This document provides guidelines and instructions for contributing.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for everyone.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce**
- **Expected vs actual behavior**
- **Screenshots** (if applicable)
- **Environment details** (OS, Node version, etc.)
- **Sample JSON files** (if relevant)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- **Clear title and description**
- **Use case** - Why is this enhancement needed?
- **Proposed solution**
- **Alternative solutions** considered
- **Mockups or examples** (if applicable)

### Pull Requests

1. **Fork the repository** and create your branch from `main`
2. **Make your changes** following our coding standards
3. **Add tests** for new functionality
4. **Update documentation** as needed
5. **Ensure tests pass** (`npm test`)
6. **Run linting** (`npm run lint:fix`)
7. **Format code** (`npm run format`)
8. **Submit your pull request**

## Development Setup

### Prerequisites

- Node.js >= 18.0.0
- npm or yarn

### Setup Steps

```bash
# Clone your fork
git clone https://github.com/your-username/dressing.git
cd dressing

# Install dependencies
npm install

# Build the project
npm run build

# Run tests
npm test

# Run linting
npm run lint

# Run in watch mode (development)
npm run build:watch
```

### Project Structure

```
dressing/
├── src/
│   ├── types.ts              # Type definitions
│   ├── utils.ts              # Utility functions
│   ├── parser.ts             # JSON parser
│   ├── statistics.ts         # Statistics calculator
│   ├── template-generator.ts # HTML generator
│   ├── reporter.ts           # Main reporter
│   ├── cli.ts                # CLI interface
│   ├── index.ts              # Main exports
│   └── templates/            # HTML/CSS/JS templates
├── examples/                 # Example files
├── dist/                     # Compiled output
└── tests/                    # Test files
```

## Coding Standards

### TypeScript

- Use TypeScript strict mode
- Provide type definitions for all functions
- Avoid using `any` when possible
- Use interfaces over type aliases for objects

### Code Style

- 2 spaces for indentation
- Single quotes for strings
- Semicolons required
- 100 character line length
- Use meaningful variable names

### Commit Messages

DRESSING uses [Conventional Commits](https://www.conventionalcommits.org/) specification for clear and semantic commit history.

#### Format

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

#### Components

**Type** (required):

- `feat`: New feature for the user
- `fix`: Bug fix
- `docs`: Documentation only changes
- `style`: Changes that don't affect code meaning (formatting, whitespace, etc.)
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `perf`: Performance improvement
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to build process or auxiliary tools
- `ci`: Changes to CI configuration files and scripts

**Scope** (optional):

- `cli`: Command-line interface
- `parser`: JSON parsing
- `reporter`: Report generation
- `template`: HTML/CSS/JS templates
- `stats`: Statistics calculation
- `utils`: Utility functions
- `types`: TypeScript types

**Description** (required):

- Use imperative, present tense: "add" not "added" or "adds"
- Don't capitalize first letter
- No period (.) at the end
- Keep under 72 characters

**Body** (optional):

- Explain what and why vs. how
- Wrap at 72 characters
- Separate from subject with blank line

**Footer** (optional):

- Reference issues: `Closes #123`, `Fixes #456`
- Breaking changes: `BREAKING CHANGE: description`

#### Examples

**Feature with scope:**

```
feat(cli): add --colors option for custom theme colors

Allow users to override default color scheme through CLI options.
Supports all major color formats (hex, rgb, named colors).

Closes #45
```

**Bug fix:**

```
fix(parser): handle malformed JSON gracefully

Previously the parser would crash on invalid JSON. Now it throws
a descriptive error message and suggests checking the file format.

Fixes #67
```

**Documentation update:**

```
docs(readme): update installation instructions

Add npm and yarn installation examples.
Clarify Node.js version requirements.
```

**Breaking change:**

```
feat(api): rename generate() options parameter

BREAKING CHANGE: The generateReport() function has been renamed to
generate() and now requires a single options object instead of
multiple parameters.

Migration:
- Before: generateReport(jsonFile, output, options)
- After: generate({ jsonFile, output, ...options })
```

**Multiple types:**

```
feat(reporter): add dark theme support
test(reporter): add theme switching tests
docs(readme): document theme options
```

**Simple changes:**

```
chore: update dependencies
style: fix indentation in template-generator
test: increase coverage for utils.ts
```

#### Tips

- Keep commits atomic (one logical change per commit)
- Write commits as if completing the sentence: "This commit will..."
- Use the body to explain complex changes
- Reference issues in footer when applicable
- Breaking changes should be clearly marked in footer

#### Checking Your Commit

Before committing, ask yourself:

1. ✅ Does the type match the change?
2. ✅ Is the description clear and concise?
3. ✅ Would a new contributor understand what this does?
4. ✅ Did I reference related issues?

**Note**: While we don't enforce this automatically yet, following these guidelines helps maintain a clean commit history and makes it easier to generate changelogs.

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Writing Tests

- Place tests in `__tests__` directories or use `.test.ts` suffix
- Use descriptive test names
- Follow AAA pattern (Arrange, Act, Assert)
- Mock external dependencies
- Aim for >70% coverage

Example:

```typescript
describe('StatisticsCalculator', () => {
  describe('calculateStatistics', () => {
    it('should calculate correct pass rate', () => {
      // Arrange
      const features = createTestFeatures()

      // Act
      const stats = StatisticsCalculator.calculateStatistics(features)

      // Assert
      expect(stats.passRate).toBe(75.5)
    })
  })
})
```

## Documentation

### Code Documentation

- Use JSDoc comments for public APIs
- Explain complex logic with inline comments
- Keep comments up-to-date with code changes

### README Updates

When adding new features:

1. Update the feature list
2. Add examples to the documentation
3. Update CLI options table if applicable

## Release Process

### Version Management

DRESSING follows [Semantic Versioning](https://semver.org/) (SemVer):

- **Patch** (0.1.0 → 0.1.1): Bug fixes, no API changes
- **Minor** (0.1.0 → 0.2.0): New features, backward compatible
- **Major** (0.1.0 → 1.0.0): Breaking changes, API changes

### Creating a Release

**IMPORTANT**: Never manually edit the version in `package.json`. Use npm's version command:

```bash
# Patch release - Bug fixes only
npm version patch

# Minor release - New features (backward compatible)
npm version minor

# Major release - Breaking changes
npm version major
```

### What Happens Automatically

When you run `npm version [patch|minor|major]`, the following lifecycle scripts execute:

1. **preversion**: Runs `npm run lint && npm test`
   - Ensures code quality
   - Prevents versioning if tests fail

2. **version bump**: Updates version in `package.json`
   - Example: `0.1.0` → `0.2.0`

3. **version**: Runs `npm run format && git add -A src`
   - Formats all code with Prettier
   - Stages formatted source files

4. **git commit**: Creates version commit
   - Commit message: `"0.2.0"`

5. **git tag**: Creates version tag
   - Tag name: `v0.2.0`

6. **postversion**: Runs `git push && git push --tags`
   - Pushes commit to remote
   - Pushes tag to GitHub

### Publishing to npm

After version bump:

```bash
# Publish to npm registry
npm publish
```

The `prepublishOnly` script automatically runs before publishing:

- `npm run lint` - Ensures code quality
- `npm run build` - Compiles TypeScript
- `npm test` - Runs all tests

### Complete Release Workflow

```bash
# 1. Ensure all changes are committed
git status  # Should be clean

# 2. Bump version (choose appropriate type)
npm version minor

# 3. Publish to npm (for maintainers only)
npm publish

# 4. Create GitHub release
# Go to GitHub → Releases → Draft a new release
# Use the created tag (e.g., v0.2.0)
# Add release notes from CHANGELOG.md
```

### When to Release

- After merging features/fixes to main branch
- When changes are tested and ready for users
- Following a sprint or milestone completion
- For critical bug fixes (patch release)

### Access Control

**Version bumps are restricted to code owners** via:

1. **CODEOWNERS file** - Requires maintainer approval for `package.json` changes
2. **Branch protection** - Prevents direct pushes to main branch
3. **npm permissions** - Only authorized maintainers can publish to npm

**Note**: Only maintainers with npm publish access can publish releases.

### For Contributors

If you're a contributor (not a maintainer):

1. **Fork the repository** on GitHub (click the "Fork" button)
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/your-username/dressing.git
   cd dressing
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Create a feature branch** from `main`:
   ```bash
   git checkout -b feature/my-new-feature
   ```
5. **Make your changes** and commit them following [commit message guidelines](#commit-messages)
6. **Run tests and linting** to ensure quality:
   ```bash
   npm test
   npm run lint:fix
   ```
7. **Push to your fork**:
   ```bash
   git push origin feature/my-new-feature
   ```
8. **Create a Pull Request** from your fork to the main repository
9. **A maintainer will review**, approve, and merge your changes
10. **A maintainer will handle** version bumping and publishing to npm

**Important**: Contributors cannot directly push to the main repository or bump versions. All changes must go through the Pull Request process.

## Questions?

Feel free to:

- Open an issue for questions
- Start a discussion on GitHub Discussions
- Reach out to maintainers

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to DRESSING! 🎉

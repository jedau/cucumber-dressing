# DRESSING Development Setup

## Initial Setup

After creating all the files, follow these steps to get the project ready:

### 1. Install Dependencies

```bash
npm install
```

This will install all the required dependencies including:

- TypeScript and type definitions
- Testing frameworks (Jest)
- Linting tools (ESLint, Prettier)
- Core dependencies (Handlebars, Chart.js, Commander, etc.)

### 2. Build the Project

```bash
npm run build
```

This compiles TypeScript to JavaScript in the `dist/` directory.

### 3. Run Tests

```bash
npm test
```

Or with coverage:

```bash
npm run test:coverage
```

### 4. Run Linting

```bash
npm run lint
```

Fix linting issues automatically:

```bash
npm run lint:fix
```

### 5. Format Code

```bash
npm run format
```

### 6. Try the Example

After building, you can run the example:

```bash
npm run example
```

This will generate sample reports in the `examples/output/` directory using the sample JSON data.

### 7. Test CLI

After building, test the CLI:

```bash
# Show help
node dist/cli.js --help

# Generate a report
node dist/cli.js generate -i examples/sample-report.json -o test-report.html --open
```

Or use the npm link for global testing:

```bash
npm link
dressing generate -i examples/sample-report.json -o test-report.html --open
```

## Development Workflow

### Watch Mode

For active development, use watch mode to automatically rebuild on changes:

```bash
npm run build:watch
```

In another terminal, you can run your tests or examples as you make changes.

### Testing Workflow

1. Write tests in `src/__tests__/` or alongside your code with `.test.ts` suffix
2. Run tests with `npm test`
3. Check coverage with `npm run test:coverage`
4. Aim for >70% coverage

### Before Committing

Always run these before committing:

```bash
npm run lint:fix
npm run format
npm run build
npm test
```

Or create a pre-commit hook:

```bash
# .git/hooks/pre-commit
#!/bin/sh
npm run lint && npm run build && npm test
```

## Publishing to NPM

### First Time Setup

1. Create an npm account at https://www.npmjs.com/
2. Login via CLI:

```bash
npm login
```

3. Update package.json with your details:
   - `author`: Your name or organization
   - `repository`: Your GitHub repository URL
   - `bugs`: Your GitHub issues URL
   - `homepage`: Your GitHub homepage URL

### Publishing

1. Update version in package.json (or use npm version):

```bash
npm version patch  # 1.0.0 -> 1.0.1
npm version minor  # 1.0.0 -> 1.1.0
npm version major  # 1.0.0 -> 2.0.0
```

2. The prepublishOnly script will automatically run tests and build

3. Publish:

```bash
npm publish
```

### Publishing Checklist

- [ ] All tests passing
- [ ] No linting errors
- [ ] README is up to date
- [ ] CHANGELOG is updated
- [ ] Version number is bumped
- [ ] Git is clean (all changes committed)
- [ ] Built successfully

## Directory Structure

```
dressing/
├── .github/
│   └── workflows/
│       └── ci.yml              # GitHub Actions CI/CD
├── examples/
│   ├── sample-report.json      # Sample test data
│   └── output/                 # Generated reports
├── src/
│   ├── __tests__/              # Test files
│   │   └── utils.test.ts
│   ├── templates/              # HTML/CSS/JS templates
│   │   ├── styles.css.template.ts
│   │   └── scripts.js.template.ts
│   ├── types.ts                # TypeScript type definitions
│   ├── utils.ts                # Utility functions
│   ├── parser.ts               # JSON parser
│   ├── statistics.ts           # Statistics calculator
│   ├── template-generator.ts   # HTML template generator
│   ├── reporter.ts             # Main reporter class
│   ├── cli.ts                  # CLI interface
│   ├── index.ts                # Main exports
│   └── example.ts              # Usage examples
├── dist/                       # Compiled JavaScript (generated)
├── coverage/                   # Test coverage (generated)
├── node_modules/               # Dependencies (generated)
├── .eslintrc.js                # ESLint configuration
├── .gitignore                  # Git ignore rules
├── .npmignore                  # NPM ignore rules
├── .prettierrc                 # Prettier configuration
├── CHANGELOG.md                # Version history
├── CONTRIBUTING.md             # Contribution guidelines
├── jest.config.js              # Jest configuration
├── LICENSE                     # MIT License
├── package.json                # NPM package configuration
├── QUICKSTART.md               # Quick start guide
├── README.md                   # Main documentation
├── SETUP.md                    # This file
└── tsconfig.json               # TypeScript configuration
```

## Common Issues

### Issue: Module not found

**Solution:** Make sure you've run `npm install`

### Issue: TypeScript errors

**Solution:** Ensure TypeScript is installed and run `npm run build`

### Issue: Tests failing

**Solution:** Check test output and fix the failing tests

### Issue: Can't run CLI

**Solution:** Make sure you've built the project first with `npm run build`

## Next Steps

1. ✅ Install dependencies
2. ✅ Build the project
3. ✅ Run tests
4. ✅ Try the example
5. ✅ Test the CLI
6. 📝 Update package.json with your details
7. 🚀 Start development or publish!

## Support

For issues during setup, please:

1. Check this guide thoroughly
2. Review error messages carefully
3. Check existing GitHub issues
4. Create a new issue with:
   - Node version (`node -v`)
   - NPM version (`npm -v`)
   - OS information
   - Full error output

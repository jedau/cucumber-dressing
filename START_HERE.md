# 🚀 Getting Started with DRESSING

Welcome! You've just created a complete, production-ready npm package for generating beautiful test reports from Cucumber JSON files.

## Quick Start (2 minutes)

### Option 1: Automated Setup (Recommended)

**Windows:**

```cmd
init.bat
```

**Mac/Linux:**

```bash
chmod +x init.sh
./init.sh
```

### Option 2: Manual Setup

```bash
# 1. Install dependencies
npm install

# 2. Build the project
npm run build

# 3. Run tests
npm test

# 4. Try the example
npm run example

# 5. Test the CLI
node dist/cli.js generate -i examples/sample-report.json -o test-report.html --open
```

## What You've Got

✅ **Complete npm package** ready to publish
✅ **CLI tool** with comprehensive options
✅ **Programmatic API** for Node.js integration
✅ **TypeScript support** with full type definitions
✅ **Beautiful HTML reports** with 3 themes
✅ **Interactive features** (search, filter, charts)
✅ **Comprehensive documentation** (5 markdown files)
✅ **Testing setup** with Jest
✅ **CI/CD pipeline** with GitHub Actions
✅ **Example data** to test with
✅ **MIT License** - ready for open source

## Project Structure

```
dressing/
├── src/                    # TypeScript source code
│   ├── cli.ts             # Command-line interface
│   ├── reporter.ts        # Main report generator
│   ├── parser.ts          # JSON parser
│   ├── statistics.ts      # Statistics calculator
│   ├── template-generator.ts  # HTML generator
│   ├── templates/         # HTML/CSS/JS templates
│   ├── types.ts           # TypeScript types
│   ├── utils.ts           # Utility functions
│   ├── index.ts           # Main exports
│   ├── example.ts         # Usage examples
│   └── __tests__/         # Test files
├── examples/              # Sample JSON files
├── dist/                  # Compiled JavaScript (after build)
├── docs/                  # Documentation files
│   ├── README.md          # Main documentation
│   ├── QUICKSTART.md      # Quick start guide
│   ├── SETUP.md           # Development setup
│   ├── COMMANDS.md        # Command reference
│   └── CONTRIBUTING.md    # Contribution guide
├── .github/workflows/     # GitHub Actions CI/CD
├── package.json           # NPM package config
├── tsconfig.json          # TypeScript config
├── jest.config.js         # Jest test config
└── LICENSE                # MIT License
```

## Essential Commands

```bash
# Development
npm run build              # Compile TypeScript
npm run build:watch        # Watch mode for development
npm test                   # Run tests
npm run test:watch         # Watch mode for tests
npm run test:coverage      # Run tests with coverage
npm run lint               # Check code style
npm run lint:fix           # Fix code style issues
npm run format             # Format code with Prettier

# Usage
npm run example            # Run example
node dist/cli.js --help    # CLI help

# Publishing (when ready)
npm version patch          # Bump version (1.0.0 -> 1.0.1)
npm publish                # Publish to npm
```

## Try It Out

1. **Generate a test report:**

   ```bash
   node dist/cli.js generate -i examples/sample-report.json -o my-report.html --open
   ```

2. **Use programmatically:**

   ```javascript
   const dressing = require('./dist/index')

   await dressing.generate({
     jsonFile: 'examples/sample-report.json',
     output: 'my-report.html',
     theme: 'dark',
     openReportInBrowser: true,
   })
   ```

## Before Publishing to NPM

1. **Update package.json:**
   - Replace `"author": "Your Name"` with your name
   - Update repository URLs to your GitHub
   - Review keywords

2. **Create GitHub repo:**

   ```bash
   git init
   git add .
   git commit -m "Initial commit: DRESSING v1.0.0"
   git remote add origin https://github.com/jedau/cucumber-dressing.git
   git push -u origin main
   ```

3. **Test everything:**

   ```bash
   npm run lint
   npm run build
   npm test
   ```

4. **Publish:**
   ```bash
   npm login
   npm publish
   ```

## Documentation Quick Links

- **[README.md](README.md)** - Full documentation, features, and examples
- **[QUICKSTART.md](QUICKSTART.md)** - 5-minute guide to get started
- **[SETUP.md](SETUP.md)** - Development setup and workflow
- **[COMMANDS.md](COMMANDS.md)** - Complete command reference
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - How to contribute
- **[CHANGELOG.md](CHANGELOG.md)** - Version history

## Features Highlight

### For Users:

- 🎨 Beautiful, modern UI with 3 themes
- 🔍 Search and filter functionality
- 📊 Interactive charts
- 📱 Responsive design
- ⚡ Fast report generation
- 🖼️ Screenshot support
- 🏷️ Tag support

### For Developers:

- 💪 TypeScript-first
- 📦 Modular architecture
- 🧪 Jest testing
- 🎯 ESLint + Prettier
- 🔄 CI/CD ready
- 📚 Comprehensive docs

## Support & Community

- **Issues:** Report bugs at [GitHub Issues](https://github.com/jedau/cucumber-dressing/issues)
- **Discussions:** Ask questions at [GitHub Discussions](https://github.com/yourusername/dressing/discussions)
- **Documentation:** Full docs in [README.md](README.md)

## What's Next?

1. ✅ **You're here!** - Project is set up
2. 📝 **Customize** - Update package.json with your details
3. 🧪 **Test** - Try the examples and CLI
4. 🚀 **Publish** - Share with the world
5. 🌟 **Star** - Give it a star on GitHub!

## License

This project is licensed under the MIT License - see [LICENSE](LICENSE) for details.

---

## Need Help?

1. Run the setup script: `./init.sh` or `init.bat`
2. Read [QUICKSTART.md](QUICKSTART.md) for a 5-minute guide
3. Check [SETUP.md](SETUP.md) for detailed setup instructions
4. Review [COMMANDS.md](COMMANDS.md) for all available commands

---

**Congratulations! You now have a production-ready npm package! 🎉**

Made with ❤️ for the automation testing community

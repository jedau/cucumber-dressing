# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-02-12

### Added

- Initial release of DRESSING
- Core report generation from Cucumber JSON files
- Three built-in themes: Modern, Classic, and Dark
- Interactive HTML reports with expandable features and scenarios
- Advanced search and filtering capabilities
- Status-based filtering (Passed, Failed, Skipped)
- Interactive charts using Chart.js for status distribution and pass rate visualization
- Comprehensive statistics display with pass rate calculations
- Support for Gherkin tags with visual tag display
- Duration tracking for features, scenarios, and steps
- Screenshot support (inline and linked)
- Data table rendering with proper formatting
- Doc string support
- Error message display for failed steps
- Metadata support (browser, platform, device, app)
- Custom data sections for execution info
- Custom color customization for branding (10+ presets in COLOR_GUIDE.md)
- CLI interface with comprehensive options (20+ flags)
- Programmatic API for Node.js integration
- TypeScript support with full type definitions and JSDoc comments
- Keyboard shortcuts for navigation
- Auto-expand failed tests for quick debugging
- Responsive design for mobile and tablet
- Print-friendly styles
- Screenshot management (inline or external)
- Multiple JSON file consolidation
- Extensive configuration options
- Dynamic version reading from package.json
- Comprehensive documentation (README, QUICKSTART, COMMANDS, COLOR_GUIDE, CONTRIBUTING)
- Four working examples (basic, metadata, dark theme, charts)
- GitHub issue templates (bug report, feature request)
- Pull request template with DRESSING-specific checklist
- CODEOWNERS file for repository access control
- Conventional Commits guidelines in documentation
- Version management workflow with npm lifecycle scripts
- MIT License
- Modern UI with clean, contemporary design and smooth animations
- Fast processing of large test suites
- Keyboard shortcuts and ARIA labels for accessibility
- Extensive theming and configuration options
- Works with any framework outputting Cucumber JSON
- CI/CD ready - Easy integration with GitHub Actions, Jenkins, etc.
- TypeScript-first design with comprehensive type definitions
- Well-documented API with JSDoc for all public functions
- ESLint and Prettier configuration
- Jest testing framework setup with ES module support (22 tests)
- Contributing guidelines with fork→PR workflow
- Cross-platform support with cross-env for Windows compatibility
- ES modules (NodeNext) with proper .js extensions
- Type-safe code with comprehensive TypeScript annotations
- Optimized package size (excludes test files, source maps, example.ts)
- Clean code architecture with functions under 100 lines
- Reduced cyclomatic complexity (under 15)
- Refactored template methods into focused, maintainable functions
- `disableLog` option to suppress console output
- Helper functions for better code organization
- Semantic versioning support with automated git tagging

## [Unreleased]

### Planned Features

- Additional themes
- Real-time report updates
- Test run comparison
- PDF export
- Integration with test management tools
- Trend analysis
- Screenshot comparison
- API test enhancements
- Custom plugins system
- Report templates
- Internationalization (i18n)
- Performance metrics
- Test flakiness detection
- Historical data tracking

---

For more details on each release, see the [GitHub Releases](https://github.com/jedau/dressing/releases) page.

# DRESSING 📊

**D**etailed **R**eport of **E**xecuted **S**cenarios, **S**teps and **IN**sights for **G**herkin

A comprehensive, modern test automation reporter specifically designed for Gherkin-based test results. DRESSING transforms your Cucumber JSON output into beautiful, interactive HTML reports with advanced filtering, search capabilities, and insightful visualizations.

[![npm version](https://img.shields.io/npm/v/dressing.svg)](https://www.npmjs.com/package/dressing)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

## ✨ Features

- 🎨 **Modern, Beautiful UI** - Three built-in themes (Modern, Classic, Dark)
- 📊 **Interactive Charts** - Visual representation of test results with Chart.js
- 🔍 **Advanced Filtering** - Search by feature names, scenarios, tags, or status
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- 🖼️ **Screenshot Support** - Inline or linked screenshots from failed tests
- 🏷️ **Tag Support** - Full support for Gherkin tags
- ⏱️ **Duration Tracking** - Display execution times for features, scenarios, and steps
- 📋 **Data Tables** - Beautiful rendering of Gherkin data tables
- 🎯 **Failed Test Focus** - Automatically expands failed tests for quick debugging
- ⚡ **Fast & Lightweight** - Efficient processing of large test suites
- 🔧 **Highly Customizable** - Extensive configuration options
- 📦 **Zero Config** - Works out of the box with sensible defaults
- 🎹 **Keyboard Shortcuts** - Quick navigation and control
- 🌐 **Multi-Browser Support** - Metadata support for cross-browser testing
- 📝 **Custom Metadata** - Add your own custom data to reports

## 📦 Installation

```bash
npm install dressing --save-dev
```

Or with yarn:

```bash
yarn add dressing --dev
```

## 🚀 Quick Start

### CLI Usage

Generate a report from a single JSON file:

```bash
npx dressing generate -i cucumber-report.json -o report.html
```

Generate a report from a directory:

```bash
npx dressing generate -d ./test-results -o report.html --open
```

### Programmatic Usage

```javascript
const dressing = require('dressing')

await dressing.generate({
  jsonDir: './test-results',
  output: './report.html',
  reportTitle: 'My Test Report',
  theme: 'modern',
  openReportInBrowser: true,
})
```

### With TypeScript

```typescript
import { generate } from 'dressing'

await generate({
  jsonDir: './test-results',
  output: './report.html',
  reportTitle: 'My Test Report',
  theme: 'modern',
  metadata: {
    browser: {
      name: 'chrome',
      version: '120',
    },
    platform: {
      name: 'windows',
      version: '11',
    },
  },
})
```

## 📖 Documentation

### CLI Options

| Option                     | Alias | Description                        | Default                 |
| -------------------------- | ----- | ---------------------------------- | ----------------------- |
| `--input <path>`           | `-i`  | Input JSON file path               | -                       |
| `--dir <path>`             | `-d`  | Input directory with JSON files    | -                       |
| `--output <path>`          | `-o`  | Output HTML file path              | `test-report.html`      |
| `--title <title>`          | `-t`  | Report title                       | `DRESSING Test Report`  |
| `--name <name>`            | `-n`  | Report name                        | `Test Execution Report` |
| `--theme <theme>`          | -     | Theme: modern, classic, dark       | `modern`                |
| `--brand <brand>`          | -     | Brand title                        | `DRESSING`              |
| `--no-duration`            | -     | Hide duration information          | -                       |
| `--duration-in-ms`         | -     | Durations in milliseconds          | -                       |
| `--open`                   | -     | Open report in browser             | `false`                 |
| `--no-inline-screenshots`  | -     | Use relative paths for screenshots | -                       |
| `--screenshots-dir <path>` | -     | Screenshots directory              | -                       |
| `--column-layout <number>` | -     | Column layout (1 or 2)             | `2`                     |
| `--scenario-timestamp`     | -     | Display scenario timestamps        | `false`                 |
| `--disable-log`            | -     | Disable console logging            | `false`                 |
| `--metadata <json>`        | -     | Metadata as JSON string            | -                       |
| `--custom-data <json>`     | -     | Custom data as JSON string         | -                       |
| `--colors <json>`          | -     | Custom colors as JSON string       | -                       |

### Programmatic API

```typescript
interface ReportOptions {
  jsonDir?: string // Directory with JSON files
  jsonFile?: string // Single JSON file
  output: string // Output HTML path (required)
  reportTitle?: string // Report page title
  reportName?: string // Report heading name
  theme?: 'modern' | 'classic' | 'dark' // UI theme
  brandTitle?: string // Brand/project name
  displayDuration?: boolean // Show durations (default: true)
  durationInMS?: boolean // Durations in ms (default: false)
  openReportInBrowser?: boolean // Auto-open in browser
  screenshotsDirectory?: string // Screenshots location
  noInlineScreenshots?: boolean // Use links instead of inline
  columnLayout?: 1 | 2 // Layout columns
  scenarioTimestamp?: boolean // Show timestamps
  disableLog?: boolean // Suppress console output
  customStyle?: string // Custom CSS file path

  colors?: {
    // Custom color scheme
    primary?: string
    success?: string
    danger?: string
    warning?: string
    info?: string
    muted?: string
    background?: string
    backgroundSecondary?: string
    border?: string
    text?: string
    textSecondary?: string
  }

  metadata?: {
    // Test metadata
    browser?: { name: string; version: string }
    device?: string
    platform?: { name: string; version: string }
    app?: { name: string; version: string }
    [key: string]: any
  }

  customData?: {
    // Custom data section
    title?: string
    data: Array<{ label: string; value: string }>
  }
}
```

## 🎨 Themes & Customization

DRESSING comes with three beautiful themes:

### Modern (Default)

A clean, contemporary design with smooth animations and a professional look.

### Classic

A traditional, familiar layout inspired by popular test reporters.

### Dark

Easy on the eyes with a dark color scheme, perfect for late-night debugging sessions.

### Custom Colors

Customize report colors to match your brand or preference:

```bash
# Custom purple theme
dressing generate -i report.json -o report.html \
  --colors '{"primary":"#9333ea","success":"#22c55e","danger":"#dc2626"}'

# Ocean blue theme
dressing generate -i report.json -o report.html \
  --colors '{"primary":"#0ea5e9","success":"#10b981","danger":"#f43f5e"}'
```

**Programmatic usage:**

```typescript
import { generate } from 'dressing'

await generate({
  jsonFile: 'cucumber.json',
  output: 'report.html',
  colors: {
    primary: '#9333ea', // Header & accent color
    success: '#22c55e', // Pass/success color
    danger: '#dc2626', // Fail/error color
    warning: '#eab308', // Skip/warning color
    info: '#3b82f6', // Info/pending color
  },
})
```

**📖 See [COLOR_GUIDE.md](COLOR_GUIDE.md) for:**

- 10+ color presets (Purple, Ocean, Forest, Ember, etc.)
- Corporate branding examples (GitHub, GitLab, Slack)
- Accessibility guidelines
- Environment-specific color schemes
- Advanced customization tips

## 🎯 Advanced Features

### Metadata Support

Add environment and execution metadata to your reports:

```javascript
await dressing.generate({
  jsonDir: './results',
  output: './report.html',
  metadata: {
    browser: {
      name: 'chrome',
      version: '120.0.6099.109',
    },
    platform: {
      name: 'windows',
      version: '11',
    },
    device: 'Desktop - 1920x1080',
    app: {
      name: 'MyApp',
      version: '2.1.0',
    },
  },
})
```

### Custom Data

Add custom information sections:

```javascript
await dressing.generate({
  jsonDir: './results',
  output: './report.html',
  customData: {
    title: 'Execution Info',
    data: [
      { label: 'Sprint', value: 'Sprint 5' },
      { label: 'Build', value: 'v2.1.0-rc.3' },
      { label: 'Environment', value: 'Staging' },
      { label: 'Executor', value: 'Jenkins CI' },
      { label: 'Branch', value: 'feature/new-checkout' },
    ],
  },
})
```

### Screenshot Support

DRESSING automatically detects and displays screenshots embedded in your Cucumber JSON:

```javascript
// In your step definitions
const screenshot = await browser.takeScreenshot()
this.attach(screenshot, 'image/png')
```

Screenshots can be:

- **Inline**: Embedded in the HTML (default)
- **Linked**: Referenced as external files (`noInlineScreenshots: true`)

## ⌨️ Keyboard Shortcuts

- **Ctrl/Cmd + F**: Focus search box
- **Ctrl/Cmd + E**: Expand all features and scenarios
- **Ctrl/Cmd + C**: Collapse all features and scenarios
- **Escape**: Clear search (when focused)

## 🔍 Filtering & Search

DRESSING provides powerful filtering capabilities:

- **Text Search**: Search across feature names, scenario names, and tags
- **Status Filter**: Filter by Passed, Failed, Skipped status
- **Tag Filter**: Click on tags to filter scenarios
- **Auto-expand Failed**: Failed tests are automatically expanded

## 📊 Statistics & Charts

Automatically generated statistics include:

- Total features, scenarios, and steps
- Pass/fail/skip counts
- Execution duration
- Pass rate percentage
- Visual charts (pie and doughnut)

## 🔗 Integration

### Cucumber.js

```javascript
// cucumber.js
module.exports = {
  default: {
    format: ['json:cucumber-report.json'],
  },
}

// After test execution
const dressing = require('dressing')
await dressing.generate({
  jsonFile: 'cucumber-report.json',
  output: 'test-report.html',
})
```

### CI/CD Integration

#### GitHub Actions

```yaml
- name: Generate Test Report
  run: npx dressing generate -d ./test-results -o ./report.html

- name: Upload Report
  uses: actions/upload-artifact@v3
  with:
    name: test-report
    path: report.html
```

#### Jenkins

```groovy
stage('Generate Report') {
  steps {
    sh 'npx dressing generate -d ./test-results -o ./report.html'
    publishHTML([
      reportDir: '.',
      reportFiles: 'report.html',
      reportName: 'DRESSING Report'
    ])
  }
}
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

We stand on the shoulders of giants, and this project wouldn't be possible without the incredible work of the open-source community. DRESSING is our contribution to push the testing ecosystem forward.

**Inspired by these excellent reporters:**

- [cucumber-html-reporter](https://github.com/gkushang/cucumber-html-reporter)
- [multiple-cucumber-html-reporter](https://github.com/wswebcreation/multiple-cucumber-html-reporter)
- [allure-report](https://github.com/allure-framework/allure2)

**Built with wonderful packages:**

- [Chart.js](https://www.chartjs.org/) - Beautiful, responsive charts
- [Handlebars](https://handlebarsjs.com/) - Powerful templating engine
- [Commander](https://github.com/tj/commander.js) - Complete CLI solution
- [TypeScript](https://www.typescriptlang.org/) - Type-safe development
- And many more amazing open-source tools

Thank you to all maintainers and contributors who make the JavaScript ecosystem thrive!

## 📧 Support

- 📫 Issues: [GitHub Issues](https://github.com/jedau/dressing/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/jedau/dressing/discussions)
- 📖 Documentation: [Full Docs](https://github.com/jedau/dressing#readme)

## 🗺️ Roadmap

- [ ] Additional themes
- [ ] Real-time report updates
- [ ] Comparison between test runs
- [ ] Export to PDF
- [ ] Integration with test management tools
- [ ] Trend analysis over multiple runs
- [ ] Screenshot comparison for visual tests
- [ ] API test support enhancements

---

**Made with ❤️ for the testing community**

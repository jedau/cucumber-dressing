# DRESSING Quick Start Guide

Get up and running with DRESSING in less than 5 minutes!

## Prerequisites

- Node.js >= 18.0.0
- npm >= 8.0.0

## Installation

```bash
npm install cucumber-dressing --save-dev
```

## Basic Usage

### Step 1: Generate Cucumber JSON

First, ensure your test framework outputs Cucumber JSON format. For Cucumber.js:

```javascript
// cucumber.js
module.exports = {
  default: {
    format: ['json:test-results/cucumber-report.json'],
  },
}
```

### Step 2: Run Your Tests

```bash
npm test
```

### Step 3: Generate HTML Report

#### Using CLI:

```bash
npx dressing generate -i test-results/cucumber-report.json -o test-report.html --open
```

#### Using Node.js:

```javascript
// generate-report.js
const dressing = require('cucumber-dressing')

await dressing.generate({
  jsonFile: 'test-results/cucumber-report.json',
  output: 'test-report.html',
  reportTitle: 'My Test Report',
  openReportInBrowser: true,
})
```

Then run:

```bash
node generate-report.js
```

## Quick Examples

### Example 1: Basic Report

```bash
npx dressing generate -i results.json -o report.html
```

### Example 2: With Dark Theme

```bash
npx dressing generate -i results.json -o report.html --theme dark --open
```

### Example 3: Multiple JSON Files

```bash
npx dressing generate -d ./test-results -o report.html
```

### Example 4: With Metadata

```bash
npx dressing generate -i results.json -o report.html \
  --metadata '{"browser":{"name":"chrome","version":"120"},"platform":{"name":"windows","version":"11"}}'
```

### Example 5: Programmatic with All Options

```javascript
const dressing = require('dressing')

await dressing.generate({
  jsonDir: './test-results',
  output: './reports/test-report.html',
  reportTitle: 'Sprint 5 - Regression Tests',
  reportName: 'Regression Test Results',
  theme: 'modern',
  brandTitle: 'MyApp Tests',
  displayDuration: true,
  durationInMS: true,
  scenarioTimestamp: true,
  openReportInBrowser: true,
  metadata: {
    browser: { name: 'chrome', version: '120' },
    platform: { name: 'windows', version: '11' },
    device: 'Desktop',
  },
  customData: {
    title: 'Test Execution Info',
    data: [
      { label: 'Sprint', value: 'Sprint 5' },
      { label: 'Environment', value: 'Staging' },
      { label: 'Build', value: 'v2.1.0' },
    ],
  },
})
```

## Integration with Test Frameworks

### Cucumber.js

```javascript
// cucumber.js
module.exports = {
  default: {
    format: ['json:cucumber-report.json'],
    publishQuiet: true,
  },
}

// After tests (in a separate script)
const dressing = require('dressing')
await dressing.generate({
  jsonFile: 'cucumber-report.json',
  output: 'test-report.html',
})
```

### Add to package.json

```json
{
  "scripts": {
    "test": "cucumber-js",
    "report": "dressing generate -i cucumber-report.json -o test-report.html --open",
    "test:report": "npm test && npm run report"
  }
}
```

Then run:

```bash
npm run test:report
```

## CI/CD Integration

### GitHub Actions

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm install

      - name: Run tests
        run: npm test

      - name: Generate report
        if: always()
        run: npx dressing generate -i cucumber-report.json -o test-report.html

      - name: Upload report
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: test-report
          path: test-report.html
```

### Jenkins

```groovy
pipeline {
  agent any

  stages {
    stage('Test') {
      steps {
        sh 'npm test'
      }
    }

    stage('Report') {
      steps {
        sh 'npx dressing generate -i cucumber-report.json -o test-report.html'
        publishHTML([
          reportDir: '.',
          reportFiles: 'test-report.html',
          reportName: 'Test Report'
        ])
      }
    }
  }
}
```

## Tips & Tricks

### 1. Keyboard Shortcuts

- `Ctrl/Cmd + F` - Focus search
- `Ctrl/Cmd + E` - Expand all
- `Ctrl/Cmd + C` - Collapse all
- `Escape` - Clear search

### 2. Failed Tests Auto-Expand

Failed features and scenarios automatically expand for quick debugging.

### 3. Filter by Status

Use the status filter buttons to quickly view only passed, failed, or skipped tests.

### 4. Search Everything

The search box filters by feature names, scenario names, and tags.

### 5. Duration Tracking

Enable duration display to identify slow tests:

```bash
npx dressing generate -i results.json -o report.html --duration-in-ms
```

### 6. Custom Themes

Switch between themes based on preference:

```bash
# Modern (default)
npx dressing generate -i results.json -o report.html --theme modern

# Dark mode
npx dressing generate -i results.json -o report.html --theme dark

# Classic
npx dressing generate -i results.json -o report.html --theme classic
```

## Troubleshooting

### Issue: "No JSON files found"

**Solution:** Ensure your tests are generating JSON output and the path is correct.

```bash
# Check if file exists
ls -la cucumber-report.json

# Use absolute path
npx dressing generate -i $(pwd)/cucumber-report.json -o report.html
```

### Issue: "Invalid JSON format"

**Solution:** Validate your JSON file:

```bash
# Check JSON syntax
cat cucumber-report.json | jq .
```

### Issue: Report not opening in browser

**Solution:** Use the `--open` flag:

```bash
npx dressing generate -i results.json -o report.html --open
```

## Next Steps

- Read the [full documentation](README.md)
- Check out [examples](examples/)
- Explore [configuration options](README.md#documentation)
- Join our [community discussions](https://github.com/jedau/dressing/discussions)

## Support

- 📫 Report issues: [GitHub Issues](https://github.com/jedau/cucumber-dressing/issues)
- 💬 Ask questions: [GitHub Discussions](https://github.com/jedau/cucumber-dressing/discussions)
- 📖 Read docs: [README](README.md)

---

**Happy Testing! 🥗**

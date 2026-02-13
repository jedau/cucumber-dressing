# DRESSING Command Reference

Quick reference for all DRESSING commands and options.

## Installation

```bash
# Local installation
npm install dressing --save-dev

# Global installation
npm install -g dressing
```

## CLI Commands

### generate

Generate HTML report from Cucumber JSON files.

```bash
dressing generate [options]
```

### Options

| Option                     | Type    | Description                     | Default                 | Required |
| -------------------------- | ------- | ------------------------------- | ----------------------- | -------- |
| `-i, --input <path>`       | string  | Input JSON file path            | -                       | \*       |
| `-d, --dir <path>`         | string  | Input directory with JSON files | -                       | \*       |
| `-o, --output <path>`      | string  | Output HTML file path           | `test-report.html`      | ✓        |
| `-t, --title <title>`      | string  | Report page title               | `DRESSING Test Report`  |          |
| `-n, --name <name>`        | string  | Report heading name             | `Test Execution Report` |          |
| `--theme <theme>`          | string  | UI theme (modern/classic/dark)  | `modern`                |          |
| `--brand <brand>`          | string  | Brand/project name              | `DRESSING`              |          |
| `--no-duration`            | boolean | Hide duration information       | `false`                 |          |
| `--duration-in-ms`         | boolean | Durations in milliseconds       | `false`                 |          |
| `--open`                   | boolean | Open report in browser          | `false`                 |          |
| `--no-inline-screenshots`  | boolean | Use external screenshot links   | `false`                 |          |
| `--screenshots-dir <path>` | string  | Screenshots directory path      | -                       |          |
| `--column-layout <number>` | 1\|2    | Number of columns               | `2`                     |          |
| `--scenario-timestamp`     | boolean | Show scenario timestamps        | `false`                 |          |
| `--disable-log`            | boolean | Suppress console output         | `false`                 |          |
| `--metadata <json>`        | JSON    | Test metadata as JSON string    | -                       |          |
| `--custom-data <json>`     | JSON    | Custom data as JSON string      | -                       |          |
| `--colors <json>`          | JSON    | Custom colors as JSON string    | -                       |          |

\*Either `--input` or `--dir` is required, but not both.

### example

Show example usage.

```bash
dressing example
```

## Quick Command Examples

### Basic Usage

```bash
# Single file
dressing generate -i results.json -o report.html

# Directory
dressing generate -d ./test-results -o report.html

# With browser auto-open
dressing generate -i results.json -o report.html --open
```

### Theming

```bash
# Modern theme (default)
dressing generate -i results.json -o report.html --theme modern

# Dark theme
dressing generate -i results.json -o report.html --theme dark

# Classic theme
dressing generate -i results.json -o report.html --theme classic
```

### With Metadata

```bash
# Simple metadata
dressing generate -i results.json -o report.html \
  --metadata '{"browser":{"name":"chrome","version":"120"}}'

# Full metadata
dressing generate -i results.json -o report.html \
  --metadata '{
    "browser":{"name":"chrome","version":"120.0.6099.109"},
    "platform":{"name":"windows","version":"11"},
    "device":"Desktop - 1920x1080",
    "app":{"name":"MyApp","version":"2.1.0"}
  }'
```

### With Custom Data

```bash
dressing generate -i results.json -o report.html \
  --custom-data '{
    "title":"Test Execution Info",
    "data":[
      {"label":"Sprint","value":"Sprint 5"},
      {"label":"Environment","value":"Staging"},
      {"label":"Build","value":"v2.1.0-rc.3"},
      {"label":"Date","value":"2026-02-02"}
    ]
  }'
```

### Duration Options

```bash
# Show durations (default)
dressing generate -i results.json -o report.html

# Hide durations
dressing generate -i results.json -o report.html --no-duration

# Durations in milliseconds
dressing generate -i results.json -o report.html --duration-in-ms

# With timestamps
dressing generate -i results.json -o report.html --scenario-timestamp
```

### Screenshot Handling

```bash
# Inline screenshots (default)
dressing generate -i results.json -o report.html

# External screenshots
dressing generate -i results.json -o report.html --no-inline-screenshots

# Custom screenshots directory
dressing generate -i results.json -o report.html \
  --screenshots-dir ./screenshots
```

### Layout Options

```bash
# Two columns (default)
dressing generate -i results.json -o report.html --column-layout 2

# Single column
dressing generate -i results.json -o report.html --column-layout 1
```

### Quiet Mode

```bash
# Suppress console output
dressing generate -i results.json -o report.html --disable-log
```

### Custom Colors

```bash
# Brand colors
dressing generate -i results.json -o report.html \
  --colors '{"primary":"#9333ea","success":"#22c55e","danger":"#dc2626"}'

# Custom theme colors
dressing generate -i results.json -o report.html \
  --colors '{
    "primary":"#0066cc",
    "success":"#28a745",
    "danger":"#dc3545",
    "warning":"#ffc107",
    "background":"#f5f5f5"
  }'
```

### Complete Example

```bash
dressing generate \
  -d ./test-results \
  -o ./reports/test-report.html \
  --title "Sprint 5 Regression Tests" \
  --name "Regression Test Results" \
  --theme modern \
  --brand "MyApp Tests" \
  --duration-in-ms \
  --scenario-timestamp \
  --open \
  --metadata '{
    "browser":{"name":"chrome","version":"120"},
    "platform":{"name":"windows","version":"11"}
  }' \
  --custom-data '{
    "title":"Execution Info",
    "data":[
      {"label":"Sprint","value":"Sprint 5"},
      {"label":"Environment","value":"Staging"}
    ]
  }'
```

## Programmatic API

### Basic Usage

```javascript
const dressing = require('dressing')

await dressing.generate({
  jsonFile: 'cucumber-report.json',
  output: 'test-report.html',
})
```

### With TypeScript

```typescript
import { generate } from 'dressing'

await generate({
  jsonFile: 'cucumber-report.json',
  output: 'test-report.html',
  reportTitle: 'My Tests',
  theme: 'dark',
})
```

### Full Options

```typescript
import { generate, ReportOptions } from 'dressing'

const options: ReportOptions = {
  // Input (one required)
  jsonFile: './results.json', // Single file
  jsonDir: './test-results', // Or directory

  // Output (required)
  output: './reports/report.html',

  // Report info
  reportTitle: 'My Test Report',
  reportName: 'Test Results',
  brandTitle: 'MyApp',

  // Theme
  theme: 'modern', // 'modern' | 'classic' | 'dark'

  // Duration
  displayDuration: true,
  durationInMS: false,

  // Behavior
  openReportInBrowser: true,
  disableLog: false,

  // Layout
  columnLayout: 2, // 1 | 2
  scenarioTimestamp: true,

  // Screenshots
  screenshotsDirectory: './screenshots',
  noInlineScreenshots: false,

  // Metadata
  metadata: {
    browser: { name: 'chrome', version: '120' },
    platform: { name: 'windows', version: '11' },
    device: 'Desktop',
    app: { name: 'MyApp', version: '2.1.0' },
  },

  // Custom data
  customData: {
    title: 'Execution Info',
    data: [
      { label: 'Sprint', value: 'Sprint 5' },
      { label: 'Environment', value: 'Staging' },
    ],
  },
}

await generate(options)
```

## NPM Scripts Integration

Add to your `package.json`:

```json
{
  "scripts": {
    "test": "cucumber-js",
    "report": "dressing generate -i cucumber-report.json -o test-report.html",
    "test:report": "npm test && npm run report",
    "test:open": "npm test && dressing generate -i cucumber-report.json -o test-report.html --open"
  }
}
```

Then run:

```bash
npm run test:report
```

## Environment Variables

DRESSING doesn't use environment variables directly, but you can use them in your scripts:

```json
{
  "scripts": {
    "report": "dressing generate -i $INPUT_JSON -o $OUTPUT_HTML --theme $THEME"
  }
}
```

```bash
INPUT_JSON=results.json OUTPUT_HTML=report.html THEME=dark npm run report
```

## Exit Codes

| Code | Meaning                                     |
| ---- | ------------------------------------------- |
| 0    | Success                                     |
| 1    | Error (invalid input, file not found, etc.) |

## Getting Help

```bash
# Show all commands
dressing --help

# Show command help
dressing generate --help

# Show examples
dressing example

# Version
dressing --version
```

## Common Patterns

### Pattern 1: CI/CD Integration

```bash
# Generate report and fail if it fails
dressing generate -d ./results -o ./report.html || exit 1
```

### Pattern 2: Multiple Reports

```bash
# Generate different themed reports
dressing generate -i results.json -o report-light.html --theme modern
dressing generate -i results.json -o report-dark.html --theme dark
```

### Pattern 3: Conditional Report

```bash
# Only generate if tests exist
if [ -f "cucumber-report.json" ]; then
  dressing generate -i cucumber-report.json -o report.html --open
fi
```

### Pattern 4: Post-Process

```bash
# Generate report and move to archive
dressing generate -i results.json -o report.html
mv report.html ./archive/report-$(date +%Y%m%d-%H%M%S).html
```

## Keyboard Shortcuts (In Report)

| Shortcut       | Action           |
| -------------- | ---------------- |
| `Ctrl/Cmd + F` | Focus search box |
| `Ctrl/Cmd + E` | Expand all       |
| `Ctrl/Cmd + C` | Collapse all     |
| `Escape`       | Clear search     |

## Tips

1. **Use absolute paths** when in doubt
2. **Check JSON validity** before generating
3. **Use --open** for immediate feedback
4. **Try --theme dark** for late-night debugging
5. **Enable --scenario-timestamp** for time-based analysis

## Troubleshooting Commands

```bash
# Verify JSON syntax
cat cucumber-report.json | jq .

# Check file exists
ls -la cucumber-report.json

# Test with minimal options
dressing generate -i results.json -o test.html

# Enable logging (default)
dressing generate -i results.json -o test.html

# Check version
dressing --version
```

---

For more information, see:

- [README.md](README.md) - Full documentation
- [QUICKSTART.md](QUICKSTART.md) - Quick start guide
- [GitHub Issues](https://github.com/jedau/dressing/issues) - Report problems

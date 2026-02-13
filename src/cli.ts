#!/usr/bin/env node

/**
 * DRESSING CLI - Command Line Interface
 */

import { Command } from 'commander'
import { readFileSync } from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'
import { generate } from './reporter.js'
import { ReportOptions } from './types.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const packageJson = JSON.parse(readFileSync(path.join(__dirname, '../package.json'), 'utf-8')) as {
  version: string
}

interface CLIOptions {
  input?: string
  dir?: string
  output: string
  title?: string
  name?: string
  theme?: string
  brand?: string
  duration?: boolean
  durationInMs?: boolean
  open?: boolean
  inlineScreenshots?: boolean
  screenshotsDir?: string
  columnLayout: string
  scenarioTimestamp?: boolean
  disableLog?: boolean
  metadata?: string
  customData?: string
  colors?: string
}

/**
 * Parse JSON options with error handling
 * @template T - Expected return type
 * @param value - JSON string to parse
 * @param optionName - Name of the option (for error messages)
 * @returns Parsed object of type T, or undefined if value is undefined
 * @throws Exits process with error code 1 if JSON is invalid
 */
function parseJsonOption<T>(value: string | undefined, optionName: string): T | undefined {
  if (!value) {
    return undefined
  }
  try {
    return JSON.parse(value) as T
  } catch {
    console.error(`Error: Invalid ${optionName} JSON`)
    process.exit(1)
    return undefined // TypeScript satisfaction - never reached
  }
}

/**
 * Build report options from CLI options
 * @param options - CLI options parsed from command line arguments
 * @returns ReportOptions object ready for report generation
 */
function buildReportOptions(options: CLIOptions): ReportOptions {
  const metadata = parseJsonOption<ReportOptions['metadata']>(options.metadata, 'metadata')
  const customData = parseJsonOption<ReportOptions['customData']>(options.customData, 'custom data')
  const colors = parseJsonOption<ReportOptions['colors']>(options.colors, 'colors')

  return {
    jsonFile: options.input ? path.resolve(options.input) : undefined,
    jsonDir: options.dir ? path.resolve(options.dir) : undefined,
    output: path.resolve(options.output),
    reportTitle: options.title,
    reportName: options.name,
    theme: options.theme as 'modern' | 'classic' | 'dark',
    colors,
    brandTitle: options.brand,
    displayDuration: options.duration !== false,
    durationInMS: options.durationInMs ?? false,
    openReportInBrowser: options.open ?? false,
    noInlineScreenshots: options.inlineScreenshots === false,
    screenshotsDirectory: options.screenshotsDir,
    columnLayout: parseInt(options.columnLayout) as 1 | 2,
    scenarioTimestamp: options.scenarioTimestamp ?? false,
    disableLog: options.disableLog ?? false,
    metadata,
    customData,
  }
}

const program = new Command()

program
  .name('dressing')
  .description('DRESSING - Detailed Report of Executed Scenarios, Steps and INsights for Gherkin')
  .version(packageJson.version)

program
  .command('generate')
  .description('Generate HTML report from Cucumber JSON files')
  .option('-i, --input <path>', 'Input JSON file path')
  .option('-d, --dir <path>', 'Input directory containing JSON files')
  .option('-o, --output <path>', 'Output HTML file path (required)', 'test-report.html')
  .option('-t, --title <title>', 'Report title', 'DRESSING Test Report')
  .option('-n, --name <name>', 'Report name', 'Test Execution Report')
  .option('--theme <theme>', 'Report theme (modern, classic, dark)', 'modern')
  .option('--brand <brand>', 'Brand title', 'DRESSING')
  .option('--no-duration', 'Hide duration information')
  .option('--duration-in-ms', 'Durations are in milliseconds instead of nanoseconds')
  .option('--open', 'Open report in browser after generation')
  .option('--no-inline-screenshots', 'Use relative paths for screenshots instead of inline')
  .option('--screenshots-dir <path>', 'Screenshots directory path')
  .option('--column-layout <number>', 'Column layout (1 or 2)', '2')
  .option('--scenario-timestamp', 'Display scenario timestamps')
  .option('--disable-log', 'Disable console logging')
  .option('--metadata <json>', 'Metadata as JSON string')
  .option('--custom-data <json>', 'Custom data as JSON string')
  .option(
    '--colors <json>',
    'Custom colors as JSON string (e.g. {"primary":"#ff0000","success":"#00ff00"})',
  )
  .action(async (options: CLIOptions) => {
    try {
      // Validate required options
      if (!options.input && !options.dir) {
        console.error('Error: Either --input or --dir must be specified')
        process.exit(1)
      }

      // Build report options
      const reportOptions = buildReportOptions(options)

      // Generate report
      await generate(reportOptions)

      process.exit(0)
    } catch (error) {
      console.error('Error generating report:', error)
      process.exit(1)
    }
  })

program
  .command('example')
  .description('Show example usage')
  .action(() => {
    console.log(`
DRESSING - Example Usage

1. Generate report from a single JSON file:
   $ dressing generate -i cucumber-report.json -o report.html

2. Generate report from a directory of JSON files:
   $ dressing generate -d ./test-results -o report.html

3. Generate report with custom theme and open in browser:
   $ dressing generate -d ./results -o report.html --theme dark --open

4. Generate report with metadata:
   $ dressing generate -i results.json -o report.html \\
     --metadata '{"browser":{"name":"chrome","version":"120"},"platform":{"name":"windows","version":"11"}}'

5. Generate report with custom data:
   $ dressing generate -d ./results -o report.html \\
     --custom-data '{"title":"Sprint 5","data":[{"label":"Environment","value":"Production"},{"label":"Build","value":"v2.1.0"}]}'

6. Generate report with custom colors:
   $ dressing generate -i results.json -o report.html \\
     --colors '{"primary":"#9333ea","success":"#22c55e","danger":"#dc2626","warning":"#eab308"}'

7. Full example with all options:
   $ dressing generate \\
     -d ./test-results \\
     -o ./reports/test-report.html \\
     --title "My Test Report" \\
     --name "Sprint 5 - Regression Tests" \\
     --theme modern \\
     --colors '{"primary":"#0066cc"}' \\
     --brand "MyApp Tests" \\
     --duration-in-ms \\
     --scenario-timestamp \\
     --open

For more information, visit: https://github.com/jedau/dressing
See COLOR_GUIDE.md for color presets and customization tips.
    `)
  })

program.parse(process.argv)

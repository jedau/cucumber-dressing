/**
 * Example usage of DRESSING reporter
 */

import * as path from 'path'
import { fileURLToPath } from 'url'
import * as dressing from './index.js'

// ES module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/**
 * Example 1: Basic usage with minimal configuration
 * Generates a simple HTML report from a JSON file
 */
async function basicExample() {
  console.log('Example 1: Basic Report Generation\n')

  await dressing.generate({
    jsonFile: path.join(__dirname, '../examples/sample-report.json'),
    output: path.join(__dirname, '../examples/output/basic-report.html'),
    reportTitle: 'Basic Test Report',
    reportName: 'Sample Test Execution',
    disableLog: true,
  })

  console.log('✓ Basic report generated!\n')
}

/**
 * Example 2: Report with metadata and custom data
 * Demonstrates adding browser, platform, and custom execution information
 */
async function metadataExample() {
  console.log('Example 2: Report with Metadata\n')

  await dressing.generate({
    jsonFile: path.join(__dirname, '../examples/sample-report.json'),
    output: path.join(__dirname, '../examples/output/metadata-report.html'),
    reportTitle: 'Test Report with Metadata',
    metadata: {
      browser: {
        name: 'Chrome',
        version: '120.0.6099.109',
      },
      platform: {
        name: 'Windows',
        version: '11',
      },
      device: 'Desktop - 1920x1080',
      app: {
        name: 'Sample Application',
        version: '2.1.0',
      },
    },
    customData: {
      title: 'Execution Details',
      data: [
        { label: 'Sprint', value: 'Sprint 5' },
        { label: 'Environment', value: 'Staging' },
        { label: 'Build', value: 'v2.1.0-rc.3' },
        { label: 'Executed By', value: 'CI/CD Pipeline' },
        { label: 'Date', value: new Date().toLocaleString() },
      ],
    },
    disableLog: true,
  })

  console.log('✓ Report with metadata generated!\n')
}

/**
 * Example 3: Dark theme report
 * Shows how to apply the dark theme option
 */
async function darkThemeExample() {
  console.log('Example 3: Dark Theme Report\n')

  await dressing.generate({
    jsonFile: path.join(__dirname, '../examples/sample-report.json'),
    output: path.join(__dirname, '../examples/output/dark-report.html'),
    reportTitle: 'Dark Theme Report',
    theme: 'dark',
    openReportInBrowser: false,
    disableLog: true,
  })

  console.log('✓ Dark theme report generated!\n')
}

/**
 * Example 4: Report with charts - Status Distribution and Pass Rate
 * This example generates a report that prominently displays the status distribution
 * and pass rate charts. The sample data includes a good mix of passed, failed, and
 * skipped tests to make the visualizations meaningful.
 */
async function chartsExample() {
  console.log('Example 4: Report with Charts Visualization\n')

  await dressing.generate({
    jsonFile: path.join(__dirname, '../examples/sample-report.json'),
    output: path.join(__dirname, '../examples/output/charts-report.html'),
    reportTitle: 'Test Execution Dashboard',
    reportName: 'Status Distribution & Pass Rate Analysis',
    theme: 'modern',
    displayDuration: true,
    openReportInBrowser: true, // Open in browser to see charts
    disableLog: true,
  })

  console.log('✓ Report with charts generated and opened in browser!\n')
  console.log('  📊 Check the Status Distribution chart showing test breakdown')
  console.log('  📈 Check the Pass Rate chart showing success percentage\n')
}

// Example 5: From directory (commented out - requires directory setup)
// async function directoryExample() {
//   console.log('Example 5: Report from Directory\n');
//
//   await dressing.generate({
//     jsonDir: path.join(__dirname, 'examples/results'),
//     output: path.join(__dirname, 'examples/output/directory-report.html'),
//     reportTitle: 'Consolidated Test Report',
//     reportName: 'All Test Results',
//     displayDuration: true,
//     durationInMS: true,
//     scenarioTimestamp: true,
//   });
//
//   console.log('✓ Report from directory generated!\\n');
// }

/**
 * Run all example functions sequentially
 * Entry point for demonstrating DRESSING features
 */
async function runExamples() {
  try {
    console.log('═'.repeat(80))
    console.log('DRESSING - Example Usage')
    console.log(`${'═'.repeat(80)}\n`)

    await basicExample()
    await metadataExample()
    await darkThemeExample()
    await chartsExample()

    // Uncomment if you have a results directory
    // await directoryExample();

    console.log('═'.repeat(80))
    console.log('All examples completed successfully!')
    console.log('Check the examples/output directory for generated reports.')
    console.log('═'.repeat(80))
  } catch (error) {
    console.error('Error running examples:', error)
    process.exit(1)
  }
}

// Run examples when executed directly
void runExamples()

export { runExamples }

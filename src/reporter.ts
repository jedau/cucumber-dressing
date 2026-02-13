/**
 * DRESSING - Main Report Generator
 */

import fs from 'fs-extra'
import * as path from 'path'
import { JsonParser } from './parser.js'
import { StatisticsCalculator } from './statistics.js'
import { TemplateGenerator } from './template-generator.js'
import { ChartData, GherkinFeature, ReportOptions, ReportStatistics } from './types.js'

export class DressingReporter {
  private options: ReportOptions

  constructor(options: ReportOptions) {
    this.options = this.validateOptions(options)
  }

  /**
   * Validate and normalize options with default values
   * @param options - User-provided report options
   * @returns Validated and normalized options
   * @throws Error if required options are missing
   */
  private validateOptions(options: ReportOptions): ReportOptions {
    if (!options.output) {
      throw new Error('Output path is required')
    }

    if (!options.jsonDir && !options.jsonFile) {
      throw new Error('Either jsonDir or jsonFile must be provided')
    }

    return {
      ...options,
      reportTitle: options.reportTitle ?? 'DRESSING Test Report',
      reportName: options.reportName ?? 'Test Execution Report',
      theme: options.theme ?? 'modern',
      displayDuration: options.displayDuration !== false,
      durationInMS: options.durationInMS ?? false,
      openReportInBrowser: options.openReportInBrowser ?? false,
      columnLayout: options.columnLayout ?? 2,
      disableLog: options.disableLog ?? false,
    }
  }

  /**
   * Generate the complete HTML report
   * Reads JSON files, processes features, calculates statistics, and writes HTML output
   * @throws Error if report generation fails at any step
   */
  async generate(): Promise<void> {
    try {
      this.log('Starting DRESSING report generation...')

      // Step 1: Read JSON files
      this.log('Reading JSON files...')
      const features = await this.readJsonFiles()
      this.log(`✓ Loaded ${features.length} feature(s)`)

      if (features.length === 0) {
        throw new Error('No valid features found in JSON files')
      }

      // Step 2: Normalize features
      this.log('Processing features...')
      const normalizedFeatures = JsonParser.normalizeFeatures(features)

      // Step 3: Calculate statistics
      this.log('Calculating statistics...')
      const statistics = StatisticsCalculator.calculateStatistics(normalizedFeatures)
      const processedFeatures = StatisticsCalculator.processFeatures(normalizedFeatures)

      // Step 4: Prepare chart data
      const chartData = this.prepareChartData(statistics)

      // Step 5: Generate HTML
      this.log('Generating HTML report...')
      const templateGenerator = new TemplateGenerator(this.options)
      const html = templateGenerator.generateReport(processedFeatures, statistics, chartData)

      // Step 6: Write report
      this.log('Writing report to disk...')
      await this.writeReport(html)

      this.log('✓ Report generated successfully!')
      this.log(`Report location: ${path.resolve(this.options.output)}`)

      // Step 7: Open in browser if requested
      if (this.options.openReportInBrowser) {
        this.log('Opening report in browser...')
        await this.openInBrowser()
      }

      // Display summary
      this.displaySummary(statistics)
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to generate report: ${error.message}`)
      }
      throw error
    }
  }

  /**
   * Read JSON files from directory or file based on options
   * @returns Array of Gherkin features from JSON source
   * @throws Error if no JSON source is configured
   */
  private async readJsonFiles(): Promise<GherkinFeature[]> {
    if (this.options.jsonFile) {
      return JsonParser.readJsonFile(this.options.jsonFile)
    }

    if (this.options.jsonDir) {
      return JsonParser.readJsonDirectory(this.options.jsonDir)
    }

    throw new Error('No JSON source provided')
  }

  /**
   * Prepare chart data for Chart.js visualization
   * @param statistics - Calculated report statistics
   * @returns ChartData object with labels, datasets, and colors
   */
  private prepareChartData(statistics: ReportStatistics): ChartData {
    return {
      labels: ['Passed', 'Failed', 'Skipped', 'Pending', 'Undefined'],
      datasets: [
        {
          label: 'Test Results',
          data: [
            statistics.passed,
            statistics.failed,
            statistics.skipped,
            statistics.pending,
            statistics.undefined,
          ] as number[],
          backgroundColor: [
            'rgba(16, 185, 129, 0.8)',
            'rgba(239, 68, 68, 0.8)',
            'rgba(245, 158, 11, 0.8)',
            'rgba(59, 130, 246, 0.8)',
            'rgba(107, 114, 128, 0.8)',
          ],
          borderColor: [
            'rgb(16, 185, 129)',
            'rgb(239, 68, 68)',
            'rgb(245, 158, 11)',
            'rgb(59, 130, 246)',
            'rgb(107, 114, 128)',
          ],
          borderWidth: 2,
        },
      ],
    }
  }

  /**
   * Write HTML report to file and copy screenshots if needed
   * @param html - Generated HTML content
   * @throws Error if file write fails
   */
  private async writeReport(html: string): Promise<void> {
    const outputPath = path.resolve(this.options.output)
    const outputDir = path.dirname(outputPath)

    // Ensure output directory exists
    await fs.ensureDir(outputDir)

    // Write HTML file
    await fs.writeFile(outputPath, html, 'utf8')

    // Copy screenshots if needed
    if (this.options.screenshotsDirectory && !this.options.noInlineScreenshots) {
      await this.copyScreenshots(outputDir)
    }
  }

  /**
   * Copy screenshots to output directory for external references
   * @param outputDir - Target directory for screenshots
   */
  private async copyScreenshots(outputDir: string): Promise<void> {
    if (!this.options.screenshotsDirectory) {
      return
    }

    const screenshotsPath = path.resolve(this.options.screenshotsDirectory)
    const targetPath = path.join(outputDir, 'screenshots')

    if (await fs.pathExists(screenshotsPath)) {
      await fs.copy(screenshotsPath, targetPath)
      this.log('✓ Screenshots copied')
    }
  }

  /**
   * Open generated report in default browser
   * Logs warning if browser launch fails
   */
  private async openInBrowser(): Promise<void> {
    try {
      const outputPath = path.resolve(this.options.output)
      // Dynamic import for ESM module
      const open = (await import('open')).default
      await open(outputPath)
    } catch {
      this.log('⚠ Warning: Could not open report in browser automatically')
    }
  }

  /**
   * Display formatted summary statistics in console
   * @param statistics - Calculated report statistics
   */
  private displaySummary(statistics: ReportStatistics): void {
    if (this.options.disableLog) {
      return
    }

    console.log(`\n${'='.repeat(80)}`)
    console.log('DRESSING Report Summary')
    console.log('='.repeat(80))
    console.log(`Features:  ${statistics.features}`)
    console.log(`Scenarios: ${statistics.scenarios}`)
    console.log(`Steps:     ${statistics.steps}`)
    console.log('')
    console.log(`✓ Passed:  ${statistics.passed}`)
    console.log(`✗ Failed:  ${statistics.failed}`)
    console.log(`⊘ Skipped: ${statistics.skipped}`)
    console.log(`⧗ Pending: ${statistics.pending}`)
    console.log('')
    console.log(`Pass Rate: ${statistics.passRate}%`)
    console.log(`${'='.repeat(80)}\n`)
  }

  /**
   * Log message to console (respects disableLog option)
   * @param message - Message to log
   */
  private log(message: string): void {
    if (!this.options.disableLog) {
      console.log(message)
    }
  }
}

/**
 * Generate HTML report from Cucumber JSON files
 * @param options - Report generation options
 * @throws Error if generation fails
 * @example
 * ```typescript
 * await generate({
 *   jsonDir: './test-results',
 *   output: './report.html',
 *   theme: 'modern'
 * })
 * ```
 */
export async function generate(options: ReportOptions): Promise<void> {
  const reporter = new DressingReporter(options)
  await reporter.generate()
}

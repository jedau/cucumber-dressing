/**
 * Template Generator - Creates HTML report from data
 */

import { readFileSync } from 'fs'
import Handlebars from 'handlebars'
import * as path from 'path'
import { fileURLToPath } from 'url'
import scriptsTemplate from './templates/scripts.js.template.js'
import stylesTemplate from './templates/styles.css.template.js'
import {
  ChartData,
  GherkinStep,
  GherkinTag,
  ProcessedFeature,
  ReportOptions,
  ReportStatistics,
  StepResult,
} from './types.js'
import {
  extractErrorMessage,
  formatDuration,
  formatTimestamp,
  getStatusClass,
  getStatusIcon,
  markdownToHtml,
  parseTags,
  sanitizeHtml,
} from './utils.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const packageJson = JSON.parse(readFileSync(path.join(__dirname, '../package.json'), 'utf-8')) as {
  version: string
}

export class TemplateGenerator {
  private options: ReportOptions

  constructor(options: ReportOptions) {
    this.options = options
    this.registerHelpers()
  }

  /**
   * Register Handlebars helpers for formatting, status handling, and data manipulation in templates
   */
  private registerHelpers(): void {
    Handlebars.registerHelper('formatDuration', (duration: number) => {
      return formatDuration(duration, this.options.durationInMS)
    })

    Handlebars.registerHelper('statusIcon', (status: string) => {
      return getStatusIcon(
        status as 'passed' | 'failed' | 'skipped' | 'pending' | 'undefined' | 'ambiguous',
      )
    })

    Handlebars.registerHelper('statusClass', (status: string) => {
      return getStatusClass(
        status as 'passed' | 'failed' | 'skipped' | 'pending' | 'undefined' | 'ambiguous',
      )
    })

    Handlebars.registerHelper('sanitize', (text: string) => {
      return new Handlebars.SafeString(sanitizeHtml(text))
    })

    Handlebars.registerHelper('markdown', (text: string) => {
      return new Handlebars.SafeString(markdownToHtml(sanitizeHtml(text)))
    })

    Handlebars.registerHelper('parseTags', (tags: GherkinTag[]) => {
      return parseTags(tags).join(', ')
    })

    Handlebars.registerHelper('formatTimestamp', (timestamp: string | number) => {
      return formatTimestamp(timestamp)
    })

    Handlebars.registerHelper('json', (context: unknown) => {
      return JSON.stringify(context, null, 2)
    })

    Handlebars.registerHelper('percentage', (value: number, total: number) => {
      if (total === 0) {
        return '0'
      }
      return ((value / total) * 100).toFixed(1)
    })

    Handlebars.registerHelper('eq', (a: unknown, b: unknown) => {
      return a === b
    })

    Handlebars.registerHelper('or', (...args: unknown[]) => {
      return args.slice(0, -1).some(arg => !!arg)
    })

    Handlebars.registerHelper('and', (...args: unknown[]) => {
      return args.slice(0, -1).every(arg => !!arg)
    })

    Handlebars.registerHelper('gt', (a: number, b: number) => {
      return a > b
    })

    Handlebars.registerHelper('extractError', (result: StepResult) => {
      return extractErrorMessage(result)
    })

    Handlebars.registerHelper('hasEmbedding', (step: GherkinStep, type: string) => {
      if (!step.embeddings) {
        return false
      }
      return step.embeddings.some(e => e.mime_type.includes(type))
    })

    Handlebars.registerHelper('getEmbedding', (step: GherkinStep, type: string) => {
      if (!step.embeddings) {
        return null
      }
      return step.embeddings.find(e => e.mime_type.includes(type))
    })
  }

  /**
   * Generate complete HTML report from processed data
   * @param features - Processed features with calculated status and duration
   * @param statistics - Report statistics including counts and pass rate
   * @param chartData - Chart.js data for visualization
   * @returns Complete HTML report as a string
   */
  generateReport(
    features: ProcessedFeature[],
    statistics: ReportStatistics,
    chartData: ChartData,
  ): string {
    const template = this.getMainTemplate()
    const compiled = Handlebars.compile(template)

    const data = {
      reportTitle: this.options.reportTitle ?? 'DRESSING Test Report',
      reportName: this.options.reportName ?? 'Test Execution Report',
      brandTitle: this.options.brandTitle ?? 'DRESSING',
      theme: this.options.theme ?? 'modern',
      features,
      statistics,
      chartData,
      metadata: this.options.metadata,
      customData: this.options.customData,
      displayDuration: this.options.displayDuration !== false,
      scenarioTimestamp: this.options.scenarioTimestamp,
      columnLayout: this.options.columnLayout ?? 2,
      generatedAt: formatTimestamp(Date.now()),
    }

    return compiled(data)
  }

  /**
   * Get main HTML template structure with embedded styles and scripts
   * @returns HTML template string with placeholders for Handlebars compilation
   */
  private getMainTemplate(): string {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{reportTitle}}</title>
  <style>
    ${this.getStyles()}
    ${this.getCustomColorStyles()}
  </style>
</head>
<body class="theme-{{theme}}">
  <div class="container">
    ${this.getHeaderTemplate()}
    ${this.getStatisticsTemplate()}
    ${this.getChartsTemplate()}
    ${this.getMetadataTemplate()}
    ${this.getFeaturesListTemplate()}
    ${this.getFooterTemplate()}
  </div>
  <script>
    ${this.getScripts()}
  </script>
</body>
</html>`
  }

  /**
   * Get header template with branding and report info
   * @returns HTML template string for the report header section
   */
  private getHeaderTemplate(): string {
    return `
        <header class="report-header">
            <div class="brand">
                <h1>{{brandTitle}}</h1>
                <span class="tagline">Detailed Report of Executed Scenarios, Steps and INsights for Gherkin</span>
            </div>
            <div class="report-info">
                <h2>{{reportName}}</h2>
                <p class="generated-time">Generated: {{generatedAt}}</p>
            </div>
        </header>
    `
  }

  /**
   * Get statistics overview template with test execution summary cards
   * @returns HTML template string for statistics display
   */
  private getStatisticsTemplate(): string {
    return `
        <section class="statistics-overview">
            <h3>Test Execution Summary</h3>
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-value">{{statistics.features}}</div>
                    <div class="stat-label">Features</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">{{statistics.scenarios}}</div>
                    <div class="stat-label">Scenarios</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">{{statistics.steps}}</div>
                    <div class="stat-label">Steps</div>
                </div>
                <div class="stat-card status-passed">
                    <div class="stat-value">{{statistics.passed}}</div>
                    <div class="stat-label">Passed</div>
                </div>
                <div class="stat-card status-failed">
                    <div class="stat-value">{{statistics.failed}}</div>
                    <div class="stat-label">Failed</div>
                </div>
                <div class="stat-card status-skipped">
                    <div class="stat-value">{{statistics.skipped}}</div>
                    <div class="stat-label">Skipped</div>
                </div>
                {{#if displayDuration}}
                <div class="stat-card">
                    <div class="stat-value">{{formatDuration statistics.duration}}</div>
                    <div class="stat-label">Duration</div>
                </div>
                {{/if}}
                <div class="stat-card">
                    <div class="stat-value">{{statistics.passRate}}%</div>
                    <div class="stat-label">Pass Rate</div>
                </div>
            </div>
        </section>
    `
  }

  /**
   * Get charts section template for status distribution and pass rate visualization
   * @returns HTML template string with canvas elements for Chart.js
   */
  private getChartsTemplate(): string {
    return `
        <section class="charts-section">
            <div class="charts-grid">
                <div class="chart-container">
                    <h4>Status Distribution</h4>
                    <canvas id="statusChart"></canvas>
                </div>
                <div class="chart-container">
                    <h4>Pass Rate</h4>
                    <canvas id="passRateChart"></canvas>
                </div>
            </div>
        </section>
    `
  }

  /**
   * Get metadata section template for browser, platform, and custom data display
   * @returns HTML template string for optional metadata sections
   */
  private getMetadataTemplate(): string {
    return `
        {{#if metadata}}
        <section class="metadata-section">
            <h3>Test Metadata</h3>
            <div class="metadata-grid">
                {{#if metadata.browser}}
                <div class="metadata-item">
                    <span class="metadata-label">Browser:</span>
                    <span class="metadata-value">{{metadata.browser.name}} {{metadata.browser.version}}</span>
                </div>
                {{/if}}
                {{#if metadata.platform}}
                <div class="metadata-item">
                    <span class="metadata-label">Platform:</span>
                    <span class="metadata-value">{{metadata.platform.name}} {{metadata.platform.version}}</span>
                </div>
                {{/if}}
                {{#if metadata.device}}
                <div class="metadata-item">
                    <span class="metadata-label">Device:</span>
                    <span class="metadata-value">{{metadata.device}}</span>
                </div>
                {{/if}}
            </div>
        </section>
        {{/if}}

        {{#if customData}}
        <section class="custom-data-section">
            <h3>{{customData.title}}</h3>
            <div class="custom-data-grid">
                {{#each customData.data}}
                <div class="custom-data-item">
                    <span class="custom-data-label">{{this.label}}:</span>
                    <span class="custom-data-value">{{this.value}}</span>
                </div>
                {{/each}}
            </div>
        </section>
        {{/if}}
    `
  }

  /**
   * Get features list template with search filter and feature cards
   * @returns HTML template string for features section
   */
  private getFeaturesListTemplate(): string {
    return `
        <section class="features-section">
            <h3>Features</h3>
            ${this.getFilterTemplate()}
            <div class="features-list">
                {{#each features}}
                ${this.getFeatureCardTemplate()}
                {{/each}}
            </div>
        </section>
    `
  }

  /**
   * Get filter controls template for searching and status filtering
   * @returns HTML template string with search input and filter buttons
   */
  private getFilterTemplate(): string {
    return `
            <div class="features-filter">
                <input type="text" id="searchFilter" placeholder="Search features, scenarios, or tags..." />
                <div class="status-filters">
                    <button class="filter-btn active" data-status="all">All</button>
                    <button class="filter-btn" data-status="passed">Passed</button>
                    <button class="filter-btn" data-status="failed">Failed</button>
                    <button class="filter-btn" data-status="skipped">Skipped</button>
                </div>
            </div>
    `
  }

  /**
   * Get feature card template with collapsible scenarios
   * @returns HTML template string for individual feature display
   */
  private getFeatureCardTemplate(): string {
    return `
                <div class="feature-card {{statusClass this.status}}" data-status="{{this.status}}">
                    ${this.getFeatureHeaderTemplate()}
                    {{#if this.description}}
                    <div class="feature-description">{{markdown this.description}}</div>
                    {{/if}}
                    <div class="feature-content" id="feature-{{@index}}" style="display: none;">
                        <div class="scenarios-list">
                            {{#each this.scenarios}}
                            ${this.getScenarioCardTemplate()}
                            {{/each}}
                        </div>
                    </div>
                </div>
    `
  }

  /**
   * Get feature header template with title, tags, and toggle controls
   * @returns HTML template string for feature header with collapsible functionality
   */
  private getFeatureHeaderTemplate(): string {
    return `
                    <div class="feature-header" onclick="toggleFeature('feature-{{@index}}')">
                        <div class="feature-title">
                            <span class="status-icon">{{statusIcon this.status}}</span>
                            <h4>{{this.name}}</h4>
                            {{#if this.tags}}
                            <div class="tags">
                                {{#each this.tags}}
                                <span class="tag">{{this.name}}</span>
                                {{/each}}
                            </div>
                            {{/if}}
                        </div>
                        <div class="feature-stats">
                            <span class="stat">{{this.scenarios.length}} scenarios</span>
                            {{#if ../displayDuration}}
                            <span class="stat">{{formatDuration this.duration}}</span>
                            {{/if}}
                            <span class="toggle-icon">▼</span>
                        </div>
                    </div>
    `
  }

  /**
   * Get scenario card template with collapsible steps
   * @returns HTML template string for individual scenario display
   */
  private getScenarioCardTemplate(): string {
    return `
                            <div class="scenario-card {{statusClass this.status}}">
                                ${this.getScenarioHeaderTemplate()}
                                <div class="scenario-content" id="scenario-{{../id}}-{{@index}}" style="display: none;">
                                    {{#if this.description}}
                                    <div class="scenario-description">{{markdown this.description}}</div>
                                    {{/if}}
                                    ${this.getStepsListTemplate()}
                                </div>
                            </div>
    `
  }

  /**
   * Get scenario header template with title, tags, and toggle controls
   * @returns HTML template string for scenario header with collapsible functionality
   */
  private getScenarioHeaderTemplate(): string {
    return `
                                <div class="scenario-header" onclick="toggleScenario('scenario-{{../id}}-{{@index}}')">
                                    <div class="scenario-title">
                                        <span class="status-icon">{{statusIcon this.status}}</span>
                                        <h5>{{this.keyword}}: {{this.name}}</h5>
                                        {{#if this.tags}}
                                        <div class="tags">
                                            {{#each this.tags}}
                                            <span class="tag">{{this.name}}</span>
                                            {{/each}}
                                        </div>
                                        {{/if}}
                                    </div>
                                    <div class="scenario-stats">
                                        {{#if ../../displayDuration}}
                                        <span class="stat">{{formatDuration this.duration}}</span>
                                        {{/if}}
                                        <span class="toggle-icon">▼</span>
                                    </div>
                                </div>
    `
  }

  /**
   * Get steps list template with errors, data tables, and screenshots
   * @returns HTML template string for scenario steps display
   */
  private getStepsListTemplate(): string {
    return `
                                    <div class="steps-list">
                                        {{#each this.steps}}
                                        <div class="step-item {{statusClass this.result.status}}">
                                            <div class="step-header">
                                                <span class="status-icon">{{statusIcon this.result.status}}</span>
                                                <span class="step-keyword">{{this.keyword}}</span>
                                                <span class="step-name">{{this.name}}</span>
                                                {{#if ../../../displayDuration}}
                                                <span class="step-duration">{{formatDuration this.result.duration}}</span>
                                                {{/if}}
                                            </div>
                                            {{#if this.result.error_message}}
                                            <div class="step-error">
                                                <pre>{{this.result.error_message}}</pre>
                                            </div>
                                            {{/if}}
                                            {{#if this.doc_string}}
                                            <div class="step-doc-string">
                                                <pre>{{this.doc_string.value}}</pre>
                                            </div>
                                            {{/if}}
                                            {{#if this.rows}}
                                            <div class="step-data-table">
                                                <table>
                                                    {{#each this.rows}}
                                                    <tr>
                                                        {{#each this.cells}}
                                                        <td>{{this}}</td>
                                                        {{/each}}
                                                    </tr>
                                                    {{/each}}
                                                </table>
                                            </div>
                                            {{/if}}
                                            {{#if (hasEmbedding this "image")}}
                                            <div class="step-screenshot">
                                                <img src="data:{{getEmbedding this "image"}}.mime_type;base64,{{getEmbedding this "image"}}.data" alt="Screenshot" />
                                            </div>
                                            {{/if}}
                                        </div>
                                        {{/each}}
                                    </div>
    `
  }

  /**
   * Get footer template with branding and version info
   * @returns HTML template string for report footer
   */
  private getFooterTemplate(): string {
    return `
        <footer class="report-footer">
            <p>Generated by <strong>DRESSING</strong> - Detailed Report of Executed Scenarios, Steps and INsights for Gherkin</p>
            <p class="version">v${packageJson.version}</p>
        </footer>
    `
  }

  /**
   * Get CSS styles from template file
   * @returns CSS stylesheet string for report styling
   */
  private getStyles(): string {
    return stylesTemplate
  }

  /**
   * Generate custom CSS color variables if colors option is provided
   * @returns CSS custom properties string with color overrides, or empty string if no colors specified
   */
  private getCustomColorStyles(): string {
    if (!this.options.colors) {
      return ''
    }

    const colors = this.options.colors
    const cssVars: string[] = []

    if (colors.primary) {
      cssVars.push(`--color-primary: ${colors.primary};`)
    }
    if (colors.success) {
      cssVars.push(`--color-success: ${colors.success};`)
    }
    if (colors.danger) {
      cssVars.push(`--color-danger: ${colors.danger};`)
    }
    if (colors.warning) {
      cssVars.push(`--color-warning: ${colors.warning};`)
    }
    if (colors.info) {
      cssVars.push(`--color-info: ${colors.info};`)
    }
    if (colors.muted) {
      cssVars.push(`--color-muted: ${colors.muted};`)
    }
    if (colors.background) {
      cssVars.push(`--color-bg: ${colors.background};`)
    }
    if (colors.backgroundSecondary) {
      cssVars.push(`--color-bg-secondary: ${colors.backgroundSecondary};`)
    }
    if (colors.border) {
      cssVars.push(`--color-border: ${colors.border};`)
    }
    if (colors.text) {
      cssVars.push(`--color-text: ${colors.text};`)
    }
    if (colors.textSecondary) {
      cssVars.push(`--color-text-secondary: ${colors.textSecondary};`)
    }

    if (cssVars.length === 0) {
      return ''
    }

    return `
      :root {
        ${cssVars.join('\n        ')}
      }
    `
  }

  /**
   * Get JavaScript code from template file for report interactivity
   * @returns JavaScript code string for charts, filtering, and collapsible sections
   */
  private getScripts(): string {
    return scriptsTemplate
  }
}

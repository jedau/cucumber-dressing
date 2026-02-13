/**
 * Utility functions for DRESSING reporter
 */

import { GherkinFeature, GherkinScenario, GherkinStep, StepResult } from './types.js'

/**
 * Calculate duration in a human-readable format
 * @param nanoseconds - Duration in nanoseconds (or milliseconds if inMS is true)
 * @param inMS - If true, treats input as milliseconds instead of nanoseconds
 * @returns Formatted duration string (e.g., "1.50s", "2m 30s")
 */
export function formatDuration(nanoseconds: number, inMS = false): string {
  const milliseconds = inMS ? nanoseconds : nanoseconds / 1000000

  if (milliseconds < 1000) {
    return `${Math.round(milliseconds)}ms`
  }

  const seconds = milliseconds / 1000
  if (seconds < 60) {
    return `${seconds.toFixed(2)}s`
  }

  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}m ${remainingSeconds.toFixed(0)}s`
}

/**
 * Get the worst status from a list of statuses (failed > ambiguous > undefined > pending > skipped > passed)
 * @param statuses - Array of status strings
 * @returns The worst status from the hierarchy
 */
export function getWorstStatus(
  statuses: ('passed' | 'failed' | 'skipped' | 'pending' | 'undefined' | 'ambiguous')[],
): 'passed' | 'failed' | 'skipped' | 'pending' | 'undefined' | 'ambiguous' {
  if (statuses.includes('failed')) {
    return 'failed'
  }
  if (statuses.includes('ambiguous')) {
    return 'ambiguous'
  }
  if (statuses.includes('undefined')) {
    return 'undefined'
  }
  if (statuses.includes('pending')) {
    return 'pending'
  }
  if (statuses.includes('skipped')) {
    return 'skipped'
  }
  return 'passed'
}

/**
 * Calculate scenario status based on steps
 * @param steps - Array of Gherkin steps
 * @returns The worst status among all steps, or 'pending' if no steps
 */
export function calculateScenarioStatus(
  steps: GherkinStep[],
): 'passed' | 'failed' | 'skipped' | 'pending' | 'undefined' {
  if (steps.length === 0) {
    return 'pending'
  }

  const statuses = steps.map(step => step.result.status)
  return getWorstStatus(statuses) as 'passed' | 'failed' | 'skipped' | 'pending' | 'undefined'
}

/**
 * Calculate feature status based on scenarios
 * @param scenarios - Array of Gherkin scenarios
 * @returns 'failed' if any scenario failed, 'skipped' if all skipped, otherwise 'passed'
 */
export function calculateFeatureStatus(
  scenarios: GherkinScenario[],
): 'passed' | 'failed' | 'skipped' | 'pending' {
  if (scenarios.length === 0) {
    return 'pending'
  }

  const hasFailedScenario = scenarios.some(scenario => {
    const scenarioStatus = calculateScenarioStatus(scenario.steps)
    return scenarioStatus === 'failed' || scenarioStatus === 'undefined'
  })

  if (hasFailedScenario) {
    return 'failed'
  }

  const allSkipped = scenarios.every(scenario => {
    const scenarioStatus = calculateScenarioStatus(scenario.steps)
    return scenarioStatus === 'skipped'
  })

  if (allSkipped) {
    return 'skipped'
  }

  return 'passed'
}

/**
 * Calculate total duration from steps
 * @param steps - Array of Gherkin steps
 * @returns Total duration in nanoseconds
 */
export function calculateDuration(steps: GherkinStep[]): number {
  return steps.reduce((total, step) => {
    return total + (step.result.duration ?? 0)
  }, 0)
}

/**
 * Calculate scenario duration including hooks (before/after)
 * @param scenario - Gherkin scenario object
 * @returns Total duration including steps and hooks in nanoseconds
 */
export function calculateScenarioDuration(scenario: GherkinScenario): number {
  const stepsDuration = calculateDuration(scenario.steps)
  const beforeDuration = scenario.before
    ? scenario.before.reduce((sum, hook) => sum + (hook.result.duration ?? 0), 0)
    : 0
  const afterDuration = scenario.after
    ? scenario.after.reduce((sum, hook) => sum + (hook.result.duration ?? 0), 0)
    : 0

  return stepsDuration + beforeDuration + afterDuration
}

/**
 * Format timestamp to human-readable string
 * @param timestamp - Unix timestamp (number) or ISO date string
 * @returns Formatted date string or 'N/A' if no timestamp provided
 */
export function formatTimestamp(timestamp?: number | string): string {
  if (!timestamp) {
    return 'N/A'
  }

  const date = typeof timestamp === 'string' ? new Date(timestamp) : new Date(timestamp)

  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
}

/**
 * Get status icon character for display
 * @param status - Test status
 * @returns Unicode character representing the status (✓, ✗, ⊘, ⧗, ?, ≈)
 */
export function getStatusIcon(
  status: 'passed' | 'failed' | 'skipped' | 'pending' | 'undefined' | 'ambiguous',
): string {
  const icons = {
    passed: '✓',
    failed: '✗',
    skipped: '⊘',
    pending: '⧗',
    undefined: '?',
    ambiguous: '≈',
  }

  return icons[status] || '?'
}

/**
 * Get CSS class name for status styling
 * @param status - Test status
 * @returns CSS class name (e.g., 'status-passed', 'status-failed')
 */
export function getStatusClass(
  status: 'passed' | 'failed' | 'skipped' | 'pending' | 'undefined' | 'ambiguous',
): string {
  return `status-${status}`
}

/**
 * Sanitize HTML by escaping special characters
 * @param text - Raw text that may contain HTML characters
 * @returns Escaped text safe for HTML rendering
 */
export function sanitizeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  }

  return text.replace(/[&<>"']/g, m => map[m])
}

/**
 * Generate unique ID with timestamp and random component
 * @param prefix - Prefix for the ID
 * @returns Unique ID string (e.g., 'feature-1234567890-abc123xyz')
 */
export function generateId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Parse tags from Gherkin tags, removing @ prefix
 * @param tags - Array of Gherkin tag objects
 * @returns Array of tag names without @ prefix
 */
export function parseTags(tags?: { name: string }[]): string[] {
  if (!tags || tags.length === 0) {
    return []
  }
  return tags.map(tag => tag.name.replace('@', ''))
}

/**
 * Group features by their directory path
 * @param features - Array of Gherkin features
 * @returns Map of directory paths to features in that directory
 */
export function groupFeaturesByDirectory(
  features: GherkinFeature[],
): Map<string, GherkinFeature[]> {
  const grouped = new Map<string, GherkinFeature[]>()

  features.forEach(feature => {
    const dir = feature.uri.split('/').slice(0, -1).join('/') || 'root'
    if (!grouped.has(dir)) {
      grouped.set(dir, [])
    }
    grouped.get(dir)!.push(feature)
  })

  return grouped
}

/**
 * Calculate pass rate percentage with 2 decimal precision
 * @param passed - Number of passed tests
 * @param total - Total number of tests
 * @returns Pass rate as percentage (0-100) with 2 decimal places
 */
export function calculatePassRate(passed: number, total: number): number {
  if (total === 0) {
    return 0
  }
  return Math.round((passed / total) * 100 * 100) / 100
}

/**
 * Extract error message from step result (first line only)
 * @param result - Step result object
 * @returns First line of error message, or empty string if no error
 */
export function extractErrorMessage(result: StepResult): string {
  if (!result.error_message) {
    return ''
  }

  // Try to extract just the meaningful part of the error
  const lines = result.error_message.split('\n')
  return lines[0] || result.error_message
}

/**
 * Get file name from URI or path
 * @param uri - File URI or path
 * @returns File name (last part of the path)
 */
export function getFileName(uri: string): string {
  const parts = uri.split('/')
  return parts[parts.length - 1]
}

/**
 * Convert markdown to HTML (basic conversion)
 * Supports headers (#, ##, ###), bold (**text**), italic (*text*), and line breaks
 * @param markdown - Markdown formatted text
 * @returns HTML string
 */
export function markdownToHtml(markdown: string): string {
  return markdown
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
    .replace(/\*(.*)\*/gim, '<em>$1</em>')
    .replace(/\n/gim, '<br>')
}

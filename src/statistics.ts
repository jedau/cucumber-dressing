/**
 * Statistics Calculator - Generates report statistics
 */

import { GherkinFeature, ProcessedFeature, ReportStatistics } from './types.js'
import {
  calculateFeatureStatus,
  calculatePassRate,
  calculateScenarioDuration,
  calculateScenarioStatus,
} from './utils.js'

export class StatisticsCalculator {
  /**
   * Calculate comprehensive statistics from features
   * @param features - Array of Gherkin features to analyze
   * @returns Comprehensive statistics including counts, duration, and pass rate
   */
  static calculateStatistics(features: GherkinFeature[]): ReportStatistics {
    const stats: ReportStatistics = {
      features: features.length,
      scenarios: 0,
      steps: 0,
      passed: 0,
      failed: 0,
      skipped: 0,
      pending: 0,
      undefined: 0,
      ambiguous: 0,
      duration: 0,
      passRate: 0,
    }

    features.forEach(feature => {
      feature.elements.forEach(scenario => {
        if (scenario.type === 'background') {
          return
        }

        stats.scenarios++

        scenario.steps.forEach(step => {
          stats.steps++
          stats.duration += step.result.duration ?? 0

          switch (step.result.status) {
            case 'passed':
              stats.passed++
              break
            case 'failed':
              stats.failed++
              break
            case 'skipped':
              stats.skipped++
              break
            case 'pending':
              stats.pending++
              break
            case 'undefined':
              stats.undefined++
              break
            case 'ambiguous':
              stats.ambiguous++
              break
          }
        })
      })
    })

    stats.passRate = calculatePassRate(stats.passed, stats.steps)

    return stats
  }

  /**
   * Calculate statistics for a single feature
   * @param feature - Gherkin feature to analyze
   * @returns Object containing total scenarios, status counts, and duration in nanoseconds
   */
  static calculateFeatureStatistics(feature: GherkinFeature) {
    const scenarios = feature.elements.filter(el => el.type === 'scenario')

    const stats = {
      total: scenarios.length,
      passed: 0,
      failed: 0,
      skipped: 0,
      pending: 0,
      undefined: 0,
      duration: 0,
    }

    scenarios.forEach(scenario => {
      const status = calculateScenarioStatus(scenario.steps)
      const duration = calculateScenarioDuration(scenario)

      stats.duration += duration

      switch (status) {
        case 'passed':
          stats.passed++
          break
        case 'failed':
        case 'undefined':
          stats.failed++
          break
        case 'skipped':
          stats.skipped++
          break
        case 'pending':
          stats.pending++
          break
      }
    })

    return stats
  }

  /**
   * Calculate status breakdown across features, scenarios, and steps
   * @param features - Array of Gherkin features to analyze
   * @returns Nested object with status counts for features, scenarios, and steps
   */
  static calculateStatusBreakdown(features: GherkinFeature[]) {
    const breakdown = {
      features: {
        passed: 0,
        failed: 0,
        skipped: 0,
        pending: 0,
      },
      scenarios: {
        passed: 0,
        failed: 0,
        skipped: 0,
        pending: 0,
        undefined: 0,
      },
      steps: {
        passed: 0,
        failed: 0,
        skipped: 0,
        pending: 0,
        undefined: 0,
        ambiguous: 0,
      },
    }

    features.forEach(feature => {
      const featureStatus = calculateFeatureStatus(feature.elements)
      breakdown.features[featureStatus]++

      feature.elements.forEach(scenario => {
        if (scenario.type === 'background') {
          return
        }

        const scenarioStatus = calculateScenarioStatus(scenario.steps)
        breakdown.scenarios[scenarioStatus]++

        scenario.steps.forEach(step => {
          breakdown.steps[step.result.status]++
        })
      })
    })

    return breakdown
  }

  /**
   * Process features with calculated status and duration for each feature and scenario
   * @param features - Array of Gherkin features to process
   * @returns Array of processed features with computed status, duration, and enriched scenarios
   */
  static processFeatures(features: GherkinFeature[]): ProcessedFeature[] {
    return features.map(feature => {
      const scenarios = feature.elements
        .filter(el => el.type === 'scenario')
        .map(scenario => ({
          ...scenario,
          status: calculateScenarioStatus(scenario.steps),
          duration: calculateScenarioDuration(scenario),
          featureName: feature.name,
          featureId: feature.id,
        }))

      const status = calculateFeatureStatus(feature.elements)
      const duration = scenarios.reduce((sum, s) => sum + s.duration, 0)

      return {
        ...feature,
        status,
        duration,
        scenarios,
      } as ProcessedFeature
    })
  }

  /**
   * Extract all failed scenarios with error details
   * @param features - Array of Gherkin features to search
   * @returns Array of failed scenario objects with feature name, scenario name, failing step, error message, and tags
   */
  static getFailedScenarios(features: GherkinFeature[]): {
    feature: string
    scenario: string
    step: string
    error: string
    tags: string[]
  }[] {
    const failed: {
      feature: string
      scenario: string
      step: string
      error: string
      tags: string[]
    }[] = []

    features.forEach(feature => {
      feature.elements.forEach(scenario => {
        if (scenario.type === 'background') {
          return
        }

        const failedStep = scenario.steps.find(
          step =>
            step.result.status === 'failed' ||
            step.result.status === 'undefined' ||
            step.result.status === 'ambiguous',
        )

        if (failedStep) {
          failed.push({
            feature: feature.name,
            scenario: scenario.name,
            step: `${failedStep.keyword}${failedStep.name}`,
            error: failedStep.result.error_message ?? 'No error message',
            tags: [
              ...(feature.tags ?? []).map(t => t.name),
              ...(scenario.tags ?? []).map(t => t.name),
            ],
          })
        }
      })
    })

    return failed
  }

  /**
   * Get the slowest scenarios sorted by duration
   * @param features - Array of Gherkin features to analyze
   * @param count - Maximum number of scenarios to return (default: 10)
   * @returns Array of scenario objects with feature name, scenario name, and duration in nanoseconds, sorted by duration descending
   */
  static getTopSlowestScenarios(
    features: GherkinFeature[],
    count = 10,
  ): {
    feature: string
    scenario: string
    duration: number
  }[] {
    const scenarios: {
      feature: string
      scenario: string
      duration: number
    }[] = []

    features.forEach(feature => {
      feature.elements.forEach(scenario => {
        if (scenario.type === 'background') {
          return
        }

        scenarios.push({
          feature: feature.name,
          scenario: scenario.name,
          duration: calculateScenarioDuration(scenario),
        })
      })
    })

    return scenarios.sort((a, b) => b.duration - a.duration).slice(0, count)
  }

  /**
   * Calculate time-based statistics across all scenarios
   * @param features - Array of Gherkin features to analyze
   * @returns Object with min, max, average, median, and total duration in nanoseconds
   */
  static calculateTimeStatistics(features: GherkinFeature[]) {
    const durations: number[] = []

    features.forEach(feature => {
      feature.elements.forEach(scenario => {
        if (scenario.type === 'background') {
          return
        }
        durations.push(calculateScenarioDuration(scenario))
      })
    })

    if (durations.length === 0) {
      return {
        min: 0,
        max: 0,
        average: 0,
        median: 0,
        total: 0,
      }
    }

    durations.sort((a, b) => a - b)

    return {
      min: durations[0],
      max: durations[durations.length - 1],
      average: durations.reduce((a, b) => a + b, 0) / durations.length,
      median: durations[Math.floor(durations.length / 2)],
      total: durations.reduce((a, b) => a + b, 0),
    }
  }
}

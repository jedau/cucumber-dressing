/**
 * Test suite for utility functions
 */

import { GherkinStep } from '../types.js'
import {
  calculateDuration,
  calculatePassRate,
  calculateScenarioStatus,
  extractErrorMessage,
  formatDuration,
  getFileName,
  getStatusClass,
  getStatusIcon,
  getWorstStatus,
  parseTags,
  sanitizeHtml,
} from '../utils.js'

describe('formatDuration', () => {
  it('should format nanoseconds to milliseconds', () => {
    expect(formatDuration(1000000)).toBe('1ms')
    expect(formatDuration(1500000000)).toBe('1.50s')
  })

  it('should format milliseconds when inMS is true', () => {
    expect(formatDuration(500, true)).toBe('500ms')
    expect(formatDuration(1500, true)).toBe('1.50s')
  })

  it('should format minutes for long durations', () => {
    expect(formatDuration(120000000000)).toBe('2m 0s')
    expect(formatDuration(150000000000)).toBe('2m 30s')
  })
})

describe('getWorstStatus', () => {
  it('should return failed as worst status', () => {
    expect(getWorstStatus(['passed', 'failed', 'skipped'])).toBe('failed')
  })

  it('should return passed when all passed', () => {
    expect(getWorstStatus(['passed', 'passed'])).toBe('passed')
  })

  it('should prioritize undefined over skipped', () => {
    expect(getWorstStatus(['passed', 'skipped', 'undefined'])).toBe('undefined')
  })
})

describe('calculateScenarioStatus', () => {
  it('should calculate passed status', () => {
    const steps: GherkinStep[] = [
      {
        keyword: 'Given',
        name: 'test',
        line: 1,
        result: { status: 'passed', duration: 100 },
      },
      {
        keyword: 'When',
        name: 'test',
        line: 2,
        result: { status: 'passed', duration: 100 },
      },
    ]
    expect(calculateScenarioStatus(steps)).toBe('passed')
  })

  it('should calculate failed status', () => {
    const steps: GherkinStep[] = [
      {
        keyword: 'Given',
        name: 'test',
        line: 1,
        result: { status: 'passed', duration: 100 },
      },
      {
        keyword: 'When',
        name: 'test',
        line: 2,
        result: { status: 'failed', duration: 100, error_message: 'Error' },
      },
    ]
    expect(calculateScenarioStatus(steps)).toBe('failed')
  })

  it('should return pending for empty steps', () => {
    expect(calculateScenarioStatus([])).toBe('pending')
  })
})

describe('calculateDuration', () => {
  it('should sum step durations', () => {
    const steps: GherkinStep[] = [
      {
        keyword: 'Given',
        name: 'test',
        line: 1,
        result: { status: 'passed', duration: 100 },
      },
      {
        keyword: 'When',
        name: 'test',
        line: 2,
        result: { status: 'passed', duration: 200 },
      },
    ]
    expect(calculateDuration(steps)).toBe(300)
  })

  it('should handle missing durations', () => {
    const steps: GherkinStep[] = [
      {
        keyword: 'Given',
        name: 'test',
        line: 1,
        result: { status: 'passed' },
      },
    ]
    expect(calculateDuration(steps)).toBe(0)
  })
})

describe('getStatusIcon', () => {
  it('should return correct icons', () => {
    expect(getStatusIcon('passed')).toBe('✓')
    expect(getStatusIcon('failed')).toBe('✗')
    expect(getStatusIcon('skipped')).toBe('⊘')
    expect(getStatusIcon('pending')).toBe('⧗')
  })
})

describe('getStatusClass', () => {
  it('should return correct class names', () => {
    expect(getStatusClass('passed')).toBe('status-passed')
    expect(getStatusClass('failed')).toBe('status-failed')
  })
})

describe('sanitizeHtml', () => {
  it('should escape HTML characters', () => {
    expect(sanitizeHtml('<script>alert("xss")</script>')).toBe(
      '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;',
    )
    expect(sanitizeHtml("It's a test & demo")).toBe('It&#039;s a test &amp; demo')
  })
})

describe('parseTags', () => {
  it('should parse tag names', () => {
    const tags = [{ name: '@smoke' }, { name: '@regression' }]
    expect(parseTags(tags)).toEqual(['smoke', 'regression'])
  })

  it('should handle empty tags', () => {
    expect(parseTags([])).toEqual([])
    expect(parseTags(undefined)).toEqual([])
  })
})

describe('calculatePassRate', () => {
  it('should calculate percentage correctly', () => {
    expect(calculatePassRate(8, 10)).toBe(80)
    expect(calculatePassRate(3, 4)).toBe(75)
  })

  it('should handle zero total', () => {
    expect(calculatePassRate(0, 0)).toBe(0)
  })

  it('should round to 2 decimals', () => {
    expect(calculatePassRate(2, 3)).toBe(66.67)
  })
})

describe('extractErrorMessage', () => {
  it('should extract first line of error', () => {
    const result = {
      status: 'failed' as const,
      error_message: 'Error: Test failed\n    at line 10\n    at line 20',
    }
    expect(extractErrorMessage(result)).toBe('Error: Test failed')
  })

  it('should return empty for no error', () => {
    const result = { status: 'passed' as const }
    expect(extractErrorMessage(result)).toBe('')
  })
})

describe('getFileName', () => {
  it('should extract filename from path', () => {
    expect(getFileName('features/login.feature')).toBe('login.feature')
    expect(getFileName('test/features/auth/login.feature')).toBe('login.feature')
  })
})

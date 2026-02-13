/**
 * DRESSING - Main export file
 */

export { JsonParser } from './parser.js'
export { DressingReporter, generate } from './reporter.js'
export { StatisticsCalculator } from './statistics.js'
export { TemplateGenerator } from './template-generator.js'
export * from './types.js'
export * from './utils.js'

// Default export
import { generate } from './reporter.js'
export default { generate }

/**
 * Core data models for DRESSING reporter
 */

/**
 * Represents a Cucumber/Gherkin feature
 */
export interface GherkinFeature {
  id: string
  uri: string
  keyword: string
  name: string
  description?: string
  line: number
  tags?: GherkinTag[]
  elements: GherkinScenario[]
}

/**
 * Represents a scenario or background in a Gherkin feature
 */
export interface GherkinScenario {
  id: string
  keyword: string
  name: string
  description?: string
  line: number
  type: 'scenario' | 'background'
  tags?: GherkinTag[]
  steps: GherkinStep[]
  before?: GherkinHook[]
  after?: GherkinHook[]
}

/**
 * Represents a step in a Gherkin scenario
 */
export interface GherkinStep {
  keyword: string
  name: string
  line: number
  result: StepResult
  match?: {
    location?: string
  }
  embeddings?: Embedding[]
  output?: string[]
  doc_string?: {
    value: string
    line: number
    content_type?: string
  }
  rows?: DataTableRow[]
}

/**
 * Represents a row in a Gherkin data table
 */
export interface DataTableRow {
  cells: string[]
}

/**
 * Represents a before/after hook in a Gherkin scenario
 */
export interface GherkinHook {
  match: {
    location: string
  }
  result: StepResult
}

/**
 * Represents a tag annotation in Gherkin
 */
export interface GherkinTag {
  name: string
  line?: number
}

/**
 * Represents the execution result of a step
 */
export interface StepResult {
  status: 'passed' | 'failed' | 'skipped' | 'pending' | 'undefined' | 'ambiguous'
  duration?: number
  error_message?: string
}

/**
 * Represents an embedded asset (screenshot, text, etc.) in a step
 */
export interface Embedding {
  data: string
  mime_type: string
  name?: string
}

/**
 * Color customization options for report theming
 */
export interface ColorCustomization {
  primary?: string
  success?: string
  danger?: string
  warning?: string
  info?: string
  muted?: string
  background?: string
  backgroundSecondary?: string
  border?: string
  text?: string
  textSecondary?: string
}

/**
 * Configuration options for report generation
 */
export interface ReportOptions {
  jsonDir?: string
  jsonFile?: string
  output: string
  reportTitle?: string
  reportName?: string
  metadata?: ReportMetadata
  customData?: CustomData
  theme?: 'modern' | 'classic' | 'dark'
  colors?: ColorCustomization
  displayDuration?: boolean
  durationInMS?: boolean
  openReportInBrowser?: boolean
  screenshotsDirectory?: string
  noInlineScreenshots?: boolean
  columnLayout?: 1 | 2
  brandTitle?: string
  scenarioTimestamp?: boolean
  disableLog?: boolean
  customStyle?: string
}

/**
 * Metadata about the test execution environment
 */
export interface ReportMetadata {
  browser?: {
    name: string
    version: string
  }
  device?: string
  platform?: {
    name: string
    version: string
  }
  app?: {
    name: string
    version: string
  }
}

/**
 * Custom data section for additional report information
 */
export interface CustomData {
  title?: string
  data: {
    label: string
    value: string
  }[]
}

/**
 * Computed statistics for the test execution
 */
export interface ReportStatistics {
  features: number
  scenarios: number
  steps: number
  passed: number
  failed: number
  skipped: number
  pending: number
  undefined: number
  ambiguous: number
  duration: number
  passRate: number
  startTime?: string
  endTime?: string
}

/**
 * Feature with computed status, duration, and processed scenarios
 */
export interface ProcessedFeature extends GherkinFeature {
  status: 'passed' | 'failed' | 'skipped' | 'pending'
  duration: number
  scenarios: ProcessedScenario[]
  metadata?: ReportMetadata
}

/**
 * Scenario with computed status, duration, and feature references
 */
export interface ProcessedScenario extends GherkinScenario {
  status: 'passed' | 'failed' | 'skipped' | 'pending' | 'undefined'
  duration: number
  featureName: string
  featureId: string
}

/**
 * Chart.js compatible data structure for visualizations
 */
export interface ChartData {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    backgroundColor?: string[]
    borderColor?: string[]
    borderWidth?: number
  }[]
}

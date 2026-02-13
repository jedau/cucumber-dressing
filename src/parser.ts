/**
 * JSON Parser - Reads and validates Cucumber JSON files
 */

import fs from 'fs-extra'
import * as glob from 'glob'
import * as path from 'path'
import { GherkinFeature } from './types.js'

export class JsonParser {
  /**
   * Read a single JSON file containing Cucumber test results
   * @param filePath - Absolute or relative path to JSON file
   * @returns Array of Gherkin features parsed from the file
   * @throws Error if file cannot be read or contains invalid JSON
   */
  static async readJsonFile(filePath: string): Promise<GherkinFeature[]> {
    try {
      const content = await fs.readFile(filePath, 'utf8')
      const data = JSON.parse(content) as unknown

      // Validate that it's an array
      if (!Array.isArray(data)) {
        throw new Error(`Invalid JSON format in ${filePath}: Expected an array`)
      }

      return data as GherkinFeature[]
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to read JSON file ${filePath}: ${error.message}`)
      }
      throw error
    }
  }

  /**
   * Read all JSON files from a directory (recursive)
   * @param dirPath - Directory path to scan for JSON files
   * @returns Combined array of all Gherkin features from all JSON files
   * @throws Error if directory doesn't exist or contains no JSON files
   */
  static async readJsonDirectory(dirPath: string): Promise<GherkinFeature[]> {
    try {
      const pattern = path.join(dirPath, '**/*.json')
      const files = glob.sync(pattern)

      if (files.length === 0) {
        throw new Error(`No JSON files found in directory: ${dirPath}`)
      }

      console.log(`Found ${files.length} JSON file(s) in ${dirPath}`)

      const allFeatures: GherkinFeature[] = []

      for (const file of files) {
        try {
          const features = await this.readJsonFile(file)
          allFeatures.push(...features)
          console.log(`✓ Loaded ${features.length} feature(s) from ${path.basename(file)}`)
        } catch (error) {
          const message = error instanceof Error ? error.message : String(error)
          console.warn(`⚠ Warning: Skipping invalid JSON file ${file}: ${message}`)
        }
      }

      return allFeatures
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to read JSON directory ${dirPath}: ${error.message}`)
      }
      throw error
    }
  }

  /**
   * Validate Gherkin feature structure (checks for required fields)
   * @param feature - Object to validate
   * @returns true if feature has valid structure, false otherwise
   */
  static validateFeature(feature: unknown): boolean {
    if (!feature || typeof feature !== 'object') {
      return false
    }
    // Type guard for feature object
    const feat = feature as { name?: unknown; elements?: unknown }
    if (!feat.name || typeof feat.name !== 'string') {
      return false
    }
    if (!feat.elements || !Array.isArray(feat.elements)) {
      return false
    }

    return true
  }

  /**
   * Clean and normalize features by adding default values for missing fields
   * @param features - Array of raw Gherkin features
   * @returns Array of normalized features with all required fields populated
   */
  static normalizeFeatures(features: GherkinFeature[]): GherkinFeature[] {
    return features
      .filter(feature => this.validateFeature(feature))
      .map(feature => ({
        ...feature,
        id: feature.id ?? `feature-${Date.now()}-${Math.random()}`,
        description: feature.description ?? '',
        tags: feature.tags ?? [],
        elements: feature.elements.map(element => ({
          ...element,
          id: element.id ?? `scenario-${Date.now()}-${Math.random()}`,
          description: element.description ?? '',
          tags: element.tags ?? [],
          steps: element.steps.map(step => ({
            ...step,
            result: {
              ...step.result,
              duration: step.result.duration ?? 0,
            },
            embeddings: step.embeddings ?? [],
            output: step.output ?? [],
          })),
          before: element.before ?? [],
          after: element.after ?? [],
        })),
      }))
  }

  /**
   * Merge features from multiple sources by URI or ID
   * @param featuresArray - Array of feature arrays to merge
   * @returns Single array with merged features (scenarios combined for same feature)
   */
  static mergeFeatures(featuresArray: GherkinFeature[][]): GherkinFeature[] {
    const featureMap = new Map<string, GherkinFeature>()

    for (const features of featuresArray) {
      for (const feature of features) {
        const key = feature.uri || feature.id

        if (featureMap.has(key)) {
          // Merge scenarios from the same feature
          const existing = featureMap.get(key)!
          existing.elements.push(...feature.elements)
        } else {
          featureMap.set(key, { ...feature })
        }
      }
    }

    return Array.from(featureMap.values())
  }
}

/**
 * Gini index chart for measuring point distribution inequality
 */

import type { Squad, ChartOptions } from '../types/index.js';

/**
 * Create a Gini index chart showing point distribution inequality.
 * 
 * @param data - Array of squad data with player points
 * @param options - Chart options
 * @returns Observable Plot specification
 * 
 * @example
 * ```typescript
 * const chart = giniIndexChart(squads, { width: 400 });
 * ```
 */
export function giniIndexChart(data: Squad[], options: ChartOptions = {}) {
  return {
    data,
    options,
    type: 'gini-index'
  };
}

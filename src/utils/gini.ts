/**
 * Gini coefficient calculation for measuring inequality
 */

/**
 * Calculate the Gini coefficient for an array of values.
 * 
 * The Gini coefficient measures inequality in a distribution.
 * - 0 = perfect equality (all values are the same)
 * - 1 = perfect inequality (one value has everything)
 * 
 * @param values - Array of numeric values (e.g., points scored by players)
 * @returns Gini coefficient between 0 and 1
 * 
 * @example
 * ```typescript
 * const points = [10, 20, 30, 40];
 * const gini = calculateGini(points);
 * console.log(gini); // ~0.25 (relatively equal distribution)
 * ```
 */
export function calculateGini(values: number[]): number {
  if (values.length === 0) return 0;
  if (values.length === 1) return 0;
  
  const sorted = [...values].sort((a, b) => a - b);
  const n = sorted.length;
  const sum = sorted.reduce((a, b) => a + b, 0);
  
  if (sum === 0) return 0;
  
  let numerator = 0;
  for (let i = 0; i < n; i++) {
    numerator += (i + 1) * sorted[i];
  }
  
  const gini = (2 * numerator) / (n * sum) - (n + 1) / n;
  return gini;
}

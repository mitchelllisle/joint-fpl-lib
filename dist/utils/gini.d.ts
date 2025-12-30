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
export declare function calculateGini(values: number[]): number;
//# sourceMappingURL=gini.d.ts.map
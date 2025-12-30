/**
 * Utility for displaying "No data" message in charts
 */
/**
 * Create a text mark to display when no data is available.
 *
 * @param data - The data array to check
 * @param message - Custom message to display (default: "No data available")
 * @returns Array of Plot marks (empty if data exists, text mark if no data)
 *
 * @example
 * ```typescript
 * Plot.plot({
 *   marks: [
 *     Plot.dot(data, {...}),
 *     ...noDataTextMark(data)
 *   ]
 * })
 * ```
 */
export declare function noDataTextMark(data: any[], message?: string): any[];
//# sourceMappingURL=noDataTextMark.d.ts.map
/**
 * Utility for displaying "No data" message in charts
 */
import * as Plot from "@observablehq/plot";
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
export function noDataTextMark(data, message = "No data available") {
    if (data.length === 0) {
        return [
            Plot.text([message], {
                frameAnchor: "middle",
                fontSize: 16,
                fill: "#999"
            })
        ];
    }
    return [];
}

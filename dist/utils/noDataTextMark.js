/**
 * Utility for displaying "No data" message in charts
 */
/**
 * Create a text mark spec to display when no data is available.
 *
 * @param data - The data array to check
 * @param message - Custom message to display (default: "No data available")
 * @returns Array with text mark config (empty if data exists, text mark spec if no data)
 *
 * @example
 * ```typescript
 * import * as Plot from "npm:@observablehq/plot";
 *
 * Plot.plot({
 *   marks: [
 *     Plot.dot(data, {...}),
 *     ...noDataTextMark(data, Plot)
 *   ]
 * })
 * ```
 */
export function noDataTextMark(data, Plot, message = "No data available") {
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

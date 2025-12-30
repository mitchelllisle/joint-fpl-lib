/**
 * Color scheme utilities for charts
 */
/**
 * Color scheme configuration for Observable Plot
 */
export interface ColourScheme {
    domain: string[];
    range: string[];
    legend?: boolean;
}
/**
 * Default color scheme using Premier League brand colors
 */
export declare const colours: ColourScheme;
/**
 * Create a custom color scheme for teams
 *
 * @param teamNames - Array of team names
 * @param colors - Array of hex color codes
 * @returns ColourScheme object for use with Observable Plot
 *
 * @example
 * ```typescript
 * const myColors = createColorScheme(
 *   ["Team A", "Team B"],
 *   ["#ff0000", "#00ff00"]
 * );
 * ```
 */
export declare function createColorScheme(teamNames: string[], colors: string[]): ColourScheme;
/**
 * Won/lose/draw colors for match result visualizations
 */
export declare const won = "#6cc5b0";
export declare const lose = "#ff725c";
export declare const draw = "#ffab00";
//# sourceMappingURL=colours.d.ts.map
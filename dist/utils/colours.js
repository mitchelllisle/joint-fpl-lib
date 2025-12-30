/**
 * Color scheme utilities for charts
 */
/**
 * Default color scheme using Premier League brand colors
 */
export const colours = {
    domain: ["Thrillhouse", "youngsandwich", "Not the Wirtz Team", "Endo Days"],
    range: ["#00ff85", "#e90052", "#963cff", "#04f5ff"]
};
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
export function createColorScheme(teamNames, colors) {
    if (teamNames.length !== colors.length) {
        throw new Error("Team names and colors arrays must have the same length");
    }
    return {
        domain: teamNames,
        range: colors
    };
}
/**
 * Won/lose/draw colors for match result visualizations
 */
export const won = "#6cc5b0";
export const lose = "#ff725c";
export const draw = "#ffab00";

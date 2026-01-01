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
export const colours: ColourScheme = {
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
export function createColorScheme(teamNames: string[], colors: string[]): ColourScheme {
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
export const won = "#00ff85";
export const lose = "#e90052";
export const draw = "#ffab00";

/**
 * Type definitions for FPL Draft API responses
 */

/**
 * Bootstrap static data containing all game information
 */
export interface BootstrapStatic {
  events: GameWeek[];
  elements: Player[];
  element_types: Position[];
  teams: Team[];
}

/**
 * Represents a gameweek in the season
 */
export interface GameWeek {
  id: number;
  name: string;
  deadline_time: string;
  is_current: boolean;
  is_next: boolean;
  finished: boolean;
}

/**
 * Player data from the bootstrap endpoint
 */
export interface Player {
  id: number;
  first_name: string;
  second_name: string;
  web_name: string;
  element_type: number;
  team: number;
  total_points: number;
  event_points: number;
  minutes: number;
  goals_scored: number;
  assists: number;
  clean_sheets: number;
  bonus: number;
  bps: number;
  now_cost: number;
  form: string;
  [key: string]: any;
}

/**
 * Position type (GK, DEF, MID, FWD)
 */
export interface Position {
  id: number;
  singular_name: string;
  singular_name_short: string;
  plural_name: string;
  plural_name_short: string;
}

/**
 * Premier League team
 */
export interface Team {
  id: number;
  name: string;
  short_name: string;
  code: number;
}

/**
 * Draft league details
 */
export interface LeagueDetails {
  league_entries: LeagueEntry[];
  standings: Standing[];
}

/**
 * Entry in a draft league
 */
export interface LeagueEntry {
  entry_id: number;
  entry_name: string;
  player_first_name: string;
  player_last_name: string;
}

/**
 * League standing for a team
 */
export interface Standing {
  league_entry: number;
  total: number;
  event_total: number;
  rank: number;
  last_rank: number;
}

/**
 * Match result data by gameweek
 */
export interface MatchResult {
  gameweek: number;
  player_first_name: string;
  team: string;
  total: number;
  points: number;
  entry_id: number;
  rank: number;
}

/**
 * Squad data with ownership
 */
export interface Squad extends Player {
  owner: string;
  team_name: string;
  position: number;
}

/**
 * Options for chart components
 */
export interface ChartOptions {
  width?: number;
  height?: number;
  [key: string]: any;
}

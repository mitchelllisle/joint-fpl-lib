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
    status: string;
    chance_of_playing_this_round: number | null;
    chance_of_playing_next_round: number | null;
    cost_change_start: number;
    cost_change_event: number;
    ep_next: string;
    ep_this: string;
    in_dreamteam: boolean;
    news: string;
    news_added: string | null;
    selected_by_percent: string;
    special: boolean;
    points_per_game: string;
    transfers_in: number;
    transfers_out: number;
    transfers_in_event: number;
    transfers_out_event: number;
    value_form: string;
    value_season: string;
    photo: string;
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
    id: number;
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
    marginTop?: number;
    marginRight?: number;
    marginBottom?: number;
    marginLeft?: number;
}
//# sourceMappingURL=index.d.ts.map
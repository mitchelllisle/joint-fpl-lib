/**
 * API client for Fantasy Premier League Draft endpoints
 */
import type { BootstrapStatic, LeagueDetails } from '../types/index.js';
/**
 * Client for interacting with FPL Draft API
 *
 * @example
 * ```typescript
 * const api = new PremierLeagueAPI();
 * const bootstrap = await api.getBootstrapStatic();
 * const details = await api.getDetails(6293);
 * ```
 */
export declare class PremierLeagueAPI {
    private readonly draftBaseUrl;
    private readonly baseUrl;
    /**
     * Fetch bootstrap-static data containing all game information
     *
     * @returns Promise resolving to bootstrap data (players, teams, gameweeks)
     */
    getBootstrapStatic(): Promise<BootstrapStatic>;
    /**
     * Fetch league details for a specific draft league
     *
     * @param leagueId - The draft league ID
     * @returns Promise resolving to league details (entries, standings)
     */
    getDetails(leagueId: number): Promise<LeagueDetails>;
    /**
     * Fetch gameweek history for a specific entry
     *
     * @param entryId - The entry ID
     * @returns Promise resolving to history data
     */
    getUserHistory(entryId: number): Promise<any>;
    /**
     * Fetch current squad picks for an entry in a specific gameweek
     *
     * @param entryId - The entry ID
     * @param gameweek - The gameweek number
     * @returns Promise resolving to picks data
     */
    getPicks(entryId: number, gameweek: number): Promise<any>;
}
//# sourceMappingURL=api.d.ts.map
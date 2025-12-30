/**
 * API client for Fantasy Premier League Draft endpoints
 */
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
export class PremierLeagueAPI {
    draftBaseUrl = 'https://draft.premierleague.com/api';
    baseUrl = 'https://fantasy.premierleague.com/api';
    /**
     * Fetch bootstrap-static data containing all game information
     *
     * @returns Promise resolving to bootstrap data (players, teams, gameweeks)
     */
    async getBootstrapStatic() {
        const response = await fetch(`${this.baseUrl}/bootstrap-static/`);
        if (!response.ok) {
            throw new Error(`Failed to fetch bootstrap-static: ${response.statusText}`);
        }
        return response.json();
    }
    /**
     * Fetch league details for a specific draft league
     *
     * @param leagueId - The draft league ID
     * @returns Promise resolving to league details (entries, standings)
     */
    async getDetails(leagueId) {
        const response = await fetch(`${this.draftBaseUrl}/league/${leagueId}/details`);
        if (!response.ok) {
            throw new Error(`Failed to fetch league details: ${response.statusText}`);
        }
        return response.json();
    }
    /**
     * Fetch gameweek history for a specific entry
     *
     * @param entryId - The entry ID
     * @returns Promise resolving to history data
     */
    async getUserHistory(entryId) {
        const response = await fetch(`${this.draftBaseUrl}/entry/${entryId}/history`);
        if (!response.ok) {
            throw new Error(`Failed to fetch user history: ${response.statusText}`);
        }
        return response.json();
    }
    /**
     * Fetch current squad picks for an entry in a specific gameweek
     *
     * @param entryId - The entry ID
     * @param gameweek - The gameweek number
     * @returns Promise resolving to picks data
     */
    async getPicks(entryId, gameweek) {
        const response = await fetch(`${this.draftBaseUrl}/entry/${entryId}/event/${gameweek}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch picks: ${response.statusText}`);
        }
        return response.json();
    }
}

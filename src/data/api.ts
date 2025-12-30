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
export class PremierLeagueAPI {
  private readonly draftBaseUrl = 'https://draft.premierleague.com/api';
  private readonly baseUrl = 'https://fantasy.premierleague.com/api';

  /**
   * Fetch bootstrap-static data containing all game information
   * 
   * @returns Promise resolving to bootstrap data (players, teams, gameweeks)
   */
  async getBootstrapStatic(): Promise<BootstrapStatic> {
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
  async getDetails(leagueId: number): Promise<LeagueDetails> {
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
  async getUserHistory(entryId: number): Promise<any> {
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
  async getPicks(entryId: number, gameweek: number): Promise<any> {
    const response = await fetch(`${this.draftBaseUrl}/entry/${entryId}/event/${gameweek}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch picks: ${response.statusText}`);
    }
    return response.json();
  }
}

/**
 * API client for Fantasy Premier League Draft endpoints
 */

import type { BootstrapStatic, LeagueDetails } from '../types/index.js';

export interface GameweekData {
  gameweek: number;
  player_first_name: string;
  team: string;
  total: number;
  points: number;
  entry_id: number;
  rank: number;
}

export interface MatchResult {
  title: string;
  sentence: string;
  data: GameweekData[];
}

export interface StandingsEntry {
  id: number;
  name: string;
  user: string;
  rank: number;
  total: number;
  event_total: number;
  last_rank: number;
}

export interface SquadPlayer {
  id: number;
  web_name: string;
  first_name: string;
  second_name: string;
  team: number;
  element_type: number;
  now_cost: number;
  total_points: number;
  owner: string;
  team_name: string;
  position: number;
  [key: string]: any;
}

/**
 * Client for interacting with FPL Draft API
 * 
 * @example
 * ```typescript
 * const api = new PremierLeagueAPI();
 * const bootstrap = await api.getBootstrapStatic();
 * const details = await api.getDetails(6293);
 * const matchResults = await api.getMatchResults(6293);
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

  /**
   * Get match results with gameweek history and rankings
   * 
   * @param leagueId - The draft league ID
   * @returns Promise resolving to match results with gameweek data
   */
  async getMatchResults(leagueId: number): Promise<MatchResult> {
    const details = await this.getDetails(leagueId);
    const standings = details.standings;
    const league_entries = details.league_entries;

    const standingsWithUsers = await Promise.all(
      standings.map(async (s: any) => {
        const user = league_entries.find((u: any) => u.id === s.league_entry);
        if (!user) return [];
        
        const history = await this.getUserHistory(user.entry_id);

        const gameweekData = (history.history || []).map((week: any) => ({
          gameweek: week.event,
          player_first_name: user.player_first_name,
          team: user.entry_name,
          total: week.total_points,
          points: week.points,
          entry_id: user.entry_id,
          rank: 0 // Will be calculated later
        }));

        return gameweekData;
      })
    );

    const allData = standingsWithUsers.flat();

    if (allData.length === 0) {
      return {
        title: "No Data",
        sentence: "No gameweek data available yet.",
        data: []
      };
    }

    // Calculate ranks for each gameweek
    const gameweeks = [...new Set(allData.map(d => d.gameweek))];
    const rankedData: GameweekData[] = [];

    for (const gw of gameweeks) {
      const gwData = allData
        .filter(d => d.gameweek === gw)
        .sort((a, b) => b.total - a.total);

      gwData.forEach((item, index) => {
        rankedData.push({
          ...item,
          rank: index + 1
        });
      });
    }

    const maxGameweek = Math.max(...rankedData.map(d => d.gameweek));
    const title = `Gameweek ${maxGameweek} Standings`;
    const sentence = "Latest standings from the draft league.";

    return {
      title,
      sentence,
      data: rankedData
    };
  }

  /**
   * Get current standings
   * 
   * @param leagueId - The draft league ID
   * @returns Promise resolving to standings entries
   */
  async getStandings(leagueId: number): Promise<StandingsEntry[]> {
    const details = await this.getDetails(leagueId);
    const league_entries = details.league_entries;

    const standings = details.standings.map((e: any) => ({
      id: e.league_entry,
      name: league_entries.find((u: any) => u.id === e.league_entry)?.entry_name || '',
      user: league_entries.find((u: any) => u.id === e.league_entry)?.player_first_name || '',
      rank: e.rank,
      total: e.total,
      event_total: e.event_total,
      last_rank: e.last_rank
    }));

    return standings;
  }

  /**
   * Get squad data with picks for current gameweek
   * 
   * @param leagueId - The draft league ID
   * @returns Promise resolving to squad player data
   */
  async getSquads(leagueId: number): Promise<SquadPlayer[]> {
    const details = await this.getDetails(leagueId);
    const bootstrap = await this.getBootstrapStatic();
    
    const currentEvent = bootstrap.events.find((e: any) => e.is_current);
    const currentGameweek = currentEvent ? currentEvent.id : 1;

    // Create player map
    const playerMap: Record<number, any> = {};
    bootstrap.elements.forEach((player: any) => {
      playerMap[player.id] = {
        ...player,
        web_name: player.web_name || `${player.first_name} ${player.second_name}`
      };
    });

    // Fetch picks for each team
    const squadsWithPicks = await Promise.all(
      details.league_entries.map(async (entry: any) => {
        try {
          const picksData = await this.getPicks(entry.entry_id, currentGameweek);

          return picksData.picks.map((pick: any) => {
            const player = playerMap[pick.element];
            if (!player) return null;

            return {
              ...player,
              owner: entry.entry_name,
              team_name: entry.entry_name,
              position: pick.position
            };
          }).filter((p: any) => p !== null);
        } catch (error) {
          console.error(`Error fetching picks for ${entry.player_first_name}:`, error);
          return [];
        }
      })
    );

    return squadsWithPicks.flat();
  }
}

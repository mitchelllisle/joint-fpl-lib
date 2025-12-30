/**
 * Data loader functions for transforming FPL API data
 */

import { PremierLeagueAPI } from './api.js';
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
 * Get match results with gameweek history and rankings
 */
export async function getMatchResults(api: PremierLeagueAPI, leagueId: number): Promise<MatchResult> {
  const details = await api.getDetails(leagueId);
  const standings = details.standings;
  const league_entries = details.league_entries;

  const standingsWithUsers = await Promise.all(
    standings.map(async (s: any) => {
      const user = league_entries.find((u: any) => u.id === s.league_entry);
      if (!user) return [];
      
      const history = await api.getUserHistory(user.entry_id);

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
 */
export async function getStandings(api: PremierLeagueAPI, leagueId: number): Promise<StandingsEntry[]> {
  const details = await api.getDetails(leagueId);
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
 */
export async function getSquads(api: PremierLeagueAPI, leagueId: number): Promise<SquadPlayer[]> {
  const details = await api.getDetails(leagueId);
  const bootstrap = await api.getBootstrapStatic();
  
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
        const picksData = await api.getPicks(entry.entry_id, currentGameweek);

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

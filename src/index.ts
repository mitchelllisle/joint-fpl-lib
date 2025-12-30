/**
 * Joint FPL Charts Library
 * 
 * A TypeScript library for building Fantasy Premier League Draft dashboards
 * with Observable Framework.
 * 
 * @packageDocumentation
 */

// Data loaders and API
export { PremierLeagueAPI } from './data/premierLeagueApi.js';
export type { 
  GameweekData, 
  MatchResult, 
  StandingsEntry, 
  SquadPlayer 
} from './data/premierLeagueApi.js';
export type { BootstrapStatic, LeagueDetails } from './types/index.js';

// Chart components
export { bumpChart } from './charts/bumpChart.js';
export { giniIndexChart } from './charts/giniIndexChart.js';
export { bonusPoints } from './charts/bonusPoints.js';
export { benchPoints } from './charts/benchPoints.js';
export { consistencyBullet } from './charts/consistencyBullet.js';
export { formChart } from './charts/formChart.js';
export { pointsBarChart } from './charts/pointsBarChart.js';
export { pointsPerWeek } from './charts/pointsPerWeek.js';
export { positionBreakdown } from './charts/positionBreakdown.js';

// Utilities
export { colours, type ColourScheme } from './utils/colours.js';
export { calculateGini } from './utils/gini.js';
export { noDataTextMark } from './utils/noDataTextMark.js';

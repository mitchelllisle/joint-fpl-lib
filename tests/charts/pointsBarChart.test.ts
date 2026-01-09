// @ts-nocheck
import { describe, it, expect, vi } from 'vitest';
import { pointsBarChart } from '../../src/charts/pointsBarChart';

const mockPlot = {
  plot: vi.fn((config) => config),
  barY: vi.fn((data, options) => ({ type: 'barY', data, options })),
  lineY: vi.fn((data, options) => ({ type: 'lineY', data, options })),
  ruleY: vi.fn((values) => ({ type: 'ruleY', values })),
  windowY: vi.fn((size, options) => options),
  text: vi.fn((data, options) => ({ type: 'text', data, options }))
};

const mockD3 = {};

describe('pointsBarChart', () => {
  const mockData = [
    { gameweek: 1, points: 50, team: 'Team A' },
    { gameweek: 2, points: 60, team: 'Team A' },
    { gameweek: 3, points: 55, team: 'Team A' },
    { gameweek: 1, points: 45, team: 'Team B' },
    { gameweek: 2, points: 55, team: 'Team B' },
    { gameweek: 3, points: 50, team: 'Team B' }
  ];

  it('renders a chart with default title and subtitle', () => {
    const result = pointsBarChart(mockData, { Plot: mockPlot, d3: mockD3, width: 800 });
    
    expect(mockPlot.plot).toHaveBeenCalled();
    expect(result.title).toBe('Score per Gameweek');
    expect(result.subtitle).toBe('Shows the total score for each player over the course of the season');
  });

  it('accepts custom title and subtitle', () => {
    const customTitle = 'Custom Bar Title';
    const customSubtitle = 'Custom bar subtitle';
    
    const result = pointsBarChart(mockData, { 
      Plot: mockPlot, 
      d3: mockD3, 
      width: 800,
      title: customTitle,
      subtitle: customSubtitle
    });
    
    expect(result.title).toBe(customTitle);
    expect(result.subtitle).toBe(customSubtitle);
  });

  it('has correct chart configuration', () => {
    const result = pointsBarChart(mockData, { Plot: mockPlot, d3: mockD3, width: 800 });
    
    expect(result.width).toBe(800);
    expect(result.style).toBe('overflow: visible;');
    expect(result.y).toBeDefined();
    expect(result.color).toBeDefined();
    expect(result.marks).toBeDefined();
  });

  it('handles empty data gracefully', () => {
    const result = pointsBarChart([], { Plot: mockPlot, d3: mockD3, width: 800 });
    
    expect(mockPlot.plot).toHaveBeenCalled();
    expect(result).toBeDefined();
  });
});

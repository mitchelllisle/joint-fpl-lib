// @ts-nocheck
import { describe, it, expect, vi } from 'vitest';
import { pointsPerWeek } from '../../src/charts/pointsPerWeek';

const mockPlot = {
  plot: vi.fn((config) => config),
  lineY: vi.fn((data, options) => ({ type: 'lineY', data, options })),
  dot: vi.fn((data, options) => ({ type: 'dot', data, options })),
  ruleY: vi.fn((values) => ({ type: 'ruleY', values })),
  axisY: vi.fn((options) => ({ type: 'axisY', options })),
  axisX: vi.fn((options) => ({ type: 'axisX', options })),
  text: vi.fn((data, options) => ({ type: 'text', data, options })),
  selectLast: vi.fn((options) => options)
};

const mockD3 = {};

describe('pointsPerWeek', () => {
  const mockData = [
    { gameweek: 1, total: 50, team: 'Team A' },
    { gameweek: 2, total: 110, team: 'Team A' },
    { gameweek: 3, total: 165, team: 'Team A' },
    { gameweek: 1, total: 45, team: 'Team B' },
    { gameweek: 2, total: 100, team: 'Team B' },
    { gameweek: 3, total: 150, team: 'Team B' }
  ];

  it('renders a chart with default title and subtitle', () => {
    const result = pointsPerWeek(mockData, { Plot: mockPlot, d3: mockD3, width: 800 });
    
    expect(mockPlot.plot).toHaveBeenCalled();
    expect(result.title).toBe('Points per Gameweek');
    expect(result.subtitle).toBe('Shows a cumulative points total for each player over the course of the season');
  });

  it('accepts custom title and subtitle', () => {
    const customTitle = 'Custom Points Title';
    const customSubtitle = 'Custom points subtitle';
    
    const result = pointsPerWeek(mockData, { 
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
    const result = pointsPerWeek(mockData, { Plot: mockPlot, d3: mockD3, width: 800 });
    
    expect(result.width).toBe(800);
    expect(result.style).toBe('overflow: visible;');
    expect(result.y).toBeDefined();
    expect(result.color).toBeDefined();
    expect(result.marks).toBeDefined();
  });

  it('handles empty data gracefully', () => {
    const result = pointsPerWeek([], { Plot: mockPlot, d3: mockD3, width: 800 });
    
    expect(mockPlot.plot).toHaveBeenCalled();
    expect(result).toBeDefined();
  });
});

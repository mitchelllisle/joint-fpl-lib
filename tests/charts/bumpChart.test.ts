// @ts-nocheck
import { describe, it, expect, vi } from 'vitest';
import { bumpChart } from '../../src/charts/bumpChart';

const mockPlot = {
  plot: vi.fn((config) => config),
  line: vi.fn((data, options) => ({ type: 'line', data, options })),  lineY: vi.fn((data, options) => ({ type: 'lineY', data, options })),  dot: vi.fn((data, options) => ({ type: 'dot', data, options })),
  text: vi.fn((data, options) => ({ type: 'text', data, options })),
  stackY2: vi.fn((options) => options),
  valueof: vi.fn((data, key) => data.map(d => d[key]))
};

const mockD3 = {
  extent: vi.fn((data) => [Math.min(...data), Math.max(...data)])
};

describe('bumpChart', () => {
  const mockData = [
    { gameweek: 1, rank: 1, team: 'Team A' },
    { gameweek: 2, rank: 2, team: 'Team A' },
    { gameweek: 1, rank: 2, team: 'Team B' },
    { gameweek: 2, rank: 1, team: 'Team B' }
  ];

  it('renders a chart with default title and subtitle', () => {
    const result = bumpChart(mockData, { Plot: mockPlot, d3: mockD3, width: 800 });
    
    expect(mockPlot.plot).toHaveBeenCalled();
    expect(result.title).toBe('Rank Across Gameweeks');
    expect(result.subtitle).toBe('Shows the rankings as they change throughout the season');
  });

  it('accepts custom title and subtitle', () => {
    const customTitle = 'Custom Rank Title';
    const customSubtitle = 'Custom rank subtitle';
    
    const result = bumpChart(mockData, { 
      Plot: mockPlot, 
      d3: mockD3, 
      width: 800,
      title: customTitle,
      subtitle: customSubtitle
    });
    
    expect(result.title).toBe(customTitle);
    expect(result.subtitle).toBe(customSubtitle);
  });

  it('accepts custom x, y, z parameters', () => {
    const result = bumpChart(mockData, { 
      Plot: mockPlot, 
      d3: mockD3, 
      width: 800,
      x: 'week',
      y: 'position',
      z: 'player'
    });
    
    expect(mockPlot.plot).toHaveBeenCalled();
    expect(result).toBeDefined();
  });

  it('has correct chart configuration', () => {
    const result = bumpChart(mockData, { Plot: mockPlot, d3: mockD3, width: 800 });
    
    expect(result.width).toBe(800);
    expect(result.marginLeft).toBe(100);
    expect(result.marginRight).toBe(100);
    expect(result.x).toBeDefined();
    expect(result.y).toBeDefined();
    expect(result.color).toBeDefined();
    expect(result.marks).toBeDefined();
  });
});

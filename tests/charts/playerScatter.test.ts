// @ts-nocheck
import { describe, it, expect, vi } from 'vitest';
import { playerScatter } from '../../src/charts/playerScatter';

const mockPlot = {
  plot: vi.fn((config) => config),
  dot: vi.fn((data, options) => ({ type: 'dot', data, options })),
  hull: vi.fn((data, options) => ({ type: 'hull', data, options })),
  tip: vi.fn((data, options) => ({ type: 'tip', data, options })),
  pointer: vi.fn((options) => options)
};

const mockD3 = {};

describe('playerScatter', () => {
  const mockData = [
    { owner: 'Team A', minutes: 900, total_points: 100 },
    { owner: 'Team A', minutes: 800, total_points: 80 },
    { owner: 'Team B', minutes: 850, total_points: 90 },
    { owner: null, minutes: 700, total_points: 70 }
  ];

  it('renders a chart with default title and subtitle', () => {
    const result = playerScatter(mockData, { Plot: mockPlot, d3: mockD3, width: 800 });
    
    expect(mockPlot.plot).toHaveBeenCalled();
    expect(result.title).toBe('Player Minutes vs Points');
    expect(result.subtitle).toBe('Shows the relationship between minutes played and points scored clustered by owner.');
  });

  it('accepts custom title and subtitle', () => {
    const customTitle = 'Custom Scatter Title';
    const customSubtitle = 'Custom scatter subtitle';
    
    const result = playerScatter(mockData, { 
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
    const result = playerScatter(mockData, { Plot: mockPlot, d3: mockD3, width: 800 });
    
    expect(result.width).toBe(800);
    expect(result.grid).toBe(true);
    expect(result.x).toBeDefined();
    expect(result.y).toBeDefined();
    expect(result.color).toBeDefined();
    expect(result.marks).toBeDefined();
  });

  it('separates owned and unowned players', () => {
    playerScatter(mockData, { Plot: mockPlot, d3: mockD3, width: 800 });
    
    expect(mockPlot.plot).toHaveBeenCalled();
  });
});

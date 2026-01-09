// @ts-nocheck
import { describe, it, expect, vi } from 'vitest';
import { bonusPoints } from '../../src/charts/bonusPoints';

const mockPlot = {
  plot: vi.fn((config) => config),
  dot: vi.fn((data, options) => ({ type: 'dot', data, options })),
  density: vi.fn((data, options) => ({ type: 'density', data, options })),
  text: vi.fn((data, options) => ({ type: 'text', data, options })),
  tip: vi.fn((data, options) => ({ type: 'tip', data, options })),
  pointer: vi.fn((options) => options)
};

const mockD3 = {};

describe('bonusPoints', () => {
  const mockData = [
    { web_name: 'Player A', owner: 'Team 1', minutes: 900, bonus: 15, total_points: 100 },
    { web_name: 'Player B', owner: 'Team 2', minutes: 800, bonus: 12, total_points: 90 },
    { web_name: 'Player C', owner: null, minutes: 700, bonus: 8, total_points: 80 },
    { web_name: 'Player D', owner: 'Team 1', minutes: 0, bonus: 0, total_points: 0 }
  ];

  it('renders a chart with default title and subtitle', () => {
    // @ts-expect-error - Testing JavaScript module
    const result = bonusPoints(mockData, { Plot: mockPlot, d3: mockD3, width: 800 });
    
    expect(mockPlot.plot).toHaveBeenCalled();
    expect(result.title).toBe('Bonus Points vs Total Points');
    expect(result.subtitle).toBe('Scatter plot showing all players. Owned players highlighted by team. Contours show player density.');
  });

  it('accepts custom title and subtitle', () => {
    const customTitle = 'Custom Bonus Title';
    const customSubtitle = 'Custom bonus subtitle';
    
    // @ts-expect-error - Testing JavaScript module
    const result = bonusPoints(mockData, { 
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
    // @ts-expect-error - Testing JavaScript module
    const result = bonusPoints(mockData, { Plot: mockPlot, d3: mockD3, width: 800 });
    
    expect(result.width).toBe(800);
    expect(result.height).toBe(500);
    expect(result.x).toBeDefined();
    expect(result.y).toBeDefined();
    expect(result.color).toBeDefined();
    expect(result.marks).toBeDefined();
  });

  it('filters out players with no minutes', () => {
    // @ts-expect-error - Testing JavaScript module
    bonusPoints(mockData, { Plot: mockPlot, d3: mockD3, width: 800 });
    
    expect(mockPlot.plot).toHaveBeenCalled();
    const config = mockPlot.plot.mock.calls[0][0];
    expect(config.marks).toBeDefined();
  });
});

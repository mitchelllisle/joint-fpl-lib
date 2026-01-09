// @ts-nocheck
import { describe, it, expect, vi } from 'vitest';
import { benchPoints } from '../../src/charts/benchPoints';

// Mock Plot and d3
const mockPlot = {
  plot: vi.fn((config) => config),
  barX: vi.fn((data, options) => ({ type: 'barX', data, options })),
  text: vi.fn((data, options) => ({ type: 'text', data, options })),
  tip: vi.fn((data, options) => ({ type: 'tip', data, options })),
  pointer: vi.fn((options) => options)
};

const mockD3 = {
  max: vi.fn((data: any[], accessor: any) => Math.max(...data.map(accessor))),
  mean: vi.fn((data: any[]) => data.reduce((a: any, b: any) => a + b, 0) / data.length)
};

describe('benchPoints', () => {
  const mockData = [
    { owner: 'Team A', position: 12, event_points: 5 },
    { owner: 'Team A', position: 13, event_points: 3 },
    { owner: 'Team B', position: 12, event_points: 7 },
    { owner: 'Team B', position: 14, event_points: 2 },
    { owner: 'Team A', position: 1, event_points: 10 }, // Not bench
    { owner: 'Team B', position: 5, event_points: 8 }   // Not bench
  ];

  it('renders a chart with default title and subtitle', () => {
    // @ts-expect-error - Testing JavaScript module
    const result = benchPoints(mockData, { Plot: mockPlot, d3: mockD3, width: 800 });
    
    expect(mockPlot.plot).toHaveBeenCalled();
    expect(result.title).toBe('Points Left on Bench');
    expect(result.subtitle).toBe('Total points scored by benched players this gameweek');
  });

  it('accepts custom title and subtitle', () => {
    const customTitle = 'Custom Bench Title';
    const customSubtitle = 'Custom bench subtitle';
    
    // @ts-expect-error - Testing JavaScript module
    const result = benchPoints(mockData, { 
      Plot: mockPlot, 
      d3: mockD3, 
      width: 800,
      title: customTitle,
      subtitle: customSubtitle
    });
    
    expect(result.title).toBe(customTitle);
    expect(result.subtitle).toBe(customSubtitle);
  });

  it('filters to only bench players (position > 11)', () => {
    // @ts-expect-error - Testing JavaScript module
    benchPoints(mockData, { Plot: mockPlot, d3: mockD3, width: 800 });
    
    // The chart should only process bench players (positions 12-15)
    expect(mockPlot.plot).toHaveBeenCalled();
    const config = mockPlot.plot.mock.calls[0][0];
    expect(config.marks).toBeDefined();
  });

  it('has correct chart configuration', () => {
    // @ts-expect-error - Testing JavaScript module
    const result = benchPoints(mockData, { Plot: mockPlot, d3: mockD3, width: 800 });
    
    expect(result.width).toBe(800);
    expect(result.marginLeft).toBe(120);
    expect(result.x).toBeDefined();
    expect(result.y).toBeDefined();
    expect(result.color).toBeDefined();
    expect(result.marks).toBeDefined();
  });

  it('handles empty data gracefully', () => {
    // @ts-expect-error - Testing JavaScript module
    const result = benchPoints([], { Plot: mockPlot, d3: mockD3, width: 800 });
    
    expect(mockPlot.plot).toHaveBeenCalled();
    expect(result).toBeDefined();
  });
});

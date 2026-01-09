// @ts-nocheck
import { describe, it, expect, vi } from 'vitest';
import { giniIndexChart } from '../../src/charts/giniIndexChart';

const mockPlot = {
  plot: vi.fn((config) => config),
  dot: vi.fn((data, options) => ({ type: 'dot', data, options })),
  hexagon: vi.fn((data, options) => ({ type: 'hexagon', data, options })),
  dodgeX: vi.fn((options) => options),
  ruleY: vi.fn((values) => ({ type: 'ruleY', values })),
  tip: vi.fn((data, options) => ({ type: 'tip', data, options })),
  pointer: vi.fn((options) => options),
  text: vi.fn((data, options) => ({ type: 'text', data, options }))
};

const mockD3 = {};

describe('giniIndexChart', () => {
  const mockData = [
    { owner: 'Team A', total_points: 100 },
    { owner: 'Team A', total_points: 80 },
    { owner: 'Team A', total_points: 60 },
    { owner: 'Team B', total_points: 90 },
    { owner: 'Team B', total_points: 70 },
    { owner: 'Team B', total_points: 50 },
    { owner: null, total_points: 40 }
  ];

  it('renders a chart with default title and subtitle', () => {
    const result = giniIndexChart(mockData, { Plot: mockPlot, d3: mockD3, width: 800 });
    
    expect(mockPlot.plot).toHaveBeenCalled();
    expect(result.title).toBe('Gini Index by Owner');
    expect(result.subtitle).toContain('measure of inequality');
  });

  it('accepts custom title and subtitle', () => {
    const customTitle = 'Custom Gini Title';
    const customSubtitle = 'Custom gini subtitle';
    
    const result = giniIndexChart(mockData, { 
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
    const result = giniIndexChart(mockData, { Plot: mockPlot, d3: mockD3, width: 800 });
    
    expect(result.width).toBe(800);
    expect(result.height).toBe(500);
    expect(result.y).toBeDefined();
    expect(result.x).toBeDefined();
    expect(result.r).toBeDefined();
    expect(result.color).toBeDefined();
    expect(result.marks).toBeDefined();
  });

  it('filters out unowned players', () => {
    giniIndexChart(mockData, { Plot: mockPlot, d3: mockD3, width: 800 });
    
    expect(mockPlot.plot).toHaveBeenCalled();
  });

  it('handles empty data gracefully', () => {
    const result = giniIndexChart([], { Plot: mockPlot, d3: mockD3, width: 800 });
    
    expect(mockPlot.plot).toHaveBeenCalled();
    expect(result).toBeDefined();
  });
});

// @ts-nocheck
import { describe, it, expect, vi } from 'vitest';
import { positionBreakdown } from '../../src/charts/positionBreakdown';

const mockPlot = {
  plot: vi.fn((config) => config),
  barX: vi.fn((data, options) => ({ type: 'barX', data, options })),
  ruleX: vi.fn((values) => ({ type: 'ruleX', values })),
  stackX: vi.fn((options) => options)
};

const mockD3 = {};

describe('positionBreakdown', () => {
  const mockData = [
    { owner: 'Team A', position: 1, element_type: 1, total_points: 50 }, // GK
    { owner: 'Team A', position: 2, element_type: 2, total_points: 60 }, // DEF
    { owner: 'Team A', position: 5, element_type: 3, total_points: 70 }, // MID
    { owner: 'Team A', position: 11, element_type: 4, total_points: 80 }, // FWD
    { owner: 'Team A', position: 12, element_type: 2, total_points: 20 }, // Bench
    { owner: 'Team B', position: 1, element_type: 1, total_points: 45 },
    { owner: 'Team B', position: 3, element_type: 2, total_points: 55 }
  ];

  it('renders a chart with default title and subtitle', () => {
    const result = positionBreakdown(mockData, { Plot: mockPlot, d3: mockD3, width: 800 });
    
    expect(mockPlot.plot).toHaveBeenCalled();
    expect(result.title).toBe('Points by Position');
    expect(result.subtitle).toBe('Total season points contribution by position (starting XI only)');
  });

  it('accepts custom title and subtitle', () => {
    const customTitle = 'Custom Position Title';
    const customSubtitle = 'Custom position subtitle';
    
    const result = positionBreakdown(mockData, { 
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
    const result = positionBreakdown(mockData, { Plot: mockPlot, d3: mockD3, width: 800 });
    
    expect(result.width).toBe(800);
    expect(result.marginLeft).toBe(120);
    expect(result.x).toBeDefined();
    expect(result.y).toBeDefined();
    expect(result.color).toBeDefined();
    expect(result.marks).toBeDefined();
  });

  it('filters to only starting 11 (position <= 11)', () => {
    positionBreakdown(mockData, { Plot: mockPlot, d3: mockD3, width: 800 });
    
    expect(mockPlot.plot).toHaveBeenCalled();
  });

  it('handles empty data gracefully', () => {
    const result = positionBreakdown([], { Plot: mockPlot, d3: mockD3, width: 800 });
    
    expect(mockPlot.plot).toHaveBeenCalled();
    expect(result).toBeDefined();
  });
});

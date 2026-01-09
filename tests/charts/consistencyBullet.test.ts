// @ts-nocheck
import { describe, it, expect, vi } from 'vitest';
import { consistencyBullet } from '../../src/charts/consistencyBullet';

const mockPlot = {
  plot: vi.fn((config) => config),
  barX: vi.fn((data, options) => ({ type: 'barX', data, options })),
  tickX: vi.fn((data, options) => ({ type: 'tickX', data, options })),
  dot: vi.fn((data, options) => ({ type: 'dot', data, options })),
  tip: vi.fn((data, options) => ({ type: 'tip', data, options })),
  pointer: vi.fn((options) => options)
};

const mockD3 = {
  max: vi.fn((data, accessor) => Math.max(...data.map(accessor))),
  min: vi.fn((data, accessor) => Math.min(...data.map(accessor))),
  mean: vi.fn((data) => data.reduce((a, b) => a + b, 0) / data.length),
  deviation: vi.fn((data) => {
    const mean = data.reduce((a, b) => a + b, 0) / data.length;
    const variance = data.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / data.length;
    return Math.sqrt(variance);
  })
};

describe('consistencyBullet', () => {
  const mockData = [
    { team: 'Team A', points: 50 },
    { team: 'Team A', points: 60 },
    { team: 'Team A', points: 55 },
    { team: 'Team B', points: 40 },
    { team: 'Team B', points: 70 },
    { team: 'Team B', points: 45 }
  ];

  it('renders a chart with default title and subtitle', () => {
    const result = consistencyBullet(mockData, { Plot: mockPlot, d3: mockD3, width: 800 });
    
    expect(mockPlot.plot).toHaveBeenCalled();
    expect(result.title).toBe('Consistency & Performance Range');
    expect(result.subtitle).toBe('Best/worst gameweek with average shown. Shorter bars = more consistent');
  });

  it('accepts custom title and subtitle', () => {
    const customTitle = 'Custom Consistency Title';
    const customSubtitle = 'Custom consistency subtitle';
    
    const result = consistencyBullet(mockData, { 
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
    const result = consistencyBullet(mockData, { Plot: mockPlot, d3: mockD3, width: 800 });
    
    expect(result.width).toBe(800);
    expect(result.marginLeft).toBe(120);
    expect(result.x).toBeDefined();
    expect(result.y).toBeDefined();
    expect(result.color).toBeDefined();
    expect(result.marks).toBeDefined();
  });

  it('calculates stats per owner', () => {
    consistencyBullet(mockData, { Plot: mockPlot, d3: mockD3, width: 800 });
    
    expect(mockD3.mean).toHaveBeenCalled();
    expect(mockD3.deviation).toHaveBeenCalled();
    expect(mockD3.max).toHaveBeenCalled();
    expect(mockD3.min).toHaveBeenCalled();
  });

  it('handles empty data gracefully', () => {
    const result = consistencyBullet([], { Plot: mockPlot, d3: mockD3, width: 800 });
    
    expect(mockPlot.plot).toHaveBeenCalled();
    expect(result).toBeDefined();
  });
});

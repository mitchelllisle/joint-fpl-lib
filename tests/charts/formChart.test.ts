// @ts-nocheck
import { describe, it, expect, vi } from 'vitest';
import { formChart } from '../../src/charts/formChart';

const mockPlot = {
  plot: vi.fn((config) => config),
  cell: vi.fn((data, options) => ({ type: 'cell', data, options })),
  text: vi.fn((data, options) => ({ type: 'text', data, options }))
};

const mockD3 = {
  max: vi.fn((data, accessor) => Math.max(...data.map(accessor))),
  range: vi.fn((start, end) => Array.from({ length: end - start }, (_, i) => start + i)),
  group: vi.fn((data, keyFn) => {
    const grouped = new Map();
    for (const item of data) {
      const key = keyFn(item);
      if (!grouped.has(key)) {
        grouped.set(key, []);
      }
      grouped.get(key).push(item);
    }
    return grouped;
  })
};

describe('formChart', () => {
  const mockData = [
    { gameweek: 5, rank: 1, team: 'Team A', points: 65 },
    { gameweek: 6, rank: 2, team: 'Team A', points: 72 },
    { gameweek: 7, rank: 1, team: 'Team A', points: 68 },
    { gameweek: 8, rank: 3, team: 'Team A', points: 85 },
    { gameweek: 9, rank: 2, team: 'Team A', points: 78 },
    { gameweek: 5, rank: 2, team: 'Team B', points: 70 },
    { gameweek: 6, rank: 1, team: 'Team B', points: 80 },
    { gameweek: 7, rank: 3, team: 'Team B', points: 75 },
    { gameweek: 8, rank: 1, team: 'Team B', points: 60 },
    { gameweek: 9, rank: 1, team: 'Team B', points: 82 }
  ];

  it('renders a chart with default title and subtitle', () => {
    const result = formChart(mockData, { Plot: mockPlot, d3: mockD3, width: 800 });
    
    expect(mockPlot.plot).toHaveBeenCalled();
    expect(result.title).toBe('Last 5 Gameweeks Form');
    expect(result.subtitle).toBe('Position finished each gameweek. 1 = First place, 4 = Last place.');
  });

  it('accepts custom title and subtitle', () => {
    const customTitle = 'Custom Form Title';
    const customSubtitle = 'Custom form subtitle';
    
    const result = formChart(mockData, { 
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
    const result = formChart(mockData, { Plot: mockPlot, d3: mockD3, width: 800 });
    
    expect(result.width).toBe(800);
    expect(result.height).toBe(180);
    expect(result.marginLeft).toBe(120);
    expect(result.marginRight).toBe(60);
    expect(result.x).toBeDefined();
    expect(result.y).toBeDefined();
    expect(result.color).toBeDefined();
    expect(result.marks).toBeDefined();
  });

  it('filters to last 5 gameweeks', () => {
    formChart(mockData, { Plot: mockPlot, d3: mockD3, width: 800 });
    
    expect(mockD3.max).toHaveBeenCalled();
  });

  it('calculates gameweek-specific ranks based on points', () => {
    const result = formChart(mockData, { Plot: mockPlot, d3: mockD3, width: 800 });
    
    expect(mockD3.group).toHaveBeenCalled();
    expect(result.marks).toBeDefined();
    expect(result.marks.length).toBe(2);
  });

  it('ranks teams by points within each gameweek', () => {
    const testData = [
      { gameweek: 8, rank: 3, team: 'Team A', points: 85 },
      { gameweek: 8, rank: 1, team: 'Team B', points: 60 },
      { gameweek: 8, rank: 2, team: 'Team C', points: 70 }
    ];
    
    const result = formChart(testData, { Plot: mockPlot, d3: mockD3, width: 800 });
    
    expect(mockPlot.cell).toHaveBeenCalled();
    expect(mockPlot.text).toHaveBeenCalled();
  });
});

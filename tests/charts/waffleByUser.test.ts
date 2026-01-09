// @ts-nocheck
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { waffleByUser } from '../../src/charts/waffleByUser';

const mockPlot = {
  plot: vi.fn((config) => config),
  cell: vi.fn((data, options) => ({ type: 'cell', data, options })),
  text: vi.fn((data, options) => ({ type: 'text', data, options })),
  axisFx: vi.fn((options) => ({ type: 'axisFx', options })),
  waffleX: vi.fn((data, options) => ({ type: 'waffleX', data, options })),
  groupZ: vi.fn((options) => options)
};

// Make Plot available globally for waffleByUser
beforeEach(() => {
  global.Plot = mockPlot;
});

describe('waffleByUser', () => {
  const mockData = [
    { user: 'Team A', matches_won: 5, matches_lost: 3, matches_drawn: 2 },
    { user: 'Team B', matches_won: 4, matches_lost: 4, matches_drawn: 2 }
  ];

  it('renders a chart with default title and subtitle', () => {
    const result = waffleByUser(mockData, { width: 800, height: 300 });
    
    expect(mockPlot.plot).toHaveBeenCalled();
    expect(result.title).toBe('Match Results');
    expect(result.subtitle).toBe('Shows the results of each match played by each player');
  });

  it('accepts custom title and subtitle', () => {
    const customTitle = 'Custom Waffle Title';
    const customSubtitle = 'Custom waffle subtitle';
    
    const result = waffleByUser(mockData, { 
      width: 800,
      height: 300,
      title: customTitle,
      subtitle: customSubtitle
    });
    
    expect(result.title).toBe(customTitle);
    expect(result.subtitle).toBe(customSubtitle);
  });

  it('has correct chart configuration', () => {
    const result = waffleByUser(mockData, { width: 800, height: 300 });
    
    expect(result.width).toBe(800);
    expect(result.height).toBe(300);
    expect(result.axis).toBeNull();
    expect(result.label).toBeNull();
    expect(result.marks).toBeDefined();
  });

  it('handles empty data gracefully', () => {
    const result = waffleByUser([], { width: 800, height: 300 });
    
    expect(mockPlot.plot).toHaveBeenCalled();
    expect(result).toBeDefined();
  });
});

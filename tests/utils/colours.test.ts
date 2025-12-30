import { describe, it, expect } from 'vitest';
import { createColorScheme, colours } from '../../src/utils/colours';

describe('colours', () => {
  it('has default color scheme', () => {
    expect(colours.domain).toHaveLength(4);
    expect(colours.range).toHaveLength(4);
  });

  it('domain and range have same length', () => {
    expect(colours.domain.length).toBe(colours.range.length);
  });
});

describe('createColorScheme', () => {
  it('creates a valid color scheme', () => {
    const scheme = createColorScheme(['A', 'B'], ['#ff0000', '#00ff00']);
    expect(scheme.domain).toEqual(['A', 'B']);
    expect(scheme.range).toEqual(['#ff0000', '#00ff00']);
  });

  it('throws error when arrays have different lengths', () => {
    expect(() => {
      createColorScheme(['A', 'B'], ['#ff0000']);
    }).toThrow('Team names and colors arrays must have the same length');
  });

  it('handles empty arrays', () => {
    const scheme = createColorScheme([], []);
    expect(scheme.domain).toHaveLength(0);
    expect(scheme.range).toHaveLength(0);
  });
});

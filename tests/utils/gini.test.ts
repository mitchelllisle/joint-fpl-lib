import { describe, it, expect } from 'vitest';
import { calculateGini } from '../../src/utils/gini';

describe('calculateGini', () => {
  it('returns 0 for empty array', () => {
    expect(calculateGini([])).toBe(0);
  });

  it('returns 0 for single value', () => {
    expect(calculateGini([10])).toBe(0);
  });

  it('returns 0 for perfectly equal distribution', () => {
    const result = calculateGini([10, 10, 10, 10]);
    expect(result).toBeCloseTo(0, 5);
  });

  it('returns high value for very unequal distribution', () => {
    const result = calculateGini([1, 1, 1, 100]);
    expect(result).toBeGreaterThan(0.5);
  });

  it('returns 0 for all zeros', () => {
    expect(calculateGini([0, 0, 0])).toBe(0);
  });

  it('calculates correct Gini for known distribution', () => {
    // For values [10, 20, 30, 40], Gini should be ~0.25
    const result = calculateGini([10, 20, 30, 40]);
    expect(result).toBeCloseTo(0.25, 1);
  });

  it('is not affected by order of values', () => {
    const sorted = calculateGini([10, 20, 30, 40]);
    const unsorted = calculateGini([30, 10, 40, 20]);
    expect(sorted).toBe(unsorted);
  });
});

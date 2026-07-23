import { describe, expect, it } from 'vitest'
import {
  estimateVelocity,
  nearestSnapPoint,
  project,
  relativeVelocity,
  resolveSheetTarget,
  rubberband,
  rubberbandClamp,
} from './physics'

describe('project', () => {
  it('projects positive velocity forward with Apple deceleration', () => {
    // v=1000 px/s, rate=0.998 → (1/1000)*0.998/(0.002) = 499
    expect(project(1000, 0.998)).toBeCloseTo(499, 0)
  })

  it('projects negative velocity backward', () => {
    expect(project(-1000, 0.998)).toBeCloseTo(-499, 0)
  })

  it('returns 0 for zero velocity', () => {
    expect(project(0)).toBe(0)
  })

  it('uses snappier rate when requested', () => {
    const normal = Math.abs(project(800, 0.998))
    const snappy = Math.abs(project(800, 0.99))
    expect(snappy).toBeLessThan(normal)
  })
})

describe('rubberband', () => {
  it('applies progressive resistance past the edge', () => {
    const soft = rubberband(20, 400)
    const hard = rubberband(200, 400)
    expect(soft).toBeGreaterThan(0)
    expect(soft).toBeLessThan(20)
    // Further overshoot grows, but less than linear
    expect(hard).toBeGreaterThan(soft)
    expect(hard).toBeLessThan(200)
  })

  it('returns 0 for non-positive dimension', () => {
    expect(rubberband(10, 0)).toBe(0)
  })
})

describe('rubberbandClamp', () => {
  it('passes through values inside bounds', () => {
    expect(rubberbandClamp(50, 0, 100, 300)).toBe(50)
  })

  it('softens values below min', () => {
    const y = rubberbandClamp(-40, 0, 100, 300)
    expect(y).toBeLessThan(0)
    expect(y).toBeGreaterThan(-40)
  })

  it('softens values above max', () => {
    const y = rubberbandClamp(160, 0, 100, 300)
    expect(y).toBeGreaterThan(100)
    expect(y).toBeLessThan(160)
  })
})

describe('nearestSnapPoint', () => {
  it('picks the closest snap', () => {
    expect(nearestSnapPoint(120, [0, 200, 500])).toBe(200)
    expect(nearestSnapPoint(10, [0, 200, 500])).toBe(0)
  })

  it('throws when snap list is empty', () => {
    expect(() => nearestSnapPoint(0, [])).toThrow()
  })
})

describe('estimateVelocity', () => {
  it('returns 0 with fewer than 2 samples', () => {
    expect(estimateVelocity([])).toBe(0)
    expect(estimateVelocity([{ y: 0, t: 0 }])).toBe(0)
  })

  it('estimates px/s from recent history', () => {
    const samples = [
      { y: 0, t: 0 },
      { y: 50, t: 50 },
      { y: 100, t: 100 },
    ]
    // 100px in 100ms → 1000 px/s
    expect(estimateVelocity(samples)).toBeCloseTo(1000, 0)
  })
})

describe('resolveSheetTarget', () => {
  const snaps = [0, 300, 600] as const

  it('opens further when flicked upward (negative y velocity in sheet coords)', () => {
    // In our sheet model, y=0 is fully open, y=600 is closed.
    // Flicking up means velocityY < 0 → project toward smaller y.
    const target = resolveSheetTarget(300, -1200, snaps)
    expect(target).toBe(0)
  })

  it('closes when flicked downward', () => {
    const target = resolveSheetTarget(300, 1200, snaps)
    expect(target).toBe(600)
  })

  it('snaps to nearest when velocity is near zero', () => {
    expect(resolveSheetTarget(280, 0, snaps)).toBe(300)
  })
})

describe('relativeVelocity', () => {
  it('normalizes by remaining distance', () => {
    // at 50, target 150, finger 50px/s → 0.5
    expect(relativeVelocity(50, 50, 150)).toBeCloseTo(0.5)
  })

  it('returns 0 when already at target', () => {
    expect(relativeVelocity(80, 100, 100)).toBe(0)
  })
})

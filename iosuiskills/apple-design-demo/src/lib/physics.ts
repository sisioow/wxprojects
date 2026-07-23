/**
 * Apple fluid-interface physics helpers
 * Distilled from Designing Fluid Interfaces (WWDC 2018) / apple-design skill.
 */

/** Exponential deceleration projection used by Apple scroll/sheet samples. */
export function project(
  initialVelocity: number,
  decelerationRate = 0.998,
): number {
  return ((initialVelocity / 1000) * decelerationRate) / (1 - decelerationRate)
}

/** Soft rubber-band resistance past an edge. */
export function rubberband(
  overshoot: number,
  dimension: number,
  constant = 0.55,
): number {
  if (dimension <= 0) return 0
  return (
    (overshoot * dimension * constant) /
    (dimension + constant * Math.abs(overshoot))
  )
}

/** Clamp a value into [min, max], applying rubberband when outside. */
export function rubberbandClamp(
  value: number,
  min: number,
  max: number,
  dimension: number,
  constant = 0.55,
): number {
  if (value < min) return min - rubberband(min - value, dimension, constant)
  if (value > max) return max + rubberband(value - max, dimension, constant)
  return value
}

export function nearestSnapPoint(
  projected: number,
  points: readonly number[],
): number {
  if (points.length === 0) {
    throw new Error('nearestSnapPoint requires at least one snap point')
  }
  let best = points[0]!
  let bestDist = Math.abs(projected - best)
  for (let i = 1; i < points.length; i++) {
    const p = points[i]!
    const dist = Math.abs(projected - p)
    if (dist < bestDist) {
      best = p
      bestDist = dist
    }
  }
  return best
}

export type PointerSample = { y: number; t: number }

/** Estimate vertical velocity (px/s) from recent pointer samples. */
export function estimateVelocity(
  samples: readonly PointerSample[],
  lookbackMs = 100,
): number {
  if (samples.length < 2) return 0
  const latest = samples[samples.length - 1]!
  let earliest = samples[0]!
  for (let i = samples.length - 2; i >= 0; i--) {
    const s = samples[i]!
    if (latest.t - s.t > lookbackMs) break
    earliest = s
  }
  const dt = latest.t - earliest.t
  if (dt <= 0) return 0
  return ((latest.y - earliest.y) / dt) * 1000
}

/** Resolve sheet target from release position + velocity (momentum projection). */
export function resolveSheetTarget(
  currentY: number,
  velocityY: number,
  snapPoints: readonly number[],
  decelerationRate = 0.998,
): number {
  const projected = currentY + project(velocityY, decelerationRate)
  return nearestSnapPoint(projected, snapPoints)
}

/** Relative spring velocity for APIs that want distance-normalized velocity. */
export function relativeVelocity(
  gestureVelocity: number,
  currentValue: number,
  targetValue: number,
): number {
  const distance = targetValue - currentValue
  if (distance === 0) return 0
  return gestureVelocity / distance
}

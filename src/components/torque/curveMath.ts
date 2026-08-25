export interface CurvePoint {
  nPct: number // % of synchronous speed
  tPct: number // % of nominal torque
  label?: string
}

function catmullRom(p0: CurvePoint, p1: CurvePoint, p2: CurvePoint, p3: CurvePoint, t: number): CurvePoint {
  const t2 = t * t
  const t3 = t2 * t
  const nPct =
    0.5 *
    (2 * p1.nPct +
      (-p0.nPct + p2.nPct) * t +
      (2 * p0.nPct - 5 * p1.nPct + 4 * p2.nPct - p3.nPct) * t2 +
      (-p0.nPct + 3 * p1.nPct - 3 * p2.nPct + p3.nPct) * t3)
  const tPct =
    0.5 *
    (2 * p1.tPct +
      (-p0.tPct + p2.tPct) * t +
      (2 * p0.tPct - 5 * p1.tPct + 4 * p2.tPct - p3.tPct) * t2 +
      (-p0.tPct + 3 * p1.tPct - 3 * p2.tPct + p3.tPct) * t3)
  return { nPct, tPct }
}

/** Dense sample of a smooth curve through key points, via Catmull-Rom spline. */
export function sampleCurve(points: CurvePoint[], samplesPerSegment = 24): CurvePoint[] {
  const pts = [points[0], ...points, points[points.length - 1]]
  const out: CurvePoint[] = []
  for (let i = 0; i < pts.length - 3; i++) {
    for (let s = 0; s < samplesPerSegment; s++) {
      out.push(catmullRom(pts[i], pts[i + 1], pts[i + 2], pts[i + 3], s / samplesPerSegment))
    }
  }
  out.push(points[points.length - 1])
  return out
}

/** Torque (%) at a given speed (%), via linear interpolation over a sampled curve. */
export function torqueAt(sample: CurvePoint[], nPct: number): number {
  for (let i = 0; i < sample.length - 1; i++) {
    const a = sample[i]
    const b = sample[i + 1]
    if (nPct >= a.nPct && nPct <= b.nPct) {
      const t = b.nPct === a.nPct ? 0 : (nPct - a.nPct) / (b.nPct - a.nPct)
      return a.tPct + (b.tPct - a.tPct) * t
    }
  }
  return sample[sample.length - 1].tPct
}

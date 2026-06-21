const FACTORS: ReadonlyArray<readonly [string, number, string]> = [
  ["d", 86_400_000, "day"],
  ["h", 3_600_000, "hour"],
  ["m", 60_000, "minute"],
  ["s", 1000, "second"],
  ["ms", 1, "millisecond"],
];

export interface DurationOptions {
  /** Maximum number of units to show (largest first). Default `2`. */
  parts?: number;
  /** Use long names ("1 minute 30 seconds") instead of "1m 30s". Default `false`. */
  long?: boolean;
}

/**
 * Format a millisecond duration as a human-readable string.
 *
 * ```ts
 * duration(90_000);                 // "1m 30s"
 * duration(90_000, { long: true }); // "1 minute 30 seconds"
 * duration(3_661_000, { parts: 3 }); // "1h 1m 1s"
 * ```
 */
export function duration(ms: number, options: DurationOptions = {}): string {
  if (!Number.isFinite(ms)) throw new TypeError("duration: ms must be finite");
  const { parts = 2, long = false } = options;
  const sign = ms < 0 ? "-" : "";
  let remaining = Math.round(Math.abs(ms));

  if (remaining === 0) return long ? "0 milliseconds" : "0ms";

  const segments: string[] = [];
  for (const [short, factor, name] of FACTORS) {
    if (segments.length >= parts) break;
    const amount = Math.floor(remaining / factor);
    if (amount === 0) continue;
    remaining -= amount * factor;
    segments.push(long ? `${amount} ${name}${amount === 1 ? "" : "s"}` : `${amount}${short}`);
  }
  return sign + segments.join(" ");
}

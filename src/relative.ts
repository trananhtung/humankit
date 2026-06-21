const DIVISIONS: ReadonlyArray<{ amount: number; unit: Intl.RelativeTimeFormatUnit }> = [
  { amount: 60, unit: "second" },
  { amount: 60, unit: "minute" },
  { amount: 24, unit: "hour" },
  { amount: 7, unit: "day" },
  { amount: 4.34524, unit: "week" },
  { amount: 12, unit: "month" },
  { amount: Number.POSITIVE_INFINITY, unit: "year" },
];

export interface RelativeTimeOptions {
  /** Reference point. Default `Date.now()`. */
  now?: number | Date;
  /** BCP-47 locale(s) for `Intl.RelativeTimeFormat`. */
  locale?: string | string[];
  /** `"auto"` yields "yesterday"/"tomorrow"; `"always"` yields "1 day ago". Default `"auto"`. */
  numeric?: "auto" | "always";
}

function toMillis(value: number | Date): number {
  return value instanceof Date ? value.getTime() : value;
}

/**
 * Format a date/time relative to now (or a given reference) as "3 hours ago",
 * "in 2 days", "yesterday". Locale-aware via the built-in `Intl.RelativeTimeFormat`.
 *
 * ```ts
 * relativeTime(Date.now() - 3_600_000); // "1 hour ago"
 * relativeTime(future, { numeric: "always" });
 * ```
 */
export function relativeTime(date: number | Date, options: RelativeTimeOptions = {}): string {
  const now = toMillis(options.now ?? Date.now());
  const formatter = new Intl.RelativeTimeFormat(options.locale, {
    numeric: options.numeric ?? "auto",
  });

  let delta = (toMillis(date) - now) / 1000; // seconds, signed
  for (const division of DIVISIONS) {
    if (Math.abs(delta) < division.amount) {
      return formatter.format(Math.round(delta), division.unit);
    }
    delta /= division.amount;
  }
  // Unreachable: the last division uses Infinity.
  return formatter.format(Math.round(delta), "year");
}

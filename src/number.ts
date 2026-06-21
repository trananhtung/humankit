export interface CompactNumberOptions {
  /** Maximum fraction digits. Default `1`. */
  decimals?: number;
  /** BCP-47 locale(s). */
  locale?: string | string[];
}

/**
 * Format a number compactly: `1234` → "1.2K", `1_500_000` → "1.5M". Locale-aware
 * via the built-in `Intl.NumberFormat` compact notation.
 *
 * ```ts
 * compactNumber(1234);      // "1.2K"
 * compactNumber(1_500_000); // "1.5M"
 * ```
 */
export function compactNumber(value: number, options: CompactNumberOptions = {}): string {
  return new Intl.NumberFormat(options.locale, {
    notation: "compact",
    maximumFractionDigits: options.decimals ?? 1,
  }).format(value);
}

const ORDINAL_SUFFIX: Record<string, string> = { one: "st", two: "nd", few: "rd", other: "th" };

/**
 * Add an English ordinal suffix to an integer: `1` → "1st", `22` → "22nd".
 *
 * ```ts
 * ordinal(3);  // "3rd"
 * ordinal(11); // "11th"
 * ```
 */
export function ordinal(value: number): string {
  const rule = new Intl.PluralRules("en", { type: "ordinal" }).select(value);
  return `${value}${ORDINAL_SUFFIX[rule] ?? "th"}`;
}

const DECIMAL_UNITS = ["B", "KB", "MB", "GB", "TB", "PB", "EB"] as const;
const BINARY_UNITS = ["B", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB"] as const;

export interface BytesOptions {
  /** Use 1024-based (KiB/MiB) instead of 1000-based (KB/MB). Default `false`. */
  binary?: boolean;
  /** Maximum fraction digits. Default `2`. */
  decimals?: number;
  /** Put a space between the number and the unit. Default `true`. */
  space?: boolean;
}

function trimZeros(value: string): string {
  return value.includes(".") ? value.replace(/\.?0+$/, "") : value;
}

/**
 * Format a byte count as a human-readable string.
 *
 * ```ts
 * bytes(1536);                  // "1.54 KB"
 * bytes(1536, { binary: true }); // "1.5 KiB"
 * bytes(0);                      // "0 B"
 * ```
 */
export function bytes(value: number, options: BytesOptions = {}): string {
  if (!Number.isFinite(value)) throw new TypeError("bytes: value must be finite");
  const { binary = false, decimals = 2, space = true } = options;
  const base = binary ? 1024 : 1000;
  const units = binary ? BINARY_UNITS : DECIMAL_UNITS;
  const sep = space ? " " : "";

  const sign = value < 0 ? "-" : "";
  const abs = Math.abs(value);
  if (abs < 1) return `${sign}${trimZeros(abs.toFixed(decimals))}${sep}B`;

  let exponent = Math.floor(Math.log(abs) / Math.log(base));
  exponent = Math.min(exponent, units.length - 1);
  const scaled = abs / base ** exponent;
  const formatted = exponent === 0 ? String(scaled) : trimZeros(scaled.toFixed(decimals));
  return `${sign}${formatted}${sep}${units[exponent]}`;
}

const UNIT_FACTORS: Record<string, number> = {
  b: 1,
  kb: 1000,
  mb: 1000 ** 2,
  gb: 1000 ** 3,
  tb: 1000 ** 4,
  pb: 1000 ** 5,
  eb: 1000 ** 6,
  kib: 1024,
  mib: 1024 ** 2,
  gib: 1024 ** 3,
  tib: 1024 ** 4,
  pib: 1024 ** 5,
  eib: 1024 ** 6,
  // bare "k"/"m"/... shorthands map to decimal
  k: 1000,
  m: 1000 ** 2,
  g: 1000 ** 3,
  t: 1000 ** 4,
  p: 1000 ** 5,
  e: 1000 ** 6,
};

/**
 * Parse a human-readable size back into a number of bytes. Case-insensitive;
 * understands `KB`/`KiB`/`K` style units. Returns `NaN` if unparseable.
 *
 * ```ts
 * parseBytes("1.5 KB");  // 1500
 * parseBytes("1KiB");    // 1024
 * parseBytes("500");     // 500
 * ```
 */
export function parseBytes(input: string): number {
  const match = /^\s*(-?\d+(?:\.\d+)?)\s*([a-z]+)?\s*$/i.exec(input);
  if (!match) return NaN;
  const amount = Number(match[1]);
  const unit = match[2]?.toLowerCase();
  if (unit === undefined) return amount;
  const factor = UNIT_FACTORS[unit];
  return factor === undefined ? NaN : amount * factor;
}

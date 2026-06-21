# Changelog

All notable changes to this project are documented here.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-06-22

### Added

- `bytes(value, options?)` — human-readable file sizes (decimal or binary,
  configurable decimals/space) and `parseBytes(string)` for the reverse.
- `duration(ms, options?)` — "1m 30s" / "1 minute 30 seconds" with `parts` and
  `long` options; skips zero units.
- `relativeTime(date, options?)` — "3 hours ago" / "in 2 days" / "yesterday" via
  the built-in `Intl.RelativeTimeFormat`, with `now`, `locale`, and `numeric`.
- `compactNumber(value, options?)` — "1.2K" / "1.5M" via `Intl.NumberFormat`.
- `ordinal(value)` — English ordinal suffixes ("1st", "22nd").
- ESM + CJS builds, types, and CI across Node 18 / 20 / 22.

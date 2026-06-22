# humankit

[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)

> Tiny, type-safe **humanizers** — bytes (with parse), durations, relative time, compact numbers, and ordinals. **Zero dependencies**.

[![CI](https://github.com/trananhtung/humankit/actions/workflows/ci.yml/badge.svg)](https://github.com/trananhtung/humankit/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/humankit.svg)](https://www.npmjs.com/package/humankit)
[![bundle size](https://img.shields.io/bundlephobia/minzip/humankit)](https://bundlephobia.com/package/humankit)
[![types](https://img.shields.io/npm/types/humankit.svg)](https://www.npmjs.com/package/humankit)
[![license](https://img.shields.io/npm/l/humankit.svg)](./LICENSE)

Every dashboard needs the same handful of formatters — file sizes, durations,
"3 hours ago", `1.2M` — and you end up installing `pretty-bytes`, `pretty-ms`,
and two more, each with its own API. `humankit` bundles them, adds the **parse**
direction (`"1.5 KB"` → `1500`) most are missing, and leans on the built-in
`Intl` for locale-correct relative time and numbers. **Zero dependencies**.

```ts
import { bytes, duration, relativeTime, compactNumber } from "humankit";

bytes(1536);                          // "1.54 KB"
duration(90_000);                     // "1m 30s"
relativeTime(Date.now() - 3_600_000); // "1 hour ago"
compactNumber(1_500_000);             // "1.5M"
```

## Why humankit?

- **One package, five formatters.** `bytes`, `duration`, `relativeTime`,
  `compactNumber`, `ordinal`.
- **Round-trips.** `parseBytes("1.5 KB")` → `1500` — read a size from config/CLI
  and turn it back into bytes.
- **Locale-correct where it matters.** `relativeTime` and `compactNumber` use the
  built-in `Intl`, so wording and grouping follow the locale.
- **Sensible options.** Binary vs decimal bytes, number of duration parts,
  long/short wording, fraction digits.
- **Typed & tiny.** Full types, ESM + CJS, zero dependencies.

## Install

```bash
npm install humankit
# or: pnpm add humankit  /  yarn add humankit  /  bun add humankit
```

## Bytes

```ts
import { bytes, parseBytes } from "humankit";

bytes(1536);                    // "1.54 KB"
bytes(1536, { binary: true });  // "1.5 KiB"
bytes(1536, { decimals: 0 });   // "2 KB"
bytes(1536, { space: false });  // "1.54KB"

parseBytes("1.5 KB"); // 1500
parseBytes("1 KiB");  // 1024
parseBytes("3k");     // 3000
parseBytes("nope");   // NaN
```

## Durations

```ts
import { duration } from "humankit";

duration(90_000);                  // "1m 30s"
duration(3_661_000, { parts: 3 }); // "1h 1m 1s"
duration(90_000, { long: true });  // "1 minute 30 seconds"
duration(86_400_000 + 5000);       // "1d 5s" (zero units skipped)
```

`parts` caps how many units are shown (largest first); `long` switches to full
words with correct pluralization.

## Relative time, numbers, ordinals

```ts
import { relativeTime, compactNumber, ordinal } from "humankit";

relativeTime(Date.now() - 86_400_000);              // "yesterday"
relativeTime(then, { numeric: "always" });          // "1 day ago"
relativeTime(future, { now: someBase, locale: "fr" });

compactNumber(1234);      // "1.2K"
compactNumber(1_500_000); // "1.5M"

ordinal(1);  // "1st"
ordinal(22); // "22nd"
```

`relativeTime` accepts a timestamp or `Date`, an optional `now` reference, a
`locale`, and `numeric: "auto" | "always"`.

## Contributors ✨

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind are welcome — code, docs, bug reports, ideas, reviews! See the [emoji key](https://allcontributors.org/docs/en/emoji-key) for how each contribution is recognized, and open a PR or issue to get involved.

Thanks goes to these wonderful people:

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/trananhtung"><img src="https://avatars.githubusercontent.com/u/30992229?v=4?s=100" width="100px;" alt="Tung Tran"/><br /><sub><b>Tung Tran</b></sub></a><br /><a href="https://github.com/trananhtung/humankit/commits?author=trananhtung" title="Code">💻</a> <a href="#maintenance-trananhtung" title="Maintenance">🚧</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

## License

[MIT](./LICENSE) © Tung Tran

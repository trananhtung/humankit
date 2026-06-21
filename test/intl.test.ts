import { describe, it, expect } from "vitest";
import { relativeTime, compactNumber, ordinal } from "../src/index.js";

describe("relativeTime", () => {
  const now = new Date("2026-06-22T12:00:00Z").getTime();

  it("formats past times in English", () => {
    expect(relativeTime(now - 60_000, { now, locale: "en" })).toBe("1 minute ago");
    expect(relativeTime(now - 3_600_000, { now, locale: "en" })).toBe("1 hour ago");
    expect(relativeTime(now - 2 * 86_400_000, { now, locale: "en" })).toBe("2 days ago");
  });

  it("formats future times", () => {
    expect(relativeTime(now + 3 * 3_600_000, { now, locale: "en" })).toBe("in 3 hours");
  });

  it("uses auto wording by default (yesterday)", () => {
    expect(relativeTime(now - 86_400_000, { now, locale: "en" })).toBe("yesterday");
    expect(
      relativeTime(now - 86_400_000, { now, locale: "en", numeric: "always" }),
    ).toBe("1 day ago");
  });

  it("accepts Date inputs", () => {
    expect(relativeTime(new Date(now - 60_000), { now: new Date(now), locale: "en" })).toBe(
      "1 minute ago",
    );
  });
});

describe("compactNumber", () => {
  it("formats with compact notation", () => {
    expect(compactNumber(1234, { locale: "en" })).toBe("1.2K");
    expect(compactNumber(1_500_000, { locale: "en" })).toBe("1.5M");
    expect(compactNumber(999, { locale: "en" })).toBe("999");
  });
});

describe("ordinal", () => {
  it("adds English ordinal suffixes", () => {
    expect(ordinal(1)).toBe("1st");
    expect(ordinal(2)).toBe("2nd");
    expect(ordinal(3)).toBe("3rd");
    expect(ordinal(4)).toBe("4th");
    expect(ordinal(11)).toBe("11th");
    expect(ordinal(21)).toBe("21st");
    expect(ordinal(102)).toBe("102nd");
  });
});

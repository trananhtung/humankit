import { describe, it, expect } from "vitest";
import { duration } from "../src/index.js";

describe("duration", () => {
  it("formats short form with two parts by default", () => {
    expect(duration(0)).toBe("0ms");
    expect(duration(500)).toBe("500ms");
    expect(duration(1000)).toBe("1s");
    expect(duration(90_000)).toBe("1m 30s");
    expect(duration(3_661_000)).toBe("1h 1m"); // capped at 2 parts
  });

  it("honors the parts option", () => {
    expect(duration(3_661_000, { parts: 3 })).toBe("1h 1m 1s");
    expect(duration(90_000, { parts: 1 })).toBe("1m");
    expect(duration(86_400_000 + 3_600_000, { parts: 2 })).toBe("1d 1h");
  });

  it("formats long form with correct pluralization", () => {
    expect(duration(1000, { long: true })).toBe("1 second");
    expect(duration(90_000, { long: true })).toBe("1 minute 30 seconds");
    expect(duration(0, { long: true })).toBe("0 milliseconds");
  });

  it("skips zero units and keeps largest first", () => {
    expect(duration(86_400_000 + 5000)).toBe("1d 5s"); // 0h, 0m skipped
  });

  it("handles negatives and rounds sub-millisecond", () => {
    expect(duration(-90_000)).toBe("-1m 30s");
    expect(duration(0.4)).toBe("0ms");
  });

  it("throws on non-finite input", () => {
    expect(() => duration(Infinity)).toThrow(TypeError);
  });
});

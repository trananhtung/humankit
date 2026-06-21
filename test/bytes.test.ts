import { describe, it, expect } from "vitest";
import { bytes, parseBytes } from "../src/index.js";

describe("bytes", () => {
  it("formats decimal units by default", () => {
    expect(bytes(0)).toBe("0 B");
    expect(bytes(500)).toBe("500 B");
    expect(bytes(1000)).toBe("1 KB");
    expect(bytes(1536)).toBe("1.54 KB");
    expect(bytes(1_500_000)).toBe("1.5 MB");
    expect(bytes(1_000_000_000)).toBe("1 GB");
  });

  it("formats binary units when asked", () => {
    expect(bytes(1024, { binary: true })).toBe("1 KiB");
    expect(bytes(1536, { binary: true })).toBe("1.5 KiB");
    expect(bytes(1_048_576, { binary: true })).toBe("1 MiB");
  });

  it("respects decimals and space options", () => {
    expect(bytes(1536, { decimals: 0 })).toBe("2 KB");
    expect(bytes(1536, { decimals: 1 })).toBe("1.5 KB");
    expect(bytes(1536, { space: false })).toBe("1.54KB");
  });

  it("handles negatives and trims trailing zeros", () => {
    expect(bytes(-1500)).toBe("-1.5 KB");
    expect(bytes(2000)).toBe("2 KB"); // not "2.00 KB"
  });

  it("throws on non-finite input", () => {
    expect(() => bytes(Infinity)).toThrow(TypeError);
    expect(() => bytes(NaN)).toThrow(TypeError);
  });
});

describe("parseBytes", () => {
  it("parses decimal and binary units case-insensitively", () => {
    expect(parseBytes("1.5 KB")).toBe(1500);
    expect(parseBytes("1kib")).toBe(1024);
    expect(parseBytes("2 MB")).toBe(2_000_000);
    expect(parseBytes("1 GiB")).toBe(1_073_741_824);
  });

  it("handles bare numbers and shorthand units", () => {
    expect(parseBytes("500")).toBe(500);
    expect(parseBytes("3k")).toBe(3000);
  });

  it("returns NaN for unparseable input", () => {
    expect(parseBytes("abc")).toBeNaN();
    expect(parseBytes("1 XB")).toBeNaN();
  });

  it("round-trips with bytes for clean values", () => {
    expect(parseBytes(bytes(2_000_000))).toBe(2_000_000);
    expect(parseBytes(bytes(1024, { binary: true }))).toBe(1024);
  });
});

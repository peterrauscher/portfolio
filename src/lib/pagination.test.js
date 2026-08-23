import { describe, expect, test } from "bun:test";

import { normalizePage, paginate } from "./pagination";

describe("normalizePage", () => {
  test("normalizes page 1 and max page 0 to 1", () => {
    expect(normalizePage("1", 0)).toBe(1);
    expect(normalizePage(1, 0)).toBe(1);
  });

  test("normalizes invalid, negative, and undefined inputs to 1", () => {
    expect(normalizePage("not-a-number", 5)).toBe(1);
    expect(normalizePage("-7", 5)).toBe(1);
    expect(normalizePage(-3, 5)).toBe(1);
    expect(normalizePage(undefined, 5)).toBe(1);
  });

  test("clamps oversized input to max page", () => {
    expect(normalizePage("9", 3)).toBe(3);
    expect(normalizePage(9, 3)).toBe(3);
  });
});

describe("paginate", () => {
  test("returns an empty page 1 for an empty collection", () => {
    const result = paginate([], {
      page: 1,
      pageSize: 5,
    });

    expect(result.pagination.page).toBe(1);
    expect(result.pagination.totalPages).toBe(0);
    expect(result.items).toEqual([]);
  });
});

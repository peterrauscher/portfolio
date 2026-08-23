import { describe, expect, test } from "bun:test";

import { sortPostsByDate } from "./posts";

describe("sortPostsByDate", () => {
  test("sorts posts by published date descending", () => {
    const posts = [
      { publishedAt: "2024-01-01T00:00:00.000Z", _meta: { path: "early.mdx" } },
      { publishedAt: "2024-03-01T00:00:00.000Z", _meta: { path: "newer.mdx" } },
      {
        publishedAt: "2024-02-01T00:00:00.000Z",
        _meta: { path: "middle.mdx" },
      },
    ];

    const sorted = sortPostsByDate(posts);

    expect(sorted.map((post) => post._meta.path)).toEqual([
      "newer.mdx",
      "middle.mdx",
      "early.mdx",
    ]);
  });

  test("orders equal dates using path as a deterministic tie-breaker", () => {
    const posts = [
      { publishedAt: "2024-02-01T00:00:00.000Z", _meta: { path: "zeta.mdx" } },
      { publishedAt: "2024-02-01T00:00:00.000Z", _meta: { path: "alpha.mdx" } },
      {
        publishedAt: "2024-03-01T00:00:00.000Z",
        _meta: { path: "latest.mdx" },
      },
    ];

    const sorted = sortPostsByDate(posts);

    expect(sorted.map((post) => post._meta.path)).toEqual([
      "latest.mdx",
      "alpha.mdx",
      "zeta.mdx",
    ]);
  });

  test("returns a new array and does not mutate input", () => {
    const posts = [
      { publishedAt: "2024-01-01", _meta: { path: "second.mdx" } },
      { publishedAt: "2024-02-01", _meta: { path: "first.mdx" } },
    ];
    const originalCopy = [...posts];

    const sorted = sortPostsByDate(posts);

    expect(sorted).not.toBe(posts);
    expect(posts).toEqual(originalCopy);
  });
});

# Anti-slop provenance

Installed from `/Users/peter/.agents/skills/install-anti-slop/assets/anti-slop` on 2026-11-01.

- Generic source repository and upstream commit: **unknown**; the supplied skill bundle contains no recoverable top-level upstream revision. Do not substitute the Stylistic sub-vendor revision for the anti-slop revision.
- Exact pristine source: `UPSTREAM.snapshot.tar.gz` beside this file, containing the original `anti-slop/` directory before installation metadata was added. Extract into a separate staging directory for a future three-way merge.
- Archive SHA-256: `f401250b3cecf2f742100cdbf6e0d36e7b8e3421e38e4f54fed2b4cd37c9103c`.
- Installed generic entry point: `tools/oxlint/anti-slop/index.ts`, relative to this package root.
- The optional `effect/index.ts` assets are retained but not registered: no direct Effect dependency is declared in the targeted package manifests.
- Intentional rule-source deviations: none. Installation metadata adds this provenance record, its pristine archive, and a private `package.json` declaring `"type": "module"` so Node loads the plugin as ESM without changing the application's module system.
- Preserve `vendor/eslint-stylistic/LICENSE` and its separate `UPSTREAM.md`; that record identifies the nested MIT-licensed implementation and its adaptations.

## Repository integration

Use `bun` for this target. `oxlint` and `@oxlint/plugins` resolve to matching `1.90.0` releases. All 18 generic anti-slop rules and native `oxc/no-accumulating-spread` are errors in `.oxlintrc.json`. Existing lint policies and checks are retained; vendored rules and local agent assets are excluded from application lint. TypeScript projects with broad includes exclude the vendored lint implementation, which is executed by Oxlint rather than shipped as application code.

Application-code cleanup is not part of this installation. Lint findings must not be suppressed or weakened to make adoption pass.

## Installation verification

- Registered CLI smoke: typed arithmetic accepted with zero diagnostics; `Reflect.get` rejected by `anti-slop/no-reflect-get`.
- `bun run typecheck`: passed. Content Collections emitted its existing `collections` configuration deprecation warning.
- Retained ESLint: passed separately.
- `bun run lint`: failed with 137 diagnostics in 30 files under the new rules. Application-code cleanup was not performed.
- Prettier ignores preserve vendored assets during the existing repository-wide format command.
- Copied rule/helper/license bytes match the pristine bundle; only the three installation metadata files above differ.


# Human homepage

Static GitHub Pages build for the Human homepage concept.

- Brand/site: https://humns.ru/
- Retreat page: https://ny06981-lang.github.io/humn-chakra-tantra-dao/

## Publishing

Use `docs/publishing-workflow.md` as the release checklist. Every update should
go to GitHub first, then be tested, then published to Tilda only after explicit
approval.

Build the Tilda T123 embed:

```sh
node scripts/build-tilda-embed.mjs
```

If local `node` is not in `PATH`, use the bundled runtime:

```sh
/Users/Yurich/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node scripts/build-tilda-embed.mjs
```

Run local QA:

```sh
/Users/Yurich/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node scripts/qa-homepage.mjs
```

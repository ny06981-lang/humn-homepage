# Human publishing workflow

This repository is the source of truth for the Human homepage.

## Rule

1. Apply changes locally in this repository.
2. Commit and push the new version to GitHub.
3. Test the GitHub Pages version on desktop and mobile viewports.
4. Ask Yury for explicit approval to publish to Tilda.
5. Publish to Tilda only after approval.
6. After publishing, verify the public Tilda page.

## Tilda coordination

- Current Tilda project: `12741697`
- Homepage editor URL: `https://tilda.ru/page/?pageid=66936657&projectid=12741697`
- Homepage public URL: `https://humns.ru/`
- Active homepage T123 record: `2931163101`
- Retreat GitHub preview: `https://ny06981-lang.github.io/humn-chakra-tantra-dao/`

Before overwriting a Tilda page, check whether manual changes were made in Tilda
after the last GitHub publish. If there are manual edits, merge those changes
back into this repository first or confirm with Yury that overwriting them is ok.

The homepage has legacy Tilda/T123 records. Publish only the generated
`dist/tilda-homepage-t123.html` into active record `2931163101`. The generated
embed is intentionally record-scoped so old Human/Tantra records cannot become
visible again after a publish.

## QA checklist

- No words are broken letter-by-letter in headings or cards.
- Text never overlaps other text or controls.
- No horizontal scroll on mobile.
- Logo text is `Human`.
- Main CTA links open correctly.
- Console has no errors.
- Desktop and mobile layouts both render the Samudro announcement.

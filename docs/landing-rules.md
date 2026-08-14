# Human landing rules

These rules are the working memory for future Human landing pages. Use them before
designing, editing, publishing, or moving anything to Tilda.

## Core Principle

Human pages are not generic wellness landing pages. They should feel contemporary,
alive, and grounded: retreats, masters, travel, community, body, practice, and
real human transformation. Build the useful page first, not a marketing wrapper.

## Brand Rules

- Use the brand name and logo text `Human`.
- Do not use `Tantra` as the logo or primary brand mark. Tantra can be a practice
  direction, never the site identity.
- Do not make Yury's face the main hero image. Organizers and hosts can appear
  lower on the page when relevant.
- The first screen should communicate Human as a space, field, route, or living
  ecosystem: place, practice, masters, community.
- Keep the style modern and current. Avoid weak Tilda-template layouts, old
  beige-card retreat grids, and outdated spiritual landing cliches.
- Use actual retreat/place/master imagery whenever possible. Avoid purely
  decorative backgrounds when a real place, person, or program image can carry
  the meaning.
- Keep the palette multi-accent and alive: Human currently works with paper,
  black, plum, violet, orange, rose, and cyan. Avoid making the whole page one
  beige/purple/brown monotone.

## Copy Rules

- No words may be broken letter-by-letter in headings, cards, buttons, or any
  other visible text.
- Text must never overlap other text, buttons, images, counters, tags, or carousel
  controls.
- Headings should stay readable and editorial, but not over-explain the feature.
- Avoid visible explanatory notes about design decisions. Do not put internal
  rationale on the page.
- Use the approved section naming:
  - `Наши мастера`, not `Ведущие, с которыми работали`.
  - `Прошедшие мероприятия` / `архив Human` for the live archive wording.
  - `Ближайшие мероприятия` or `Ближайшие ретриты` for current openings.
- When writing statistics, include both trust and range:
  - Countries: Turkey, Indonesia, Thailand, Georgia, Serbia, Russia, Armenia,
    Portugal when relevant.
  - Retreats: `20+` with top masters.
  - Participants: `450+`.
  - Directions: psychology, trauma work, primal therapy, tantra, body therapy,
    embodiment, dance therapy, energy practices, and adjacent practices.
- For retreat cards, prefer concrete metadata over vague inspiration:
  - title;
  - master;
  - country/place;
  - dates;
  - format or participant signal when available;
  - short human summary;
  - direct CTA.

## Homepage Structure

The homepage should answer three questions quickly:

1. What retreats are open or coming soon?
2. What has Human already done?
3. Which masters and resources are behind this ecosystem?

Required homepage blocks:

- Hero with Human brand, current navigation, and clear CTAs.
- Key metrics/trust block.
- Upcoming retreats block.
- Masters block with portraits and countries of origin.
- Completed/past projects block with real project cards or carousel.
- Community/resources block.
- Contact/consultation CTA.

## Upcoming Retreats Pattern

- Treat upcoming retreats as the primary conversion surface.
- If there is more than one current retreat, use a carousel/rail rather than
  stacking large unrelated blocks.
- On desktop, show at least two nearest retreat cards when possible.
- On mobile, use swipe plus visible arrow buttons and a counter.
- The nearest retreat should be visually marked as nearest/current.
- Homa and Mukto, and SamudroPrem are current priority retreat masters and should
  both be easy to see when both programs are active.
- Cards should be equal in visual weight unless one retreat is intentionally being
  promoted as the main offer.

## Masters Pattern

- Use `Наши мастера`.
- Show portraits in round avatars or a visually clean carousel/marquee.
- Include country of origin or working base when known.
- Include a short practice focus.
- Do not reduce Human to countries and dates; masters are a trust layer.

## Completed Projects Pattern

- Use carousel behavior when there are several completed projects, so the archive
  feels substantial without creating a long static wall.
- Each project card should contain:
  - project title;
  - master;
  - date/month/year;
  - country/place;
  - format;
  - short summary;
  - tags;
  - optional link to the original project page.
- If final case data is not dictated yet, use clearly editable placeholders that
  still feel real and aligned with past project pages.

## Retreat Page Pattern

For individual retreat landing pages:

- Keep visual language aligned with the homepage.
- Use the real master photo and crop it respectfully; never awkwardly crop a face
  or body.
- Pull dates, place, price, accommodation, program facts, and master details from
  the most authoritative current source.
- If source data may have changed, verify it before using it.
- Make pricing readable and practical, not hidden in long prose.
- Include clear CTAs to contact/register.

## Tilda And GitHub Workflow

GitHub is the working source of truth, but Tilda may contain manual edits. Always
check both before publishing.

1. Pull latest `origin/main`.
2. Compare local files with the live/public page when the user says manual Tilda
   edits happened or when the live page differs.
3. If live/Tilda is newer, merge or copy the live state back into the repo before
   making new changes.
4. Make changes locally or in a separate preview file.
5. Commit and push to GitHub.
6. Test GitHub Pages preview on desktop and mobile.
7. Ask Yury for explicit approval before publishing to Tilda.
8. Publish to Tilda only after approval.
9. Verify the public Tilda URL without query parameters.
10. Tell Yury if a hard refresh may be needed because of browser/CDN cache.

Never overwrite Tilda blindly. If Tilda has hand edits, preserve or consciously
merge them.

## Preview Rules

- For experimental page/block variants, create a separate GitHub Pages URL first.
- Preferred path for homepage experiments:
  `previews/<clear-feature-name>.html`.
- Keep the live `index.html` as the current source of truth unless the user
  explicitly approves replacing it.
- After pushing, verify the actual GitHub Pages URL returns `200` and contains
  the expected new block.
- Send the preview link before touching Tilda.

## Tilda Embed Rules

- Tilda may keep old records in the page source. The active Human T123 block must
  robustly hide legacy records.
- Avoid generic CSS class names that can collide with Tilda or injected styles.
  Use `human-` prefixed names, for example `human-container`, not `.container`.
- Keep the active Human root class stable: `.human-homepage-root`.
- Keep build output generated through `scripts/build-tilda-embed.mjs`.
- If Tilda shows old content after publish, verify:
  - browser cache;
  - clean URL without query parameters;
  - rendered visible text, not just HTML source;
  - whether old Tilda records are visible or merely present in source.
- Browser hard refresh:
  - macOS Chrome: `Cmd + Shift + R`;
  - Windows Chrome: `Ctrl + F5` or `Ctrl + Shift + R`.

## Technical Layout Rules

- No horizontal page scroll on desktop or mobile.
- Use explicit responsive constraints:
  - `minmax(0, 1fr)` in CSS Grid;
  - `min-width: 0` on grid/flex children that contain text;
  - stable card heights/aspect ratios;
  - `overflow-wrap: normal`, `word-break: normal`, `hyphens: none` for headings.
- Avoid nested cards unless the nested element is a real repeated item or a small
  metadata grid.
- Do not let carousels create document-level horizontal overflow. The rail can
  scroll, the page must not.
- On mobile, carousel cards should fit `calc(100vw - page gutters)`.
- Buttons and tags must wrap cleanly and never cover images or text.
- Keep image crops intentional: faces visible, key place details visible, no
  accidental forehead/body cuts.

## QA Checklist

Run these before any preview link is sent:

- Desktop render at roughly `1440x1100`.
- Mobile render at roughly `390x900`.
- No visible text overlaps.
- No broken words in headings or cards.
- No document-level horizontal overflow.
- Main CTA links are correct.
- Images load.
- Console has no errors.
- Carousel controls work and update counters.
- Page contains the intended master/program names.
- Public GitHub Pages URL returns `200` after push.

Run these before saying Tilda is done:

- Tilda editor record saved.
- Tilda publish success confirmed.
- Public `https://humns.ru/` or retreat URL verified without query parameters.
- Rendered page, not just HTML, shows the new version.
- Old visible Tilda content count is zero.

## Decision Rules

- If user says "в стиле главной", reuse current Human tokens and component logic.
- If user says "как на главной Хома/Мукта", use the current card density and
  metadata-first retreat presentation, not a brand-new format.
- If user asks for "добавь ретрит", add it to the upcoming/current-retreat system
  and preserve comparison with other open retreats.
- If the user dictates exact copy, apply it exactly unless it causes layout or
  factual problems.
- If copy creates overlap or broken words, adjust layout first, then ask only if
  meaning must change.
- If unsure whether a fact/date/price is current, verify from the current source
  before publishing.

## Common Failure Modes To Avoid

- Designing around Tantra instead of Human.
- Treating the organizer's face as the hero visual.
- Publishing to Tilda before GitHub preview approval.
- Losing manual Tilda edits by overwriting from an old local file.
- Trusting local files when GitHub/live has newer commits.
- Using generic `.container` or other names that Tilda can override.
- Checking HTML source and missing what is actually visible in browser.
- Allowing huge headings or carousels to push beyond viewport.
- Letting cards become visually mismatched when they represent comparable
  upcoming retreats.

# DESIGN.md: 조경석 portfolio design system

Read this before building `/projects`, `/projects/[slug]`, `/study` or `/study/[slug]`.
The shared files listed under "Ownership" are frozen: build your pages from these primitives and put
anything new in your own folder (`src/components/projects/*` or `src/components/study/*`).

Design read: a developer portfolio for recruiters and peers. Light cool-mist backdrop with grain,
real screenshots floating in device frames with layered tinted shadows, frosted pill navigation,
black pill CTA, large rounded panels, one warm accent (vermilion), Pretendard for Hangul and Geist
for Latin and numbers, automatic dark mode. Dials: variance 6, motion 5, density 4.

The home page is an entrance, not a dump. Depth lives in the section pages.

---

## 0. Hard rules (checked by `tools/shoot.py`)

- Content comes only from `src/content/site.ts`, read through `src/lib/content.ts`. Never invent
  facts, numbers, reasons or quotes. Short UI copy (headings, buttons, empty states) in plain Korean is fine.
- No em dash (U+2014) or en dash (U+2013) anywhere visible. Ranges use `-` (`2025.08 - 운영 중`).
- No eyebrows (small uppercase letter-spaced labels above headings). The heading alone is enough.
- No phone number, birth date or photo.
- No filled-track progress bars, no hairline under every row, no three identical cards in a row as a
  default layout, no decorative status dots, no numbered section labels, no scroll cues.
- `word-break: keep-all` is global. Do not override it.
- 360px wide phones: no horizontal page scroll. Every multi-column layout declares its phone fallback.
- Both themes: everything is tokens, dark mode follows `prefers-color-scheme` automatically.
- Visible focus: every interactive element shows the accent outline on `:focus-visible`.
- Semantic HTML: one `h1` per page (PageHeader renders it), sections are `<section aria-labelledby>`,
  lists are lists, meta is `<dl>`.

---

## 1. Tokens (`src/app/globals.css`)

### Colors (CSS variables, Tailwind names in brackets)

| Token | Light | Dark | Use |
|---|---|---|---|
| `--bg` (`bg-bg`) | `#eceef1` | `#0e1013` | page, sunk wells, default chips |
| `--bg-deep` | `#e2e5ea` | `#0a0b0d` | bottom of the backdrop gradient |
| `--surface` (`bg-surface`) | `#f8f9fb` | `#171a1f` | raised panels, cards, ghost pills |
| `--surface-2` (`bg-surface-2`) | `#f1f3f6` | `#13161a` | bottom of surface gradients |
| `--ink` (`text-ink`) | `#121418` | `#edeff2` | headings, primary text |
| `--ink-2` (`text-ink-2`) | `#3b4048` | `#b6bcc5` | body copy |
| `--muted` (`text-muted`) | `#5e646e` | `#8c939d` | labels, periods, secondary meta |
| `--edge` | 6% ink | 7% white | 1px hairline edge baked into shadows |
| `--accent` (`text-accent`, `bg-accent`) | `#d9481a` | `#ff6b35` | the one accent: focus ring, list rule, 404 |
| `--accent-ink` (`text-accent-ink`) | `#b63f10` | `#ff8a5b` | accent text on light surfaces |
| `--accent-wash` (`bg-accent-wash`) | 9% accent | 10% accent | tinted panels and accent chips |
| `--pill` / `--pill-ink` | ink / surface | inverted | primary CTA (black pill in light, light pill in dark) |
| `--glass` | 72% surface | 70% surface | frosted nav and filter bars |
| `--sh` | `38 48 66` | `0 0 0` | shadow tint as `rgb(var(--sh) / a)`, never pure black on light |

One accent only. Never introduce another hue. Tailwind `dark:` works (media based) but prefer tokens.

### Radius (one system)

| Class | Size | Use |
|---|---|---|
| `rounded-full` | pill | every button, chip, nav, filter, icon button |
| `rounded-panel` | 32px | top-level blocks: feature cards, big panels, contact panel |
| `rounded-card` | 24px | cards in grids, blocks inside a panel, stages inside a feature card |
| `rounded-inner` | 16px | stages/wells inside a `rounded-card` card, gallery buttons |
| `rounded-sm` | 12px (overridden from Tailwind's 4px) | small thumbnails, menu items |

Nesting rule: an element inset by 8px inside radius R uses R - 8 (panel 32 > card 24 > inner 16).
Device frames (phone, window) and app icons (22.5% squircle) keep their own radii.

### Surfaces and shadows (utilities)

| Class | What |
|---|---|
| `surface` | raised: surface gradient, inner top highlight, 1px edge, three tinted shadow layers |
| `surface-lift` | raised more; one per page at most (contact panel, 404 card) |
| `surface-accent` | `surface` plus the accent wash from the top left; max one per section |
| `inset-well` | sunk into the page; holds visuals (stages) |
| `.stage-light` | `<span aria-hidden className="stage-light" />` first child of a well: soft top light |
| `.glass` | frosted pill (nav, FilterPills), falls back to solid under reduced transparency |
| `.icon-float` / `.icon-rest` | alpha-following drop shadows for app icons (strong / resting) |
| `.tactile` | hover lift -3px, press scale 0.985 (use on clickable cards) |

### Type scale (utilities; set color separately)

| Class | Size | Use |
|---|---|---|
| `type-display` | clamp 2rem - 4.1rem, 700, -0.045em | home hero h1 only |
| `type-title` | clamp 2.15rem - 3.75rem, 700 | page h1 (PageHeader) |
| `type-section` | clamp 1.75rem - 3rem, 700 | section h2 |
| `type-card-lg` | clamp 1.45rem - 2rem, 700 | big card titles, sub-section h3 |
| `type-card` | 1.2rem, 700 | card titles, panel headings |
| `type-lede` | clamp 1.05rem - 1.2rem, lh 1.7 | intro paragraphs (`text-ink-2`) |
| `type-body` | 1rem, lh 1.8 | body copy (`text-ink-2`) |
| `type-small` | 0.875rem, lh 1.65 | card taglines, secondary copy |
| `type-label` | 0.8rem, 500 | dt labels, periods, meta (`text-muted`) |

Headings use Pretendard (`font-kr`) with negative tracking; numbers use `tnum` (tabular).
Keep headings short. `h1, h2, h3` already get `text-wrap: balance`.

### Spacing and layout

- Container: `Container` = `mx-auto max-w-[1320px] px-5 sm:px-8` (20px gutter on phones). `size="narrow"` = 880px.
- Page header: `pt-28 sm:pt-32` (clears the fixed nav), `pb-14 lg:pb-20`.
- Sections: bottom padding only, `pb-24 lg:pb-32` (`spacing="default"`), `pb-16 lg:pb-20` (`"tight"`).
- Heading to body gap: `mt-10 lg:mt-12` (Section does it).
- Grids: `gap-4 lg:gap-5` between cards/panels. 12 columns on `lg`, single column below `lg` unless a
  2-column phone layout is obviously better. Bento spans alternate 7/5 and 5/7.
- Panel padding: `p-6 sm:p-10 lg:p-12` (Panel `padding="lg"`), cards `p-5 sm:p-6`.
- Breakpoints: Tailwind defaults (sm 640, md 768, lg 1024, xl 1280).

### Layers and z-index

- `globals.css` puts element defaults in `@layer base` and component classes (`.pill`, `.chip`,
  `.phone`, `.window`, `.mark-tile`, `.lightbox*`, `.rail`) in `@layer components`, so any Tailwind
  utility you add on top wins (e.g. `className="pill pill-primary h-9"` really is 36px tall).
- Z scale: backdrop `.field` and the floating-fragment layer `.drift` -1, content auto, nav 40, grain 50, dialogs in the native top layer.
- Backdrop (`src/components/site/Backdrop.tsx`): the plaster `.field` plus blurred real app fragments (`public/backdrop/*.webp`) on three depth planes that drift up slower than the page via a CSS scroll-driven animation. Edges only, away from text columns; fewer and smaller on phones; static under reduced motion.
  Do not add other z-indexes except local stacking inside a visual (0-3).

---

## 2. Routes and global chrome (done, do not edit)

- `src/app/layout.tsx`: fonts, backdrop, skip link (`#main`), `<Nav>`, `<main id="main">`, `<Footer>`, grain.
  Metadata: `title.template = "%s | 조경석"`, default `"조경석, Android 개발자"`, description `person.lede`.
  Your pages export `metadata = { title: "프로젝트" }` or `generateMetadata` returning `{ title: p.name }`.
- Nav (`src/components/site/Nav.tsx`): pill nav, active route via `usePathname` (`/projects/*` highlights 프로젝트).
- Footer: name, email, GitHub, velog.
- `not-found.tsx`: styled 404 inside the layout. Call `notFound()` for unknown slugs.
- Pages render only their content: do not add another `<main>`, nav or footer.

Placeholders you replace: `src/app/projects/page.tsx`, `src/app/projects/[slug]/page.tsx`,
`src/app/study/page.tsx`, `src/app/study/[slug]/page.tsx`. The `[slug]` placeholders already show the
Next 16 pattern (keep it):

```tsx
export const dynamicParams = false; // unknown slugs 404, everything is prerendered
export function generateStaticParams() { return projects.map((p) => ({ slug: p.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;            // params is a Promise in Next 16
  const p = getProject(slug);
  return p ? { title: p.name, description: p.tagline } : {};
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  ...
}
```

Next 16 notes: `next/image` uses `preload` (not `priority`, deprecated) for the LCP image;
local images in `/public` need no config; `next/link` needs no `<a>` child.

---

## 3. Content helpers (`src/lib/content.ts`)

Import everything from `@/lib/content` (it re-exports `person`, `projects`, `study`, `record` and the types).

| Helper | Returns |
|---|---|
| `projectHref(slug)`, `studyHref(slug)` | `/projects/<slug>`, `/study/<slug>` |
| `getProject(slug)`, `getStudy(slug)` | item or `undefined` |
| `projectsSorted` | all projects, newest first by start month (ties keep site.ts order) |
| `featuredProjects` | `featured: true` projects in site.ts order (currently 5; do not assume 4) |
| `hasImages(p)`, `imageLayoutOf(p)` | screenshot presence, `"phone"` or `"desktop"` |
| `projectCount`, `studyCount` | totals |
| `STUDY_AREAS` | `["Android", "Kotlin", "인프라·연구", "협업·교육"]` display order |
| `featuredStudy` | `featured: true` study notes |
| `relatedProject(study)` | the project in `study.related`, if any |
| `studiesForProject(slug)` | study notes whose `related` is this project |
| `adjacentProject(slug, list, wrap = false)` | `{ prev?, next? }` |
| `adjacentStudy(slug, list, wrap = false)` | `{ prev?, next? }` |
| `adjacent(list, slug, wrap)` | generic version |
| `nowItems` | `person.now` with `href` when site.ts links it to a project or study note |
| `startKey(period)` | sortable number from `"2025.08 - ..."` |

Prev/next must follow the same order the listing page shows, and both sections wrap around
(`wrap = true`): `/projects/[slug]` passes `projectsInListOrder` (src/components/projects/order.ts),
`/study/[slug]` passes `studyOrder` (src/components/study/order.ts).

---

## 4. Primitives (`src/components/ui`, import each from its own file, e.g. `@/components/ui/Panel`)

All are Server Components unless marked (client). Icons: Phosphor only, `weight="bold"`,
`@phosphor-icons/react/ssr` in server files, `@phosphor-icons/react` in client files.

### Container
`<Container size="page" | "narrow" as="div" className>`: the horizontal frame. Everything on a page sits in one.

### PageHeader
Top of every inner page; renders the page `h1` and the entrance stagger.

| Prop | Type | Notes |
|---|---|---|
| `title` | ReactNode | required, the h1 |
| `titleNote` | ReactNode | muted line under the title (e.g. `nameNote`) |
| `lede` | ReactNode | `type-lede`, max 40rem |
| `back` | `{ href, label }` | small ghost pill with left arrow, above everything |
| `lead` | ReactNode | above the title, e.g. `<ProjectMark project={p} size={72} float />` |
| `meta` | ReactNode | under the lede, e.g. `<MetaList>` |
| `actions` | ReactNode | row of `LinkButton`s |
| `aside` | ReactNode | right column on lg (7/5 split), below text on phones |
| `children` | ReactNode | extra block at the end |
| `id` | string | h1 id, default `"page-title"` |

```tsx
<PageHeader
  back={{ href: "/projects", label: "프로젝트" }}
  lead={<ProjectMark project={p} size={72} float />}
  title={p.name}
  titleNote={p.nameNote}
  lede={p.tagline}
  meta={<MetaList columns={3} items={[{ label: "기간", value: p.period }, { label: "플랫폼", value: p.platform },
    { label: "상태", value: p.status }, { label: "팀", value: p.team }, { label: "역할", value: p.role, wide: true }]} />}
  actions={p.links.map((l, i) => <LinkButton key={l.href} href={l.href} variant={i === 0 ? "primary" : "ghost"}>{l.label}</LinkButton>)}
/>
```

### Section and SectionHeading
`<Section id title? count? lede? action? headingSize="lg"|"md"|"sm" spacing="default"|"tight"|"none" containerSize bodyClassName label>`
renders `<section id aria-labelledby="{id}-title">` + Container + heading + children. Without `title`, pass `label` (aria-label).

`<SectionHeading id title count? lede? action? size="lg"|"md"|"sm" as="h2"|"h3"|"h4">` stacks title, lede and an
optional `action` link (`{ href, label }`, right end of the title row on md+). `count` prints a small muted number after
the title (e.g. items in a year group). Use it for group headings inside a section:

```tsx
<Section id="y2026" title="2026" count={items.length} headingSize="md" spacing="tight">...</Section>
<SectionHeading as="h3" size="md" title="맡은 일" />
```

### Buttons and links
- `LinkButton href variant="primary"|"ghost" size="md"|"sm" icon? arrow="auto"|"right"|false iconOnly? label?`:
  pill link. Internal hrefs use `next/link`; `http(s)` opens a new tab with an up-right arrow and a hidden "(새 창)";
  `mailto:` stays. Use `arrow="right"` for internal "모두 보기" style links. One primary per view.
- `Button` (same look, `<button type="button">`, any button attribute).
- `TextLink href`: quiet inline link with an arrow.
- `BackLink href label`: small ghost pill with a left arrow (PageHeader `back` uses it).

CTA labels: contact intent is always "메일 보내기". Keep labels on one line.

### Chip and ChipList
`<Chip tone="default"|"surface"|"accent" size="sm"|"md">`, `<ChipList items label? max? tone size>`.
`default` sinks into a surface (use on panels/cards), `surface` rises (use on the backdrop or inside wells), `accent`
at most once per card. `max` shows the first N and a "+N" chip.

```tsx
<ChipList items={p.stack} label="사용 기술" />
<ChipList items={s.topics} label="다룬 주제" size="md" />
```

### MetaList
`<MetaList items={[{ label, value, wide? }]} columns={1|2|3|4}>`: `<dl>` grid, no row rules. Items with empty values
are skipped, so optional fields (`team`) can be passed as is. Phones get 2 columns; `wide` spans the row.

### Prose and ItemList
- `<Prose paragraphs={p.summary} size="md"|"lg">`: paragraphs, max 42rem.
- `<ItemList items={p.features} columns={1|2} size="md"|"sm" tone="accent"|"plain" label?>`: statements with a small
  neutral round bullet on the first line. Use for `features`, `myWork`, `highlights`, study `sections[].items`.

### Panel and Note
- `<Panel tone="surface"|"lift"|"accent"|"well" padding="lg"|"md"|"sm"|"none" radius="panel"|"card"|"inner" as>`.
- `<Note>`: small muted line with an info glyph for `note`, `imageNote`, `caveat`.

### Device frames
- `<PhoneFrame img sizes preload depth="near"|"far"|"flat" decorative? showGround?>`: real screenshot in a phone body.
  Size it with a wrapper width (`<div className="w-[220px]">`). Handles the 다모임 design-export crop automatically.
  `SCREEN_ASPECT` is exported (452/980); a screenshot whose own aspect differs by more than 0.03 (e.g. 1:2 captures) gets its own aspect instead of being cropped (`screenAspectFor`).
- `<WindowFrame img sizes preload depth="near"|"flat" aspect? decorative?>`: desktop screenshot as a floating window.
  Natural aspect by default; `aspect={16 / 10}` crops from the top so a grid lines up. No fake title bar.

Use `decorative` (alt="") only when a caption or a surrounding link already names the screen.

### ScreenshotGallery (client) and Lightbox (client)
`<ScreenshotGallery images layout label variant="rail"|"grid" columns?={2|3|4} captions?={true}>`
Each screenshot is a button that opens a full-screen native `<dialog>`: focus moves to the close button, Esc closes,
Left/Right arrows and swipes move, clicking the empty area closes, focus returns to the thumbnail of the image last
viewed. Captions come from `img.caption`; the dialog also shows `caption ?? alt`.

- Phones: `variant="rail"` for 5+ screens (scroll-snap strip with prev/next pills), `"grid"` (4 columns) for fewer.
- Desktop: `variant="grid"` (2 columns, 16/10 crops) or `"rail"`.
- `Lightbox` is exported for custom triggers: `<Lightbox images layout index={number|null} onIndexChange onClose label />`.

```tsx
<ScreenshotGallery images={p.images} layout={imageLayoutOf(p)} label={`${p.name} 화면`} variant={p.images.length > 4 && imageLayoutOf(p) === "phone" ? "rail" : "grid"} />
```
Note: `shoot.py` lists rail items under "overflowing" because they extend inside the scroll container. That is
expected as long as `scrollWidth === innerWidth`.

### ProjectMark, ProjectMarkStack, ProjectMarkGrid
- `<ProjectMark project size={48} float? decorative?={true}>`: the app icon, or a typographic squircle with the
  first letter when site.ts has no icon (7 projects have none). Same footprint either way.
- `<ProjectMarkStack projects max size overlap?>`: a row of marks + "+N".
- `<ProjectMarkGrid projects max={9} size cols={3}>`: an app-folder grid + "+N".
- `iconsFirst(list)`: projects with real icons first (for rows and folders).

### ProjectVisual
`<ProjectVisual project size="lg"|"md"|"sm" radius="rounded-card" aspectClass? preload?>`: the project's picture on a
sunk stage, composed from real data: 3 (lg) or 2 (md, sm) phones rising from the bottom edge, two layered windows for
desktop apps, or the floating icon/initial tile for projects without screenshots. Devices lift when an ancestor with
class `group` is hovered. Default aspect: 16/10 for desktop screenshots and for lg, else 4/3.

### ProjectCard
`<ProjectCard project variant="feature"|"card"|"row" visual="lg"|"md" stageClass? headingAs="h3" preload?>`
One link per card (stretched link on the name, focus ring on the whole card).

- `feature`: big stage + name, tagline, meta. For showcases (home bento). `stageClass` sets one stage height per row,
  e.g. `"aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto lg:h-[420px]"`.
- `card`: 16/10 stage + name + 2-line tagline + meta. For 2-3 column grids; every card in a grid lines up.
- `row`: mark + name + tagline, meta on the right from md. Transparent until hover: put rows in a
  `<Panel tone="well" padding="sm">` or on the backdrop, `grid gap-1`.

The icon shows once per card: next to the name when the stage shows screenshots, only on the stage otherwise.
`ProjectMeta` (kind chip, period, platform) and `CardArrow` (round arrow badge) are exported for custom layouts.

### StudyCard
`<StudyCard item variant="feature"|"card"|"row" tone="surface"|"accent" topics? headingAs>`

- `feature`: meta, title, short at the top; topic chips (all, or first `topics`) and source at the bottom.
- `card`: meta, title, short (3 lines), first 3 topics (`topics` to change).
- `row`: title + short, area chip and period on the right from md.

`StudyMeta` (area chip + period) is exported.

### PrevNext
`<PrevNext prev?={{ href, title, mark? }} next? prevLabel="이전" nextLabel="다음" label="다른 글 보기">`: two tiles at
the end of a detail page; a missing side leaves its column empty.

```tsx
const { prev, next } = adjacentProject(p.slug, projectsInListOrder, true);
<PrevNext label="다른 프로젝트" prevLabel="이전 프로젝트" nextLabel="다음 프로젝트"
  prev={prev && { href: projectHref(prev.slug), title: prev.name, mark: <ProjectMark project={prev} size={40} /> }}
  next={next && { href: projectHref(next.slug), title: next.name, mark: <ProjectMark project={next} size={40} /> }} />
```

### FilterPills (client)
`<FilterPills label options={[{ value, label, count? }]} value onChange>`: single-choice frosted pill bar, buttons
with `aria-pressed`, scrolls sideways on narrow screens. It uses a negative margin to keep its shadow unclipped, so put
spacing on a wrapper (`<div className="mt-8"><FilterPills .../></div>`), not on FilterPills itself.
Filtering needs a small client component in your folder that owns the state and renders the filtered cards.
Prefer grouping (static) over filtering when it reads as well; if you filter, keep every item reachable with "전체".

### Other shared pieces
- `NowList`: `person.now` rows (used by home and /about through `src/components/site/NowSection.tsx`).
- `IconShelf linked?`: the app icons scattered on a square stage.
- `ContactPanel shelf? title? lede?`: closing contact block with the email written out, mail, copy, GitHub, velog.
  Default (no shelf): title left, address and buttons right on lg. `shelf` adds the icon stage; use it only on a
  page that shows no other icon cluster.
- `CopyEmail email size` (client).

---

## 5. Page patterns

- Inner page = `PageHeader` then `Section`s, bottom padding only. The layout's Footer follows.
- Detail pages: header (back link, mark, title, tagline, MetaList, link buttons), then the gallery, then content
  sections. Keep sections short: a heading plus one component each. Close with `PrevNext` and nothing after it
  except, optionally, a quiet `TextLink` back to the list.
- Vary layout families down a page: a split (Prose left, ItemList right), a full-width Panel, a chip block, a gallery.
  Avoid three identical image+text splits in a row.
- Long lists (more than 5 items) use `columns={2}`, grouping, or cards, never a single column with rules.
- Items without images must still look intentional: `ProjectMark` renders the initial tile; `ProjectVisual` shows it
  floating on a stage. Never render an empty grey box.
- Empty states (e.g. a filter with no matches): one short sentence in `type-body text-ink-2` inside a
  `Panel tone="well"`, plus a button that resets the filter.

---

## 6. Motion

- Entrance: `.rise` with a stagger index, `style={{ "--i": n } as CSSProperties}` (80ms steps). PageHeader already does
  this; do not add more entrance animation to headers.
- Scroll reveal: add `reveal` to a block (CSS scroll-driven `animation-timeline: view()`, no JS). Browsers without
  support and reduced-motion users just see it.
  Put `reveal` on a wrapper, never on an element that also transforms on hover (`tactile`, cards): an animation with
  fill mode wins over the hover transform. Pattern: `<div className="reveal grid"><ProjectCard .../></div>`.
- Hover: `.tactile` lift on cards, `.lift-on-hover` on visuals inside a `.group` (`data-lift="sm"` for a smaller lift).
- Hero parallax (`HeroDevices`) uses Motion values only; never `window.addEventListener("scroll")`, never
  `useState` for continuous values.
- Everything collapses under `prefers-reduced-motion: reduce` (global rule), and `shoot.py` captures with reduced
  motion, so screenshots show the final state.
- Motion must be motivated: entrance hierarchy, feedback on hover/press, state change (lightbox). No loops.

---

## 7. Ownership

Frozen (foundation): `src/app/layout.tsx`, `src/app/globals.css`, `src/app/page.tsx`, `src/app/about/**`,
`src/app/not-found.tsx`, `src/components/ui/**`, `src/components/site/**`, `src/components/home/**`,
`src/components/about/**`, `src/lib/**`, `src/content/**`, `DESIGN.md`.

Yours: `src/app/projects/**` (projects owner), `src/app/study/**` (study owner), and your own
`src/components/projects/**` or `src/components/study/**`.

Verify with:
`python3 tools/shoot.py site <port> shots/<name> --paths=/projects,/projects/pinyut,/projects/landrop`
(read `report.json` if the summary print fails on extra paths), `npm run lint`, and look at every screenshot in light,
dark and 390px before finishing.

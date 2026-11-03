---
name: prism-patterns
description: >-
  Authoritative UI/UX patterns for THIS repo. Use this
  skill whenever generating, scaffolding, updating, refactoring, or reviewing
  any product page, screen, view, layout, or workflow in this project --
  including list pages, entity detail pages, dashboards, wizards, modals, side
  panels, filter panels, popovers, settings pages, empty/first-run/moved/
  prerequisite states, and per-page header/canvas composition. The repo already
  ships a working shell (dark top header, side nav), a canonical list page
  (`/vms`), a detail page (`/vms/$vmId`), and a dashboard (`/`); every new UI
  must extend those patterns rather than introduce new ones. Triggers: "create
  a list page", "add a new page", "build a workflow", "make a dashboard", "add
  a detail page", "scaffold a screen", "create an empty state", "add a modal",
  "open a side panel", "filter panel", "create wizard", "settings page",
  "matches the rest of the product", "follows our patterns", "Prism Central
  style", "looks like our product", "consistent with the product", "another VM
  page", "another templates page", or any prompt where the agent needs to
  decide page structure / layout for new UI in this repo. Pair with
  `prism-craft` (which dictates which Prism React components and tokens to
  use); pair with `ebr` whenever the page renders an entity browser, table,
  filters, actions, side panel, or detail-tab subresource list. This skill
  dictates page archetype and shell composition; EBR owns entity browsing.
---

# Prism Central UI Pattern Skill

## Why this skill exists

This repository is a working UI replica of Prism Central. It already ships:

- A global shell in [`apps/web/src/routes/__root.tsx`](/apps/web/src/routes/__root.tsx)
  built on `MainPageLayout` (dark header + left side nav + grey body).
- A side nav in [`apps/web/src/components/layout/side-nav/`](/apps/web/src/components/layout/side-nav)
  whose menu data is the source of truth for in-product navigation.
- A dark top header in [`apps/web/src/components/layout/header/`](/apps/web/src/components/layout/header).
- A canonical list page at `/vms`
  ([`apps/web/src/components/vms/`](/apps/web/src/components/vms)).
- A canonical detail page at `/vms/$vmId`
  ([`apps/web/src/components/vms/VmDetailsPage.tsx`](/apps/web/src/components/vms/VmDetailsPage.tsx)).
- A canonical EBR browser wrapper for VMs
  ([`apps/web/src/components/vms/VmEbr.tsx`](/apps/web/src/components/vms/VmEbr.tsx)).
- A dashboard at `/`
  ([`apps/web/src/components/dashboard/`](/apps/web/src/components/dashboard)).

The active implementation is defined by route imports, not by folder names
alone. In the current tree, `/vms` uses
[`apps/web/src/routes/vms/route.tsx`](/apps/web/src/routes/vms/route.tsx)
plus [`apps/web/src/routes/vms/index.tsx`](/apps/web/src/routes/vms/index.tsx),
and `/vms/$vmId` uses
[`apps/web/src/routes/vms/$vmId.tsx`](/apps/web/src/routes/vms/$vmId.tsx).
Those routes import from the top-level
[`apps/web/src/components/vms/`](/apps/web/src/components/vms) barrel.
Nested VM folders such as `apps/web/src/components/vms/vm/`,
`apps/web/src/components/vms/vm-ebr/`, and
`apps/web/src/components/vms/vm-details-page/` are not canonical pattern
sources unless a route imports them directly.

Designers and engineers prompt the agent ("create a list page for backups",
"add a detail page for an alert", "build a templates page") and expect the
generated UI to drop into this scaffold without retheming or re-inventing
shell pieces. The agent reliably picks correct Prism React components (via
`prism-craft`); it tends to miss **which layer owns which UI**. Page chrome
belongs to this pattern skill. Entity lists, table columns, filter bar/panel,
grouping, row actions, side panels, export, and detail-tab subresource tables
belong to EBR.

## Reusable building blocks

Before composing a page from raw Prism primitives, decide whether the content
is entity browsing. If it is, use EBR and the `ebr` skill; do not
hand-build a table, filter row, paginator, action toolbar, or side panel from
Prism components. Raw Prism/common components are for page chrome, dashboard
widgets, settings surfaces, modals, and non-EBR one-off content.

Use existing common components in
[`apps/web/src/components/common/`](/apps/web/src/components/common) only for the slots
they own, such as route-level `PageHeader`. Do not use `SearchBar`,
`ListFooter`, or raw `Table` as substitutes for EBR on entity pages.

## How to use this skill

Follow this loop every time you generate UI in this repo:

1. **Identify the archetype.** Use the decision tree below to pick the right
   page type. Most prompts map cleanly to one of: list, detail, dashboard,
   wizard/modal, side panel, settings, or empty/first-run/moved state.
2. **Read [`references/global-shell.md`](references/global-shell.md) first.**
   It explains the shell that's already mounted in `__root.tsx` and what
   each new route is responsible for (almost always: a 50px white page-header
   strip + content). Skipping it leads to pages that re-render the dark top
   bar or replace the side nav by accident.
3. **If the page browses entities, read the `ebr` skill.** Use it for
   `EntityBrowser` / `EntityBrowserView`, schema, perspectives, filters,
   action checkers, component factory, query config, side panels, export, and
   detail-tab EBRs. Aphrodite list pages such as VM and Cluster use this
   pattern; the browser itself is not a hand-built Prism `Table`.
4. **Read the matching reference file** in `references/`. Each one points at
   the existing implementation in the codebase.
   Reference files are short and self-contained — read the whole one you need.
5. **Resolve the active path through the route file before copying a pattern.**
   Flat placeholder pages live directly under `apps/web/src/routes/*.tsx`.
   Nested pages such as `/vms` use a folder `route.tsx` plus `index.tsx` or
   `$param.tsx`. Follow the component imported by the route; ignore duplicate
   or experimental folders that are not imported.
6. **Read [`references/content-and-copy.md`](references/content-and-copy.md)**
   for tone, count language, empty-state copy, action labels, and the
   "disabled-but-visible" rule that the real product uses.
7. **Compose the page.** Use Prism React components per `prism-craft`. Use
   the layout sequence from the reference file. Mirror the existing page's
   token usage (`background="base"`, `background="body"`, `--color-border-separator`,
   etc.) instead of hardcoding colors.

## Decision tree: which pattern do I generate?

```
Is the user creating something new in a multi-step / configuration-heavy form?
  ├── yes → wizard (full-page) or enablement modal (centered)   → references/wizard-and-modal.md
  └── no
       │
       Is the page primarily a collection of entities (rows you can act on)?
         ├── yes → EBR-backed list page                                  → references/list-page.md + ebr
         └── no
              │
              Is the page about ONE entity (status, properties, sub-resources)?
                ├── yes → detail page; use EBR for actions/subresource tabs  → references/detail-page.md + ebr
                └── no
                     │
                     Is the page an aggregate of widgets/cards/charts?
                       ├── yes → dashboard                                    → references/dashboard.md
                       └── no
                            │
                            Is the page absent of meaningful data right now?
                              ├── yes → pick the right empty/onboarding/moved → references/empty-and-onboarding.md
                              └── no
                                   │
                                   Is it part of system configuration (auth, KMS, licensing, ...)?
                                     ├── yes → settings page                  → references/settings.md
                                     └── no  → re-read the prompt; you almost certainly fit one of the
                                                 above. If truly novel, ask the user before inventing.
```

For interactions that **layer on top of** another page (filter panels, drill-
down detail panels over a list, top-bar popovers, overflow menus), see
[`references/side-panels-popovers-overflow.md`](references/side-panels-popovers-overflow.md).

## Non-negotiable rules

These rules describe what every existing page in this repo already does. They
are also the rules that hold across the captured Prism Central screens.
Violating them is the single biggest "doesn't look like our product" tell.

1. **The shell is already mounted; do not re-mount it.** The dark top header
   and the side nav live in `__root.tsx` via `MainPageLayout`. New routes
   render **into the body slot** as plain children. Don't wrap your page in
   another `MainPageLayout`, don't render another `Header`, don't render
   another `SideNav`. See `references/global-shell.md`.
2. **The global `SideNav` is always mounted on every page.** The dark top
   bar and the side nav are present on every page in this product —
   dashboard, list, detail, settings, wizard, all of them. The only way
   the side nav goes away visually is when the user collapses it with
   the hamburger toggle in the top header (`leftPanelVisible`). Routes
   never collapse, hide, replace, or unmount it. If a page needs its
   own page-level menu (e.g. the settings menu), that menu lives
   **inside the body content area**, alongside the global side nav, not
   in place of it.
3. **Every new page starts with a 50px white page-header strip.** Render
   `<PageHeader title="..." tabs={<Tabs ... />} rightContent={...} />` from
   [`~/components/common`](/apps/web/src/components/common/page-header) — it
   encodes the 50px height, white background, side padding, separator border,
   and the title + tabs + right-content layout used in `apps/web/src/components/vms/VmPage.tsx` and `apps/web/src/routes/index.tsx`. Detail pages are the one exception (different header
   anatomy — see `references/detail-page.md`).
4. **Body content sits on the grey canvas.** The body slot in `__root.tsx`
   already wraps `<Outlet />` in `<StackingLayout background="body">`, which
   resolves to the grey `--color-background-body` surface. Toolbars, filter
   rows, count lines, and banners sit directly on this grey canvas — they are
   **not** wrapped in a white card.
5. **EBR owns entity data regions.** For entity lists and detail-tab
   subresource lists, mount EBR inside the page content and configure it
   through schema, perspectives, query config, actions, and factory. Do not
   wrap a hand-built Prism `Table` in a white card when EBR can render the
   browser.
6. **Tabs live in the white page-header strip, on the same row as the title.**
   They do not live in the dark top header (which belongs to `MainPageLayout`)
   and they do not float on the grey canvas.
7. **Disabled actions stay visible.** Row-selection actions like Update,
   Delete, Acknowledge, Rename remain visible through EBR action config and
   capability checks even when no row is selected — they teach the user what
   becomes available.
8. **Never render a blank page.** "No data" is a designed pattern, not a
   default. Pick the right empty/first-run/prerequisite/moved state from
   `references/empty-and-onboarding.md`.
9. **Counts and inline relationships beat freeform text.** Lists expose
   result counts through EBR/browser chrome. Detail headers carry tag chips
   and linked counts ("VM", "Cluster <name>", "Host <name>") — see
   `VmDetailsPage.tsx`. Empty sections still render an explicit empty state
   rather than disappearing.
10. **Side panels compress; modals overlay.** A right-side panel pushes the
    table narrower instead of overlaying it. A modal dims the page underneath.
    Picking the wrong one breaks the spatial logic the user expects.
11. **Reuse, do not invent.** If a prompt seems to need a new layout, you
    have almost certainly missed an existing pattern. Re-read the decision
    tree. Only deviate when the user has explicitly asked for a one-off; flag
    the deviation in code comments.

## Tokens and theming (no hardcoded colors)

The shell, list page, detail page, and dashboard all use semantic tokens from
`@nutanix-core/prism-ui-themes-common`. Use the same set — they auto-switch
between light and dark themes:

| Surface or element                                        | Token / prop                                                                                    |
| --------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| White surfaces (page-header strip, cards, panels, tables) | `background="base"` on Prism layout components, or `var(--color-background-base)` in CSS        |
| Grey canvas (page body)                                   | `background="body"` (already applied in `__root.tsx`), or `var(--color-background-body)` in CSS |
| Dark top header                                           | `var(--color-background-nav-base)` (see `Header.css`)                                           |
| Side nav rail                                             | Token-driven via `Menu type={Menu.MenuType.SECONDARY}` (see `SideNav.tsx`)                      |
| Separator below page-header strip                         | `border-bottom: 1px solid var(--color-border-separator)`                                        |
| Separator inside dark header                              | `var(--color-border-nav-separator)`                                                             |
| Body text on white                                        | `var(--color-text-primary-paragraph)` (or `-label` for labels, `-interactive` for buttons)      |
| Secondary text                                            | `var(--color-text-secondary-paragraph)` (or `-label` / `-interactive`)                          |
| Link text                                                 | `var(--color-text-link)`                                                                        |
| Status badge backgrounds (info/neutral chips)             | `var(--color-background-info-neutral)`                                                          |
| Success / warning / error icons and accents               | `var(--color-text-success)`, `var(--color-text-warning)`, `var(--color-text-error)`             |

If you're unsure which token to use, look at the closest existing component
file (`VmPage.tsx`, `VmDetailsPage.css`, `Header.css`) and reuse the token it
uses. Reference files in this skill use semantic descriptions ("white",
"grey", "dark") for readability — when you write code, always reach for a
token, never an RGB triplet.

## Reference files

Each file is a small, self-contained recipe anchored to the existing
implementation. Read the one you need; don't load all of them up front.

- [`references/global-shell.md`](references/global-shell.md) — What
  `__root.tsx` mounts for you, how `SideNav`'s menu groups work, the
  rule that the global side nav is always mounted (only the user can
  collapse it via the hamburger), and what each new route is responsible
  for adding.
- [`references/list-page.md`](references/list-page.md) — EBR-backed entity
  list page: route/page chrome plus an `EntityBrowserView`/`EntityBrowser`
  component configured with schema, perspectives, query config, actions,
  factory, filters, side panels, and export. Also notes when a non-EBR
  operations/status list may use a hand-built table. Anchored to the current
  `/vms` route folder and top-level `components/vms` implementation.
- [`references/detail-page.md`](references/detail-page.md) — Detail context
  band (back action + entity-type tag chip + entity name + inline
  relationship breadcrumbs), tabs row, summary panels where appropriate, and
  EBR for details actions and subresource tabs such as NICs/disks/alerts.
- [`references/dashboard.md`](references/dashboard.md) — Dashboard pattern as
  implemented in `routes/index.tsx` + `DashboardPc.tsx` (50px white title
  strip + `react-grid-layout` of `DashboardWidget` cards).
- [`references/empty-and-onboarding.md`](references/empty-and-onboarding.md)
  — Choosing between filtered empty, first-run educational landing,
  prerequisite-blocked, and moved-capability states.
- [`references/wizard-and-modal.md`](references/wizard-and-modal.md) — Full-
  page wizard, "What's New" modal, enablement/prerequisite modal.
- [`references/side-panels-popovers-overflow.md`](references/side-panels-popovers-overflow.md)
  — Right-side filter panel, right-side detail panel, top-bar popover,
  overflow menu (with disabled-with-tooltip pattern).
- [`references/settings.md`](references/settings.md) — Settings as a regular
  grey-canvas route by default in this prototype, plus the optional white
  settings-left-menu deviation if the user explicitly asks for it.
- [`references/content-and-copy.md`](references/content-and-copy.md) — Count
  language, action labels, empty-state copy, banner copy, the disabled-but-
  visible rule, and the inline-relationship convention.

## Assets

Curated screenshots from the real Prism Central product live in `assets/`.
Each reference file cites one or two of these. Use them for visual
verification only — do not lift design tokens from PNGs; use the project's
real tokens (table above, plus `prism-craft`).

## Working with `prism-craft`

This skill answers **"what page do I generate, what slots does it have, and
how does it wire into this codebase?"**. The `prism-craft` skill answers
**"which Prism React component do I use and which props/tokens?"**. They are
designed to compose:

1. Use this skill's decision tree to pick an archetype.
2. If the archetype browses entities, use `ebr` for the browser internals.
3. Use the matching reference file's layout sequence and slot list.
4. For route-level chrome such as `PageHeader`, use the existing common
   component. For entity browser internals, do not replace EBR with common
   `SearchBar`, `ListFooter`, or raw `Table`.
5. For non-EBR slots, use `prism-craft` to fill the slot with the correct
   Prism component.

If a layout instruction in this skill conflicts with a Prism component
default, prefer this skill — the goal is product consistency with the rest of
this prototype, not raw component defaults. Note any such conflict in a code
comment.

## When the prompt is novel

Sometimes the user asks for something genuinely new (e.g. "show a real-time
log streaming view"). Default behavior:

1. Find the closest existing archetype (a log stream is closest to a Tasks-
   style list with no selection plus a detail side panel).
2. Inherit shell, header strip, grey/white surfaces, count language, and
   empty-state behavior from that archetype.
3. Only the truly novel piece (e.g. a streaming text region) is new — and
   even then it lives inside a white card on the grey canvas.

If you cannot fit the request into any existing archetype after this
exercise, ask the user to confirm before inventing a layout.

## Pre-flight checklist before you commit a new page

Run through this list before the page goes in:

- [ ] Route file in `apps/web/src/routes/` is a thin `createFileRoute` wrapper
      that renders a component from `apps/web/src/components/<feature>/`.
      Flat placeholder pages can be single files (`templates.tsx`); nested
      pages use `route.tsx` plus `index.tsx` / `$param.tsx`, as `/vms` does.
- [ ] Page does **not** render its own `MainPageLayout`, `Header`, or
      `SideNav` — the global shell is already mounted in `__root.tsx`.
- [ ] First element inside the page is `<PageHeader />` from
      `~/components/common` (or, for detail pages, the detail context band).
      Don't hand-roll the 50px strip from `FlexLayout` + `Title`.
- [ ] If the page is an entity list, it mounts EBR and reads the `ebr` skill
      for schema, perspectives, actions, factory, query config, filters, and
      export. It does not hand-build a Prism `Table`, `SearchBar`, or
      `ListFooter`.
- [ ] Body content sits on the grey canvas (don't wrap it in a white
      `ContainerLayout` unless you mean a literal card).
- [ ] All colors come from tokens; no hex / RGB literals in JSX or CSS.
- [ ] If the page is a list, row-selection actions remain visible-but-
      disabled through EBR action/capability config when nothing is selected.
- [ ] If a section has no data, the empty state matches one of the variants
      in `references/empty-and-onboarding.md`.
- [ ] Counts match the language in `references/content-and-copy.md`.
- [ ] Add an entry to `MENU_DATA` in `apps/web/src/components/layout/side-nav/constants.ts`
      so the page shows up in the side nav (if it's a top-level entity page).

# Side Panels, Popovers, And Overflow Menus

Use this for any interaction that **layers on top of** an existing page
without navigating away. The big rule: **side panels compress, modals
overlay, popovers anchor**.

Reference screenshots:

- Right-side filter panel (Templates list with filters open): [`../assets/sidepanel-filter.png`](../assets/sidepanel-filter.png)
- Right-side detail panel (Task detail over the Tasks list): [`../assets/sidepanel-task-detail.png`](../assets/sidepanel-task-detail.png)
- Top-bar popover (Tasks): [`../assets/popover-tasks-topbar.png`](../assets/popover-tasks-topbar.png)
- Overflow menu over a detail page (Host detail "More"): [`../assets/overflow-host-more-menu.png`](../assets/overflow-host-more-menu.png)

## Pick by intent

| Intent                                                               | Pattern                                                                            |
| -------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Edit / configure something while keeping the underlying list visible | **Right-side filter panel**                                                        |
| Inspect details of one row without leaving the list                  | **Right-side detail panel**                                                        |
| Quick global status check from the top bar                           | **Top-bar popover** (also covered in [`wizard-and-modal.md`](wizard-and-modal.md)) |
| Reveal low-frequency actions that would overcrowd the toolbar        | **Overflow menu** (anchored to its trigger)                                        |

If the interaction requires the user to make a setup or creation decision
that is independent of the underlying page, use a modal or wizard from
[`wizard-and-modal.md`](wizard-and-modal.md) instead.

## Right-side filter panel

For entity browser pages, the filter panel is rendered by EBR itself. Do not
compose a separate Prism drawer or right-hand layout for list filters. Enable
and configure EBR's filter panel through `showFiltersPanel`,
`filtersPanelCollapsed`, schema/perspective `filterByAttributes`, and
`entityConfig.filters`. See `/docs/ebr-source-of-truth-research.md` for the
EBR filter and panel contract.

| Property           | Value                                                                                                                                                                                                                               |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Placement          | Right side of the list page, anchored to the right edge of the content area                                                                                                                                                         |
| Width              | Fixed-width, ~280px                                                                                                                                                                                                                 |
| Background         | White, with a thin left border separating it from the list                                                                                                                                                                          |
| Effect on the page | **The list table region compresses narrower to make room for the panel.** The panel does NOT overlay; the table is pushed                                                                                                           |
| Header             | "Filters" title + `⋮` overflow menu + `×` close                                                                                                                                                                                     |
| Body               | Collapsible "Favorite Filters" accordion + per-attribute sections ("Name", "Status", etc.) with: comparator dropdown ("Contains ⌄", "Equals ⌄"), value input, and `+ Add Rule` link to add another condition for the same attribute |
| Footer             | Optional `Apply` / `Cancel` row when changes are batched                                                                                                                                                                            |

Use it any time the user needs to edit complex multi-field filters that
don't fit in the inline filter row.

## Right-side detail panel

For entity browser pages, row/detail side panels are also rendered by EBR.
Configure them through perspective `sidePanels`, a `sidePanelLink` formatter,
and the EBR component factory's side-panel override (for example
`COMPONENT_IDS.EB_SIDE_PANEL`). Do not build a parallel side panel around the
EBR table unless the page is explicitly not an EBR page.

| Property           | Value                                                                                                                                                                                                                                                                                                        |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Placement          | Right side over the list, anchored to the right edge                                                                                                                                                                                                                                                         |
| Width              | Wider than the filter panel — roughly 1/3 of content width — because it carries details and child tables                                                                                                                                                                                                     |
| Background         | White                                                                                                                                                                                                                                                                                                        |
| Effect on the page | The originating list compresses to make room. **The clicked row in the underlying table highlights light blue** so the user keeps context                                                                                                                                                                    |
| Header             | Entity name on the left, `□` expand / maximize icon, `×` close on the right                                                                                                                                                                                                                                  |
| Body               | Optional pink/red error block at the top with internal `⟨ 1 of N ⟩` paginator if multiple errors. Then "Details" key/value table (Overall Status, Entities Affected with chip lists, Cluster, Project, Initiator, timestamps, durations). Then sub-step lists or child tables. Body scrolls within the panel |
| Footer             | Usually none — actions live inline in the body or in the parent toolbar                                                                                                                                                                                                                                      |

Use it for inspection of operational objects (tasks, audit events, alerts
where appropriate) where the user needs context that doesn't justify a full
detail page.

## Top-bar popover

See [`wizard-and-modal.md`](wizard-and-modal.md). Recap:

- Anchored under the top-bar icon, near the top-right.
- Compact panel with header (title + status counts), scrollable rows body,
  and a split-button footer ("Clean up" / "View All").
- Does not take over the page; the page underneath stays visible and
  interactive.

## Overflow menu

Use for low-frequency actions that don't fit in the toolbar. Anchored
directly under or beside the trigger ("More", "..."). Sized to its actions
with a subtle drop shadow.

| Property           | Value                                                                                                                                                                                                                                |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Placement          | Anchored to the trigger button                                                                                                                                                                                                       |
| Width              | Fits its longest action label                                                                                                                                                                                                        |
| Effect on the page | Page does not shift                                                                                                                                                                                                                  |
| Disabled items     | Remain visible (greyed text). A disabled item can pair with an inline tooltip explaining why (Host detail's "Remove Host" disabled with "Host cannot be removed: Minimum host count needs to be greater than 3..." next to the menu) |

The disabled-with-tooltip pattern is important: it teaches the user _why_
the action is unavailable rather than silently hiding it.

## When to compress vs. overlay

| Pattern                     | Compresses or overlays                    | When                                                                               |
| --------------------------- | ----------------------------------------- | ---------------------------------------------------------------------------------- |
| Side panel (filter, detail) | **Compresses**                            | The user must keep the underlying list context visible while editing or inspecting |
| Modal                       | **Overlays** (dimmed backdrop)            | The user must focus on a discrete decision; the underlying page is paused          |
| Popover                     | **Anchored** (no compression, no overlay) | A glance, not a sustained interaction                                              |
| Overflow menu               | **Anchored** (no compression, no overlay) | A pick from a short list of actions                                                |

## Common slot mapping (Prism React)

| Pattern         | Component(s)                                                                                                                                                                  |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Filter panel    | EBR-owned filter panel on entity browser pages, configured with `showFiltersPanel`, `filtersPanelCollapsed`, schema/perspective filter attributes, and `entityConfig.filters` |
| Detail panel    | EBR-owned side panel on entity browser pages, configured with perspective `sidePanels`, `sidePanelLink`, and the EBR component factory's side-panel component                 |
| Top-bar popover | `Popover` anchored to a top-bar `Button` icon                                                                                                                                 |
| Overflow menu   | `Menu` / `MenuController` with `MenuItem`s; disabled `MenuItem` paired with a `Tooltip` for the reason                                                                        |

## Anti-patterns

- A side panel that overlays the list instead of compressing it. The whole
  point of a side panel is shared context.
- A modal where a side panel would do (the user actually needs to see the
  list while editing the filter or reading a task's details).
- A popover used for a long sustained interaction (promote to side panel or
  full page).
- An overflow menu that hides items based on context. Disabled-but-visible
  with a tooltip is the convention.
- Forgetting to highlight the originating row in the table when a detail
  side panel is open. The light-blue selected-row state is how users keep
  their place.

# Detail Page

Use this any time the prompt is about ONE entity (one VM, one cluster, one
host, one alert, one task, one backup). Detail pages have a different header
band than list pages — do not reuse the list-page title strip here. Use EBR
for details actions and entity subresource tabs whenever possible.

> **Don't use `<PageHeader />` on detail pages.** The common `PageHeader`
> component renders a plain title (+ tabs / right content) strip. A detail
> page instead leads with a context band (back action + entity-type tag chip
>
> - entity name + inline relationship breadcrumbs) implemented inline by
>   `VmDetailsPage.tsx`. Mirror that inline structure; the common building
>   block only fits list / dashboard / settings pages.

**This pattern already ships in the repo.** Read these files before
generating a new detail page:

- Route: [`apps/web/src/routes/vms/$vmId.tsx`](/apps/web/src/routes/vms/$vmId.tsx)
- Component: [`apps/web/src/components/vms/VmDetailsPage.tsx`](/apps/web/src/components/vms/VmDetailsPage.tsx)
- Styles: [`apps/web/src/components/vms/VmDetailsPage.css`](/apps/web/src/components/vms/VmDetailsPage.css)
- Reusable EBR wrapper for detail actions and scoped tab browsers:
  [`apps/web/src/components/vms/VmEbr.tsx`](/apps/web/src/components/vms/VmEbr.tsx)

The active `/vms/$vmId` route imports `VmDetailsPage` from the top-level
`apps/web/src/components/vms` barrel. Nested files under
`apps/web/src/components/vms/vm/`, `apps/web/src/components/vms/vm-ebr/`, and
`apps/web/src/components/vms/vm-details-page/` are not the canonical detail
pattern unless the route layer is changed to use them.

Also read the project `ebr` skill before implementing actions or any tab that
contains an entity collection. Aphrodite examples:

- `pages/vm/components/ebr/ListEBR.tsx` uses `detailsEntityInfo` with
  `detailsViewOnly` so a detail page can reuse EBR action buttons without
  rendering the full list.
- `vm/pages/VmDetailsPage/VmDetailsNicsTab/ListEBR.tsx` renders a
  parent-scoped detail-tab EBR with a unique `ebId`, global filters,
  `queryProcessorsMap`, action checker, schema, perspectives, factory,
  disabled favorite filters, and export.
- Similar EBR-backed detail tabs exist for VM disks, alerts, events, and GPUs.

Reference screenshots:

- VM Summary (canonical detail): [`../assets/detail-vm-summary.png`](../assets/detail-vm-summary.png)
- Cluster Summary (denser, more tabs): [`../assets/detail-cluster-summary.png`](../assets/detail-cluster-summary.png)
- Host Summary (entity-type tag chip repeats): [`../assets/detail-host-summary.png`](../assets/detail-host-summary.png)
- Sub-resource list inside a detail tab (NICs): [`../assets/detail-vm-nics-subresource.png`](../assets/detail-vm-nics-subresource.png)
- Metrics tab grid: [`../assets/detail-vm-metrics-grid.png`](../assets/detail-vm-metrics-grid.png)
- Overflow menu over a detail page: [`../assets/overflow-host-more-menu.png`](../assets/overflow-host-more-menu.png)

## Required vertical sequence (matches `VmDetailsPage`)

The page renders into the body slot of `__root.tsx` (see
[`global-shell.md`](global-shell.md)). It produces, top to bottom:

1. **Detail context band (white)** — first row inside the route, replaces
   the plain title strip used on list pages. Implemented in
   `VmDetailsPage.tsx` as the `vm-details-header` element. Background
   `var(--color-background-base)` with a thin
   `border-bottom: 1px solid var(--color-border-separator)` (see
   `VmDetailsPage.css`). Contents from left to right:
   - Back action: `Button type={Button.ButtonTypes.ICON_DEFAULT}` containing
     `<ChevronLeftIcon />`, with `aria-label="Back to <list>"`. On click,
     call `navigate({ to: '/<list-route>' })`, as `VmDetailsPage.tsx` does
     for `'/vms'`.
   - Entity-type **tag chip**: small rounded rectangle with
     `var(--color-background-info-neutral)` background and
     `var(--color-text-secondary-interactive)` text (the `vm-details-tag`
     class). Examples: "VM", "Cluster", "Host".
   - Entity name `Title size={Title.SIZES.H3}`.
   - **Inline relationship breadcrumbs**: a sequence of separator-pipe + tag
     chip + linked value units. Each pair has a small `vm-details-tag` for
     the relationship type and a `vm-details-breadcrumb` link for the
     value. Examples observed in `VmDetailsPage.tsx`:
     - `| Cluster <cluster name>`
     - `| Host <hypervisor>`
     - `| VM <vm id>` (cluster detail)
     - `| Host <count> Hosts ⌄` (linked counts that drill into the related
       list)
   - Use `<span className="vm-details-separator">|</span>` between pairs.
2. **Tabs row** — directly below the context band, also on white. Use
   `<Tabs>` with the entity's tab set. The active tab gets a blue underline
   (`Tabs` default). Common tab sets:
   - Compact entity (VM): `Summary | Console | Metrics | Recovery Points |
NICs | Disks | Hardware | Categories | Alerts | Events | Tasks` —
     mirror `VmDetailsPage.tsx`'s `VM_DETAILS_TABS`.
   - Infrastructure entity (Cluster): adds Storage Usage, Hardware,
     Capacity, Security, Internal Interfaces, etc.
     In `VmDetailsPage.css`, the `Tabs` background is overridden to
     `var(--color-background-base)` so it visually continues the white band.
3. **Grey canvas content area** begins immediately below the tabs. The
   `vm-details-content` class sets
   `background-color: var(--color-background-body)` and `padding: 20px`.
4. **Actions** on Summary and detail tabs. Prefer EBR action plumbing over a
   hand-built toolbar:
   - For entity-level actions on a summary/details page, mount EBR in
     details-only mode (`detailsEntityInfo.detailsViewOnly`) and let the EBR
     action config, capability checker, and factory render the action buttons.
   - For subresource tabs, the EBR instance owns the tab's action toolbar,
     row selection, filters, export, and table/grid.
   - Use Prism buttons directly only for actions that are not part of EBR
     entity/action semantics.
5. **Stacked white panels** organized into columns (Summary tab, Cluster
   Summary, Host Summary). `VmDetailsPage.tsx` uses three columns with
   `<FlexLayout itemGap="L" alignItems="flex-start">` containing three
   `<StackingLayout className="vm-details-column">` columns. Each column
   stacks domain-specific widgets:
   - Column 1 (entity itself): Details, Compute, Storage.
   - Column 2 (governance + infra): Policies and Management,
     Infrastructure, External Devices.
   - Column 3 (operations): Performance, Alerts, Anomalies.
6. **Each panel is a white summary card** rendered by the local `SummaryCard`
   component in `VmDetailsPage.tsx`:
   - White background (`var(--color-background-base)`), rounded corners,
     subtle shadow (`var(--effect-shadow-level-1)`).
   - Header row with `Title size={Title.SIZES.H3}` left, optional header
     action right (e.g. `<Link>Last Week</Link>`).
   - Body of either two-column key/value rows (the `SummaryRow` helper),
     compact tables, or chart placeholders.
   - Optional footer link ("View All Metrics", "View Mapping").

## Sub-resource tab variant

The active repo implementation currently renders only a heading for
non-summary tabs. Most tabs should stay purpose-built for their content
(console, metrics, hardware, categories, tasks, and similar views do not need
EBR by default).

- Keeps the same context band and tabs row.
- The tab content can start with an **H2 heading** (`Title size={Title.SIZES.H2}`,
  e.g. "NICs") when the design needs an explicit tab title.
- The EBR uses a parent-scoped `ebId`, `useGlobalFilters: true`, and
  `globalFiltersSchema` to bind rows to the current entity.
- Disable favorite filters/custom focuses when saved state would be misleading
  across parent entities.
- Configure subresource columns, filters, actions, empty states, and export in
  EBR schema/perspectives/actions/factory.

Example shape:

```tsx
<EntityBrowser
  ebId={`vnic_ebr-${vmId}`}
  appId="vm"
  entityTypes={['virtual_nic']}
  selectedEntityType="virtual_nic"
  entityConfigs={{
    virtual_nic: {
      actions: EBActionsUtil.processActionsConfig(Actions),
      schema: Schema,
      perspectives: Perspectives,
      filters: {},
    },
  }}
  queryConfig={{
    useGlobalFilters: true,
    globalFiltersSchema: {
      rawFilters: `vm==${vmId}`,
    },
    queryProcessorsMap: {
      virtual_nic: {
        queryProcessorName: 'GroupsV3UQDC',
      },
    },
  }}
  ebComponentFactory={new Factory()}
  showFiltersPanel
  filtersPanelCollapsed
  showFavoriteFilters={false}
  exportSettings={{ visible: true }}
/>
```

## Metrics tab variant

The Metrics tab uses a 2-column chart grid:

- Top toolbar replaces actions with: show-alerts checkbox, grid/list view
  switcher, time range selector ("Last Hour ⌄", "Last 24 Hours ⌄", "Last
  Week ⌄"), Filters.
- Each chart card: left-aligned title at top, top-right `min limit` /
  `max limit` metadata, `⋮` overflow at the far right, the chart, toggleable
  legend checkboxes at the bottom.
- Use the chart placeholder pattern from `prism-craft`.

## Empty sections rule

Missing data is **explicit, not omitted**. If a VM has no external devices,
the "External Devices" panel still renders with a short empty message
inside it (see the `policies-empty-state` block in `VmDetailsPage.tsx`'s
`PoliciesWidget` for the in-repo example). If a sub-resource subtype has
zero items, render the explicit empty state through EBR or the local summary
widget. Do not collapse the tab or hide the section.

## Common slot mapping (Prism React)

| Slot                            | Component(s) (per `prism-craft` and `VmDetailsPage`)                                                                                                                        |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Back action                     | `Button type={Button.ButtonTypes.ICON_DEFAULT}` with `<ChevronLeftIcon />` and `aria-label="Back to <list>"`                                                                |
| Entity-type chip                | A `<span>` styled like `vm-details-tag` (`var(--color-background-info-neutral)` + `var(--color-text-secondary-interactive)`) — or `Badge` if you need richer chip semantics |
| Inline relationship breadcrumbs | `vm-details-tag` (chip) + `vm-details-breadcrumb` (link, color `var(--color-text-link)`), separated by `vm-details-separator`                                               |
| Tabs row                        | `Tabs`                                                                                                                                                                      |
| Entity actions                  | EBR `detailsEntityInfo` + EBR actions/capability checker/factory                                                                                                            |
| Summary widget card             | The local `SummaryCard` component (or `ContainerLayout` styled like `widget-card`) containing a `Title size={Title.SIZES.H3}` heading and a body                            |
| Key/value row inside a widget   | The local `SummaryRow` helper                                                                                                                                               |
| Sub-resource tab                | Scoped `EntityBrowser` configured per the `ebr` skill                                                                                                                       |
| Metric card                     | Follow the dashboard widget/card chart pattern from `DashboardPc.tsx` and `references/dashboard.md`; use chart components or placeholders per `prism-craft`                 |

## Anti-patterns

- Plain page title with no back action and no relationship breadcrumbs.
  Detail pages never start with just a title — they always carry context.
- Hiding empty subresource sections/tabs instead of rendering the browser's
  empty state or the local summary widget's empty message.
- Hand-building detail actions that should come from EBR action config.
- Hand-building subresource tab tables, filters, pagination, and row actions
  when a scoped EBR can render them.
- Wrapping the EBR action area in a card.
- Putting summary content as one long unbroken paragraph instead of stacked
  panels with section headings.
- Using only the entity name without an entity-type tag chip in front of
  it.
- Re-implementing the `SummaryCard` / `SummaryRow` shape from scratch when the
  existing helpers already capture the pattern.
- Hardcoding the chip background or breadcrumb link color instead of using
  `--color-background-info-neutral` and `--color-text-link`.

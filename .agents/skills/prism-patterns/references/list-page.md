# List Page

The most common page type. Use it any time the prompt is about a collection
of entities ("VMs", "subnets", "templates", "alerts", "backups"). Entity
lists should be rendered by EBR, not by a hand-built Prism `Table`.

Read the project `ebr` skill before creating or changing the list body. This
page pattern owns the route shell and optional page-level header; EBR owns the
browser internals: table/grid, filter bar and filter panel, favorite filters,
grouping, view/focus selection, pagination, selection, actions, side panels,
empty result state, and export.

**Canonical product examples in Aphrodite:**

- `shared/EntityBrowserView/EntityBrowserView.jsx` — wrapper around raw
  `EntityBrowser`, default query behavior, navigation-context filters, display
  names, and session persistence.
- `pages/vm/components/ebr/ListEBR.tsx` — full product list using
  `EntityBrowserView`, config generator, custom UQDC, action checker,
  custom factory, filters, export, labels, and details-only action reuse.
- `pc-cluster-management/cluster/pages/ClusterEBR/components/ebr/ClustersEBR.jsx`
  — entity list with schema/perspective/action config, Groups query processors,
  export, labels, factory, and details-only action reuse.

**Prototype references:**

- Route base: [`apps/web/src/routes/vms/route.tsx`](/apps/web/src/routes/vms/route.tsx)
- Route index: [`apps/web/src/routes/vms/index.tsx`](/apps/web/src/routes/vms/index.tsx)
- Existing page wrapper: [`apps/web/src/components/vms/VmPage.tsx`](/apps/web/src/components/vms/VmPage.tsx)
- Existing EBR browser wrapper: [`apps/web/src/components/vms/VmEbr.tsx`](/apps/web/src/components/vms/VmEbr.tsx)
- EBR config files: [`apps/web/src/components/vms/config/`](/apps/web/src/components/vms/config)
- EBR factory: [`apps/web/src/components/vms/factory.tsx`](/apps/web/src/components/vms/factory.tsx)

The current VM list is the canonical in-repo EBR example. Nested VM
experiments under `apps/web/src/components/vms/vm-ebr/` or
`apps/web/src/components/vms/vm/` are not the active `/vms` implementation
unless a route imports them directly. Treat older hand-built list helpers, if
present, as visual shell references only. For new entity pages, implement the
browser with EBR.

Reference screenshots from the real product:

- Canonical populated list: [`../assets/list-storage-containers.png`](../assets/list-storage-containers.png)
- List with prerequisite banner above the toolbar: [`../assets/list-subnets-with-banner.png`](../assets/list-subnets-with-banner.png)
- Filtered empty results: [`../assets/list-alerts-empty-filtered.png`](../assets/list-alerts-empty-filtered.png)
- First-time empty list with toolbar retained: [`../assets/list-templates-empty.png`](../assets/list-templates-empty.png)
- Tasks-style deviation (no tabs, no selection): [`../assets/list-tasks-no-tabs.png`](../assets/list-tasks-no-tabs.png)

## Required vertical sequence

The page renders directly into the body slot of `__root.tsx` (see
[`global-shell.md`](global-shell.md)). It produces, top to bottom:

1. **50px white page-header strip** — render `<PageHeader />` from
   `~/components/common`. It already encodes the 50px height, white
   background, side padding, and the separator border below the strip.
   - `title`: H2 page name ("VMs", "Templates", "Storage Containers").
   - `tabs` (optional): the entity's sibling views (e.g. `Summary | List |
Policies | Alerts | Events | Metrics`). The component inserts the
     `<VerticalSeparator />` between title and tabs for you.
   - `rightContent` (optional): right-aligned cluster on the same row —
     header count/scope ("18 Total Storage Containers", "40 Filtered Alerts
     out of 54") or a scope `Select`.

   Example (mirrors `VmPage.tsx`):

   ```tsx
   <PageHeader
     title="VMs"
     tabs={
       <Tabs
         data={VM_TABS}
         activeKey={activeTab}
         onTabClick={setActiveTab}
         aria-label="VMs navigation tabs"
         padding="0px"
       />
     }
   />
   ```

2. **Optional notice / migration banner** — first row of the grey canvas
   before EBR.
   Full-width `Alert type={Alert.AlertTypes.INFO}` (or `WARNING` for
   prerequisite-blocked); has `ⓘ` icon, one sentence, `×` close.
3. **EBR region** — mount an EBR component. The EBR component should usually
   be a feature-specific wrapper such as `VmEbr` or `WidgetsEbr`, not inline
   config in the route. It receives:
   - stable `ebId`;
   - `entityType` / `entityTypes` and display names;
   - `entityConfigs` containing schema, perspectives, actions, filters, and
     optional getting-started/default perspective;
   - `queryConfig` with `GroupsV3UQDC`, `ListV3UQDC`, `LocalDataUQDC`, or a
     custom UQDC;
   - `ebComponentFactory`;
   - filter panel, favorite filter, export, labels, telemetry, and persistence
     props.

   ```tsx
   <EntityBrowser
     ebId="widgets"
     appId="widget"
     entityTypes={['widget']}
     selectedEntityType="widget"
     entityConfigs={getWidgetEntityConfigs()}
     queryConfig={{
       queryProcessorsMap: {
         widget: {
           queryProcessorName: 'GroupsV3UQDC',
         },
       },
     }}
     ebComponentFactory={WidgetEbrFactory.getInstance()}
     showFiltersPanel
     filtersPanelCollapsed
     exportSettings={{ visible: true, pageSize: 500 }}
     persistQuerySettingsToSession
   />
   ```

4. **EBR-owned internals** — do not recreate these outside EBR for entity
   lists:
   - action toolbar and disabled/hidden action state;
   - view/focus selector and group-by UI;
   - filter bar, filter chips, filter panel, suggested filters, favorite
     filters;
   - result count, pagination, empty result copy;
   - table columns, custom cell renderers, row selection, row actions;
   - export;
   - side panel links and side panel content.

## Disabled-but-visible rule

Row-selection actions (Update, Delete, Acknowledge, Rename, Power
Operations, Launch Console, etc.) must remain discoverable. In EBR, express
this through action config and capability checkers rather than conditional
React rendering. The checker returns enabled/disabled/hidden state and a
reason; the browser renders the appropriate toolbar state.

The Tasks-style list is the documented exception when the content is an
operations/status feed rather than an entity browser.

## Tasks-style deviation

When generating a global operations / status list (Tasks, Audit Log,
Notifications) that is not backed by EBR, follow this variant:

- White page-header strip contains only an H2 title; **no tabs, no count
  text**.
- Action row reduces to right-aligned "View by ⌄" only (no primary action,
  no disabled secondaries).
- Table has **no checkboxes** and no row selection (`Table` without
  `rowSelection`).
- Pagination control sits on the **count line row at the right edge**, not
  inside the table.
- Clicking a row opens a wide right-side detail panel — see
  [`side-panels-popovers-overflow.md`](side-panels-popovers-overflow.md).

## First-time empty list (object type exists, no rows yet)

The page keeps its title and List tab. EBR should keep the relevant action
surface, filters, and browser chrome available, then render a designed empty
state in the browser region. Use EBR `gettingStarted` when the empty state
needs a create action or educational component. See `empty-and-onboarding.md`
for the full spectrum.

## Common slot mapping (Prism React)

| Slot                                                                              | Owner / component                                                                                                |
| --------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Page-header strip + title + tabs + right content                                  | `<PageHeader />` from `~/components/common`                                                                      |
| Notice banner                                                                     | `Alert type={Alert.AlertTypes.INFO}` (with close)                                                                |
| Entity browser                                                                    | Raw `EntityBrowser` in this repo (or `EntityBrowserView` in Aphrodite references) configured per the `ebr` skill |
| Actions, filters, grouping, focuses, pagination, table/grid, empty result, export | EBR metadata/config/factory                                                                                      |
| Custom cell renderers, popup container, side panel                                | EBR component factory                                                                                            |
| Non-entity operations/status feed only                                            | Hand-built Prism `Table` may be acceptable                                                                       |

## Anti-patterns

- Starting the page with the browser/table only (skipping title/tabs).
- Hiding row-selection actions until rows are selected.
- Putting the toolbar inside a white card.
- Replacing the count line with a paragraph of body text.
- Hand-rolling the page-header strip with `FlexLayout` + `Title` instead of
  using `<PageHeader />`.
- Re-implementing EBR's search/filter row, count line, paginator, group-by
  controls, view/focus selector, row actions, export, or side panel with raw
  Prism components.
- Building an entity list directly with Prism `Table` when EBR can render it.
- Generating a list with no tabs when sibling views (Summary, Alerts,
  Events, Metrics) actually exist for the entity. Either include them or
  use the Tasks-style deviation deliberately.
- Hardcoding white/grey colors instead of using `background="base"` /
  `background="body"` / `var(--color-border-separator)`.

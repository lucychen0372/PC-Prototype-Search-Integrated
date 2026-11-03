# Dashboard

Dashboards are aggregate pages — grids of widgets summarizing a domain
(infrastructure, storage, security). Use this when the prompt asks for an
overview, summary, "at a glance", or "main page".

**This pattern already ships in the repo.** Read these files before
generating a new dashboard:

- Route: [`apps/web/src/routes/index.tsx`](/apps/web/src/routes/index.tsx) — the
  Main Dashboard route.
- Grid: [`apps/web/src/components/dashboard/DashboardPc.tsx`](/apps/web/src/components/dashboard/DashboardPc.tsx)
- Layout config: [`apps/web/src/components/dashboard/constants.ts`](/apps/web/src/components/dashboard/constants.ts)
- Grid styles: [`apps/web/src/components/dashboard/DashboardPc.css`](/apps/web/src/components/dashboard/DashboardPc.css)
- Sample widgets: [`apps/web/src/components/widgets/`](/apps/web/src/components/widgets/)
  (each widget imports `DashboardWidgetLayout` + `DashboardWidgetHeader` from
  `@nutanix-ui/prism-reactjs` and
  lives in its own folder, e.g. `alerts/AlertsWidget.tsx`,
  `cluster-quick-access/ClusterQuickAccessWidget.tsx`).

Reference screenshots:

- Infrastructure Operations dashboard (4-col grid): [`../assets/shell-and-dashboard.png`](../assets/shell-and-dashboard.png)
- Storage dashboard (full-width Overview + 4-col grid): [`../assets/dashboard-storage-overview.png`](../assets/dashboard-storage-overview.png)
- Security dashboard (2-col grid + tabs): [`../assets/dashboard-security-tabs.png`](../assets/dashboard-security-tabs.png)

## Required vertical sequence

The page renders into the body slot of `__root.tsx` (see
[`global-shell.md`](global-shell.md)). It produces, top to bottom:

1. **50px white page-header strip** — render `<PageHeader />` from
   `~/components/common`. It encodes the strip the rest of the product uses.

   ```tsx
   <PageHeader title="Main Dashboard" />
   ```

   Optional dashboard-level tabs go on the same row when the dashboard is
   part of a multi-tab area (Infrastructure: "Main Dashboard | Manage
   Dashboards"; Security: "Dashboard | STIG Policy Controls | Hardening |
   Vulnerabilities"). Pass them via the `tabs` prop — the component inserts
   the `<VerticalSeparator />` between title and tabs for you.

   ```tsx
   <PageHeader
     title="Dashboard"
     tabs={
       <Tabs
         data={dashboardTabs}
         activeKey={activeTab}
         onTabClick={onTabClick}
         aria-label="Dashboard navigation tabs"
         padding="0px"
       />
     }
   />
   ```

2. **Optional secondary controls row** — when the dashboard has page-level
   scope/refresh controls (View By, Refresh, Manage, Reset, Data Density),
   they go right-aligned on the title row OR on a thin secondary row
   immediately below. Keep them out of the global header.
3. **Grey canvas** begins below the header strip — provided automatically
   by `__root.tsx`'s `StackingLayout background="body"` wrapping the
   `Outlet`.
4. **Optional notice banner** (full content width). Example: Infrastructure
   dashboard's "Intelligent Operations widgets are now available in
   Operations Dashboard" info banner. Use `Alert type={Alert.AlertTypes.INFO}`.
5. **Widget grid** — a `ResponsiveGridLayout` from `react-grid-layout`
   wrapping each widget in a `DashboardWidget` div. The grid in
   `DashboardPc.tsx` ships with these defaults — match them unless the
   prompt asks for a different density:
   - `cols={{ lg: 4, md: 4, sm: 3, xs: 2, xxs: 1 }}`
   - `rowHeight={286}`, `margin={[20, 20]}`
   - `draggableHandle=".ntnx-dashboard-widget-header"` (so dragging happens
     on the widget's own header, not the body).
   - `compactType="vertical"`.
   - Layout entries in `constants.ts` (`LAYOUT_CONFIG`,
     `generateLayout()`).
6. **Within the grid**, summary/count widgets ("Summary", "Open Alerts
   Summary", "Overview") sit near the top, before deeper operational
   widgets (charts, tables, status breakdowns). Three observed densities
   when expanding the grid:
   - **4-column grid** (Infrastructure, the prototype's default): rows of
     four equal-width widgets.
   - **2-column grid** (Security): rows of two wide widgets, each often
     containing internal sub-grids.
   - **Mixed** (Storage): a single full-width "Overview" widget spanning
     all columns at the top, followed by a 4-column grid of secondary
     widgets below.

## Anatomy of a single widget card

Every widget in the prototype follows the same shell:

```tsx
<DashboardWidgetLayout
  header={
    <DashboardWidgetHeader title="Open Alerts Summary" actions={[...]} />
  }
  bodyContent={<WidgetTable .../>}
  footer={<Link>View Details</Link>}
/>
```

| Slot                      | Placement             | Content                                                                                                                                                                                                                                 |
| ------------------------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Local title               | Top-left of the card  | Plain text passed to `DashboardWidgetHeader title=`                                                                                                                                                                                     |
| Local right-side controls | Top-right of the card | Pass via `DashboardWidgetHeader actions=`. Common: `⌄` time/scope selector ("Last Hour ⌄", "Last 24 Hours ⌄", "Last Week ⌄"), `⚙` settings, `⋮` overflow menu, "Sourced from NXSA" link                                                |
| Body                      | Middle of the card    | `WidgetTable`, drilldown counts (large `Title size={Title.SIZES.H1}` wrapped in `Link`), severity rows ("Critical 17", "Warning 9", "Info 13") with linked labels, donut charts with side counts, progress bars, or empty/promo content |
| Footer link               | Bottom of the card    | "View all <N> ..." or "View Details" — drills into a filtered list or detail page                                                                                                                                                       |

Look at `AlertsWidget.tsx` and `ClusterQuickAccessWidget.tsx` as canonical
examples — they show the `DashboardWidgetLayout` + `DashboardWidgetHeader`

- `WidgetTable` recipe.

## Counts as drilldowns

Almost every count on a dashboard is a **link**, not just text. "39 alerts"
links to the alerts list filtered to those 39 rows. "8 Critical" links to
the critical filter. "View all" links to the unfiltered list. When
generating a dashboard, default to making counts links unless the user has
explicitly asked for a static read-only widget.

## Promo / empty widgets keep the card frame

When a widget has no data (e.g. Power Usage hasn't been configured, Network
Security hasn't been set up), the card itself **still renders**. The body
is replaced by an illustration + short text + CTA, but the card boundary
remains. Do not collapse empty widgets out of the grid — that breaks the
visual grid alignment.

## Common slot mapping (Prism React)

| Slot                                               | Component(s)                                                                                                                                                       |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Page-header strip + title (+ tabs / right content) | `<PageHeader />` from `~/components/common` (uses `tabs` as a React node plus `rightContent`)                                                                      |
| Page-level controls (View By, Refresh)             | `FlexLayout` with `Select` / `Button` / `Link`                                                                                                                     |
| Notice banner                                      | `Alert type={Alert.AlertTypes.INFO}`                                                                                                                               |
| Widget grid                                        | `ResponsiveGridLayout` from `react-grid-layout` (already wired in `DashboardPc.tsx`) — extend `DASHBOARD_WIDGETS` and `LAYOUTS` rather than introducing a new grid |
| Widget card shell                                  | The local `DashboardWidget` wrapper from `DashboardPc.tsx` (drag handle + resize affordance) — wraps a `DashboardWidgetLayout`                                     |
| Widget content shell                               | `DashboardWidgetLayout` with `DashboardWidgetHeader`                                                                                                               |
| Drilldown count                                    | Large `Title size={Title.SIZES.H1}` wrapped in a `Link`                                                                                                            |
| Severity / status row                              | `FlexLayout` with `StatusIcon` (or `StatusTriangleMiniIcon`, `StatusDiamondMiniIcon`, `StatusDotMiniIcon`) + label + count link                                    |
| Chart / visualization                              | Use existing widget patterns such as sparkline widgets, progress visualizations, or chart placeholders per `prism-craft`                                           |

## Adding a new widget

To add a widget to the existing dashboard:

1. Create a folder under `apps/web/src/components/widgets/<name>/` mirroring the
   existing widgets (e.g. `alerts/`).
2. Export `<Name>Widget` returning a `DashboardWidgetLayout` with
   `DashboardWidgetHeader`, optional `WidgetTable`, and a footer `Link`.
3. Register it in `DASHBOARD_WIDGETS` inside
   `apps/web/src/components/dashboard/constants.ts`. The grid layout is generated
   from that array — no manual `Layouts` editing needed for the default
   1-cell widget.

## Anti-patterns

- A dashboard rendered as one long freeform text block — dashboards must be
  grids of cards.
- Widget cards without a heading (drag handles attach to
  `.ntnx-dashboard-widget-header`, so removing the header also breaks
  drag).
- Widget cards without a footer link or drilldown.
- Floating widget controls on the grey canvas instead of inside the card.
- Putting page-level scope selectors ("View By: All N Clusters ⌄") inside
  the global top bar or left nav.
- Hiding empty widgets instead of rendering the empty/promo variant.
- Hardcoding the white card background (`#fff`) instead of
  `var(--color-background-base)`, or hardcoding hover shadow colors
  instead of letting `DashboardPc.css` set them.

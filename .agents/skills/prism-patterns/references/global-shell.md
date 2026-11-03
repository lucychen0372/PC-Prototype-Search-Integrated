# Global Shell

The shell that wraps every product page in this repo is **already mounted**
in [`apps/web/src/routes/__root.tsx`](/apps/web/src/routes/__root.tsx). New routes
do not re-create the shell — they render into its body slot.

Reference screenshot: [`../assets/shell-and-dashboard.png`](../assets/shell-and-dashboard.png)

## What `__root.tsx` already provides

```tsx
<ThemeWrapper onThemeChange={() => ({})}>
  <MainPageLayout
    bodyCompressed
    header={<Header ... />}
    leftPanel={<SideNav />}
    leftPanelVisible={leftPanelVisible}
    body={
      <StackingLayout background="body" className="main-page-body">
        <Outlet />
      </StackingLayout>
    }
  />
</ThemeWrapper>
```

That gives every route, for free:

1. A **dark global top header** at the top of the viewport, rendered by
   [`Header`](/apps/web/src/components/layout/header/Header.tsx). Its
   background is `var(--color-background-nav-base)` (see
   [`Header.css`](/apps/web/src/components/layout/header/Header.css)).
   Hosts: hamburger toggle, app switcher (`Apps & Marketplace ⌄`), nav search,
   alerts badge, tasks badge, settings gear, user dropdown.
2. A **side nav** rendered by
   [`SideNav`](/apps/web/src/components/layout/side-nav/SideNav.tsx).
   Width 240px, secondary `Menu` styling. **The side nav is present on
   every page in the product, without exception** — Dashboard, list
   pages, detail pages, dashboards, settings, full-page wizards, all of
   them. The only way it disappears is when the user clicks the
   hamburger in the top header to collapse it (the `leftPanelVisible`
   state in `__root.tsx`). New routes never collapse, hide, replace, or
   unmount it programmatically.
3. A **grey body canvas** — the `<StackingLayout background="body">` that
   wraps `<Outlet />` resolves to `var(--color-background-body)` (the grey
   product canvas). Your route renders inside this.

**What this means for new routes:** never render `MainPageLayout`, `Header`,
or `SideNav` again. Wrapping your page in another shell stacks two top
headers and breaks the layout.

## Side nav menu data is the source of truth

The nav structure is defined in
[`apps/web/src/components/layout/side-nav/constants.ts`](/apps/web/src/components/layout/side-nav/constants.ts).
Current groups in this prototype:

- **Dashboard** (root, `/`)
- **Compute**: VMs, Templates, Kubernetes Clusters, OVAs, Images
- **Storage**: Storage Containers, Volume Groups, Storage Policies, External
  Storage
- **Network & Security**: Virtual Switches, Subnets, Virtual Private Cloud,
  Floating IPs
- **Data Protection**: Protection Summary, Protection Policies, Recovery
  Plans, VM Recovery Points
- **Prism Central Settings** (`/settings`)

When adding a new top-level entity page, add its `MenuItemNode` to the
appropriate group in `MENU_DATA`. Mirror the existing entries: pick a `key`,
set `label`, set `path` to the new route, and set `isFavorite: true` if it
should show the bookmark icon (most product pages do).

The real Prism Central product has additional groups (Hardware, Monitoring,
Operations, Administration). They are intentionally **not** present in this
template. Don't add them speculatively — only add nav entries that
correspond to real routes you've created.

## What each new route is responsible for

Most placeholder pages use a flat route file such as
`apps/web/src/routes/templates.tsx`. Pages with nested paths use a folder route
plus a thin index route; for example, `/vms` is split across
[`apps/web/src/routes/vms/route.tsx`](/apps/web/src/routes/vms/route.tsx)
and [`apps/web/src/routes/vms/index.tsx`](/apps/web/src/routes/vms/index.tsx).
Either way, route files stay thin and delegate real UI to `apps/web/src/components/`.

```tsx
import { createFileRoute } from '@tanstack/react-router'
import { MyPage } from '~/components/my-feature'

export const Route = createFileRoute('/<name>')({
  component: MyPage,
})
```

The `MyPage` component renders **into the grey body canvas** that
`__root.tsx` already provides. Its first responsibility is the **page-header
strip**.

## The 50px white page-header strip

Every product page begins with a 50px white strip that carries the page
title (and tabs, if any). The repo provides a common `PageHeader` component
that already encodes this strip — use it instead of rebuilding the
`FlexLayout` recipe each time.

- Component: [`~/components/common/page-header/PageHeader.tsx`](/apps/web/src/components/common/page-header/PageHeader.tsx)
- Used by `routes/index.tsx`, `VmPage.tsx`, and `settings.tsx`.

```tsx
import { PageHeader } from '~/components/common'
;<PageHeader title="My Page" />
```

### Slots

| Prop                      | What it accepts | Used for                                                                                                                                                                                          |
| ------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `title` (required)        | string          | Page name, rendered as `Title size={Title.SIZES.H2}` on the far left                                                                                                                              |
| `tabs` (optional)         | ReactNode       | Horizontal tabs row, placed after a `<VerticalSeparator />` next to the title. Pass a configured `<Tabs />` node so the caller owns `data`, `activeKey`, `onTabClick`, `aria-label`, and padding. |
| `rightContent` (optional) | ReactNode       | Right-aligned cluster for scope selectors, header counts, or page-level controls                                                                                                                  |

### Examples

Title + tabs (canonical list page, `VmPage.tsx`):

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

### What it renders under the hood

For reference (and for anyone extending `PageHeader`), the component is the
same `FlexLayout` recipe the repo already used: `padding="0px-20px"`,
`alignItems="center"` and `min-height: 50px` / `background-color: var(--color-background-base)` in CSS,
plus a `border-bottom: 1px solid var(--color-border-separator)` from
[`PageHeader.css`](/apps/web/src/components/common/page-header/PageHeader.css)
to separate the white strip from the grey canvas.

Don't replicate that recipe inline — extend `PageHeader` instead so every
page picks up the change.

## Two-surface system (critical)

| Surface                                    | Purpose                                                                                | Token / prop                                                                                                       |
| ------------------------------------------ | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| White page-header strip                    | Page identity (title + tabs) or detail context (back, entity, relationships) + tabs    | `background="base"` / `var(--color-background-base)`                                                               |
| Grey canvas                                | Page chrome outside the entity browser: banners, route-level spacing, non-EBR controls | Already supplied by `<Outlet />`'s wrapping `StackingLayout background="body"` — your route renders directly on it |
| White cards / EBR browser regions / panels | Actual data containers                                                                 | `background="base"` / `var(--color-background-base)`                                                               |

For entity lists, EBR owns its toolbar, filter row, count/pagination, table,
and empty-result state. Do not recreate those rows outside the browser with
raw Prism components. For non-EBR pages, toolbars and count rows sit directly
on the grey canvas; only data cards, dashboard widgets, summary panels, side
panels, and modals use white surfaces.

## Page-level controls placement

| Control                                                                | Lives in                                                 | Notes                                                                                           |
| ---------------------------------------------------------------------- | -------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Page title (H2)                                                        | White page-header strip, far left                        | Same row as tabs                                                                                |
| Horizontal tabs                                                        | White page-header strip, after a `<VerticalSeparator />` | Active tab has a blue underline (`Tabs` default)                                                |
| Header count / scope text                                              | White page-header strip, far right                       | Same row, e.g. "18 Total Storage Containers", "40 Filtered Alerts out of 54"                    |
| Notice / migration banner                                              | First row of the grey canvas                             | Full content width, has `ⓘ` icon and `×` close                                                  |
| Entity actions, filters, group/view controls, count, paginator, export | Inside EBR                                               | Configure through schema, perspectives, actions, query config, and factory; see the `ebr` skill |
| Non-EBR action toolbar                                                 | Grey canvas                                              | Use only for dashboards, settings, operations/status feeds, or genuinely custom pages           |

## Side nav visibility

The global side nav is always mounted. The user (not the route) controls
whether it is expanded or collapsed via the hamburger toggle in the top
header. `leftPanelVisible` in `__root.tsx` is driven by that toggle.

Routes do **not** collapse, hide, unmount, or otherwise modify the side
nav. If you find yourself wanting to "hide the side nav for this page"
or "replace the side nav with a different menu", stop — that is not how
this product works. Every page renders inside the same shell with the
same global side nav. Page-specific navs (e.g. the secondary settings
menu) live **inside the body content area**, alongside the global nav,
not in place of it.

## Settings layout (opt-in secondary menu inside the body)

Settings is the most prominent body-level layout deviation. The dark top
bar stays. The global `SideNav` stays. **Inside the body content area**,
the route splits into a fixed-width white "settings menu" on the left
and the configuration content on the right. The global side nav is
unaffected. See [`settings.md`](settings.md). This prototype's
`/settings` route does **not** ship that deviation by default — it's
just another grey-canvas page. Implement the in-body settings menu only
when the user explicitly asks for it.

## Anti-patterns (these will make it look fake)

- Rendering `MainPageLayout`, `Header`, or `SideNav` from inside a route
  component. The shell is global; `__root.tsx` owns it.
- Putting the page title or tabs in the dark top header.
- Wrapping the toolbar/filter row in a white card.
- Starting a page directly with a table or form on the grey canvas — the
  white page-header strip must come first.
- Using a custom background color for the page body. The body is grey via
  `background="body"`; only welcome/wizard surfaces are full white, and
  those use `background="base"`.
- Hiding the dark top header except for full-page wizards.
- Putting page-level scope controls ("View By: All N Clusters ⌄") inside
  the side nav or top header — they belong on the white page-header strip
  or as the first row of the grey canvas.
- Inventing nav groups (Hardware, Monitoring, etc.) that don't have real
  routes in this template.

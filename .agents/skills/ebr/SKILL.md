---
name: ebr
description: Guides agents building, refactoring, debugging, or reviewing Nutanix Entity Browser React (EBR) experiences in this repo, including frontend EntityBrowser config and backend Groups API mock data. Use when the user mentions EBR, EntityBrowser, @nutanix-ui/ebr-ui, UQDC, GroupsV3UQDC, ListV3UQDC, LocalDataUQDC, schema, perspectives/focuses, filters, group by, actions, component factories, popups, side panels, joins, export, detail-tab browsers, or favorite/custom focuses.
---

# Entity Browser React

Use this skill to guide implementation against Nutanix Entity Browser React (EBR), grounded in the EBR source repo, the source-of-truth research doc, and this prototype repo's frontend/backend implementation.

## First Move

1. Identify the EBR work type:
   - New or refactored list page
   - Embedded/detail-tab EBR scoped to a parent entity
   - Filters, group by, sorting, favorite filters, or custom focuses
   - Query config, Groups/List APIs, local data, Groups API mock data, or custom UQDC
   - Actions, popup UI, capability checks, details actions
   - Custom renderers, component factory, side panel, joined data, export
2. Read the reference file matching that work before editing:
   - Core setup, schema, perspectives: `references/core-api.md`
   - Query processors, Groups/List/local/custom UQDC: `references/query-processors.md`
   - Groups API mock data/response contract: `references/groups-api.md`
   - Filters, group by, sorting, global filters: `references/filters-grouping.md`
   - Actions, capability checks, component factory: `references/actions-factory.md`
   - Local TypeScript types, module shim, and EBR utilities: `references/types-and-utilities.md`
   - Joins, side panels, details mode, export, hooks: `references/joins-side-panels-export.md`
   - Concrete source-grounded patterns: `references/examples.md`
3. Inspect nearby product code before writing new config. EBR is metadata-heavy and local conventions matter.
4. If frontend config uses `GroupsV3UQDC`, update the local backend Groups API mock data and response handling in the same change so displayed, helper, filter, sort, group, action, join, and export attributes are all returned.

## Source Anchors

Prefer source and in-repo examples over memory:

- EBR source: `/Users/jerome.marshall/Workspace/nutanix/prism-ui-ebr-ui`
- Research map: `/Users/jerome.marshall/Workspace/nutanix/global-design-prototype-template/docs/ebr-source-of-truth-research.md`
- Aphrodite examples, if available locally: `web/app/react/16/src/...` under the Prism/Aphrodite workspace

High-value source files in the EBR repo:

- `README.md`
- `DATA_JOINS.md`
- `LOCAL_DATA_UQDC.md`
- `EXPORT.md`
- `CUSTOM_METRICS.md`
- `USER_SETTINGS.md`
- `services/src/components/ebr/EntityBrowser.jsx`
- `services/src/components/ebr/EBComponentFactory.jsx`
- `services/src/components/ebr/data/EBSchema.js`
- `services/src/components/ebr/data/EBPerspective.js`
- `services/src/localdata/LocalDataUQDC.jsx`
- `services/src/utils/EBActionsUtil.js`
- `services/src/utils/DataUtil.js`
- `services/src/utils/EBConstants.js`

Local prototype Groups API files:

- `apps/web/src/types/ebr.ts`
- `apps/web/src/types/ebr-ui.d.ts`
- `apps/web/src/lib/ebr-utils.ts`
- `apps/api/src/routes/index.ts`
- `apps/api/src/features/groups/data.ts`
- `apps/api/src/features/groups/routes.ts`
- `apps/api/src/features/groups/results.ts`
- `apps/api/src/features/groups/fiql.ts`
- `apps/api/src/features/groups/types.ts`

## Build Decision Tree

- Use `EntityBrowserView` when working in Aphrodite-style code that already wraps raw EBR and expects navigation context, default query behavior, entity display names, and session persistence conventions.
- Use raw `EntityBrowser` when the local app directly imports from `@nutanix-ui/ebr-ui` or when no wrapper exists.
- Use `queryProcessorsMap` for new work, especially multi-entity, joins, detail-tab EBRs, or mixed processors.
- Use `GroupsV3UQDC` for normal `/groups` style entity browsing. This is the default in Aphrodite-style wrappers and the current prototype.
- Use `ListV3UQDC` when the backend follows a list API shape rather than Groups.
- Use `LocalDataUQDC` only when the full dataset is safely small enough to fetch and process in the browser.
- Use a custom UQDC when request/response shaping, group counts, telemetry, permissions, or backend behavior do not fit built-ins.
- When creating an EBR that uses `GroupsV3UQDC`, add or update local Groups API data so every schema/perspective attribute can be returned by `/api/nutanix/v3/groups`.

## Minimal EBR Checklist

For every EBR instance, verify:

- `ebId` is stable for main pages and unique for embedded/detail contexts.
- `entityTypes`, `entityTypeDisplayNames`, `entityConfigs`, and `queryConfig` are complete.
- Each entity config has `schema` and `perspectives`; add `actions`, `filters`, `gettingStarted`, or `defaultPerspective` only when needed.
- Schema includes `idAttribute`, `nameAttribute`, and every attribute needed for display, filter, sort, group, action checks, renderers, export, and joins.
- Local Groups API data, default attributes, FIQL support, and result shaping include the same attributes used by schema and perspectives.
- Perspectives include `_common_` for shared metadata and named focuses for user-facing columns.
- `helperAttributes` includes non-displayed fields required by renderers, action checkers, joins, links, or API calls.
- Custom factories implement `setDefaultFactory` and delegate unknown component IDs.
- Action popups use EBR's own `connect` and `DataUtil.getActionComponentArgs()` rather than external Redux state.
- Main list pages can persist query settings; embedded/detail EBRs usually disable favorite filters/custom focuses and scope with global filters.
- Export is intentionally enabled or disabled; absent/null `exportSettings` disables export.

## Gotchas

- Client-side joins are render-only: do not sort, filter, or group on client-joined attributes.
- Client-side joined attributes should be treated as display/helper data, not as primary query fields.
- `sidePanelLink` must be configured as a `customRenders` formatter for a cell to open an EBR side panel.
- `LocalDataUQDC` fetches all entities; EBR does not enforce a safety limit.
- `searchselect` replaces deprecated `dropdown` filters.
- Custom export functions must not mutate the entity object.
- `schemaValidator` is important for dynamic/custom metrics and saved custom views.
- `EntityBrowserView` can inject navigation-context filters and default perspective before props reach raw EBR.
- `queryProcessorName: 'LocalDataUQDC'` is the source-backed built-in name; some local type shims may also mention `LocalData`.
- This repo's EBR package has local type shims. Import types from `~/types/ebr`; do not assume the npm package ships complete TypeScript declarations.
- Do not import `connect` from `react-redux` for EBR popup/action components. Use `connect` from `@nutanix-ui/ebr-ui` so components bind to the EBR instance store.

## Done Criteria

Before calling EBR work complete:

- Re-read the relevant reference checklist.
- Confirm schema/perspective/query config agree on every attribute name, including slash-qualified joined attributes.
- Confirm Groups API data/response supports every displayed, helper, filter, sort, group, action, and export attribute.
- Confirm the query processor choice matches the backend and data volume.
- Confirm factory/action/component IDs match `customRenders`, action configs, side panel tabs, details panes, hook components, and popup handling.
- Confirm local EBR types and module declarations still describe any new query processor, formatter option, action, or store helper you rely on.
- Run the repo's normal lint/typecheck/tests for touched code when available.

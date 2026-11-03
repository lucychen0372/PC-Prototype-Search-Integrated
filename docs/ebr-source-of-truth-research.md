# Entity Browser React (EBR) Source-of-Truth Research

This document is research groundwork for a future agent skill about using Nutanix Entity Browser React (EBR). It is intentionally source-grounded: every major claim comes from the EBR source repo, this prototype repo, Aphrodite examples, or Glean/internal search. Do not treat it as a generated API spec; treat it as a practical map of what EBR can do and how existing product code uses it.

## Source Material Read

Primary EBR repo: `/Users/jerome.marshall/Workspace/nutanix/prism-ui-ebr-ui`.

Important files read:

- `README.md`: high-level concepts, schema, perspectives, filters, group by, renderers, actions, side panels, DB queries, query state persistence.
- `DATA_JOINS.md`: client-side and server-side joined data semantics and configuration.
- `V4_INTEGRATION.md`: OData V4 UQDC, server-side group by, aggregations, server joins, OData `any` filters, V4 action guidance.
- `LOCAL_DATA_UQDC.md`: local data query processor behavior.
- `EXPORT.md`: export settings and per-perspective export configuration.
- `CLIENT_SIDE_GROUPBY.md`: static and dynamic client-side V4 group by.
- `CUSTOM_METRICS.md`: dynamic schema attributes and schema validation.
- `USER_SETTINGS.md`: user data APIs for favorite filters and custom focuses.
- `services/src/components/ebr/EntityBrowser.jsx`: authoritative prop surface and defaults.
- `services/src/components/ebr/EBComponentFactory.jsx`: default factory component IDs and delegation contract.
- `services/src/components/ebr/data/EBSchema.js`: schema shape, attribute types, joined schema processing, validation.
- `services/src/components/ebr/data/EBPerspective.js`: perspective keys and query-relevant attributes.
- `services/src/odata/ODataV4UQDC.jsx`: OData query conversion, server group by, expansion, stats handling.
- `services/src/localdata/LocalDataUQDC.jsx`: local in-memory filter, sort, group, paginate behavior.
- `services/src/utils/EBActionsUtil.js`: action config processing and selection capability helpers.
- `services/src/utils/DataUtil.js`: store initialization, filters, query state, export handling.
- `services/src/utils/EBConstants.js`: exported component IDs, join constants, side panel modes/sizes, action states.

Prototype repo examples read:

- `apps/web/src/components/clusters/ClusterEbr.tsx`
- `apps/web/src/types/ebr.ts`
- `apps/web/src/types/ebr-ui.d.ts`
- `apps/web/src/lib/ebr-utils.ts`

Aphrodite examples read:

- `web/app/react/16/src/shared/EntityBrowserView/EntityBrowserView.jsx`
- `web/app/react/16/src/pages/vm/components/ebr/ListEBR.tsx`
- `web/app/react/16/src/pages/vm/components/ebr/config/vmPerspectives.js`
- `web/app/react/16/src/pages/vm/components/vmUQDC/VmUQDC.jsx`
- `web/app/react/16/src/pages/vm/components/ebComponentFactory/EBComponentFactory.jsx`
- `web/app/react/16/src/pages/vcenter-integration/ebr/VCenterEbr.tsx`
- `web/app/react/16/src/pages/vcenter-integration/ebr/config/VCenterSchema.tsx`
- `web/app/react/16/src/pages/vcenter-integration/ebr/config/VCenterPerspectives.ts`
- `web/app/react/16/src/vm/pages/VmDetailsPage/VmDetailsNicsTab/ListEBR.tsx`
- `web/app/react/16/src/vm/pages/VmDetailsPage/VmDetailsNicsTab/ebr/config/Perspectives.ts`

Internal search:

- Glean search found internal references including `EBR V4 API Integration Details`, `EBR - Dec 2024`, `prism-ui-blocks/packages/tasks/src/ebr/EBR.tsx`, V4 migration docs/PRs, and roadmap material. Concrete fields from Glean were cross-checked against the EBR repo where possible.

## Current V3/V4 Status

This prototype repo is currently using the V3 Groups query path for its concrete EBR implementation. The only product EBR instance found in `apps/web/src/components/clusters/ClusterEbr.tsx` configures:

```ts
queryProcessorsMap: {
  [ENTITY_TYPE]: {
    queryProcessorName: 'GroupsV3UQDC'
  }
}
```

The local type shim allows `GroupsV3UQDC`, `ListV3UQDC`, `LocalData`, and `ODataV4UQDC`, but allowing a processor in types is not the same as using it. No current EBR instance in this repo configures `ODataV4UQDC`, so this repo should be treated as V3-backed today.

Aphrodite is mixed, not purely V3 and not purely V4. A direct scan of `web/app/react/16/src` found many concrete `ODataV4UQDC` configurations and many concrete `GroupsV3UQDC` configurations, plus some `ListV3UQDC`/`LocalDataUQDC` usage in detail or embedded EBRs. Examples of V4-backed Aphrodite EBRs include vCenter integration, content repository, VM startup policy, VM templates, host affinity, network segmentation, VPC/subnet/networking pages, GPU V4, and several AIOps/activity pages. Examples of V3-backed Aphrodite EBRs include the shared `EntityBrowserView` default, cluster/disk/storage/detail-tab pages, VM NIC details, and several AIOps/discovery/report pages.

The correct current statement is: this prototype repo is V3-backed today; Prism Aphrodite as a whole is in a mixed V3/V4 state, with both legacy V3/custom UQDC pages and migrated/newer OData V4 EBR pages. Therefore, V4 sections in this document are active Aphrodite guidance, but they are migration/reference guidance for this prototype repo until a local EBR instance switches from `GroupsV3UQDC` to `ODataV4UQDC`.

## What EBR Is

EBR is a React framework component exported as `EntityBrowser` from `@nutanix-ui/ebr-ui`. It renders entity-centric list/detail browsing from metadata rather than bespoke table code. The main inputs are:

- `entityConfigs`: per-entity metadata containing `schema`, `perspectives`, optional `actions`, optional `filters`, optional `gettingStarted`, and optional `defaultPerspective`.
- `queryConfig`: data fetching/query processor configuration using UQDC connectors.
- `ebComponentFactory`: application-provided factory for custom cell renderers, popups, side panels, hooks, and overrides.
- top-level UI controls: filters, entity selector, grouping mode, export, labels, custom focuses, favorite filters, persistence, language, telemetry, accessibility heading level.

EBR keeps internal Redux state behind `EBProvider`, registers schemas/perspectives/query processors, and renders an `EBBaseView` with panels, query options, visualization, selection state, actions, side panel, filters, export, and notifications.

## Public Exports

From `services/src/index.js`, the package exports:

- `EntityBrowser`: top-level React component.
- `COMPONENT_IDS`: IDs used by factories to override or provide components.
- `connect`: wrapper around the EBR store provider for custom EBR components.
- `EBActionsUtil`: action config and capability utilities.
- `DataUtil`: utility helpers used by query processors/renderers.
- `JoinedDataRenderer`: helper renderer for joined data.
- `ODataProjectionRenderer`: helper renderer for OData projection data.
- `EBLabelIcon`: label renderer.
- `NoDataSpan`: fallback renderer.

## EntityBrowser Props

The authoritative prop list is in `EntityBrowser.jsx`. Important props:

- `ebId` (required): unique instance ID. Used for store keying and persistence. Aphrodite code uses stable IDs for list pages and unique IDs for embedded/detail contexts to avoid stale state.
- `appId`: optional app identifier used for user-data persistence.
- `entityTypes`: required array. Direct `EntityBrowser` needs this; Aphrodite `EntityBrowserView` can derive it from `entityType`.
- `entityTypeDisplayNames`: required map `{ [entityType]: { singular, plural } }`.
- `selectedEntityType`: initially selected entity type. Defaults to first `entityTypes` item.
- `entityConfigs`: required metadata map.
- `entityGroupings`: optional grouped presentation for the entity type selector.
- `groupingType`: `'tabs'` or `'list'`. Default is tabs. Use list when group counts are high.
- `queryConfig`: UQDC and query behavior.
- `ebComponentFactory`: custom factory. EBR injects its default factory with `setDefaultFactory`.
- `detailsEntityInfo`: opens EBR in details mode; with `detailsViewOnly`, EBR skips the grid/perspectives and shows only details/actions.
- `onFilterChange`: callback with selected entity type's filter conditions.
- `onSidePanelTitleClick`: callback for side panel title click.
- `showEntityTypeSelector`: left entity selector.
- `showFiltersBar`: top filter bar. Default true.
- `filterBarPlaceholder`: default text is `Type in a query`.
- `showFiltersPanel`: right filter panel. Default false.
- `filtersPanelCollapsed`: default false.
- `showFiltersButton`: default false.
- `showModifyFiltersLink`: default true.
- `showSuggestedFilters`: default true.
- `showFavoriteFilters`: default true.
- `showPageSizeSelector`: default true.
- `allowCustomFocuses`: default true.
- `allowLabels`: default false.
- `persistQuerySettingsToSession`: default false. Persists filter, group by, sort, and perspective for a session.
- `telemetryName`: emits telemetry DOM attributes when set.
- `notificationsContainer`: default true.
- `baseHeadingLevel`: default 0; used for EBR heading hierarchy.
- `debugStore`: controlled by local storage `EBR_DEBUG=true` by default logic.
- `language`: default `en`; source mentions `en` and `ja`.
- `exportSettings`: null disables export; otherwise configures CSV export.

Aphrodite commonly wraps `EntityBrowser` with `EntityBrowserView`, which adds defaults:

- Derives `entityTypes`, `entityTypeDisplayNames`, and `entityGroupings` from a single `entityType`.
- Defaults `queryConfig.pollingSec` to `LONG_POLLING_INTERVAL / 1000`.
- Defaults `queryProcessorName` to `GroupsV3UQDC`.
- Defaults `persistQuerySettingsToSession` to true.
- Reads navigation context from URL and converts it into initial EBR filters and default perspective.

## Entity Config

An entity config is the content pack for one entity type:

```ts
{
  schema,
  perspectives,
  actions?,
  filters?,
  gettingStarted?,
  defaultPerspective?
}
```

Observed examples:

- VM list builds configs via `getVmListConfig()` and registers VM actions/checker before rendering.
- vCenter defines inline `entityConfigs` with `schema`, `perspectives`, `actions`, and `gettingStarted`.
- VM NIC details EBR defines one primary entity plus a secondary joined/subnet query processor.

## Schema

The schema describes all entity attributes EBR may display, filter, sort, group, join, or fetch. Core shape:

```ts
{
  idAttribute: string,
  nameAttribute: string,
  attributes: Record<string, AttributeInfo>,
  joinedEntityTypes?: JoinedEntityType[],
  schemaValidator?: (attributeName) => { isValid: boolean, reason?: string }
}
```

Attribute fields seen in source:

- `type`: known types include `int`, `enum`, `enum_radio`, `string`, `protocolport`, `searchselect`, `dropdown` (deprecated, use `searchselect`), `label`, `objectStr`, `boolean`, `group`.
- `subType`: `int`, `string`, `time`, `datetime`, `custom`.
- `displayName`: already localized/display-ready.
- `values`: enum/searchselect/range values.
- `units`: `bytes`, `hz`, `kbps`, `iops`, `ppm`, `pph`, `pct`, `secs`, `usecs`, `msecs`, `raw`, `time`, `health`, `percent`, `duration_secs`.
- `continuous`: used for numeric/range semantics.
- `operators`: allowed filter operators.
- `onSearch`: async callback for `searchselect`, resolving `{ key, label }[]`.
- `isRange`, `validate`, `isRangeRequired`: numeric filter behavior.
- `v4ObjectNameSpace`: enum namespace for V4 OData.
- `v4GroupbyType`: `client` or `server`.
- `v4GroupbyAggregations`: documented as `['attribute:count']`, `['attribute:avg']`, etc. Source type comment also mentions `groupbyAggregations`; current docs use `v4GroupbyAggregations`.
- `odataFilterConditionLHS`: custom OData left-hand side for referenced `any(...)` filters.
- `v4AttributeName`, `v4AttributePath`, `v4ODataPrefix`: seen in local type shims and V4 docs/examples.

Schema validation:

- `schemaValidator` is called for every attribute.
- Invalid attributes are excluded from `validAttributes`.
- Perspectives are created with invalid attribute info so custom/deleted columns can be flagged or removed.
- Custom metrics require adding dynamic attributes with `isCustom: true` and validating them so deleted/renamed metrics do not break saved custom views.

## Perspectives / Focuses

Perspectives define how an entity is presented. EBR docs also call them focuses. A common convention is one `_common_` perspective plus named user-facing perspectives such as `General`, `Performance`, etc. The collection logic merges `_common_` into specific perspectives.

Important perspective keys from `EBPerspective.js`:

- `name`
- `label`
- `entityAttributes`
- `visualizations`
- `sidePanels`

Important `entityAttributes` keys:

- `idAttribute`
- `primaryAttribute`
- `displayAttributes`: grid/table columns.
- `exportAttributes`: CSV export columns; defaults to display/raw behavior when omitted.
- `groupByAttributes`: available grouping attributes.
- `groupByAttributesMap`: primary-to-secondary group mappings.
- `sortByAttributes`: available sort attributes.
- `filterByAttributes`: filter panel/filter bar attributes.
- `helperAttributes`: fetched but not displayed; crucial for formatters/actions/joins.
- `virtualAttributes`: display-only attributes not fetched; categories with prefix `categories.` are treated as virtual.
- `childAttributes`: row expansion child visualization attributes.
- `summaries`: group summary attributes/aggregates.
- `colorByAttributes` and `defaultColorByAttribute`: legacy color-by support is documented as no longer supported, but keys remain.
- `defaultGroupByAttribute`
- `defaultSortingAttribute`
- `customRenders`
- `columnGroups`
- `rowClassname`

Query attributes are derived from `primaryAttribute`, `displayAttributes`, `helperAttributes`, `childAttributes`, and `defaultColorByAttribute`, excluding `virtualAttributes` and category virtual attributes.

Example patterns:

- VM list uses many named perspectives and a `_common_` with shared `idAttribute`, `primaryAttribute`, default sorting, filter/sort/group/helper attributes, and side panel config.
- vCenter uses `_common_` for filters/custom renderers/helper attrs and a `General` perspective for display columns.
- VM NIC details uses one `_common_` plus `General`, with joined attributes in display/helper/custom render keys.

## Visualizations

EBR docs say grid is the implemented/default visualization. Constants include:

- `grid`
- `gridChild`
- `tile`
- `map`

Default factory maps:

- `grid` -> `GridVizView`
- `gridChild` -> `GridChildView`
- `vizTypeSelector` -> `VizTypeSelector`

Use `visualizations: [{ name: 'grid', entityAttributes: {} }]` in perspectives when explicitly configuring visuals. Many examples rely on grid.

## Query Processors / UQDC

EBR uses UQDC query processors to translate EBR state into backend calls and parse results into UQDC/EBR shape.

Built-in query processor names:

- `GroupsV3UQDC`: default, backed by `/groups` style APIs.
- `ListV3UQDC`.
- `ODataV4UQDC`: generic OData V4 list endpoint support.
- `LocalDataUQDC` in docs, but source registration name is `LocalDataUQDC`; this repo's type shim also includes `LocalData`.

`queryConfig` supports:

- `queryProcessorName`, `queryProcessorProps`, `queryProcessorComponent`: older single-processor form, registered for all entity types.
- `queryProcessorsMap`: preferred for multiple processors/entity types:

```ts
queryProcessorsMap: {
  [entityType]: {
    queryProcessorName,
    queryProcessorProps?,
    queryProcessorComponent?,
    rowExpansionConfig?
  }
}
```

Other query config fields:

- `useGlobalFilters`
- `globalFiltersSchema`
- `pollingSec`
- `fetchCount`
- `onNewQueryData`
- `onRowExpand`
- `rowExpansionConfig`
- `userDataAPI`

Important behavior:

- If `queryProcessorsMap` is present, each entry registers separately by entity type.
- If absent, one processor registers for all `entityTypes`.
- `fetchCount` fixes page size and disables user page-size selection behavior.
- `pollingSec` controls periodic refresh for UQDC.
- `onNewQueryData` can synchronously or asynchronously process fresh data.

## OData V4 UQDC

`ODataV4UQDC` is the standard built-in bridge from EBR state to V4 list endpoints.

Required app integration:

- Configure `queryProcessorName: 'ODataV4UQDC'`.
- Provide `queryProcessorProps.queryListCallback`, which receives OData query payload and UQDC query context and calls the actual API.

Observed vCenter example:

```ts
queryProcessorsMap: {
  management_server_info: {
    queryProcessorName: 'ODataV4UQDC',
    queryProcessorProps: {
      queryListCallback: doListVcenterIntegrations
    }
  },
  cluster: {
    queryProcessorName: 'ODataV4UQDC',
    queryProcessorProps: {
      queryListCallback: doListClusters
    }
  }
}
```

OData conversion behavior from source:

- `$select` is generated from perspective query attributes.
- Filters are converted using `ODataFilterUtil`.
- Raw filters are passed through as OData expressions.
- `entityIds` filters become `<idAttribute> in ('id1','id2')`.
- Pagination maps `count` and `offset` to `$limit` and `$page`.
- Sorting maps EBR order to `asc`/`desc`.
- Server group by emits `$apply=groupby(...)`, with optional aggregate clauses.
- Server joins emit `$expand=(...)` clauses.
- Stats joins add time range and stat type parameters internally.

OData filter behavior:

- Multiple conditions on one attribute are ORed.
- Multiple attributes are ANDed.
- Additional filter expression is ANDed into the main filter expression.
- String contains/starts/ends use OData functions.
- String equal currently avoids `tolower()` due to backend support limitations.
- Schema `odataFilterConditionLHS` can override the left-hand side and auto-close parenthesized `any(...)` expressions.

## LocalDataUQDC

Use `LocalDataUQDC` when the full dataset is small enough to fetch entirely and filter/sort/group/page in the browser. EBR does not enforce a limit; the developer must decide.

Config pattern:

```ts
queryProcessorsMap: {
  host: {
    queryProcessorName: 'LocalDataUQDC',
    queryProcessorProps: {
      queryListCallback: async () => ({ data: allHosts }),
      queryResponseTimeToLiveSecs: 30
    }
  }
}
```

Behavior from source:

- Adds `entityId` and `entityType` to every returned row using schema `idAttribute`.
- Restricts by `entityIds` when present.
- Applies filter expressions and raw filter conditions.
- Sorts client-side, with lowercase handling for strings.
- Groups client-side using `DataUtil.getEntityValue`.
- Paginates after filtering/grouping.
- Caches/queues fetches so simultaneous requests do not duplicate full-data fetches.

## Custom UQDC

A custom UQDC is used when built-in connectors do not match the backend/API behavior. VM list uses `VmUQDC`, a class component wrapped with `UQueryDataConnector`, translating UQDC queries to `/groups` request payloads with product-specific filter/group count logic and telemetry.

Use a custom UQDC when:

- The backend is not standard GroupsV3/ListV3/ODataV4.
- Group counts require special fan-out calls.
- Request/response payloads need domain-specific massaging.
- Telemetry or access-manager behavior must be included in data fetching.

The UQDC must provide a fetch handler that receives the UQDC query and schema, calls the backend, and returns data processed through the UQDC response processor.

## Filtering

Filtering comes from schema and perspective metadata:

- Perspective `filterByAttributes` decides what can be filtered.
- Schema attribute `type`, `subType`, `values`, `units`, `operators`, etc. decides which filter UI and parser behavior applies.
- Top filter bar can use free text, suggestions, filter tags, and a parser.
- Right filter panel renders filter sections.
- Favorite filters can be enabled/disabled.

Filter config in `entityConfig.filters`:

- `local`: initial filters. Source examples use `{ type: 'simple', value: { ... } }`.
- `global`: global filters.
- `maxFilterConditions`
- `maxFilterConditionsPerAttribute`
- `pinnedFilterAttributes`

`DataUtil` processes max conditions and pinned filters before initial filters.

Filter condition shape from source/type shims:

```ts
{
  id: string,
  attribute: string,
  value?: string,
  value1: string | number | boolean,
  value2?: string | number | boolean | null,
  op: string,
  isChecked: boolean
}
```

Filter utility behavior:

- Pinned filters are registered per entity type and cannot be closed.
- Active filter conditions are copied out when `isChecked`.
- Group member selection creates filter conditions for group attribute/value.
- Range strings use `::` to express open/closed numeric ranges.
- Date filter values are converted to microseconds relative to now.

Custom filter parser:

- Default factory uses `FilterParser`.
- Custom factory can expose `getFilterParser()`.
- `FilterParser.getFilterExpression()` default turns free text into a `contains` filter on schema `nameAttribute`.
- `FilterParser.getSuggestedFilterConditions()` generates suggestions from schema/filterable attributes.

## Group By

Group by is available when the current perspective has `groupByAttributes`.

UI:

- `groupingType: 'tabs'` by default.
- `groupingType: 'list'` is recommended when group count is large, especially over about 10 groups.
- Source constant `MAX_GROUPS` is 7, matching docs for dynamic client-side group display.

Default group:

- `defaultGroupByAttribute` selects an initial group and opens group panel state.

V4 client-side group by:

- Schema attribute `v4GroupbyType: 'client'`.
- Static group by uses schema `values`.
- Dynamic group by uses `queryProcessorProps.groupsCallback(groupByAttribute)` and should resolve `{ [groupId]: groupDisplayName }`.
- Dynamic client-side group by shows a maximum of 7 groups in UI per docs/source constants.

V4 server-side group by:

- Schema attribute `v4GroupbyType: 'server'`.
- Optional `v4GroupbyAggregations: ['hostName:count']`.
- Supported aggregations: `count`, `avg`, `sum`, `min`, `max`.
- OData emits `$apply=groupby(attribute, pagination, aggregate(...))`.
- Use `DataUtil.ODataGroupAggregationValue(groupEntity, aggregationTuple, defaultValue)` to read aggregate results.
- Server group by is for primary entity attributes; joined entity group by is explicitly not supported in V4 docs/source comments.

## Sorting

Sorting is controlled by `sortByAttributes` and `defaultSortingAttribute`.

Important details:

- Grid sorting is typically via table column headers.
- Tile sorting uses sort menus per README.
- `defaultSortingAttribute` can be a string or an empty array if no default sort is desired.
- OData V4 maps EBR sort order to OData `asc`/`desc`.
- Sorting by server-side joined attributes is handled inside expansion clauses.

## Renderers and Component Factory

Custom rendering is done through perspective `customRenders` and `ebComponentFactory`.

`customRenders` can include:

- `formatter`: component ID/name sent to factory.
- `formatterOptions`.
- `columnWidth`.
- `className`.
- `align`.
- `sortable`.
- `tooltip`.
- `export`: function used for CSV export value.

Default factory components include:

- `grid`, `gridChild`
- `vizTitle`, `groupTitle`
- `groupTabs`, `groupsPanel`, `groupsPanelListItem`, `groupbySelector`
- `filtersPanel`, `filterBarPanel`, `queryOptionsPanel`
- `actionsPanel`, `detailsActionsPanel`, `rightClickActionMenu`
- `popupContainer`
- `detailsLink`
- `sidePanelLink`
- `entity type selector`, `viz type selector`, `exportView`, `fetchSelectedEntitiesView`
- hooks: `hookComponent`, `hookDropdown`

Factory contract:

```ts
class MyFactory {
  setDefaultFactory(factory) {
    this.defaultFactory = factory
  }

  getComponent(componentId, options) {
    switch (componentId) {
      case 'myFormatter':
        return <MyFormatter {...options} />
      default:
        return this.defaultFactory.getComponent(componentId, options)
    }
  }

  getFilterParser() {
    return this.parser
  }
}
```

EBR requires custom factories to implement `setDefaultFactory`; otherwise it logs an error and uses the default factory.

Observed factory patterns:

- VM factory maps many formatter function names (`renderVmName.toString()`, etc.) to renderer functions/components, overrides popup container, invalid perspective dialog, details pane, and side panel, and delegates unknown IDs to default factory.
- vCenter factory formats joined cluster name/status/auth fields and delegates defaults.
- This prototype wraps a local `EBRComponentFactory` class around the default factory with helpers like `createFormatter()`.

## Actions

Actions are declared as metadata and processed with `EBActionsUtil.processActionsConfig`.

Raw config shape:

```ts
{
  actions: {
    primary?: string[],
    secondary?: string[],
    right_click?: string[],
    dropdowns?: string[],
    details?: string[],
    detailsDropdowns?: string[]
  },
  actionProps: {
    [actionId]: {
      id,
      label,
      criteria,
      componentProps,
      children?,
      needsConfirmation?,
      confirmationMessage?,
      icon?,
      tooltip?,
      disabled?,
      hidden?
    }
  }
}
```

Processed output groups:

- `primaryActions`
- `secondaryActions`
- `rightClickActions`
- `dropdownBtnActions`
- `detailsActions`
- `detailsDropdownBtnActions`

Action children:

- `children` references action IDs from `actionProps`.
- Separators use `--`.
- Source supports grandchildren but comments say only one level is currently allowed.
- Missing action props throw errors during processing.

Capability checkers:

- Register with `EBActionsUtil.registerCapabilityChecker(entityType, checker)`.
- Checker can be a function or record of named checks.
- Criteria use `{ checks: ['onlyOneSelected', 'canDelete'], match: 'all' | 'any' }`.
- Built-ins: `onlyOneSelected`, `atLeastOneSelected`.
- Checkers return `{ state: 'enabled' | 'disabled' | 'hidden', reason? }`.
- `getSelectionOptions()` computes select-all, unselected IDs, total count, and selected entity count.
- `getCapabilityEnabledEntities()` filters selected entities that can perform an action.
- Joined data is available to action checkers via `options.joinedData` per join docs.

Action UI:

- EBR opens action UI through `popupContainer`.
- Custom factory should handle the popup container component ID and switch on `currentPopup.actionId`.
- Action UI gets EBR store helpers from `DataUtil.getActionComponentArgs()` including `Getters` and actions such as `refreshQuery`, `closePopup`, `showPopup`, selections, offsets, metadata, filters, joined data.
- V4 action guidance from docs/Glean: use V4 permissions rather than roles where possible; V4 APIs often return task IDs; use central task polling utilities, refresh EBR on success, and keep UI open on error.

## Details Mode

`detailsEntityInfo` can show details for a specific entity:

```ts
detailsEntityInfo: {
  detailsViewOnly?: true,
  entity: {
    entityType,
    entityId,
    ...extraActionData
  },
  onClose?: () => void
}
```

If `detailsViewOnly` is true, `EBBaseView` renders details only instead of loading perspectives/grid. VM list uses this from a details page to reuse VM EBR action buttons without rendering the list. Its factory handles `COMPONENT_IDS.EB_DETAILS_PANE` and returns `VmDetailsActionBtns`.

## Side Panels

EBR supports inline/modal side panels launched from cells formatted with `sidePanelLink`.

Perspective config:

```ts
sidePanels: {
  showFooter: boolean,
  linkDetails: boolean,
  maxEntities?: number,
  tabs: {
    [tabId]: { ...tabProps }
  }
}
```

Custom render setup:

```ts
customRenders: {
  name: {
    formatter: 'sidePanelLink'
  }
}
```

Factory setup:

```ts
case COMPONENT_IDS.EB_SIDE_PANEL:
  return <MySidePanel {...options} />
```

Source behavior:

- Default `sidePanelLink` renderer sets an accessible link and calls `onClick(entityId, event)`.
- Grid handles side panel link click; ctrl/cmd click can open modal mode.
- Side panel display collapses other panels such as filters/group list as needed.
- Side panel size is persisted per entity type in local storage.
- Constants include side panel sizes `sm`, `lg`, modes `inline`, `modal`, widths `25%`, `50%`, and `400px` min width.
- README notes that when side panel is open, main table shows the first four columns, hides others, disables column resizing, and adjusts view/group controls depending on screen size.

Observed examples:

- VM list config puts `sidePanels` in `_common_`, `showFooter: false`, `linkDetails: true`, `maxEntities: 1`, and conditional tabs for properties, policies, metrics, alerts based on permissions.
- VM factory handles `EB_SIDE_PANEL` by rendering `VmSidePanel` for the selected entity ID.
- EBR demos show side panel tabs with custom factory components.

## Joins / Joined Data

EBR supports client-side and server-side joins through `schema.joinedEntityTypes`.

Joined entity config:

```ts
joinedEntityTypes: [
  {
    entityType: 'host',
    schema: HostSchema,
    joinType: 'client' | 'server',
    joinAttribute?: string | ((entity) => string | string[]),
    joinedEntityAttribute?: string,
    v4ODataPrefix?: string,
    pollingSec?: number | ((...) => number)
  }
]
```

EBR flattens joined schema attributes into the primary schema with slash notation:

```ts
'host/hostName'
'stats/hypervisor_cpu_usage_ppm'
```

Client-side joins:

- Fetch joined entities in separate calls for the current page.
- Cache/poll joined data.
- Intended for readonly rendering.
- Do not support sorting/filtering/grouping on joined attributes.
- Require `joinAttribute` to map parent entity to joined entity ID(s).
- Joined entity query processor must be configured in `queryProcessorsMap`.
- Joined attributes should be listed in `displayAttributes` and supporting parent join attributes in `helperAttributes`.

Server-side joins:

- Backend returns primary and joined data in one V4/OData call via expansion.
- May support sorting/filtering if backend/API supports it.
- EBR docs explicitly say group by joined attributes is not supported.
- Perspective uses joined attributes in `displayAttributes`, `sortByAttributes`, `filterByAttributes`.
- Schema uses `joinType: 'server'`.

Stats joins:

- V4 docs use special entity type `stats`.
- EBR has constant `V4_STATS_ENTITY_TYPE: 'stats'`.
- OData conversion adds time range and `avg` stat type for stats expansion.

Rendering joined data:

- Use `JoinedDataRenderer` for generic joined attribute display:

```tsx
<JoinedDataRenderer
  joinedEntityType="host"
  joinedEntityId={parentEntity.node}
  joinedEntityAttribute="hostType"
/>
```

Observed examples:

- vCenter schema joins `management_server_info` to `cluster` client-side using `joinAttribute: cluster_uuid`; perspective displays `cluster/name`; query map configures both primary and cluster query processors.
- VM NIC details displays joined subnet/network attributes using custom renderer keys.

## Export

EBR supports CSV export only.

Top-level `exportSettings`:

```ts
exportSettings: {
  visible: boolean,
  maxRows?: number,
  pageSize?: number,
  forceExport?: boolean,
  exportOptions?: {
    all?: boolean | { labelFn, isDisabledFn },
    filtered?: boolean | { labelFn, isDisabledFn },
    selected?: boolean | { labelFn, isDisabledFn },
    [customOption]?: boolean | { labelFn, isDisabledFn }
  }
}
```

Behavior:

- If `exportSettings` is absent/null, export is off.
- `pageSize` defaults to 50 in EBR constants. Docs mention 500 max for IDF and 50 max for V4.
- `forceExport` forces the export UI.
- Custom export options can be added and are passed to UQDC during export fetching.

Perspective export:

- `entityAttributes.exportAttributes` chooses columns to export.
- If omitted, export uses display/raw behavior.
- `customRenders[attr].export(entity)` controls exported cell value.
- Export functions must not mutate the entity object; docs warn that the same object is passed to subsequent column export calls.

Observed examples:

- VM list enables export with `visible: true, pageSize: 500`.
- vCenter enables export and uses custom export functions to render cluster/status values.

## User Settings, Custom Focuses, Favorite Filters

EBR user settings API is used for:

- Favorite filters: type `filter`.
- Custom focuses/custom table views: type `custom_table`.

Default endpoint:

```text
/PrismGateway/services/rest/v1/application/user_data
```

Override:

```ts
queryConfig: {
  userDataAPI: '/custom/user_data'
}
```

API shape:

- `GET $API/type=$type` loads settings.
- `POST $API` creates `{ type, key, value: JSON_STRING }`.
- `PUT $API` updates.
- `DELETE $API/${userSetting.ID}` deletes.

Relevant top-level props:

- `allowCustomFocuses`
- `showFavoriteFilters`
- `appId`
- `ebId`
- `persistQuerySettingsToSession`

## Labels

Labels are controlled by:

- top-level `allowLabels`.
- schema attributes of type `label`.
- exported `EBLabelIcon`.

VM list enables labels only if the user has all required access and tagging capability, then applies a product feature condition to remove/deprecate VM labeling. Label UI/state is loaded dynamically into EBR state.

## Getting Started / Empty State

Entity config can include:

```ts
gettingStarted: {
  createActionId?: string,
  GettingStartedComponent?: ReactNode
}
```

vCenter example passes a custom no-results/getting-started component. EBR has default renderer constant `GettingStartedView`.

## Row Expansion

Top-level/deprecated query config supports:

```ts
rowExpansionConfig: {
  render: (row) => ReactNode,
  rows: string[]
}
```

`onRowExpand(expandedRows)` fires when rows expand/collapse. EBR shows an expand icon and calls `render(row)` for the child. The prototype sample uses this to render a child row placeholder.

## Hooks

Custom factories can implement:

- `COMPONENT_IDS.EB_HOOK_COMPONENT`: placed between filter bar and grid.
- `COMPONENT_IDS.EB_HOOK_DROPDOWN`: placed near focus/group-by controls.

Default factory returns null for both.

## Global Filters and Embedded EBR

VM NIC details EBR shows embedded/detail use:

```ts
queryConfig: {
  useGlobalFilters: true,
  globalFiltersSchema: {
    rawFilters: `vm==${vmId}`
  },
  queryProcessorsMap: {
    virtual_nic: { queryProcessorName: 'GroupsV3UQDC' },
    subnet: { queryProcessorName: 'VNetworkUQDC', queryProcessorComponent: VNetworkUQDC }
  }
}
```

It also uses:

- unique `ebId` incorporating parent VM ID.
- `showFavoriteFilters: false`.
- `exportSettings.visible: true`.
- error boundary wrapper.

Use global filters for contextual EBRs inside detail tabs, where the list must always be scoped to a parent entity.

## Navigation Context in Aphrodite

`EntityBrowserView` reads `NavigationManager.getNavigationContextFromURLContextIdParam()`, builds `EBRNavigationContext`, and can inject:

- initial local filters into `entityConfigs[entityType].filters.local`.
- `defaultPerspective` into `entityConfigs[entityType].defaultPerspective`.

This means Aphrodite EBR behavior may be influenced by URL/navigation context before it reaches `EntityBrowser`.

## Practical Build Patterns

### Simple Single-Entity List

Use when one entity type maps cleanly to a built-in query processor.

```tsx
<EntityBrowserView
  ebId="my_entity"
  entityType="my_entity"
  entityConfigs={{
    my_entity: {
      schema,
      perspectives,
      actions: EBActionsUtil.processActionsConfig(actions),
    },
  }}
  queryConfig={{
    queryProcessorsMap: {
      my_entity: {
        queryProcessorName: 'ODataV4UQDC',
        queryProcessorProps: { queryListCallback },
      },
    },
  }}
  ebComponentFactory={new MyFactory()}
  showFiltersPanel
  filtersPanelCollapsed
  exportSettings={{ visible: true }}
/>
```

### V4 List With Client-Side Join

Use when the page shows primary entities plus readonly data from another entity.

Key requirements:

- Primary schema `joinedEntityTypes` includes joined entity, `joinType: 'client'`, and `joinAttribute`.
- Perspective displays joined fields using slash notation.
- Query map configures both primary and joined entity processors.
- Custom renderer or `JoinedDataRenderer` renders joined value.

vCenter follows this pattern for management server info joined to cluster.

### Contextual Detail-Tab EBR

Use when a detail page tab renders child entities scoped to a parent entity.

Key requirements:

- Unique `ebId`, usually containing parent ID.
- `useGlobalFilters: true`.
- `globalFiltersSchema.rawFilters` or equivalent scoping.
- Disable favorite filters/custom focuses when saved state would be misleading.
- Keep perspectives small and focused.

VM details NICs follows this pattern.

### Full Product List With Custom UQDC

Use when the backend/API has special query behavior.

Key requirements:

- Custom UQDC component.
- Robust config generator for schema/perspectives/actions.
- Registered action checker.
- Custom factory for many formatters, popup container, side panel, details pane.
- Session persistence on main list, but not on embedded/detail variants.
- Export/page size tuned for backend limits.

VM list follows this pattern.

## Cautions and Gotchas

- Use `queryProcessorsMap` for new/multi-entity work. The single `queryProcessorName`/component props still work but are marked deprecated in source comments.
- `LocalDataUQDC` fetches all entities; only use when the dataset is safely small.
- Client-side joins are render-only: no sorting/filtering/grouping on joined attributes.
- Server-side joins can support sort/filter if backend supports it, but joined group by is not supported.
- `sidePanelLink` must be set as a formatter for a cell to launch the side panel.
- Custom factories must implement `setDefaultFactory` and delegate unknown component IDs.
- `ebId` must be stable for persisted main pages and unique for embedded/detail action reuse to avoid stale state.
- `exportSettings` absent/null disables export; `visible: true` enables it.
- Custom export functions must not mutate entity data.
- `schemaValidator` is essential for dynamic/custom metric attributes and saved custom views.
- Searchselect replaces deprecated dropdown filters.
- For V4 actions, prefer API permissions over roles and handle returned task IDs with central task polling.
- `EntityBrowserView` in Aphrodite adds behavior not present in raw `EntityBrowser`, especially navigation-context filters and default perspective.
- There is naming inconsistency around local data processor: docs say `LocalDataUQDC`; this prototype's type shim includes `LocalData`; source registers the built-in component when `queryProcessorName` maps to `LocalDataUQDC`.

## Internal Docs Notes From Glean

Glean returned these concrete fields and guidance, which align with source docs unless noted:

- V4 server group by: `v4GroupbyType: 'server'`, `v4GroupbyAggregations: ['attribute:aggregation']`, `DataUtil.ODataGroupAggregationValue(...)`.
- Server joins: `joinedEntityTypes`, `entityType`, `schema`, `joinType: 'server'`, slash-qualified perspective attributes.
- OData referenced-entity filters: `odataFilterConditionLHS`.
- Migration pattern: feature flag V4 paths during migration using `ReleaseManager.isSnippetEnabled(...)`.
- Internal examples include `prism-ui-blocks/packages/tasks/src/ebr/EBR.tsx`, DRAAS V4 EBR migration PRs, and `EBR - Dec 2024` slide material.

Some Glean fields such as `baseFilter`/`globalFilters` appear in internal wrapper contexts, but the raw EBR source read here exposes `globalFiltersSchema` and `useGlobalFilters` under `queryConfig`; do not assume `baseFilter` is a raw `EntityBrowser` prop without checking the wrapper being used.

## Suggested Skill Structure Later

A future EBR skill should probably be split into progressive references:

- `SKILL.md`: triggers, decision tree, minimal setup checklist, gotchas.
- `references/core-api.md`: `EntityBrowser`, `EntityBrowserView`, entity config, schema, perspectives.
- `references/query-processors.md`: GroupsV3, ODataV4, LocalData, custom UQDC.
- `references/filters-grouping.md`: filters, favorite filters, parser, group by, global filters.
- `references/actions-factory.md`: actions, checkers, popup containers, factory component IDs.
- `references/joins-side-panels-export.md`: joins, side panels, export, details mode.
- `references/examples.md`: concrete examples from VM list, vCenter, VM NIC detail tab, prototype sample.

The skill should instruct agents to read the relevant reference based on the requested EBR work, then inspect nearby product examples before editing code.

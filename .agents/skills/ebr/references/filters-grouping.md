# EBR Filters, Grouping, Sorting, And Settings

Read this when implementing filter bars, filter panels, pinned filters, favorite filters, global filters, group by, sorting, or custom focuses.

## Filtering

Filtering is driven by schema and perspective metadata:

- Perspective `filterByAttributes` controls what can be filtered.
- Schema attribute `type`, `subType`, `values`, `units`, `operators`, and related fields control filter UI and parser behavior.
- The top filter bar supports free text, suggestions, filter tags, and parser integration.
- The right filter panel renders filter sections.
- Favorite filters are controlled by top-level props and the user settings API.

Entity config filter fields:

- `local`: initial filters, commonly `{ type: 'simple', value: { ... } }`.
- `global`: global filters.
- `maxFilterConditions`
- `maxFilterConditionsPerAttribute`
- `pinnedFilterAttributes`

Filter condition shape:

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

Important behavior:

- Pinned filters are registered per entity type and cannot be closed.
- Active filter conditions are copied out when `isChecked`.
- Group member selection creates filter conditions for group attribute/value.
- Range strings use `::` for open/closed numeric ranges.
- Date filter values are converted to microseconds relative to now.
- Use `searchselect` rather than deprecated `dropdown` for searchable option filters.

## Custom Filter Parser

The default factory uses `FilterParser`. A custom factory can expose `getFilterParser()`.

Default behavior:

- `getFilterExpression()` turns free text into a `contains` filter on schema `nameAttribute`.
- `getSuggestedFilterConditions()` generates suggestions from schema and filterable attributes.

Use a custom parser only when product syntax or suggestions differ from EBR defaults.

## Global Filters And Embedded EBR

Use global filters for contextual EBRs inside detail tabs or nested views where the list must always be scoped to a parent entity.

Pattern:

```ts
queryConfig: {
  useGlobalFilters: true,
  globalFiltersSchema: {
    rawFilters: `vm==${vmId}`
  },
  queryProcessorsMap: {
    child_entity: { queryProcessorName: 'GroupsV3UQDC' }
  }
}
```

Embedded/detail EBR checklist:

- Use a unique `ebId`, often including the parent entity ID.
- Scope with `useGlobalFilters` and `globalFiltersSchema`.
- Usually disable `showFavoriteFilters` and custom focuses when saved state would be misleading.
- Keep perspectives small and contextual.

## Group By

Group by appears when the current perspective has `groupByAttributes`.

UI guidance:

- `groupingType: 'tabs'` is default.
- `groupingType: 'list'` is better when group count is high, especially over about 10 groups.

Default group:

- `defaultGroupByAttribute` selects an initial group and opens group panel state.

Group behavior comes from the configured UQDC and backend. With `GroupsV3UQDC`, keep `groupByAttributes` aligned to attributes the Groups API can group by. If group counts or grouped rows need product-specific handling, use a custom UQDC.

## Sorting

Sorting is controlled by `sortByAttributes` and `defaultSortingAttribute`.

Notes:

- Grid sorting is usually via table column headers.
- Tile sorting uses sort menus.
- `defaultSortingAttribute` can be a string, tuple, or empty array when no default sort is desired.
- Keep `sortByAttributes` aligned to attributes the selected query processor/backend can sort.

## User Settings

EBR user settings API supports:

- Favorite filters: type `filter`.
- Custom focuses/custom table views: type `custom_table`.

Default endpoint:

```text
/PrismGateway/services/rest/v1/application/user_data
```

Override with:

```ts
queryConfig: {
  userDataAPI: '/custom/user_data'
}
```

Relevant props:

- `allowCustomFocuses`
- `showFavoriteFilters`
- `appId`
- `ebId`
- `persistQuerySettingsToSession`

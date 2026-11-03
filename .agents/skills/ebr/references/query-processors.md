# EBR Query Processors

Read this when choosing or changing data fetching, UQDC, local data, polling, pagination, or backend query behavior.

If the processor is `GroupsV3UQDC`, also read `groups-api.md`. In this prototype, new EBR work usually needs matching mock Groups API data under `apps/api/src/features/groups/`.

## Query Config Shape

Prefer `queryProcessorsMap` for new work:

```ts
queryConfig={{
  queryProcessorsMap: {
    [entityType]: {
      queryProcessorName,
      queryProcessorProps?,
      queryProcessorComponent?,
      rowExpansionConfig?
    }
  }
}}
```

Older single-processor fields still exist but are less flexible:

- `queryProcessorName`
- `queryProcessorProps`
- `queryProcessorComponent`

Other useful query config fields:

- `useGlobalFilters`
- `globalFiltersSchema`
- `pollingSec`
- `fetchCount`
- `onNewQueryData`
- `onRowExpand`
- `rowExpansionConfig`
- `userDataAPI`

Behavior to remember:

- `queryProcessorsMap` registers a processor per entity type.
- Without a map, one processor is registered for all `entityTypes`.
- `fetchCount` fixes page size and disables user page-size selection behavior.
- `pollingSec` controls periodic refresh.
- `onNewQueryData` can synchronously or asynchronously process fresh data.

## Built-In Processor Choices

- `GroupsV3UQDC`: default Groups path in many Aphrodite wrappers and the current prototype.
- `ListV3UQDC`: list path for endpoints that follow list semantics rather than Groups.
- `LocalDataUQDC`: fetch all data and filter/sort/group/page in the browser.

Some local type shims may include `LocalData`; source-backed built-in docs and registration use `LocalDataUQDC`.

## GroupsV3UQDC

Use `GroupsV3UQDC` for the normal `/groups` query path. This is the default for Aphrodite `EntityBrowserView` and the concrete EBR implementation in the prototype repo.

Minimal pattern:

```ts
queryProcessorsMap: {
  [entityType]: {
    queryProcessorName: 'GroupsV3UQDC'
  }
}
```

Use this when:

- The schema attributes map to Groups attributes.
- Standard filter, group, sort, pagination, and projection behavior is enough.
- The product code already uses `EntityBrowserView` and does not provide a custom UQDC.

For this prototype, make sure `/api/nutanix/v3/groups` can return every requested attribute. EBR derives requested projection from perspectives, so missing API fields show up as blank cells or broken renderers.

If you need special group count calls, response shaping, telemetry, or access-manager behavior, use a custom UQDC instead of forcing those concerns into renderers.

## ListV3UQDC

Use `ListV3UQDC` when the backend follows list endpoint semantics rather than `/groups`. Keep the schema and perspectives the same EBR shape; only the query processor changes.

## LocalDataUQDC

Use only when the full dataset is small enough to fetch safely.

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

Behavior:

- Adds `entityId` and `entityType` to each row using schema `idAttribute`.
- Restricts by `entityIds` when present.
- Applies filter expressions and raw filter conditions.
- Sorts client-side, including lowercase handling for strings.
- Groups client-side using `DataUtil.getEntityValue`.
- Paginates after filtering/grouping.
- Caches/queues fetches so simultaneous requests do not duplicate full-data fetches.

## Custom UQDC

Use a custom UQDC when:

- The backend is not standard Groups or List.
- Group counts require fan-out calls or special aggregation.
- Request/response payloads need product-specific shaping.
- Data fetching must include telemetry, permissions, access manager, or feature-flag behavior.

The custom UQDC should receive UQDC query and schema, call the backend, and return data processed into EBR/UQDC shape. Large product lists often combine a custom UQDC with a config generator, action checker registration, and a custom component factory.

## Row Expansion

Query config can include:

```ts
rowExpansionConfig: {
  render: (row) => ReactNode,
  rows: string[]
}
```

`onRowExpand(expandedRows)` fires when rows expand/collapse.
